const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

let count = 0;

app.get("/", (_, res) => {
    res.send(`
        <html>
            <body>
                This page has been visited ${++count} times
            </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
