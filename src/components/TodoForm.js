// TodoForm.js
import React, { useState } from 'react';

export const TodoForm = ({ addTodo, showCompleted, toggleCompleted }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!value.trim()) {
      // Display an error message or prevent submission
      return;
    }

    addTodo(value);

    // Clear input after adding todo
    setValue('');
  };

  return (
    <div>
      <form className="TodoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          value={value}
          placeholder="Enter a new task..."
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="todo-btn">
          Add Todo
        </button>
      </form>
      
    </div>
  );
};
