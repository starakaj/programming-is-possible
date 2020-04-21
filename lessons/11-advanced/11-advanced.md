# Advanced JS and MMORPGs

## Authors
Sam Tarakajian for NYU IDM

DM-GY 6063

@starakaj

## Essential Questions
- How can different parts of a JS application communicate?
- How does bidirectional communication over WebSockets work?
- How can multiple client applications share state?
- What is serialization?

## Introduction
As JavaScript applications—or indeed applications in any languaeg—grow larger, we start to run into certain challenges. In this class, we'll explore some libraries and patterns that help us deal with that growing complexity.

### Target Audience / Prerequisite & Pre-Assessment
This module is part of DM-GY 9103, _Programming is the Art of the Possible_. This is a second semester creative coding course, designed for students who have a strong JavaScript foundation.

### Outcomes & Goals
- In this class we will use WebSockets EventEmitters, class inheritance and other advanced JavaScript techniques.
- Students will walk away with a deeper understanding of how to make the JavaScript applications of their dreams.

### Pacing / Duration
TBD

## Materials Needed
Node, internet connection, laptop

### Vocabulary 
* Full-duplex - Communnication transport layer where both endpoints can send and receive information.
* Inheritance - Object-oriented programming technique for defining the relationship between classes. Child classes inherit the methods and properties of their parent.

## Exercise Descriptions
So our goal for this class is to make an online multiplayer game. It's not a very complex game, but it's one that we can build on later. You can play it right now at http://bonito-flakes.herokuapp.com/

We'll be working from yet another starter, this one at https://github.com/starakaj/express-game-starter. 

### Looking over the code

Let's go on a quick code tour. If you check out `app.js`, you'll see some very familiare p5 boilerplate. We make a 10x10 grid by drawing lines on a 400x400 pixel canvas. In fact there's not much going on in this file, it looks like most of the action is inside this `game.js` file. If we look in there, we can see some code that might look familar from the `Particle` class in the optical flow lesson, [Lesson 08](../08-video/08-video.md). The game code creates a bit of data containing the information needed to describe a player: the player's x position, y position and color. There's no update function, but there is a `draw` function that, as expected, takes the `p5` drawing context as a variable `p` that is used to draw. This simply draws the player at the player's positon.

### Adding some movement

For this to be a game it needs to have some interactivity. Let's start by making it possible to move the little square around. We can accept keyboard input in our `p5` sketch by implementing a `keyPressd` method.

## Student Reflections, Takeaways & Next Steps
TBD

## Post Session
TBD

### References
TBD

### Implementation Guidance & Teaching Reflection  
TBD

***With thanks and acknowledgement, this is based on the template provided by [Eyebeam](https://github.com/eyebeam/curriculum/blob/master/TEMPLATE.md)***