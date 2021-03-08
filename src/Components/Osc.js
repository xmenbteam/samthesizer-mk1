import React, { useEffect, useState, useRef } from "react";

const audioContext = new AudioContext();
const osc = audioContext.createOscillator();
osc.type = "square";
osc.start();
const Osc = (props) => {
  const [freq, setFrequency] = useState(0);
  const { waveform } = props;
  const onSlide = (e) => {
    const { target } = e;
    setFrequency(target.value);
  };

  useEffect(() => {
    osc.frequency.value = freq;
    osc.connect(audioContext.destination);
    return () => osc.disconnect(audioContext.destination);
  }, [freq]);

  useEffect(() => {
    osc.type = waveform;
  }, [waveform]);

  return (
    <input
      name="freqSlide"
      type="range"
      min="20"
      max="1000"
      onChange={(e) => onSlide(e)}
    />
  );
};

export default Osc;
