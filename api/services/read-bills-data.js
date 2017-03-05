'use strict';

// Read data from a public CSV (coming from a Google Sheet).
// Filter and return as JSON.
// To be used at app boot, or on an interval while app is running.

const csv = require('csv');
const debug = require('debug')('read-bills-data');    // use `DEBUG=read-bills-data` to view logs
const requestPromised = require('../utils/request-promised');

const CSV_URL = process.env.BILLS_CSV_URL || 'https://docs.google.com/spreadsheets/d/1YeATxl_uLNSi1Ce4JnMNI0LctIggJz5VTtyaxQ-nKsQ/pub?gid=0&single=true&output=csv';

// internal keys to spreadsheet keys
const COLUMN_MAP = Object.freeze({
  moderationStatus: 'Moderation Status',
  state: 'State',
  topic: 'Topic',
  submissionDate: 'Submission Date',
  nextVotingDate: 'Next Voting Date',
  newsURL: 'News Link',
  billID: 'Bill ID',
  billURL: 'Bill Link',
  billTitle: 'Bill Title',
  billSummary: 'Bill Summary',
  opposedBecause: 'Opposed Because',
});

const DATE_COLUMNS = Object.freeze([
  'submissionDate',
  'nextVotingDate'
]);


function readBillsData() {
  return _fetchCSV()
    .then((rawCSV) => _parseCSV(rawCSV));
}


// return promise.
function _fetchCSV() {
  debug('Reading bills data from', CSV_URL);

  return new Promise((fulfill, reject) => {

    // Read whole file and parse.
    // If it gets very large, can switch to streaming.
    requestPromised({
      method: 'GET',
      url: CSV_URL,
      headers: {
        'User-Agent': 'Abortion Access Hackathon NetEffective App',
        'Accept': 'text/csv'
      }
    })
    .then((response) => {
      debug('Response', response.statusCode, response.body);
      fulfill(response.body);
    });
  });
}


// Returns promise with array of structured objects.
function _parseCSV(rawCSV) {
  debug('Parsing raw CSV', rawCSV);

  return new Promise((fulfill, reject) => {
    csv.parse(rawCSV, {
      // see docs at http://csv.adaltas.com/parse/
      skip_empty_lines: true
    },
    (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      debug('Parsed', data);
      fulfill(data);
    })
  })
  .then((rows) => {
    // `data` is an array (rows) of arrays (cells), first row is the headers.
    if (! (rows && Array.isArray(rows) && rows.length > 0)) {
      throw new Error(`Unexpected data format. (${typeof data})`);
    }

    // {key:ind}
    const columnIndexMap = {};

    const headersRow = rows.shift();
    // Validate expected headers and identify their index (for subsequent rows)
    for (let headerKey in COLUMN_MAP) {
      const headerText = COLUMN_MAP[headerKey];
      columnIndexMap[headerKey] = headersRow.indexOf(headerText);

      if (columnIndexMap[headerKey] === -1) {
        // missing
        throw new Error(`Missing expected column: '${headerText}'`);
      }
    }

    const objRows = rows.map((row) => {
      const obj = {};
      for (let headerKey in COLUMN_MAP) {
        const columnInd = columnIndexMap[headerKey];
        obj[headerKey] = row[columnInd];
      }

      // dates
      for (let ind in DATE_COLUMNS) {
        const headerKey = DATE_COLUMNS[ind];
        if (obj[headerKey]) {
          // these are in the format `YYYY-MM-DD`.
          // setting a plain date would make it midnight UTC.
          // instead use noon (12:00pm) Central Standard Time.
          // (TODO - verify that this logic makes sense)
          obj[headerKey] = new Date(`${obj[headerKey]} 12:00:00-06:00`);
        } else {
          obj[headerKey] = null;
        }
      }

      return obj;
    })
    .filter((objRows) => {
      // Only publish the "approved" rows.
      return objRows.moderationStatus === 'Approved';
    });

    debug('Parsed result', objRows);

    return objRows;   // promise resolution
  });
}


module.exports = {
  readBillsData,
  _fetchCSV,
  _parseCSV
};
