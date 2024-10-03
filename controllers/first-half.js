const path = require("path");

module.exports = async (req, res) => {
  res.render("first-half");
  console.log(req.session);
};
