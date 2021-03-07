import React, { useState, useEffect, useRef } from "react";
import { notes, scaleType } from "./Data";

const Controls = ({ waveform }) => {
  const [freq, setFreq] = useState(440);
  const [scaleFreqArr, setScaleFreqArr] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef();

  const noteArray = Object.entries(notes);
  const freqVals = Object.values(notes);

  useEffect(() => {
    setScaleFreqArr([...freqVals]);
  }, []);

  useEffect(() => {
    let audioContext = new AudioContext();
    let osc = audioContext.createOscillator();
    osc.type = waveform;
    osc.frequency.value = freq;

    osc.connect(audioContext.destination);
    osc.start(audioContext.currentTime);

    audioContextRef.current = audioContext;
    audioContext.suspend();

    return () => osc.disconnect(audioContext.destination);
  }, []);

  const onSlide = (e) => {
    const note = e.target.value;
    setFreq(note);
    console.log(waveform);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioContextRef.current.suspend();
    } else {
      audioContextRef.current.resume();
    }
    setIsPlaying((play) => !play);
  };

  return (
    <div>
      <div className="controls">
        <div className="control">
          <span>
            {isPlaying
              ? "Click to Stop Oscillator "
              : "Click to Start Oscillator "}
          </span>
          <input
            id="on-off"
            type="button"
            value={isPlaying ? "stop" : "start"}
            onClick={() => togglePlay()}
          />
        </div>
        <div className="control">
          <span>Select Root Note: </span>
          <select name="notes">
            {noteArray.map((note, id) => {
              return <option key={id}>{note[0]}</option>;
            })}
          </select>
        </div>
        <div className="control">
          <span>Select Scale Type: </span>
          <select name="scaleType">
            {scaleType.map((scale, id) => {
              return <option key={id}>{scale}</option>;
            })}
          </select>
        </div>
        <div className="control">
          <p>Use slider to modify frequency</p>
          <input
            name="freqSlide"
            type="range"
            className="slider"
            id="freq-slide"
            list={freqVals}
            min={noteArray[0][1]}
            max={noteArray[noteArray.length - 1][1]}
            onInput={(e) => onSlide(e)}
          />
          <p>
            {isPlaying
              ? `The Oscillator is playing at ${freq}Hz`
              : "The Oscillator is Stopped"}
          </p>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Controls;
