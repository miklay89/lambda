const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const calcIPNumber = require('./modules/calcIPNumber');
const findByIP = require('./modules/findByIP');

app.set('trust proxy', true);
app.use(express.json());

app.get('/', async (req, res) => {
  // const ipAdress = req.body.ip;
  const ipAdress = req.ip || req.headers['x-forwarded-for'];
  const ipNumber = calcIPNumber(ipAdress);
  // console.log(ipNumber);
  const location = await findByIP(ipNumber);
  // console.log(location);
  res.status(200).send(`Okey, you are here, your's IP-ADRESS - ${ipAdress}, and you are from ${location.slice(1, location.length - 1)}`);
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});

