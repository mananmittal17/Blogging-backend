const {MongoClient} = require('mongodb')

const url = "mongodb://127.0.0.1:27017";
const dbName = "Bloggers-db"
const client  = new MongoClient(url);


async function dbConnect ( collectionName){
  let result =await client.connect();
 db = result.db(dbName)
 return db.collection(collectionName)
}

module.exports = dbConnect;