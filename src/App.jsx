import React from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskBoard from "./components/TaskBoard";
import TaskForm from './components/TaskForm.jsx';


function App() {
  return (
    <TaskProvider>
      <TaskBoard />
    </TaskProvider>
  );
}

export default App;
