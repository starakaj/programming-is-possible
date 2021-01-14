const React = require("react");
const DumbTwitter = require("./DumbTwitter");

/* the main page for the index route of this app */
const RootComponent = function() {
  return (
    <DumbTwitter />
  );
}

module.exports = RootComponent;