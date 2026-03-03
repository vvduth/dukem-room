import React from "react";
import { useLocation } from "react-router";

const VisualizerId = () => {
  const location = useLocation();
  const { initialImage, name } = location.state || {};
  console.log("VisualizerId received state:", location.state);
  return (
    <section>
      <h1>{name || "Untitled project"}</h1>
      <div className="visualizer">
        {initialImage ? (
          <div className="image-container">
            <h2>Source image</h2>
            <img src={initialImage} alt={name || "Untitled project"} />
          </div>
        ) : (
          <p>No image provided</p>
        )}
      </div>
    </section>
  );
};

export default VisualizerId;
