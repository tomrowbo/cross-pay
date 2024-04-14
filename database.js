

//console.log('MongoDB URI:', process.env.MONGODB_URI); 

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://bartekwatrobinski:bVmCLWzOK0ikBLbE@cluster0.xzkotul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const databasesList = await client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));

    } catch (e) {
        console.error("Error connecting to MongoDB: ", e);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);