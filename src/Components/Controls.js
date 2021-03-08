import React, { useState, useEffect, useRef, useContext } from "react";
import { notes } from "./Data";
import { Context } from "../App";

const Controls = () => {
  const { state, dispatch } = useContext(Context);
  const { waveform, isPlaying } = state;

  console.log(isPlaying, "isplaying");

  const [freq, setFreq] = useState(440);
  // eslint-disable-next-line
  const [scaleFreqArr, setScaleFreqArr] = useState([]);

  const audioContextRef = useRef();

  // const noteArray = Object.entries(notes);
  const freqVals = Object.values(notes);

  useEffect(() => {
    setScaleFreqArr([...freqVals]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let audioContext = new AudioContext();
    let osc = audioContext.createOscillator();
    osc.type = waveform;
    osc.frequency.value = freq;

    osc.connect(audioContext.destination);
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 3);

    audioContextRef.current = audioContext;
    audioContext.suspend();

    return () => osc.disconnect(audioContext.destination);
    // eslint-disable-next-line
  }, [freq, waveform]);

  const onSlide = (e) => {
    const note = e.target.value;
    setFreq(note);
    dispatch(isPlaying ? { type: "stop" } : { type: "start" });
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioContextRef.current.suspend();
      dispatch({ type: "stop" });
    } else {
      audioContextRef.current.resume();
      dispatch({ type: "start" });
    }
  };

  return (
    <div>
      <div className="controls">
        <div className="control">
          <input
            id="on-off"
            type="button"
            value={isPlaying ? "stop" : "start"}
            onClick={() => togglePlay()}
          />
        </div>
        <div className="control">
          <p className="descriptor">Use slider to modify frequency</p>
          <input
            name="freqSlide"
            type="range"
            className="slider"
            id="freq-slide"
            min="20"
            max="1000"
            onChange={(e) => onSlide(e)}
          />
          <p className="descriptor">
            {isPlaying
              ? `The Oscillator is playing at ${freq}Hz`
              : `The Oscillator will play at ${freq}Hz`}
          </p>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Controls;
