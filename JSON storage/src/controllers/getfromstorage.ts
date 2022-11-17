import { RequestHandler } from "express";
import dbObject from "../db";
import jsonDataStorage from "../models/storagemodel";

const getData: RequestHandler = async (req, res) => {
  const id = req.params.id as string;

  if (!id || id.length == 0)
    return res.json({
      message: "Incorrect url, please type the correct url first",
    });

  await dbObject.connect();

  const dataFromDB = await jsonDataStorage.findOne({ id: id });

  if (!dataFromDB)
    return res.json({
      message: "No data founded in DB, please input correct url.",
    });

  dbObject.closeConnection();

  return res.json({ data: dataFromDB.data });
};

export default getData;
