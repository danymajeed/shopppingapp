import * as actionTypes from "../actions/actionTypes";

const initialStateProducts = {
  isPending: "",
  products: [],
  error: null,
  deleteError: null,
  addError: null,
  editError: null,
  deleteSuccess: null,
  addSuccess: null,
  editSuccess: null,
};

//No need to save new products array state after addition and edit because products will be requested from server each time the main page is visited

const reducer = (state = initialStateProducts, action = {}) => {
  switch (action.type) {
    case actionTypes.REQUEST_PRODUCTS_PENDING:
      return { ...state, isPending: true };
    case actionTypes.REQUEST_PRODUCTS_SUCCESS:
      return {
        ...state,
        isPending: false,
        error: false,
        products: action.products,
      };
    case actionTypes.REQUEST_PRODUCTS_FAILED:
      return { ...state, isPending: false, error: action.error };
    case actionTypes.DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.id),
        deleteSuccess: "Product deleted successfully",
      };
    case actionTypes.DELETE_PRODUCTS_FAILED:
      return {
        ...state,
        deleteError: action.deleteError,
      };
    case actionTypes.ADD_PRODUCTS_SUCCESS:
      return {
        ...state,
        // products: [...state.products, action.product],
        addSuccess: "Product added successfully",
      };
    case actionTypes.ADD_PRODUCTS_FAILED:
      return {
        ...state,
        addError: action.error,
      };
    case actionTypes.EDIT_PRODUCTS_SUCCESS: {
      //   const newData = state.products.map((product) => {
      //     if (product.id === action.product.id) return action.product;
      //     return product;
      //   });
      return {
        ...state,
        // products: newData,
        editSuccess: "Product edited successfully",
      };
    }
    case actionTypes.EDIT_PRODUCTS_FAILED:
      return {
        ...state,
        editError: action.error,
      };

    case actionTypes.RESET_PRODUCTS_SUCCESS_ALERTS:
      return {
        ...state,
        deleteSuccess: null,
        addSuccess: null,
        editSuccess: null,
      };
    case actionTypes.RESET_PRODUCTS_FAILED_ALERTS:
      return {
        ...state,
        deleteError: null,
        addError: null,
        editError: null,
      };
    default:
      return state;
  }
};

export default reducer;
