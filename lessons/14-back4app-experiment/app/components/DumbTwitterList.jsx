const { useState, useEffect } = require('react');
const React = require('react');

const DumbTwitterList = function(props) {

    const listElements = props.tweets.map((tweet, idx) => {
        return <p key={idx}> {`${tweet.user}: ${tweet.message}`} </p>;
    });

  return (
    <div>
      {listElements}
    </div>
  );
}

module.exports = DumbTwitterList;
