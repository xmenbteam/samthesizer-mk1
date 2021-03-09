import React, { useContext } from "react";
import { Context } from "../App";

const Start = ({ togglePlay }) => {
  const { state } = useContext(Context);
  const { isPlaying } = state;

  return (
    <div className="control">
      <input
        id="on-off"
        type="button"
        value={isPlaying ? "stop" : "start"}
        onClick={() => togglePlay()}
      />
    </div>
  );
};

export default Start;
