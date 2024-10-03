const path = require("path");

module.exports = async (req, res) => {
  res.render("contacts");
  console.log(req.session);
};
