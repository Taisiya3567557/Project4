import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [shapes, setShapes] = useState([
    { id: 1, shape: "circle", x: 50, y: 50, color: "red" },
    { id: 2, shape: "square", x: 150, y: 150, color: "blue" },
    { id: 3, shape: "triangle", x: 250, y: 250, color: "green" },
    { id: 4, shape: "circle", x: 350, y: 350, color: "yellow" },
    { id: 5, shape: "square", x: 450, y: 450, color: "purple" },
    { id: 6, shape: "triangle", x: 550, y: 550, color: "orange" },
  ]);

  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, shape) => {
    setDragging(shape);
    setOffset({
      x: e.clientX - shape.x,
      y: e.clientY - shape.y
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const newShapes = shapes.map((shape) =>
        shape.id === dragging.id
          ? { ...shape, x: e.clientX - offset.x, y: e.clientY - offset.y }
          : shape
      );
      setShapes(newShapes);
    }
  };

  const handleMouseUp = () => {
    if (dragging) {
      // Слияние (merge) логика: если две фигуры перекрываются
      const newShapes = [...shapes];
      const draggedShape = dragging;

      newShapes.forEach((shape) => {
        if (shape.id !== draggedShape.id) {
          const distance = Math.sqrt(
            Math.pow(shape.x - draggedShape.x, 2) +
              Math.pow(shape.y - draggedShape.y, 2)
          );

          if (distance < 50) {
            // Логика слияния в новые фигуры
            let mergedShape;
            if (draggedShape.shape === shape.shape) {
              switch (draggedShape.shape) {
                case "circle":
                  mergedShape = {
                    id: new Date().getTime(),
                    shape: "oval",
                    x: (shape.x + draggedShape.x) / 2,
                    y: (shape.y + draggedShape.y) / 2,
                    color: "purple"
                  };
                  break;
                case "square":
                  mergedShape = {
                    id: new Date().getTime(),
                    shape: "rectangle",
                    x: (shape.x + draggedShape.x) / 2,
                    y: (shape.y + draggedShape.y) / 2,
                    color: "orange"
                  };
                  break;
                case "triangle":
                  // Два треугольника сливаются в ромб
                  mergedShape = {
                    id: new Date().getTime(),
                    shape: "diamond",
                    x: (shape.x + draggedShape.x) / 2,
                    y: (shape.y + draggedShape.y) / 2,
                    color: "cyan"
                  };
                  break;
                default:
                  break;
              }
            } else {
              // Логика для смешанных фигур
              if (
                (draggedShape.shape === "circle" && shape.shape === "square") ||
                (draggedShape.shape === "square" && shape.shape === "circle")
              ) {
                mergedShape = {
                  id: new Date().getTime(),
                  shape: "oval",
                  x: (shape.x + draggedShape.x) / 2,
                  y: (shape.y + draggedShape.y) / 2,
                  color: "brown"
                };
              }
              if (
                (draggedShape.shape === "circle" && shape.shape === "triangle") ||
                (draggedShape.shape === "triangle" && shape.shape === "circle")
              ) {
                mergedShape = {
                  id: new Date().getTime(),
                  shape: "diamond",
                  x: (shape.x + draggedShape.x) / 2,
                  y: (shape.y + draggedShape.y) / 2,
                  color: "pink"
                };
              }
              if (
                (draggedShape.shape === "square" && shape.shape === "triangle") ||
                (draggedShape.shape === "triangle" && shape.shape === "square")
              ) {
                mergedShape = {
                  id: new Date().getTime(),
                  shape: "rectangle",
                  x: (shape.x + draggedShape.x) / 2,
                  y: (shape.y + draggedShape.y) / 2,
                  color: "yellow"
                };
              }
            }

            setShapes((prevShapes) =>
              prevShapes.filter(
                (s) => s.id !== draggedShape.id && s.id !== shape.id
              ).concat(mergedShape)
            );
          }
        }
      });

      setDragging(null);
    }
  };

  const renderShape = (shape) => {
    const commonStyles = {
      position: "absolute",
      top: `${shape.y}px`,
      left: `${shape.x}px`,
      cursor: "pointer"
    };

    switch (shape.shape) {
      case "circle":
        return (
          <div
            key={shape.id}
            className="shape"
            style={{
              ...commonStyles,
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: shape.color
            }}
            onMouseDown={(e) => handleMouseDown(e, shape)}
          ></div>
        );
      case "square":
        return (
          <div
            key={shape.id}
            className="shape"
            style={{
              ...commonStyles,
              width: "50px",
              height: "50px",
              backgroundColor: shape.color
            }}
            onMouseDown={(e) => handleMouseDown(e, shape)}
          ></div>
        );
      case "triangle":
        return (
          <div
            key={shape.id}
            className="shape"
            style={{
              ...commonStyles,
              width: "0",
              height: "0",
              borderLeft: "25px solid transparent",
              borderRight: "25px solid transparent",
              borderBottom: "50px solid " + shape.color
            }}
            onMouseDown={(e) => handleMouseDown(e, shape)}
          ></div>
        );
      case "oval":
        return (
          <div
            key={shape.id}
            className="shape"
            style={{
              ...commonStyles,
              width: "80px",
              height: "50px",
              borderRadius: "40px",
              backgroundColor: shape.color
            }}
          ></div>
        );
      case "rectangle":
        return (
          <div
            key={shape.id}
            className="shape"
            style={{
              ...commonStyles,
              width: "80px",
              height: "50px",
              backgroundColor: shape.color
            }}
          ></div>
        );
      case "diamond":
        return (
          <div
            key={shape.id}
            className="shape"
            style={{
              ...commonStyles,
              width: "0",
              height: "0",
              borderLeft: "25px solid transparent",
              borderRight: "25px solid transparent",
              borderTop: "50px solid " + shape.color,
              transform: "rotate(45deg)",
            }}
          ></div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="game-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    >
      {shapes.map(renderShape)}
    </div>
  );
};

export default App;

