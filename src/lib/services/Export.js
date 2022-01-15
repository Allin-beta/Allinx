import { canvas, properties } from "./Canvas";
import $ from "jquery";
import { addGrid, removeGrid } from "./Guides";
import { saveAs } from "file-saver";

function save(format) {
  removeGrid();
  switch (format) {
    case "png":
      savePNG();
      break;
    case "svg":
      saveSVG();
      break;
    case "json":
      saveJSON();
      break;
    default:
      savePNG();
      break;
  }
  addGrid();
}

function savePNG() {
  // fitToScreen();
  download(
    canvas.toDataURL({
      format: "png",
      left: properties.left + 1,
      top: properties.top + 1,
      width: properties.width - 1,
      height: properties.height - 1,
    }),
    "project.png"
  );
}

function saveSVG() {
  // fitToScreen();
  let dataURL = canvas.toSVG({
    viewBox: {
      x: properties.left + 1,
      y: properties.top + 1,
      width: properties.width - 1,
      height: properties.height - 1,
    },
    width: properties.width - 1,
    height: properties.height - 1,
  });
  saveAs(new Blob([dataURL], { type: "image/svg+xml" }), "project.svg");
}

function saveJSON() {
  // fitToScreen();
  let json = JSON.stringify(canvas.toObject(["id"]));
  saveAs(
    new Blob([json], { type: "text/plain;charset=utf-8" }),
    "project.json"
  );
}

function download(url, name) {
  $("<a>")
    .attr({
      href: url,
      download: name,
    })[0]
    .click();
}

export { save };
