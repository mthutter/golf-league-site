export default async (req, res) => {
  res.render("tee-times");
  console.table(req.sessionID);
};
