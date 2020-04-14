# Homework 09

## Due Date

This assignment follows the natural language processing lesson, [09-language](../lessons/09-language/09-language.md). It must be turned in by midnight, April 14. 

## Assignment - Automatically generated poem
In class we looked at how to draw text from a website, and how to rearrange that text into something like a poem. We looked at how to count syllables, how to register parts of speech, and how to figure out (kind of) when words rhymed. For homework I want you to build on what we talked about in class. Using the poem starter at https://github.com/starakaj/poem-starter, modify the contents of `poem/poem.js` to read in a page from the Internet, do something with its contents, and then return some text to the user that has a poetic form.

### Description
After copying the starter, open up the file at `poem/poem.js`. Using the techniques we talked about in class, pull down a webpage and try to do something interesting with its contents. The file should export a `makePoem` function, so that the server (at `server.js` ) can return a poem at the `/poem` endpoint. You have many options open to you, the only requirement is that the function must return an array of text, each element of which is one line of something poetic.

### Requirements
When I say that the text returned by `makePoem` must be poetic, it's not entirely clear what that means. A poem is simply a creative arrangement of text, so that certainly leaves you a lot of leeway. Some things that you might try include:

- Pulling blocks of text containing a common word (look into stemming!)
- Listing only words that have a "negative" or "positive" sentiment (you can use sentiment analysis for this)
- Writing your own new sentences, using vocabulary drawn from the text
- Writing lines with the same number of syllables
- Writing a limerick
- Cutting sentences in half, and then mixing them up and sticking them back together

If you want, you're strongly encouraged to make the result into a single-page web application. You can use a React form (see [the lesson where we made dumb twitter](../lessons/03-persistence/03-persistence.md) for a refresher) to submit a page to the server, which then returns a poem for rendering. If you like, you can get creative with how the text is displayed. You might try:

- Size words larger or smaller depending on some criteria
- Arrange words to draw a picture
- Analyze links from the starting page, and use this to draw a map of how pages are connected

### Grading
Like other recent assignments, this is a creative assignment, but creativity is not part of the grade. I'm excited to see what you come up with, but it's most important to me that you complete the requirements. If it's clear that you spent a bit of time with the assignment, and you experimented with something new, then you have nothing to worry about.

## Handing it in
Please send me a link to a github repository where your project can be found. I should be able to pull your repository, run `npm install`, and then run `npm run poem` to generate a poem. If you had the time, I should also be able to run `npm run watch` to see the poem in the browser. Please don't forget to create a README.md, even if it only contains a single sentence. The README is also a great place to talk about any problems that you ran into, or to highlight any particular things that you're especially proud of. If you're doing some kind of complex audio mapping, please describe what you were trying to achieve in the README.
