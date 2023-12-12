import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import  useHttp  from './hooks/use-http';

 function App() {
  const [tasks, setTasks] = useState([]);
  // ! adding alias name to sendRequest using ':' followed by alias name
  const { isLoading, error, sendRequest: fetchTasks } =  useHttp();
  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };

    const configuration  = {
      url: 'https://udemy-react-1332f-default-rtdb.firebaseio.com/tasks.json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }; 
    fetchTasks(
      configuration,
      transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
