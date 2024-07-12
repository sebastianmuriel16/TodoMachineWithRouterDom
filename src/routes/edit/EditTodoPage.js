import React from "react";
import { TodoForm } from "../../ui/TodoForm";
import { useTodos } from "../useTodos";
import { useParams, useLocation } from "react-router-dom";

function EditTodoPage() {
  const { stateUpdaters, getTodoById, state } = useTodos();
  const { editTodo } = stateUpdaters;
  const { loading } = state;
  const params = useParams();
  const location = useLocation();
  const id = Number(params.id);
  let todoText;

  if (location.state?.todo) {
    todoText = location.state.todo.text;
  } else if (loading) {
    return <h1>Cargando...</h1>;
  } else {
    const todo = getTodoById(id);
    todoText = todo.text;
  }

  return (
    <TodoForm
      label="Edita tu TODO"
      submitText="Editar TODO"
      defaultTodoText={todoText}
      submitEvent={(newText) => editTodo(id, newText)}
    />
  );
}

export { EditTodoPage };
