// testMongoDB.js
const { MongoClient } = require('mongodb');

async function testMongoDB() {
    const uri = process.env.MONGODB_URI;
    console.log('URI:', uri);
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected successfully to MongoDB");

        // List databases or check server status as a non-invasive operation
        const admin = client.db().admin();
        console.log("Available databases:");
        const databasesList = await admin.listDatabases(); // Lists all databases
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));

        // Alternatively, check server status
        const serverStatus = await admin.serverStatus();
        console.log("Server status:", serverStatus.connections); // Displays connection details
    } catch (e) {
        console.error("Failed to connect to MongoDB:", e);
    } finally {
        // Ensure that the client will close when you finish/error
        await client.close();
    }
}

testMongoDB();
