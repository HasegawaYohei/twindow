require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

const connectDB = (func, callback) => {
  MongoClient.connect(`${MONGODB_URI}`)
    .then(client => {
      const db = client.db(DB_NAME);
      func(client, db, callback);
    });
}

module.exports = connectDB;