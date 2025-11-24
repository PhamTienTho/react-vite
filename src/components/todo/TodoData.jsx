const TodoData = (props) => {
    // props là 1 biến object
    const { todoList, deleteTodo } = props; // sử dụng destructuring object

    const handleOnClick = (id) => {
        deleteTodo(id);
    }

    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className={`todo-item`} key={item.id}>
                        <div>{item.name}</div>
                        <button style={{ cursor: "pointer" }} onClick={() => handleOnClick(item.id)}>Delete</button>
                    </div>
                )
            })}

        </div>
    )
}

export default TodoData;