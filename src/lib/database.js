const { MongoClient } = require("mongodb");

let db = null;
async function initDatabase() {
  // Connection URL
  const url = "mongodb://localhost:27017/master-password";
  // Database Name
  const dbName = "master-password";

  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // Use connect method to connect to the Server
  await client.connect();

  db = client.db(dbName);
}

async function getCollection(collectionName) {
  if (!db) {
    await initDatabase();
  }
  return db.collection(collectionName);
}

exports.initDatabase = initDatabase;
exports.getCollection = getCollection;
