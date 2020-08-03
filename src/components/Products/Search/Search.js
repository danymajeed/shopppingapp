import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Typography from "@material-ui/core/Typography";
import * as constants from "./SearchConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  searchButton: {
    margin: "20px 0px",
    fontWeight: 900,
  },
  operatorInput: {
    paddingTop: 16,
    width: 130,
    textAlign: "center",
    textTransform: "uppercase",
  },
  storageCheckboxes: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  typography: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  narrowSearchField: {
    width: 130,
  },
}));

const comparisonOperators = [
  {
    value: constants.LESS_THAN,
    label: "Less Than",
  },
  {
    value: constants.GREATER_THAN,
    label: "More Than",
  },
  {
    value: constants.EQUALS,
    label: "Equal To",
  },
  //   {
  //     value: "greaterThanEqual",
  //     label: "Greater Than Or Equal To",
  //   },
  //   {
  //     value: "lessThanEqual",
  //     label: "Less Than Or Equal To",
  //   },
];

const DEFAULT_OPERATOR = constants.LESS_THAN;

const Search = (props) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState({ value: "", operator: DEFAULT_OPERATOR });
  const [ram, setRam] = useState({ value: "", operator: DEFAULT_OPERATOR });
  const [screenSize, setScreenSize] = useState({
    value: "",
    operator: DEFAULT_OPERATOR,
  });
  const [storage, setStorage] = useState({
    "16": false,
    "32": false,
    "64": false,
    "128": false,
    "256": false,
    "512": false,
  });

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const modelChangeHandler = (event) => {
    setModel(event.target.value);
  };
  const brandChangeHandler = (event) => {
    setBrand(event.target.value);
  };

  const storageChangeHandler = (event) => {
    setStorage({ ...storage, [event.target.name]: event.target.checked });
  };

  const priceChangeHandler = (event) => {
    if (event.target.name === "priceValue")
      setPrice({ ...price, value: event.target.value });
    else if (event.target.name === "priceOperator")
      setPrice({ ...price, operator: event.target.value });
  };

  const ramChangeHandler = (event) => {
    if (event.target.name === "ramValue")
      setRam({ ...ram, value: event.target.value });
    else if (event.target.name === "ramOperator")
      setRam({ ...ram, operator: event.target.value });
  };

  const screenSizeChangeHandler = (event) => {
    if (event.target.name === "screenSizeValue")
      setScreenSize({ ...screenSize, value: event.target.value });
    else if (event.target.name === "screenSizeOperator")
      setScreenSize({ ...screenSize, operator: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const searchObj = { data: [] };
    //Title
    if (title !== "")
      searchObj.data.push({ [constants.CONTAINS]: [constants.TITLE, title] });
    //Brand
    if (brand !== "")
      searchObj.data.push({
        [constants.BEGINS_WITH]: [constants.TITLE, brand],
      });
    //Model
    if (model !== "")
      searchObj.data.push({ [constants.ENDS_WITH]: [constants.TITLE, model] });
    //Price
    if (price.value !== "")
      searchObj.data.push({ [price.operator]: [constants.PRICE, price.value] });
    //Ram
    if (ram.value !== "")
      searchObj.data.push({ [ram.operator]: [constants.RAM, ram.value] });
    //Screen Size
    if (screenSize.value !== "")
      searchObj.data.push({
        [screenSize.operator]: [constants.SCREEN_SIZE, screenSize.value],
      });
    // Storage
    const or = [];
    Object.keys(storage).forEach((key) => {
      if (storage[key] === true)
        or.push({ [constants.EQUALS]: [constants.STORAGE, key] });
    });
    if (or.length !== 0) searchObj.data.push({ or });

    props.searchProducts(searchObj);
  };

  const renderComparisonOperators = comparisonOperators.map((op) => {
    return (
      <MenuItem key={op.value} value={op.value}>
        {op.label}
      </MenuItem>
    );
  });

  const renderStorageOptions = Object.keys(storage).map((key, index) => {
    return (
      <FormControlLabel
        key={key}
        control={
          <Checkbox
            name={key}
            checked={storage[key]}
            onChange={storageChangeHandler}
          />
        }
        label={key + " GB"}
      />
    );
  });

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container alignContent="center" direction="column">
        {/* Title */}
        <Grid item>
          <TextField
            id="title"
            variant="outlined"
            label="Mobile Name"
            color="secondary"
            onChange={titleChangeHandler}
          />
        </Grid>
        {/* Brand */}
        <Grid item>
          <TextField
            id="brand"
            variant="outlined"
            label="Brand"
            color="secondary"
            value={brand}
            onChange={brandChangeHandler}
          />
        </Grid>
        {/* Model */}
        <Grid item>
          <TextField
            id="model"
            variant="outlined"
            label="Model"
            color="secondary"
            value={model}
            onChange={modelChangeHandler}
          />
        </Grid>
        {/* Storage */}
        <Grid item>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.typography}
          >
            Storage
          </Typography>
          <FormGroup className={classes.storageCheckboxes}>
            {renderStorageOptions}
          </FormGroup>
        </Grid>
        {/* Price */}
        <Grid item>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.typography}
          >
            Price
          </Typography>
          <TextField
            className={classes.operatorInput}
            select
            onChange={priceChangeHandler}
            value={price.operator}
            name="priceOperator"
          >
            {renderComparisonOperators}
          </TextField>

          <TextField
            className={classes.narrowSearchField}
            label="$"
            name="priceValue"
            value={price.value}
            onChange={priceChangeHandler}
          ></TextField>
        </Grid>

        {/* RAM */}
        <Grid>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.typography}
          >
            RAM
          </Typography>
          <TextField
            className={classes.operatorInput}
            select
            onChange={ramChangeHandler}
            value={ram.operator}
            name="ramOperator"
          >
            {renderComparisonOperators}
          </TextField>
          <TextField
            className={classes.narrowSearchField}
            label="GB"
            name="ramValue"
            value={ram.value}
            onChange={ramChangeHandler}
          ></TextField>
        </Grid>
        {/* Screen Size */}
        <Grid item>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.typography}
          >
            Screen Size
          </Typography>
          <TextField
            className={classes.operatorInput}
            select
            onChange={screenSizeChangeHandler}
            value={screenSize.operator}
            name="screenSizeOperator"
          >
            {renderComparisonOperators}
          </TextField>
          <TextField
            className={classes.narrowSearchField}
            label="inches"
            name="screenSizeValue"
            value={screenSize.value}
            onChange={screenSizeChangeHandler}
          ></TextField>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            className={classes.searchButton}
            variant="contained"
            color="secondary"
            onClick={submitHandler}
          >
            SEARCH
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProducts: (searchObj) => dispatch(actions.searchProducts(searchObj)),
  };
};

export default connect(null, mapDispatchToProps)(Search);
