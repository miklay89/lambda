import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET as string;

const checkTokens: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }
    const decode = jwt.verify(token, tokenSecret);
    req.body.decode = decode;
    next();
  } catch (err) {
    res.status(401).json({message: "Unauthorized"});
  }
};

export default checkTokens;
