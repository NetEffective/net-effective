'use strict';

const {Router} = require('express');

const router = new Router;
module.exports = router;

const civicInfo = require('../services/civic-info');

router.get('/', (req, res, next) => {
  const address = req.query.address;
  if (!address) {
    res.status(400).json({ error: 'Missing address parameter' });
    return;
  }

  civicInfo.getStateRepresentatives(address)
    .then ((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: 'An error occurred finding your representatives.' });
    });
});
