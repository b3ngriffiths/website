(function () {
  const SVG = "http://www.w3.org/2000/svg";
  const measureCtx = document.createElement("canvas").getContext("2d");
  let tip;

  function dark() {
    return document.documentElement.dataset.theme === "dark";
  }

  function colorOf(series) {
    return dark() && series.colorDark ? series.colorDark : series.color;
  }

  function measure(text, size, weight) {
    const family = getComputedStyle(document.body).fontFamily || "sans-serif";
    measureCtx.font = `${weight || 450} ${size}px ${family}`;
    return measureCtx.measureText(String(text)).width;
  }

  function format(n, kind) {
    if (n == null || Number.isNaN(n)) return "–";
    if (kind === "compact") return compact(n);
    if (kind === "gbp") return (n < 0 ? "−" : "") + "£" + trim(Math.abs(n), 2);
    if (kind === "percent") return trim(n, 0) + "%";
    if (kind === "int") return Math.round(n).toLocaleString("en-GB");
    return trim(n, 2);
  }

  function trim(n, digits) {
    return n.toLocaleString("en-GB", {
      minimumFractionDigits: 0,
      maximumFractionDigits: digits,
    });
  }

  function compact(n) {
    const sign = n < 0 ? "−" : "";
    const abs = Math.abs(n);
    if (abs >= 1e6) return sign + trim(abs / 1e6, 2) + "m";
    if (abs >= 1000) {
      const v = abs / 1000;
      const digits = v >= 100 ? 0 : v >= 10 ? 1 : 2;
      return sign + trim(v, digits) + "k";
    }
    return sign + trim(abs, 2);
  }

  function relL(hex) {
    const c = hex.replace("#", "");
    const lin = [0, 2, 4].map(function (i) {
      const s = parseInt(c.slice(i, i + 2), 16) / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
  }

  function inkOn(hex) {
    const L = relL(hex);
    const white = 1.05 / (L + 0.05);
    const black = (L + 0.05) / 0.05;
    return white > black ? "#fff" : "#17201c";
  }

  function el(name, attrs) {
    const node = document.createElementNS(SVG, name);
    Object.entries(attrs || {}).forEach(function (pair) {
      if (pair[1] != null) node.setAttribute(pair[0], pair[1]);
    });
    return node;
  }

  function text(parent, str, x, y, o) {
    const node = el("text", {
      x: x,
      y: y,
      fill: (o && o.fill) || "currentColor",
      "font-size": (o && o.size) || 12,
      "font-weight": (o && o.weight) || 450,
      "dominant-baseline": (o && o.baseline) || "auto",
      "text-anchor": (o && o.anchor) || "start",
    });
    node.textContent = str;
    parent.append(node);
    return node;
  }

  function rect(parent, x, y, w, h, o) {
    const node = el("rect", {
      x: Math.round(x),
      y: Math.round(y),
      width: Math.max(0, Math.round(w)),
      height: Math.max(0, Math.round(h)),
      fill: (o && o.fill) || "none",
    });
    if (o && o.class) node.setAttribute("class", o.class);
    parent.append(node);
    return node;
  }

  function niceStep(span) {
    const raw = span / 5 || 1;
    const mag = 10 ** Math.floor(Math.log10(raw));
    const norm = raw / mag;
    const nice = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
    return nice * mag;
  }

  function axis(min, max, pinMin, pinMax) {
    if (min === max) max = min + 1;
    const step = niceStep(max - min);
    let lo = pinMin ? min : Math.floor(min / step) * step;
    let hi = pinMax ? max : Math.ceil(max / step) * step;
    if (hi <= lo) hi = lo + step;
    const ticks = [];
    const start = Math.ceil((lo - 1e-8) / step) * step;
    for (let v = start; v <= hi + step * 1e-6; v += step) {
      const n = Number(v.toFixed(8));
      if (n >= lo - 1e-6 && n <= hi + 1e-6) ticks.push(n);
    }
    return { min: lo, max: hi, ticks: ticks };
  }

  function ensureTip() {
    if (tip) return tip;
    tip = document.createElement("div");
    tip.className = "chart-tip";
    tip.hidden = true;
    document.body.append(tip);
    window.addEventListener("scroll", hideTip, { passive: true });
    return tip;
  }

  function hideTip() {
    if (tip) tip.hidden = true;
  }

  function showTip(title, rows, x, y) {
    const node = ensureTip();
    node.replaceChildren();
    const head = document.createElement("div");
    head.className = "chart-tip-title";
    head.textContent = title;
    node.append(head);
    rows.forEach(function (row) {
      const line = document.createElement("div");
      line.className = "chart-tip-row";
      const swatch = document.createElement("i");
      swatch.style.background = row.color;
      const name = document.createElement("span");
      name.textContent = row.name;
      const value = document.createElement("b");
      value.textContent = row.value;
      line.append(swatch, name, value);
      node.append(line);
    });
    node.hidden = false;
    const box = node.getBoundingClientRect();
    let left = x + 14;
    let top = y + 16;
    if (left + box.width > window.innerWidth - 8) left = x - box.width - 14;
    if (top + box.height > window.innerHeight - 8) top = y - box.height - 16;
    node.style.left = Math.max(8, left) + "px";
    node.style.top = Math.max(8, top) + "px";
  }

  function bindTip(node, title, rows) {
    const show = function (event) {
      showTip(title, rows, event.clientX, event.clientY);
    };
    node.addEventListener("pointerenter", show);
    node.addEventListener("pointermove", show);
    node.addEventListener("pointerleave", hideTip);
  }

  function rowTip(spec, row) {
    return spec.series.map(function (series, i) {
      return {
        color: colorOf(series),
        name: series.name,
        value: format(row.values[i] || 0, spec.format),
      };
    });
  }

  function key(spec) {
    const row = document.createElement("div");
    row.className = "chart-key";
    spec.series.forEach(function (series) {
      const item = document.createElement("span");
      const swatch = document.createElement("i");
      swatch.style.background = colorOf(series);
      item.append(swatch, document.createTextNode(series.name));
      row.append(item);
    });
    return row;
  }

  function tabs(fig, spec) {
    const st = fig._chart;
    const list = document.createElement("div");
    list.className = "chart-tabs";
    list.setAttribute("role", "tablist");
    spec.series.forEach(function (series, i) {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", i === st.tab ? "true" : "false");
      button.tabIndex = i === st.tab ? 0 : -1;
      button.textContent = series.name;
      button.addEventListener("click", function () {
        st.tab = i;
        draw(fig, true);
        const next = fig.querySelectorAll(".chart-tabs button")[i];
        if (next) next.focus();
      });
      list.append(button);
    });
    list.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const dir = event.key === "ArrowRight" ? 1 : -1;
      st.tab = (st.tab + dir + spec.series.length) % spec.series.length;
      draw(fig, true);
      const next = fig.querySelectorAll(".chart-tabs button")[st.tab];
      if (next) next.focus();
    });
    return list;
  }

  function fitTitle(parent, str, x, y, maxW) {
    let size = 12;
    while (size > 9 && measure(str, size, 650) > maxW) size -= 0.5;
    text(parent, str, x, y, { size: size, weight: 650 });
  }

  function renderSplit(svg, spec, width) {
    const rows = spec.rows;
    const series = spec.series;
    const labelW = Math.ceil(Math.max.apply(null, rows.map(function (row) {
      return measure(row.label, 12, 650);
    }))) + 12;
    const gap = width < 460 ? 10 : 16;
    const panelW = (width - labelW - gap * (series.length - 1)) / series.length;
    const showTitles = panelW >= 160;
    const titleH = showTitles ? 22 : 4;
    const rowH = width < 460 ? 22 : 26;
    const height = titleH + rows.length * rowH + 2;
    size(svg, width, height);

    const shared = Math.max.apply(null, rows.flatMap(function (row) {
      return row.values;
    }).concat([1]));

    if (showTitles) {
      series.forEach(function (seriesItem, i) {
        const x = labelW + i * (panelW + gap);
        fitTitle(svg, seriesItem.name, x, 14, panelW - 2);
      });
    }

    const maxes = series.map(function (_, i) {
      const vals = rows.map(function (row) { return row.values[i] || 0; });
      const own = Math.max.apply(null, vals.concat([1]));
      return spec.independent ? own : shared;
    });

    rows.forEach(function (row, ri) {
      const y = titleH + ri * rowH;
      const hover = rect(svg, 0, y, width, rowH, { fill: "transparent" });
      text(svg, row.label, 0, y + rowH / 2, { size: 12, weight: 650, baseline: "middle" });
      series.forEach(function (seriesItem, si) {
        const x = labelW + si * (panelW + gap);
        const value = row.values[si] || 0;
        const bw = (value / maxes[si]) * (panelW - 1);
        const bh = Math.min(15, rowH - 8);
        const by = y + (rowH - bh) / 2;
        const fill = colorOf(seriesItem);
        if (bw > 0) rect(svg, x, by, bw, bh, { fill: fill });
        const label = format(value, spec.format);
        const lw = measure(label, 11, 500);
        const inside = bw > lw + 10;
        text(svg, label, x + 4, by + bh / 2 + 0.5, {
          size: 11,
          weight: 500,
          baseline: "middle",
          fill: inside ? inkOn(fill) : "currentColor",
        });
      });
      const hit = rect(svg, 0, y, width, rowH, { fill: "transparent", class: "chart-hit" });
      const show = function (event) {
        hover.setAttribute("fill", "var(--chart-hover)");
        showTip(row.label, rowTip(spec, row), event.clientX, event.clientY);
      };
      hit.addEventListener("pointerenter", show);
      hit.addEventListener("pointermove", show);
      hit.addEventListener("pointerleave", function () {
        hover.setAttribute("fill", "transparent");
        hideTip();
      });
    });
  }

  function renderHorizontal(svg, spec, width, stacked) {
    const rows = spec.rows;
    const labelW = Math.ceil(Math.max.apply(null, rows.map(function (row) {
      return measure(row.label, 12, 650);
    }))) + 14;
    const totals = rows.map(function (row) {
      return row.values.reduce(function (sum, value) { return sum + (value || 0); }, 0);
    });
    const max = Math.max.apply(null, totals.concat([1]));
    const min = Math.min.apply(null, totals.concat([0]));
    const framed = axis(Math.min(0, min), Math.max(0, max), true, false);
    const endLabel = format(Math.abs(min) > max ? min : max, spec.format);
    const endW = !stacked || spec.total
      ? Math.ceil(measure(endLabel, 12, 500)) + 14
      : 8;
    const plotL = labelW;
    const plotR = width - endW;
    const plotW = Math.max(20, plotR - plotL);
    const axisH = stacked ? 22 : 4;
    const rowH = rows.length > 8 ? 26 : 30;
    const height = axisH + rows.length * rowH + 4;
    size(svg, width, height);

    if (stacked) {
      framed.ticks.forEach(function (tick) {
        const x = plotL + ((tick - framed.min) / (framed.max - framed.min)) * plotW;
        const line = el("line", {
          x1: Math.round(x),
          x2: Math.round(x),
          y1: 16,
          y2: height - 2,
          stroke: "var(--chart-grid)",
          "shape-rendering": "crispEdges",
        });
        svg.append(line);
        const atStart = x - plotL < 4;
        const atEnd = plotR - x < 4;
        text(svg, format(tick, spec.format), x, 11, {
          size: 11,
          fill: "var(--chart-axis)",
          anchor: atEnd ? "end" : atStart ? "start" : "middle",
        });
      });
    }

    if (!stacked && min < 0) {
      const span = (framed.max - framed.min) || 1;
      const zero = plotL + ((0 - framed.min) / span) * plotW;
      svg.append(el("line", {
        x1: Math.round(zero),
        x2: Math.round(zero),
        y1: axisH,
        y2: height - 2,
        stroke: "var(--chart-grid)",
        "shape-rendering": "crispEdges",
      }));
    }

    rows.forEach(function (row, ri) {
      const y = axisH + ri * rowH;
      const hover = rect(svg, 0, y, width, rowH, { fill: "transparent" });
      text(svg, row.label, 0, y + rowH / 2, { size: 12, weight: 650, baseline: "middle" });
      const bh = Math.min(16, rowH - 10);
      const by = y + (rowH - bh) / 2;
      let cursor = plotL;
      if (stacked) {
        row.values.forEach(function (value, si) {
          const bw = ((value || 0) / framed.max) * plotW;
          if (bw > 0) rect(svg, cursor, by, bw, bh, { fill: colorOf(spec.series[si]) });
          cursor += bw;
        });
        if (spec.total) {
          text(svg, format(totals[ri], spec.format), cursor + 6, by + bh / 2 + 0.5, {
            size: 12,
            weight: 500,
            baseline: "middle",
            fill: "var(--chart-axis)",
          });
        }
      } else {
        const value = row.values[0] || 0;
        const scaleMin = min < 0 ? framed.min : 0;
        const scaleMax = min < 0 ? framed.max : max;
        const span = (scaleMax - scaleMin) || 1;
        const xAt = function (v) { return plotL + ((v - scaleMin) / span) * plotW; };
        const fill = value < 0 && spec.series[1] ? colorOf(spec.series[1]) : colorOf(spec.series[0]);
        const x0 = xAt(Math.min(0, value));
        const x1 = xAt(Math.max(0, value));
        if (x1 - x0 > 0) rect(svg, x0, by, x1 - x0, bh, { fill: fill });
        const label = format(value, spec.format);
        const lw = measure(label, 12, 500);
        const outside = value < 0 ? x0 - lw - 6 : x1 + 6;
        const fits = value < 0 ? outside > plotL : outside + lw < plotR;
        text(svg, label, fits ? outside : (value < 0 ? x1 - lw - 6 : x0 + 6), by + bh / 2 + 0.5, {
          size: 12,
          weight: 500,
          baseline: "middle",
          fill: fits ? "currentColor" : inkOn(fill),
        });
      }
      const hit = rect(svg, 0, y, width, rowH, { fill: "transparent", class: "chart-hit" });
      const show = function (event) {
        hover.setAttribute("fill", "var(--chart-hover)");
        showTip(row.label, rowTip(spec, row), event.clientX, event.clientY);
      };
      hit.addEventListener("pointerenter", show);
      hit.addEventListener("pointermove", show);
      hit.addEventListener("pointerleave", function () {
        hover.setAttribute("fill", "transparent");
        hideTip();
      });
    });
  }

  function renderBullet(svg, spec, width) {
    const rows = spec.rows;
    const labelW = Math.ceil(Math.max.apply(null, rows.map(function (row) {
      return measure(row.label, 12, 550);
    }))) + 14;
    const framed = axis(spec.yMin, spec.yMax, true, true);
    const plotL = labelW;
    const plotW = width - plotL - 6;
    const plotR = plotL + plotW;
    const axisH = 22;
    const rowH = 28;
    const height = axisH + rows.length * rowH + 2;
    size(svg, width, height);
    const scale = function (value) {
      return plotL + ((value - framed.min) / (framed.max - framed.min)) * plotW;
    };
    framed.ticks.forEach(function (tick) {
      const x = scale(tick);
      svg.append(el("line", {
        x1: Math.round(x),
        x2: Math.round(x),
        y1: 16,
        y2: height - 2,
        stroke: "var(--chart-grid)",
        "shape-rendering": "crispEdges",
      }));
      const atStart = x - plotL < 4;
      const atEnd = plotR - x < 4;
      text(svg, format(tick, spec.format), x, 11, {
        size: 11,
        fill: "var(--chart-axis)",
        anchor: atEnd ? "end" : atStart ? "start" : "middle",
      });
    });
    rows.forEach(function (row, ri) {
      const y = axisH + ri * rowH;
      const hover = rect(svg, 0, y, width, rowH, { fill: "transparent" });
      text(svg, row.label, 0, y + rowH / 2, { size: 12, weight: 550, baseline: "middle" });
      const outer = Math.min(row.values[0] || 0, framed.max);
      const inner = Math.min(row.values[1] || 0, framed.max);
      const mid = y + rowH / 2;
      rect(svg, plotL, mid - 6, scale(outer) - plotL, 12, { fill: colorOf(spec.series[0]) });
      rect(svg, plotL, mid - 3, scale(inner) - plotL, 6, { fill: colorOf(spec.series[1]) });
      const hit = rect(svg, 0, y, width, rowH, { fill: "transparent", class: "chart-hit" });
      const show = function (event) {
        hover.setAttribute("fill", "var(--chart-hover)");
        showTip(row.label, rowTip(spec, row), event.clientX, event.clientY);
      };
      hit.addEventListener("pointerenter", show);
      hit.addEventListener("pointermove", show);
      hit.addEventListener("pointerleave", function () {
        hover.setAttribute("fill", "transparent");
        hideTip();
      });
    });
  }

  function renderColumns(svg, spec, width, st) {
    const series = spec.series[st.tab || 0];
    const rows = spec.rows;
    const values = rows.map(function (row) { return row.values[st.tab || 0] || 0; });
    const framed = axis(0, Math.max.apply(null, values.concat([1])), true, false);
    const gutter = Math.ceil(Math.max.apply(null, framed.ticks.map(function (tick) {
      return measure(format(tick, spec.format), 11, 450);
    }))) + 10;
    const plotL = gutter;
    const plotR = width - 4;
    const plotW = plotR - plotL;
    const plotH = clamp(width * 0.46, 170, 270);
    const bottom = 28;
    const top = 8;
    const height = top + plotH + bottom;
    size(svg, width, height);
    const yOf = function (value) {
      return top + plotH - ((value - framed.min) / (framed.max - framed.min)) * plotH;
    };
    framed.ticks.forEach(function (tick) {
      const y = Math.round(yOf(tick));
      svg.append(el("line", {
        x1: plotL,
        x2: plotR,
        y1: y,
        y2: y,
        stroke: "var(--chart-grid)",
        "shape-rendering": "crispEdges",
      }));
      text(svg, format(tick, spec.format), plotL - 6, y, {
        size: 11,
        fill: "var(--chart-axis)",
        anchor: "end",
        baseline: "middle",
      });
    });
    const slot = plotW / rows.length;
    const bw = slot * 0.62;
    const bars = [];
    rows.forEach(function (row, i) {
      const value = values[i];
      const x = plotL + i * slot + (slot - bw) / 2;
      const y = yOf(value);
      const bar = rect(svg, x, y, bw, top + plotH - y, { fill: colorOf(series) });
      bars.push(bar);
      text(svg, row.label, x + bw / 2, top + plotH + 16, {
        size: 11,
        fill: "var(--chart-axis)",
        anchor: "middle",
      });
      const hit = rect(svg, plotL + i * slot, top, slot, plotH, { fill: "transparent", class: "chart-hit" });
      const show = function (event) {
        bars.forEach(function (item, index) {
          item.setAttribute("opacity", index === i ? "1" : "0.45");
        });
        showTip(row.label, [{
          color: colorOf(series),
          name: series.name,
          value: format(value, spec.format),
        }], event.clientX, event.clientY);
      };
      hit.addEventListener("pointerenter", show);
      hit.addEventListener("pointermove", show);
      hit.addEventListener("pointerleave", function () {
        bars.forEach(function (item) { item.setAttribute("opacity", "1"); });
        hideTip();
      });
    });
  }

  function monotone(points) {
    const n = points.length;
    if (!n) return "";
    if (n === 1) return "M" + points[0].x + "," + points[0].y;
    const dx = [];
    const slope = [];
    const m = new Array(n).fill(0);
    for (let i = 0; i < n - 1; i++) {
      dx[i] = points[i + 1].x - points[i].x || 1;
      slope[i] = (points[i + 1].y - points[i].y) / dx[i];
    }
    m[0] = slope[0];
    m[n - 1] = slope[n - 2];
    for (let i = 1; i < n - 1; i++) {
      m[i] = slope[i - 1] * slope[i] <= 0 ? 0 : (slope[i - 1] + slope[i]) / 2;
    }
    for (let i = 0; i < n - 1; i++) {
      if (slope[i] === 0) {
        m[i] = 0;
        m[i + 1] = 0;
        continue;
      }
      const a = m[i] / slope[i];
      const b = m[i + 1] / slope[i];
      const h = Math.hypot(a, b);
      if (h > 3) {
        const t = 3 / h;
        m[i] = t * a * slope[i];
        m[i + 1] = t * b * slope[i];
      }
    }
    let d = "M" + points[0].x + "," + points[0].y;
    for (let i = 0; i < n - 1; i++) {
      const c1x = points[i].x + dx[i] / 3;
      const c1y = points[i].y + (m[i] * dx[i]) / 3;
      const c2x = points[i + 1].x - dx[i] / 3;
      const c2y = points[i + 1].y - (m[i + 1] * dx[i]) / 3;
      d += " C" + c1x + "," + c1y + " " + c2x + "," + c2y + " " + points[i + 1].x + "," + points[i + 1].y;
    }
    return d;
  }

  function renderLines(svg, spec, width) {
    const panels = spec.type === "multiples"
      ? spec.series.map(function (series, i) { return { title: series.name, indexes: [i] }; })
      : [{ title: null, indexes: spec.series.map(function (_, i) { return i; }) }];
    const values = [];
    panels.forEach(function (panel) {
      panel.indexes.forEach(function (index) {
        spec.rows.forEach(function (row) { values.push(row.values[index] || 0); });
      });
    });
    const dataMin = Math.min.apply(null, values);
    const dataMax = Math.max.apply(null, values);
    const pinMin = spec.yMin != null || !!spec.zero;
    const pinMax = spec.yMax != null;
    const lo = spec.yMin != null ? spec.yMin : spec.zero ? 0 : dataMin;
    const hi = spec.yMax != null ? spec.yMax : dataMax;
    const framed = spec.ticks
      ? { min: spec.yMin, max: spec.yMax, ticks: spec.ticks }
      : axis(lo, hi, pinMin, pinMax);
    const sample = format(framed.ticks[framed.ticks.length - 1] || framed.max, spec.format);
    const gutter = Math.ceil(measure(sample, 11, 450)) + 12;
    const right = spec.endLabels ? Math.ceil(Math.max.apply(null, spec.series.map(function (series) {
      return measure(series.name, 12, 650);
    }))) + 24 : 12;
    const plotL = gutter;
    const plotR = width - right;
    const plotW = Math.max(40, plotR - plotL);
    const panelH = clamp(width * (spec.type === "multiples" ? 0.34 : spec.type === "area" ? 0.42 : 0.48), spec.type === "multiples" ? 128 : 168, spec.type === "multiples" ? 190 : 280);
    const titleH = spec.type === "multiples" ? 18 : 0;
    const bottom = 26;
    const gap = spec.type === "multiples" ? 18 : 0;
    const height = panels.length * (titleH + panelH + bottom) + gap * (panels.length - 1);
    size(svg, width, height);

    const yOf = function (value, top) {
      const pad = 11;
      return top + pad + (panelH - pad) - ((value - framed.min) / (framed.max - framed.min)) * (panelH - pad);
    };
    const xOf = function (i) {
      if (spec.rows.length === 1) return (plotL + plotR) / 2;
      return plotL + (i / (spec.rows.length - 1)) * plotW;
    };
    const labelAt = function (i) {
      if (spec.xLabels === "ends") return i === 0 || i === spec.rows.length - 1;
      const indexes = [];
      spec.rows.forEach(function (row, idx) {
        if (spec.xLabels === "months") {
          const prev = idx > 0 ? spec.rows[idx - 1].label : "";
          if (monthOf(row.label) !== monthOf(prev)) indexes.push(idx);
        } else {
          indexes.push(idx);
        }
      });
      const budget = Math.max(2, Math.floor(plotW / 48));
      const stride = Math.max(1, Math.ceil(indexes.length / budget));
      const pos = indexes.indexOf(i);
      if (pos < 0) return false;
      return pos % stride === 0 || pos === indexes.length - 1;
    };

    panels.forEach(function (panel, p) {
      const origin = p * (titleH + panelH + bottom + gap);
      const top = origin + titleH;
      if (panel.title) {
        text(svg, panel.title, plotL, origin + 13, { size: 13, weight: 650 });
      }
      framed.ticks.forEach(function (tick) {
        const y = Math.round(yOf(tick, top));
        svg.append(el("line", {
          x1: plotL,
          x2: plotR,
          y1: y,
          y2: y,
          stroke: "var(--chart-grid)",
          "shape-rendering": "crispEdges",
        }));
        text(svg, format(tick, spec.format), plotL - 6, y, {
          size: 11,
          fill: "var(--chart-axis)",
          anchor: "end",
          baseline: "middle",
        });
      });
      spec.rows.forEach(function (row, i) {
        if (!labelAt(i)) return;
        let shown = spec.xLabels === "months" ? monthOf(row.label) : row.label;
        if (/^\d{2}:\d{2}:\d{2}$/.test(shown)) shown = shown.slice(0, 5);
        let anchor = "middle";
        if ((spec.xLabels === "ends" || spec.xLabels === "months") && i === 0) anchor = "start";
        if ((spec.xLabels === "ends" || spec.xLabels === "months") && i === spec.rows.length - 1) anchor = "end";
        text(svg, shown, xOf(i), top + panelH + 16, {
          size: 11,
          fill: "var(--chart-axis)",
          anchor: anchor,
        });
      });
      const baseline = yOf(spec.zero ? 0 : framed.min, top);
      panel.indexes.forEach(function (index) {
        const series = spec.series[index];
        const fill = colorOf(series);
        const points = spec.rows.map(function (row, i) {
          return { x: xOf(i), y: yOf(row.values[index] || 0, top) };
        });
        const d = monotone(points);
        if (spec.type === "area") {
          const area = el("path", {
            d: d + " L" + points[points.length - 1].x + "," + baseline + " L" + points[0].x + "," + baseline + " Z",
            fill: fill,
            opacity: "0.72",
          });
          svg.append(area);
        }
        svg.append(el("path", {
          d: d,
          fill: "none",
          stroke: fill,
          "stroke-width": spec.type === "area" ? 1.6 : 2.15,
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
        }));
        if (spec.dots) {
          points.forEach(function (point) {
            svg.append(el("circle", { cx: point.x, cy: point.y, r: 3.1, fill: fill }));
          });
        }
        if (spec.endLabels) {
          const last = points[points.length - 1];
          text(svg, series.name, last.x + 8, last.y, {
            size: 12,
            weight: 650,
            baseline: "middle",
            fill: fill,
          });
        }
      });
      const guides = [];
      const hit = rect(svg, plotL, top, plotW, panelH, { fill: "transparent", class: "chart-hit" });
      hit.addEventListener("pointermove", function (event) {
        const box = svg.getBoundingClientRect();
        const px = ((event.clientX - box.left) / box.width) * width;
        let nearest = 0;
        let best = Infinity;
        spec.rows.forEach(function (_, i) {
          const dist = Math.abs(xOf(i) - px);
          if (dist < best) {
            best = dist;
            nearest = i;
          }
        });
        guides.forEach(function (node) { node.remove(); });
        guides.length = 0;
        const x = xOf(nearest);
        const rule = el("line", {
          x1: x,
          x2: x,
          y1: top,
          y2: top + panelH,
          stroke: "currentColor",
          opacity: "0.35",
        });
        svg.append(rule);
        guides.push(rule);
        const rows = panel.indexes.map(function (index) {
          const y = yOf(spec.rows[nearest].values[index] || 0, top);
          const dot = el("circle", {
            cx: x,
            cy: y,
            r: 4.2,
            fill: colorOf(spec.series[index]),
            stroke: "var(--theme)",
            "stroke-width": 2,
          });
          svg.append(dot);
          guides.push(dot);
          return {
            color: colorOf(spec.series[index]),
            name: spec.series[index].name,
            value: format(spec.rows[nearest].values[index] || 0, spec.format),
          };
        });
        showTip(spec.rows[nearest].label, rows, event.clientX, event.clientY);
      });
      hit.addEventListener("pointerleave", function () {
        guides.forEach(function (node) { node.remove(); });
        guides.length = 0;
        hideTip();
      });
    });
  }

  function monthOf(label) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const text = String(label);
    const slash = text.match(/^(\d{1,2})\/(\d{1,2})\/\d{4}$/);
    if (slash) return months[Number(slash[2]) - 1] || text;
    const parts = text.split(/[\s-]/);
    const token = parts.length > 1 ? parts[parts.length - 1] : parts[0];
    const hit = months.filter(function (month) { return token.indexOf(month) === 0; })[0];
    return hit || token;
  }

  function donutSlice(cx, cy, outer, inner, a0, a1) {
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const p = function (radius, angle) {
      return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
    };
    const o0 = p(outer, a0);
    const o1 = p(outer, a1);
    const i1 = p(inner, a1);
    const i0 = p(inner, a0);
    return "M" + o0[0] + "," + o0[1]
      + " A" + outer + "," + outer + " 0 " + large + " 1 " + o1[0] + "," + o1[1]
      + " L" + i1[0] + "," + i1[1]
      + " A" + inner + "," + inner + " 0 " + large + " 0 " + i0[0] + "," + i0[1]
      + " Z";
  }

  function renderDonut(svg, spec, width) {
    const rows = spec.rows.map(function (row, i) {
      return {
        label: row.label,
        value: row.values[0] || 0,
        color: row.color || colorOf(spec.series[i] || spec.series[0]),
      };
    });
    const total = rows.reduce(function (sum, row) { return sum + Math.abs(row.value); }, 0) || 1;
    const side = width >= 520;
    const outer = Math.min(112, side ? width * 0.2 : width * 0.26);
    const inner = outer * 0.58;
    const cx = side ? outer + 28 : width / 2;
    const legendH = rows.length * 22 + 8;
    const cy = Math.max(outer + 18, side ? legendH / 2 : outer + 18);
    const height = side ? Math.max(cy + outer + 16, legendH) : cy + outer + 18 + legendH;
    size(svg, width, height);
    let angle = -Math.PI / 2;
    const slices = [];
    rows.forEach(function (row) {
      const sweep = (Math.abs(row.value) / total) * Math.PI * 2;
      const end = angle + Math.max(sweep, 0.0001);
      const path = el("path", { d: donutSlice(cx, cy, outer, inner, angle, end), fill: row.color });
      svg.append(path);
      slices.push(path);
      angle = end;
    });
    rows.forEach(function (row, i) {
      const ly = (side ? 14 : cy + outer + 22) + i * 22;
      const lx = side ? cx + outer + 28 : 0;
      rect(svg, lx, ly - 9, 10, 10, { fill: row.color });
      text(svg, row.label, lx + 16, ly, { size: 12, baseline: "middle" });
      text(svg, format(row.value, spec.format), width - 4, ly, {
        size: 12,
        weight: 650,
        anchor: "end",
        baseline: "middle",
      });
      const show = function (event) {
        slices.forEach(function (slice, index) {
          slice.setAttribute("opacity", index === i ? "1" : "0.4");
        });
        showTip(row.label, [{
          color: row.color,
          name: "Share",
          value: format(row.value, spec.format) + " · " + trim(Math.abs(row.value) / total * 100, 0) + "%",
        }], event.clientX, event.clientY);
      };
      slices[i].setAttribute("class", "chart-hit");
      slices[i].addEventListener("pointerenter", show);
      slices[i].addEventListener("pointermove", show);
      slices[i].addEventListener("pointerleave", function () {
        slices.forEach(function (slice) { slice.setAttribute("opacity", "1"); });
        hideTip();
      });
    });
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function size(svg, width, height) {
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
  }

  const renderers = {
    split: renderSplit,
    stacked: function (svg, spec, width) { renderHorizontal(svg, spec, width, true); },
    bars: function (svg, spec, width) { renderHorizontal(svg, spec, width, false); },
    bullet: renderBullet,
    columns: renderColumns,
    line: renderLines,
    area: renderLines,
    multiples: renderLines,
    donut: renderDonut,
  };

  function draw(fig, force) {
    const st = fig._chart;
    const width = Math.round(fig.clientWidth);
    if (width < 40) return;
    if (!force && width === st.width) return;
    st.width = width;
    hideTip();
    const view = fig.querySelector(".chart-view");
    view.replaceChildren();
    const spec = st.spec;
    if (spec.tabs) view.append(tabs(fig, spec));
    if (spec.showKey) view.append(key(spec));
    const svg = el("svg", { role: "presentation", "aria-hidden": "true" });
    view.append(svg);
    const render = renderers[spec.type];
    if (!render) return;
    render(svg, spec, width, st);
    fig.classList.add("is-ready");
  }

  function boot() {
    document.querySelectorAll(".chart").forEach(function (fig) {
      const raw = fig.getAttribute("data-spec");
      if (!raw) return;
      fig._chart = { spec: JSON.parse(raw), tab: 0, width: 0 };
      const observer = new ResizeObserver(function () { draw(fig, false); });
      observer.observe(fig);
      draw(fig, true);
    });
    new MutationObserver(function () {
      document.querySelectorAll(".chart").forEach(function (fig) {
        if (fig._chart) draw(fig, true);
      });
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
