require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const teamMembersRoutes = require("./src/routes/teamMembersRoutes");

const app = express();
const port = process.env.PORT || 3000;
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;

app.use(bodyParser.json()); // ALLOW APPLICATION JSON
app.use(bodyParser.urlencoded({ extended: false })); // ALLOW URL ENCODED PARSER
app.use(cors()); // ALLOWED ALL CROSS ORIGIN REQUESTS

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connect to MongoDB
mongoose
  .connect(url)
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => console.log("Database connection error!", err));

app.use("/api", teamMembersRoutes);

module.exports = app;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
