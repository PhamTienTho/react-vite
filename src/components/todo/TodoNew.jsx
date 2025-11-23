import { useState } from "react";


const TodoNew = (props) => {

  // useState hook
  const [valueInput, setValueInput] = useState("tho")

  const { addNewTodo } = props;
  // addNewTodo("tientho");

  const handleOnClick = () => {
    console.log(">>> check valueInput: ", valueInput)
  }

  const handleOnChange = (name) => {
    setValueInput(name);
  }

  return (
    <div className="todo-new">
      <input type="text"
        onChange={(event) => handleOnChange(event.target.value)}
      ></input>
      <button
        style={{ cursor: "pointer" }}
        onClick={handleOnClick}
      >Add</button>
      <div>
        My text input is: {valueInput}
      </div>
    </div>
  )
}

export default TodoNew;