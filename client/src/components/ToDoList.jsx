// ToDoList.jsx
import React, { useState, useEffect } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const containerStyle = {
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
  };

  const headerStyle = {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
    textAlign: "center",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    width: "calc(100% - 110px)",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginRight: "10px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  };

  const listStyle = {
    listStyle: "none",
    padding: "0",
    margin: "0",
  };

  const listItemStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "4px",
    marginBottom: "5px",
  };

  const removeButtonStyle = {
    padding: "5px 10px",
    fontSize: "14px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#dc3545",
    color: "#fff",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        padding: "20px",
        width: "900px",
        marginTop: "20px",
        padding: "20px",
        margin: "0 auto",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        className="text-center"
        style={{
          fontSize: "30px",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        Keep Track: Your Property Management ToDo List
      </h2>
      <div style={{ margin: "50px" }}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
          style={{
            padding: "10px",
            borderRadius: "5px",
            marginRight: "10px",
            border: "1px solid #ddd",
            width: "calc(100% - 130px)",
            marginBottom: "30px",
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: "10px 15px",
            borderRadius: "5px",
            backgroundColor: "#29b6f6",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            width: "120px",
          }}
        >
          Add Task
        </button>
        <ul sstyle={{ listStyleType: "none", paddingLeft: "0" }}>
          {tasks.map((task, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                backgroundColor: task.completed ? "#d4edda" : "#f8d7da",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                width: "auto",
              }}
            >
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => handleToggleTask(index)}
              >
                {task.text}
              </span>
              {task}
              <button
                onClick={() => handleRemoveTask(index)}
                style={{
                  backgroundColor: "#e3342f",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
