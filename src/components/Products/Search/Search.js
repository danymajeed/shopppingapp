import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  searchButtons: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Search = () => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container justify="center">
        <Grid item>
          <TextField
            id="title"
            variant="filled"
            label="Name"
            color="secondary"
          />
        </Grid>
        <Grid item>
          <TextField
            id="company"
            variant="filled"
            label="Company"
            color="secondary"
          />
        </Grid>
        <Grid item>
          <TextField
            id="brand"
            variant="filled"
            label="Brand"
            color="secondary"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default Search;
