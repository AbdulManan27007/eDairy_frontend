import React, { useContext, useState } from "react";
import { Popover, IconButton, Badge } from "@mui/material";
import { NotificationsOutlined } from "@mui/icons-material";
import eDairyContext from "../../context/eDairyContext";

export const PopoverContainer = ({ buttonIcon, popoverContent }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const context = useContext(eDairyContext);
  const { firstRender, setFirstRender } = context;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "custom-popover" : undefined;

  return (
    <>
      {React.isValidElement(buttonIcon) &&
      buttonIcon.type === NotificationsOutlined &&
      firstRender ? (
        <IconButton size="large" color="primary" onClick={handleOpen}>
          <Badge badgeContent={1} color="primary">
            {buttonIcon}
          </Badge>
        </IconButton>
      ) : (
        <IconButton size="large" color="primary" onClick={handleOpen}>
          {buttonIcon}
        </IconButton>
      )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {popoverContent}
      </Popover>
    </>
  );
};
