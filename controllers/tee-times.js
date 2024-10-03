const path = require("path");

module.exports = async (req, res) => {
  res.render("tee-times");
  console.log(req.session);
};
