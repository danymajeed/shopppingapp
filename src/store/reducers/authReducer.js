import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  user: null,

  loading: false,
  error: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, error: null, loading: true };
    case actionTypes.AUTH_FAILED: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        token: action.token,
        user: action.username,
      };
    }
    case actionTypes.AUTH_LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        token: null,
      };
    }
    case actionTypes.RESET_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};

export default reducer;
