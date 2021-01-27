// DumbTwitter.jsx
const { useState, useEffect } = require('react');
const React = require('react');
const DumbTwitterForm = require("./DumbTwitterForm");
const DumbTwitterList = require("./DumbTwitterList");

/* the main page for the index route of this app */
const DumbTwitter = function() {

	const [tweets, setTweets] = useState([]);

  async function fetchTweets() {
    const rawData = await fetch("api/tweets");
    const body = await rawData.json();
    setTweets(body);
  }

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div>
      <h1>Dumb Twitter</h1>
      <DumbTwitterForm onTweeted={fetchTweets} />
      <DumbTwitterList tweets={tweets} />
    </div>
  );
}

module.exports = DumbTwitter;
