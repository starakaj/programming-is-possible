# Homework 3 - React + Heroku + Mongo

## Reading

Let me think about it, I'll get it to you soon

## Dumb Twitter with filters

In class we made Dumb Twitter (If you weren't in class, be sure to follow the notes so that you too can build something like dumb-twitter.herokuapp.com). It's like Twitter, but dumb. It's especially dumb in that there's only one big, fat feed. There's no way to look just at tweets made by a particular person, for example. There's also no way to delete a tweet, which as we all know is _critically_ important.

### Requirements
- Take the version of Dumb Twitter that we made in class. Make it possible to view only the tweets from a particular person.  
    - This will require adding a server endpoint that lets you filter over your list of tweets.
    - You might find Express request params to be very helpful here:

```js
// See https://expressjs.com/en/api.html#path-examples
app.get('/user/:id', function (req, res) {
      res.send('user ' + req.params.id);
});
```

- Make it possible to delete a Tweet. You might consider using the DELETE HTTP verb, in conjunction with https://expressjs.com/en/api.html#app.delete.method
    - Remember, you'll have to set `method: "DELETE"` in your fetch.
- Use MongoDB to store your data
- Put it up on Heroku
- You must complete NONE of the optional parts. But if you're feeling eager, you should go for it.

### Optional
- Add test search to your Dumb Twitter. Make it possible to search for hashtags
- Rather than forcing people to type their name with every tweet, have them log in to an account
- Add a date to each tweet as it's created, making it possible to search over tweets by date
- Style your page a bit so it doesn't look crappy

### Handing it in

Please email me a github repo, along with a link to your deployed Heroku app.
