import { RequestHandler } from "express";
import dbObject from "../db";
import jsonDataStorage from "../models/storagemodel";
import dataValidator from "../validators/datavalidator";

const postData: RequestHandler = async (req, res) => {
  const id = req.params.id as string;
  
  if (!id || id.length == 0)
    return res.json({
      message: "Incorrect url, please type the correct url first",
    });

  const json = req.body;

  // validate data! in the end object (not empty) or arr not empty
  const validData = dataValidator(json);

  if (!validData)
    return res.json({
      message: "Incorrect type of data, please input data in JSON format.",
    });

  // check url exist in DB
  await dbObject.connect();

  const isSavedPreviously = await jsonDataStorage.findOne({ id: id });
  if (isSavedPreviously)
    return res.json({ message: "This url was used before try another one." });
  
  // save data in DB
  await dbObject.save(id, json);
  dbObject.closeConnection();
  return res.json({message: "Data was saved.", data: json})
};

export default postData;
