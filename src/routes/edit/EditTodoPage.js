import React from "react";
import { TodoForm } from "../../ui/TodoForm";

function EditTodoPage() {
  return (
    <TodoForm
      label="Edita tu TODO"
      submitText="Editar TODO"
      submitEvent={() => console.log("Edit Todo")}
    />
  );
}

export { EditTodoPage };
