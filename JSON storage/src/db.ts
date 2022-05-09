import mongoose from 'mongoose';
import keys from "./keys/keys";

export default function() {
  try {
    mongoose.connect(keys.MONGO_DB_URI, () => {
      console.log('Connected to database.')
    });
  }
  catch(error) {
    console.log(error);
  }
}
