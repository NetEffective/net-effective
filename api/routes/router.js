'use strict';

const {Router} = require('express');

const router = new Router;
module.exports = router;

router.use('/bills', require('./bills'));
router.use('/reps', require('./reps'));



