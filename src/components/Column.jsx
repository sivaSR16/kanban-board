import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const statusColors = {
  Backlog: 'bg-gray-100',
  Doing: 'bg-blue-100',
  Review: 'bg-yellow-100',
  Done: 'bg-green-100',
};

const Column = ({ status, tasks }) => (
  <Droppable droppableId={status} isDropDisabled={false}>
    {provided => (
      <div
        className={`p-4 rounded shadow ${statusColors[status]}`}
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        <h2 className="text-xl font-bold mb-2">{status}</h2>
        {tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} />
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default Column;
