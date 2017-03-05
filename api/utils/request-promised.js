'use strict';

// `request` with a promise interface

const request = require('request');

module.exports = function(params) {
  return new Promise((fulfill, reject) => {
    request(params, (err, response) => {
      if (err) {
        reject(err);
        return;
      }
      if (response.statusCode !== 200 && response.statusCode !== 201) {
        reject(new Error(`Invalid response ${response.statusCode}`));
        return;
      }
      fulfill(response);
    });
  });
};
