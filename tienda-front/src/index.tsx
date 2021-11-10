import { GlobalStyles, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import theme from "./config/theme";

const globalStyles = (
  <GlobalStyles
    styles={{
      "html, body": { margin: 0, padding: 0 },
      "html, body, #root": { height: "100%", width: "100%" },
    }}
  />
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {globalStyles}
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
