import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { userSignOut } from "../../../store/actions";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ContactsIcon from "@mui/icons-material/Contacts";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import DiscountIcon from "@mui/icons-material/Discount";
import { useState } from "react";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.users.data);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userSignOut());
    navigate("/");
  };

  const itemList = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => navigate("/admin_dashboard"),
    },
    {
      text: "Add products",
      icon: <MailIcon />,
      onClick: () => navigate("/admin_dashboard/add_product"),
    },
    {
      text: "Edit products",
      icon: <MailIcon />,
      onClick: () => navigate("/admin_dashboard/admin_products"),
    },
    {
      text: "Add category",
      icon: <CategoryIcon />,
      onClick: () => navigate("/admin_dashboard/add_category"),
    },
    {
      text: "Edit category",
      icon: <CategoryIcon />,
      onClick: () => navigate("/admin_dashboard/admin_category"),
    },
    {
      text: "Edit subcategory",
      icon: <CategoryIcon />,
      onClick: () => navigate("/admin_dashboard/admin_subcategory"),
    },
    {
      text: "Edit brands",
      icon: <CategoryIcon />,
      onClick: () => navigate("/admin_dashboard/admin_brands"),
    },
    {
      text: "Orders",
      icon: <ReceiptLongIcon />,
      onClick: () => navigate("/admin_dashboard/admin_orders"),
    },
    {
      text: "Add discount",
      icon: <DiscountIcon />,
      onClick: () => navigate("/admin_dashboard/add_discount"),
    },

    {
      text: "Discounts",
      icon: <DiscountIcon />,
      onClick: () => navigate("/admin_dashboard/admin_discount"),
    },
    {
      text: "Returs",
      icon: <AssignmentReturnIcon />,
      onClick: () => navigate("/admin_dashboard/admin_returs"),
    },

    {
      text: "Manage site information",
      icon: <ContactsIcon />,
      onClick: () => navigate("/admin_dashboard/manage_site"),
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "black" }}>
        <Toolbar open={open}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {`Hello, ${user.email}!`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {itemList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem component="button" key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
