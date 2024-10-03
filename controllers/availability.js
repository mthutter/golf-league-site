const path = require("path");

module.exports = async (req, res) => {
  res.render("availability");
  console.log(req.session);
};
