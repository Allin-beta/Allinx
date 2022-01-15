import { canvas, properties } from "./Canvas";
import { hideXGuide, showXGuide, hideYGuide, showYGuide } from "./Guides";

var zoom = 1;
let snapZone = 10;

function initEvents() {
  canvas.on("object:moving", function (options) {
    properties.opacity = 0.6;
    let obj = options.target;
    if (isObjectHorizontalCenter(obj)) {
      showYGuide();
      obj
        .set({
          left:
            properties.left +
            properties.width / 2 -
            (obj.width * obj.scaleX) / 2,
        })
        .setCoords();
    } else {
      hideYGuide();
    }
    if (isObjectVerticalCenter(obj)) {
      showXGuide();
      obj
        .set({
          top:
            properties.top +
            properties.height / 2 -
            (obj.height * obj.scaleY) / 2,
        })
        .setCoords();
    } else {
      hideXGuide();
    }
    if (isObjectLeft(obj)) {
      obj
        .set({
          left: properties.left,
        })
        .setCoords();
    }
    if (isObjectTop(obj)) {
      obj
        .set({
          top: properties.top,
        })
        .setCoords();
    }
    if (isObjectRight(obj)) {
      obj
        .set({
          left: properties.left + properties.width - obj.width * obj.scaleX,
        })
        .setCoords();
    }
    if (isObjectBottom(obj)) {
      obj
        .set({
          top: properties.top + properties.height - obj.height * obj.scaleY,
        })
        .setCoords();
    }

    canvas.renderAll();
  });
  canvas.on("mouse:up", function (event) {
    hideYGuide();
    hideXGuide();
    properties.opacity = 1;
  });
  // canvas.on("mouse:wheel", function (opt) {
  //   var delta = opt.e.deltaY;
  //   var zoomTemp = canvas.getZoom();
  //   zoomTemp *= 0.999 ** delta;
  //   if (zoomTemp > 20) zoomTemp = 20;
  //   if (zoomTemp < 0.01) zoomTemp = 0.01;
  //   canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoomTemp);
  //   opt.e.preventDefault();
  //   opt.e.stopPropagation();
  //   zoom = zoomTemp;
  // });
}

function isObjectHorizontalCenter(obj) {
  let objCenter = obj.left + (obj.width * obj.scaleX) / 2;
  let canvasCenter = properties.left + properties.width / 2;
  return (
    objCenter > canvasCenter - snapZone && objCenter < canvasCenter + snapZone
  );
}

function isObjectVerticalCenter(obj) {
  let objCenter = obj.top + (obj.height * obj.scaleY) / 2;
  let canvasCenter = properties.top + properties.height / 2;
  return (
    objCenter > canvasCenter - snapZone && objCenter < canvasCenter + snapZone
  );
}

function isObjectLeft(obj) {
  let objPos = obj.left;
  let canvasPos = properties.left;
  return objPos < canvasPos + snapZone && objPos > canvasPos - snapZone;
}

function isObjectTop(obj) {
  let objPos = obj.top;
  let canvasPos = properties.top;
  return objPos < canvasPos + snapZone && objPos > canvasPos - snapZone;
}

function isObjectBottom(obj) {
  let objPos = obj.top + obj.height * obj.scaleY;
  let canvasPos = properties.top + properties.height;
  return objPos < canvasPos + snapZone && objPos > canvasPos - snapZone;
}

function isObjectRight(obj) {
  let objPos = obj.left + obj.width * obj.scaleX;
  let canvasPos = properties.left + properties.width;
  return objPos < canvasPos + snapZone && objPos > canvasPos - snapZone;
}

export { initEvents, zoom };
