import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as fabric from "fabric";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function CanvasEditor() {
  const { canvasId } = useParams();
  const canvasRef = useRef(null); // For the <canvas> element
  const fabricRef = useRef(null); // For the fabric.Canvas instance
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [isLoading, setIsLoading] = useState(true);

  // Initialize canvas
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth * 0.9,
      height: window.innerHeight * 0.8,
      backgroundColor: "#f0f0f0",
    });
    fabricRef.current = canvas;

    // Load existing canvas from Firestore
    const loadCanvas = async () => {
      const docRef = doc(db, "canvases", canvasId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.canvasJSON) {
          canvas.loadFromJSON(JSON.parse(data.canvasJSON), () => {
            canvas.renderAll();
          });
        }
      } else {
        console.log("No such document!");
      }
      setIsLoading(false);
    };

    loadCanvas();

    // Event listener for deleting objects with 'Delete' or 'Backspace' key
    const handleKeyDown = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length > 0) {
          activeObjects.forEach((obj) => canvas.remove(obj));
          canvas.discardActiveObject().renderAll();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      canvas.dispose();
    };
  }, [canvasId]);

  // Handlers for adding shapes
  const addRect = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: color,
      width: 100,
      height: 100,
    });
    fabricRef.current.add(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 150,
      top: 150,
      fill: color,
      radius: 50,
    });
    fabricRef.current.add(circle);
  };

  const addText = () => {
    const text = new fabric.Textbox("Edit me", {
      left: 200,
      top: 200,
      fill: color,
      fontSize: 20,
    });
    fabricRef.current.add(text);
  };

  // Pen tool toggle
  const toggleDrawing = () => {
    fabricRef.current.isDrawingMode = !fabricRef.current.isDrawingMode;
    setIsDrawing(!isDrawing);
  };

  // Handle color change for selected object
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      activeObject.set("fill", newColor);
      fabricRef.current.renderAll();
    }
    // Also update drawing brush color
    fabricRef.current.freeDrawingBrush.color = newColor;
  };

  // Save canvas to Firestore
  const saveCanvas = async () => {
    try {
      const json = fabricRef.current.toJSON();
      await setDoc(
        doc(db, "canvases", canvasId),
        {
          canvasJSON: JSON.stringify(json),
        },
        { merge: true }
      ); // Use merge to not overwrite other fields like createdAt
      alert("Canvas saved successfully!");
    } catch (error) {
      console.error("Error saving canvas: ", error);
      alert("Failed to save canvas.");
    }
  };

  if (isLoading) {
    return <div className="loading-container">Loading Canvas...</div>;
  }

  return (
    <div className="canvas-editor-container">
      <header className="toolbar-header">
        <div className="tool-group">
          <h2 className="app-title">Editor</h2>
          <button onClick={addRect}>Rectangle</button>
          <button onClick={addCircle}>Circle</button>
          <button onClick={addText}>Text</button>
          <button onClick={toggleDrawing} className={isDrawing ? "active" : ""}>
            {isDrawing ? "Exit Pen" : "Pen Tool"}
          </button>
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            title="Select color"
          />
        </div>
        <div className="tool-group">
          <button onClick={saveCanvas} className="save-btn">
            Save Canvas
          </button>
        </div>
      </header>

      <main className="canvas-main">
        <canvas ref={canvasRef} />
      </main>
    </div>
  );
}

export default CanvasEditor;
