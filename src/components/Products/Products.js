import React, { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import * as actions from "../../store/actions/index";
import Spinner from "../UI/Spinner";
import Dialog from "../UI/Dialog";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Snackbar from "../UI/Snackbar";
import Search from "./Search/Search";

const styles = makeStyles((theme) => ({
  errorMessage: {
    display: "flex",
    justifyContent: "center",
    letterSpacing: ".1rem",
    textTransform: "uppercase",
  },
  products: {
    marginTop: "40px",
  },
}));

const Products = (props) => {
  const classes = styles();

  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const { requestProducts } = props;
  const { productsFetched } = props;
  const [open, setOpen] = useState(false);
  const [dialogPayload, setDialogPayload] = useState();

  useEffect(() => {
    if (props.deleteSuccess)
      setSnackbar({ open: true, message: props.deleteSuccess });
  }, [props.deleteSuccess]);

  const closeSnackbarHandler = () => {
    setSnackbar({ open: false, message: "" });
    if (props.deleteError) props.resetFailedAlerts();
    else if (props.deleteSuccess) {
      props.resetSuccessAlerts();
    }
  };

  const closeDialogHandler = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!productsFetched) requestProducts();
  }, [requestProducts, productsFetched]);

  const dialogConfirmedActionHandler = () => {
    props.deleteProducts(dialogPayload.payload.id, props.token);
    closeDialogHandler();
  };

  const deleteProductHandler = (id) => {
    setDialogPayload({ payload: { id: id } });
    setOpen(true);
  };

  let products = null;
  if (props.error)
    products = <h2 className={classes.errorMessage}>{props.error}</h2>;
  if (props.isPending) return <Spinner />;
  if (!props.error && props.products.length === 0 && !props.isPending)
    products = <h2 className={classes.errorMessage}>No products to show</h2>;

  if (props.products.length !== 0)
    products = (
      <>
        <ProductsList
          products={props.products}
          isAuthenticated={props.isAuthenticated}
          deleteProduct={deleteProductHandler}
        />
      </>
    );

  return (
    <>
      <Snackbar
        open={snackbar.open}
        close={closeSnackbarHandler}
        message={snackbar.message}
      />
      <Dialog
        open={open}
        close={closeDialogHandler}
        confirm={dialogConfirmedActionHandler}
      />

      <Search />
      <div className={classes.products}>{products}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    productsFetched: state.products.productsFetched,
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    error: state.products.error,
    isPending: state.products.isPending,
    deleteError: state.products.deleteError,
    deleteSuccess: state.products.deleteSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestProducts: () => dispatch(actions.requestProducts()),
    deleteProducts: (id, token) => dispatch(actions.deleteProducts(id, token)),
    resetSuccessAlerts: () => dispatch(actions.resetProductsSuccessAlerts()),
    resetFailedAlerts: () => dispatch(actions.resetProductsFailedAlerts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
