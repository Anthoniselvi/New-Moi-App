import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import profileRoutes from "./routes/profile.js";
import eventsRoutes from "./routes/events.js";
import entriesRoutes from "./routes/entries.js";

dotenv.config();
const app = express();
app.use(express.json()); // Use express.json() instead of bodyParser.json()
app.use(cors());

app.use("/profile", profileRoutes);
app.use("/events", eventsRoutes);
app.use("/entries", entriesRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Running Server Port: ${PORT}`));
  })
  .catch((error) => console.error("MongoDB Connection Error:", error));
