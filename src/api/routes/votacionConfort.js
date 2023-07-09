const express = require('express');
const router = express.Router();
const VotacionConfort = require('../../controllers/votacionComfort/votacionConfortController');

router.post('/votacionComfort', async(req, res) => {
    await VotacionConfort.updateVotacion(req, res);
});

module.exports = router;