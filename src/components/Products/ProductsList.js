import React from "react";
import ProductCard from "./ProductCard";
import Grid from "@material-ui/core/Grid";

const ProductsList = (props) => {
  const fetchedProducts = props.products.map((product) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        isAuthenticated={props.isAuthenticated}
        deleteProduct={() => props.deleteProduct(product.id)}
      />
    );
  });

  return (
    <Grid container justify="center">
      {fetchedProducts}
    </Grid>
  );
};

export default ProductsList;
