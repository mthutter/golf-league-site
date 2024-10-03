/** @format */

const path = require("path");
const uuid = require("uuid");

module.exports = async (req, res) => {
  const endpointId = uuid.v4();
  req.session.endpointId = endpointId;
  res.render("index");
  console.log(req.session);
};
