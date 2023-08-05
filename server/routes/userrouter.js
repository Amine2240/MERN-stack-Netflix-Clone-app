const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userfunctions");

router.post("/signin", controllers.postsignin);
router.post("/login", controllers.postlogin);
router.post("/logout", controllers.postlogout);
router.get("/auth", controllers.authmiddlewarebool);

module.exports = router;
