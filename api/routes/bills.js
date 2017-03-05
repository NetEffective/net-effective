'use strict';

const {Router} = require('express');

const router = new Router;
module.exports = router;

// all `/bills/*` endpoints need the app data to be loaded.
router.use((req, res, next) => {
  const {app} = req;
  if (! (app.data && app.data.bills && app.data.bills.length)) {
    res.status(500).json({ error: 'Bills data is not available' });
  }
  // Available downstream
  next();
});

router.get('/all', (req, res, next) => {
  res.json(req.app.data.bills);
});

router.get('/state/:stateCode', (req, res, next) => {
  const bills = req.app.data.bills;
  const requestedState = req.params.stateCode;
  const billsByState = bills.filter((bill) => bill.state === requestedState);
  console.log(`Serving ${billsByState.length} bills for ${requestedState}`);
  res.json({bills: billsByState});
});
