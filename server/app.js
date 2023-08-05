const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   res.setHeader('Permissions-Policy', 'ch-ua-form-factor');
//   next();
// });

require("dotenv").config();
const cookieparser = require("cookie-parser");
app.use(cookieparser());
const movierouter = require("./routes/workoutrouter");
const userrouter = require("./routes/userrouter");

mongoose
  .connect(
    "mongodb+srv://kadoumamine:9adoum2004@cluster0.afd6kpg.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/", movierouter);
app.use("/", userrouter);

app.listen(5000, () => {
  console.log("Server connected successfully");
});
