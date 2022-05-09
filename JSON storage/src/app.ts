import keys from './keys/keys';
import express from 'express';
import { json } from 'body-parser';
import dataBase from "./db";

import storageRoutes from './routes/storage';

const app = express();
dataBase();

app.use(json());
app.use('/storage', storageRoutes);

app.listen(keys.PORT, () => {
  console.log(`Server has been started on port ${keys.PORT}.`);
});
