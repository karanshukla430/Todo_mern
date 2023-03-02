import React, { useState } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <div className="input-group">
        <input
          type="text"
          placeholder="Update Task"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          version="secondary"
          className="btn btn-primary add-btn"
        >
          Update
        </button>
      </div>
    </form>
  );
};
