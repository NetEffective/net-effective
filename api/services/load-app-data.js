'use strict';

// Given an express app, load bills data into `app.data.bills`.

const {readBillsData} = require('./read-bills-data');

function loadAppData(app) {
  readBillsData()
    .then((billsData) => {
      app.data = app.data || {};
      app.data.bills = billsData;
      console.log('Loaded fresh app data');
    })
    .catch((err) => {
      console.error('Failed to load fresh app data', err);
    });

  // TODO refresh automatically on an interval...?
}

module.exports = {loadAppData};
