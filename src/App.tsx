import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SetTimer } from "./page/SetTimer";

function App() {
  return (
    <div className="h-screen w-screen bg-sky-50">
      <SetTimer />
    </div>
  );
}

export default App;
