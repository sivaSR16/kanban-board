import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTasks } from '../context/TaskContext';

const TaskCard = ({ task, index }) => {
  const { editTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    editTask(task.status, task.id, { title, description });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <div
          className="bg-white p-3 mb-2 rounded shadow transition-transform hover:scale-[1.02]"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <div className="space-y-2">
              <input
                className="border p-2 w-full rounded"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                className="border p-2 w-full rounded"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <div className="flex justify-between items-center mt-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="text-red-500 hover:text-red-700 font-bold px-2"
                  onClick={handleDelete}
                  title="Delete Task"
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div onDoubleClick={() => setIsEditing(true)} className="flex-1">
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>

                {/* 🏷️ Tags & Priority */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {task.tags?.map(tag => (
                    <span key={tag} className="text-xs bg-teal-200 text-teal-800 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                  {task.priority && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'High' ? 'bg-red-200 text-red-800' :
                      task.priority === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-400 italic mt-1">Double-click to edit</p>
              </div>
              <button
                className="text-red-500 hover:text-red-700 font-bold ml-2"
                onClick={handleDelete}
                title="Delete Task"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
