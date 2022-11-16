import { RequestHandler } from "express";
import dotenv from "dotenv";
import dbObject from "../db";
import getTokens from "../helpers/gettokens";

dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET as string;

const refreshTokens: RequestHandler = async (req, res) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).json({ message: "Invalid Token." });
    const bearerHeader = req.headers.authorization;
    const bearer = bearerHeader.split(" ");
    const refreshToken = bearer[1];

    await dbObject.connect();
    const sessionsCollection = dbObject.sessionsCollection();
    const session = await sessionsCollection.findOne({
      refreshToken: refreshToken,
    });

    if (!session) return res.status(401).json({ message: "Invalid Token." });

    const usersCollection = dbObject.usersCollection();
    const user = await usersCollection.findOne({ _id: session.userId });
    if (!user) return res.status(401).json({ message: "Invalid Token." });

    const newTokens = getTokens(user.user_id, user.email, tokenSecret);

    // time of expiration - 48h
    const newRefreshTokenExpTime = Math.floor(Date.now() + 172800000);
    // update session in DB
    const newSession = {
      $set: {
        refreshToken: newTokens.refreshToken,
        expiresIn: newRefreshTokenExpTime,
      },
    };

    await sessionsCollection.updateOne(
      { refreshToken: refreshToken },
      newSession
    );

    dbObject.closeConnection();

    return res.json({ tokens: newTokens });
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

export default refreshTokens;
