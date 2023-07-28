const mongoose = require("mongoose");

const Movieschema = new mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  vote: {
    type: Number,
    require: true,
  },
  genre_ids: {
    type: [],
    require: true,
  },
  id: {
    type: String,
    require: true,
  },
});
const Moviemodel = mongoose.model("movies", Movieschema);

module.exports = Moviemodel;
