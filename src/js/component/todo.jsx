import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";


function Todo({ todo, index, remove }) {
    return (
      <div className="todo">
        <span>{todo.label}</span>{" "}
        <Button className="Button" onClick={() => remove(index)}>
          ✕
        </Button>
      </div>
    );
  }

  export default Todo;