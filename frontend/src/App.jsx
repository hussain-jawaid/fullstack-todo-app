import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:8000/todos");
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    await fetch("http://localhost:8000/add-todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: input }),
    });
    setInput("");
    fetchTodos();
  };

  const deleteTodo = async (index) => {
    await fetch(`http://localhost:8000/todos/${index}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>To-Do App</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add task"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.task} <button onClick={() => deleteTodo(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
