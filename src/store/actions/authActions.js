import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axiosInstance";

const authSuccess = (token, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username,
  };
};

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

const logoutStart = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_START,
  };
};

const logoutFailed = (error) => {
  return {
    type: actionTypes.AUTH_LOGOUT_FAILED,
    error: error,
  };
};

const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_SUCCESS,
  };
};

export const logout = (token) => {
  return (dispatch) => {
    dispatch(logoutStart());
    axiosInstance
      .post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationDate");
        localStorage.removeItem("username");
        dispatch(logoutSuccess());
      })
      .catch((error) => {
        dispatch(logoutFailed(error.response));
      });
  };
};

const checkAuthTimeout = (expirationTime, token) => {
  return (dispatch) => {
    setTimeout(() => dispatch(logout(token)), expirationTime * 1000);
  };
};

const setLocalStorage = (token, user, expiryTime) => {
  const expirationDate = new Date(new Date().getTime() + expiryTime);
  localStorage.setItem("token", token);
  localStorage.setItem("expirationDate", expirationDate);
  localStorage.setItem("username", user.username);
};

export const authRegister = (user) => {
  return (dispatch) => {
    dispatch(authStart());
    axiosInstance
      .post("/api/register", user)
      .then((response) => {
        const expiryTime =
          new Date(response.data.expiry).getTime() - new Date().getTime();
        setLocalStorage(response.data.token, response.data.user, expiryTime);
        dispatch(authSuccess(response.data.token, response.data.user.username));
        dispatch(checkAuthTimeout(expiryTime / 1000, response.data.token));
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data.username[0] !== undefined)
            dispatch(authFailed(error.response.data.username[0]));
          else dispatch(authFailed("Server didn't handle the request"));
        } else if (error.request) dispatch(authFailed("An error occurred"));
      });
  };
};

export const resetError = () => {
  return {
    type: actionTypes.RESET_ERROR,
  };
};

export const authLogin = (user) => {
  return (dispatch) => {
    dispatch(authStart());
    axiosInstance
      .post("/api/login", user)
      .then((response) => {
        const expiryTime =
          new Date(response.data.expiry).getTime() - new Date().getTime();
        setLocalStorage(response.data.token, response.data.user, expiryTime);
        dispatch(authSuccess(response.data.token, response.data.user.username));
        dispatch(checkAuthTimeout(expiryTime / 1000, response.data.token));
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data.non_field_errors[0] !== undefined)
            dispatch(authFailed(error.response.data.non_field_errors[0]));
          else dispatch(authFailed("Server didn't handle the request"));
        } else if (error.request) dispatch(authFailed("An error occurred"));
      });
  };
};

export const authCheckStatus = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logoutSuccess());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const username = localStorage.getItem("username");
        dispatch(authSuccess(token, username));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000,
            token
          )
        );
      } else {
        dispatch(logoutSuccess());
      }
    }
  };
};
