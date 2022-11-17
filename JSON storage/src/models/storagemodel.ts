import mongoose from "mongoose";

interface Storage {
  id: String;
  data: Object | Object[];
}

const jsonStorageSchema = new mongoose.Schema<Storage>({
  id: { type: String, required: true },
  data: { type: Object, required: true },
});

const jsonDataStorage = mongoose.model(
  "jsonDataStorage",
  jsonStorageSchema
);

export default jsonDataStorage;
