import React from "react";
import ReactDOM from "react-dom";
import App from "../components/app";
import { AuthProvider } from "../components/pages/auth_pages/auth_context";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);