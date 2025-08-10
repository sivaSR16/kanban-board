import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { nanoid } from 'nanoid';

const AddTask = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('Backlog');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: nanoid(),
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      priority,
      status,
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setTags('');
    setPriority('');
    setStatus('Backlog');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4 space-y-2">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="Backlog">Backlog</option>
        <option value="Doing">Doing</option>
        <option value="Review">Review</option>
        <option value="Done">Done</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
