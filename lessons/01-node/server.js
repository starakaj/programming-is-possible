const express = require("express");
const { randomName, randomPlace } = require("./src/namer");
const port = process.env.PORT || 3000;
const fs = require("fs");

// Create an instance of the express application
const app = express();

// Serve the public directory as static
app.use(express.static("public"));

let counter = 0;
let name = null;

app.get("/", (req, res) => {
    counter++;
    let htmldoc = fs.readFileSync("./templates/index.html", "utf8");
    htmldoc = htmldoc.replace("%%%VIEWS%%%", counter);
    res.send(
        htmldoc
    );
});

// You can use replace to pretend like you're using React
app.get("/identity", (req, res) => {
    const newName = randomName();
    const newAddress = randomPlace();
    let htmldoc = fs.readFileSync("./templates/index.html", "utf8");
    htmldoc = htmldoc.replace("%%%NAME%%%", newName);
    htmldoc = htmldoc.replace("%%%PLACE%%%", newAddress);
    res.send(
        htmldoc
    );
});

app.get("nameform", (_, res) => {

})

app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
});
