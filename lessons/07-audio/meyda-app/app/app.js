const Meyda = require("meyda");
const StartAudioContext = require("startaudiocontext");

function readAudioFromMicrophone() {
    const handleSuccess = function(stream) {
        const context = new AudioContext();
        const source = context.createMediaStreamSource(stream);
        setupAnalyzer(context, source);
    };
    
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(handleSuccess);
}

function readAudioFromFile() {
    // If we want to route the audio around, and do arbitrary things to it, then we
    // need to create an audio context in which to do it.
    const audioContext = new AudioContext();

    // Add StartAudioContext, so the context starts when you click the background
    StartAudioContext(audioContext);

    // Grab the audio element
    const htmlAudioElement = document.getElementById("audio");

    // Create a Web Audio node that wraps the media in that element
    const source = audioContext.createMediaElementSource(htmlAudioElement);

    // Connect it to output, so we can hear it when we play
    source.connect(audioContext.destination);

    // Set up the analyzer
    setupAnalyzer(audioContext, source);
}

let loudness = null;
let spectralCentroid = null;
let mfcc = null;
function setupAnalyzer(context, source) {
    // Set up Meyda
    
    const bufferSize = 512;
    const analyzer = Meyda.createMeydaAnalyzer({
        audioContext: context,
        source,
        bufferSize, // this must be a power of two
        featureExtractors: ["loudness", "spectralCentroid", "mfcc"],
        callback: (features) => {
            loudness = features.loudness;
            spectralCentroid = features.spectralCentroid;
            mfcc = features.mfcc;
        }
    });
    analyzer.start();
}

// Drawing loop
const draw = () => {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const bounds = canvas.getBoundingClientRect();
    const width = bounds.width;
    const height = bounds.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(66, 135, 245, 0.9";
    ctx.lineWidth = 0;

    function drawBars(seq, scale, offset) {
        for (let i = 0; i < seq.length; i++) {            
            let barWidth = width / seq.length;
            let x = Math.floor(barWidth * i);
            let x1 = Math.floor(barWidth * (i + 1));
            let y = offset * scale;
            let barHeight = height * (seq[i] - offset) * scale;

            ctx.fillRect(x, y, x1 - x, barHeight);
        }
    }

    if (mfcc) {
        drawBars(mfcc, 0.01, 50);
    }

    if (spectralCentroid !== null) {
        let x = width * spectralCentroid * 2 / bufferSize;
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgba(217, 173, 15, 0.9";
        ctx.beginPath()
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    requestAnimationFrame(draw);
}

// Kick everything off
readAudioFromMicrophone();
requestAnimationFrame(draw);
