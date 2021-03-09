import React, { useContext } from "react";
import { Context } from "../App";

const Slider = ({ onSlide }) => {
  const { state } = useContext(Context);
  const { isPlaying, freq } = state;

  return (
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
  );
};

export default Slider;
