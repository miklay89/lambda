import { RequestHandler } from "express";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import dbObject from "../db";
import getTokens from "../helpers/gettokens";

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET as string;

// sign up
const signUp: RequestHandler = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res
        .status(400)
        .json({ message: "Email and password is required." });

    const email = (req.body.email as string).toLowerCase();
    const password = req.body.password as string;
    await dbObject.connect();
    const usersCollection = dbObject.usersCollection();

    const userExist = await usersCollection.findOne({ email: email });
    if (userExist) {
      return res.status(200).json({ message: "User is exist" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = {
      email: email,
      password: hashedPassword,
    };

    await usersCollection.insertOne(user);
    dbObject.closeConnection();
    return res.status(200).json({ message: "User is registered." });
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};

export default signUp;
