import { v4 as uuid } from 'uuid';

export default async (req, res) => {
  const endpointId = uuid;
  req.session.endpointId = endpointId;
  res.render("index");
  console.log(req.session);
};