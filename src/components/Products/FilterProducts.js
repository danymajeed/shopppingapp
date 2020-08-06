import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import JSONEditorReact from "../JSONEditor/JSONEditorReact";
import Button from "@material-ui/core/Button";
import Spinner from "../UI/Spinner";
import ProductsList from "./ProductsList";

const styles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: 20,
  },
  button: {
    width: 400,
  },
  errorMessage: {
    display: "flex",
    justifyContent: "center",
    letterSpacing: ".1rem",
    textTransform: "uppercase",
  },
}));

const schema = {
  title: "Data",
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",

        properties: {
          or: {
            type: "array",
            items: {
              type: "object",
            },
          },
        },
      },
    },
  },
  required: ["data"],
};

const json = {
  data: [{ contains: ["title", ""] }, { or: [] }],
};
const modes = ["tree", "code"];

const FilterProducts = (props) => {
  const classes = styles();
  const [editorState, setEditorState] = useState({
    schema,
    text: JSON.stringify(json, null, 4),
    mode: "code",
  });

  const { requestProducts } = props;

  useEffect(() => {
    requestProducts();
  }, [requestProducts]);

  const onChangeText = React.useCallback(
    (text) => {
      setEditorState({ ...editorState, text });
    },
    [editorState]
  );

  const buttonClickHandler = () => {
    try {
      JSON.parse(editorState.text);
      props.searchProducts(JSON.parse(editorState.text));
    } catch (e) {
      return null;
    }
  };

  let products = null;
  if (props.error)
    products = <h2 className={classes.errorMessage}>{props.error}</h2>;
  if (props.isPending) products = <Spinner />;
  if (!props.error && !props.isPending)
    products = (
      <h2 className={classes.errorMessage}>Didn't Find Any Product</h2>
    );

  if (props.products.length !== 0 && !props.error)
    products = (
      <>
        <ProductsList
          products={props.products}
          isAuthenticated={false}
          deleteProduct={() => {}}
        />
      </>
    );

  return (
    <>
      <JSONEditorReact
        schema={editorState.schema}
        text={editorState.text}
        onChangeText={onChangeText}
        mode={editorState.mode}
        modes={modes}
        enableTransform={false}
        indentation={4}
      />
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className={classes.button}
          onClick={buttonClickHandler}
        >
          Filter
        </Button>
      </div>
      {products}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    isPending: state.products.isPending,
    error: state.products.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProducts: (searchObj) => dispatch(actions.searchProducts(searchObj)),
    requestProducts: () => dispatch(actions.requestProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterProducts);
