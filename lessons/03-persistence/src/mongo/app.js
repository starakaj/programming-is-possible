const express = require("express");
const port = process.env.PORT || 3000;

// require mongo. You'll occasionally see things like this, where
// after requiring, you then pull out only the property you care about
const mongo = require('mongodb').MongoClient;

// Take note, this is because we're connected to a local Mongo
const url = process.env.MONGODB_URI || "mongodb://localhost:27017";

const app = express();
let db;

app.get("/", async (req, res) => {

    try {
        // Fetch an item out of the collection
        const collection = await db.collection("pagemeta");
        const item = await collection.findOne({});

        // Increment the number of pageviews, if we've seen the page before
        let pageviews = 1;
        if (item) pageviews = item.pageviews + 1;

        // Update the item in the database, inserting if it's not there
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
        res.send("Some kind of terrible error happened");

        console.dir(e);
    }
});


mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((client) => {
    db = client.db("aporia");

    app.listen(port, () => {
        console.log(`Express app listening on port ${port}`);
    });
}).catch((err) => {
    console.log("Couldn't connect to the database");
    console.dir(err);
});
