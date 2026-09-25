/* PoseImageNet landing page — rendering.
   Charts are drawn as inline SVG from data/site-data.js so the page works
   offline and every number comes from one place. */

(function () {
  "use strict";

  var DATA = window.POSEIMAGENET_DATA;
  if (!DATA) { return; }

  var C = {
    ink: "#14181d", ink2: "#4a5361", ink3: "#8a93a1",
    rule: "#e4e7ec", accent: "#1b4f8f", accent2: "#3d7dc4", accentSoft: "#dbe6f4",
    bar: "#1b4f8f", barAlt: "#9fb6d4"
  };

  function el(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function fmt(n) { return Number(n).toLocaleString("en-US"); }

  /* round a maximum up to a readable axis value */
  function niceMax(v) {
    if (v <= 0) { return 1; }
    var steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
    var p = Math.pow(10, Math.floor(Math.log10(v)));
    for (var i = 0; i < steps.length; i++) {
      if (v <= steps[i] * p + 1e-9) { return steps[i] * p; }
    }
    return 10 * p;
  }

  /* deterministic PRNG so a thumbnail never changes between reloads */
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  /* ───────────────────────────── header ───────────────────────────── */

  function renderHead() {
    var h = DATA.headline;
    var stats = [
      [fmt(h.prototypes), "structure prototypes"],
      [fmt(h.objectPoses), "object poses"],
      [fmt(h.semanticClasses), "semantic classes"],
      [h.superclasses, "superclasses"],
      [h.keypoints[0] + "–" + h.keypoints[1], "keypoints per prototype"]
    ];
    el("statbar").innerHTML = stats.map(function (s) {
      return '<div class="stat"><div class="v">' + esc(s[0]) +
        '</div><div class="k">' + esc(s[1]) + "</div></div>";
    }).join("");

    el("buildInfo").textContent =
      "Build " + DATA.meta.version + " · updated " + DATA.meta.updated;
  }

  /* ─────────────────────── chart: horizontal bars ─────────────────────── */

  function barChart(host, rows) {
    /* narrow viewports get a stacked layout: label and value on one line, the bar
       beneath it — side-by-side labels leave no room for the plot itself */
    var W = Math.max(280, host.clientWidth || 900);
    var compact = W < 620;
    var padL = compact ? 0 : 218;
    var padR = compact ? 0 : 78;
    var padT = compact ? 6 : 8;
    var padB = compact ? 34 : 42;
    var rowH = compact ? 56 : 40;
    var H = padT + rows.length * rowH + padB;
    var iw = W - padL - padR;
    var max = niceMax(Math.max.apply(null, rows.map(function (r) { return r.value; })));
    var out = ['<svg viewBox="0 0 ' + W + " " + H + '" role="img">'];

    out.push("<title>Prototypes per superclass</title>");

    for (var t = 0; t <= 4; t++) {
      var v = max * t / 4;
      var gx = padL + (t / 4) * iw;
      var anchor = compact ? (t === 0 ? "start" : (t === 4 ? "end" : "middle")) : "middle";
      out.push('<line x1="' + gx + '" y1="' + padT + '" x2="' + gx + '" y2="' +
        (H - padB + 6) + '" stroke="' + (t === 0 ? C.rule : "#f1f3f6") + '" stroke-width="1"/>');
      out.push('<text x="' + gx + '" y="' + (H - padB + 22) + '" text-anchor="' + anchor +
        '" font-size="11.5" fill="' + C.ink3 + '">' + fmt(Math.round(v)) + "</text>");
    }

    rows.forEach(function (r, i) {
      var cy = padT + i * rowH + rowH / 2;
      var w = Math.max(3, (r.value / max) * iw);
      var tip = "<title>" + esc(r.label + " — " + fmt(r.value) + " prototypes, " +
        fmt(r.sub2) + " semantic classes, " + fmt(r.sub3) + " object poses") + "</title>";

      out.push("<g>" + tip);
      if (compact) {
        out.push('<text x="0" y="' + (cy - 18) + '" font-size="12.5" fill="' + C.ink + '">' +
          esc(r.label) + "</text>");
        out.push('<text x="' + W + '" y="' + (cy - 18) +
          '" text-anchor="end" font-size="12.5" font-weight="600" fill="#14375f">' +
          fmt(r.value) + "</text>");
        out.push('<text x="0" y="' + (cy - 3) + '" font-size="10.5" fill="' + C.ink3 + '">' +
          fmt(r.sub2) + " classes · " + fmt(r.sub3) + " object poses</text>");
        out.push('<rect x="0" y="' + (cy + 8) + '" width="' + w +
          '" height="14" rx="3" fill="' + C.bar + '"/>');
      } else {
        out.push('<text x="0" y="' + (cy - 7) + '" font-size="13.5" fill="' + C.ink + '">' +
          esc(r.label) + "</text>");
        out.push('<text x="0" y="' + (cy + 11) + '" font-size="11.5" fill="' + C.ink3 + '">' +
          fmt(r.sub2) + " classes · " + fmt(r.sub3) + " object poses</text>");
        out.push('<rect x="' + padL + '" y="' + (cy - 9) + '" width="' + w +
          '" height="18" rx="3" fill="' + C.bar + '"/>');
        out.push('<text x="' + (padL + w + 10) + '" y="' + cy +
          '" dominant-baseline="central" font-size="13" font-weight="600" fill="#14375f">' +
          fmt(r.value) + "</text>");
      }
      out.push("</g>");
    });

    out.push("</svg>");
    host.innerHTML = out.join("");
  }

  /* ─────────────────────── chart: histogram ─────────────────────── */

  function histChart(host, spec, showValues) {
    var W = Math.max(240, host.clientWidth || 300);
    var H = 236, padL = 40, padR = 8, padT = 22, padB = 46;
    var n = spec.bins.length;
    var iw = W - padL - padR, ih = H - padT - padB;
    var max = niceMax(Math.max.apply(null, spec.counts));
    var bw = iw / n;
    var barW = Math.max(4, bw - Math.min(7, bw * 0.3));
    var out = ['<svg viewBox="0 0 ' + W + " " + H + '" role="img">'];
    out.push("<title>" + esc(spec.xLabel) + "</title>");

    /* y gridlines */
    [0, 0.5, 1].forEach(function (f) {
      var y = padT + ih - f * ih;
      out.push('<line x1="' + padL + '" y1="' + y + '" x2="' + (W - padR) + '" y2="' + y +
        '" stroke="' + (f === 0 ? C.rule : "#f1f3f6") + '" stroke-width="1"/>');
      out.push('<text x="' + (padL - 8) + '" y="' + y + '" text-anchor="end" ' +
        'dominant-baseline="central" font-size="11" fill="' + C.ink3 + '">' +
        fmt(Math.round(max * f)) + "</text>");
    });

    spec.counts.forEach(function (c, i) {
      var h = Math.max(1, (c / max) * ih);
      var x = padL + i * bw + (bw - barW) / 2;
      var y = padT + ih - h;
      out.push("<g><title>" + esc(spec.bins[i] + " → " + fmt(c) + " " + spec.unit) + "</title>");
      out.push('<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW.toFixed(1) +
        '" height="' + h.toFixed(1) + '" rx="2" fill="' + C.bar + '"/>');
      if (showValues) {
        out.push('<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (y - 7).toFixed(1) +
          '" text-anchor="middle" font-size="11" fill="' + C.ink2 + '">' + fmt(c) + "</text>");
      }
      out.push("</g>");
    });

    /* x ticks — keep a label whenever it would not touch the previous one, and
       always keep one on the final bin (bin widths differ, so widths drive this) */
    function labelHalf(i) { return (String(spec.bins[i]).length * 5.8 + 3) / 2; }
    function labelCx(i) { return padL + i * bw + bw / 2; }

    var idx = [], rightEdge = -1e9;
    for (var i = 0; i < n; i++) {
      if (labelCx(i) - labelHalf(i) <= rightEdge + 3) { continue; }
      idx.push(i);
      rightEdge = labelCx(i) + labelHalf(i);
    }
    if (idx.length === 0 || idx[idx.length - 1] !== n - 1) {
      while (idx.length) {
        var p = idx[idx.length - 1];
        if (labelCx(n - 1) - labelHalf(n - 1) > labelCx(p) + labelHalf(p) + 3) { break; }
        idx.pop();
      }
      idx.push(n - 1);
    }
    idx.forEach(function (i) {
      out.push('<text x="' + labelCx(i).toFixed(1) + '" y="' + (H - padB + 20) +
        '" text-anchor="middle" font-size="10.5" fill="' + C.ink3 + '">' +
        esc(spec.bins[i]) + "</text>");
    });

    out.push('<text x="' + (padL + iw / 2).toFixed(1) + '" y="' + (H - 8) +
      '" text-anchor="middle" font-size="11.5" fill="' + C.ink3 + '">' +
      esc(spec.xLabel) + "</text>");
    out.push("</svg>");
    host.innerHTML = out.join("");
  }

  /* ───────────────────────────── statistics ───────────────────────────── */

  function superRows() {
    return DATA.superclasses.slice().sort(function (a, b) {
      return b.prototypes - a.prototypes;
    }).map(function (s) {
      return {
        label: s.name, value: s.prototypes,
        sub2: s.semanticClasses, sub3: s.objectPoses
      };
    });
  }

  function drawCharts() {
    barChart(el("chartSuper"), superRows());
    histChart(el("chartKp"), DATA.charts.keypoints, false);
    histChart(el("chartPc"), DATA.charts.prototypesPerClass, false);
  }

  function renderCharts() {
    drawCharts();

    var ch = DATA.charts;
    el("mainSub").textContent = fmt(DATA.headline.prototypes) +
      " prototypes across " + DATA.headline.superclasses + " superclasses";
    el("kpSub").textContent = "range " + ch.keypoints.bins[0] + "–" +
      ch.keypoints.bins[ch.keypoints.bins.length - 1] + " keypoints";
    el("pcSub").textContent = fmt(ch.prototypesPerClass.total) + " semantic classes";
  }

  /* ───────────────────────────── samples ───────────────────────────── */

  function thumbSVG(seed, k) {
    var rnd = mulberry32(seed);
    var rot = rnd() * Math.PI * 2;
    var pts = [];
    for (var i = 0; i < k; i++) {
      var a = rot + (i / k) * Math.PI * 2 + (rnd() - 0.5) * 0.24;
      var r = 21 + rnd() * 13;
      var sq = 0.74 + rnd() * 0.44;
      pts.push([50 + Math.cos(a) * r, 50 + Math.sin(a) * r * sq]);
    }
    /* silhouette = the same polygon pushed outwards, so keypoints sit inside */
    var sil = pts.map(function (p) {
      return [(50 + (p[0] - 50) * 1.2).toFixed(1), (50 + (p[1] - 50) * 1.2).toFixed(1)];
    }).map(function (p) { return p[0] + "," + p[1]; }).join(" ");

    var edges = pts.map(function (p, i) {
      var q = pts[(i + 1) % pts.length];
      return '<line x1="' + p[0].toFixed(1) + '" y1="' + p[1].toFixed(1) +
        '" x2="' + q[0].toFixed(1) + '" y2="' + q[1].toFixed(1) +
        '" stroke="#8fb3d9" stroke-width="1"/>';
    }).join("");

    var dots = pts.map(function (p) {
      return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) +
        '" r="2.5" fill="#1b4f8f"/>';
    }).join("");

    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="100" height="100" fill="#f2f4f7"/>' +
      '<polygon points="' + sil + '" fill="#e0e5eb" stroke="#ccd4dd" stroke-width="1"/>' +
      edges + dots + "</svg>";
  }

  function renderGallery() {
    el("gallery").innerHTML = DATA.gallery.map(function (row) {
      var thumbs = row.samples.map(function (s) {
        var imageSrc = s.src;
        if (imageSrc && DATA.meta.galleryVersion) {
          imageSrc += "?v=" + encodeURIComponent(DATA.meta.galleryVersion);
        }
        var inner = s.src
          ? '<img src="' + esc(imageSrc) + '" width="256" height="256" alt="' + esc(s.prototype) + '">'
          : thumbSVG(s.seed, s.keypoints);
        var title = s.prototype + " · " + s.keypoints + " keypoints · " +
          fmt(s.objectPoses) + " object poses";
        return '<div class="thumb" title="' + esc(title) + '">' + inner + "</div>";
      }).join("");
      return '<div class="gal-row">' +
        '<div class="gal-meta">' +
        '<div class="sup">' + esc(row.superclass) + "</div>" +
        '<div class="proto">' + esc(row.semanticClass) + "</div>" +
        '<div class="kp">' + fmt(row.prototypeCount) + " prototypes · " +
        fmt(row.objectPoses) + " object poses</div>" +
        "</div>" +
        '<div class="gal-thumbs">' + thumbs + "</div>" +
        "</div>";
    }).join("");
  }

  /* ───────────────────────────── citation ───────────────────────────── */

  var LOADER = [
    "import json",
    "import numpy as np",
    "",
    'd = json.load(open("poseimagenet.json"))',
    "",
    'ann   = d["annotations"][0]',
    'proto = next(c for c in d["categories"] if c["id"] == ann["category_id"])',
    "",
    "# keypoints is a flat [x1, y1, v1, x2, y2, v2, ...] array",
    'kp  = np.array(ann["keypoints"], dtype=float).reshape(-1, 3)',
    "xy  = kp[:, :2]                 # (K, 2) image coordinates",
    "vis = kp[:, 2].astype(int)      # per-keypoint visibility",
    "",
    'print(proto["name"])            # structure prototype',
    'print(proto["supercategory"])   # semantic class',
    "print(xy.shape)                 # (K, 2)"
  ].join("\n");

  function renderCitation() {
    el("citeNote").textContent =
      "If you find PoseImageNet useful in your research, please cite our paper.";
    el("bibtex").textContent = DATA.paper.bibtex;
    el("loaderCode").textContent = LOADER;

    var btn = el("copyBtn");
    btn.addEventListener("click", function () {
      var text = DATA.paper.bibtex;
      function done() {
        btn.textContent = "Copied";
        btn.classList.add("done");
        setTimeout(function () {
          btn.textContent = "Copy";
          btn.classList.remove("done");
        }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  }

  /* ───────────────────────────── boot ───────────────────────────── */

  function renderAll() {
    renderHead();
    renderCharts();
    renderGallery();
    renderCitation();
  }

  /* charts are sized from their container, so they must be redrawn on resize */
  var timer = null;
  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(drawCharts, 140);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAll);
  } else { renderAll(); }
})();
