const express = require("express");

// Look at this object destructuring
const { Client } = require("node-osc");

// 127.0.0.1 is localhost, meaning this same machine. 9001 is the port we want to listen on.
const oscClient = new Client("127.0.0.1", "9001");

const app = express();

// We don't have anything to do at the root, so we may as well redirect to /randomRectangle
app.get("/", (req, res) => {
    res.redirect("/randomRectangle");
});

// Send an OSC message to processing that creates a random rectangle
app.get("/randomRectangle", (req, res) => {

    // Create random dimensions that will fit the rectangle on the screen
    const randomWidth = Math.random() * 250;
    const randomHeight = Math.random() * 250;
    const randomX = Math.random() * (1080 - randomWidth);
    const randomY = Math.random() * (720 - randomHeight);

    // Send an OSC packet
    oscClient.send("/createRectangle", randomX, randomY, randomWidth, randomHeight, () => {

        // Send back status when the packet gets sent
        res.status(200).send(`Added a rectangle:
            x: ${randomX.toFixed(1)}
            y: ${randomY.toFixed(1)}
            width: ${randomWidth.toFixed(1)}
            height: ${randomHeight.toFixed(1)}`);
    });
});

app.listen(3000, () => {
    console.log("App listening on port 3000");
});
