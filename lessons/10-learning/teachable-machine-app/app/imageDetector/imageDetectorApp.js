const p5 = require("p5");

// Model URL
// If you make your own model, this is where you'd link to it. This is a model
// that I trained on making "heart hands", like this
// https://image.shutterstock.com/image-photo/woman-making-heart-her-hands-600w-1211985307.jpg
const imageModelURL = 'https://teachablemachine.withgoogle.com/models/sltRChS8U/';

// Whether or not you want to flip the video horizontally. If you trained your model
// using your webcam, then you'll want to enable this
const flipVideo = true;
const width = 320;
const height = 260;

const p5draw = (p) => {
    
    let classifier;
    let p5video;
    let offscreenGraphics;
    let label = "";

	p.setup = () => {
		p.createCanvas(width, height);
		p.background(255);

		p5video = p.createCapture(p.VIDEO);
		p5video.size(width, height);
        p5video.hide();

        // We'll use this offscreen canvas to store the video, in case we
        // want to transform it before classifying it
        offscreenGraphics = p.createGraphics(width, height);
        
        classifier = ml5.imageClassifier(imageModelURL + 'model.json', classifyVideo);
	}

	p.draw = () => {
        // This draws the video with X and Y flipped
        offscreenGraphics.push();
        if (flipVideo) {
            offscreenGraphics.translate(width, 0);
            offscreenGraphics.scale(-1, 1);
        }
        offscreenGraphics.image(p5video, 0, 0, width, height);
        offscreenGraphics.pop();

        p.image(offscreenGraphics, 0, 0, p.width, p.height);

        // Draw the label
        p.fill(255);
        p.textSize(16);
        p.textAlign(p.CENTER);
        p.text(label, width / 2, height - 4);
    }

      // Get a prediction for the current video frame
    function classifyVideo() {
        classifier.classify(offscreenGraphics, gotResult);
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
        classifyVideo();
    }
}

module.exports = function setup() {
	const myp5 = new p5(p5draw, "main");
}

