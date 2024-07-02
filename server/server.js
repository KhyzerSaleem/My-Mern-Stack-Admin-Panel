require("dotenv").config();
const express = require("express");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const errorHandler = require("./middlewares/error-middleware");
const adminRoute = require("./router/admin-router");
const app = express();
const port = 3000;
const connectDb = require("./utils/db");
var cors = require("cors");

//     To handle cors Error
const corsOptions = {
  origin: "*",
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  Credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json()); //Middleware for using json Data

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

app.use(errorHandler);

connectDb().then(() => {
  app.listen(port, () => console.log(`Server is listening on port ${port}!`));
});
