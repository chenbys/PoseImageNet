import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith("--")) continue;
    if (key === "--dry-run") {
      args.dryRun = true;
    } else {
      args[key.slice(2)] = argv[i + 1];
      i += 1;
    }
  }
  return args;
}

function parseCsvLine(line) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (ch === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += ch;
    }
  }
  cells.push(cell);
  return cells;
}

function readCsv(file) {
  const lines = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trim().split(/\r?\n/);
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]));
  });
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function titleCase(value) {
  return String(value).replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function slug(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function semanticClass(category) {
  return /unikpt/i.test(category.info ?? "") ? category.name : category.supercategory;
}

function imageStem(fileName) {
  return path.basename(fileName, path.extname(fileName)).toLowerCase();
}

function overlayStem(fileName) {
  return fileName.replace(/_2_pose_overlay\.[^.]+$/i, "").toLowerCase();
}

function countBins(values, min, max) {
  const counts = new Map();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  const bins = [];
  const result = [];
  for (let value = min; value <= max; value += 1) {
    bins.push(String(value));
    result.push(counts.get(value) ?? 0);
  }
  return { bins, counts: result };
}

const args = parseArgs(process.argv);
const required = ["annotations", "mapping", "images"];
const missingArgs = required.filter((key) => !args[key]);
if (missingArgs.length) {
  throw new Error(`Missing required arguments: ${missingArgs.map((key) => `--${key}`).join(", ")}`);
}

const root = process.cwd();
const outputFile = path.resolve(root, args.output ?? "data/site-data.js");
const galleryDir = path.resolve(root, args.galleryOutput ?? "assets/img/gallery");
const annotations = JSON.parse(fs.readFileSync(path.resolve(args.annotations), "utf8"));
const mappingRows = readCsv(path.resolve(args.mapping));

const mappingByClass = new Map();
const superclassOrder = [];
for (const row of mappingRows) {
  const classKey = normalize(row.real_category_name);
  const superclass = row.superclass.trim();
  if (!classKey || !superclass) continue;
  if (mappingByClass.has(classKey) && mappingByClass.get(classKey) !== superclass) {
    throw new Error(`Conflicting superclass mapping for ${row.real_category_name}`);
  }
  mappingByClass.set(classKey, superclass);
  if (!superclassOrder.includes(superclass)) superclassOrder.push(superclass);
}

const categoriesById = new Map(annotations.categories.map((category) => [category.id, category]));
const annotationsByCategory = new Map();
const annotationsByImage = new Map();
for (const annotation of annotations.annotations) {
  if (!annotationsByCategory.has(annotation.category_id)) annotationsByCategory.set(annotation.category_id, []);
  if (!annotationsByImage.has(annotation.image_id)) annotationsByImage.set(annotation.image_id, []);
  annotationsByCategory.get(annotation.category_id).push(annotation);
  annotationsByImage.get(annotation.image_id).push(annotation);
}

function keypointCount(category) {
  if (Array.isArray(category.keypoints) && category.keypoints.length) return category.keypoints.length;
  const first = annotationsByCategory.get(category.id)?.[0];
  return first ? first.keypoints.length / 3 : 0;
}

function superclassFor(category) {
  const semantic = semanticClass(category);
  const superclass = mappingByClass.get(normalize(semantic));
  if (!superclass) throw new Error(`No superclass mapping for category ${category.id}: ${semantic}`);
  return superclass;
}

for (const category of annotations.categories) superclassFor(category);

const classPrototypeCounts = new Map();
const superclassStats = new Map(superclassOrder.map((name) => [name, {
  name,
  semanticClasses: new Set(),
  prototypes: 0,
  objectPoses: 0
}]));

for (const category of annotations.categories) {
  const semantic = semanticClass(category);
  const classKey = normalize(semantic);
  const superclass = superclassFor(category);
  const stats = superclassStats.get(superclass);
  stats.semanticClasses.add(classKey);
  stats.prototypes += 1;
  classPrototypeCounts.set(classKey, (classPrototypeCounts.get(classKey) ?? 0) + 1);
}

for (const annotation of annotations.annotations) {
  const category = categoriesById.get(annotation.category_id);
  superclassStats.get(superclassFor(category)).objectPoses += 1;
}

const keypointValues = annotations.categories.map(keypointCount);
const keypointMin = Math.min(...keypointValues);
const keypointMax = Math.max(...keypointValues);
const keypointBins = countBins(keypointValues, keypointMin, keypointMax);
const prototypesPerClassValues = [...classPrototypeCounts.values()];
const prototypesPerClassMin = Math.min(...prototypesPerClassValues);
const prototypesPerClassMax = Math.max(...prototypesPerClassValues);
const prototypesPerClassBins = countBins(
  prototypesPerClassValues,
  prototypesPerClassMin,
  prototypesPerClassMax
);

const imagesByCategoryAndStem = new Map();
for (const image of annotations.images) {
  if (!image.category) continue;
  const key = `${normalize(image.category)}\u0000${imageStem(image.file_name)}`;
  if (!imagesByCategoryAndStem.has(key)) imagesByCategoryAndStem.set(key, []);
  imagesByCategoryAndStem.get(key).push(image);
}

const candidatesByCategory = new Map();
for (const entry of fs.readdirSync(path.resolve(args.images), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const className = entry.name;
  const classDir = path.join(path.resolve(args.images), className);
  const overlays = fs.readdirSync(classDir).filter((name) => /_2_pose_overlay\.[^.]+$/i.test(name));
  for (const overlay of overlays) {
    const key = `${normalize(className)}\u0000${overlayStem(overlay)}`;
    const matchedImages = imagesByCategoryAndStem.get(key) ?? [];
    for (const image of matchedImages) {
      for (const annotation of annotationsByImage.get(image.id) ?? []) {
        const category = categoriesById.get(annotation.category_id);
        if (!category || /unikpt/i.test(category.info ?? "")) continue;
        if (normalize(semanticClass(category)) !== normalize(className)) continue;
        if (!candidatesByCategory.has(category.id)) {
          candidatesByCategory.set(category.id, {
            category,
            semantic: semanticClass(category),
            superclass: superclassFor(category),
            files: new Map()
          });
        }
        candidatesByCategory.get(category.id).files.set(
          overlay,
          { source: path.join(classDir, overlay), id: overlayStem(overlay), imageId: image.id }
        );
      }
    }
  }
}

const preferredClasses = {
  animal: ["meerkat", "tiger", "zebra", "red fox"],
  device: ["laptop", "analog clock", "camera", "cellular telephone"],
  tool: ["power drill", "chain saw", "hammer", "screwdriver"],
  "wear items": ["running shoe", "backpack", "jersey", "sunglasses"],
  food: ["banana", "pizza", "cheeseburger", "pineapple"],
  equipment: ["tennis racket", "barbell", "ski", "balance beam"],
  structure: ["barn", "church", "lighthouse", "steel arch bridge"],
  furniture: ["rocking chair", "office chair", "dining table", "bookcase"],
  vehicle: ["sports car", "minivan", "mountain bike", "school bus"],
  toiletry: ["perfume", "hair spray", "soap dispenser", "lotion"],
  fungus: ["agaric", "bolete", "stinkhorn", "earthstar"],
  plant: ["daisy", "sunflower", "rapeseed", "corn"],
  plaything: ["kite", "teddy", "jigsaw puzzle", "soccer ball"]
};

function compareClasses(a, b, superclass) {
  const preferred = preferredClasses[normalize(superclass)] ?? [];
  const aPreferred = preferred.indexOf(normalize(a.semantic));
  const bPreferred = preferred.indexOf(normalize(b.semantic));
  const aRank = aPreferred < 0 ? Number.MAX_SAFE_INTEGER : aPreferred;
  const bRank = bPreferred < 0 ? Number.MAX_SAFE_INTEGER : bPreferred;
  if (aRank !== bRank) return aRank - bRank;
  if (b.prototypes.length !== a.prototypes.length) return b.prototypes.length - a.prototypes.length;
  if (b.objectPoses !== a.objectPoses) return b.objectPoses - a.objectPoses;
  return a.semantic.localeCompare(b.semantic);
}

const classesWithImages = new Map();
for (const candidate of candidatesByCategory.values()) {
  const key = `${candidate.superclass}\u0000${normalize(candidate.semantic)}`;
  if (!classesWithImages.has(key)) {
    classesWithImages.set(key, {
      superclass: candidate.superclass,
      semantic: candidate.semantic,
      prototypes: [],
      objectPoses: 0
    });
  }
  const grouped = classesWithImages.get(key);
  grouped.prototypes.push(candidate);
  grouped.objectPoses += annotationsByCategory.get(candidate.category.id)?.length ?? 0;
}

const gallery = [];
const selectedFiles = [];
for (const superclass of superclassOrder) {
  const eligible = [...classesWithImages.values()]
    .filter((candidate) => candidate.superclass === superclass && candidate.prototypes.length >= 6)
    .sort((a, b) => compareClasses(a, b, superclass));
  if (!eligible.length) {
    const best = [...classesWithImages.values()]
      .filter((candidate) => candidate.superclass === superclass)
      .sort((a, b) => b.prototypes.length - a.prototypes.length)
      .slice(0, 10)
      .map((candidate) => `${candidate.semantic}:${candidate.prototypes.length}`)
      .join(", ");
    throw new Error(`No semantic class with six prototype images for superclass ${superclass}. Best: ${best}`);
  }
  const selected = eligible[0];
  const prototypes = selected.prototypes
    .sort((a, b) => {
      const aPoses = annotationsByCategory.get(a.category.id)?.length ?? 0;
      const bPoses = annotationsByCategory.get(b.category.id)?.length ?? 0;
      return bPoses - aPoses || a.category.id - b.category.id;
    })
    .slice(0, 6);
  const superclassSlug = slug(superclass);
  const samples = prototypes.map((prototype, index) => {
    const files = [...prototype.files.values()].sort((a, b) => {
      const aCanonical = a.imageId === prototype.category.canonical_sample_id ? 0 : 1;
      const bCanonical = b.imageId === prototype.category.canonical_sample_id ? 0 : 1;
      return aCanonical - bCanonical || a.id.localeCompare(b.id);
    });
    const file = files[0];
    const targetName = `${superclassSlug}-${prototype.category.id}-${index + 1}.jpg`;
    const target = path.join(galleryDir, targetName);
    selectedFiles.push({ source: file.source, target });
    return {
      id: file.id,
      prototype: prototype.category.name,
      keypoints: keypointCount(prototype.category),
      objectPoses: annotationsByCategory.get(prototype.category.id)?.length ?? 0,
      seed: prototype.category.id * 100 + index,
      src: `assets/img/gallery/${targetName}`
    };
  });
  gallery.push({
    superclass: titleCase(superclass),
    semanticClass: selected.semantic,
    prototypeCount: classPrototypeCounts.get(normalize(selected.semantic)),
    objectPoses: selected.objectPoses,
    samples
  });
}

let paper = {};
if (fs.existsSync(outputFile)) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(outputFile, "utf8"), sandbox);
  paper = sandbox.window.POSEIMAGENET_DATA?.paper ?? {};
}

const updated = args.date ?? new Date().toISOString().slice(0, 10);
const siteData = {
  meta: {
    version: `data-${updated}`,
    updated,
    placeholder: true,
    note: "Dataset statistics, superclass mapping, and gallery images are generated from the provided final annotations. Definition and annotation figures remain preview illustrations."
  },
  paper,
  headline: {
    prototypes: annotations.categories.length,
    objectPoses: annotations.annotations.length,
    semanticClasses: classPrototypeCounts.size,
    superclasses: superclassStats.size,
    keypoints: [keypointMin, keypointMax]
  },
  superclasses: [...superclassStats.values()].map((stats) => ({
    name: titleCase(stats.name),
    semanticClasses: stats.semanticClasses.size,
    prototypes: stats.prototypes,
    objectPoses: stats.objectPoses
  })),
  charts: {
    keypoints: {
      ...keypointBins,
      total: annotations.categories.length,
      unit: "prototypes",
      xLabel: "keypoints per prototype"
    },
    prototypesPerClass: {
      ...prototypesPerClassBins,
      total: classPrototypeCounts.size,
      unit: "semantic classes",
      xLabel: "prototypes per semantic class"
    }
  },
  gallery
};

const summary = {
  headline: siteData.headline,
  superclasses: siteData.superclasses,
  gallery: gallery.map((row) => ({
    superclass: row.superclass,
    semanticClass: row.semanticClass,
    prototypes: row.prototypeCount,
    objectPoses: row.objectPoses,
    images: row.samples.map((sample) => `${sample.prototype} (${sample.keypoints} kp)`)
  }))
};

if (!args.dryRun) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.mkdirSync(galleryDir, { recursive: true });
  for (const file of selectedFiles) fs.copyFileSync(file.source, file.target);
  const banner = "/* Auto-generated by scripts/build_site_data.mjs — do not edit by hand. */\n";
  fs.writeFileSync(
    outputFile,
    `${banner}window.POSEIMAGENET_DATA = ${JSON.stringify(siteData, null, 2)};\n`,
    "utf8"
  );
}

console.log(JSON.stringify(summary, null, 2));
