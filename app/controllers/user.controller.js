const db = require("../models");
const User = db.users;

exports.create = (req, res) => {
  const user = User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user
    .save(user)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        msg: err.message || "something went wrong while creating user",
      });
    });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message || "something went wrong while retrieving user",
      });
    });
};

exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({ msg: "user not found" });
      }
      res.send({ msg: "user was updated" });
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message || "something went wrong while updating user",
      });
    });
};

exports.delete = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).send({ msg: "user not found" });
      }
      res.send({ msg: "user was deleted" });
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message || "something went wrong while updating user",
      });
    });
};
