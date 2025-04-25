export default async (req, res) => {
  res.render("first-half");
  console.log(req.session.id);
};
