const express = require('express');
const cors = require('cors');
const sampleRoutes = require("./routes/sample-routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

// Middleware to link API to frontend
app.use(cors({ origin: CORS_ORIGIN })); 
app.use(express.json());

app.use('/api/sample', sampleRoutes);
// Define a start routes
app.get('/', (req, res) => {
    res.send('Welcome to Procket API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`erver is now listening at ${PORT} go to http://localhost:${PORT}/`);
});
