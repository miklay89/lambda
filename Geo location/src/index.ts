import express from "express";
import calcIPNumber from "./modules/ipnumbertodecimal";
import findByIP from "./modules/findbyip";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.post("/", async (req, res) => {
  if (!req.body.ip) return res.json({ message: "IP-address is required." });
  const ipAddress = req.body.ip;
  const ipToDecimal = calcIPNumber(ipAddress);
  const location = await findByIP(ipToDecimal);

  if (!location) {
    return res.json({
      message: `You are not from our planet!)`,
      ip_address: ipAddress,
    });
  }

  res.json({
    message: `Okay, you are  from - ${location}`,
    ip_address: ipAddress,
  });
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
