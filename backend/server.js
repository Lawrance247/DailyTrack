const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");

//FIRST create app
const app = express();

// THEN middleware
app.use(express.json());

app.use(cors({
  origin: "https://daygoals.netlify.app/"
}));

//THEN routes
app.use("/api/tasks", taskRoutes);

// THEN database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// THEN start server
const PORT = process.env.PORT || 5000;;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});