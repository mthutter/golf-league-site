export default async (req, res) => {
  res.render("images2024", { items: imageFiles2024 });
  console.log(req.session);
};
