import Form from "./Form";
import List from "./List";
import Info from "./Info";

import "./App.css";

// common approach is to import all state functions and properties like this
import * as State from "../state";

export default function App() {
  // figure out if we are editing a todo or not
  const editId = State.selectedTodoId.value;
  const initialValue = editId
    ? State.getTodo(editId)?.task || ""
    : "";

  return (
    <>
      <div id="left">
        <Form editId={editId} initialValue={initialValue} />
        <List />
      </div>
      <Info />
    </>
  );
}
