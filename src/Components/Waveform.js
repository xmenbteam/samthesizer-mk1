import React from "react";
import { waveforms } from "./Data";

const Waveform = () => {
  return (
    <div className="waveform-container">
      <h2>Choose Your Waveform:</h2>
      <ul id="oscillator-list">
        {waveforms.map((wave, id) => {
          return (
            <li key={id} className="waveform">
              {wave}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Waveform;
