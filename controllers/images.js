const path = require("path");

module.exports = async (req, res) => {
  res.render("images", { items: imageFiles });
  console.log(req.session);
};
