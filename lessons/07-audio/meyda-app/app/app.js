const Meyda = require("meyda");
const p5 = require("p5");
const StartAudioContext = require("startaudiocontext");
const dat = require('dat.gui');

// Open a connection to the microphone, then call a callback
// when everything is ready. The callback will receive the
// new web audio context, as well as the audio stream itself.
function readAudioFromMicrophone(callback) {
    // Call this function when the user media (the microphone)
    // returns successfully
    const handleSuccess = function(stream) {
        // Create a new Web Audio context
        const context = new AudioContext();

        // Create a Web Audio node to wrap the microphone stream
        const source = context.createMediaStreamSource(stream);

        // Execute the callback with the new context and Web Audio Node
        if (callback) callback(context, source);
    };
    
    // Ask the user's permission, and then grab their microphone stream
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(handleSuccess);
}

// Create a web audio node to wrap the DOM audio element, then call a callback
// when everything is ready. The callback will receive the
// new web audio context, as well as the audio stream itself.
function readAudioFromFile(callback) {
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
    if (callback) callback(audioContext, source);
}

let lastFeatures = null;
const bufferSize = 512;
function setupAnalyzer(context, source) {
    // Set up Meyda
    const analyzer = Meyda.createMeydaAnalyzer({
        audioContext: context,
        source,
        bufferSize, // this must be a power of two
        featureExtractors: ["loudness", "spectralCentroid", "mfcc", "spectralKurtosis", "chroma", "spectralFlatness", "spectralSlope"],
        callback: (features) => {
            lastFeatures = features;
        }
    });
    analyzer.start();
}

const p5Amplitude = (p) => {
    p.setup = () => {
        p.createCanvas(700, 410);
        p.background(255);
    }

    p.draw = () => {
        if (lastFeatures) {
            p.background(lastFeatures.loudness.total * 255 / 30);
        }
    }
}

const p5VowelConsonant = (p) => {
    let vHistory, cHistory;
    let params = {
        ampScale: 0.2,
        smoothing: 0.9
    };
    let gui = new dat.GUI();
    gui.add(params, "ampScale", 0, 1);
    gui.add(params, "smoothing", 0, 1);

    p.setup = () => {
        p.createCanvas(700, 410);
        p.background(255);
    }

    p.draw = () => {

        p.colorMode(p.RGB, 255);
        p.background(255, 255, 255);

        if (lastFeatures && !Number.isNaN(lastFeatures.spectralCentroid)) {
            const px = p.width / 2;
            const py = p.height / 2;

            // The higher the spectral centroid, the more of the acoustic energy is in the high frequencies
            // Call this consonants
            let radiusC = lastFeatures.spectralCentroid * lastFeatures.loudness.total * params.ampScale;
            if (cHistory === undefined) cHistory = radiusC;
            if (radiusC > cHistory) {
                cHistory = radiusC;
            } else {
                cHistory = radiusC * (1.0 - params.smoothing) + cHistory * params.smoothing;
            }

            // Draw half of the sphere in red
            p.fill(200, 10, 10);
            p.arc(px, py, cHistory, cHistory, 0, p.PI);

            // For vowels, we're interested in how close to zero the spectral centroid is. The closer to zezo it is, 
            // larger we want our computed measurement value to be. So we subtract bufferSize/2 from lastFeatures.spectralCentroid
            // We also subtract 185 as a fudge factor. 
            let radiusV = Math.max(0, (bufferSize / 2 - lastFeatures.spectralCentroid - 185) * lastFeatures.loudness.total) * params.ampScale;
            if (vHistory === undefined) vHistory = radiusV;
            if (radiusV > vHistory) {
                vHistory = radiusV;
            } else {
                vHistory = radiusV * (1.0 - params.smoothing) + vHistory * params.smoothing;
            }

            // Draw the other half in black
            p.fill(10, 10, 10);
            p.arc(px, py, vHistory, vHistory, p.PI, p.PI * 2);
        }
    }
}

// You'll notice that this one isn't very satisfying unless the buffer
// size is a bit bigger than 512
const p5Chroma = (p) => {
    p.setup = () => {
        p.createCanvas(700, 410);
        p.background(255);
    }

    p.draw = () => {
        // Wipe the background
        p.colorMode(p.RGB, 255);
        p.background(255);

        if (lastFeatures) {
            p.colorMode(p.HSB, 255);
            lastFeatures.chroma.forEach((c, i) => {
                const startAngle = (i / lastFeatures.chroma.length) * p.PI * 2;
                const arcAngle = (1 / lastFeatures.chroma.length) * p.PI * 2;
                const radius = c * c * 300.0;
                p.fill(i * 255 / lastFeatures.chroma.length, 255, 240);
                p.arc(p.width / 2, p.height / 2, radius, radius, startAngle, startAngle + arcAngle);
            });
        }   
    }
}

// This just draws the mel cepstral coefficients
const p5mfcc = (p) => {
    p.setup = () => {
        p.createCanvas(700, 410);
        p.background(255);
    }

    function drawBars(ray) {
        ray.forEach((r, i) => {
            const w = p.width / ray.length;
            const px = w * i;
            const h = r * p.height;
            p.rect(px, p.height, w, -h);
        });
    }

    p.draw = () => {
        // Wipe the background
        p.colorMode(p.RGB, 255);
        p.background(255);

        if (lastFeatures) {
            let mfccScaled = lastFeatures.mfcc.slice();
            mfccScaled = mfccScaled.map(v => {
                return (v + 70) * 0.005; 
            });

            p.fill(220);
            drawBars(mfccScaled);
        }   
    }
}

// Kick everything off
// readAudioFromFile(setupAnalyzer);
readAudioFromMicrophone(setupAnalyzer);

// Choose which p5 example you want to see
// let myp5 = new p5(p5Amplitude, "drawing");
// let myp5 = new p5(p5VowelConsonant, "drawing");
let myp5 = new p5(p5Chroma, "drawing");
// let myp5 = new p5(p5mfcc, "drawing");
