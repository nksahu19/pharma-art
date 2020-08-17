import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Drawer, CssBaseline, AppBar, Toolbar, Avatar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Person from "@material-ui/icons/Person";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DescriptionIcon from '@material-ui/icons/Description';
import { Outlet } from 'react-router-dom';


const drawerWidth = 240;

const listItems = [
  {
    href: '/orders',
    icon: ShoppingCartIcon,
    title: 'Orders'
  },
  {
    href: '/invoices',
    icon: DescriptionIcon,
    title: 'Invoices'
  },
  {
    href: '/profile',
    icon: Person,
    title: 'User Profile'
  },
 
  {
    href: '/signin',
    icon: ExitToAppIcon,
    title: 'Log Out'
  },
 
];


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(4),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const user = {
    avatar: '/static/images/avatars/img_avatar.png',
    jobTitle: 'Medicine Distributer',
    name: 'Demo Admin'
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            p={2}
          >
            <Avatar
              className={classes.avatar}
              component={Link}
              src={user.avatar}
              to="/profile"
            />
            <Typography
              className={classes.name}
              color="textPrimary"
            >
              {user.name}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {user.jobTitle}
            </Typography>
          </Box>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {listItems.map((value, index) => (
            <ListItem button key={index} component={Link} to={value.href}>
              <ListItemIcon>
                <value.icon />
              </ListItemIcon>
              <ListItemText primary={value.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Outlet />
      </main>

    </div>
  );
}

export default Layout
