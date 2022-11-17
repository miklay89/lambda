import mongoose from "mongoose";
import dotenv from "dotenv";
import jsonDataStorage from "./models/storagemodel";

dotenv.config();

const MONGO_DB_URI = process.env.MONGO_DB_URI as string;

const dbObject = {
  connect: async () => {
    try {
      await mongoose.connect(MONGO_DB_URI);
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  },
  closeConnection: () => {
    mongoose.disconnect();
  },
  save: async (id: string, data: object | object[]) => {
    try {
      const dataForSaving = new jsonDataStorage({ id: id, data: data });
      await dataForSaving.save();
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  },
};

export default dbObject;
