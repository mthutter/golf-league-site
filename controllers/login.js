module.exports = (req, res) => {
  res.render("login");
  console.log(req.session);  
};
