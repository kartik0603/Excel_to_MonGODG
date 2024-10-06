const express = require("express");
const connectDB = require("./config/db");
const dataRouter = require("./routes/data.route");

const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(express.json());

// middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/data',dataRouter);


// html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen("8000", () => {
  console.log("Server is running on port 8000");
  connectDB();
});
