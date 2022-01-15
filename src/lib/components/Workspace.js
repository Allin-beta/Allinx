import PropTypes from "prop-types";
import { useEffect } from "react";
import { initCanvas } from "../services/Canvas";
import { initEvents } from "../services/Events";
import withCanvas from "../providers/withCanvas";

function Workspace(props) {
  useEffect(() => {
    initCanvas(props.store.width, props.store.height, props.store.background);
    initEvents();
  }, [props.store.background, props.store.height, props.store.width]);
  return (
    <canvas
      id="allinx"
      width={props.store.stage.width}
      height={props.store.stage.height}
    ></canvas>
  );
}

export default withCanvas(Workspace);

Workspace.propTypes = {
  store: PropTypes.object.isRequired,
};

Workspace.defaultProps = {
  store: {
    width: 500,
    height: 500,
    background: "#00FF003C",
    format: "SVG",
    stage: { width: 1440, height: 790 },
  },
};
