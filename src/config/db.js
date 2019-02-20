import mongoose from 'mongoose';

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB;
console.log(`mongodb://${username}:${password}@${host}:${port}/${dbName}`);
mongoose.connect(
  `mongodb://${username}:${password}@${host}:${port}/${dbName}`
);

export default mongoose;
