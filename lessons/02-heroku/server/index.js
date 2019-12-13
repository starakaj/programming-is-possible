const express = require("express");
const { fullAppMarkdown } = require("../dist/App");
const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
    const fullMarkdown = fullAppMarkdown();
    res.send(fullMarkdown);
});

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
});
