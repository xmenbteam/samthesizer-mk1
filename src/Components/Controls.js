import React, { useEffect, useRef, useContext } from "react";
import { Context } from "../App";
import Slider from "./Slider";
import Start from "./Start";

const Controls = () => {
  const { state, dispatch } = useContext(Context);
  const { waveform, isPlaying, freq } = state;

  const audioContextRef = useRef();

  let audioContext = new AudioContext();
  let osc = audioContext.createOscillator();
  osc.type = waveform;
  osc.frequency.value = freq;
  osc.connect(audioContext.destination);

  useEffect(() => {
    osc.start(audioContext.currentTime);
    // osc.stop(audioContext.currentTime + 3);

    audioContextRef.current = audioContext;
    audioContext.suspend();

    return () => osc.disconnect(audioContext.destination);
    // eslint-disable-next-line
  }, [freq]);

  const onSlide = (e) => {
    const note = e.target.value;
    dispatch({ type: "freq", value: note });
    dispatch(isPlaying && { type: "stop" });
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioContextRef.current.suspend();
    } else {
      audioContextRef.current.resume();
    }
    dispatch(isPlaying ? { type: "stop" } : { type: "start" });
  };

  return (
    <div>
      <div className="controls">
        <Start togglePlay={togglePlay} />
        <Slider onSlide={onSlide} />
      </div>
      <hr />
    </div>
  );
};

export default Controls;
