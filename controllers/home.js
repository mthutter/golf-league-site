export default async (req, res) => {  
  res.render("index");
  console.log(req.sessionID);
};