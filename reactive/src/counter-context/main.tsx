import { render } from "preact";
import { useState, useMemo } from "preact/hooks";

import LeftView from "./Left";
import RightView from "./Right";

import "./style.css";

// app state
import { CountContext } from "./CountContext";

console.log("counter-context");

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider
      value={{
        count,
        setCount,
        colour: "lightgreen",
      }}
    >
      <LeftView />
      <RightView />
    </CountContext.Provider>
  );
}

render(<App />, document.querySelector("div#app") as Element);
