const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    // Check if a contact with the same email already exists
    const existingContact = await Contact.findOne({ email: email });
    if (existingContact) {
      return res
        .status(422)
        .json({ msg: "Contact with this email already exists" });
    }

    // Create a new contact
    await Contact.create({ username, email, message });

    // Send a success response
    res.status(201).json("Message send successfully");
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json(error + "Message Not Delievered");
  }
};

module.exports = contactForm;
