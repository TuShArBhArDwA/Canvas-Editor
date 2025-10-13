# Simple 2D Canvas Editor


<img width="1898" height="971" alt="image" src="https://github.com/user-attachments/assets/dae6adf2-d8b7-4731-b513-918376a66708" />
A lightweight, real-time 2D canvas editor built with React, Fabric.js, and Firebase Firestore.

**[➡️ Live Demo Link](https://simple-canvas-editor.vercel.app)**

---
Project Video - Coming Soon...

---

### Core Features

- **Dynamic Canvas Creation**: Instantly generate a new canvas with a unique, shareable URL.
- **Rich Editing Tools**: Add, move, resize, rotate, and delete rectangles, circles, and text.
- **Free-form Drawing**: A Pen tool for creative freedom.
- **Property Editor**: Intuitively change object colors or edit text content on the fly.
- **Real-time Cloud Persistence**: Canvases are saved instantly to Firebase Firestore and reloaded on page refresh.
- **Secure Configuration**: API keys are kept secure using environment variables.
- **Modern UI/UX**: A clean, responsive, and user-friendly interface.

---

### Tech Stack

- **Frontend**: React (with Vite)
- **Canvas Library**: Fabric.js
- **Backend & Database**: Firebase Firestore
- **Routing**: React Router
- **Deployment**: Vercel


---

### Getting Started

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/TuShArBhArDwA/simple-canvas-editor.git
    cd simple-canvas-editor
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    - Create a `.env` file in the root of the project.
    - Add your Firebase configuration keys, prefixed with `VITE_`:
      ```
      VITE_FIREBASE_API_KEY="YOUR_KEY"
      VITE_FIREBASE_AUTH_DOMAIN="YOUR_DOMAIN"
      # ...and so on for all your keys
      ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

---

### Special Mentions & Design Choices

This project was a fantastic exercise in integrating a stateful, non-React library (Fabric.js) into a modern React application. Here are a few thoughtful decisions I made:

-   **User-First Ideology**: I added keyboard shortcuts (Delete/Backspace) for a more intuitive editing experience. The Pen tool's color and width are also configured automatically for a smoother workflow, addressing potential user confusion.
-   **Clean Component Architecture**: The application is structured logically with separate components for the `HomePage` and `CanvasEditor`, managed by React Router. State is handled with React's native hooks (`useState`, `useEffect`, `useRef`) to keep the architecture simple and extensible without over-engineering.
-   **Solving Complex Lifecycle Bugs**: Integrating Fabric.js with React 18's Strict Mode presented challenges with component mounting and race conditions. I implemented a robust two-`useEffect` pattern and a `setTimeout`/`calcOffset` strategy to ensure the canvas initializes reliably, its event listeners are always active, and data loads without visual glitches. This was a key technical hurdle that I'm proud to have solved.
-   **Deployment-Ready**: The project uses environment variables for security and includes a `vercel.json` (or equivalent) to handle SPA routing, ensuring that direct navigation to a canvas URL works perfectly in a production environment.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request


---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact
- **Meet T-Bot** - [Discover My Work](https://t-bot-blush.vercel.app/)
- **Tushar Bhardwaj** - [Portfolio](https://tushar-bhardwaj.vercel.app/)
- **Connect 1:1** - [Topmate](https://topmate.io/tusharbhardwaj)
- **GitHub:** [TuShArBhArDwA](https://github.com/TuShArBhArDwA)
- **LinkedIn:** [Tushar Bhardwaj](https://www.linkedin.com/in/bhardwajtushar2004/)
- **Email:** [tusharbhardwaj2617@example.com](mailto:tusharbhardwaj2617@example.com)
