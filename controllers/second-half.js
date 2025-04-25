export default async (req, res) => {
  res.render("second-half");
  console.log(req.session.id);
};
