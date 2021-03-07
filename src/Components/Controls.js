import React, { useState, useEffect } from "react";
import { notes, scaleType } from "./Data";

const Controls = () => {
  const [freq, setFreq] = useState(null);
  const [note, setNote] = useState("");
  const [scaleFreq, setScaleFreq] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState();

  const noteArray = Object.entries(notes);
  const freqVals = Object.values(notes);

  useEffect(() => {
    setScaleFreq([...freqVals]);
  }, []);

  const onSlide = (e) => {
    const note = e.target.value;

    setFreq(note);
    setCurrentStepIndex();
  };

  return (
    <div>
      <div className="controls">
        <div className="control">
          <span>Click to Start Oscillator </span>
          <input id="on-off" type="button" value="start" />
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
          <p>{freq}</p>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Controls;
