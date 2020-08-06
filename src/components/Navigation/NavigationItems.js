import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.down("sm")]: {
    listItem: {
      padding: "15px",
      margin: "10px 0px",
      "&:hover": {
        backgroundColor: "#ffdfe5 !important",
      },
    },
    itemText: {
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: ".05rem",
      color: grey[900],
    },
    list: {
      display: "flex",
      flexDirection: "column",
    },
  },
  [theme.breakpoints.up("md")]: {
    listItem: {
      padding: "0px 10px",
      marginRight: "10px",
      "&:hover": {
        backgroundColor: " pink !important",
      },
    },
    itemText: {
      textAlign: "center",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: ".2rem",
      color: "white",
      "&:hover": {
        color: "black",
      },
    },
    list: {
      display: "flex",
      flexDirection: "row",
    },
  },
}));

const NavigationItems = (props) => {
  const classes = useStyles();
  return (
    <>
      <List className={classes.list}>
        <ListItem
          onClick={props.close}
          divider
          centerRipple
          button
          component={Link}
          className={classes.listItem}
          to="/"
        >
          <ListItemText
            primary="Home"
            classes={{ primary: classes.itemText }}
          />
        </ListItem>
        {props.isAuthenticated && (
          <ListItem
            onClick={props.close}
            divider
            centerRipple
            button
            className={classes.listItem}
            component={Link}
            to={{
              pathname: "/manageproducts",
            }}
          >
            <ListItemText
              primary="Products"
              classes={{ primary: classes.itemText }}
            />
          </ListItem>
        )}
        <ListItem
          onClick={props.close}
          divider
          button
          component={Link}
          className={classes.listItem}
          to="/filterproducts"
        >
          <ListItemText
            primary="Filter"
            classes={{ primary: classes.itemText }}
          />
        </ListItem>
      </List>
    </>
  );
};

export default NavigationItems;
