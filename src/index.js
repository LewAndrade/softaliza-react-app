import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { EventContextProvider } from "./context/event-context";
import App from "./App";
import "fomantic-ui-css/semantic.min.css";
import "./index.css";

ReactDOM.render(
  <EventContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </EventContextProvider>,
  document.getElementById("root")
);
