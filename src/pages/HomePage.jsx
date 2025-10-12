import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function HomePage() {
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const createNewCanvas = async () => {
    setIsCreating(true);
    try {
      // Create a new document in the "canvases" collection
      const docRef = await addDoc(collection(db, "canvases"), {
        // We save the canvas data as a stringified JSON
        canvasJSON: "{}",
        createdAt: new Date(),
      });
      // Navigate to the new canvas editor page
      navigate(`/canvas/${docRef.id}`);
    } catch (error) {
      console.error("Error creating new canvas: ", error);
      alert("Failed to create a new canvas. Please try again.");
      setIsCreating(false);
    }
  };

  return (
    <div className="home-container">
      <h1>Simple 2D Canvas Editor</h1>
      <p>A lightweight, web-based editor to create and share simple designs.</p>
      <button onClick={createNewCanvas} disabled={isCreating}>
        {isCreating ? "Creating..." : "Create a New Canvas"}
      </button>
    </div>
  );
}

export default HomePage;
