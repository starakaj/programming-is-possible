const express = require("express");
const { randomName, randomPlace } = require("./namer");
const port = 3000;

// Create an instance of the express application
const app = express();

// Send a simple message in response
app.get("/", (req, res) => [
    res.json({
        message: "You got the homepage. Try the /identity path"
    })
]);

app.get("/identity", (req, res) => {
    const newName = randomName();
    const newAddress = randomPlace();
    res.json({
        name: newName,
        address: newAddress
    });
});

app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
});
