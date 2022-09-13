import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyles } from "@mui/material";

const container = document.getElementById("root");
const root = createRoot(container);

const globalStyles = {
  "*": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  },
  html: {
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    height: "100%",
    width: "100%",
  },
  body: {
    backgroundColor: "#f4f6f8",
    height: "100%",
    width: "100%",
  },
  a: {
    textDecoration: "none",
  },
  "#root": {
    height: "100%",
    width: "100%",
  },
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles styles={globalStyles} />
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
