const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const viewCountsPath = path.join(__dirname, '../data/viewCounts.json');

// Get view counts for all posts
router.get('/', (req, res) => {
  try {
    const viewCounts = JSON.parse(fs.readFileSync(viewCountsPath, 'utf8'));
    res.json(viewCounts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read view counts' });
  }
});

// Increment view count for a specific post
router.post('/increment/:postId', (req, res) => {
  try {
    const { postId } = req.params;
    const viewCounts = JSON.parse(fs.readFileSync(viewCountsPath, 'utf8'));

    if (!viewCounts[postId]) {
      viewCounts[postId] = 0;
    }

    viewCounts[postId]++;

    fs.writeFileSync(viewCountsPath, JSON.stringify(viewCounts, null, 2));

    res.json({ postId, views: viewCounts[postId] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update view count' });
  }
});

module.exports = router;
