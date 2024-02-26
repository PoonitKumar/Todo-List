// App.jsx

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [editId, setEditId] = useState(null);

  const addTask = () => {
    if (editId) {
      setTaskList(taskList.map((todo) => (todo.id === editId ? { ...todo, text: task } : todo)));
      setEditId(null);
    } else if (task !== '') {
      setTaskList([...taskList, { id: Date.now(), text: task }]);
      setTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTaskList(taskList.filter((todo) => todo.id !== taskId));
  };

  const updateTask = (taskId) => {
    setEditId(taskId);
    setTask(taskList.find((todo) => todo.id === taskId).text);
  };

  useEffect(() => {
    console.log(task, taskList.map((todo) => todo.text));
  }, [taskList]);

  return (
    <div className="container">
      <h1 className="header">Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Enter task here"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="action-button" onClick={addTask}>
          {editId === null ? 'Add Task' : 'Update Task'}
        </button>
      </div>
      <div className="task-list">
        {taskList.map((work) => (
          <div key={work.id} className="task-item">
            <div className="task-text">{work.text}</div>
            <div className="task-actions">
              <button className="action-button-small" onClick={() => deleteTask(work.id)}>
                Delete
              </button>
              <button className="action-button-small" onClick={() => updateTask(work.id)}>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
