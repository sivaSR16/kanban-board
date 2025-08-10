import React, { useState } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { useTasks } from '../context/TaskContext';

const TaskBoard = () => {
  const { columns, moveTask, addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('Backlog');

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!source || !destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    moveTask(source, destination);
  };

  const handleAddTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      priority,
      status,
    };

    addTask(newTask);
    setTitle('');
    setDescription('');
    setTags('');
    setPriority('');
    setStatus('Backlog');
  };

  const columnColors = {
    Backlog: 'bg-white',
    Doing: 'bg-blue-100',
    Review: 'bg-yellow-100',
    Done: 'bg-green-100',
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-teal-900 min-h-screen flex flex-col items-center p-6 gap-6">
        
        {/* 🧾 Task Creation Form */}
        <div className="w-full max-w-screen-xl p-4 bg-teal-800 rounded shadow flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="p-2 rounded bg-white text-black flex-1 min-w-[150px]"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="p-2 rounded bg-white text-black flex-1 min-w-[150px]"
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={e => setTags(e.target.value)}
            className="p-2 rounded bg-white text-black flex-1 min-w-[150px]"
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="p-2 rounded bg-white text-black min-w-[120px]"
          >
            <option value="">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="p-2 rounded bg-white text-black min-w-[120px]"
          >
            <option value="Backlog">Backlog</option>
            <option value="Doing">Doing</option>
            <option value="Review">Review</option>
            <option value="Done">Done</option>
          </select>
          <button
            onClick={handleAddTask}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        {/* 📦 Columns */}
        <div className="flex w-full max-w-screen-xl gap-1">
          {Object.keys(columns).map(status => (
            <div
              key={status}
              className={`flex-1 rounded p-4 ${columnColors[status]} flex flex-col gap-3 max-h-[80vh] overflow-y-auto`}
            >
              <Column status={status} tasks={columns[status]} />
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
