const express = require('express');
const router = express.Router();
const { generateAiResponse } = require('../controllers/gptController');

router.post('/generate-response', generateAiResponse);

module.exports = router;
