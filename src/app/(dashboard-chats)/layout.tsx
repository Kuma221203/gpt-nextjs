"use client"
import { Main, NavigationDashboardLayout, SidebarDashboardLayout } from "@/components/cpn_dashboard";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import logout from "../auth/logout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  return (
    <Box sx={{ display: 'flex', minHeight: "100vh" }}>
      <NavigationDashboardLayout open={open} handleDrawerOpen={handleDrawerOpen} logout={logout} />
      <SidebarDashboardLayout open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        {children}
      </Main>
    </Box>
  );
}