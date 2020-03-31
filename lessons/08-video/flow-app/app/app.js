// Your program here

const FlowCalculator = require("./flow");
const p5 = require("p5");

class Particle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }

    draw(p) {
        p.strokeWeight(0);
        p.fill(255);
        p.ellipse(this.x, this.y, 2, 2);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 1;
    }

    outOfBounds(p) {
        return this.x < 0 ||
            this.x > p.width ||
            this.y > p.height;
    }
}

const p5Flow = (p) => {
    // https://kylemcdonald.github.io/cv-examples/

    var capture;
    var previousPixels;
    var flow;
    var w = 640,
        h = 480;
    var step = 6;
    let particles = [];

    var uMotionGraph, vMotionGraph;

    p.setup = () => {
        p.createCanvas(w, h);
        capture = p.createCapture({
            audio: false,
            video: {
                width: w,
                height: h
            }
        }, function() {
            console.log('capture ready.')
        });
        capture.elt.setAttribute('playsinline', '');
        capture.hide();
        flow = new FlowCalculator(step);
        // uMotionGraph = new Graph(100, -step / 2, +step / 2);
        // vMotionGraph = new Graph(100, -step / 2, +step / 2);
    }

    function copyImage(src, dst) {
        var n = src.length;
        if (!dst || dst.length != n) dst = new src.constructor(n);
        while (n--) dst[n] = src[n];
        return dst;
    }

    function same(a1, a2, stride, n) {
        for (var i = 0; i < n; i += stride) {
            if (a1[i] != a2[i]) {
                return false;
            }
        }
        return true;
    }

    p.draw = () => {
        capture.loadPixels();
        if (capture.pixels.length > 0) {
            if (previousPixels) {

                // cheap way to ignore duplicate frames
                if (same(previousPixels, capture.pixels, 4, p.width)) {
                    return;
                }

                flow.calculate(previousPixels, capture.pixels, capture.width, capture.height);
            }
            previousPixels = copyImage(capture.pixels, previousPixels);
            p.image(capture, 0, 0, w, h);

            if (flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {
                // uMotionGraph.addSample(flow.flow.u);
                // vMotionGraph.addSample(flow.flow.v);

                p.strokeWeight(2);
                flow.flow.zones.forEach(function(zone) {
                    p.stroke(p.map(zone.u, -step, +step, 0, 255),
                        p.map(zone.v, -step, +step, 0, 255), 128);
                    // p.line(zone.x, zone.y, zone.x + zone.u, zone.y + zone.v);

                    // maybe add a particle
                    // this is a lazy way to calculate velocity
                    if (Math.abs(zone.u) + Math.abs(zone.v) > 10 && particles.length < 500) {
                        particles.push(new Particle(zone.x, zone.y, zone.u, zone.v));
                    }
                });
            }

            particles = particles.filter(part => !part.outOfBounds(p));
            particles.forEach(part => part.draw(p));
            particles.forEach(part => part.update(p));
        }
    }
}

const myp5 = new p5(p5Flow, "main");
