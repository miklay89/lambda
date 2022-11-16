import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export default function getTokens(user_id: string, email: string, secret: string): ITokens {
  // from 30 to 60 sec
  const expTokenTime = Math.floor(30 + Math.random() * 30);
  // 2 days
  const accessToken = jwt.sign(
    {
      user_id: user_id,
      email: email,
    },
    secret,
    {
      expiresIn: expTokenTime,
    }
  );
  const refreshToken = uuidv4();
  const tokens = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  return tokens;
}