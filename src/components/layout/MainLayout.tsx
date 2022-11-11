import { experimentalStyled } from "@mui/material";
import React from "react";

import MainNavbar from "./MainNavbar";

const MainLayoutRoot = experimentalStyled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const MainLayoutWrapper = experimentalStyled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: 64,
});

const MainLayoutContainer = experimentalStyled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const MainLayoutContent = experimentalStyled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
});

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MainLayoutRoot>
    <MainNavbar />
    <MainLayoutWrapper>
      <MainLayoutContainer>
        <MainLayoutContent>{children}</MainLayoutContent>
      </MainLayoutContainer>
    </MainLayoutWrapper>
  </MainLayoutRoot>
);

export default MainLayout;
