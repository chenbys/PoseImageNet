const fs = require("fs");
const path = require("path");
const PptxGenJS = require("pptxgenjs");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const match = html.match(
  /<svg class="definition-diagram definition-diagram-v4"[\s\S]*?<\/svg>/
);

if (!match) {
  throw new Error("Definition V4 SVG was not found in index.html");
}

const svgMarkup = match[0].replace(
  'class="definition-diagram definition-diagram-v4" ',
  ""
);
const svg = svgMarkup.replace(
  /href="(assets\/[^"?#]+\.(?:png|jpe?g))"/gi,
  (source, relativePath) => {
    const imagePath = path.join(root, ...relativePath.split("/"));
    const extension = path.extname(imagePath).toLowerCase();
    const mime = extension === ".png" ? "image/png" : "image/jpeg";
    const encoded = fs.readFileSync(imagePath).toString("base64");
    return `href="data:${mime};base64,${encoded}"`;
  }
);
const svgPath = path.join(root, "assets", "definition-prototypes.svg");
const pptxPath = path.join(root, "assets", "definition-prototypes.pptx");

fs.writeFileSync(svgPath, svg, "utf8");

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "DEFINITION", width: 12.4, height: 5.6 });
pptx.layout = "DEFINITION";
pptx.author = "PoseImageNet";
pptx.company = "PoseImageNet";
pptx.subject = "Definition figure";
pptx.title = "Structure prototypes";
pptx.lang = "en-US";

const slide = pptx.addSlide();
slide.background = { color: "FFFFFF" };
slide.addImage({
  data: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
  x: 0,
  y: 0,
  w: 12.4,
  h: 5.6,
});

pptx.writeFile({ fileName: pptxPath }).then(() => {
  console.log(path.relative(root, svgPath));
  console.log(path.relative(root, pptxPath));
});
