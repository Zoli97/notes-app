import React, { useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import NoteDetail from "./pages/NoteDetail";
import CreateNote from "./pages/CreateNote";
import toast from "react-hot-toast";

//dynamic route for detail
const App = () => {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
};

export default App;
