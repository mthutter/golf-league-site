export default (req, res) => {
  res.render("register");
  console.log(req.session); 
};