import React, { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Добавление задачи
  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  // Удаление задачи по индексу
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>ToDo List</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Введите задачу"
      />
      <button onClick={addTask}>Добавить</button>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {t} <button onClick={() => deleteTask(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;