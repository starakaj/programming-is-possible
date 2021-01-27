// DumbTwitterForm.jsx
const { useState } = require('react');
const React = require('react');

const DumbTwitterForm = function(props) {

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const updateUser = (event) =>{
    setUser(event.target.value);
  };

  const updateMessage = (event) => {
    setMessage(event.target.value);
  };

  const doAsyncSubmit = async () => {
    const response = await fetch('api/tweet', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(({user, message})),
    });
    if (response.status === 200) {
      setUser("");
      setMessage("");
      if (props.onTweeted) props.onTweeted();
    }
  };

  const handleSubmit = (event) => {
    doAsyncSubmit();
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User:
        <input type="text" value={user} onChange={updateUser}/>
      </label>
      <label>
				Message:
        <input type="text" value={message} onChange={updateMessage}/>
      </label>
			<input type="submit" value="Submit"/>
    </form>
  );
}

module.exports = DumbTwitterForm;
