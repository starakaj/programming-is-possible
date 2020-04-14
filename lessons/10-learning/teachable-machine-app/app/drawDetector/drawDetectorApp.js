const p5 = require("p5");

// Model URL
// If you make your own model, this is where you'd link to it. This is a model
// that I trained on drawings of circles and squares. It should be able to distinguish
// those two at least
const imageModelURL = 'https://teachablemachine.withgoogle.com/models/_W_IEN88s/';

// Whether or not you want to flip the video horizontally. If you trained your model
// using your webcam, then you'll want to enable this
const flipVideo = true;
const width = 320;
const height = 260;

const p5draw = (p) => {
    
    let classifier;
    let drawingCanvas;
    let label = "";

	p.setup = () => {
		p.createCanvas(width, height);
		p.background(255);

        // We want the drawing to persist between calls to draw,
        // so we make a graphics context into which we can draw
        drawingCanvas = p.createGraphics(width, height);
        drawingCanvas.background(235);
        
        classifier = ml5.imageClassifier(imageModelURL + 'model.json', classifyImage);
	};

	p.draw = () => {
        // Draw a small black circle under the mouse
        if (p.mouseIsPressed) {
            drawingCanvas.strokeWeight(0);
            drawingCanvas.fill(0);
            drawingCanvas.ellipse(p.mouseX, p.mouseY, 5, 5);
        }

        // To draw what we see, first erase
        p.background(235);

        // Draw the drawing canvas
        p.image(drawingCanvas, 0, 0, width, height);

        // Draw the label
        let textToDraw = label === "" ? "Draw! Space to clear, s to save." : label;
        p.fill(0);
        p.textSize(16);
        p.textAlign(p.CENTER);
        p.text(textToDraw, width / 2, height - 4);
    };

    p.keyPressed = () => {
        if (p.key === " ") {
            label = "";
            drawingCanvas.background(235);
        } else if (p.key === "s") {
            p.saveCanvas(drawingCanvas);
        }
    }

      // Get a prediction for the current video frame
    function classifyImage() {
        classifier.classify(drawingCanvas, gotResult);
    }
    
    function gotResult(error, results) {
        if (error) {
            console.error(error);
            return;
        }

        // results is an array, sorted by confidence. Each
        // result will look like { label: "category label" confidence: 0.453 }
        // or something like this
        if (results[0].confidence > 0.75)
            label = results[0].label;
        classifyImage();
    }
}

module.exports = function setup() {
	const myp5 = new p5(p5draw, "main");
}

