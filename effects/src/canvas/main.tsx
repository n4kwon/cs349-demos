import { render } from "preact";

import { Canvas } from "./Canvas";
import { useCallback, useEffect, useState } from "preact/hooks";

console.log("canvas");

function App() {
  const [size, setSize] = useState(100);

  console.log(`🖼️ render App`);

  return (
    <>
      <div>
        <button onClick={() => setSize(size + 10)}>+</button>
        <button onClick={() => setSize(size - 10)}>-</button>
      </div>
      <Canvas width={size} height={size} />
    </>
  );
}

render(<App />, document.querySelector("div#app") as Element);
