import React, { useEffect, useState } from 'react';
import useHttp from './hooks/use-http';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const configuration  = {
    url: 'https://udemy-react-1332f-default-rtdb.firebaseio.com/tasks.json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const [tasks, setTasks] = useState([]);

  const transformTasks = (tasksObj) => {
    const loadedTasks = [];
    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }
  // ! adding alias name to sendRequest using ':' followed by alias name
  const { isLoading, error, sendRequest: fetchTasks } = useHttp(configuration, transformTasks);
  // const { isLoading, error, sendRequest } = httpData;

  useEffect(() => {
    // fetchTasks();
  }, []);

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
