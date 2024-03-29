import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Play from "./pages/Play";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home exact />} exact />
        <Route path="/play" element={<Play exact />} exact />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
