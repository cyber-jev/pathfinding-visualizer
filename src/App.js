import React from "react";
import "./App.css";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";
import homeImg from "./assets/wallpaper-light.png";

function App() {
  return (
    <div className="App">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${homeImg})` }}
      ></div>
      <div className="content">
        <PathfindingVisualizer />
      </div>
    </div>
  );
}

export default App;
