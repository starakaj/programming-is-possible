# Advanced JS and MMORPGs

## Authors
Sam Tarakajian for NYU IDM

DM-GY 6063

@starakaj

## Essential Questions
- How can different parts of a JS application communicate?
- How does bidirectional communication over WebSockets work?
- How can multiple client applications share state?
- What is serialization?

## Introduction
As JavaScript applications—or indeed applications in any languaeg—grow larger, we start to run into certain challenges. In this class, we'll explore some libraries and patterns that help us deal with that growing complexity.

### Target Audience / Prerequisite & Pre-Assessment
This module is part of DM-GY 9103, _Programming is the Art of the Possible_. This is a second semester creative coding course, designed for students who have a strong JavaScript foundation.

### Outcomes & Goals
- In this class we will use WebSockets EventEmitters, class inheritance and other advanced JavaScript techniques.
- Students will walk away with a deeper understanding of how to make the JavaScript applications of their dreams.

### Pacing / Duration
TBD

## Materials Needed
Node, internet connection, laptop

### Vocabulary 
* Full-duplex - Communnication transport layer where both endpoints can send and receive information.
* Inheritance - Object-oriented programming technique for defining the relationship between classes. Child classes inherit the methods and properties of their parent.

## Exercise Descriptions
So our goal for this class is to make an online multiplayer game. It's not a very complex game, but it's one that we can build on later. You can play it right now at http://bonito-flakes.herokuapp.com/

We'll be working from yet another starter, this one at https://github.com/starakaj/express-game-starter. 

### Looking over the code

Let's go on a quick code tour. If you check out `app.js`, you'll see some very familiare p5 boilerplate. We make a 10x10 grid by drawing lines on a 400x400 pixel canvas. In fact there's not much going on in this file, it looks like most of the action is inside this `game.js` file. If we look in there, we can see some code that might look familar from the `Particle` class in the optical flow lesson, [Lesson 08](../08-video/08-video.md). The game code creates a bit of data containing the information needed to describe a player: the player's x position, y position and color. There's no update function, but there is a `draw` function that, as expected, takes the `p5` drawing context as a variable `p` that is used to draw. This simply draws the player at the player's positon.

### Adding some movement

For this to be a game it needs to have some interactivity. Let's start by making it possible to move the little square around. We can accept keyboard input in our `p5` sketch by implementing a `keyPressd` method.

```js
// app.js
const sketch = (p) => {

// ...

    p.keyPressed = () => {
        console.log(p.key);
    }
}
```

is enough to log which key was pressed. Next thing we need to do is figure out exactly what to do with this information? Obviously when we press a key left, we want the shape to move left, and when we press right we should move right. In order to actually move the shape, we can make a clean separation between the responsibilities of `game` and `app` by saying that the `game` should be responsible for actually updating the player depending on the button.

```js
// app.js
const sketch = (p) => {

// ...

    p.keyPressed = () => {
        game.handleInput(p.key);
    }
}
```

```js
// game.js

    _movePlayer(dx, dy) {
        this._player.x += dx;
        this._player.y += dy;
    }

    handleInput(key) {
        if (key === "ArrowLeft") {
            this._movePlayer(-1, 0);
        } else if (key === "ArrowRight") {
            this._movePlayer(1, 0);
        } else if (key === "ArrowUp") {
            this._movePlayer(0, -1);
        } else if (key === "ArrowDown") {
            this._movePlayer(0, 1);
        }
    }
```

We've added a helper function called `_movePlayer`. The prefix underscore is a stylistic choice, inteded to indicate that this method is private. JavaScript doesn't actually support method visibility, but we can hint to anyone using the `Game` class that we don't intend for the `_movePlayer` method to be called from outside `Game`. One small thing we might want to address here, it's currently possible for the player to escape the boundaries of the game and wander off. We can add another helper to make sure that the box stays within bounds. This particular helper function might be useful outside of `Game`, so we can create a `util.js` file and put it in there.

```js
// util.js

module.exports = {
    clamp: (x, min, max) => {
        if (x < min) return min;
        if (x > max) return max;
        return x;
    }
}
```

```js
// game.js
const { clamp }  = require("./util");

// ...

    _movePlayer(dx, dy) {
        this._player.x = clamp(this._player.x + dx, 0, this._columns);
        this._player.y = clamp(this._player.y + dy, 0, this._rows);
    }
```

Now the box is stuck right where we want it. Actually... is it? It looks like we've got an off-by-one error. We need to make sure that the box can go up to, but not reach the number of rows or columns.

```js
// game.js
const { clamp }  = require("./util");

// ...

    _movePlayer(dx, dy) {
        this._player.x = clamp(this._player.x + dx, 0, this._columns - 1);
        this._player.y = clamp(this._player.y + dy, 0, this._rows - 1);
    }
```

### Multiplayer Support

So, now how do we get more than one player in this game? At the highest possible level, when we do something in our version of the world, we'd like for that to appear on the other players' screens. How could we go about that? There are two basic approaches to this kind of problem. One, which might seem like most direct way, is to simply send every other player every move that you make, and to recieve moves from all other players. This is known as a peer-to-peer approach. There are two major challenges with this approach, The first is simply discovering each other. When two people navigate to the same website, there's no immediate way for them to find out about each other, unless the server records information about each one, and makes that information available somehow. The other challenge is synchronizing state. If each player is making moves independently, how can everyone be sure that the game state is the same for each player?

These are interesting problems that smart people have thought a lot about, but we're going to approach the problem differently. Instead of sending messages to other players directly, we'll instead send messages directly to the server. It will then be up to the server to broadcast those changes to everyone else in the game. One question remains though, how will we send messages back and forth to the server? The HTTP protocol, which we're using to load the page in the first place, is not a bidirectional, full-duplex protocol. We can make requests from the server, but the server cannot push new data to us. For that we need to introduce something new, the WebSocket protocol.

WebSockets are actually built on top of HTTP (itself built on TCP). To create a websocket connection, and HTTP connection first asks to be upgraded to a websocket connection. Once that's done, the WebSocket connection can be used for exactly the kind of full-duplex communication that we need.

Let's start by just trying to make a websocket connection between the page and the server. Modern web browsers have support for WebSockets built in, so we can easily create one and try to connect to the server. Let's add a new class called `GameClient`.

```js
// gameClient.js
module.exports = class GameClient {
    constructor() {
        const pageUrl = new URL(window.location);
        pageUrl.protocol = "ws";
        this._websocket = new WebSocket(pageUrl.toString());
    }
}
```

When we create a new GameClient instances, it tries to open a WebSocket connection to the same url at the page in which it's loaded. The window location, since the page was loaded over either `http` or `https`, will be something like "http://localhost:3000". Remember that the first part of the url defines the protocol. The WebSocket protocol uses the abbreviation "ws" or "wss" (for secure web sockets). So, we can define a URL at which our websocket should connect by replacing "http" with "ws".

Back on the server side, we'll first need to install an npm package. Unlike the browser, Node doesn't have builtin WebSocket support.

```
npm install ws
```

With that installed, now we need to start a WebSocket server. One thing that's really cool is that, since WebSockets are built on top of HTTP, it's totally cool to start a WebSocket server using an existing HTTP server.

```js
// server.js
const WebSocket = require("ws");

// ...

// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});

// Start a web socket server
const wsServer = new WebSocket.Server({ server: listener });
```
This should be enough for the server and the client to connect, though we can't see anything. On the client side, let's just add a tiny bit of code so we can see when a connection starts.

```js
// gameClient.js
module.exports = class GameClient {
    constructor() {
        const pageUrl = new URL(window.location);
        pageUrl.protocol = "ws";
        this._websocket = new WebSocket(pageUrl.toString());

        this._websocket.onopen = () => {
            console.log("Started a websocket connection");
        }
    }
}
```

Last thing we need to do is actually create a `GameClient`. We can do this in `app.js`.

```js
// app.js
const p5 = require("p5");
const Game = require("./game");
const GameClient = require("./gameClient");

// ...

let game = new Game(columns, rows);
let gameClient = new GameClient();
```

Relaunch the server, load the page, open the console and you should see a nice message.

### Emitting Events

Alright, let's start by trying to send a message up to the server every time the player moves. Right off the bat, we encounter an interesting issue. We've split the game up, putting the state of the game in `Game` and all communication with the server into `GameClient`. That's great, but now when something changes in the game, we'd like to communicate that through the client. We could pass the instance of `GameClient` into `Game`, or the other way around, but this could also be a useful time to try out the `EventEmitter` pattern.

To work with events in this way, the first thing you'll want to do is to make your class extend the `EventEmitter` class.

```js
const { EventEmitter } = require("events"); // Require EventEmitter
const { clamp }  = require("./util");

module.exports = class Game extends EventEmitter { // Make your class a subclass of EventEmitter
    constructor(columns, rows) {
        super(); // Be sure to call `super()` as the first thing you do in the constructor
```

We haven't talked about inheritance yet in this class, and it might be a bit strange to first talk about it in the context of events. Nevertheless, it's a super useful way to organize and to think about your code. Especially in JavaScript, you can think of "extends" as defining how your object should be prepared before your constructor gets called. If you had a class `Cat` that extended `Animal`, when the object was constructed, the constructor for `Animal` would be called first and then passed to `Cat`. When we extend `EventEmitter`, the same principle applies. `this` is both a `Game` as well as an `EventEmitter`.

What does being an `EventEmitter` do? Well, unsurprisingly, it lets us emit events. It adds the methods `emit`, `on` and `off` (along with others) that allow other objects to subscribe to things that happen in our object. Modify `app.js` like so:

```js
// app.js

const sketch = (p) => {

    let game = new Game(columns, rows);
    let gameClient = new GameClient();
    game.on("playerMoved", player => console.log(player));
```

This is saying "When `game` emits a "playerMoved" event, call the following function with the emitted argument bound to the variable `player`. Modify `game.js` like so:

```js
// game.js

_movePlayer(dx, dy) {
    this._player.x = clamp(this._player.x + dx, 0, this._columns);
    this._player.y = clamp(this._player.y + dy, 0, this._rows);

    this.emit("playerMoved", this._player);
}
```

As you can see, every time we move the player, `Game` will emit a "playerMoved" event, passing the current player as an emitted argument. If you run the example now, you'll see the player's state printed in the console every time the player moves. Now, instead of printing that state to the console, why don't we send it to the server? Let's add a function to `gameClient.js`.

```js
// gameClient.js

module.exports = class GameClient {

// ...

    sendPlayer(player) {
        this._websocket.send(
            JSON.stringify(player)
        );
    }
}
```

Then, back in `app.js`, we can call that function every time the `Game` emits its "playerMoved" event.

```js
// app.js

// ...

const sketch = (p) => {

    let game = new Game(columns, rows);
    let gameClient = new GameClient();
    game.on("playerMoved", (player) => gameClient.sendPlayer(player));
```

This is a common JS pattern—you have different parts of the app all doing their thing, emitting events when they do. The `app.js` file, or some central file, is responsible for connecting these events to some kind of response. That way each part doesn't have to worry about what the others are doing. And believe it or not that's all we need to do to send the messages to the server. Back on the server end, we can log this messages to make sure it went through. However, things are a little bit precise on the server end. We'll come to that in a minute, but first some refactoring.

### Other players

Right now, our client side code assumes that it will be the only player in existence. But we know that we'd like to be able to draw other players as well. So, the `Game` class needs some kind of way to store a list of players as well. We could have a property like `this._otherPlayers`, but a bit cleaner might be to simply have a property `_players`, with each player associated with a particular id. How to generate this id? It's a bit overkill for this project, but there's a useful library for generating Universal Unique Identifiers—uuids—called `uuid`.

```
npm install uuid
```

Using this, let's first add to our definition of a `player` a unique identifier associated with each player. Note the `require` for `uuid` looks a little interesting—we're doing object destructuring anad renaming at the same time.

```js
// game.js
const { EventEmitter } = require("events");
const { clamp }  = require("./util");
const { v4: uuidv4 } = require("uuid");

// ...

    // Make a new player object out of a position and a color
    _makePlayer(px, py, color) {
        return {
            id: uuidv4(),
            x: px,
            y: py,
            color
        };
    }
```

Now, what about storing all of the players? I'd suggest we keep around an object that looks something like this:

```js
this._players = {
    playerIdA: <player A definition>,
    playerIdB: <player B definition>,
    playerIdC: <player C definition>,
    // ...
}
```

So, when we create a new `Game`, the first thing we do is add ourselves to the list of players. Something like this:

```js
// game.js
module.exports = class Game extends EventEmitter {
    constructor(columns, rows) {
        super();
        this._columns = columns;
        this._rows = rows;

        // Position the player in the center of the board
        this._player = this._makePlayer(
            Math.floor(this._columns / 2),
            Math.floor(this._rows / 2),
            this._makeRandomHue()
        )

        this._players = {
            [this._player.id]: this._player
        };
    }
```

Note the square brackets around `[this._player.id]`! In this context, those brackets mean first evaluate the expression inside the brackets, then use the result as a key. Finally, we need a function to draw all the players. We can update our draw function accordingly, using `Object.values` to make an iterable out of the values (as opposed to the keys) of `this._players`.

```js
// game.js

    // Draw each player as a square at the appropriate position
    draw(p, cellWidth, cellHeight) {
        p.push();
        p.strokeWeight(0);
        p.colorMode(p.HSB);
        Object.values(this._players).forEach(player => {
            p.fill(player.color);
            p.rect(
                player.x * cellWidth,
                player.y * cellHeight,
                cellWidth,
                cellHeight
            );
        });
        p.pop();
    }
```

### Managing connections on the server

In the land of the client, aka our web page, we only ever have to worry about one websocket connection. The server on the other hand will have to manage as many connections as there are people playing the game. Luckily, some cleverness with JavaScript closures means a lot of the bookkeeping gets taken care of for us. Take a look at this code:

```js
// server.js

// Start a web socket server
const wsServer = new WebSocket.Server({ server: listener });

// Handle new connections
wsServer.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log(JSON.parse(data));
  });
});
```

Two things are going on here at the same time. First, we're defining a function to be called whenever the WebSocket server establishes a new connection. What does that function do? It defines yet another function! This one listens for messages on the new connection. Whenever the connection emits a "message" event, which it does every time the other side of the connection calls `send`, it will call a callback function with the transmitted data. For now, we're simply printing that data out.

Now, each connection is sending us a new player position whenever that player moves. What are we going to do with all those player positions? Well, someone first connects to the game, the first thing they need to get is the position of all other players. So, the server needs to have all those positions ready to send back. That means we need to store the position of all players somewhere in our server.

(There is another approach, where the server doesn't actually store any information. Instead, whenever a new player connects, the server asks all connected players to re-send their current position. This is another fine solution, a bit of a hybrid, centrally-brokered peer-to-peer model. If you want to hone your skills a bit, you could try to build this yourself after class.)

Okay, so all we need to do, when a player makes a move, is update the appropriate part of some `players` object. We could do something like this:

```js
// server.js

// ...

// Space to store players, by player id
const players = {};

// Start a web socket server
const wsServer = new WebSocket.Server({ server: listener });

// Handle new connections
wsServer.on("connection", (ws) => {

  // First, send the connection the struct containing the players
  ws.send(JSON.stringify(players));

  // Update players whenever a new move gets made
  ws.on("message", (data) => {
    const player = JSON.parse(data);
    players[player.id] = player;
  });
});
```

### Handling updates from the server

Okay, now every time a new player connects to the server, they should receive a list of all other players. Now we need to update `_players` to contain the new players. We need to emit an event when new players come in, and handle it in the game. First, let's handle emiting an event from `gameClient.js`. Of course, `GameClient` will need to extend `EventEmitter` for this to work!

```js
// gameClient.js
const { EventEmitter } = require("events");

module.exports = class GameClient extends EventEmitter {
    constructor() {
        super();
        // ...

        this._websocket.onmessage = (event) => {
            const players = JSON.parse(event.data);
            this.emit("playersUpdate", players);
        };
    }
```

You'll notice that the implementation of WebSocket that we use in the browser is slightly different to the one used in Node. Rather than emit events, it has the user set the value of `onopen`, `onmessage`, and `onclose` events. Also, those functions receive and `event` object containing the sent data, rather than the data itself. In any case, now we're ready to write an `updatePlayers` function for our `Game` class.

```js
// game.js

module.exports = class Game extends EventEmitter {
    // ...

    updatePlayers(players) {
        this._players = players;
    }
```

And finally we can connect the two up in `app.js`.

```js
// app.js

    game.on("playerMoved", (player) => gameClient.sendPlayer(player));
    gameClient.on("playersUpdate", (players) => game.updatePlayers(players));
```

And now, we can restart the server, reload the page, and see the fruits of our labors!

Huh. Where did our player go?

### Object.assign

Thinking about things for a minute, it's pretty clear what happened. Take another look at our WebSocket server code:

```js
// server.js

// ...

// Space to store players, by player id
const players = {};

// Start a web socket server
const wsServer = new WebSocket.Server({ server: listener });

// Handle new connections
wsServer.on("connection", (ws) => {

  // First, send the connection the struct containing the players
  ws.send(JSON.stringify(players));

  // Update players whenever a new move gets made
  ws.on("message", (data) => {
    const player = JSON.parse(data);
    players[player.id] = player;
  });
});
```

When a new player connects, we send them an object containing all the current players. We respond by calling `updatePlayers`

```js
// game.js

module.exports = class Game extends EventEmitter {
    // ...

    updatePlayers(players) {
        this._players = players;
    }
```

Of course, when the first player connects, the game is empty, as there are no other players. So `this._players` gets set to an empty object. There's a slick way to fix this that matches with our intuition, that we don't want to overwrite the player assigned to `this._player`, the player owned by this particular instance of the game. That slick way is to make use of `Object.assign`. This function, `Object.assign`, folds a series of objects into an existing objects. If you do something like:

```js
const A = {a: 1};
const B = {b: 2};
const C = {c: 3};

Object.assign(A, B, C);

console.log(A); // prints {a: 1, b:2, c:3}
```

You can see how each subsequent object gets folded into the first. So, we could update our `updatePlayers` function to make use of Object.assign. Rather than use the `players` argument directly, we first fold our player into it.

```js
// game.js

    updatePlayers(players) {
        const ourPlayer = {
            [this._player.id]: this._player
        };

        // Make sure that our player stays in there, no matter what
        this._players = Object.assign(players, ourPlayer);
    }
```

Try reloading. You should now actually see your square, though you'll see something else too: the ghost of the previous square. In fact, every time you reload the page, the old square is still sitting there. In hindsight it's clear what's going on: the server is never cleaning up the old players when one player disconnects. Let's fix that.

### Removing disconnected players

The logic is simple: when a player disconnects, remove their player data from `players`. But how do we do that? When the websocket disconnects, we need some way of knowing which player that connection owns, so that we can clean up after them. We can make use once again of `uuid`, this time on the server, to generate an ID to associate with each websocket connection.

```js
// server.js
const { v4: uuidv4 } = require("uuid"); // Remember this funny syntax 

// ... 

// Space to store players, by player id
const players = {};

// Map from a connection id, to the player id that the connection owns
const playersByConnectionId = {};

// ... 

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
    playersByConnectionId[wsid] = player.id; // Store a map from websocket connection id to player id
  });
});
```

Now when the socket disconnects, we have a way of knowing which player belongs to which connection. So we can now write our cleanup function.

```js
// server.js

// ...

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
  });

  // Clean up when the player disconnects
  ws.on("close", () => {
    const playerid = playersByConnectionId[wsid];
    if (playerid) delete players[playerid];
    delete playersByConnectionId[wsid];
  });
});
```

Nice. Now restart the server. When we reload the page, we no longer see the ghosts of disconnected squares.

### Tying it all together

We're very, very close now, just one piece missing. We need the server to actually write to all connected clients whenever `players` changes somehow. What we can do is iterate over the connections to the WebSocket server and send a message to each one. Then we just need to call this function at the appropriate time.

```js
// server.js 

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
```

And now for the final test: restart the server and open up two tabs. Anything you do in one tab should be reflected in the other. Pretty cool!

### One more thing I lied

Actually there's one more very tiny thing we ought to address. When the webpage first opens the websocket connection, it doesn't send the initial state of the player. By adding a new event to the `gameClient` we should be able to fix that easily.

```js
// gameClient.js

// ...

    this._websocket.onopen = () => {
        this.emit("connected");
    };
```

And now we can hook this up in `app.js`.

```js
// app.js

game.on("playerMoved", (player) => gameClient.sendPlayer(player));
gameClient.on("playersUpdate", (players) => game.updatePlayers(players));
gameClient.on("connected", () => gameClient.sendPlayer(game._player));
```

Reload and everything should work as expected. Well, it's a little gross that we're accessing a "private" member variable from outside the `Game` class. We could add an accessor function to `Game`, which would make make things a little nicer looking.

```js
// game.js

// ...

    // Accessor for the player that this game owns, accessed like "game.ownedPlayer"
    get ownedPlayer() {
        return this._player;
    }
```

And then changing `app.js` is as simple as:

```js
// app.js

game.on("playerMoved", (player) => gameClient.sendPlayer(player));
gameClient.on("playersUpdate", (players) => game.updatePlayers(players));
gameClient.on("connected", () => gameClient.sendPlayer(game.ownedPlayer));
```

And now your inner perfectionist can be at peace. There's nothing left to do but deploy to Heroku!

## Student Reflections, Takeaways & Next Steps
Concepts you might want to make sure you understand, that we talked about in this class:
- Destructuring assignment
- Classes & inheritance
- Events, emitting events, listening to events
- WebSockets
    - That includes the difference between WebSockets in Node and in the browser
- Object.assign
- Object.values
- Class accessors
- Unique identifiers

## Post Session
TBD

### References
TBD

### Implementation Guidance & Teaching Reflection  
TBD

***With thanks and acknowledgement, this is based on the template provided by [Eyebeam](https://github.com/eyebeam/curriculum/blob/master/TEMPLATE.md)***