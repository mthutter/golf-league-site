const path = require("path");

module.exports = async (req, res) => {
  res.render("videos");
  console.log(req.session);
};
