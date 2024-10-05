const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDB = require("./db");

// Initialize MongoDB connection
mongoDB();

// CORS setup to allow requests from your frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Middleware to parse JSON requests
app.use(express.json());

// Routes for authentication and other APIs
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api/auth', require('./Routes/Auth')); // Ensure correct route

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
