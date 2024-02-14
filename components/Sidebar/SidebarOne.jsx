"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

import { useRouter } from "next/navigation";
import { HomeRepairServiceRounded } from "@mui/icons-material";

const SidebarOne = () => {
  const router = useRouter();

  const logout = () => {
    sessionStorage.removeItem("token");
    // setBearer("");
    router.push("/login");
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 20,
          paddingBottom: 10,
        }}
      >
        <Link href="/">
          <Image src="/logo_blue.png" width={185} height={73} alt="Portfolio" />
        </Link>
      </div>
      <List>
        {["Home", "User List", "Task List", "Kanban Board"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  if (text === "Home") {
                    router.push("/");
                  } else if (text === "Task List") {
                    router.push("/tasklist");
                  } else if (text === "User List") {
                    router.push("/userlist");
                  } else if (text === "Kanban Board") {
                    router.push("/board");
                  }
                }}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <HomeIcon fontSize="large" />
                  ) : index === 1 ? (
                    <MailIcon />
                  ) : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {["Logout"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={logout}>
              {" "}
              {/* Add this */}
              <ListItemIcon>
                {index === 0 ? <InboxIcon /> : <HomeIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default SidebarOne;
