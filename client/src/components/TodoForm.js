import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <div className="input-group">
        <input
          type="text"
          placeholder="Write your review"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          version="secondary"
          className="btn btn-primary add-btn"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};
