import mongoose from 'mongoose';

const username = process.env.MONGOOSE_USER;
const password = process.env.MONGOOSE_PASSWORD;
const uri = process.env.MONGOOSE_URI;

mongoose.connect(
  `mongodb://${username}:${password}@${uri}`
);

export default mongoose;
