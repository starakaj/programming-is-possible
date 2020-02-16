# Homework 2 - React + Heroku

## Reading

Brain, Tega. _Hack the Planet: Tega Brain on Leaks, Glitches, and Preposterous Futures_ Logic Magazine. Retrieved https://logicmag.io/nature/hack-the-planet-tega-brain-on-leaks-glitches-and-preposterous-futures/

## Tic Tac Toe

Start by downloading the starter I made for you at https://github.com/starakaj/react-express-starter. You can download it as a zip, or fork the repo and start from there, up to you. Next, implement tic-tac-toe.

```
   a     b     c
      |     |     
1  -  |  -  |  -  
 _____|_____|_____
      |     |     
2  -  |  -  |  -  
 _____|_____|_____
      |     |     
3  -  |  -  |  -  
      |     |     
```

In case you need a reminder, the way tic tac toe works, two players take turns putting an X or an O in each square. If either player gets three in a row, including diagonals, that player wins.

### Requirements
- The game must display which player, X or O, has the current turn.
- There must be an indication when one player or the other wins.
- Use a different React component for the game container and for the squares.
- Put it up on Heroku
- Chose at least one of the optional requirements.

### Optional
- There must be a way to reset the game (refreshing the page doesn't count).
- Let the players set their names at the start of the game.
- Color the squares differently for X and O using CSS classes.
- Make it possible to undo a move.
- Set the number of rows or columns at the start of the game.

### Considerations
- The trickiest part of this assignment is handling clicks on the squares. The individual squares are dumb—they can't know anything about the state of the game. Rather, each square should have an `onClick` prop, similar to a button.
- If you chose to let the players set their names, you probably don't want to use a `post` Express handler. Remember, React has the state, not Express.

### Handing it in

Please email me a github repo, along with a link to your deployed Heroku app.
