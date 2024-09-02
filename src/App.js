import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleAddTask = () => {
    if (task.trim() !== '' && timestamp.trim() !== '') {
      const newTask = {
        text: task,
        timestamp: new Date(timestamp),
        completed: false
      };
      const newTasks = [...tasks, newTask].sort((a, b) => a.timestamp - b.timestamp);
      setTasks(newTasks);
      setTask('');
      setTimestamp('');
    }
  };

  const handleToggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const areAllTasksCompleted = tasks.length > 0 && tasks.every(task => task.completed);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <input
          type="datetime-local"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="task-table">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className={task.completed ? 'completed' : ''}>
                <td onClick={() => handleToggleComplete(index)}>{task.text}</td>
                <td>{task.timestamp.toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDeleteTask(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {areAllTasksCompleted && (
        <div className="completion-message">
          <h2>You made it happen!</h2>
          <p>All tasks are completed. Great job!</p>
        </div>
      )}
    </div>
  );
}

export default App;
