'use strict';

const {Router} = require('express');

const router = new Router;
module.exports = router;

router.get('/bills/all', (req, res, next) => {
  const {app} = req;
  if (app.data && app.data.bills && app.data.bills.length) {
    res.json(app.data.bills);
  } else {
    res.status(500).json({ error: 'Bills data is not available' });
  }
});
