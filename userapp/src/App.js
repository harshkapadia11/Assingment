import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import "./UI/DisplayUsers";
import Register from "./Components/Register";
import DisplayUser from "./UI/DisplayUsers";
import Edituser from "./Components/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/display" element={<DisplayUser />} />
        <Route path="/edit" element={<Edituser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
