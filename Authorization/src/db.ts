import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGO_DB_URI as string);

const dbObject = {
  connect: async () => {
    try {
      await client.connect();
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  },
  usersCollection: () => {
    const usersCollection = client.db("auth").collection("users");
    return usersCollection;
  },
  sessionsCollection: () => {
    const sessionsCollection = client.db("auth").collection("sessions");
    return sessionsCollection;
  },
  closeConnection: () => {
    client.close();
  },
};

export default dbObject;

// ctrl+c end conection with DB
// process.on("SIGINT", () => {
//   dbClient.close();
// });