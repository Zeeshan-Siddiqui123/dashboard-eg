import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import {HeroUIProvider} from "@heroui/react";


ReactDOM.createRoot(document.getElementById("root")).render(
  <HeroUIProvider>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </HeroUIProvider>
);
