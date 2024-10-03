const User = require("../models");

export default (req, res) => {
  User.insertUserTableData(req.body, (error, user) => {
    res.redirect("/");
    console.log(req.session);
  });
};
