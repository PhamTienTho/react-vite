import './components/todo/todo.css';
import TodoData from './components/todo/TodoData';
import TodoNew from './components/todo/TodoNew';
import logoReact from './assets/react.svg';


const myName = "thodz";
const age = 21;
const myData = {
  country: "Viet Nam",
  address: "Ha Noi"
}

const App = () => {
  return (
    <div className="todo-container">
      <div className="todo-title">To do List</div>
      <TodoNew />
      <TodoData 
        name = {myName}
        age = {age}
        data = {myData}
      />
      <div className='todo-image'>
        <img className='logo' src={logoReact}/>
      </div>
    </div>
  )
}

export default App