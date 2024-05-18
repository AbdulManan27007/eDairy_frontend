import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import {
  AppBar as MuiAppBar,
  Box,
  Divider,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Badge,
} from "@mui/material";
import {
  AccountCircleOutlined,
  ChatOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Menu,
  NotificationsOutlined,
} from "@mui/icons-material";

import {
  selectMobView,
  toggleLgView,
  toggleMobView,
} from "../../Features/ToggleSideBar/ToggleSidebarSlice";
import { selectTheme, toggleTheme } from "../../Features/Theme/themeSlice";
import { Searchbar } from "../Searchbar";
import { drawerWidth, fullDrawerWidth } from "./DrawerWidth";
import { PopoverContainer } from "./PopoverContainer";
import { UserProfile } from "./UserProfile";
import { Notifications } from "./Notifications";
import { Messages } from "./Messages";
import eDairyContext from "../../context/eDairyContext";
import { useNavigate } from "react-router-dom";

const MenuIcon = ({ onClick }) => (
  <Hidden smUp>
    <IconButton
      size="large"
      edge="start"
      color="primary"
      aria-label="open drawer"
      sx={{ mr: 2 }}
      onClick={onClick}
    >
      <Menu />
    </IconButton>
  </Hidden>
);

const ThemeToggle = ({ darkMode, onToggle }) => (
  <IconButton size="large" edge="start" color="primary" onClick={onToggle}>
    {darkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
  </IconButton>
);

// For Toggling Drawer left and right
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "openWide",
})(({ theme, open, openWide }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up("sm")]: {
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  backgroundColor: theme.palette.background.default,
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(openWide && {
    marginLeft: `${fullDrawerWidth}px !important`,
    width: `calc(100% - ${fullDrawerWidth}px) !important`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const NavBar = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectMobView);
  const darkMode = useSelector(selectTheme);
  const navigate = useNavigate();

  const context = useContext(eDairyContext);
  const { user, setUser, dialogs, chosenDialog, firstRender, setFirstRender } =
    context;

  const [unreadCount, setUnreadCount] = useState(null);

  useEffect(() => {
    if (dialogs && dialogs?.length) {
      const unreadMessagesCount = dialogs?.reduce((total, dialog) => {
        return total + dialog?.unread_messages_count;
      }, 0);

      setUnreadCount(unreadMessagesCount);
    }
  }, [chosenDialog]);

  const handleDrawer = useCallback(() => {
    dispatch(toggleMobView());
    dispatch(toggleLgView());
  }, [dispatch]);

  const handleThemeToggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <AppBar position="fixed" color="inherit" elevation={0} open={open}>
      <Toolbar>
        <MenuIcon onClick={handleDrawer} />
        <Box sx={{ flexGrow: 1 }} />

        <Hidden smDown>
          <Searchbar />
        </Hidden>

        <Box sx={{ flexGrow: 1 }} />

        <ThemeToggle darkMode={darkMode} onToggle={handleThemeToggle} />

        {/* <PopoverContainer
          buttonIcon={<ChatOutlined />}
          popoverContent={<Messages />}
        /> */}

        <IconButton
          size="large"
          color="primary"
          onClick={() => navigate(`/dashboard/${user.role}/chat`)}
        >
          {unreadCount ? (
            <Badge badgeContent={unreadCount} color="primary">
              <ChatOutlined />
            </Badge>
          ) : (
            <ChatOutlined />
          )}
        </IconButton>

        <PopoverContainer
          buttonIcon={<NotificationsOutlined />}
          popoverContent={<Notifications />}
        />

        <Divider orientation="vertical" variant="middle" flexItem />

        <Hidden lgDown>
          <Typography
            sx={{ color: "primary", marginLeft: "20px", lineHeight: "21px" }}
          >
            {user.name}
          </Typography>
        </Hidden>

        <PopoverContainer
          buttonIcon={
            <AccountCircleOutlined
              sx={{
                width: 32,
                height: 32,
                color: "inherit",
                backgroundColor: "inherit",
              }}
            />
          }
          popoverContent={<UserProfile user={user} />}
        />
      </Toolbar>
    </AppBar>
  );
};
