import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import NavigationItems from "./NavigationItems";
import Close from "@material-ui/icons/Close";
import Logo from "../Logo";
import { grey } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  list: {
    [theme.breakpoints.up("sm")]: {
      width: "350px",
    },
    width: "100vw",
    boxSizing: "border-box",
    padding: "10px 20px",
  },
  drawerPaper: {
    background: "white",
    color: grey[900],
  },
  logo: {
    height: "5rem",
    textAlign: "center",
    marginTop: "3vh",
    marginBottom: "3vh",
  },
  greetings: {
    fontWeight: 500,
    margin: "10 0",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: ".2rem",
  },
}));

const SwipeableTemporaryDrawer = (props) => {
  const classes = useStyles();

  const list = () => (
    <div className={classes.list} role="presentation" onKeyDown={props.close}>
      <div style={{ display: "block" }}>
        <IconButton onClick={props.close}>
          <Close color="primary" fontSize="large" />
        </IconButton>
      </div>
      <div className={classes.logo}>
        <Logo />
      </div>
      {props.isAuthenticated && (
        <>
          <Divider />
          <h3 className={classes.greetings}>Hello, {props.username}</h3>
          <Divider />
        </>
      )}

      <NavigationItems
        isAuthenticated={props.isAuthenticated}
        close={props.close}
      />
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
        open={props.open}
        onClose={props.close}
        onOpen={props.handleDrawerOpen}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default SwipeableTemporaryDrawer;
