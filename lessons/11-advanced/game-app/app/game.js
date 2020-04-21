const { EventEmitter } = require("events");
const { clamp }  = require("./util");
const { v4: uuidv4 } = require("uuid");

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

    // Return an HSBA color (Hue, Saturation, Brighness, Alpha)
    // with a random hue
    _makeRandomHue() {
        return [
            Math.random() * 255,
            255,
            255,
            255
        ];
    }

    // Make a new player object out of a position and a color
    _makePlayer(px, py, color) {
        return {
            id: uuidv4(),
            x: px,
            y: py,
            color
        };
    }

    // Accessor for the player that this game owns, accessed like "game.ownedPlayer"
    get ownedPlayer() {
        return this._player;
    }

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

    _movePlayer(dx, dy) {
        this._player.x = clamp(this._player.x + dx, 0, this._columns - 1);
        this._player.y = clamp(this._player.y + dy, 0, this._rows - 1);

        this.emit("playerMoved", this._player);
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

    updatePlayers(players) {
        const ourPlayer = {
            [this._player.id]: this._player
        };

        // Make sure that our player stays in there, no matter what
        this._players = Object.assign(players, ourPlayer);
    }
}
