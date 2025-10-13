import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as fabricNamespace from "fabric";
const fabric = fabricNamespace.fabric || fabricNamespace;
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function CanvasEditor() {
  const { canvasId } = useParams();
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [isLoading, setIsLoading] = useState(true);
  const [canvasData, setCanvasData] = useState(null);

  useEffect(() => {
    const loadCanvasData = async () => {
      setIsLoading(true);
      const docRef = doc(db, "canvases", canvasId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.canvasJSON) {
          setCanvasData(data.canvasJSON);
        }
      }
      setIsLoading(false);
    };
    loadCanvasData();
  }, [canvasId]);

  useEffect(() => {
    if (isLoading) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth * 0.9,
      height: window.innerHeight * 0.8,
      backgroundColor: "#f0f0f0",
    });
    fabricRef.current = canvas;

    if (canvasData) {
      canvas.loadFromJSON(canvasData, () => {
        setTimeout(() => {
          canvas.renderAll();
        }, 0);
      });
    }

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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (canvas) canvas.dispose();
    };
  }, [isLoading, canvasData]);

  const addRect = () => {
    if (!fabricRef.current) return;
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: color,
      width: 100,
      height: 100,
    });
    fabricRef.current.add(rect);
    fabricRef.current.renderAll();
  };

  const addCircle = () => {
    if (!fabricRef.current) return;
    const circle = new fabric.Circle({
      left: 150,
      top: 150,
      fill: color,
      radius: 50,
    });
    fabricRef.current.add(circle);
    fabricRef.current.renderAll();
  };

  const addText = () => {
    if (!fabricRef.current) return;
    const text = new fabric.Textbox("Edit me", {
      left: 200,
      top: 200,
      fill: color,
      fontSize: 20,
      width: 150,
    });
    fabricRef.current.add(text);
    fabricRef.current.renderAll();
  };

  const toggleDrawing = () => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;
    const newMode = !canvas.isDrawingMode;
    canvas.isDrawingMode = newMode;

    if (newMode) {
      if (!canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      }
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = 3;
    }

    setIsDrawing(newMode);
  };

  const handleColorChange = (e) => {
    if (!fabricRef.current) return;
    const newColor = e.target.value;
    setColor(newColor);

    const canvas = fabricRef.current;
    const activeObjects = canvas.getActiveObjects();

    if (activeObjects.length > 0) {
      activeObjects.forEach((obj) => obj.set("fill", newColor));
      canvas.renderAll();
    }

    if (canvas.isDrawingMode && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = newColor;
    }
  };

  const saveCanvas = async () => {
    if (!fabricRef.current) return;
    try {
      const canvasJSON = fabricRef.current.toJSON();
      await setDoc(
        doc(db, "canvases", canvasId),
        { canvasJSON: JSON.stringify(canvasJSON) },
        { merge: true }
      );
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
