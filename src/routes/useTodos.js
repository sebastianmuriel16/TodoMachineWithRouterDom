import React from "react";
import { useLocalStorage } from "./useLocalStorage";

function useTodos() {
  const {
    item: todos,
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V2 ", []);
  const [searchValue, setSearchValue] = React.useState("");
  // const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const addTodo = (text) => {
    const id = newTodoId();
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      id,
      text,
    });
    saveTodos(newTodos);
  };

  const completeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const editTodo = (id, newText) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex].text = newText;
    saveTodos(newTodos);
  };

  const getTodoById = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    return todo;
  };

  const deleteTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const state = {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    // openModal,
  };

  const stateUpdaters = {
    setSearchValue,
    addTodo,
    completeTodo,
    deleteTodo,
    // setOpenModal,
    sincronizeTodos,
    editTodo,
  };

  return { state, stateUpdaters, getTodoById };
}

function newTodoId() {
  return Date.now();
}

export { useTodos };
