const express = require('express');
const cors = require('cors'); // Middleware to handle cross-origin requests
const fs = require('fs'); // File system module to read the file
const app = express();
const port = 8000;

// Enable CORS
app.use(cors());


// Load data.json dynamically
let data;
try {
    data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
} catch (error) {
    console.error('Error reading or parsing data.json:', error);
    data = {}; // Fallback to empty data if the file fails to load
}

// Welcome route
app.get('/', (req, res) => {
    res.send(`<h1>Welcome Raj, your server is running!</h1>`);
});


// API route to serve data
app.get('/data', (req, res) => {
    res.json(data);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
