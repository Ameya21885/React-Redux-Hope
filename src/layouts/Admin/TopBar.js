import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InputIcon from "@mui/icons-material/Input";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
import { useState } from "react";
import { Badge } from "@mui/material";


const TopBar = ({ handleDrawerToggle, drawerWidth }) => {
  const [notifications] = useState([]);

  const dispatch = useDispatch();
  return (
    <div>
      <AppBar elevation={0}  sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}>
        <Toolbar>

          <Box  flexGrow={1}>
          <Link to="/">
            <Box component="img" alt="Logo" src="/240_50.png" width={'12em'} mt={1}/>
          </Link>
          </Box>


          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={() => dispatch(logout())} color="inherit">
            <InputIcon />
          </IconButton>
        </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
