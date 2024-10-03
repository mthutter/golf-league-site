export default async (req, res) => {
  res.render("course");
  console.log(req.session);
};
