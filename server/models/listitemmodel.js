const mongoose = require("mongoose");

const Movieschema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  vote: {
    type: Number,
    required: true,
  },
  genre_ids: {
    type: [],
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});
const Moviemodel = mongoose.model("movies", Movieschema);

module.exports = Moviemodel;
