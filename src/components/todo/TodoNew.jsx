

const TodoNew = (props) => {
  const {addNewTodo} = props;
  addNewTodo("tientho");

    return (
        <div className="todo-new">
        <input type="text"></input>
        <button>Add</button>
      </div>
    )
}

export default TodoNew;