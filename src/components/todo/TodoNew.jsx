

const TodoNew = (props) => {
  const { addNewTodo } = props;
  // addNewTodo("tientho");

  const handleOnClick = () => {
    alert("click me");
  }

  const handleOnChange = (name) => {
    console.log(">>> handleOnChange", name)
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
    </div>
  )
}

export default TodoNew;