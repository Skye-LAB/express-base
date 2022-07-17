const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.users;

const emailExist = async (email) => {
  const mailExist = await User.findOne({ email: email });
  if (mailExist) {
    return true;
  }

  return false;
};

const genHashedPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

exports.create = async (req, res) => {
  if (await emailExist(req.body.email))
    return res.status(400).send("Email already exists");

  password = await genHashedPass(req.body.password);

  const user = User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: password,
  });

  try {
    let savedUser = await user.save(user);
    res.send(savedUser);
  } catch (err) {
    res.status(409).send({
      msg: err.message || "something went wrong while creating user",
    });
  }
};

exports.login = async (req, res) => {   
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email is not exists");
  
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");
  
    const token = jwt.sign({ id: user.id }, process.env.TOKEN);
    res.header('auth-token', token).send({
      user: {
        id: user.id,
        username: user.username,
        admin: user.admin,
      }
    });
  };

exports.findOne = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send({
      msg: err.message || "something went wrong while retrieving user",
    });
  }
};

exports.update = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      res.status(404).send({ msg: "user not found" });
    }
    res.send({ msg: "user was updated" });
  } catch (err) {
    res.status(500).send({
      msg: err.message || "something went wrong while updating user",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send({ msg: "user not found" });
    }
    res.send({ msg: "user was deleted" });
  } catch (err) {
    res.status(500).send({
      msg: err.message || "something went wrong while deleting user",
    });
  }
};
