import React from "react";

const TodoList = ({ todos }) => {
  if (todos.length === 0) {
    return <p>No todos available.</p>;
  }

  return (
    <div>
      <h2>Your Todos</h2>
      <ul style={{ textAlign: "left" }}>
        {todos.map((todo) => (
          <li key={todo._id}>
            <strong>{todo.title}</strong> - {todo.completed ? "Completed" : "Not Completed"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
