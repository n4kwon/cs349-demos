import { useEffect, useState } from "preact/hooks";
import { B } from "./B";

export function A() {
  // local state
  const [count, setCount] = useState(0);

  //#region useEffect demos

  // useEffect(() => {
  //   console.log(`💥 useEffect A`);
  // });

  // Demos
  // 1. dependency array, e.g. nothing, [], [count]
  // 2. return a cleanup function

  //#endregion

  console.log(`🖼️ render A`);

  return (
    <div class="counter">
      <div onClick={() => setCount(count + 1)}>A: {count}</div>
      <div class="children">
        <B colour="pink"></B>
        <B colour="lightgreen"></B>
      </div>
    </div>
  );
}
