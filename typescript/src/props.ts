// props example

// the props object type
type ShapeProps = {
  colour?: string;
  size?: number;
};

// a props object
const props: ShapeProps = { size: 10 };

const { colour = "blue", size } = props;
console.log(`Shape: ${colour}, ${size}`);

function test({ colour, size = 10 }: ShapeProps) {
  console.log(colour, size);
}

// 1. destructure props

// 2. make all properties in props object optional,
//    leave one property out when creating prop object

// 3. set default values when destructuring props object

// 4. create a function that takes props object as argument,
//    try different combinations including {}

// 5. try calling function with no arguments, what happens? how to fix?
