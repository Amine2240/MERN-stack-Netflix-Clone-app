const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   res.setHeader('Permissions-Policy', 'ch-ua-form-factor');
//   next();
// });
const Usermodel = require("./models/usermodel");
const Moviemodel = require("./models/listitemmodel");

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

// app.get("/", (req, res) => {
//   Usermodel.find({}, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });
//user
app.post("/", async (req, res) => {
  const newform = new Usermodel(req.body);
  newform.save();
  res.json(req.body);
});

//movie
app.post("/netflix", async (req, res) => {
  const newitem = new Moviemodel(req.body);
  newitem.save();
  res.json(req.body);
});

app.get("/netflix", async (req, res) => {
  try {
    const movies = await Moviemodel.find();
    return res.json(movies);
  } catch (error) {
    console.log("error in getting");
  }
});
app.delete("/netflix/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    // Find and delete the item from the database
    const deletedItem = await Moviemodel.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    } else {
      return res.json({ message: "Item deleted successfully" });
    }
  } catch (err) {
    console.error("Error deleting item:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5000, () => {
  console.log("Server connected successfully");
});
