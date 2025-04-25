export default async (req, res) => {
  res.render("availability");
  console.log(req.session.id);
};
