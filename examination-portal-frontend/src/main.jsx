import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";

// Start the React application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter enables page navigation */}
    <BrowserRouter>

      {/* AuthProvider makes login information available everywhere */}
      <AuthProvider>
        <App />
      </AuthProvider>

    </BrowserRouter>
  </StrictMode>
);