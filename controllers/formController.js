const formData = [];

export const showForm = (req, res) => { 
  res.render("form", {data: formData}); 
};

export const submitForm = (req, res) => {
  formData.push(req.body);
  res.redirect("/");
  console.log(req.body);
};