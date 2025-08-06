import { useState } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks([...tasks, task]);
    setTask('');
  };

  const deleteTask = (taskToDelete) => {
    const newTasks = tasks.filter(t => t !== taskToDelete);
    setTasks(newTasks);
  };

  return (
    <div>
      <h2>لیست فعالیت‌ها</h2>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="یک فعالیت جدید وارد کنید"/>
      <button onClick={addTask}>افزودن</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(task)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
