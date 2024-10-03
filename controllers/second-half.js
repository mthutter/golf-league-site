const path = require("path");

module.exports = async (req, res) => {
  res.render("second-half");
  console.log(req.session);
};
