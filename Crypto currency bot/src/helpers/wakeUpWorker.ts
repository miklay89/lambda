import dotenv from "dotenv";
import getListRecent from "../controllers/getListRecent";

dotenv.config();

const awakeWorker = setInterval(async () => {
  let response = await getListRecent();
  response = "";
  console.log(`Response now - ${response}`);
}, 1740000);

export default awakeWorker;
