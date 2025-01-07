import { render } from "preact";

import { useCallback, useEffect, useState } from "preact/hooks";

let listenerNum = 0;

function App() {
  const [lastKey, setLastKey] = useState("");

  const handler = useCallback((e: KeyboardEvent) => {
    setLastKey(e.key);
    console.log(`keydown: ${e.key} (listener ${listenerNum})`);
  }, []);

  // count times listener is created
  useEffect(() => {
    listenerNum++;
  }, [handler]);

  // add listener on mount
  useEffect(() => {
    console.log(`👉 mount`);
    document.addEventListener("keydown", handler);

    // remove listener on unmount
    return () => {
      console.log(`👈 unmount`);
      document.removeEventListener("keydown", handler);
    };
  }, [handler]);

  console.log(`🖼️ render App`);

  return (
    <div>
      <h1>last key: '{lastKey}'</h1>
    </div>
  );
}

render(<App />, document.querySelector("div#app") as Element);
