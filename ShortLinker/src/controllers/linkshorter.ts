import shortId from "shortid";
import dotenv from "dotenv";
import { RequestHandler } from "express";
import Hash from "../libs/db";

dotenv.config();

const PORT = (process.env.PORT as string) || 5000;

const linkshorter: RequestHandler = async (req, res) => {
  const { link } = req.body;

  if (!link) {
    res.json({
      message: "link in body is required",
    });
    return;
  }

  const shortLink = `localhost:${PORT}/${shortId.generate()}`;
  const longLink = link as string;

  // check if link saved
  const isSaved = await Hash.findOne({ longLink }).catch((err) => {
    console.log("Error while searching in DB - ", err);
  });
  if (isSaved) {
    res.json({ shortLink: isSaved.shortLink });
    return;
  }

  // stroring links to db
  const data = new Hash({ shortLink, longLink });
  await data.save().catch((err) => {
    console.log("Error while saving to DB - ", err);
  });

  res.json({
    shortLink,
  });
};

export default linkshorter;
