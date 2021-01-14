const { useState, useEffect } = require('react');
const React = require('react');

const DumbTwitterList = function() {

    const [tweets, setTweets] = useState([]);

    const listElements = tweets.map((tweet, idx) => {
        return <p key={idx}> {`${tweet.user}: ${tweet.message}`} </p>;
    });

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
      {listElements}
    </div>
  );
}

module.exports = DumbTwitterList;