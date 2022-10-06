import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

/*function GetList(){
	
	const requestOptions = {
	method: 'GET',
	redirect: 'follow'
  };
  
  fetch("http://assets.breatheco.de/apis/fake/todos/user/Tristan", requestOptions)
	.then(response => response.json())
	.then(result => console.log(result))
	.catch(error => console.log('error', error));
}

function PutList(){
	fetch('http://assets.breatheco.de/apis/fake/todos/user/Tristan', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //here is were your code should start after the fetch finishes

        console.log(data); //this will print on the console the exact object received from the server
    })
    .catch(error => {
        //error handling
        console.log(error);
    });
}*/

function TodoList() {
  const [todos, setTodos] = useState([{ text: "No tasks, add a task" }]);

  useEffect(
    () =>
      fetch("https://assets.breatheco.de/apis/fake/todos/user/Tristan")
        .then((response) => response.json())
        .then((data) => setTodos(data))
        .catch((error) => console.log(error)),
    []
  );

  useEffect(() => {
    if (todos != []) {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/Tristan", {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          console.log(resp.ok);
          console.log(resp.status);
          console.log(resp.text());
          return resp.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [todos]);

  const add = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const remove = (index) => {
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
          {todos.map((todo, index) => (
            <Todo key={index} index={index} todo={todo} remove={remove} />
          ))}
        </div>
      </div>
    </>
  );
}

function FormTodo({ add }) {
  const [value, setValue] = useState("");

  const submit = (event) => {
    event.preventDefault();
    add(value);
    setValue("");
  };

  return (
    <Form onSubmit={submit}>
      <Form.Control
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs to be done?"
      />
    </Form>
  );
}

function Todo({ todo, index, remove }) {
  return (
    <div className="todo">
      <span>{todo.text}</span>{" "}
      <Button className="Button" onClick={() => remove(index)}>
        ✕
      </Button>
    </div>
  );
}

export default TodoList;
