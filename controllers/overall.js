const path = require("path");

module.exports = async (req, res) => { 
  res.render("overall");
  console.log(req.session);
};
