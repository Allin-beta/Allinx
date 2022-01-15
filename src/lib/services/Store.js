import { importSVG, importJSON, addShape } from "./Inject";
import { save } from "./Export";
import { resetCanvas } from "./Canvas";
import { addGrid, removeGrid } from "./Guides";

let pages = [];
let properties = {
  width: 500,
  height: 500,
  background: "#FFFFFF",
  format: "SVG",
};
let stage = { width: 1440, height: 790 };
let gridShown = true;

var store = {
  pages: pages,
  width: properties.width,
  height: properties.height,
  background: properties.background,
  stage: stage,
  type: properties.format,
  createStore: (params) => {
    Object.assign(store, params);
  },
  import: (content, type, params) => {
    if (type === "svg") importSVG(content, params);
    else if (type === "json") importJSON(content, params);
  },
  add: (type) => {
    addShape(type);
  },
  save: (format) => save(format),
  resetWorkspace: () =>
    resetCanvas(store.width, store.height, store.background),
  toggleGrid: () => {
    if (gridShown) gridShown = removeGrid();
    else gridShown = addGrid();
  },
};

export { store };
