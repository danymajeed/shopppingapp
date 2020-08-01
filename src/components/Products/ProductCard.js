import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 300,
    height: "auto",
    margin: theme.spacing(3),
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    margin: "auto",
    height: "300px",
    width: "300px",
  },
  content: {
    textAlign: "left",
    padding: theme.spacing(3),
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -theme.spacing(3),
    },
  },
  button: {
    display: "block",
    fontWeight: 900,
    letterSpacing: ".2rem",

    marginRight: theme.spacing(1),
  },
  buttonContainer: {
    display: "flex",
  },
  imageFit: {
    /* default value: image is centered*/
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const { product } = props;
  let manageProduct = null;
  if (props.isAuthenticated)
    manageProduct = (
      <>
        <Divider className={classes.divider} light />
        <div className={classes.buttonContainer}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            onClick={props.deleteProduct}
          >
            Delete
          </Button>
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to={{
              pathname: "/manageproducts",
              state: { product: product },
            }}
            className={classes.button}
          >
            Edit
          </Button>
        </div>
      </>
    );

  return (
    <Card className={classes.card}>
      <CardMedia
        classes={{ root: classes.media }}
        component="img"
        image={product.image}
      />
      <CardContent className={classes.content}>
        <Typography variant="h6" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Price: <strong>USD {product.price}</strong>
        </Typography>
        <Typography variant="body2" gutterBottom>
          RAM: <strong>{product.ram} GB</strong>
        </Typography>
        <Typography variant="body2" gutterBottom>
          Screen Size: <strong>{product.screen_size} inches</strong>
        </Typography>
        <Typography variant="body2">
          Storage: <strong> {product.storage} GB</strong>
        </Typography>
        {manageProduct}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
