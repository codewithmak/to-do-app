// Inside Todo.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  const renderIcons = () => {
    if (task.completed) {
      return null; // Return null for completed tasks, no icons
    }

    return (
      <>
        <FontAwesomeIcon
          className="complete-icon"
          icon={faCheck}
          onClick={() => toggleComplete(task.id)}
        />
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
        />
      </>
    );
  };

  return (
    <div className={`Todo ${task.completed ? 'completed' : 'incompleted'}`}>
      <span
        onClick={() => !task.completed && toggleComplete(task.id)}
      >
        {task.task}
      </span>
      <div className="icons">{renderIcons()}</div>
    </div>
  );
};
