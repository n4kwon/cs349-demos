import { render } from "preact";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "preact/hooks";

import LeftView from "./Left";
import RightView from "./Right";

import "./style.css";

console.log("counter");

// function useCounter() {
//   const [value, setValue] = useState(0);
//   const increment = useCallback(() => {
//     setValue(value + 1);
//   }, [value]);
//   return { value, increment };
// }

export default function App() {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   console.log("useEffect called because count changed");
  // }, [count]);

  // event handler to pass to component

  function handleClick() {
    console.log("click");
    // update state
    setCount(count + 1);
  }

  return (
    <>
      <LeftView count={count} handleClick={handleClick} />
      <RightView count={count} colour="pink" />
    </>
  );
}

render(<App />, document.querySelector("div#app") as Element);

//#region later demo for controlled input

// add this to the main render
/*
<InputTest
value={count.toString()}
onInput={(v) => setCount(v)}
/>
*/

type InputTestProps = {
  value: string;
  onInput: (value: number) => void;
};

function isNumber(value: string): boolean {
  return !isNaN(Number(value));
}

function InputTest({ value, onInput }: InputTestProps) {
  const [value2, setValue2] = useState(value.toString());

  useEffect(() => {
    console.log(Number.parseInt(value2), value2);
    if (isNumber(value2)) {
      setValue2(value);
    }
  }, [value]);

  function handle(e: Event) {
    const v = (e.target as HTMLInputElement).value;

    setValue2(v);

    if (isNumber(v)) {
      onInput(Number.parseInt(v));
    }
  }

  return <input value={value2} onInput={handle} />;
}

//#endregion
