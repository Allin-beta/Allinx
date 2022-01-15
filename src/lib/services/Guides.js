import { fabric } from "fabric";
import { canvas, properties } from "./Canvas";
import { colors } from "../config/colors";
import PatternImage from "../assets/pattern.png";

var verticalGuide;
var horizontalGuide;
var gridLines;

function addVerticalGuide() {
  verticalGuide = new fabric.Line([0, 0, 0, canvas.height], {
    id: "vertical-guide",
    selectable: false,
    evented: false,
    excludeFromExport: true,
    opacity: 0,
    left: properties.left + properties.width / 2,
    top: 0,
    stroke: colors.guides,
    strokeDashArray: [5, 5],
  });
  canvas.add(verticalGuide);
}

function hideYGuide() {
  verticalGuide.opacity = 0;
  canvas.renderAll();
}

function showYGuide() {
  verticalGuide.opacity = 1;
  canvas.renderAll();
}

function addHorizontalGuide() {
  horizontalGuide = new fabric.Line([0, 0, canvas.width, 0], {
    id: "horizontal-guide",
    selectable: false,
    evented: false,
    excludeFromExport: true,
    opacity: 0,
    left: 0,
    top: properties.top + properties.height / 2,
    stroke: colors.guides,
    strokeDashArray: [5, 5],
  });
  canvas.add(horizontalGuide);
}

function hideXGuide() {
  horizontalGuide.opacity = 0;
}

function showXGuide() {
  horizontalGuide.opacity = 1;
}

function showGrid() {
  gridLines.opacity = 0.3;
  canvas.renderAll();
}

function hideGrid() {
  gridLines.opacity = 0;
  canvas.renderAll();
}

function addGuides() {
  addVerticalGuide();
  addHorizontalGuide();
}

function addGrid() {
  var src = PatternImage;
  canvas.setBackgroundColor({ source: src, repeat: "repeat" }, function () {
    canvas.renderAll();
  });
  return true;
}

function removeGrid() {
  canvas.setBackgroundColor(null, function () {
    canvas.renderAll();
  });
  return false;
}

export {
  showXGuide,
  hideXGuide,
  showYGuide,
  hideYGuide,
  addGuides,
  showGrid,
  hideGrid,
  addGrid,
  removeGrid,
};
