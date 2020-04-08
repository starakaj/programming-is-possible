# Natural Language Processing

## Authors
Sam Tarakajian for NYU IDM

DM-GY 6063

@starakaj

## Essential Questions
- How does natural language differ from other languages?
- What kinds of techniques can computers use to recover information from natural language?
- What kinds of data structures represent the information in natural language?
- What are ways that we can play with a computer's understanding of language?
- How do people use NLP for beneficial and not-so-beneficial ends?

## Introduction
Language allows us to encode statements about the world in a way that can be communicated to other entities that share our language. Some languages, like programming languages, have a rigid syntax and encode discrete mechanistic operations. Others, like most human languages, encode meaning more loosely. Interpreting the language is an active process that involves a large number of internalized rules and associations, accumulated over a human lifetime. A major challenge for software developers has been to break down natural language in way that computers can extract information from it, without requiring that the computer have a full, human-like intelligence.

Natural Language Processing refers to a suite of tools for understanding, formatting, and generating language. In this class, we'll survey some of those tools, and see how we can put them to creative use. We'll see the kinds of information that computers can get from natural language, including sentiment, parts-of-speech, and topics. We'll also experiment with generating language for some procedural poetry writing. Overall students should come away with a better understanding of what's possible with NLP, some fun things you can do with it, and maybe a sense of what NLP means for society in general.

### Target Audience / Prerequisite & Pre-Assessment
This module is part of DM-GY 6063, _Programming is the Art of the Possible_. This is a second semester creative coding course, designed for students who have a strong JavaScript foundation.

### Outcomes & Goals
* In this workshop we will look at different libraries for Natural Language Processing. We'll see how to analyze and generate language using these libraries.
* Students should come away knowing more about how NLP works. They should understand the approaches that different libraries take for extracting information from language, as well as what assumptions those libraries make.
* Students should also get a sense of how NLP is being used in a broader social context.

### Pacing / Duration
TBD

## Materials Needed
As per usual, Node, as well as a machine with an internet connection. VSCode is recommended, but feel free to use your preferred coding text editor.

### Vocabulary (example)
* Language - Any communicable system for encoding and decoding information (wow improve this definition please)
* Machine Language - Language expressing the serial operation of computer hardware. Maps in a deterministic way to hardware operations and machine states.
* Natural Language - Language as human beings use it. Continually evolving and constantly reinterpreted (work on this definition).
* Sentiment - The emotional valence of a language sample.
* Bag of Words - A histogram representation of language, counting words
* Syntax - The grammar structure of language
* Semantics - The meaning structure of language

## Exercise Descriptions
Today we'll be playing around with language. We will not really be working with anything related to Machine Learning in this class. Well, a couple of reasons. First, training a model on a corpus of text is a bit beyond what we can do in a single class, and a lot of the interesting stuff that you can do with text really opens up when you're training your own models. If you head over to the ml5 example at https://ml5js.github.io/ml5-examples/javascript/CharRNN/CharRNN_Text_Stateful/ for instance, you can see an ML model trained on Virgina Woolf that can make some amusing text. However, we won't have time to train our own model on our own body of text.

Instead, we'll be looking much more closely at a combination of scraping and manipulating existing text. The techniques that we use for scraping, cleaning, and rearranging text in this class will be equally applicable if you want to apply machine learning to them. For example, by the end of this class you'll be able to download the text of a NYTimes article, chop the sentences in half, and replace the second half of each sentence with something that Virginia Woolf might have written (according to charRNN anyway).

### Getting Started

(You'll see an implementation of these notes in `poem-docu`.)

We'll start today by downloading a starter from https://github.com/starakaj/poem-starter. This is very similar to the React starter we were using a few weeks ago, except this one is designed with writing poems in mind. If you look at `poem/poem.js`, you'll see a file for writing a poem. It exports a function called `makePoem`, which is expected to return an array of strings. Each string is one line of the poem. This file can be used in one of two ways. From the command line you can run

```
npm run poem
```

or

```
node poem/poem.js
```

and the lines of the poem will be printed to the command line. You can also run

```
npm run watch
```

and navigate to `http://localhost:3000`. Here you'll see the same poem, but printed in the browser. Looking in `app/components/PoemDisplay.jsx`, you'll see a file that should look very similar to the one we implemented when we were working on Dumb Twitter.

```js
const React = require("react");

module.exports = function(props) {
    const [poem, setPoem] = React.useState([]);

    React.useEffect(() => {
        fetch("/poem")
            .then(result => result.json())
            .then(lines => setPoem(lines));
    }, []);

    const lineElts = poem.map((line, i) => <li key={i}>{line}</li>);

    return (<ul>{lineElts}</ul>);
}
```

As you can see, this implies that the server implements an API endpoint called `/poem` that returns the lines of our poem. If you look in `server.js`, sure enough you'll see such an API endpoint.

```js
// server.js
app.get("/poem", async function(_, response) {
  const lines = await makePoem();
  response.json(lines);
});
```

All this does is call `makePoem` from the other file and send the result as a response. For this class, we'll be looking exclusively at `poem.js`. For the homework, you'll be asked to work a little bit with the React frontend, but it should be very simple given what you already know how to do.

### Grabbing Text

In this class, we're going to be working from existing text, rather than generating text from scratch. For that we'll introduce the notion of web scraping. You can think of web scraping a bit like a reverse API. Throughout this course, we've seen approaches to building a frontend that go something like data -> API -> rendered webpage. Now, we'd like to go the opposite way, and pull the data out of the final webpage. That's what web scraping is: getting data of a formatted, presentation-ready webpage.

In order to do our scraping, we're going to be using a library called `osmosis`. This `osmosis` library has a particularly slick way of getting content out of a page that uses CSS selectors. We'll start by installing `osmosis` from npm.

```sh
npm install osmosis
```

Now we can use osmosis to pull the contents of a webpage. Let's try this one, modifying the `poem.js` file to include a new function called `getText`.

```js
// poem.js

const osmosis = require("osmosis");

async function getText() {
    osmosis.get("https://en.wikipedia.org/wiki/Justin_Bieber")
        .find("p")
        .set("contents")
        .data(item => console.log(item));
}

// Modify the body of the file, when executed as a script, like so
if (require.main === module) {
    getText();
    // makePoem().then(res => console.log(res));
}

```

And then run `npm run poem`. You should see big chunks of full paragraphs from Wikipedia dumped into the console. Breaking this down, the first call to `osmosis.get` fetches the contents of the webpage. The call to `find` looks for all elements on the page matching a particular CSS selector. This is handy, we could use this for example to get all paragraphs with a particular CSS class by doing `p.classname`, or we could use it to get all anchor tags in any paragraph with `p > a`. Next, with all of the paragraphs found, the `set` call describes what we want osmosis to do with them. In this case, we want it to emit a new object with the property `contents` set to whatever the text contents of the paragraph were. We don't have to use `contents`, we can call this text whatever we want. Finally, the function in `data` will be called every time `osmosis` encounters data. The argument to that function will be the data that it encountered. 

Right now osmosis is just printing out every item that it finds. However, we might want it to collect all that data up, and return all of the collected data when osmosis is finished scanning the file. For that we can use a function called `done`, which will be called when osmosis is finished. If we wrap the whole function in a promise, then we have our asynchronous implementation.

```js
// poem.js
async function getText() {
    return new Promise((resolve, reject) => {
        let contents = [];
        osmosis.get("https://en.wikipedia.org/wiki/Justin_Bieber") // Crawl this webpage
            .find("p") // Get all elements matching this CSS selector
            .set("contents") // Set the text contents of those elements to the "contents" property of an object
            .data(item => contents.push(item.contents)) // Pass that object to this function
            .done(() => resolve(contents)) // Call this when you're done
            .error(e => reject(e));
    });
}
```

Now, this will return an array, where each element of the array is one paragraph of the contents of the given page. Let's write our first poem generator. This one simply returns the first word of each paragraph.

```js
// poem.js
async function firstWordsPoem() {
    const paragraphs = await getText();
    const firstWords = paragraphs.map(pg => {
        const firstSpace = pg.indexOf(" ");
        return pg.slice(0, firstSpace);
    });
    return firstWords.join(" ");
}
```

Don't forget to make modifications so this file actually uses this technique to write its poem.

```js
async function makePoem() {
    return await firstWordsPoem();
}

if (require.main === module) {
    // getText();
    makePoem().then(res => console.log(res));
}

module.exports = {
    makePoem
};
```

Persomally I'm suprised by how fully this dumb technique for writing a poem actually is.

```
Justin Bieber Following Bieber Bieber Through Bieber When Bieber Usher Bieber's "One Bieber Bieber On In To On A In His The Bieber On On Because In In Purpose On On Bieber, On On On On Bieber's Bieber Bieber Bieber Bieber As In He Usher —Scooter Bieber In Bieber's As As Bieber's In Bieber Bieber Regarding Bieber Bieber Following On On —Bieber On In In Beiber On Throughout On Bieber "Steps
```

### A Haiku

A haiku is a simple poem form that alternates lines with five and seven syllables. There's more to it than that, but that's the definition that we'll be using for this section.

```
the first cold shower
even the monkey seems to want
a little coat of straw
```

is a translation of a Japanese Haiku that approximates the syllable balance (you have to pronounce "even" in a slightly British way, so that it's 1.5 syllables or so). To write our next poem, we'll use a syllable counter called, unsurprisingly, `syllable`.

```sh
npm install syllable
```

We'll also want to chop up the text into sentences. We could just split the string on a period, but periods are used in English for things other than sentence boundaries, for example abbreviatons. There's a nifty npm library called `sbd` for "sentence boundary detection" that can help us here.

```sh
npm install sbd
```

The strategy we'll employ looks something like this:
1. Get all the text.
2. Split up that text by sentences.
3. Split each sentence into fragments using commas
4. Get the fragments that have 5 syllables and 7 syllables
5. Arrange them into a haiku

```js
async function haikuPoem() {
    // 1. Get the text
    const paragraphs = await getText();
    let fragments = [];
    paragraphs.forEach(paragraph => {
        // 2. Split the paragraph into sentences
        const sentences = sbd.sentences(paragraph);
        sentences.forEach(sentence => {
            // 3. Split the sentences by commas
            const pieces = sentence.split(",");
            // Put those pieces into an array called fragments
            fragments = fragments.concat(pieces);
        });
    });

    // 4. Get 5 and 7 syllable pieces
    const fiveSyllableFragments = fragments.filter(fragment => syllable(fragment) === 5);
    const sevenSyllableFragments = fragments.filter(fragment => syllable(fragment) === 7);

    // 5. Make them into a haiku
    return [
        fiveSyllableFragments[0],
        sevenSyllableFragments[0],
        fiveSyllableFragments[1]
    ];
}
```

We'll improve on this, but it's a start. Now, just make sure that we're using the haiku poem generator now.

```js
async function makePoem() {
    return await haikuPoem();
}
```

And let's see what we get.

```
' and was among the 60',
'Since the release of Purpose',
' I gave him to you.'
```

First, we might want to make it so that we're not retrieving the same lines every time. Let's add a function called `scramble` that shuffles the contents of an array. We can accomplish this by simply setting each element of an array to be another random element of the same array. This implementation of `scramble` modifies the array in place.

```js
function scramble(array) {
    for (let i = 0; i < array.length; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const tmp = array[randomIndex];
        array[randomIndex] = array[i];
        array[i] = tmp;
    }
}
// ... later
    // 4. Get 5 and 7 syllable pieces
    const fiveSyllableFragments = fragments.filter(fragment => syllable(fragment) === 5);
    const sevenSyllableFragments = fragments.filter(fragment => syllable(fragment) === 7);

    // 4b. Scramble the fragment arrays
    scramble(fiveSyllableFragments);
    scramble(sevenSyllableFragments);

    // 5. Make them into a haiku
    return [
        fiveSyllableFragments[0],
        sevenSyllableFragments[0],
        fiveSyllableFragments[1]
    ];
```

Now we get a new poem:

```
  ' Washington on March 9',
  ' also leaked.[108] In September',
  ' among other things.[197]'
```

Kinda lame, it's got all this garbage Wikipedia formatting in there. Let's write a function to clean up some of this stuff, that we can use to clean text.

```js
// Near the top
function cleanText(text) {
    let cleanerText = text.replace(/\[[0-9]+\]/g, "");
    return cleanerText;
}

// And then we  can use it anywhere, for example here
    // 1. Get the text
    const paragraphs = await getText();
    let fragments = [];
    paragraphs.forEach(paragraph => {
        // 2a. Clean the paragraph
        const cleanParagraph = cleanText(paragraph);
        // 2. Split the paragraph into sentences
        const sentences = sbd.sentences(cleanParagraph);
        sentences.forEach(sentence => {
            // 3. Split the sentences by commas
            const pieces = sentence.split(",");
            // Put those pieces into an array called fragments
            fragments = fragments.concat(pieces);
        });
    });
```

This is using a regular expression. An absolutely invaluable resource when working with regular expressions is https://regexr.com/. Seriously, it will make your life so much easier.

Now let's generate another poem:

```
  'In January 2015',
  ' which was released on July 11.',
  ' due to puberty.'
```

Cute, but it seems like the syllable counter has a hard time with numbers. We can use another regex to simply reject any fragments with numbers in them.

```js
    paragraphs.forEach(paragraph => {
        // 2a. Clean the paragraph
        const cleanParagraph = cleanText(paragraph);
        // 2. Split the paragraph into sentences
        const sentences = sbd.sentences(cleanParagraph);
        sentences.forEach(sentence => {
            // 3. Split the sentences by commas
            let pieces = sentence.split(",");

            // 3b. Filter pieces with numbers
            pieces = pieces.filter(piece => {
                return !(piece.match(/[0-9]+/g));
            });

            // Put those pieces into an array called fragments

            fragments = fragments.concat(pieces);
        });
    });
```

```js
  "Bieber's first single",
  'The song featured Ludacris',
  ' on his Instagram'
```

These are some very Bieber flavored poems. You might find different, more interesting results with other pages. Give it a try.

## Student Reflections, Takeaways & Next Steps
TBD

## Post Session
TBD

### References
- [Osmosis](https://github.com/rchipka/node-osmosis)

### Implementation Guidance & Teaching Reflection  
TBD

***With thanks and acknowledgement, this is based on the template provided by [Eyebeam](https://github.com/eyebeam/curriculum/blob/master/TEMPLATE.md)***