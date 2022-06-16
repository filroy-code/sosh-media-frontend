import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes></AnimatedRoutes>
    </BrowserRouter>
  );
}

export default App;
