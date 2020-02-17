const express = require("express");
const port = process.env.PORT || 3000;

// Require mongo. Here we're pulling MongoClient out of the require and immediately storing
// it in a variable called mongo.
const mongo = require('mongodb').MongoClient;

// This is the URL for connecting to the database. As you can see, we're allowing this 
// to be set from the outside, or setting it ourselves. We've used this strategy before
// with process.env.PORT for Heroku, and we're doing the exact same thing here.
let url = process.env.MONGODB_URI || "mongodb://localhost:27017/my-database";

const app = express();

// This will store our database connection
let dbClient;

// Very important that we pass an asynchronous function here to app.get, so that we can
// use await inside it.
app.get("/", async (req, res) => {

    try {
        // Get a collection, which is like a single bundle of stuff within our database
        const collection = await dbClient.collection("pagemeta");

        // The pagemeta collection holds only one item, so we can call findOne, passing
        // in empty search criteria, to just get that one thing
        const item = await collection.findOne({});

        // Increment the number of pageviews, if we've seen the page before
        let pageviews = 1;
        if (item) pageviews = item.pageviews + 1;

        // Update the item in the database, inserting if it's not there. That's what 
        // upsert means.
        await collection.updateOne({}, {
            $set: {
                pageviews: pageviews
            }
        }, {
            upsert: true
        });
        
        // Finally, report back the number of pageviews
        res.send(`This page has been viewed ${pageviews} times`);
        
    } catch (e) {
        res.status(500).send("Some kind of terrible error happened");
        console.log(e);
    }
});

// We're not using async/await here because there's no top-level await
// First connect to the database given the url.
mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((client) => {

    // Store the client connection so that we can use it later
    dbClient = client.db();

    // Finally, start the server like normal
    app.listen(port, () => {
        console.log(`Express app listening on port ${port}`);
    });
}).catch((err) => {
    console.log("Couldn't connect to the database");
    console.log(err);
});
