const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.classes = require("./classes.model");


db.ROLES = ["staff", "prof", "eleve"];

module.exports = db;