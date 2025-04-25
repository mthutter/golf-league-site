export default (req, res) => {
  res.redirect("/");
  console.log(req.sessio.id); 
};
