import express from "express";
import { calcPrice, calcTime, calcDeadline } from "./logic";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.post("/", async (req, res) => {
  const { language, mimetype, count } = req.body;
  if (
    typeof language !== "string" ||
    typeof mimetype !== "string" ||
    typeof count !== "number"
  ) {
    return res.json({
      message: "Input incorrect language, mimetype and count is required",
    });
  }

  const price = calcPrice(language, mimetype, count);
  const timeForWorkInMS = calcTime(language, mimetype, count);
  
  if (typeof price === "string") {
    return res.json({ message: price });
  }
  if (typeof timeForWorkInMS === "string") {
    return res.json({ message: price });
  }
  
  const dateNow = Date.now();
  const deadline = calcDeadline(timeForWorkInMS, dateNow);
  const calculation = {
      price: price,
      time: (timeForWorkInMS / 1000 / 60 / 60),
      deadlineTimeStamp: deadline.deadlineTimestamp,
      deadline_date: deadline.deadlineDate,
    };
  res.json({calculation});
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
