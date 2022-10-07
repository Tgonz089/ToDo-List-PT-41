import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

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

  export default FormTodo;