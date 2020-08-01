import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "./Sidedrawer";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// import Search from "../Search/Search";
import NavigationItems from "./NavigationItems";
import { pink } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {},
  menuButton: {},
  logo: {
    height: "4rem",
    marginRight: theme.spacing(1),
  },
  loginButton: {
    display: "block",
    fontWeight: 900,
    letterSpacing: ".2rem",
    borderRadius: 0,
    marginLeft: "auto",
  },
  greetings: {
    letterSpacing: ".1rem",
    paddingBottom: 3,
    marginRight: theme.spacing(3),
    textTransform: "uppercase",
    fontWeight: 500,

    color: pink[200],
  },
}));

const AppBarComponent = (props) => {
  const classes = useStyles();
  const { width } = props;
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(false);
  };

  let authButton = (
    <Button
      component={Link}
      to="/auth"
      variant="outlined"
      color="secondary"
      className={classes.loginButton}
    >
      LOGIN / SIGNUP
    </Button>
  );
  if (props.isAuthenticated) {
    authButton = (
      <Button
        component={Link}
        to="/logout"
        variant="outlined"
        color="secondary"
        className={classes.loginButton}
      >
        LOGOUT
      </Button>
    );
  }

  let username = null;
  if (props.isAuthenticated)
    username = <div className={classes.greetings}>Hola, {props.username}</div>;

  let content = (
    <>
      <div className={classes.logo}>
        <Logo />
      </div>
      {username}
      <NavigationItems isAuthenticated={props.isAuthenticated} />

      {authButton}
    </>
  );

  if (width === "xs" || width === "sm") {
    content = (
      <>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        {authButton}
        <Drawer
          isAuthenticated={props.isAuthenticated}
          username={props.username}
          open={openDrawer}
          handleDrawerOpen={handleDrawerOpen}
          close={handleDrawerClose}
        />
      </>
    );
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>{content}</Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    username: state.auth.user,
  };
};

export default connect(mapStateToProps)(withWidth()(AppBarComponent));
