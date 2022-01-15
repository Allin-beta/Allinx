import { fabric } from "fabric";
import { addGrid, addGuides } from "./Guides";

var canvas;
var properties;

function initCanvas(width, height, color) {
  canvas = new fabric.Canvas(`allinx`);
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = "white";
  fabric.Object.prototype.cornerStrokeColor = "rgb(176, 176, 176)";
  fabric.Object.prototype.cornerStyle = "circle";
  fabric.Object.prototype.centeredScaling = true;
  fabric.Object.prototype.cornerSize = 8;
  fabric.Object.prototype.borderColor = "#14aae6";
  addBackground(width, height, color);
  addGrid();
  addGuides();
}

function resetCanvas(width, height, background) {
  let config = Object.assign(
    {
      width: properties.width,
      height: properties.height,
      background: "#ffffff00",
    },
    { width, height, background }
  );
  canvas.clear();
  addGrid();
  addGuides();
  addBackground(config.width, config.height, config.background);
}

function addBackground(width, height, color) {
  canvas.discardActiveObject().renderAll();
  var rect = new fabric.Rect({
    id: "background",
    fill: color,
    strokeWidth: 1,
    stroke: "#aaaaaa",
    width: width,
    height: height,
    selectable: false,
    evented: false,
  });
  rect.left = canvas.width / 2 - width / 2;
  rect.top = canvas.height / 2 - height / 2;
  // rect.left = 460;
  // rect.top = 120;
  properties = rect;
  canvas.add(rect).renderAll();
}

export { canvas, properties, initCanvas, addBackground, resetCanvas };
