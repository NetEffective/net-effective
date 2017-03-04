'use strict';

const {Router} = require('express');

const topRouter = new Router;
module.exports = topRouter;

////// BILLS //////

const billsRouter = new Router;
topRouter.use('/bills', billsRouter);


// all `/bills/*` endpoints need the app data to be loaded.
billsRouter.use((req, res, next) => {
  const {app} = req;
  if (! (app.data && app.data.bills && app.data.bills.length)) {
    res.status(500).json({ error: 'Bills data is not available' });
  }
  // Available downstream
  next();
});

billsRouter.get('/all', (req, res, next) => {
  res.json(req.app.data.bills);
});

billsRouter.get('/state/:stateCode', (req, res, next) => {
  const bills = req.app.data.bills;
  const requestedState = req.params.stateCode;
  const billsByState = bills.filter((bill) => bill.state === requestedState);
  console.log(`Serving ${billsByState.length} bills for ${requestedState}`);
  res.json(billsByState);
});
