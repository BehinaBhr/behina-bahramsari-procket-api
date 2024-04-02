const express = require('express');
const cors = require('cors');
const goalsRoutes = require("./routes/goals-routes");
const tasksRoutes = require("./routes/tasks-routes");
const procrastinationsRoutes = require("./routes/procrastinations-routes");
const rocketsRoutes = require("./routes/rockets-routes");

const app = express();
const PORT = process.env.PORT || 5001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(express.static("public"));

// Middleware to link API to frontend
app.use(cors({ origin: CORS_ORIGIN })); 
app.use(express.json());

// Configuring goals endpoints
app.use('/api/goals', goalsRoutes);

// Configuring tasks endpoints
app.use('/api/tasks', tasksRoutes);

// Configuring procrastinations endpoints
app.use('/api/procrastinations', procrastinationsRoutes);

// Configuring rockets endpoints
app.use('/api/rockets', rocketsRoutes);

// Define a start routes
app.get('/', (req, res) => {
    res.send('Welcome to Procket API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`erver is now listening at ${PORT} go to http://localhost:${PORT}/`);
});
