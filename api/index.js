const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const uniRoute = require("./routes/uniPages");
const searchRoute = require("./routes/search");
const watchlistRoute = require("./routes/watchlist");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/watchlist", watchlistRoute);
app.use("/api/search", searchRoute);
app.use("/api/auth", authRoute);
app.use("/api/uniPages", uniRoute);


app.listen("5000", () => {
  console.log("Backend is running.");
});