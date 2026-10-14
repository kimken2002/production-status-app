import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { AppDataProvider } from "./context/AppDataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppDataProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AppDataProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
