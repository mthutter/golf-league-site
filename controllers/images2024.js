export default async (req, res) => {
  res.render("images", { items: imageFiles });
  console.log(req.session);
};
