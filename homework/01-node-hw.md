# Homework 01

## Due Date

This assignment follows the second lesson, [01-node](../lessons/01-node/01-node.md). It must be turned in by midnight, February 11. 

## Reading

- Baker, Kevin T. _Model Metropolis_ https://logicmag.io/play/model-metropolis/

## Assignment - Text Adventure

Check out this site
http://silly-suggestion.herokuapp.com/

This is a text adventure realized entirely as a Node Express app. Your assignment is to make your own text adventure, realized in the same way.

### Description

A text adventure is a kind of video game or interactive novel. Typically (though not always) the player navigates through a dungeon, exploring a series of rooms. The player can perform various actions in each room. The simplest text adventure lets the player choose from a list of options. More advanced games might take in a string of text, and then parse the text in some way to determine what happens next. Complex games might record other statistics for a player, like their standing with various factions, their age, health, height, and so on. These and other factors might determine what options are available to the player at any given point.

### Requirements
Overall, I encourage you to push your skills. The base requirements for this assignment are small, but if Express and Node are very familiar to you, then try to add something that flexes a new skill you haven't built up yet. There are some hard requirements for this text adventure though:

- All of the state of the game must be stored on the server. That means no javascript on the client side.
- The server must be implemented using Express, similar to what we saw in class.
- You're not required to use .html template files, but it's strongly encouraged.
- Don't forget to .gitignore your `node_modules` folder.
- Don't forget to include a README.md.
- The page must be styled using a .css file. That file can be very simple, but it must exist. You can use just one .css file for the whole game.
- The player must be able to collect items and place those items in an inventory. It must be possible to check the inventory at any time (unless maybe the player has gone blind, or is injured, or for some lore-related reason cannot check their inventory).
- The game must have at least one "bad" ending and one "good" ending. The precise meaning of "bad" and "good" are up to you, though in one example, falling into a pit could be the "bad" ending, while escaping the dungeon is a "good" ending.
- A fantasy theme is by no means required. The player doesn't have to navigate a literal labyrinth either. Figuring out which classes to take, for example, is its own kind of labyrinth, and would be an excellent theme for an adventure game.

In addition, you must take on at least one of these optional requirements. If you're feeling punchy, try and push yourself to take on more than one.
- Using CSS classes, change the appearance of the page depending on the state of the game. For example, if the player is in a garden, the background could be green.
- Implementing an online game with state stored on the server has an issue: there's only one "inventory" that all players share. Use the Express cookie-parser middleware, and use this create several "inventories", one for each player.
- Games are more replayable if the experience varies from one play-through to the next. Add some random elements to your game, so that the exact gameplay experience is different each time you play.
- In class we saw how to use forms to submit text to the server. Using a form, accept text or some other input from the player. Maybe they can set their name, or they have to pronounce a magic spell, or give a password.
- Add multimedia elements to your page. This could include background music, images, or maybe even something fancier. (Don't go too crazy with animations, this is about server-side programming after all.)
- What happens if you have a very clever user, who tries to access a page by typing directly in the address bar? Suppose they type the name of a room that doesn't exist? Can your server handle that? What does its 404 page look like?

### Grading
This largely a creative assignment, but creativity is not part of your grade (at least for this assigment). I'm grading this assignment entirely on completeness, so provided (1) your game works and (2) you meet all the requirements, you should be in perfect shape.

## Handing it in
Please send me a link to a github repository where your text adventure can be found. I should be able to pull your repository, run `npm install`, and then start up a server and run your text adventure. Please don't forget to create a README.md, even if it only contains a single sentence. If there's anything special I should know about running your game, please add it to the README.
