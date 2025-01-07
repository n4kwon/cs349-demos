import { useEffect, useState } from "preact/hooks";

type BProps = {
  colour?: string;
};

export function B({ colour = "" }: BProps) {
  // local state
  const [count, setCount] = useState(0);

  //#region useEffect demos

  useEffect(() => {
    console.log(`💥 mount ${count} ${colour} B`);
    return () => {
      console.log(`🧹 unmount ${count} ${colour} B`);
    };
  }, []);

  // useEffect(() => {
  //   console.log(`💥 new count=${count} ${colour} B`);
  //   return () => {
  //     console.log(`🧹 old count=${count} ${colour} B`);
  //   };
  // }, [count]);

  // useEffect(() => {
  //   console.log(`💥 render ${count} ${colour} B`);
  //   return () => {
  //     console.log(`🧹 render ${count} ${colour} B`);
  //   };
  // });

  //#endregion

  console.log(`🖼️ render ${colour} B`);

  return (
    <div class="counter" style={{ backgroundColor: colour }}>
      <div onClick={() => setCount(count + 1)}>B: {count}</div>
    </div>
  );
}
