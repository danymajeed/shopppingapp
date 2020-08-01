import React, { useState } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import checkValidity from "../../shared/FormValidation";
import Spinner from "../UI/Spinner";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        DEASE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: 900,
    letterSpacing: ".2rem",
  },
  error: {
    letterSpacing: ".2rem",
    fontWeight: 700,
    textTransform: "uppercase",
    color: "red",
  },
}));

const Auth = (props) => {
  const classes = useStyles();
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [formIsValid, setFormIsValid] = useState(true);

  const initialFormState = {
    username: {
      value: "",
      validation: {
        isRequired: true,
      },
      error: false,
      errorMessage: "",
    },
    firstname: {
      value: "",
      validation: {
        isRequired: true,
      },
      error: false,
      errorMessage: "",
    },
    lastname: {
      value: "",
      validation: {
        isRequired: true,
      },
      error: false,
      errorMessage: "",
    },
    email: {
      value: "",
      validation: {
        isRequired: true,
        isEmail: true,
      },
      error: false,
      errorMessage: "",
    },
    password: {
      value: "",
      validation: {
        isRequired: true,
        minLength: 6,
      },
      error: false,
      errorMessage: "",
    },
  };

  const [authForm, setAuthForm] = useState(initialFormState);

  const inputChangedHandler = (event) => {
    const inputIdentifier = event.target.id;
    const updatedAuthForm = {
      ...authForm,
    };
    const updatedFormElement = {
      ...updatedAuthForm[inputIdentifier],
    };

    const { isValid, message } = checkValidity(
      event.target.value,
      updatedFormElement.validation
    );
    updatedFormElement.error = !isValid;
    updatedFormElement.errorMessage = message;

    updatedFormElement.value = event.target.value;

    updatedAuthForm[inputIdentifier] = updatedFormElement;

    if (!isSigningIn) {
      let valid = true;
      for (let inputIdentifier in updatedAuthForm) {
        valid =
          !updatedAuthForm[inputIdentifier].error &&
          updatedAuthForm[inputIdentifier].value !== "" &&
          valid;
      }
      setFormIsValid(valid);
    }
    setAuthForm(updatedAuthForm);
  };

  const changeSignInHandler = () => {
    setFormIsValid(false);
    setAuthForm(initialFormState);
    setIsSigningIn(!isSigningIn);
    if (props.error !== "") props.resetError();
    if (!isSigningIn) setFormIsValid(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSigningIn) {
      const user = {
        username: authForm.username.value,
        password: authForm.password.value,
      };
      if (user.username && user.password) {
        props.authLogin(user);
      } else {
        if (user.username === "")
          setAuthForm({
            ...authForm,
            username: {
              ...authForm.username,
              error: true,
              errorMessage: "Enter a username first!",
            },
          });
        else if (user.password === "")
          setAuthForm({
            ...authForm,
            password: {
              ...authForm.password,
              error: true,
              errorMessage: "Enter a password!",
            },
          });
      }
    } else if (!isSigningIn) {
      const user = {
        username: authForm.username.value,
        password: authForm.password.value,
        first_name: authForm.firstname.value,
        last_name: authForm.lastname.value,
        email: authForm.email.value,
      };

      props.authRegister(user);
    }
  };

  let signUpElements = null;
  if (!isSigningIn) {
    signUpElements = (
      <>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="firstname"
            variant="outlined"
            fullWidth
            id="firstname"
            label="First Name"
            autoFocus
            value={authForm.firstname.value}
            onChange={inputChangedHandler}
            helperText={authForm.firstname.errorMessage}
            error={authForm.firstname.error}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lname"
            value={authForm.lastname.value}
            onChange={inputChangedHandler}
            helperText={authForm.lastname.errorMessage}
            error={authForm.lastname.error}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={authForm.email.value}
            onChange={inputChangedHandler}
            helperText={authForm.email.errorMessage}
            error={authForm.email.error}
          />
        </Grid>
      </>
    );
  }

  let form = <Spinner />;

  if (props.isAuthenticated) return <Redirect to="/" />;

  if (!props.loading) {
    form = (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSigningIn ? "Sign In" : "Sign Up"}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              {signUpElements}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="username"
                  autoFocus
                  label="Username"
                  name="username"
                  autoComplete="uname"
                  value={authForm.username.value}
                  onChange={inputChangedHandler}
                  helperText={authForm.username.errorMessage}
                  error={authForm.username.error}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={authForm.password.value}
                  onChange={inputChangedHandler}
                  helperText={authForm.password.errorMessage}
                  error={authForm.password.error}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={!formIsValid}
              onClick={handleSubmit}
              className={classes.submit}
            >
              {isSigningIn ? "Sign In" : "Sign Up"}
            </Button>
            <Grid container justify="center">
              <Grid item>
                <p className={classes.error}>{props.error}</p>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
                <Button disableRipple onClick={changeSignInHandler}>
                  {isSigningIn
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Sign in"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }

  return form;
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (user) => dispatch(actions.authLogin(user)),
    authRegister: (user) => dispatch(actions.authRegister(user)),
    resetError: () => dispatch(actions.resetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
