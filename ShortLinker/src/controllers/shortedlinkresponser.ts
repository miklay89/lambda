import { RequestHandler } from "express";
import dotenv from "dotenv";
import Hash from "../libs/db";

dotenv.config();

const PORT = (process.env.PORT as string) || 5000;

const shortedLinkResponser: RequestHandler = async (req, res) => {
  const id = req.params.id as string;

  if (!id) {
    res.json({
      message: "id is required",
    });
    return;
  }

  const fullPath = `localhost:${PORT}/${id}`;

  // check if link stored in DB
  const isSaved = await Hash.findOne({ shortLink: fullPath }).catch((err) => {
    console.log("Error while searching in DB - ", err);
  });

  if (isSaved) {
    res.redirect(isSaved.longLink);
    return;
  }

  res.json({
    message: `${id} is incorrect.`,
  });
};

export default shortedLinkResponser;
