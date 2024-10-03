const User = require("../models");
const path = require("path");

//add PG user add function

module.exports = (req, res) => {
  User.insertUserTableData(req.body, (error, user) => {
    res.redirect("/");
    console.log(req.session);
  });
};
