const { EventEmitter } = require("events");
const { clamp }  = require("./util");

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
            x: px,
            y: py,
            color
        };
    }

    // Draw the player as a square at the appropriate position
    draw(p, cellWidth, cellHeight) {
        p.push();
        p.strokeWeight(0);
        p.colorMode(p.HSB);
        p.fill(this._player.color);
        p.rect(
            this._player.x * cellWidth,
            this._player.y * cellHeight,
            cellWidth,
            cellHeight
        );
        p.pop();
    }

    _movePlayer(dx, dy) {
        this._player.x = clamp(this._player.x + dx, 0, this._columns);
        this._player.y = clamp(this._player.y + dy, 0, this._rows);

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
}
