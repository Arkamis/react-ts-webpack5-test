import { Container } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ThemeConfig } from "theme";

function App() {
  const { t } = useTranslation();

  return (
    <ThemeConfig>
      <React.Suspense fallback="loading...">
        <Container fixed>
          <div>{t`appTitle`}</div>
        </Container>
      </React.Suspense>
    </ThemeConfig>
  );
}

export default App;
