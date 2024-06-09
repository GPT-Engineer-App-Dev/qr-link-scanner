const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.post('/scrape', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.json({ content: text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape the URL' });
  }
});

module.exports = router;