const chance = require("chance"); // load the chance module
const c = new chance(); // Create an actual chance instace. See the docs.

// Only run these lines if you're running the file as a script
if (require.main === module) {
    console.log(`Your new random name is ${c.name()}`);
    console.log(`You live on ${c.street()} in ${c.state()}`);
}

module.exports = {
    randomName: () => c.name(),
    randomPlace: () => `${c.street()}, ${c.state()}`
}
