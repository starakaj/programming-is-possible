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

Believe it or not that's all we need to do to send the messages to the server. Back on the server end, we can log this messages to make sure it went through. However, things are a little bit precise on the server end. Take a close look at this:

```js
```

## Student Reflections, Takeaways & Next Steps
TBD

## Post Session
TBD

### References
TBD

### Implementation Guidance & Teaching Reflection  
TBD

***With thanks and acknowledgement, this is based on the template provided by [Eyebeam](https://github.com/eyebeam/curriculum/blob/master/TEMPLATE.md)***