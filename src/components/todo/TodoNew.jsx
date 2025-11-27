import { useState } from "react";

const TodoNew = (props) => {

  // useState hook
  const [valueInput, setValueInput] = useState("tho")

  const { addNewTodo } = props;

  const handleOnClick = () => {
    addNewTodo(valueInput);
    setValueInput("");  // sau khi ấn click thì giá trị ô input được reset
  }

  const handleOnChange = (name) => {
    setValueInput(name);
  }

  return (
    <div className="todo-new">
      <input type="text"
        onChange={(event) => handleOnChange(event.target.value)}
        value={valueInput} // dùng để kiểm soát giá trị trong ô input
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