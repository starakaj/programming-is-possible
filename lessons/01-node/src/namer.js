const chance = require("chance");
const c = new chance();

// Uncomment these lines to print a message when this script runs
// console.log(`Your new random name is ${c.name()}`);
// console.log(`You live on ${c.street()} in ${c.state()}`);

module.exports = {
    randomName: () => c.name(),
    randomPlace: () => `${c.street()}, ${c.state()}`
}
