'use strict';

const config = require('../../src/config');

const requestPromised = require('../utils/request-promised');


function getStateRepresentatives(addressStr) {
  const url = _buildRepsUrl(config.apiKeys.googleCivicInfoApi, addressStr);

  return requestPromised({
    method: 'GET',
    url,
    headers: {
      'Accept': 'application/json'
    },
    json: true
  })
  .then((response) => {
    return _parseRepsData(response.body);
  });
}


function _buildRepsUrl(apiKey, addressStr) {
  addressStr = encodeURIComponent(addressStr);
  return `https://www.googleapis.com/civicinfo/v2/representatives?key=${apiKey}&address=${addressStr}`;
}

// Return promise resolving to object of {reps, address}.
function _parseRepsData(data) {
  let address = {};
  const reps = [];

  try {
    const { offices, officials, normalizedInput } = data;
    address = normalizedInput;

    // find `sldl` (lower state legislature)
    // and `sldu` (upper state legislature) offices
    for (let officeInd = 0; officeInd < offices.length; officeInd++) {
      const office = offices[officeInd];
      // `divisionId` is e.g. "ocd-division/country:us/state:ca/sldl:15"
      if (/\/sld[lu]:/.test(office.divisionId)) {
        const {officialIndices} = office;
        for (let j = 0; j < officialIndices; j++) {
          const officialIndex = officialIndices[j];
          const official = officials[officialIndex];
          if (official) {
            reps.push(
              Object.assign({
                office: office.name
              }, official)
            );
          }
        }
      }
    }
  } catch (err) {
    console.error('Failed to parse representative data', err);
  }

  return {
    reps,
    address
  };

}


module.exports = {
  getStateRepresentatives,
  _buildRepsUrl,
  _parseRepsData
};
