import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

const defaultColumns = {
  Backlog: [],
  Doing: [],
  Review: [],
  Done: [],
};

export const TaskProvider = ({ children }) => {
  const [columns, setColumns] = useState(defaultColumns);

  // 🔄 Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem('kanbanTasks');
    if (saved) {
      setColumns(JSON.parse(saved));
    }
  }, []);

  // 💾 Save to localStorage whenever columns change
  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(columns));
  }, [columns]);

  // ➕ Add a new task (supports full structure)
  const addTask = (task) => {
    const {
      title = '',
      description = '',
      tags = [],
      priority = '',
      status = 'Backlog',
    } = task;

    const newTask = {
      id: uuidv4(),
      title,
      description,
      tags,
      priority,
      status,
    };

    setColumns(prev => ({
      ...prev,
      [status]: [...(prev[status] || []), newTask],
    }));
  };

  // 🔄 Move task between columns
  const moveTask = (source, destination) => {
    const sourceItems = Array.from(columns[source.droppableId]);
    const [moved] = sourceItems.splice(source.index, 1);
    moved.status = destination.droppableId;
    const destItems = Array.from(columns[destination.droppableId]);
    destItems.splice(destination.index, 0, moved);

    setColumns(prev => ({
      ...prev,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destItems,
    }));
  };

  // ✏️ Edit task title/description/tags/priority
  const editTask = (columnId, taskId, updatedTask) => {
    setColumns(prev => {
      const updatedColumn = prev[columnId].map(task =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      );
      return { ...prev, [columnId]: updatedColumn };
    });
  };

  // ❌ Delete task
  const deleteTask = (taskId) => {
    setColumns(prev => {
      const newColumns = {};
      for (const column in prev) {
        newColumns[column] = prev[column].filter(task => task.id !== taskId);
      }
      return newColumns;
    });
  };

  return (
    <TaskContext.Provider value={{ columns, addTask, moveTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
