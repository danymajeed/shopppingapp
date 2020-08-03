import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import SnackbarContent from "@material-ui/core/SnackbarContent";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const SnackbarComponent = (props) => {
  return (
    <Snackbar
      open={props.open}
      onClose={props.close}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      disableWindowBlurListener
      TransitionComponent={SlideTransition}
    >
      <SnackbarContent message={props.message} />
    </Snackbar>
  );
};

export default SnackbarComponent;
