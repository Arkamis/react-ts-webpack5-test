import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { ThemeConfig } from "theme";

import App from "./App";
import i18n from "./i18n/config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeConfig>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ThemeConfig>
  </React.StrictMode>
);
