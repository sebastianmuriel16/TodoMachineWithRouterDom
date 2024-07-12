import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../routes/home/HomePage";
import { NewTodoPage } from "../routes/new/NewTodoPage";
import { EditTodoPage } from "../routes/edit/EditTodoPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewTodoPage />} />
        <Route path="/edit/:id" element={<EditTodoPage />} />
        <Route path="*" element={<h1>Not found: error 404</h1>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
