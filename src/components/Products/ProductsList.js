import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProductCard from "./ProductCard";
import Spinner from "../UI/Spinner";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
}));

const ProductsList = (props) => {
  let fetchedProducts = <Spinner />;
  if (props.products) {
    fetchedProducts = props.products.map((product) => {
      return (
        <ProductCard
          key={product.id}
          product={product}
          isAuthenticated={props.isAuthenticated}
          deleteProduct={() => props.deleteProduct(product.id)}
        />
      );
    });
  }

  const classes = useStyles();
  return <div className={classes.container}>{fetchedProducts}</div>;
};

export default ProductsList;
