// server.js

// init project
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");

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

// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});

// Space to store players, by player id
const players = {};

// Map from a connection id, to the player id that the connection owns
const playersByConnectionId = {};

// Start a web socket server
const wsServer = new WebSocket.Server({ server: listener });

function broadcastPlayers() {
  wsServer.clients.forEach(client => {
    client.send(
      JSON.stringify(players)
    );
  });
}

// Handle new connections
wsServer.on("connection", (ws) => {

  // Generate a new UID for this websocket
  const wsid = uuidv4();

  // First, send the connection the struct containing the players
  ws.send(JSON.stringify(players));

  // Update players whenever a new move gets made
  ws.on("message", (data) => {
    const player = JSON.parse(data);
    players[player.id] = player;
    playersByConnectionId[wsid] = player.id;
    broadcastPlayers();
  });

  // Clean up when the player disconnects
  ws.on("close", () => {
    const playerid = playersByConnectionId[wsid];
    if (playerid) delete players[playerid];
    delete playersByConnectionId[wsid];
    broadcastPlayers();
  });
});
