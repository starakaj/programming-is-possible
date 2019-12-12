const express = require("express");
const { randomName, randomPlace } = require("./namer");
const eua = require("express-useragent");
const port = 3000;

// Create an instance of the express application
const app = express();

// Send a simple message in response
app.get("/", (req, res) => {
    res.send(
        `
            <html>
                <body>
                    <h1>Cool Node Server</h1>
                    <p>Try out these fun paths:</p>
                    <ul>
                        <li><a href="/identity">/identity</a></li>
                        <li><a href="/ua">/ua</a></li>
                    </ul>
                </body>
            </html>
        `
    );
});

app.get("/identity", (req, res) => {
    const newName = randomName();
    const newAddress = randomPlace();
    res.json({
        name: newName,
        address: newAddress
    });
});

app.get("/ua", (req, res) => {
    const userAgentString = req.get("User-Agent");
    const uos = eua.getOS(userAgentString);
    const uBrowser = eua.getBrowser(userAgentString);
    res.send(
        `
            <html>
                <body>
                    <h1>Cool Node Server</h1>
                    <p>It looks like you're on a ${uos} machine</p>
                    <p>It looks like you're viewing this page in ${uBrowser}</p>
                </body>
            </html>
        `
    );
});

app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
});
