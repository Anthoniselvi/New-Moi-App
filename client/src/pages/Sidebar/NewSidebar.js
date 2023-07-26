import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles"; // Step 1: Import useTheme
import { ImCross } from "react-icons/im";
import { RiMenu2Line } from "react-icons/ri";
import { useMediaQuery } from "@mui/material";

const drawerWidth = 240;

function NewSidebar(props) {
  const { window } = props;
  const isMobile = useMediaQuery("(max-width:1000px)");

  // Use the useTheme hook to determine if the viewport is in mobile view
  const theme = useTheme();
  const isMobileView = theme.breakpoints.down("sm");

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    console.log("Menu icon clicked");
    setMobileOpen(!mobileOpen);
  };

  const handleOutsideClick = (event) => {
    if (isMobileView && mobileOpen) {
      const drawerElement = document.querySelector(".MuiDrawer-root");
      const menuIconElement = document.querySelector(
        ".MuiIconButton-edgeStart"
      );

      if (
        drawerElement &&
        !drawerElement.contains(event.target) &&
        menuIconElement &&
        !menuIconElement.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    }
  };

  React.useEffect(() => {
    // Add event listener to the document to handle clicks outside the drawer in mobile view
    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMobileView, mobileOpen]);

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      {isMobile ? (
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            zIndex: 7000,
            background: "#fff",
            color: "#101a34",
          }}
        >
          <Toolbar>
            <Box
              sx={{
                borderRight: "1px solid #cad3dd",
                minHeight: "56px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  display: { sm: "none" },
                }}
              >
                {mobileOpen ? (
                  <ImCross style={{ fontSize: "25px" }} />
                ) : (
                  <RiMenu2Line style={{ fontSize: "25px" }} />
                )}
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{ textAlign: "center" }}
              >
                MOI APP
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      ) : (
        <></>
      )}
      <Divider style={{ borderBottom: "1px solid #e8ecf1" }} />
      <List>
        {["Dashboard", "Events", "Profile"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Logout"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isMobile ? (
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            zIndex: 7000,
            background: "#fff",
            color: "#101a34",
          }}
        >
          <Toolbar>
            <Box
              sx={{
                borderRight: "1px solid #cad3dd",
                minHeight: "56px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  display: { sm: "none" },
                }}
              >
                {!isMobileView && mobileOpen ? (
                  <ImCross style={{ fontSize: "25px" }} />
                ) : (
                  <RiMenu2Line style={{ fontSize: "25px" }} />
                )}
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{ textAlign: "center" }}
              >
                MOI APP
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      ) : (
        <></>
      )}
      <Box
        // component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant={isMobileView ? "temporary" : "permanent"} // Use "temporary" for mobile view and "permanent" for other views
          open={isMobileView ? mobileOpen : true} // Use the isMobileView and mobileOpen state to manage the Drawer open state
          onClose={() => setMobileOpen(false)} // Close the Drawer when clicking outside in mobile view
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // Hide the drawer in non-mobile views
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              paddingTop: "15%",
              boxSizing: "border-box",
              width: "drawerWidth",
              background: "#fff",
              color: "#101a34",
            },
            "& .MuiTypography-root": {
              fontSize: 13,
            },
            "& .MuiListItem-root": {
              fontSize: 13,
              color: "#101a34",
              fontWeight: 500,
              lineHeight: 18,
            },
            "& .MuiSvgIcon-root": {
              fontSize: 13,
              color: "#101a34",
              fontWeight: 500,
              lineHeight: 18,
            },
            "& .MuiListItemButton-root:hover": {
              color: "#50bcd9",
              background: "#f5f7fa",
            },
            "& .MuiSvgIcon-root:hover": {
              color: "#50bcd9",
              background: "#f5f7fa",
            },
            "& .MuiListItemButton-root.active": {
              color: "#50bcd9",
              background: "#f5f7fa",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            // Show the drawer in non-mobile views
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "50%",
              background: "#fff",
              color: "#101a34",
              fontSize: 20,
            },
            "& .MuiTypography-root": {
              fontSize: 13,
            },
            "& .MuiListItem-root": {
              fontSize: 13,
              color: "#101a34",
              fontWeight: 500,
              lineHeight: 18,
            },
            "& .MuiSvgIcon-root": {
              fontSize: 13,
              color: "#101a34",
              fontWeight: 500,
              lineHeight: 18,
            },
            "& .MuiListItemButton-root:hover": {
              color: "#50bcd9",
              background: "#f5f7fa",
            },
            "& .MuiSvgIcon-root:hover": {
              color: "#50bcd9",
              background: "#f5f7fa",
            },
            "& .MuiListItemButton-root.active": {
              color: "#50bcd9",
              background: "#f5f7fa",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

NewSidebar.propTypes = {
  window: PropTypes.func,
};

export default NewSidebar;
