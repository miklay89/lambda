import { RequestHandler } from "express";

const homeController: RequestHandler = async (req, res) => {
  return res.json({
    message: "You are in home controller",
  });
};

export default homeController;
