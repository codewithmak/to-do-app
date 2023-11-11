// Inside TodoWrapper.js

import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [hasCompletedTasks, setHasCompletedTasks] = useState(false); // Add this state

  const addTodo = (todo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const updateCompletedTasks = (id, completed) => {
    setCompletedTodos((prevCompletedTodos) => {
      if (completed) {
        if (prevCompletedTodos.find((todo) => todo.id === id)) {
          return prevCompletedTodos;
        }
        return [...prevCompletedTodos, todos.find((todo) => todo.id === id)];
      } else {
        return prevCompletedTodos.filter((todo) => todo.id !== id);
      }
    });
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      const completedTodo = updatedTodos.find((todo) => todo.id === id);
      updateCompletedTasks(id, completedTodo.completed);

      // Check if there are completed tasks
      const hasCompleted = updatedTodos.some((todo) => todo.completed);
      setHasCompletedTasks(hasCompleted);

      return updatedTodos.filter((todo) => !todo.completed);
    });
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Godspeed</h1>
      <TodoForm addTodo={addTodo} showCompleted={showCompleted} toggleCompleted={setShowCompleted} />

      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={() => toggleComplete(todo.id)}
          />
        )
      )}

      {hasCompletedTasks && (
        <div className="completed-tasks-toggle-btn" onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? 'Hide Completed Tasks' : 'Completed Tasks'}
        </div>
      )}

      {showCompleted &&
        completedTodos.map((todo) => (
          <div key={todo.id} className="Todo">
            <span className="completed">{todo.task}</span>
            {/* No icons for completed tasks */}
          </div>
        ))}
    </div>
  );
};
