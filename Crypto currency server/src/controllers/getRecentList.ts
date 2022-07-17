import { RequestHandler } from "express";
import { getListRecent } from "../database";

const getRecentList: RequestHandler = async (req, res) => {
  const data = await getListRecent();
  res.json({
    message: "Last average price for all cryptocurrency",
    prices: data,
  });
};

export default getRecentList;
