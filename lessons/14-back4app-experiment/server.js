// server.js

// init project
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Add the body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Initialize your connection to Back4App
const Parse = require('parse/node');
const { json } = require('body-parser');

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'woTcOnHZSKrWRhQucRxAkrs4fPZWFmxBdnOH4yFS', // This is your Application ID
  'TPkEzQBaiTVWdpBXqAK6jHLeaUjvvwsPcOybmehO', // This is your Javascript key
  'cbdbjPOsdj7S8cNsmnFTOyYgyJrksQhVu3KjuRHm' // This is your Master key (never use it in the frontend)
);

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

// Fetch tweets from the database. For now, just fetch the first 100
app.get("/api/tweets", (_, res, next) => {
	let tweetClass = Parse.Object.extend("tweet");
	let query = new Parse.Query(tweetClass);

	// Sort by their creation date
	query.descending("createdAt");

	query.find().then(results => {
		res.json(results);
	}).catch(err => {
		next(err);
	});
});

// Post a new tweet
app.post("/api/tweet", (req, res) => {
  const body = req.body;
  const user = body.user;
  const message = body.message;
  if (!user || !message) {
    res.status(400).send("Missing user or message");
  } else {

		let tweetClass = Parse.Object.extend("tweet");
		let tweet = new tweetClass();
		tweet.set("user", user);
		tweet.set("message", message);

		tweet.save().then(result => {
			res.json(result);
		}).catch(err => {
			next(err);
		});
  }
});

// listen for requests
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
