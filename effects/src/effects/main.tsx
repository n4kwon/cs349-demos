import { render } from "preact";
import { A } from "./A";

import "./style.css";

console.log(`🔥 main`);

function App() {
  console.log(`🖼️ render App`);

  return <A />;
}

render(<App />, document.querySelector("div#app") as Element);
