const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500,
  },
});

const Contact = new mongoose.model("Contact", contactSchema);

module.exports = Contact;
