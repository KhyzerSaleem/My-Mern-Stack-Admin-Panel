const adminMiddleware = async (req, res, next) => {
  try {
    // console.log(req.user);
    if (req.user.isAdmin) {
      //   res.status(200).json({ message: req.user.isAdmin });
      next();
    } else {
      res
        .status(403)
        .json({ message: "Unauthorized Access, User is not admin" });
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = adminMiddleware;
