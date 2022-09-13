import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/system";

import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import VideocamIcon from "@mui/icons-material/Videocam";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SortIcon from "@mui/icons-material/Sort";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

import { Avatar, Link, Toolbar, Typography } from "@mui/material";

import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const items = [
  {
    href: "/admin/dashboard",
    icon: <DashboardIcon />,
    title: "Dashboard",
  },
  {
    href: "/admin/universities",
    icon: <SchoolIcon />,
    title: "Universities",
  },
  {
    href: "/admin/colleges",
    icon: <ClassIcon />,
    title: "Colleges",
  },

  {
    href: "/admin/years",
    icon: <SortIcon />,
    title: "Years",
  },
  {
    href: "/admin/streams",
    icon: <MenuBookIcon />,
    title: "Streams",
  },
  {
    href: "/admin/courses",
    icon: <AssignmentIcon />,
    title: "Courses",
  },
  {
    href: "/admin/users",
    icon: <PeopleIcon />,
    title: "Users",
  },

  {
    href: "/admin/notifications",
    icon: <NotificationsActiveIcon/>,
    title: "Notifications",
  },
  {
    href: "/admin/banners",
    icon: <ViewCarouselIcon />,
    title: "Banners",
  },
  {
    href: "/admin/categories",
    icon: <CategoryIcon />,
    title: "Categories",
  },
  {
    href: "/admin/videos",
    icon: <VideocamIcon />,
    title: "Videos",
  },
  {
    href: "/admin/blog",
    icon: <StickyNote2Icon />,
    title: "Blog",
  },
];

const NavBar = ({ mobileOpen, handleDrawerToggle, drawerWidth }) => {
  const userData = useSelector((state) => state.user);
  const location = useLocation()  

  const user = {
    avatar: "/static/images/avatars/avatar_6.png",
    name: userData.user.full_name,
  };
  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <Toolbar>
        <Box alignItems="center" display="flex">
          <Avatar component={RouterLink} src={user.avatar} to="/app/account" />
          <Typography color="textPrimary" variant="h5" ml={1}>
            {user.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.jobTitle}
          </Typography>
        </Box>
      </Toolbar>

      <Divider />
      <List>
        {items.map((item, index) => (
          <Link
            key={item.title}
            component={RouterLink}
            to={item.href}
            underline="none"
            color="inherit"
          >
            <ListItem selected={item.href === location.pathname} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon }</ListItemIcon>
                <ListItemText primary={item.title}     primaryTypographyProps={item.href === location.pathname?{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }: {}}/>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Box
        component="nav"
        aria-label="navigation bar"
        sx={{ width: { md: drawerWidth } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
};

export default NavBar;
