# Audio  Analysis

## Authors
Sam Tarakajian for NYU IDM

DM-GY 6063

@starakaj

## Essential Questions
- How do computers encode audio data?
- What are the salient features of audio?
- How can we detect and analyze those features?
- What are some creative applications?

## Introduction
Simply put, sound is just vibrations in the air, and light is just an electromagnetic vibration. However, human beings and other living organisms have evolved complex biomechanical systems for detecting these vibrations, and equally complex neural machinery for analyzing them. Microphones and cameras do the work of ears and eyes, recording sound and light for later reproduction. In this class, we'll start talking about how to analyze and undestand these streams, starting with a focus on audio data.

When we talk about the meaning of a data stream, we're often talking about features, and usually grouping those features into hierarchical levels. We might talk about low level features like color or loudness, in addition to high level features like emotion or genre. We'll look at techniques for extracting low and high level features, and investigate some creative applications.

### Target Audience / Prerequisite & Pre-Assessment
This module is part of DM-GY 6063, _Programming is the Art of the Possible_. This is a second semester creative coding course, designed for students who have a strong JavaScript foundation.

### Outcomes & Goals
* In this class we'll be working with audio and recordings, as well as live audio streams. We'll look at how computers represent this data, and we'll explore some software libraries for analyzing that data.
* Students will walk away with a deeper understanding of how audio works. They'll take away some useful tools for performing that analysis, and they'll have exposure to creative techniques for working with extracted features.

### Pacing / Duration
TBD

## Materials Needed
TBD, but certainly a laptop and a browser. Other helpful software:
- Meyda.js
- Synopsis
- Max/MSP
- Freesound/Essentia

### Exercises To Do Before Class
TBD

### Vocabulary (example)
* Feature - (find a good definition of this, it's not trivial).
* Envelope - The slow-moving amplitude of a sound, related to its loudness. Commonly divided into Attack, Decay, Sustain, Release portions for modeling instruments.
* Spectrum - A power-histogram representation of the frequency content of a signal.
* Discrete Fourier Transform - A function for transforming a series of samples from a time domain representation to a frequency domain representation.
* Harmonic - Sounds whose spectral content is mostly grouped into bands, the center frequencies of which are whole number multiples of each other.

## Exercise Descriptions
Given their availability, we'll be using JavaScript tools mostly in this class. However the concepts that we'll be covering extend to other domains as well. Tools as diverse as Ableton Live, Max/MSP, Tone.js, p5 Sound, Supercollider, and many others, all have a common set of concepts and vocabulary. So, with that in mind, let's get started.

### Getting started with Tone.js
I'm going to start by copying the starter from https://github.com/starakaj/react-express-starter to a new directory, and renaming that directory to `tonetest`. You can rename it however you like. So, at this point you should have a directory somewhere on your machine, that's a copy of the repo from the react-express-starter link. It's up to you whether you want that to be a clone of that repo, or a .zip of that repo, but you might prefer to use a .zip.

Okay, let's start by adding a dependency to `tone` to the root of this repo.

```sh
npm install tone
```

This adds a dependency to a library called Tone.js. Tone simplifies working with the Web Audio API, and has support for things like timing, synthesis and playback. To do the simplest possible thing with Tone, let's have it play a note. In order to do that, we need to add two lines of code to our app.

```js
//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster()

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease('C4', '8n')
```

This react starter comes with a clock, so let's add this code in a way that makes the clock play a new note every second (just like a very annoying clock would). For now, let's modify our code like this:

```js
// ClockFace.jsx

const React = require("react");

function ClockFace(props) {

    const [date, setDate] = React.useState(new Date());

    // Create the tone synth
    const synth = new Tone.Synth().toMaster();

    // This will be called whenever the component renders, but because we pass an empty
    // array as the second argument, it will only be called once, when the component
    // first renders.
    React.useEffect(() => {

        const timerId = setInterval(() => {
            setDate(new Date);

            // Play a note each second
            synth.triggerAttackRelease('C4', '32n');
        }, 1000);

        // By returning a function from useEffect, we tell React that we'd like this
        // function called when the component is unmounted
        return () => { clearInterval(timerId) };

    }, []);

    let prefix = "";
    let postfix = ""
    if (props.language === "en") {
        prefix = "It is";
        postfix = "o'clock";
    } else if (props.language === "fr") {
        prefix = "Il est";
        postfix = "heures";
    }

    return (
        <p>{prefix} {date.getHours()}:{date.getMinutes()}:{date.getSeconds()} {postfix}</p>
    );
}

module.exports = ClockFace;
```

From the command line, try `npm run watch` and check out localhost:3000. If you don't hear anything, try clicking on the page. I can't remember when Chrome made this change, but it's been standard for awhile now to disable audio on the page until it receives some user interaction. If you open up the web inspector, you'll see a warning about this.

![The browser issues this warning when you try to start the audio context without user interaction](./img/audio-context-warning.png)

Before we go too much further, there's a tiny thing that we ought to change. If you take a closer look at this code, you'll see that we're creating the synth during the render callback of this component. That's a no-no, since it means every time we're rendering the component, we're also creating a new synth. That synth goes out of scope immediately when the function finishes rendering, but it's still a waste of time. A better pattern would be to make a global synth, and to pass it down as a prop. Assuming there's one and only one RootComponent, we could modify the code like this.

```js
// RootComponent.jsx

const React = require("react");
const ClockFace = require("./ClockFace");
const Tone = require("tone"); // 1

const synth = new Tone.Synth().toMaster(); // 2

/* the main page for the index route of this app */
const RootComponent = function() {
  return (
    <div>
      <h1>Hello!</h1>

      <p>Your app here</p>

      {/* // 3 */}
      <ClockFace language="fr" synth={synth} /> 
    </div>
  );
}

module.exports = RootComponent;
```

```js
// ClockFace.jsx

const React = require("react");

function ClockFace(props) {

    const [date, setDate] = React.useState(new Date());

    // This will be called whenever the component renders, but because we pass an empty
    // array as the second argument, it will only be called once, when the component
    // first renders.
    React.useEffect(() => {

        const timerId = setInterval(() => {
            setDate(new Date);

            // Fetch the synth from props, and play a note each second
            props.synth.triggerAttackRelease('C4', '32n');
        }, 1000);

        // By returning a function from useEffect, we tell React that we'd like this
        // function called when the component is unmounted
        return () => { clearInterval(timerId) };

    }, []);

    let prefix = "";
    let postfix = ""
    if (props.language === "en") {
        prefix = "It is";
        postfix = "o'clock";
    } else if (props.language === "fr") {
        prefix = "Il est";
        postfix = "heures";
    }

    return (
        <p>{prefix} {date.getHours()}:{date.getMinutes()}:{date.getSeconds()} {postfix}</p>
    );
}

module.exports = ClockFace;
```

We make these changes and... silence. What happened? Well as I mentioned before, Chrome doesn't want us to start playing audio in the browser without user interaction. It's a security and useability thing. Basically, we need to call `.resume` on the Web Audio context during a user event. There's an extremely handy npm library for this called `startaudiocontext` that provides a function called "StartAudioContext".

```sh
npm install startaudiocontext
```

```js
// RootComponent.jsx

const React = require("react");
const ClockFace = require("./ClockFace");
const Tone = require("tone"); 
const StartAudioContext = require("startaudiocontext"); // 1

const synth = new Tone.Synth().toMaster();
StartAudioContext(Tone.context); // 2

/* the main page for the index route of this app */
const RootComponent = function() {
  return (
    <div>
      <h1>Hello!</h1>

      <p>Your app here</p>
      
      <ClockFace language="fr" synth={synth} /> 
    </div>
  );
}

module.exports = RootComponent;
```

StartAudioContext adds a listener to the given element (or elements) and starts the audio context whenever the user interacts with one of those elements. Without an optional second argument, it binds to the `<body>` element. Now reload the page and click on the background, and you should hear some audio.

### Modulating Parameters

What exactly have we done so far?

```js
const synth = new Tone.Synth().toMaster();
```

This creates a new component called `Synth`, which is one of the built in Tone synthesizers. `toMaster` is a method on a synth, that connects that synthesizer to the master audio output. This synth is just a basic synthesizer, but there are some others. Let's take the FM synthesizer for a spin. Change that line to this:

```js
const synth = new Tone.FMSynth().toMaster();
```

If you reload the page, you'll hear it's got a slightly different timbre to it. Let's do something where we modulate that timbre. In general, when we're talking about something like and audio or video effect, modulating simply means to change one of its parameters.

Before we do that, let's enlarge the root of our React app so that it takes up the whole screen. Add the "root" class to the JSX returned by the RootComponent

```js
    // RootComponent.jsx
  return (
    <div className="root" >
      <h1>Hello!</h1>

      <p>Your app here</p>

      <ClockFace language="fr" synth={synth} /> 
    </div>
  );
```

And then add this to your CSS to stretch the component out to fill the viewport

```css
/* style.css */
.root {
    position: absolute;
    background-color: palevioletred;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    padding-left: 20px;
}
```

Okay, now we can do the interesting piece, adding a bit of code to add some modulation. Looking at the API for the Tone FM synthesizer, we can see that it has a parameter called `modulationIndex`. Tone parameters are interesting because we don't just set them the way we'd set normal JavaScript properties. Rather, we set them by using special functions that change them continuously over time. So rather than doing `synth.modulationIndex = 100`, we do something like `synth.modulationIndex.rampTo(100)`. This creates a continuous ramp that avoids something called zipper noise, which are audible audio artifacts caused by changing a sound discontinuously.

Adding an `onMouseMove` event to our div lets us track the mouse position, and change the modulationIndex accordingly.

```js
const RootComponent = function() {

  const handleMouseMove = (mouseevent) => {
    synth.modulationIndex.rampTo(100 * mouseevent.clientX / window.innerWidth);
  };

  return (
    <div className="root" onMouseMove={handleMouseMove} >
      <h1>Hello!</h1>

      <p>Your app here</p>

      <ClockFace language="fr" synth={synth} /> 
    </div>
  );
}
```

### Getting started with Meyda

In this class we're going to be working with an audio analysis library called Meyda.js. When we talk about audio analysis, we're referring to techniques that let us describe an audio signal in terms of its features. For example, a sound might have a given pitch, which is a perceptual quality related to the fundamental frequency of the sound.

To demonstrate some of these audio qualities in action, I might be jumping back and forth to Max, just because I can use it very fast (or at least faster than I can JavaScript).

## Student Reflections, Takeaways & Next Steps
TBD

## Post Session

### References
- [Tone.js](https://tonejs.github.io/)

### Implementation Guidance & Teaching Reflection  
TBD

***With thanks and acknowledgement, this is based on the template provided by [Eyebeam](https://github.com/eyebeam/curriculum/blob/master/TEMPLATE.md)***