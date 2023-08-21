const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package

dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(express.json());
app.use(cookieParser());

// Use cors middleware with specific origin
app.use(
  cors({
    origin: "http://16.16.67.248:1234",
    credentials: true,
    secure: true, // Add this line
  })
);

const profileRoutes = require("./routes/profile");
const eventsRoutes = require("./routes/events");
const entriesRoutes = require("./routes/entries");

app.use("/profile", profileRoutes);
app.use("/events", eventsRoutes);
app.use("/entries", entriesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

module.exports = app;
