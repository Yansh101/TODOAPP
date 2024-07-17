import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  console.log(`[+] Todos`, todos);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/gettodo");
      console.log({ response });
      if (response.data.success) {
        setTodos(response.data.todos);
      } else {
        console.error("Error fetching todos:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const addTodo = async () => {
    try {
      const newTodo = { title, description };
      if (!title || !description) throw new Error("All fields required");
      await axios.post("http://localhost:3000/createtodo", newTodo);
      fetchTodos();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding todo", error);
      return alert(error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deletetodo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="todo-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos?.map((todo) => (
          <li key={todo._id}>
            <h2>{todo.title}</h2>
            <p className="text align: left">{todo.description}</p>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
