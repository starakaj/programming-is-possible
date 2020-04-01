// Overall idea: make sounds with your mouth. Open mouth to start playing sounds,
// close mouth to stop sounds. Adjust the aperature of your mouth to change sound params.

// 1. Get video
// 2. Draw the video in the browser
// 3. Set up the instrument
// 4. Read parameters of the video to make sound

const p5 = require("p5");
const Tone = require("tone");
const StartAudioContext = require("startaudiocontext");

let lastMouthState = false;
const synth = new Tone.FMSynth().toMaster();
StartAudioContext(Tone.context);

let faceapi;
let detections;
let width = 400;
let height = 300;

function handleMouthState(state) {
    if (state !== lastMouthState) {
        lastMouthState = state;
        if (state) {
            synth.triggerAttack("C4");
        } else {
            synth.triggerRelease();
        }
    }
}

function handleMouthWidth(width) {
    // Looks like mouth width varies between 0.4 and 0.23
    const widthMinimum = 0.23;
    const widthMaximum = 0.4;
    const normalizedWidth = (width - widthMinimum) / (widthMaximum - widthMinimum);
    synth.modulationIndex.rampTo(100 * normalizedWidth);
}

const p5draw = (p) => {

    let p5video;

    function drawBox(detections) {
        detections.forEach((detection) => {
            const alignedRect = detection.alignedRect;

            p.noFill();
            p.stroke(255, 255, 255);
            p.strokeWeight(2);
            p.rect(
                alignedRect._box._x,
                alignedRect._box._y,
                alignedRect._box._width,
                alignedRect._box._height,
            );
        });
    }

    function drawLandmarks(detections) {
        p.noFill();
        p.stroke(161, 95, 251)
        p.strokeWeight(2)

        for(let i = 0; i < detections.length; i++){
            const mouth = detections[i].parts.mouth; 
            const nose = detections[i].parts.nose;
            const leftEye = detections[i].parts.leftEye;
            const rightEye = detections[i].parts.rightEye;
            const rightEyeBrow = detections[i].parts.rightEyeBrow;
            const leftEyeBrow = detections[i].parts.leftEyeBrow;

            drawPart(mouth, true);
            drawPart(nose, false);
            drawPart(leftEye, true);
            drawPart(leftEyeBrow, false);
            drawPart(rightEye, true);
            drawPart(rightEyeBrow, false);

        }
    }

    function drawPart(feature, closed) {
        p.textSize(9);
        p.beginShape();
        for(let i = 0; i < feature.length; i++){
            const x = feature[i]._x
            const y = feature[i]._y
            p.vertex(x, y)
            p.text(`${i}`, x + 5, y - 5);
        }
        
        if(closed === true){
            p.endShape(p.CLOSE);
        } else {
            p.endShape();
        }
    }

    function mouthOpenness(detections) {
        if (detections.length === 0) return;
        const mouth = detections[0].parts.mouth;
        const alignedRect = detections[0].alignedRect;
        const headWidth = alignedRect._box._width;

        //13-19 and 14-18
        const unnormalizedOpenness = (mouth[19]._y - mouth[13]._y + mouth[18]._y - mouth[14]._y) / 2;
        const normalizedOpenness = unnormalizedOpenness / headWidth;
        return normalizedOpenness;
    }

    function mouthWidth(detections) {
        if (detections.length === 0) return;
        const mouth = detections[0].parts.mouth;
        const alignedRect = detections[0].alignedRect;
        const headWidth = alignedRect._box._width;

        //12 - 6
        const unnormalizedWidth = Math.abs(mouth[12]._x - mouth[6]._x);
        const normalizedWidth = unnormalizedWidth / headWidth;
        return normalizedWidth;
    }

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(100, 200, 100);

        p5video = p.createCapture(p.VIDEO);
        p5video.size(width, height);
        p5video.hide();

        faceapi = ml5.faceApi(p5video, {
            withLandmarks: true,
            withDescriptors: false
        }, modelReady);
    }

    p.draw = () => {
        p.image(p5video, 0, 0, p.width, p.height);

        if (detections) {
            drawBox(detections);
            // drawLandmarks(detections);
            const openness = mouthOpenness(detections);
            const mwidth = mouthWidth(detections);
            const mouthState = openness > 0.03;
            handleMouthState(mouthState);
            handleMouthWidth(mwidth);
            
            p.textAlign(p.CENTER);
            p.textSize(48);
            p.text(mouthState ? "Mouth Open" : "Mouth Closed", p.width / 2, p.height - 0);
        }
    }
}

async function setup() {
    const myp5 = new p5(p5draw, "main");
}

function modelReady() {
    console.log("model ready!");
    faceapi.detect(gotResults);
}

function gotResults(err, results) {
    if (err) {
        console.log(err);
        return;
    }

    detections = results;
    faceapi.detect(gotResults);
}

window.addEventListener("DOMContentLoaded", setup);
