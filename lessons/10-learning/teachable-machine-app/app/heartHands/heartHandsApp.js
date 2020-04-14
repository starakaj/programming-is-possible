const p5 = require("p5");
const modelURL = "model/model.json";
const Heart = require("./heart");

let width = 400;
let height = 300;
let p5video;

let classifier;
let label = "";
let hearts = [];

const p5draw = (p) => {


    p.preload = () => {
        classifier = ml5.imageClassifier(modelURL, classifyVideo);
    }

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(255);

        p5video = p.createCapture(p.VIDEO);
        p5video.size(width, height);
        p5video.hide();

        heart = (new Heart(100, 100, 0, 0, 0, 0));
        heart.scale = 50;
    }

    p.draw = () => {
        p.background(100);
        p.image(p5video, 0, 0, p.width, p.height);

        // Draw the label
        p.fill(255);
        p.textSize(16);
        p.textAlign(p.CENTER);
        p.text(label, p.width / 2, p.height - 4);

        if (label.toLowerCase().startsWith("heart")) {
            const h = new Heart(
                p.width / 2.0,
                p.height / 2.0,
                p.map(Math.random(), 0, 1, -1, 1) * 10,
                p.map(Math.random(), 0, 1, -1, 1) * 10,
                p.map(Math.random(), 0, 1, 0, 2) * Math.PI,
                p.map(Math.random(), 0, 1, -1, 1) * Math.PI * 0.05
            );
            h.scale = p.map(Math.random(), 0, 1, 10, 50);
            hearts.push(h);
        }

        hearts.forEach(heart => heart.draw(p));
        hearts.forEach(heart => heart.update());
        hearts = hearts.filter(heart => !heart.isOffscreen(p));
    }

    function classifyVideo() {
        let flippedVideo = flipImage(p, p5video);
        classifier.classify(flippedVideo, gotResult);
        flippedVideo.remove();
    }

    function gotResult(error, results) {
        if (error) {
            console.error(error);
            return;
        }
    
        label = results[0].label;
    
        classifyVideo();
    }
}

module.exports = function setup() {
    const myp5 = new p5(p5draw, "main");
}

function flipImage(p, img) {
    const p5Canvas = p.createGraphics(img.width, img.height);
    p5Canvas.push()
    p5Canvas.translate(img.width, 0);
    p5Canvas.scale(-1, 1);
    p5Canvas.image(img, 0, 0, img.width, img.height);
    p5Canvas.pop();

    return p5Canvas;
}
