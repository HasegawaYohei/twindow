require('dotenv').config();
const connectDB = require('./db');
const getStream = require('./getStream');

const fetchTweets = (client, db, callback) => {
  const collection = db.collection('tweets');
  collection.find().limit(20).sort({"_id": -1}).toArray((err, tweets) => {
    if (err) {
      console.dir(err);
      return;
    }

    console.dir(tweets);
    getStream();
    callback(tweets);
  })
}

module.exports = fetchTweets;