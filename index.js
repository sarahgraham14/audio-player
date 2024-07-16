const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Use CORS middleware to allow all origins and methods
app.use(cors());

// Serve the index.html file from the home directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Test route to get a URL parameter from the query string
app.get('/api', (req, res) => {

    if (!req.query.url) return res.send(`Test url: ${req.query.url}`);

    testSpeed(req.query.url)

    res.send(`Test url: ${req.query.url}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

async function testSpeed(target) {

    const data = `f.req=%5B%5B%5B%22nqfuif%22%2C%22%5B%5C%22${encodeURIComponent(target)}%5C%22%2C2%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&`

    await axios.post("https://pagespeed.web.dev/_/PagespeedUi/data/batchexecute", data)
}
