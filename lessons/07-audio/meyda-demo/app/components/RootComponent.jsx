const React = require("react");
const ClockFace = require("./ClockFace");

const Meyda = require("meyda");

/* the main page for the index route of this app */
const RootComponent = function() {

  const audioRef = React.useRef();

  const audioEffect = React.useEffect(() => {
    const audioContext = new AudioContext();
    const audioElement = audioRef.current;
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioContext.destination);

    const analyzer = Meyda.createMeydaAnalyzer({
      audioContext: audioContext,
      source: source,
      bufferSize: 512,
      featureExtractors: ["loudness"],
      callback: (features) => {
        
      }
    });

    analyzer.start();
  }, []);

  return (
    <div>
      <audio
        ref={audioRef}
        controls
        loop
        crossOrigin="anonymous"
        id="audio"
        src="./Shaolin_Dub_-_12_-_Pressure.mp3"
      ></audio>
      <ClockFace language="fr" />
    </div>
  );
}

module.exports = RootComponent;