const TodoData = (props) => {
    // props là 1 biến object
    const { todoList } = props; // sử dụng destructuring object

    console.log(">>> check props: ", todoList);
    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item">
                        <div>{item.name}</div>
                        <button>Delete</button>
                    </div>
                )
            })}

            <div>
                {JSON.stringify(props.todoList)}
            </div>
        </div>
    )
}

export default TodoData;