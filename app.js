/* PoseImageNet landing page: offline charts, gallery, and bilingual UI. */
(function () {
  "use strict";

  var DATA = window.POSEIMAGENET_DATA;
  if (!DATA) { return; }

  var C = {
    ink: "#14181d", ink2: "#4a5361", ink3: "#8a93a1",
    rule: "#e4e7ec", bar: "#1b4f8f"
  };
  var STORAGE_KEY = "poseimagenet-language";

  var COPY = {
    en: {
      documentTitle: "PoseImageNet — Pose Estimation for Extensive Classes Based on Rich Structure Prototypes",
      metaDescription: "PoseImageNet is a pose dataset built on ImageNet, covering extensive object classes through rich structure prototypes.",
      downloadHeading: "Open download",
      downloadText: "A single ZIP archive bundles all annotation files (PoseImageNet.json, SampleTrack.json, and the per-prototype category definitions).",
      downloadButton: "Download annotation ZIP",
      downloadNote: "Annotations only — source images are not included. Use SampleTrack.json (above) to restore them.",
      primaryNavigation: "Primary navigation",
      languageSwitcher: "Language",
      navDefinition: "Definition",
      navStatistics: "Statistics",
      navSamples: "Samples",
      navAnnotation: "Annotation",
      navSampleTrack: "SampleTrack",
      navCitation: "Citation",
      heroSubtitle: "Pose Estimation for Extensive Classes Based on Rich Structure Prototypes",
      heroLead: "PoseImageNet is a pose dataset built on ImageNet, covering an unusually wide range of object classes and object structures. Because a single semantic class frequently contains objects that cannot be deformed into one another, the class is partitioned into <b>structure prototypes</b> — subsets of objects that share one keypoint definition. Every object pose in the dataset comes with its keypoint annotation and the prototype label that identifies the deformable set it belongs to.",
      definitionEyebrow: "01 — Definition",
      definitionHeading: "From a semantic class to structure prototypes",
      definitionDek: "A semantic class is first split into subsets by structure, then pose is annotated inside each subset. The split is what makes pose estimation well posed for classes whose objects do not all share one skeleton.",
      definitionCaption: "<b>Figure 1.</b> The Sunscreen semantic class from the Toiletry superclass is divided into three structure prototypes. Each panel shows one prototype through three annotated samples arranged as a triangle. Bidirectional arrows indicate that the samples share one keypoint definition and can deform into one another.",
      statisticsEyebrow: "02 — Statistics",
      statisticsHeading: "Scale and structure of the dataset",
      statisticsDek: "One overview of how the dataset is spread across superclasses, and two views of its structure: how many keypoints a prototype carries, and how many prototypes a semantic class splits into.",
      prototypesPerSuperclass: "Prototypes per superclass",
      keypointsPerPrototype: "Distribution of prototypes by keypoint count",
      prototypesPerSemanticClass: "Distribution of semantic classes by prototype count",
      keypointsDistributionNote: "Each bar counts the structure prototypes with that number of keypoints.",
      prototypeDistributionNote: "Each bar counts the semantic classes containing that number of structure prototypes.",
      prototypeCountAxis: "Number of structure prototypes",
      semanticClassCountAxis: "Number of semantic classes",
      samplesEyebrow: "03 — Samples",
      samplesHeading: "Two prototypes sampled from each superclass",
      samplesDek: "One semantic object class is selected from each of the 13 superclasses. Each row contains two structure prototypes from that class and three object poses from each prototype. Within each group, every pose is deformable into every other: same keypoint count, same keypoint correspondence, different pose.",
      samplesNote: "Skeleton overlays are rendered from the supplied images and their matching keypoint annotation files.",
      annotationEyebrow: "04 — Annotation",
      annotationHeading: "How to read the annotation",
      annotationSvgTitle: "An annotated sample",
      annotationSvgDesc: "One image tile with eight numbered keypoints joined by a skeleton. Each keypoint carries an x, y coordinate and a visibility flag.",
      annotationCaption: "<b>Figure 2.</b> One annotated sample. Keypoints are ordered by semantic index within the prototype, so index <i>i</i> always denotes the same part across every image of that prototype.",
      fieldsHeading: "Fields",
      fieldAnnKey: "Annotation identifier (annotation_id), unique across the dataset.",
      fieldAnnImageId: "The image this annotation belongs to (a key of <code>images</code>).",
      fieldAnnProtoId: "The structure prototype this sample belongs to (a key of <code>category_net</code>).",
      fieldAnnXY: "Flat array <code>[x₁,y₁, x₂,y₂, …]</code> of original-image pixel coordinates; length = <code>keypoint_number × 2</code>.",
      fieldAnnV: "Visibility per keypoint; length = <code>keypoint_number</code>, <code>0</code> = occluded, <code>1</code> = visible.",
      fieldImgKey: "Image identifier (image_id).",
      fieldImgPath: "Relative path from the image root folder to the image file.",
      fieldImgSize: "Original image width and height in pixels.",
      fieldCatKey: "Structure prototype identifier (prototype_category_id).",
      fieldCatKpn: "Number of keypoints defined for this prototype.",
      fieldCatCanon: "The prototype's reference sample, given as an <code>annotation_id</code>.",
      fieldCatSkel: "Connected keypoint pairs, 0-based indices.",
      fieldCatSem: "Name and identifier of the semantic class this prototype belongs to.",
      fieldCatSuper: "Name and identifier of the superclass.",
      loadingAnnotation: "Loading an annotation",
      sampleTrackEyebrow: "05 — SampleTrack",
      sampleTrackHeading: "Restore the full dataset",
      sampleTrackIntro: "<code>SampleTrack.json</code> maps each <code>images[].id</code> to its original image in ImageNet or UniKPT. The keys are strings; use <code>sample_track[str(image_id)]</code> to locate the source.",
      restorePrepareHeading: "Prepare the files",
      restorePrepareText: "Use matching versions of <code>PoseImageNet.json</code> and <code>SampleTrack.json</code>, plus the original ImageNet and UniKPT images.",
      restoreLocateHeading: "Locate each source image",
      restoreLocateText: "Look up the image ID. For <code>ImageNet\\images_train\\…</code>, resolve the remaining path under your ImageNet training folder. Resolve all other paths under the UniKPT images folder.",
      restoreCopyHeading: "Rebuild the image folders",
      restoreCopyText: "Copy every source image to <code>output / images[].file_name</code> and keep both JSON files. The restored images and annotations form the full dataset.",
      sampleTrackExample: "Example: image ID → original relative path",
      restoreRunHeading: "Run the restoration",
      restoreDownload: "Download Python script",
      restoreRunText: "Save the script beside the two JSON files. Replace the source and output folders below, then run with Python 3. The script checks every source file before copying.",
      restoreNote: "Images are copied at their original resolution. Image IDs, keypoint coordinates and skeleton connections stay unchanged.",
      citationEyebrow: "06 — Citation",
      citationNote: "If you find PoseImageNet useful in your research, please cite our paper.",
      copy: "Copy",
      copied: "Copied",
      licenseHeading: "License and attribution",
      licenseText: "Annotations are released for research use only. Images derive from ImageNet and UniKPT; please comply with their respective licenses. If you use PoseImageNet, please cite our papers.",
      contactText: "For any questions, feel free to contact <a href=\"mailto:chen.bys@outlook.com\">chen.bys@outlook.com</a>.",
      contactTextDataset: "If you need the complete dataset (including source images) or have questions about rebuilding it, feel free to contact <a href=\"mailto:chen.bys@outlook.com\">chen.bys@outlook.com</a> as well — I'm happy to share the full data directly.",
      structurePrototypes: "structure prototypes",
      objectPoses: "object poses",
      semanticClasses: "semantic classes",
      superclasses: "superclasses",
      keypointsPerPrototypeStat: "keypoints per prototype",
      build: "Build {version} · updated {date}",
      chartPrototypesPerSuperclass: "Prototypes per superclass",
      prototypes: "prototypes",
      rangeKeypoints: "range {min}–{max} keypoints",
      prototypesAcross: "{count} prototypes across {superclasses} superclasses",
      semanticClassCount: "{count} semantic classes",
      gallerySummary: "{prototypes} shown prototypes · {poses} shown poses",
      galleryPrototype: "Prototype {index}",
      galleryPrototypeMeta: "{keypoints} keypoints · {poses} poses available",
      galleryTooltip: "{prototype} · {keypoints} keypoints · {poses} object poses",
      keypointsAxis: "Keypoints per structure prototype",
      semanticClassAxis: "Structure prototypes per semantic class"
    },
    zh: {
      documentTitle: "PoseImageNet — 基于丰富结构原型的大规模类别姿态估计",
      metaDescription: "PoseImageNet 是一个基于 ImageNet 构建、通过丰富结构原型覆盖广泛物体类别的姿态数据集。",
      downloadHeading: "开放下载",
      downloadText: "一个 ZIP 压缩包包含全部标注文件（PoseImageNet.json、SampleTrack.json，以及各结构原型的类别定义）。",
      downloadButton: "下载标注 ZIP",
      downloadNote: "仅含标注，不含原图。请用上方的 SampleTrack.json 还原图像。",
      primaryNavigation: "主导航",
      languageSwitcher: "语言",
      navDefinition: "定义",
      navStatistics: "统计",
      navSamples: "样例",
      navAnnotation: "标注",
      navSampleTrack: "样本溯源",
      navCitation: "引用",
      heroSubtitle: "基于丰富结构原型的大规模类别姿态估计",
      heroLead: "PoseImageNet 是一个基于 ImageNet 构建的姿态数据集，覆盖范围格外广泛的物体类别与物体结构。由于同一语义类别中经常包含无法相互形变的物体，我们将类别划分为多个<b>结构原型</b>，每个结构原型中的物体共享同一套关键点定义。数据集中的每个物体姿态都带有关键点标注和原型标签，用于标识其所属的可形变集合。",
      definitionEyebrow: "01 — 定义",
      definitionHeading: "从语义类别到结构原型",
      definitionDek: "首先依据结构将一个语义类别拆分为多个子集，再在各子集中进行姿态标注。对于无法共享同一骨架的物体类别，这种拆分使姿态估计成为定义明确的问题。",
      definitionCaption: "<b>图 1。</b> 洗护用品超类下的防晒霜语义类别被划分为三个结构原型。每个框展示一个原型，并包含三个呈三角形排列的标注样本。双向箭头表示组内样本共享同一套关键点定义，可以互相形变。",
      statisticsEyebrow: "02 — 统计",
      statisticsHeading: "数据集的规模与结构",
      statisticsDek: "这里首先概览数据在各超类中的分布，再从两个角度观察其结构：每个原型包含多少关键点，以及每个语义类别被拆分为多少原型。",
      prototypesPerSuperclass: "各超类的原型数量",
      keypointsPerPrototype: "结构原型按关键点数的分布",
      prototypesPerSemanticClass: "语义类别按结构原型数的分布",
      keypointsDistributionNote: "每根柱表示具有对应关键点数的结构原型数量。",
      prototypeDistributionNote: "每根柱表示包含对应原型数的语义类别数量。",
      prototypeCountAxis: "结构原型数量（个）",
      semanticClassCountAxis: "语义类别数量（个）",
      samplesEyebrow: "03 — 样例",
      samplesHeading: "从每个超类中选取两个结构原型",
      samplesDek: "从 13 个超类中各选取一个语义物体类别。每排展示该类别的两个结构原型，每个原型选取三个物体姿态。同一组中的任意姿态都可互相形变：关键点数量相同、关键点对应关系相同、物体姿态不同。",
      samplesNote: "骨架叠加图由所提供的原图及其对应关键点标注文件生成。",
      annotationEyebrow: "04 — 标注",
      annotationHeading: "如何读取标注",
      annotationSvgTitle: "一个标注样例",
      annotationSvgDesc: "一个带有八个编号关键点及连接骨架的图像样例。每个关键点包含 x、y 坐标和可见性标记。",
      annotationCaption: "<b>图 2。</b> 一个标注样例。关键点在原型内按语义索引排序，因此索引 <i>i</i> 在该原型的每张图像中始终表示同一部位。",
      fieldsHeading: "字段",
      fieldAnnKey: "标注标识（annotation_id），全数据集唯一。",
      fieldAnnImageId: "该标注对应的图像（<code>images</code> 的键）。",
      fieldAnnProtoId: "该样本所属的结构原型（<code>category_net</code> 的键）。",
      fieldAnnXY: "原图像素坐标的扁平数组 <code>[x₁,y₁, x₂,y₂, …]</code>；长度 = <code>keypoint_number × 2</code>。",
      fieldAnnV: "每个关键点的可见度；长度 = <code>keypoint_number</code>，<code>0</code> = 遮挡，<code>1</code> = 可见。",
      fieldImgKey: "图像标识（image_id）。",
      fieldImgPath: "从图像根目录到该图像文件的相对路径。",
      fieldImgSize: "原始图像的宽度和高度（像素）。",
      fieldCatKey: "结构原型标识（prototype_category_id）。",
      fieldCatKpn: "该原型定义的关键点数量。",
      fieldCatCanon: "该原型的参考样本，取值为一个 <code>annotation_id</code>。",
      fieldCatSkel: "骨架连线，关键点编号从 0 开始。",
      fieldCatSem: "该原型所属语义类别的名称与 ID。",
      fieldCatSuper: "该原型所属超类的名称与 ID。",
      loadingAnnotation: "加载标注",
      sampleTrackEyebrow: "05 — SampleTrack",
      sampleTrackHeading: "还原完整数据集",
      sampleTrackIntro: "<code>SampleTrack.json</code> 将每个 <code>images[].id</code> 映射到 ImageNet 或 UniKPT 中的原图相对路径。键为字符串，用 <code>sample_track[str(image_id)]</code> 即可查询源图。",
      restorePrepareHeading: "准备文件与原图",
      restorePrepareText: "准备同一版本的 <code>PoseImageNet.json</code>、<code>SampleTrack.json</code>，以及 ImageNet 和 UniKPT 的原始图像。",
      restoreLocateHeading: "按 ID 定位源图",
      restoreLocateText: "用图像 ID 查询映射。<code>ImageNet\\images_train\\…</code> 去掉这两级前缀后，拼接到 ImageNet 训练图像目录；其余路径拼接到 UniKPT 的图像目录。",
      restoreCopyHeading: "还原目录与标注",
      restoreCopyText: "将每张源图复制到 <code>输出目录 / images[].file_name</code>，并保留两份 JSON。还原后的图像与标注共同组成完整数据集。",
      sampleTrackExample: "映射示例：图像 ID → 原图相对路径",
      restoreRunHeading: "运行还原脚本",
      restoreDownload: "下载 Python 脚本",
      restoreRunText: "将脚本放在两份 JSON 所在目录，替换下方的原图路径和输出路径，用 Python 3 运行。脚本会先检查全部源文件，再进行复制。",
      restoreNote: "图片按原始分辨率复制；图像 ID、关键点坐标和骨架连接关系均保持不变。",
      citationEyebrow: "06 — 引用",
      citationNote: "如果 PoseImageNet 对您的研究有所帮助，请引用我们的论文。",
      copy: "复制",
      copied: "已复制",
      licenseHeading: "许可与署名",
      licenseText: "标注仅供科研使用。图像来源于 ImageNet 与 UniKPT，请遵守其各自许可。使用 PoseImageNet 请引用我们的论文。",
      contactText: "如有任何疑问，欢迎随时联系 <a href=\"mailto:chen.bys@outlook.com\">chen.bys@outlook.com</a>。",
      contactTextDataset: "如需获取完整数据集（含原始图像），或对重建数据集有疑问，同样欢迎随时联系 <a href=\"mailto:chen.bys@outlook.com\">chen.bys@outlook.com</a>，我很乐意直接分享完整数据。",
      structurePrototypes: "结构原型",
      objectPoses: "物体姿态",
      semanticClasses: "语义类别",
      superclasses: "超类",
      keypointsPerPrototypeStat: "每个原型的关键点",
      build: "版本 {version} · 更新于 {date}",
      chartPrototypesPerSuperclass: "各超类的原型数量",
      prototypes: "原型",
      rangeKeypoints: "范围 {min}–{max} 个关键点",
      prototypesAcross: "{superclasses} 个超类，共 {count} 个原型",
      semanticClassCount: "{count} 个语义类别",
      gallerySummary: "展示 {prototypes} 个原型 · {poses} 个姿态",
      galleryPrototype: "原型 {index}",
      galleryPrototypeMeta: "{keypoints} 个关键点 · 共 {poses} 个可用姿态",
      galleryTooltip: "{prototype} · {keypoints} 个关键点 · {poses} 个物体姿态",
      keypointsAxis: "每个结构原型的关键点数",
      semanticClassAxis: "每个语义类别的结构原型数"
    }
  };

  var SUPERCLASS_ZH = {
    Animal: "动物", Device: "设备", Vehicle: "车辆", Equipment: "器材",
    Food: "食物", Structure: "构筑物", Furniture: "家具", Plant: "植物",
    Tool: "工具", Plaything: "玩具", Toiletry: "洗护用品",
    "Wear Items": "穿戴用品", Fungus: "真菌"
  };
  var SEMANTIC_CLASS_ZH = {
    meerkat: "狐獴", laptop: "笔记本电脑", oxcart: "牛车", barbell: "杠铃",
    banana: "香蕉", birdhouse: "鸟屋", bassinet: "摇篮", daisy: "雏菊",
    "power drill": "电钻", teddy: "泰迪熊", sunscreen: "防晒霜",
    "running shoe": "跑鞋", agaric: "伞菌"
  };

  var DEFINITION_ZH = {
    "Three structure prototypes from the Sunscreen semantic class, each represented by three deformable samples": "防晒霜语义类别下的三个结构原型，每个原型由三个可形变样本表示",
    "The Sunscreen semantic class belongs to the Toiletry superclass. Three structure prototypes occupy one panel each, and every panel contains three annotated samples arranged as a triangle with bidirectional arrows.": "防晒霜语义类别属于洗护用品超类。三个结构原型各自占一个框，每个框内包含三个呈三角形排列并由双向箭头连接的标注样本。",
    "Semantic class: Sunscreen": "语义类别：防晒霜",
    "Superclass: Toiletry": "超类：洗护用品",
    "Sunscreen · Model 1": "防晒霜 · 模型 1",
    "Sunscreen · Model 2": "防晒霜 · 模型 2",
    "Sunscreen · Model 3": "防晒霜 · 模型 3",
    "12 keypoints · three deformable samples": "12 个关键点 · 3 个可形变样本",
    "18 keypoints · three deformable samples": "18 个关键点 · 3 个可形变样本",
    "16 keypoints · three deformable samples": "16 个关键点 · 3 个可形变样本",
    "8 keypoints · three deformable samples": "8 个关键点 · 3 个可形变样本",
    "One semantic class is split into three structure prototypes; each prototype contains three mutually deformable samples.": "一个语义类别划分为三个结构原型；每个原型包含三个可互相形变的样本。",
    "Three semantic classes from the Device superclass, each represented by three deformable samples": "设备超类下的三个语义类别，每个类别由三个可形变样本表示",
    "Foldable phone, camera, and laptop are three semantic classes in the same Device superclass. Each class occupies one panel containing three clearly different articulation states arranged as a triangle, connected by bidirectional arrows and drawn with a consistent keypoint skeleton.": "折叠手机、相机和笔记本电脑是同一设备超类下的三个语义类别。每个类别独立占一个框，框内三个结构状态差异明显的样本呈三角形排列，并以双向箭头连接且使用一致的关键点骨架。",
    "One superclass with three semantic object classes; each class contains three visually distinct, mutually deformable samples": "一个超类包含三个语义物体类别；每个类别含三个差异明显、可互相形变的小样本",
    "The Device superclass contains three semantic object classes. Each class occupies one panel and is represented by three object samples arranged as a triangle, with bidirectional arrows showing mutual deformation under one shared keypoint definition.": "设备超类包含三个语义物体类别。每个类别独立占一个框，并由三个呈三角形排列的物体样本表示；双向箭头表示它们共享同一套关键点定义且可以互相形变。",
    "Semantic class": "语义类别",
    "Superclass: Device": "超类：设备",
    "Foldable phone": "折叠手机",
    "one 4-keypoint model · three clearly different states": "一个 4 关键点模型 · 三种差异明显的状态",
    "Camera": "相机",
    "one 6-keypoint model · three clearly different states": "一个 6 关键点模型 · 三种差异明显的状态",
    "Laptop": "笔记本电脑",
    "one 8-keypoint model · three clearly different states": "一个 8 关键点模型 · 三种差异明显的状态",
    "lens retracted": "镜头收回",
    "half-extended": "半伸出",
    "fully extended": "完全伸出",
    "fully open": "完全打开",
    "One superclass contains three semantic classes; each class is represented by three mutually deformable samples.": "同一超类包含三个语义类别；每个类别由三个可互相形变的样本表示。",
    "Three superclasses, one semantic class per superclass, three structure prototypes per class, and three deformable samples per prototype": "三个超类；每个超类选择一个语义类别，每个类别含三个结构原型，每个原型含三个可形变样本",
    "Each superclass panel selects one semantic object class and shows three structure prototypes from that class. Every prototype contains three object samples in a triangular arrangement, with bidirectional arrows between samples and a consistent keypoint skeleton.": "每个超类框选择一个语义物体类别，并展示该类别的三个结构原型。每个原型包含三个呈三角形排列的物体样本；样本之间用双向箭头连接，并共享一致的关键点骨架。",
    "Structure prototypes": "结构原型",
    "DEVICE · superclass": "设备 · 超类",
    "Mobile phone · semantic class": "手机 · 语义类别",
    "TOOL · superclass": "工具 · 超类",
    "Scissors · semantic class": "剪刀 · 语义类别",
    "VEHICLE · superclass": "车辆 · 超类",
    "Dump truck · semantic class": "自卸卡车 · 语义类别",
    "Slab phone · 4 keypoints": "直板手机 · 4 个关键点",
    "left / front / right views": "左视 / 正面 / 右视",
    "Clamshell foldable · 6 keypoints": "翻盖折叠手机 · 6 个关键点",
    "Book-style foldable · 8 keypoints": "书本式折叠手机 · 8 个关键点",
    "Standard scissors · 6 keypoints": "普通剪刀 · 6 个关键点",
    "Kitchen shears · 8 keypoints": "厨房剪 · 8 个关键点",
    "Pruning shears · 10 keypoints": "修枝剪 · 10 个关键点",
    "Standard dump truck · 8 keypoints": "标准自卸卡车 · 8 个关键点",
    "Articulated dump truck · 10 keypoints": "铰接式自卸卡车 · 10 个关键点",
    "Mining dump truck · 12 keypoints": "矿用自卸卡车 · 12 个关键点",
    "Foldable phone · 4 keypoints": "折叠手机 · 4 个关键点",
    "closed / half-open / fully open": "闭合 / 半开 / 完全打开",
    "Camera · 6 keypoints": "相机 · 6 个关键点",
    "front / side / top views": "正面 / 侧面 / 俯视",
    "Game controller · 8 keypoints": "游戏手柄 · 8 个关键点",
    "front / angled / top views": "正面 / 斜视 / 俯视",
    "Scissors · 6 keypoints": "剪刀 · 6 个关键点",
    "Hammer · 4 keypoints": "锤子 · 4 个关键点",
    "flat / diagonal / upright": "水平 / 斜置 / 竖直",
    "Pliers · 6 keypoints": "钳子 · 6 个关键点",
    "Excavator · 8 keypoints": "挖掘机 · 8 个关键点",
    "boom low / mid / high": "动臂低位 / 中位 / 高位",
    "Bicycle · 6 keypoints": "自行车 · 6 个关键点",
    "left / three-quarter / front views": "左视 / 3/4 视角 / 正面",
    "Dump truck · 8 keypoints": "自卸卡车 · 8 个关键点",
    "bed down / half-raised / fully raised": "货厢落下 / 半抬升 / 完全抬升",
    closed: "闭合", "half-open": "半开", open: "完全打开",
    front: "正面", side: "侧面", top: "俯视", angled: "斜视",
    flat: "水平", diagonal: "斜置", upright: "竖直",
    low: "低位", mid: "中位", high: "高位", left: "左视", right: "右视",
    "3/4": "3/4 视角", down: "落下", "half-raised": "半抬升", raised: "完全抬升",
    "Each panel: one semantic class splits into three prototypes; each prototype contains three mutually deformable samples.": "每个框：一个语义类别拆分为三个结构原型；每个原型包含三个可互相形变的小样本。"
  };

  var LOADER = {
    en: [
      "import json, os", "import numpy as np", "",
      'd = json.load(open("PoseImageNet.json"))', "",
      'ann_id = "71899"                    # any key of annotations',
      "ann    = d[\"annotations\"][ann_id]",
      'image = d["images"][str(ann["image_id"])]',
      'proto = d["category_net"][str(ann["prototype_category_id"])]', "",
      "K   = proto[\"keypoint_number\"]",
      'xy  = np.array(ann["keypoint_xy"]).reshape(K, 2)   # (K, 2), image coords',
      'vis = np.array(ann["keypoint_v"])                  # 0 occluded, 1 visible', "",
      'img_path = os.path.join("images_files",',
      '                        image["path_from_root_to_image_file"])',
      "print(img_path)",
      'print(image["image_raw_width"], image["image_raw_height"])',
      'print(proto["semantic_category_name"],',
      '      proto["super_semantic_category_name"])',
      'print(proto["skeleton"])          # 0-based keypoint pairs'
    ].join("\n"),
    zh: [
      "import json, os", "import numpy as np", "",
      'd = json.load(open("PoseImageNet.json"))', "",
      'ann_id = "71899"                    # annotations 的任意一个键',
      "ann    = d[\"annotations\"][ann_id]",
      'image = d["images"][str(ann["image_id"])]',
      'proto = d["category_net"][str(ann["prototype_category_id"])]', "",
      "K   = proto[\"keypoint_number\"]",
      'xy  = np.array(ann["keypoint_xy"]).reshape(K, 2)   # (K, 2) 图像坐标',
      'vis = np.array(ann["keypoint_v"])                  # 0 遮挡, 1 可见', "",
      'img_path = os.path.join("images_files",',
      '                        image["path_from_root_to_image_file"])',
      "print(img_path)",
      'print(image["image_raw_width"], image["image_raw_height"])',
      'print(proto["semantic_category_name"],',
      '      proto["super_semantic_category_name"])',
      'print(proto["skeleton"])          # 0 起始的关键点编号对'
    ].join("\n")
  };

  function el(id) { return document.getElementById(id); }
  function esc(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function initialLanguage() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "zh") { return saved; }
    } catch (error) {}
    return "en";
  }

  var LANG = initialLanguage();
  var copyState = "idle";
  var copyResetTimer = null;
  var languageTimer = null;

  function t(key) { return COPY[LANG][key] || COPY.en[key] || key; }
  function fill(key, values) {
    return Object.keys(values).reduce(function (text, name) {
      return text.replace(new RegExp("\\{" + name + "\\}", "g"), values[name]);
    }, t(key));
  }
  function fmt(number) { return Number(number).toLocaleString(LANG === "zh" ? "zh-CN" : "en-US"); }
  function localSuperclass(name) { return LANG === "zh" ? (SUPERCLASS_ZH[name] || name) : name; }
  function localSemanticClass(name) { return LANG === "zh" ? (SEMANTIC_CLASS_ZH[name] || name) : name; }

  function applyStaticCopy() {
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (node) {
      node.innerHTML = t(node.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-content]").forEach(function (node) {
      node.setAttribute("content", t(node.getAttribute("data-i18n-content")));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (node) {
      node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria-label")));
    });
  }

  function prepareDefinitionCopy() {
    document.querySelectorAll(".definition-diagram-v4 > title, .definition-diagram-v4 > desc, .definition-diagram-v4 text").forEach(function (node) {
      var source = node.textContent.trim();
      if (Object.prototype.hasOwnProperty.call(DEFINITION_ZH, source)) {
        node.setAttribute("data-definition-source", source);
      }
    });
  }
  function renderDefinitionCopy() {
    document.querySelectorAll(".definition-diagram-v4 [data-definition-source]").forEach(function (node) {
      var source = node.getAttribute("data-definition-source");
      node.textContent = LANG === "zh" ? DEFINITION_ZH[source] : source;
    });
  }
  function updateLanguageControls() {
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-lang") === LANG));
    });
  }

  function niceMax(value) {
    if (value <= 0) { return 1; }
    var steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
    var power = Math.pow(10, Math.floor(Math.log10(value)));
    for (var i = 0; i < steps.length; i++) {
      if (value <= steps[i] * power + 1e-9) { return steps[i] * power; }
    }
    return 10 * power;
  }
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var value = Math.imul(seed ^ seed >>> 15, 1 | seed);
      value = value + Math.imul(value ^ value >>> 7, 61 | value) ^ value;
      return ((value ^ value >>> 14) >>> 0) / 4294967296;
    };
  }

  function renderHead() {
    var headline = DATA.headline;
    var stats = [
      [fmt(headline.prototypes), t("structurePrototypes")],
      [fmt(headline.objectPoses), t("objectPoses")],
      [fmt(headline.semanticClasses), t("semanticClasses")],
      [fmt(headline.superclasses), t("superclasses")],
      [headline.keypoints[0] + "–" + headline.keypoints[1], t("keypointsPerPrototypeStat")]
    ];
    el("statbar").innerHTML = stats.map(function (stat) {
      return '<div class="stat"><div class="v">' + esc(stat[0]) +
        '</div><div class="k">' + esc(stat[1]) + "</div></div>";
    }).join("");
    el("buildInfo").textContent = fill("build", {
      version: DATA.meta.version,
      date: DATA.meta.updated
    });
  }

  function barChart(host, rows) {
    var W = Math.max(280, host.clientWidth || 900);
    var compact = W < 620;
    var padL = compact ? 0 : 218;
    var padR = compact ? 0 : 78;
    var padT = compact ? 6 : 8;
    var padB = compact ? 34 : 42;
    var rowH = compact ? 56 : 40;
    var H = padT + rows.length * rowH + padB;
    var innerWidth = W - padL - padR;
    var max = niceMax(Math.max.apply(null, rows.map(function (row) { return row.value; })));
    var out = ['<svg viewBox="0 0 ' + W + " " + H + '" role="img">'];

    out.push("<title>" + esc(t("chartPrototypesPerSuperclass")) + "</title>");
    for (var tick = 0; tick <= 4; tick++) {
      var tickValue = max * tick / 4;
      var gx = padL + (tick / 4) * innerWidth;
      var anchor = compact ? (tick === 0 ? "start" : (tick === 4 ? "end" : "middle")) : "middle";
      out.push('<line x1="' + gx + '" y1="' + padT + '" x2="' + gx + '" y2="' +
        (H - padB + 6) + '" stroke="' + (tick === 0 ? C.rule : "#f1f3f6") + '" stroke-width="1"/>');
      out.push('<text x="' + gx + '" y="' + (H - padB + 22) + '" text-anchor="' + anchor +
        '" font-size="11.5" fill="' + C.ink3 + '">' + fmt(Math.round(tickValue)) + "</text>");
    }

    rows.forEach(function (row, index) {
      var cy = padT + index * rowH + rowH / 2;
      var width = Math.max(3, (row.value / max) * innerWidth);
      var tip = LANG === "zh"
        ? row.label + " — " + fmt(row.value) + " 个原型，" + fmt(row.sub2) + " 个语义类别，" + fmt(row.sub3) + " 个物体姿态"
        : row.label + " — " + fmt(row.value) + " prototypes, " + fmt(row.sub2) + " semantic classes, " + fmt(row.sub3) + " object poses";
      out.push("<g><title>" + esc(tip) + "</title>");
      if (compact) {
        out.push('<text x="0" y="' + (cy - 18) + '" font-size="12.5" fill="' + C.ink + '">' + esc(row.label) + "</text>");
        out.push('<text x="' + W + '" y="' + (cy - 18) + '" text-anchor="end" font-size="12.5" font-weight="600" fill="#14375f">' + fmt(row.value) + "</text>");
        out.push('<rect x="0" y="' + (cy + 8) + '" width="' + width + '" height="14" rx="3" fill="' + C.bar + '"/>');
      } else {
        out.push('<text x="0" y="' + (cy - 7) + '" font-size="13.5" fill="' + C.ink + '">' + esc(row.label) + "</text>");
        out.push('<rect x="' + padL + '" y="' + (cy - 9) + '" width="' + width + '" height="18" rx="3" fill="' + C.bar + '"/>');
        out.push('<text x="' + (padL + width + 10) + '" y="' + cy + '" dominant-baseline="central" font-size="13" font-weight="600" fill="#14375f">' + fmt(row.value) + "</text>");
      }
      out.push("</g>");
    });
    out.push("</svg>");
    host.innerHTML = out.join("");
  }

  function histChart(host, spec, showValues) {
    var W = Math.max(240, host.clientWidth || 300);
    var H = 264, padL = 40, padR = 8, padT = 38, padB = 58;
    var axisFontSize = W < 320 ? 10.5 : 11.5;
    var count = spec.bins.length;
    var innerWidth = W - padL - padR, innerHeight = H - padT - padB;
    var max = niceMax(Math.max.apply(null, spec.counts));
    var binWidth = innerWidth / count;
    var barWidth = Math.max(4, binWidth - Math.min(7, binWidth * 0.3));
    var out = ['<svg viewBox="0 0 ' + W + " " + H + '" role="img">'];
    out.push("<title>" + esc(spec.title) + "</title>");
    out.push("<desc>" + esc("X: " + spec.xLabel + "; Y: " + spec.yLabel) + "</desc>");
    out.push('<text x="' + padL + '" y="17" font-size="' + axisFontSize + '" fill="' + C.ink2 + '">' + esc(spec.yLabel) + "</text>");

    [0, 0.5, 1].forEach(function (fraction) {
      var y = padT + innerHeight - fraction * innerHeight;
      out.push('<line x1="' + padL + '" y1="' + y + '" x2="' + (W - padR) + '" y2="' + y + '" stroke="' + (fraction === 0 ? C.rule : "#f1f3f6") + '" stroke-width="1"/>');
      out.push('<text x="' + (padL - 8) + '" y="' + y + '" text-anchor="end" dominant-baseline="central" font-size="11" fill="' + C.ink3 + '">' + fmt(Math.round(max * fraction)) + "</text>");
    });

    spec.counts.forEach(function (value, index) {
      var height = Math.max(1, (value / max) * innerHeight);
      var x = padL + index * binWidth + (binWidth - barWidth) / 2;
      var y = padT + innerHeight - height;
      var unit = LANG === "zh" ? " 个" + spec.unit : " " + spec.unit;
      out.push("<g><title>" + esc(spec.bins[index] + " → " + fmt(value) + unit) + "</title>");
      out.push('<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barWidth.toFixed(1) + '" height="' + height.toFixed(1) + '" rx="2" fill="' + C.bar + '"/>');
      if (showValues) {
        out.push('<text x="' + (x + barWidth / 2).toFixed(1) + '" y="' + (y - 7).toFixed(1) + '" text-anchor="middle" font-size="11" fill="' + C.ink2 + '">' + fmt(value) + "</text>");
      }
      out.push("</g>");
    });

    function labelHalf(index) { return (String(spec.bins[index]).length * 5.8 + 3) / 2; }
    function labelCenter(index) { return padL + index * binWidth + binWidth / 2; }
    var indexes = [], rightEdge = -1e9;
    for (var i = 0; i < count; i++) {
      if (labelCenter(i) - labelHalf(i) <= rightEdge + 3) { continue; }
      indexes.push(i);
      rightEdge = labelCenter(i) + labelHalf(i);
    }
    if (indexes.length === 0 || indexes[indexes.length - 1] !== count - 1) {
      while (indexes.length) {
        var previous = indexes[indexes.length - 1];
        if (labelCenter(count - 1) - labelHalf(count - 1) > labelCenter(previous) + labelHalf(previous) + 3) { break; }
        indexes.pop();
      }
      indexes.push(count - 1);
    }
    indexes.forEach(function (index) {
      out.push('<text x="' + labelCenter(index).toFixed(1) + '" y="' + (H - padB + 20) + '" text-anchor="middle" font-size="10.5" fill="' + C.ink3 + '">' + esc(spec.bins[index]) + "</text>");
    });
    out.push('<text x="' + (padL + innerWidth / 2).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="' + axisFontSize + '" fill="' + C.ink2 + '">' + esc(spec.xLabel) + "</text>");
    out.push("</svg>");
    host.innerHTML = out.join("");
  }

  function superRows() {
    return DATA.superclasses.slice().sort(function (a, b) {
      return b.prototypes - a.prototypes;
    }).map(function (superclass) {
      return {
        label: localSuperclass(superclass.name), value: superclass.prototypes,
        sub2: superclass.semanticClasses, sub3: superclass.objectPoses
      };
    });
  }
  function drawCharts() {
    barChart(el("chartSuper"), superRows());
    histChart(el("chartKp"), {
      bins: DATA.charts.keypoints.bins,
      counts: DATA.charts.keypoints.counts,
      unit: t("prototypes"),
      title: t("keypointsPerPrototype"),
      xLabel: t("keypointsAxis"),
      yLabel: t("prototypeCountAxis")
    }, false);
    histChart(el("chartPc"), {
      bins: DATA.charts.prototypesPerClass.bins,
      counts: DATA.charts.prototypesPerClass.counts,
      unit: t("semanticClasses"),
      title: t("prototypesPerSemanticClass"),
      xLabel: t("semanticClassAxis"),
      yLabel: t("semanticClassCountAxis")
    }, false);
  }
  function renderCharts() {
    drawCharts();
    var charts = DATA.charts;
    el("mainSub").textContent = fill("prototypesAcross", {
      count: fmt(DATA.headline.prototypes),
      superclasses: fmt(DATA.headline.superclasses)
    });
    el("kpSub").textContent = fill("rangeKeypoints", {
      min: charts.keypoints.bins[0],
      max: charts.keypoints.bins[charts.keypoints.bins.length - 1]
    });
    el("pcSub").textContent = fill("semanticClassCount", {
      count: fmt(charts.prototypesPerClass.total)
    });
  }

  function thumbSVG(seed, keypointCount) {
    var random = mulberry32(seed);
    var rotation = random() * Math.PI * 2;
    var points = [];
    for (var i = 0; i < keypointCount; i++) {
      var angle = rotation + (i / keypointCount) * Math.PI * 2 + (random() - 0.5) * 0.24;
      var radius = 21 + random() * 13;
      var scaleY = 0.74 + random() * 0.44;
      points.push([50 + Math.cos(angle) * radius, 50 + Math.sin(angle) * radius * scaleY]);
    }
    var silhouette = points.map(function (point) {
      return [(50 + (point[0] - 50) * 1.2).toFixed(1), (50 + (point[1] - 50) * 1.2).toFixed(1)];
    }).map(function (point) { return point[0] + "," + point[1]; }).join(" ");
    var edges = points.map(function (point, index) {
      var next = points[(index + 1) % points.length];
      return '<line x1="' + point[0].toFixed(1) + '" y1="' + point[1].toFixed(1) + '" x2="' + next[0].toFixed(1) + '" y2="' + next[1].toFixed(1) + '" stroke="#8fb3d9" stroke-width="1"/>';
    }).join("");
    var dots = points.map(function (point) {
      return '<circle cx="' + point[0].toFixed(1) + '" cy="' + point[1].toFixed(1) + '" r="2.5" fill="#1b4f8f"/>';
    }).join("");
    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#f2f4f7"/><polygon points="' + silhouette + '" fill="#e0e5eb" stroke="#ccd4dd" stroke-width="1"/>' + edges + dots + "</svg>";
  }

  function renderGallery() {
    el("gallery").innerHTML = DATA.gallery.map(function (row) {
      var groupedSamples = row.samples.reduce(function (groups, sample) {
        var index = sample.prototypeIndex || 1;
        if (!groups[index]) { groups[index] = []; }
        groups[index].push(sample);
        return groups;
      }, {});
      var prototypeGroups = Object.keys(groupedSamples).sort().map(function (groupKey) {
        var group = groupedSamples[groupKey];
        var representative = group[0];
        var thumbs = group.map(function (sample) {
          var imageSrc = sample.src;
          if (imageSrc && DATA.meta.galleryVersion) {
            imageSrc += "?v=" + encodeURIComponent(DATA.meta.galleryVersion);
          }
          var inner = sample.src
            ? '<img src="' + esc(imageSrc) + '" width="256" height="256" alt="' + esc(sample.prototype) + '">'
            : thumbSVG(sample.seed, sample.keypoints);
          var title = fill("galleryTooltip", {
            prototype: sample.prototype,
            keypoints: fmt(sample.keypoints),
            poses: fmt(sample.objectPoses)
          });
          return '<div class="thumb" title="' + esc(title) + '">' + inner + "</div>";
        }).join("");
        return '<section class="gal-prototype"><div class="gal-prototype-head"><b>' +
          esc(fill("galleryPrototype", { index: groupKey })) + '</b><span>' +
          esc(representative.prototype) + '</span><small>' +
          esc(fill("galleryPrototypeMeta", {
            keypoints: fmt(representative.keypoints),
            poses: fmt(representative.objectPoses)
          })) + '</small></div><div class="gal-prototype-poses">' + thumbs + '</div></section>';
      }).join("");
      return '<div class="gal-row"><div class="gal-meta"><div class="sup">' +
        esc(localSuperclass(row.superclass)) + '</div><div class="proto">' +
        esc(localSemanticClass(row.semanticClass)) + '</div></div><div class="gal-thumbs">' + prototypeGroups + "</div></div>";
    }).join("");
  }

  function renderCitation() {
    el("citeNote").textContent = t("citationNote");
    el("bibtex").textContent = DATA.paper.bibtex + (DATA.paper.extraBibtex ? "\n\n" + DATA.paper.extraBibtex : "");
    var repoBox = el("relatedRepos");
    if (repoBox && DATA.paper.relatedRepos) {
      repoBox.innerHTML = DATA.paper.relatedRepos.map(function (r) {
        return '<div class="repo"><a class="repo-link" href="' + esc(r.href) + '" target="_blank" rel="noopener">' + esc(r.label) + '</a>' +
               '<span class="repo-note">' + esc(r.note) + '</span></div>';
      }).join("");
    }
    el("loaderCode").textContent = LOADER[LANG];
    el("copyBtn").textContent = t(copyState === "copied" ? "copied" : "copy");
  }
  function renderAll() {
    applyStaticCopy();
    renderDefinitionCopy();
    renderHead();
    renderCharts();
    renderGallery();
    renderCitation();
    updateLanguageControls();
  }
  function applyLanguage(language, persist) {
    LANG = language === "zh" ? "zh" : "en";
    document.documentElement.lang = LANG === "zh" ? "zh-CN" : "en";
    if (persist) {
      try { window.localStorage.setItem(STORAGE_KEY, LANG); } catch (error) {}
    }
    renderAll();
  }
  function requestLanguage(language) {
    if (language === LANG || (language !== "en" && language !== "zh")) { return; }
    clearTimeout(languageTimer);
    document.body.classList.add("i18n-switching");
    languageTimer = setTimeout(function () {
      applyLanguage(language, true);
      window.requestAnimationFrame(function () {
        document.body.classList.remove("i18n-switching");
      });
    }, 90);
  }

  function copyCitation() {
    var button = el("copyBtn");
    function done() {
      copyState = "copied";
      button.textContent = t("copied");
      button.classList.add("done");
      clearTimeout(copyResetTimer);
      copyResetTimer = setTimeout(function () {
        copyState = "idle";
        button.textContent = t("copy");
        button.classList.remove("done");
      }, 1600);
    }
    function fallback() {
      var textarea = document.createElement("textarea");
      textarea.value = el("bibtex").textContent;
      document.body.appendChild(textarea);
      textarea.select();
      try { document.execCommand("copy"); done(); } catch (error) {}
      document.body.removeChild(textarea);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el("bibtex").textContent).then(done, fallback);
    } else {
      fallback();
    }
  }

  function bindEvents() {
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
        requestLanguage(button.getAttribute("data-lang"));
      });
    });
    el("copyBtn").setAttribute("aria-live", "polite");
    el("copyBtn").addEventListener("click", copyCitation);

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawCharts, 140);
    });
  }
  function boot() {
    prepareDefinitionCopy();
    bindEvents();
    applyLanguage(LANG, false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
