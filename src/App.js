import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import AppBar from "./components/Navigation/Appbar";
import Products from "./components/Products/Products";
import Logout from "./components/Auth/Logout";
import Auth from "./components/Auth/Auth";
import Snackbar from "./components/UI/Snackbar";
import EditProduct from "./components/Products/EditProduct";

const App = (props) => {
  const { onReloadCheckAuthStatus } = props;
  useEffect(() => {
    onReloadCheckAuthStatus();
  }, [onReloadCheckAuthStatus]);

  let routes = (
    <>
      <Route path="/" exact component={Products} />
      <Route path="/auth" component={Auth} />
    </>
  );
  if (props.isAuthenticated) {
    routes = (
      <>
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/logout" component={Logout} />;
          <Route path="/auth" component={Auth} />
          <Route path="/manageproducts" component={EditProduct} />
        </Switch>
      </>
    );
  }

  return (
    <>
      <AppBar />
      <Snackbar />
      {routes}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReloadCheckAuthStatus: () => dispatch(actions.authCheckStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
