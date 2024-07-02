const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const {
  signupValidator,
  loginValidator,
} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authcontrollers.home);
router
  .route("/registration")
  .post(validate(signupValidator), authcontrollers.registration);
router.route("/login").post(validate(loginValidator), authcontrollers.login);
router.route("/user").get(authMiddleware, authcontrollers.user);

module.exports = router;
