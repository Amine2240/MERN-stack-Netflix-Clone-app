const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usermodel = require("../models/usermodel");

const postsignin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.confirmpassword) {
      return res.json({ message: "please enter all required fields" });
    }
    if (req.body.password !== req.body.confirmpassword) {
      return res.json({ message: "please confirm password" });
    }
    if (req.body.password.length < 6) {
      return res.json({ message: "password very short" });
    }
    const existinguser = await Usermodel.findOne({ email: req.body.email });
    if (existinguser) {
      return res.json({ message: "user already existed go log in" });
    }
    const salt = await bcrypt.genSalt();

    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    const posteduser = new Usermodel({
      email: req.body.email,
      password: hashedpassword,
      confirmpassword: hashedpassword,
    });
    await posteduser.save();
    const token = jwt.sign(
      {
        user: posteduser._id,
      },
      process.env.SECRET_KEY
    );
    res.cookie("token", token, { httpOnly: true }).send();
    return res.json({ message: "sign in succesfully" });
  } catch (error) {
    console.log(error);
  }
};

const postlogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.confirmpassword) {
      return res
        .status(400)
        .json({ message: "please enter all required fields" });
    }
    if (req.body.password !== req.body.confirmpassword) {
      return res.status(400).json({ message: "please confirm password" });
    }
    if (req.body.password.length < 6) {
      return res.status(400).json({ message: "password very short" });
    }
    const existinguser = await Usermodel.findOne({ email: req.body.email });
    if (!existinguser) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const correctpassword = await bcrypt.compare(
      req.body.password,
      existinguser.password
    );
    if (!correctpassword) {
      return res.status(400).json({ message: "wrong email or password" });
    }
    const token = jwt.sign(
      {
        user: existinguser._id,
      },
      process.env.SECRET_KEY
    );

    res.cookie("token", token, { httpOnly: true }).send();  
    return res.status(200).json({ message: "login successfully" });
  } catch (error) {
    console.log(error);
  }
};

const postlogout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true }).send();
  } catch (error) {
    return res.json({ message: error });
  }
};

const authmiddlewarebool = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }

    return res.json(true);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = { postsignin, postlogin, postlogout, authmiddlewarebool };
