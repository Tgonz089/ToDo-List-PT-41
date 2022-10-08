import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import FormTodo from "./formTodo.jsx";
import Todo from "./todo.jsx";

function Home() {
  const [todos, setTodos] = useState([{ text: "No tasks, add a task" }]);

  function getToDo() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/Tristan")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  }

  function putToDo() {
    if (todos != []) {
      fetch("https://assets.breatheco.de/apis/fake/todos/user/Tristan", {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => getToDo(), []);

  useEffect(() => putToDo(), [todos]);

  const addTodo = (text) => {
    const newTodos = [...todos, { label: text, done: false }];
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const deleteAllTodos = (todos) => {
    const newTodos = [...todos];
    newTodos.splice(0, newTodos.length);
    const spliceList = [
      ...newTodos,
      { label: "No tasks, add a task", done: false },
    ];
    setTodos(spliceList);
  };

  return (
    <>
      <h1 className="text-center mb-4">Todos</h1>
      <div className="container">
        <FormTodo add={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Todo key={index} index={index} todo={todo} remove={removeTodo} />
          ))}
          <div>
            <button className="dltButton" onClick={() => deleteAllTodos(todos)}>
              Delete All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

(<FormTodo />), (<Todo />);

export default Home;
