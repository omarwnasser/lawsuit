import * as mongoose from 'mongoose';

async function setMongo(): Promise<any> {
  let mongodbURI;
  if (process.env.NODE_ENV === 'test') {
    mongodbURI = process.env.MONGODB_TEST_URI;
  } else {
    mongodbURI = process.env.MONGODB_URI;
  }
  // Connect to MongoDB using Mongoose
  await mongoose.connect(mongodbURI);
  console.log('Connected to MongoDB');
}

export default setMongo;
