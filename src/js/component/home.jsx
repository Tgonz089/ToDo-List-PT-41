import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import FormTodo from "./formTodo.jsx";
import Todo from "./todo.jsx";

function TodoList() {
  const [todos, setTodos] = useState([{ text: "No tasks, add a task" }]);

  function getToDo() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/Tristan")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => getToDo(), []);

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

  const addTodo = (text) => {
    const newTodos = [...todos, { label: text, done: false }];
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
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
        </div>
      </div>
    </>
  );
}

(<FormTodo />), (<Todo />);

export default TodoList;
