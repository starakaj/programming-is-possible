const p5 = require("p5"); // Just so it's easy to draw

// Model URL
// If you make your own model, this is where you'd link to it. This is a model
// that I trained on making on saying the word "beep". Hopefully
// if you say the word "beep" in isolation it will detect it. Unfortunately
// it's only trained on my voice.
const soundModelURL = 'https://teachablemachine.withgoogle.com/models/Q-n8u5SXp/';

// These are the options that you can pass to your sound classifier when creating 
// it. Unless you pass "invokeCallbackOnNoiseAndUnknown: true", the callback
// will only trigger when one of the non-noise categories is recognized.
const soundClassifierOptions = {
    includeSpectrogram: true, // in case listen should return result.spectrogram
    probabilityThreshold: 0.75,
    invokeCallbackOnNoiseAndUnknown: true,
    overlapFactor: 0.50 // probably want between 0.5 and 0.75.
}

const width = 320;
const height = 260;

const p5draw = (p) => {
    
    let classifier;
    let label = "listening...";

	p.setup = () => {
		p.createCanvas(width, height);
		p.background(255);
        
        classifier = ml5.soundClassifier(soundModelURL + 'model.json', soundClassifierOptions, audioClassifierReady);
	}

	p.draw = () => {
        p.background(0);

        // Draw the label
        p.fill(255);
        p.textSize(16);
        p.textAlign(p.CENTER);
        p.text(label, width / 2, height - 4);
    }

    // Unlike the video classifier, this classifier will run continuously,
    // calling gotResult again and again
    function audioClassifierReady() {
        classifier.classify(gotResult);
    }
    
    function gotResult(error, results) {
        if (error) {
            console.error(error);
            return;
        }

        // results is an array, sorted by confidence. Each
        // result will look like { label: "category label" confidence: 0.453 }
        // or something like this
        label = results[0].label;
    }
}

module.exports = function setup() {
	const myp5 = new p5(p5draw, "main");
}
