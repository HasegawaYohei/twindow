require('dotenv').config();
const connectDB = require('./db');
const twitter = require('ntwitter');
const tw = new twitter({
  consumer_key:        process.env.CONSUMER_KEY,
  consumer_secret:     process.env.CONSUMER_SECRET,
  access_token_key:    process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let tweets = [];

const insertTweets = (client, db, callback) => {
  const collection = db.collection('tweets');
  collection.insertMany(tweets, (err, result) => {
    if (err) {
      console.dir(err);
      return;
    }
    tweets = [];
    callback(result);
  });
  client.close();
}

let fetching = false;
const regexpUrl = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g;
const pushData = data => {
  if (data.user.lang !== 'ja') return;
  if (data.text.slice(0, 1) === '@') return;
  if (data.text.slice(0, 2) === 'RT') return;

  const formatData = {
    name: data.user.name,
    screenName: `@${data.user.screen_name}`,
    image: data.user.profile_image_url,
    tweet: data.text
  }
  tweets.push(formatData);
}

const getStream = () => {
  if (fetching === true) return;
  fetching = true;
  tw.stream('statuses/sample', {}, stream => {
    stream.on('data', data => {
      pushData(data);
    });
    stream.on('destroy', response => {
      if (tweets.length === 0) return;
      fetching = false;
      connectDB(insertTweets, () => {});
    });
    setTimeout(stream.destroy, 8000);
  });
}

module.exports = getStream;