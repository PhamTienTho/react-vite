const TodoData = (props) => {
    // props là 1 biến object


    const {name , age, data, todoList} = props; // sử dụng destructuring object

    console.log(">>> check props: ", props);
    return (
        <div className="todo-data">
            <div>My name is {name}</div>
            <div>Learning React</div>
            <div>Watching Youtube</div>
            <div>
                {JSON.stringify(props.todoList)}
            </div>
        </div>
    )
}

export default TodoData;