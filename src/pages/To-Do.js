import React, { useState } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";

function TodoForm({ addTask }) {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      setError("Task is required");
      return;
    }
    addTask(task.trim());
    setTask("");
    setError("");
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group controlId="todoInput">
        <Form.Control
          type="text"
          placeholder="Enter a new task"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            if (e.target.value.trim() !== "") setError("");
          }}
          isInvalid={!!error}
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="mt-2" disabled={!task.trim()}>
        Add Task
      </Button>
    </Form>
  );
}

function TodoItem({ task, toggleDone, deleteTask }) {
  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-center"
    >
      <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
        {task.text}
      </span>
      <div>
        <Button
          variant={task.done ? "success" : "outline-success"}
          size="sm"
          onClick={() => toggleDone(task.id)}
          className="me-2"
        >
          {task.done ? "Undo" : "Done"}
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
}

function TodoList({ tasks, toggleDone, deleteTask }) {
  if (tasks.length === 0) return <p>No tasks yet.</p>;

  return (
    <ListGroup>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          toggleDone={toggleDone}
          deleteTask={deleteTask}
        />
      ))}
    </ListGroup>
  );
}

function TodoPage() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, done: false };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="mb-4">To-Do App!</h3>
          <TodoForm addTask={addTask} />
          <TodoList tasks={tasks} toggleDone={toggleDone} deleteTask={deleteTask} />
        </Col>
      </Row>
    </Container>
  );
}

export default TodoPage;
