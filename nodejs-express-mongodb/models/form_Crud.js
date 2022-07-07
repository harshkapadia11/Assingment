const mongoose = require("mongoose");
module.exports.form_crud = mongoose.model(
  "form_crud",
  mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    dob: { type: Date },
    bio: String,
  })
);