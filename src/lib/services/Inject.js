import { canvas, properties, resetCanvas } from "./Canvas";
import { fabric } from "fabric";

function addRectangle(color) {
  canvas.discardActiveObject().renderAll();
  var rect = new fabric.Rect({
    fill: color,
    left: properties.left,
    top: properties.top,
    width: 200,
    height: 200,
  });
  canvas.add(rect).renderAll();
}

function importSVG(svg, params) {
  let config = Object.assign(
    { width: 500, height: 500, background: "#00ff00" },
    params
  );
  console.log(config);
  return new Promise((resolve, reject) => {
    resetCanvas(config.width, config.height, config.background);
    fabric.loadSVGFromString(svg, function (objects, options) {
      insertElements(objects);
    });
  });
}

function importJSON(json, params) {
  return new Promise((resolve, reject) => {
    canvas.clear();
    canvas.loadFromJSON(json);
    canvas.renderAll();
    //   insertElements(canvas);
    //   addBackground(properties.width, properties.height, "#ffffff00");
  });
}

function insertElements(objects) {
  let groups = new Map();
  objects.forEach((obj, index) => {
    if (obj.type.includes("text")) {
      if (obj.text !== "") {
        let params = {
          left: properties.left + obj.left,
          top: properties.top + obj.top,
        };
        let text = new fabric.IText(obj.text, {
          ...obj,
          ...params,
        });
        let key = `text${index}`;
        groups.set(key, text);
        canvas.remove(obj);
      }
    } else {
      obj.id = `path${index}`;
      obj.left += properties.left;
      obj.top += properties.top;
      groups.set(obj.id, obj);
    }
  });
  for (let group of groups.values()) {
    canvas.add(group);
  }
  canvas.renderAll();
}

export { addRectangle, importSVG, importJSON };
