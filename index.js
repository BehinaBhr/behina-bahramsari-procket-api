const express = require('express');
const cors = require('cors');
const goalsRoutes = require("./routes/goals-routes");

const app = express();
const PORT = process.env.PORT || 5001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

// Middleware to link API to frontend
app.use(cors({ origin: CORS_ORIGIN })); 
app.use(express.json());

// Configuring goals endpoints
app.use('/api/goals', goalsRoutes);

// Define a start routes
app.get('/', (req, res) => {
    res.send('Welcome to Procket API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`erver is now listening at ${PORT} go to http://localhost:${PORT}/`);
});
