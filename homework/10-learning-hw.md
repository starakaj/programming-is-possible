# Homework 10

## Due Date

This assignment follows the Teachable Machine lesson, [10-learning](../lessons/10-learning/10-learning.md). It must be turned in by midnight, April 21. 

## Assignment - Teachable interface
Go ahead into `lessons/10-learning/teachable-machine-app` and run `npm install`. Then go into `app.js` and make sure that `heartHands/heartHandsApp` is the source of the `setup` function. Now `npm run watch` and navigate to `localhost:3000`. Hopefully, when you make a heart with your hands, you'll see a flurry of pink hearts. What I'd like you to do in this assignment is to think about how Teachable Machine can be used as an interface.

### Description
Simply put, make something with Teachable Machine. Check out this https://experiments.withgoogle.com/interplay-mode/view/

Here, we basically have something not significantly more complicated than what we already made in class. The UI is a lot prettier, and it's playing with a nice video, but we already saw how to make something like this just the other day. What else can you imagine that might make use of some of what we saw how to do in class?

- A drawing canvas, where the things that you draw emerge from the page when they are recognized
- An adventure game, where you make hand signs to determine what action you take
- Something like Berghain Trainer https://berghaintrainer.com/
- A "conversation" with an animated character that can recognize certain words
- An instagram filter (would combine nicely with the head tracker from two lessons ago)
- A sonifier that analyzes your face and tries to play music that matches your mood

### Requirements
You must use an original model, not one of the ones that we used in class. You may either upload the model to Google, or include it as part of your repo. You don't have to use p5, you don't even have to do any drawing at all. The important part is that you use an original model in your own code. Other than that, you have a lot of freedom on this assignment.

### Grading
Like other recent assignments, this is a creative assignment, but creativity is not part of the grade. I'm excited to see what you come up with, but it's most important to me that you complete the requirements. If it's clear that you spent a bit of time with the assignment, and you experimented with something new, then you have nothing to worry about.

## Handing it in
Please send me a link to a github repository where your project can be found. I should be able to pull your repository, run `npm install`, and then run `npm run watch` or `npm run start` to see your code in action. Please don't forget to create a README.md, even if it only contains a single sentence. The README is also a great place to talk about any problems that you ran into, or to highlight any particular things that you're especially proud of. If you're doing some kind of complex audio mapping, please describe what you were trying to achieve in the README.
