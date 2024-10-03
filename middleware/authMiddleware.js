const User = require("../models/database");

export default (req, res, next) => {
  User.findById(req.session.userId, (error, user) => {
    if (error || !user) return res.redirect("/");
    next();
  });
};
