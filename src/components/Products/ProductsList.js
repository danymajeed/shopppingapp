import React from "react";
import ProductCard from "./ProductCard";
import Spinner from "../UI/Spinner";
import Grid from "@material-ui/core/Grid";

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

  return (
    <Grid container justify="center">
      {fetchedProducts}
    </Grid>
  );
};

export default ProductsList;
