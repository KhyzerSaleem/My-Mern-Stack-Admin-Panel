const User = require("../models/user-models");

const home = async (req, res) => {
  try {
    res
      .status(200)
      .send(
        "Welcome To The Home Page Of the Admin Panel Created By Khizar Saleem"
      );
  } catch (error) {
    console.log(error);
  }
};

const registration = async (req, res) => {
  try {
    console.log(req.body);

    const { username, email, phone, password } = req.body;

    // Validate the input data
    if (!username || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists in the database
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Create New User
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(201).json({
      msg: "Registration Successfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // res.status(500).json("Internal Server Error");
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the input data
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find the User by Email
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ message: "Invaild Credentials" });
    }

    // Custom Compare password check, Bcrypt function is in user-models
    const user = await userExist.comparePassword(password);
    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`Error fromm the user Router: ${error}`);
  }
};

module.exports = { home, registration, login, user };
