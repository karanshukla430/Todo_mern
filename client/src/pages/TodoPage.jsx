import React, { useState } from "react";
import { Todo } from "../components/Todo";
import { TodoForm } from "../components/TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "../components/EditTodoForm";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
uuidv4();

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
  const submitHandler = async () => {
    if (title !== "") {
      let data = [];
      for (let i = 0; i < todos.length; i++) {
        const formData = {
          task_id: todos[i].id,
          name: todos[i].task,
        };
        data.push(formData);
      }
      const final = {
        playlist_name: title,
        data: data,
      };
      const header = {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      };
      await axios.post("/api/v1/playlist/create-playlist", final, {
        headers: header,
      });
      navigate("/");
    } else {
      toast.error("Please Enter TaskList Title ");
    }
  };

  return (
    <div>
      <div
        className="input-group"
        style={{
          width: "40%",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Enter TaskList Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="TodoWrapper-container">
        <div className="TodoWrapper">
          <h1>Get Things Done!</h1>
          <TodoForm addTodo={addTodo} />
          {todos.map((todo, index) =>
            todo.isEditing ? (
              <EditTodoForm editTodo={editTask} task={todo} />
            ) : (
              <Todo
                key={index}
                task={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            )
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="submit"
          className="btn btn-primary save-btn"
          style={{ width: "20%", marginTop: "20px" }}
          onClick={submitHandler}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TodoPage;
