const express = require('express');
const path = require('path');
const router = express.Router();
// const valueIteration = require('./routes/valueIteration')
const votacionConfort = require('./routes/votacionConfort')
    // const realTimeAC = require('./routes/realTimeAC');

router
// .use('/valueIterationRL', valueIteration)
    .use('/votacionComfortRL', votacionConfort)
    // .use('/realTimeACRL', realTimeAC)

module.exports = router