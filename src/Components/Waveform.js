import React, { useContext } from "react";
import { waveforms } from "./Data";
import { Context } from "../App";

const Waveform = () => {
  const { state, dispatch } = useContext(Context);

  const { waveform, isPlaying } = state;

  return (
    <div className="waveform-container">
      <h2 className="waveformChoose">Choose Your Waveform:</h2>
      <ul id="oscillator-list">
        {waveforms.map((wave, id) => {
          const LCWave = wave.toLowerCase();
          return (
            <li
              key={id}
              className={LCWave === waveform ? "selectedWaveform" : "waveform"}
              onClick={(wave) => {
                const disWave = wave.target.innerText.toLowerCase();
                dispatch({ type: disWave });
                dispatch(isPlaying && { type: "stop" });
              }}
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
