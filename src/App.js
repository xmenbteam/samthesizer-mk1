import "./App.css";
import React, { useReducer } from "react";
import Controls from "./Components/Controls";
import Waveform from "./Components/Waveform";

const redFunc = (state, action) => {
  switch (action.type) {
    case "sawtooth": {
      return {
        ...state,
        waveform: "sawtooth",
      };
    }
    case "triangle": {
      return {
        ...state,
        waveform: "triangle",
      };
    }
    case "square": {
      return {
        ...state,
        waveform: "square",
      };
    }
    case "sine": {
      return {
        ...state,
        waveform: "sine",
      };
    }
    case "play": {
      return {
        ...state,
        isPlaying: true,
      };
    }
    case "stop": {
      return {
        ...state,
        isPlaying: false,
      };
    }
    default: {
      return state;
    }
  }
};

const initialState = {
  waveform: "sine",
  isPlaying: false,
};

export const Context = React.createContext();

function App() {
  const [state, dispatch] = useReducer(redFunc, initialState);

  return (
    <div className="App">
      <Context.Provider value={{ state, dispatch }}>
        <h1 className="samtitle">samthesizer mk1</h1>
        <Controls />
        <Waveform />
      </Context.Provider>
    </div>
  );
}

export default App;
