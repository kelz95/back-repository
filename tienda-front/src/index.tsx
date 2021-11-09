import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import theme from "./config/theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
