import { useState, useEffect, createContext } from "react";
import { canvas } from "../services/Canvas";

export const CanvasContext = createContext();

function CanvasProvider(props) {
  const [selectedOBJ, setSelectedOBJ] = useState(null);
  useEffect(() => {
    canvas.on("selection:created", function (options) {
      let object = canvas.getActiveObject();
      let type = object._objects ? "group" : "element";
      type = type === "element" && object.text ? "text" : type;
      setSelectedOBJ({ object, type });
    });
    canvas.on("selection:updated", function (options) {
      let object = canvas.getActiveObject();
      let type = object._objects ? "group" : "element";
      type = type === "element" && object.text ? "text" : type;
      setSelectedOBJ({ object, type });
    });
    canvas.on("selection:cleared", function (options) {
      setSelectedOBJ(null);
    });
  }, []);
  return (
    <CanvasContext.Provider value={selectedOBJ}>
      {props.children}
    </CanvasContext.Provider>
  );
}

export default CanvasProvider;
