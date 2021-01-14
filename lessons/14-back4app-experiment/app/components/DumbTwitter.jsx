// DumbTwitter.jsx
const React = require('react');
const DumbTwitterForm = require("./DumbTwitterForm");
const DumbTwitterList = require("./DumbTwitterList");

/* the main page for the index route of this app */
const DumbTwitter = function() {
  return (
    <div>
      <h1>Dumb Twitter</h1>
      <DumbTwitterForm />
      <DumbTwitterList />
    </div>
  );
}

module.exports = DumbTwitter;