const axios = require('axios');
const express = require('express');

const { Router } = express;

const router = new Router();

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = router;
