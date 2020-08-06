import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import checkValidity from "../../shared/FormValidation";
import Snackbar from "../UI/Snackbar";
import * as actions from "../../store/actions/index";

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
  imageButton: {
    marginTop: 25,
    textAlign: "center",
  },
  imagePath: {
    marginTop: 25,
  },
}));

const EditProduct = (props) => {
  const classes = useStyles();
  const initialState = {
    title: {
      value: "",
      validation: {
        isRequired: true,
        minWords: 2,
      },
      error: false,
      errorMessage: "",
    },
    ram: {
      value: "",
      validation: {
        isRequired: true,
        isInteger: true,
        maxLength: 4,
      },
      error: false,
      errorMessage: "",
    },
    screenSize: {
      value: "",
      validation: {
        isRequired: true,
        isNumeric: true,
        maxLength: 3,
      },
      error: false,
      errorMessage: "",
    },
    storage: {
      value: "",
      validation: {
        isRequired: true,
        // isInteger: true,
        // maxLength: 4,
      },
      error: false,
      errorMessage: "",
    },
    price: {
      value: "",
      validation: {
        isRequired: true,
        isNumeric: true,
        maxLength: 10,
      },
      error: false,
      errorMessage: "",
    },
  };

  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [isAddingNew, setIsAddingNew] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [productForm, setProductForm] = useState(initialState);
  const [image, setImage] = useState();

  console.log("product edit");

  useEffect(() => {
    if (props.location.state !== undefined) {
      const product = props.location.state.product;
      setIsAddingNew(false);
      let editInitialFormState = {
        ...productForm,
      };
      editInitialFormState.title.value = product.title;
      editInitialFormState.ram.value = product.ram;
      editInitialFormState.storage.value = product.storage;
      editInitialFormState.price.value = product.price;
      editInitialFormState.screenSize.value = product.screen_size;
      const id = { value: product.id, validation: {} };
      editInitialFormState = { ...editInitialFormState, id };

      setFormIsValid(true);
      setProductForm(editInitialFormState);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.addSuccess)
      setSnackbar({ open: true, message: props.addSuccess });
    else if (props.editSuccess)
      setSnackbar({ open: true, message: props.editSuccess });
    else if (props.addError)
      setSnackbar({ open: true, message: props.addError });
    else if (props.editError)
      setSnackbar({ open: true, message: props.editError });
  }, [props.addSuccess, props.editSuccess, props.editError, props.addError]);

  const closeSnackbarHandler = () => {
    setSnackbar({ open: false, message: "" });
    if (props.addError || props.editError) props.resetFailedAlerts();
    else if (props.editSuccess || props.addSuccess) {
      props.resetSuccessAlerts();
    }
  };

  const selectImageHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const inputChangedHandler = (event) => {
    const inputIdentifier = event.target.name;
    const updatedproductForm = {
      ...productForm,
    };
    const updatedFormElement = {
      ...updatedproductForm[inputIdentifier],
    };

    const { isValid, message } = checkValidity(
      event.target.value,
      updatedFormElement.validation
    );
    updatedFormElement.error = !isValid;
    updatedFormElement.errorMessage = message;
    updatedFormElement.value = event.target.value;
    updatedproductForm[inputIdentifier] = updatedFormElement;

    let valid = true;
    for (let inputIdentifier in updatedproductForm) {
      valid =
        !updatedproductForm[inputIdentifier].error &&
        updatedproductForm[inputIdentifier].value !== "" &&
        valid;
    }
    setFormIsValid(valid);
    setProductForm(updatedproductForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = new FormData();
    if (isAddingNew) {
      if (image) {
        product.append("image", image, image.name);
      }
    }
    product.append("ram", productForm.ram.value);
    product.append("title", productForm.title.value);
    product.append("screen_size", productForm.screenSize.value);
    product.append("storage", productForm.storage.value);
    product.append("price", productForm.price.value);
    if (isAddingNew) {
      props.addProduct(product, props.token);
      setFormIsValid(false);
      setImage();
      setProductForm(initialState);
    } else {
      product.append("id", productForm.id.value);
      props.editProduct(product, props.token);
    }
  };

  let imageField = null;

  if (isAddingNew) {
    imageField = (
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          component="label"
          className={classes.imageButton}
        >
          Upload Image
          <input
            accept="image/*"
            type="file"
            style={{ display: "none" }}
            onChange={selectImageHandler}
          />
        </Button>
        {image && (
          <Typography variant="h6" className={classes.imagePath}>
            ...{image.name}
          </Typography>
        )}
      </Grid>
    );
  }

  let form = null;
  if (true) {
    form = (
      <>
        <Snackbar
          open={snackbar.open}
          close={closeSnackbarHandler}
          message={snackbar.message}
        />
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              {isAddingNew ? "ADD PRODUCT" : "EDIT PRODUCT"}
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="title"
                    autoFocus
                    label="Title"
                    name="title"
                    value={productForm.title.value}
                    onChange={inputChangedHandler}
                    helperText={productForm.title.errorMessage}
                    error={productForm.title.error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="price">Price</InputLabel>
                  <Input
                    fullWidth
                    name="price"
                    value={productForm.price.value}
                    onChange={inputChangedHandler}
                    error={productForm.price.error}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="ram"
                    label="RAM (GB)"
                    type="input"
                    value={productForm.ram.value}
                    onChange={inputChangedHandler}
                    helperText={productForm.ram.errorMessage}
                    error={productForm.ram.error}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Storage (GB)"
                    name="storage"
                    value={productForm.storage.value}
                    onChange={inputChangedHandler}
                  >
                    <MenuItem value="16">16 GB</MenuItem>
                    <MenuItem value="32">32 GB</MenuItem>
                    <MenuItem value="64">64 GB</MenuItem>
                    <MenuItem value="128">128 GB</MenuItem>
                    <MenuItem value="256">256 GB</MenuItem>
                    <MenuItem value="512">512 GB</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Screen Size (INCHES)"
                    type="input"
                    name="screenSize"
                    value={productForm.screenSize.value}
                    onChange={inputChangedHandler}
                    helperText={productForm.screenSize.errorMessage}
                    error={productForm.screenSize.error}
                  />
                </Grid>
              </Grid>
              {imageField}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                disabled={!formIsValid}
                onClick={handleSubmit}
                className={classes.submit}
              >
                {isAddingNew ? "Add" : "Edit"}
              </Button>
            </form>
          </div>
        </Container>
      </>
    );
  }

  return form;
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    addError: state.products.addError,
    editError: state.products.editError,
    addSuccess: state.products.addSuccess,
    editSuccess: state.products.editSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product, token) =>
      dispatch(actions.addProducts(product, token)),
    editProduct: (product, token) =>
      dispatch(actions.editProducts(product, token)),
    resetSuccessAlerts: () => dispatch(actions.resetProductsSuccessAlerts()),
    resetFailedAlerts: () => dispatch(actions.resetProductsFailedAlerts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
