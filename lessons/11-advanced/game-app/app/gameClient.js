module.exports = class GameClient {
    constructor() {
        const pageUrl = new URL(window.location);
        pageUrl.protocol = "ws";
        this._websocket = new WebSocket(pageUrl.toString());

        this._websocket.onopen = () => {
            console.log("Started a websocket connection");
        }
    }

    sendPlayer(player) {
        this._websocket.send(
            JSON.stringify(player)
        );
    }
}
