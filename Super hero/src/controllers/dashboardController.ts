import { RequestHandler } from "express";
// TODO add loging querys logic
const dashboardController: RequestHandler = async (req, res) => {
  return res.json({
    message: "You are in dashboard controller",
  });
};

export default dashboardController;
