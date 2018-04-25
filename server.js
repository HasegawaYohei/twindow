const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
const app = express();
const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/app', express.static(path.join(__dirname, 'build')));
app.use('/static', express.static(path.join(__dirname, 'build/static')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.get('/tweets', (req, res) => {
  const connectDB   = require('./node/db');
  const fetchTweets = require('./node/fetchTweets');
  const returnJson  = tweets => {
    res.json(tweets);
  }

  connectDB(fetchTweets, returnJson);
});

