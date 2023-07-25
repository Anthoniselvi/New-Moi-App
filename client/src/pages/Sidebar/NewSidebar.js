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

const drawerWidth = 240;

function NewSidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleOutsideClick = (event) => {
    if (isMobileView) {
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

  // Use the useTheme hook to determine if the viewport is in mobile view
  const theme = useTheme();
  const isMobileView = theme.breakpoints.down("sm");

  const handleDrawerToggle = () => {
    console.log("Menu icon clicked");
    setMobileOpen(!mobileOpen);
    // if (isMobileView) {
    //   setMobileOpen(!mobileOpen);
    // }
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
      <Toolbar />
      <Divider />
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

  // Step 2: Use the useTheme hook to determine if the viewport is in mobile view
  //   const theme = useTheme();
  //   const isMobileView = theme.breakpoints.down("sm");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          zIndex: 7000,
        }}
      >
        <Toolbar>
          {/* Show menu icon only in mobile view */}
          {isMobileView && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle} // Update this line
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        // component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant={isMobileView ? "temporary" : "permanent"} // Use "temporary" for mobile view and "permanent" for other views
          open={isMobileView ? mobileOpen : true} // Keep the drawer open in non-mobile views
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // Hide the drawer in non-mobile views
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: "green",
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
              width: drawerWidth,
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
