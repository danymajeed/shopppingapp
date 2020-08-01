import * as actionTypes from "../actions/actionTypes";
import axiosInstance from "../../axiosInstance";

const requestProductsPending = () => {
  return { type: actionTypes.REQUEST_PRODUCTS_PENDING };
};

const requestProductsSuccess = (products) => {
  return {
    type: actionTypes.REQUEST_PRODUCTS_SUCCESS,
    products: products,
  };
};

const requestProductsFailed = (error) => {
  return {
    type: actionTypes.REQUEST_PRODUCTS_FAILED,
    error: error,
  };
};

export const requestProducts = () => {
  return (dispatch) => {
    dispatch(requestProductsPending());
    axiosInstance
      .get("api/products")
      .then((response) => {
        dispatch(requestProductsSuccess(response.data));
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          dispatch(requestProductsFailed(error.response.statusText));
        } else if ("response " + error.request) {
          dispatch(requestProductsFailed("Failed to fetch products"));
        }
      });
  };
};

const deleteProductsSuccess = (id) => {
  return {
    type: actionTypes.DELETE_PRODUCTS_SUCCESS,
    id: id,
  };
};

const deleteProductsFailed = (error) => {
  return {
    type: actionTypes.DELETE_PRODUCTS_FAILED,
    error: error,
  };
};

export const deleteProducts = (id, token) => {
  return (dispatch) => {
    axiosInstance
      .delete(`api/products/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      .then((response) => {
        dispatch(deleteProductsSuccess(id));
      })
      .catch((error) => {
        dispatch(deleteProductsFailed("Failed to delete the product"));
      });
  };
};

const addProductsSuccess = (product) => {
  return {
    type: actionTypes.ADD_PRODUCTS_SUCCESS,
    product: product,
  };
};

const addProductsFailed = (error) => {
  if (error === undefined) error = "Failed to add the product";
  return {
    type: actionTypes.ADD_PRODUCTS_FAILED,
    error: error,
  };
};

export const addProducts = (product, token) => {
  return (dispatch) => {
    axiosInstance
      .post("api/products/", product, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        dispatch(addProductsSuccess(response.data));
      })
      .catch((error) => {
        if (error.response)
          dispatch(addProductsFailed(error.response.data.title));
        else if (error.request)
          dispatch(addProductsFailed("Failed to add the product"));
      });
  };
};

const editProductsSuccess = (product) => {
  return {
    type: actionTypes.EDIT_PRODUCTS_SUCCESS,
    product: product,
  };
};

const editProductsFailed = (error) => {
  return {
    type: actionTypes.EDIT_PRODUCTS_FAILED,
    error: error,
  };
};

export const editProducts = (product, token) => {
  return (dispatch) => {
    axiosInstance
      .patch(`api/products/${product.get("id")}/`, product, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        dispatch(editProductsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(editProductsFailed("Failed to edit the product"));
      });
  };
};

export const resetProductsSuccessAlerts = () => {
  return { type: actionTypes.RESET_PRODUCTS_SUCCESS_ALERTS };
};
export const resetProductsFailedAlerts = () => {
  return { type: actionTypes.RESET_PRODUCTS_FAILED_ALERTS };
};
