const path = require("path");

module.exports = async (req, res) => {
  console.log(req.session)
  res.render('tee-times');
};
