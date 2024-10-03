const path = require("path");

module.exports = async (req, res) => { 
  res.render("results");
  console.log(req.session);
};
