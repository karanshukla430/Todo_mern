import React, { useState, useEffect } from "react";
import { Todo } from "../components/Todo";
import { TodoForm } from "../components/TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "../components/EditTodoForm";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
uuidv4();

const ExistingPlayList = () => {
  const params = useParams();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [mainId, setMainId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const formData = {
          playlist_id: params.playlistId,
        };
        const data1 = await axios.post(
          "/api/v1/playlist/playlist-data-public",
          formData
        );

        setTitle(data1.data.data.playlist_name);
        const d = data1.data.data.task;
        setMainId(data1.data.data._id);
        let newTask = [];
        for (let i = 0; i < d.length; i++) {
          let k = {
            completed: false,
            id: d[i].task_id,
            isEditing: false,
            task: d[i].name,
          };
          newTask.push(k);
        }

        setTodos(newTask);
      } catch (err) {
        toast.error("Something Went Wrong");
      }
      //   setLoading(false);
    };
    getData();
  }, [params.playlistId]);
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
        main_id: mainId,
      };
      const header = {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      };
      await axios.post("/api/v1/playlist/update-playlist", final, {
        headers: header,
      });
      navigate("/");
      console.log(todos);
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

export default ExistingPlayList;
