import React,{ useState,useEffect } from 'react';
import './App.css';
//importing components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  
  //state stuff
  const [inputText,setInputText]=useState("");
  const [todos,setTodos]=useState([]);
  const [status,setStatus]=useState('all');
  const [filteredTodos,setFileredTodos]=useState([]);

  //run once when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);

  //USE EFFECT
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos,status]);
  //functions stuff
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFileredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFileredTodos(todos.filter(todo => todo.completed === false));
        break;  
      default:
        setFileredTodos(todos);
        break;      
    }
  };
  //Save local 
  const saveLocalTodos = () => {
      localStorage.setItem('todos',JSON.stringify([]));
  };
  const getLocalTodos = () =>{
    if(localStorage.getItem('todos')===null){
      localStorage.setItem('todos',JSON.stringify([]));
    }else{
     let todoLocal= localStorage.getItem("todos",JSON.stringify(todos));
     console.log(todoLocal);
    }
  };
  return (
    <div className="App">
      <header>
        <h4>What's the Plan for TODAY?</h4>
      </header>
      <Form 
          todos={todos} 
          setTodos={setTodos} 
          setInputText={setInputText} 
          inputText={inputText}
          setStatus={setStatus}
              
      />
      <TodoList setTodos={setTodos} 
                todos={ todos }
                filteredTodos={filteredTodos} 
     />
    </div>
  );
}

export default App;
