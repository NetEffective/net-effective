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
    }
  })
  .then((response) => {
    console.log(response.body);

    // TODO parse response.body ...
    // return array of *state* representatives

  });
}


function _buildRepsUrl(apiKey, addressStr) {
  addressStr = encodeURIComponent(addressStr);
  return `https://www.googleapis.com/civicinfo/v2/representatives?key=${apiKey}&address=${addressStr}`;
}


module.exports = {
  getStateRepresentatives
};
