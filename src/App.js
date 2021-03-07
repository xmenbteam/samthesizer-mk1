import "./App.css";
import Controls from "./Components/Controls";
import Waveform from "./Components/Waveform";

function App() {
  return (
    <div className="App">
      <h1>samthesizer mk1</h1>
      <Controls />
      <Waveform />
    </div>
  );
}

export default App;
