const db = require("../models");
const { details } = db;
// Create and Save a new User
exports.create = (req, res) => {
  if (!req.body.firstName) {
    res.status(400).send({ message: "First name can not be empty!" });
    return;
  }
  if (!req.body.lastName) {
    res.status(400).send({ message: "Last name can not be empty!" });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({ message: "Email can not be empty!" });
    return;
  }
  if (!req.body.dob) {
    res.status(400).send({ message: "DOb can not be empty!" });
    return;
  }
  if (!req.body.bio) {
    res.status(400).send({ message: "BIO can not be empty!" });
    return;
  }
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const obj = new details.form_crud({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob,
    bio: req.body.bio,
  });
  // Save in the database
  obj
    .save(obj)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};
// Retrieve single user.
exports.user = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Need an id to get user data",
    });
  }
  const id = req.params.id;
  details.form_crud
    .find({ _id: id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the user.",
      });
    });
};
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  details.form_crud
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};
// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  details.form_crud
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  details.form_crud
    .findByIdAndRemove({ _id: id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
