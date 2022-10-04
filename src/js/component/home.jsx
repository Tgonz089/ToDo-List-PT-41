import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';

function Todo({ todo, index, remove }) {

	return (
	  <div className="todo">
		<span>{todo.text}</span> <Button className= "Button" onClick={() => remove(index)}>✕</Button>
	  </div>
	);
  };
  
  function FormTodo({add}) {

	const [value, setValue] = useState("");
  
	const submit = e => { e.preventDefault();
	  add(value);
	  setValue("");
	};
  
	return (
	  <Form onSubmit={submit}> 
		<Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="What needs to be done?"/>
	</Form>
	);
  };
  
  function TodoList() {

	const [todos, setTodos] = useState([{text: "No tasks, add a task"}]);
  
	const add = text => {
	  const newTodos = [...todos, { text }];
	  setTodos(newTodos);
	};
  
	const remove = index => {
	  const newTodos = [...todos];
		newTodos.splice(index, 1);
	  	setTodos(newTodos);
	};
  
	return (
		<>
		<h1 className="text-center mb-4">Todos</h1>
		<div className="container">
			<FormTodo add={add} />
			<div>
				{todos.map((todo, index) => (<Todo key={index} index={index} todo={todo} remove={remove} />))}
			</div>
		</div>
		</>
	);
  };

  export default TodoList;
