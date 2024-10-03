module.exports = (req, res) => {
  res.redirect("/");
  console.log(req.session); 
};
