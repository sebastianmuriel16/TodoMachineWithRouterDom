import React from "react";
import { TodoForm } from "../../ui/TodoForm";

function NewTodoPage() {
  return (
    <TodoForm
      label="Crea tu nuevo TODO"
      submitText="Añadir TODO"
      submitEvent={() => console.log("Add Todo")}
    />
  );
}

export { NewTodoPage };
