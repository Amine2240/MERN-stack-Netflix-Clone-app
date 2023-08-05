const Moviemodel = require("../models/listitemmodel");

const postmovie = async (req, res) => {
  const newitem = new Moviemodel({ ...req.body, user_id: req.user });
  newitem.save();
  res.json(req.body);
};

const findmovie = async (req, res) => {
  try {
    const movies = await Moviemodel.find({ user_id: req.user });
    return res.json(movies);
  } catch (error) {
    console.log("error in getting");
  }
};
const deletemovie = async (req, res) => {
  try {
    const itemId = req.params.id;
    // Find and delete the item from the database
    const deletedItem = await Moviemodel.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("Error deleting item:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { postmovie, findmovie, deletemovie };
