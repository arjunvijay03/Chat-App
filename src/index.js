import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { firebaseContext, AuthContextProvider } from "./Contexts/Contexts";
import firebase from "./Config/Firebase";
import { ChatContextProvider } from "./Contexts/ChatContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <firebaseContext.Provider value={{ firebase }}>
        <AuthContextProvider>
      <ChatContextProvider>
          <App />
      </ChatContextProvider>
        </AuthContextProvider>
    </firebaseContext.Provider>
  </React.StrictMode>
);
