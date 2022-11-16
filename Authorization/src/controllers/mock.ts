import { RequestHandler } from "express";

const mock: RequestHandler = (req, res) => {
  const id = req.params.id;
  const email = req.body.decode.email;
  const result = {
    request_num: +id,
    data: {
      username: email,
    },
  };

  return res.json(result);
};

export default mock;
