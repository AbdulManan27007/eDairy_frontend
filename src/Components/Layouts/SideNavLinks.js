import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as icons from "@mui/icons-material";
import { useTheme } from "@emotion/react";

import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
} from "@mui/material";
import styled from "@emotion/styled";

import NavbarLinks from "../../Data/Sidebar.json";
import {
  selectCurrentClassId,
  selectCurrentRole,
} from "../../Features/Auth/AuthSlice";
import { selectMobView } from "../../Features/ToggleSideBar/ToggleSidebarSlice";
import eDairyContext from "../../context/eDairyContext";

export const SideNavLinks = () => {
  const mobScreenView = useSelector(selectMobView);
  const theme = useTheme();

  const context = useContext(eDairyContext);
  const { user } = context;

  const StyledListItemButton = styled(ListItemButton)(({ focused }) => ({
    flexDirection: mobScreenView ? "column" : "row",
    justifyContent: mobScreenView ? "center" : "initial",
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor:
        theme.palette.mode === "light" ? theme.palette.primary[50] : "#00386F",
    },
    "&:focus": {
      borderRight: `3px solid ${theme.palette.primary[500]}`,
      backgroundColor:
        theme.palette.mode === "light" ? theme.palette.primary[50] : "#00386F",
      color: theme.palette.primary.main,
      outline: "none",
    },
    "&:active": {
      borderRight: `3px solid ${theme.palette.primary[500]}`,
      backgroundColor:
        theme.palette.mode === "light" ? theme.palette.primary[50] : "#00386F",
      color: theme.palette.primary.main,
    },
    ...(focused && {
      borderRight: `3px solid ${theme.palette.primary[500]}`,
      backgroundColor:
        theme.palette.mode === "light" ? theme.palette.primary[50] : "#00386F",
      color: theme.palette.primary.main,
    }),
  }));

  const StyledListItemIcon = styled(ListItemIcon)(() => ({
    justifyContent: mobScreenView ? "center" : "initial",
    color: theme.palette.primary[500],
  }));

  const [focusedItem, setFocusedItem] = useState(null);

  const handleItemClick = (item) => {
    setFocusedItem(item);
  };
  const NavLinks = NavbarLinks.filter(
    (userItem) => userItem.type === `${user?.role}`
  );

  return (
    <>
      {NavLinks.map((data) =>
        data.content.map((item) => (
          <div key={item.division}>
            <List
              key={item.division}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{
                    backgroundColor: "inherit",
                    color: theme.palette.text.disabled,
                  }}
                >
                  {item.division}
                </ListSubheader>
              }
            >
              {item.section.map((navLinks) => {
                const Icon = icons[navLinks.icon];
                const to = navLinks.to;
                const isFocused = focusedItem === navLinks.title;
                return (
                  <StyledListItemButton
                    key={navLinks.title}
                    variant="sidenav"
                    component={Link}
                    focused={isFocused}
                    to={to}
                    onClick={() => handleItemClick(navLinks.title)}
                  >
                    <StyledListItemIcon>
                      {<Icon sx={{ fontSize: "1.3rem" }}>{navLinks.icon}</Icon>}
                    </StyledListItemIcon>
                    <ListItemText
                      primary={navLinks.title}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: "medium",
                        lineHeight: "20px",
                        mb: "2px",
                      }}
                    />
                  </StyledListItemButton>
                );
              })}
            </List>
            <Divider variant="middle" />
          </div>
        ))
      )}
    </>
  );
};
