const express = require("express");
const router = express.Router();
const controllers = require("../controllers/workoutfunctions");
const authmiddleware = require("../middleware/authmiddleware");

router.post("/netflix", authmiddleware, controllers.postmovie);
router.get("/netflix", authmiddleware, controllers.findmovie);
router.delete("/netflix/:id", authmiddleware, controllers.deletemovie);

module.exports = router;
