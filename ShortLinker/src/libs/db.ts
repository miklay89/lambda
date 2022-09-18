import mongoose from "mongoose";

const hashSchema = new mongoose.Schema({
  shortLink: {
    type: String,
    required: true,
  },
  longLink: {
    type: String,
    required: true,
  },
});

const Hash = mongoose.model("Hash", hashSchema);

export default Hash;
