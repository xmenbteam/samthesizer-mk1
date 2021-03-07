import "./App.css";
import React, { useState } from "react";
import Controls from "./Components/Controls";
import Waveform from "./Components/Waveform";

function App() {
  const [waveform, setWaveform] = useState("sine");

  return (
    <div className="App">
      <h1>samthesizer mk1</h1>
      <hr />
      <Controls waveForm={waveform} />
      <Waveform setWaveform={setWaveform} />
    </div>
  );
}

export default App;
