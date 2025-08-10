import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskBoard from './components/TaskBoard';

const App = () => (
  <TaskProvider>
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center py-4">Kanban Board</h1>
      <TaskForm />
      <TaskBoard />
    </div>
  </TaskProvider>
);



export default App;
