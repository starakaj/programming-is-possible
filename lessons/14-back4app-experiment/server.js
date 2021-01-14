// server.js

// init project
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Add the body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Special piece for running with webpack dev server
if (process.env.NODE_ENV === "development") {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.dev.config.js');
  const compiler = webpack(config);

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

const dummyData = [
  {user: "Tom", message: "Hi I'm Tom"},
  {user: "Alex", message: "Hi I'm Alex"},
  {user: "Tom", message: "Hi Alex, nice to meet you"}
];

// Fetch tweets from the database
app.get("/api/tweets", (_, res) => {
  res.json(dummyData);
});

// Post a new tweet
app.post("/api/tweet", (req, res) => {
  const body = req.body;
  const user = body.user;
  const message = body.message;
  if (!user || !message) {
    res.status(400).send("Missing user or message");
  } else {
    dummyData.push({user, message});
    res.sendStatus(200);
  }
});

// listen for requests
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
