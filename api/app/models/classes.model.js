const mongoose = require("mongoose");

const Break = mongoose.model(
    "Classes",
    new mongoose.Schema({
        title: String,
        nb_eleves: Number,
        id_programme: String,
        id_prof: String,
        reservations_date: Array,
    })
);

module.exports = Break;


