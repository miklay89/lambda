import { RequestHandler } from "express";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import dbObject from "../db";
import getTokens from "../helpers/gettokens";

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET as string;

// login
const login: RequestHandler = async (req, res) => {
  try {
    if (
      typeof req.query.email !== "string" ||
      typeof req.query.password !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Email and password is required." });
    }

    const email = req.query.email.toLowerCase();
    const password = req.query.password;
    // connect to DB
    await dbObject.connect();

    const usersCollection = dbObject.usersCollection();
    const sessionsCollection = dbObject.sessionsCollection();

    // try to find user in db
    const user = await usersCollection.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Invalid User name" });
    }

    const passwordIsCorrect = await bcryptjs.compare(password, user.password);

    if (!passwordIsCorrect) {
      return res.json({ message: "Password is incorrect." });
    }

    const tokens = getTokens(user.user_id, user.email, tokenSecret);
    // 48h
    const refreshTokenExpTime = Math.floor(Date.now() + 172800000);

    const session = {
      userId: user._id,
      refreshToken: tokens.refreshToken,
      expiresIn: refreshTokenExpTime,
    };

    await sessionsCollection.insertOne(session);
    dbObject.closeConnection();
    return res.json({ tokens });
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

export default login;
