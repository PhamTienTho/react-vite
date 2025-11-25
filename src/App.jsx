import './components/todo/todo.css';
import TodoData from './components/todo/TodoData';
import TodoNew from './components/todo/TodoNew';
import logoReact from './assets/react.svg';
import { useState } from 'react';
import Header from './components/layout/header';
import Footer from './components/layout/footer';



const App = () => {

  const [todoList, setTodoList] = useState([
  ])



  const addNewTodo = (name) => {
    const newToDo = {
      id: randomIntFromInterval(1, 1000000),
      name: name
    }
    setTodoList([...todoList, newToDo]);
  }

  const deleteTodo = (id) => {
    const newTodo = todoList.filter(item => item.id !== id);
    setTodoList(newTodo);
    console.log(">>> check", todoList);
  }

  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  return (
    <>
      <Header/>

      <div className="todo-container">
        <div className="todo-title">To do List</div>
        <TodoNew
          // truyền function trừ cha sang con 
          addNewTodo={addNewTodo}
        />
        {todoList.length > 0 ?
          <TodoData
            todoList={todoList}
            deleteTodo={deleteTodo}
          />
          :
          <div className='todo-image'>
            <img className='logo' src={logoReact} />
          </div>
        }
      </div>

      <Footer/>
    </>

  )
}

export default App