const p5 = require("p5");
const Game = require("./game");
const GameClient = require("./gameClient");

const width = 400;
const height = 400;
const columns = 10;
const rows = 10;
const cellWidth = width / columns;
const cellHeight = height / rows;

const sketch = (p) => {

    let game = new Game(columns, rows);
    let gameClient = new GameClient();
    game.on("playerMoved", (player) => gameClient.sendPlayer(player));
    gameClient.on("playersUpdate", (players) => game.updatePlayers(players));
    gameClient.on("connected", () => gameClient.sendPlayer(game.ownedPlayer));

    p.setup = () => {
        p.createCanvas(400, 400);
    }

    p.draw = () => {
        // Make the background almost white
        p.background(240);

        // Draw a nice grid for the background
        p.strokeWeight(0.5);
        p.stroke(15);
        for (let x = 1; x < columns; x++) {
            p.line(x * cellWidth, 0, x * cellWidth, height);
        }
        for (let y = 1; y < rows; y++) {
            p.line(0, y * cellHeight, width, y * cellHeight);
        }

        // Draw the game
        game.draw(p, cellWidth, cellHeight);
    }

    p.keyPressed = () => {
        game.handleInput(p.key);
    }
}

const myp5 = new p5(sketch, "main");
