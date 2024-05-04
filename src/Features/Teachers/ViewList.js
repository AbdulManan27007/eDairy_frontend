import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

export default function ViewList({ title, data, Icon }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {Icon == "class" ? (
            <ImageIcon />
          ) : Icon == "section" ? (
            <WorkIcon />
          ) : (
            <BeachAccessIcon />
          )}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={data} />
    </ListItem>
  );
}
