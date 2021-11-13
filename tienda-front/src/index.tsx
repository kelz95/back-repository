import { GlobalStyles, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import theme from "./config/theme";
import "./translations/i18n";

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
    <SnackbarProvider anchorOrigin={{ vertical: "bottom", horizontal: "center" }} maxSnack={3}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </SnackbarProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
