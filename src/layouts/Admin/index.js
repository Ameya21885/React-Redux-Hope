import Box from "@mui/material/Box";


import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import TopBar from "./TopBar";

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerWidth = 240;

  return (
    <Box>
      <TopBar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth}/>

      <Box
        sx={{
          display: "flex",
        }}
      >
        <NavBar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${drawerWidth}px)` }
          }}
          py={2}
        >
          <Toolbar />
          <Outlet/>
        </Box>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
