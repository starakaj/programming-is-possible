const React = require("react");
const ClockFace = require("./ClockFace");
const Tone = require("tone"); 
const StartAudioContext = require("startaudiocontext"); // 1

const synth = new Tone.FMSynth().toMaster();
StartAudioContext(Tone.context); // 2

/* the main page for the index route of this app */
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

module.exports = RootComponent;