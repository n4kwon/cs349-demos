type RightViewProps = {
  count: number;
  colour?: string;
};

export default function RightView({ count, colour = "grey" }: RightViewProps) {
  return (
    <div class="right-view">
      {[...Array(count)].map((_, i) => (
        <NumberBox num={i + 1} colour={colour} />
      ))}
    </div>
  );
}

/**
 *  A component for the box with a number in it.
 */

type NumberBoxProps = {
  num: number;
  colour: string;
};

function NumberBox({ num, colour }: NumberBoxProps) {
  // note how style attribute is set
  return <div style={`backgroundColor: ${colour}`}>{num}</div>;
}
