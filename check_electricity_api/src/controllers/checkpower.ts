import { RequestHandler } from "express";

// pc power timestamp
const timestamp = new Date();

// simple echo
const checkPower: RequestHandler = (req, res) => {
  const response = {
    isOnline: true,
    timestamp,
  };
  res.json(response);
};

export default checkPower;
