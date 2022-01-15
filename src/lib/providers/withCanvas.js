import { CanvasContext } from "./CanvasProvider";

export default function withCanvas(Workspace) {
  return function StageComponent(props) {
    return (
      <CanvasContext.Consumer>
        {(contexts) => (
          <Workspace {...props} selectedOBJ={contexts} />
        )}
      </CanvasContext.Consumer>
    );
  };
}
