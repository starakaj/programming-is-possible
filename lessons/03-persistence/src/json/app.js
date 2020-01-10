const express = require("express");
const port = process.env.PORT || 3000;
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const access = promisify(fs.access);

const app = express();

app.get("/", async (req, res) => {

    const datafile = path.join(__dirname, "data.json");

    try {
        let data = {
            pageviews: 0
        };

        try {
            await access(datafile, fs.constants.F_OK);
            const filecontents = fs.readFileSync(datafile, { encoding: "utf8" });
            data = JSON.parse(filecontents);
        } catch { /* We don't acually care if there's an error here */ }

        // Increment the number of pageviews
        data.pageviews = data.pageviews + 1;

        // Write the result back to disk
        fs.writeFileSync(datafile, JSON.stringify(data));
        
        // Finally, report back the number of pageviews
        res.send(`This page has been viewed ${data.pageviews} times`);
        
    } catch (e) {
        res.send("Some kind of terrible error happened");

        console.dir(e);
    }
});

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
});
