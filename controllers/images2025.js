export default async (req, res) => {
  res.render("images2025", { items: imageFiles2025 });
  console.log(req.session);
};
