import React from "react";
import { waveforms } from "./Data";

const Waveform = ({ setWaveform }) => {
  const clickHandler = (e) => {
    const wave = e.target.innerText;
    setWaveform(wave);
  };

  return (
    <div className="waveform-container">
      <h2>Choose Your Waveform:</h2>
      <ul id="oscillator-list">
        {waveforms.map((wave, id) => {
          return (
            <li
              key={id}
              className="waveform"
              onClick={(wave) => clickHandler(wave)}
            >
              {wave}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Waveform;
