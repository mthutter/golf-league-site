const path = require("path");

module.exports = async (req, res) => {
  res.render("course");
  console.log(req.session);
};
