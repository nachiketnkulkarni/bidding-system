import { ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { Header } from "./Header";
import { theme } from "../../assets/styles/theme";
import { GlobalStyles } from "../../assets/styles/GlobalStyles";
import { Content, MainLayout } from "./styles";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header onMenuToggle={() => setIsSidebarExpanded(!isSidebarExpanded)} />
      <MainLayout>
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />
        <Content $isExpanded={isSidebarExpanded}>
          <Outlet />
        </Content>
      </MainLayout>
    </ThemeProvider>
  );
};

export default Layout;
