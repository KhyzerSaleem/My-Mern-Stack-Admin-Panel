const Service = require("./models/service-model");

const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json({ error: "No Services available" });
      return;
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    // next(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = services;
