

//console.log('MongoDB URI:', process.env.MONGODB_URI); 
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "your-mongodb-uri"; // It's safer to use an environment variable for your URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let isConnectedBefore = false;

export async function connectToMongoDB() {
  if (!isConnectedBefore) {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
      isConnectedBefore = true;
    } catch (e) {
      console.error("Error connecting to MongoDB: ", e);
    }
  }
  return client;
}

// You can choose to retain this for testing purposes or comment it out in production
async function run() {
  try {
    const client = await connectToMongoDB();
    const db = client.db('test'); // replace 'test' with your database name
    console.log("Databases:");
    const databasesList = await db.admin().listDatabases();
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  } catch (e) {
    console.error("Error running MongoDB operation: ", e);
  } 
}


run().catch(console.dir);