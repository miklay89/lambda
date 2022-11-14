import express from "express";
import calcIPNumber from "./modules/ipnumbertodecimal";
import findByIP from "./modules/findbyip";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", async (req, res) => {
  if (!req.body.ip) return res.json({ message: "IP-address is required." });
  const ipAddress = req.body.ip;
  const ipToDecimal = calcIPNumber(ipAddress);
  const location = await findByIP(ipToDecimal);

  res.json({
    message: `Okey, you are  from - ${location.slice(1, location.length - 1)}`,
    ip_address: ipAddress, 
  });

});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
