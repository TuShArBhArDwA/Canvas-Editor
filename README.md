# Simple 2D Canvas Editor

This is a lightweight, web-based 2D canvas editor built with React, Fabric.js, and Firebase Firestore. It allows users to create a canvas, add and manipulate shapes and text, and save their work to the cloud.

### Features

- **Home Page**: A simple landing page to create new canvas instances.
- **Unique URLs**: Each canvas gets a unique, shareable URL.
- **Shape Tools**: Add rectangles, circles, and text.
- **Pen Tool**: Free-form drawing capabilities.
- **Object Manipulation**: Move, resize, rotate, and delete objects on the canvas.
- **Property Editing**: Change the color of shapes and edit text content.
- **Cloud Persistence**: Canvases are saved to and loaded from Firebase Firestore.
- **Responsive Canvas**: The canvas area adjusts to the window size.

### Tech Stack

- **Frontend**: React (with Vite)
- **Canvas Library**: Fabric.js
- **Backend/Database**: Firebase Firestore
- **Routing**: React Router

### Getting Started

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/YOUR_USERNAME/simple-canvas-editor.git
    cd simple-canvas-editor
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Firebase:**
    - Create a new project at [firebase.google.com](https://firebase.google.com/).
    - Add a new Web App to your project.
    - Copy the `firebaseConfig` object.
    - In the project, create a file `src/firebase.js` and paste your configuration. (Or better yet, use a `.env.local` file for security).

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Design Choices & Special Mentions

- **User Experience**: I focused on a simple and intuitive toolbar. I also added a keyboard shortcut (Delete/Backspace) to remove selected objects, which is a common and expected feature in editors.
- **State Management**: React's `useState` and `useRef` were sufficient for managing component-level state and the Fabric.js instance, avoiding the complexity of a larger state management library.
- **Persistence**: Saving the canvas state as a single JSON string in Firestore is efficient and simple. For more complex applications, one might consider a more granular schema, but this approach is perfect for this scope.
