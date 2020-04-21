const { EventEmitter } = require("events");

module.exports = class GameClient extends EventEmitter {
    constructor() {
        super();
        const pageUrl = new URL(window.location);
        pageUrl.protocol = "ws";
        this._websocket = new WebSocket(pageUrl.toString());

        this._websocket.onopen = () => {
            this.emit("connected");
        };

        this._websocket.onmessage = (event) => {
            const players = JSON.parse(event.data);
            this.emit("playersUpdate", players);
        };
    }

    sendPlayer(player) {
        this._websocket.send(
            JSON.stringify(player)
        );
    }
}
