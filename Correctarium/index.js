const express = require ('express');
const fs = require('fs');
const path = require('path');
const {calcPrice, calcTime, calcDeadline} = require("./logic");
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/', async (req, res) => {
  const data = await req.body;
  const language = data.language;
  const mimetype = data.mimetype;
  const count = data.count;
  const price = await calcPrice(language, mimetype, count);
  const time = await calcTime(language, mimetype, count);
  const date = Date.now();
  const deadline = await calcDeadline(language, mimetype, count, date);
  const deadlineDate = (new Date(deadline)).getDate() + 
  '/' + ((new Date(deadline)).getMonth() + 1) + 
  '/' + (new Date(deadline)).getFullYear() + 
  ' ' + (new Date(deadline)).getHours() + 
  ':' + (new Date(deadline)).getMinutes() + 
  ':' + (new Date(deadline)).getSeconds();
  const calculation = {
    price: price,
    time: (time/1000/60/60),
    deadline: Math.floor(deadline/1000),
    deadline_date: deadlineDate
  };

  switch(calculation.price) {
    case "Language error":
      res.json("Language error");
      break;
    case "Doctype error":
      res.json("Doctype error");
    default:
      res.json(calculation);
  }
});


app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => {
  console.log("Server has been started on port 3000...");
});