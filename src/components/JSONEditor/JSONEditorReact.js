import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";

const styles = makeStyles(() => ({
  container: {
    height: 350,
  },
}));
const JSONEditorReact = (props) => {
  const classes = styles();
  const containerRef = useRef();

  useEffect(() => {
    const options = Object.assign({}, props);
    delete options.text;
    const jsoneditor = new JSONEditor(containerRef.current, options);

    if ("text" in props) {
      jsoneditor.setText(props.text);
    }

    return () => {
      if (jsoneditor.current) {
        jsoneditor.destroy();
      }
    };
    // eslint-disable-next-line
  }, []);

  return <div className={classes.container} ref={containerRef} />;
};

export default React.memo(JSONEditorReact);
