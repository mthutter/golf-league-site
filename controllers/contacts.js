export default async (req, res) => {
  res.render("contacts");
  console.log(req.session);
};
