const config = require("../config/auth.config");
const db = require("../models");
const Classes = db.classes;


// Get all classes
exports.getAll = (req, res) => {
    Classes.find()
        .then(classes => {
            res.send(classes);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving classes."
            });
        });
}


// create
exports.create = (req, res) => {
    const classes = new Classes({
        title: req.body.title,
        time: req.body.temps,
    });

    classes.save(classes)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Classes."
                });
            }
        );
}


// Delete

exports.delete = (req, res) => {
    const id = req.params.id;

    Classes.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Classes with id=${id}. Maybe Classes was not found!`
                });
            } else {
                res.send({
                    message: "Classes was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Classes with id=" + id
            });
        });
}

// Find by ID
exports.findOne = (req, res) => {
    Classes.findById(req.params.id)
        .then(data => {
                if (!data)
                    res.status(404).send({message: "Not found Classes with id " + req.params.id});
                else res.send(data);
            }
        )
        .catch(err => {
                res
                    .status(500)
                    .send({message: "Error retrieving Classes with id=" + req.params.id});
            }
        );
}

// Update
exports.update = (req, res) => {
    // Update a Classes by the id in the request
    const id = req.params.id;

    Classes.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Classes with id=${id}. Maybe Classes was not found!`
                });
            } else res.send({message: "Classes was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Classes with id=" + id
            });
        });
}