// exports.allAccess = (req, res) => {
//   res.status(200).send("Public Content.");
// };
//
// exports.userBoard = (req, res) => {
//   res.status(200).send("User Content.");
// };
//
// exports.adminBoard = (req, res) => {
//   res.status(200).send("Admin Content.");
// };
//
// exports.moderatorBoard = (req, res) => {
//   res.status(200).send("Moderator Content.");
// };

const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

// Recup all user with role
exports.allAccess = (req, res) => {
    User.find({})
        .populate("roles", "-__v")
        .exec((err, users) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(users);
        });
}

// Find one user with role
exports.userBoard = (req, res) => {
    User.findById(req.userId)
        .populate("roles", "-__v")
        .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(user);
        });
}

// Delete user
exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(user);
    });
}

