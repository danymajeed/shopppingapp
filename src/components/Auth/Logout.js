import React, { useEffect } from "react";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Logout = (props) => {
  const { logout } = props;
  const { token } = props;
  useEffect(() => {
    logout(token);
  }, [logout, token]);
  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (token) => dispatch(actions.logout(token)),
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
