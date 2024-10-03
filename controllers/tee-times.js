export default async (req, res) => {
  res.render("tee-times");
  console.log(req.session);
};
