import { RequestHandler } from "express";
import { jsonDataStorage } from "../models/storage";
import { validationEntries } from "../validators/validators";

export const checkDataAndSave: RequestHandler = async (req, res, next) => {
  const id: String = req.params.id;
  const json: Object | Object[] = req.body;

  // incorrect type of data (none-JSON format)
  if(typeof json !== 'object') {
    res.end("Incorrect type of data, please input data in JSON format");
  }

  // validation of data
  if(typeof json === 'object' &&
  Object.keys(json).length !== 0 &&
  validationEntries(json)) {
    const isSaved = await saveToDB(id, json);
    if(isSaved) {
      res.end('Data was saved');
    } else {
      res.end('This url is busy try another one')
    }
  } else {
    res.end("No data included, please input some data in JSON format");
  }
}

export const getData: RequestHandler = async (req, res, next) => {
  const id: String = req.params.id; 

  const isSaved = await jsonDataStorage.findOne({ id: id });

  if(!isSaved) {
    res.end("No data founded, please input correct url");
  } else {
    res.status(200).json(isSaved?.data);
  }
}

export const urlError: RequestHandler = (req, res, next) => {
  res.end("Incorrect url, please type the correct url first");
}

async function saveToDB(id: String, json: Object | Object[]) {
  try {
    const isSaved = await jsonDataStorage.findOne({ id: id });

      if(isSaved) {
        return false;
      } else {
        const data = new jsonDataStorage({id : id, data: json});

        await data.save();
        return true;
      }
    } catch(e) {
    console.log(e);
  }
}
