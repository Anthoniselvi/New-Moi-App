const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDatabase = require("./config/database");

const app = express();

// Connect to the database
connectDatabase();

// Enable CORS for all routes
app.use(cors());

// ... your other middleware and routes ...

const port = process.env.PORT || 1234;

// Bind the server to all network interfaces
app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port} in ${process.env.NODE_ENV}`);
});
