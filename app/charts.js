// charts.js — small SVG chart builders for DataNusa.
// Every chart is drawn from the numbers in data.js, inline in the page:
// no library, no network, no canvas. Each chart labels its own values so
// it stays readable when printed or screenshotted.

const PALETTE = ['#0f4c46', '#e8a33d', '#c96f4a', '#5b8a8a', '#8a6d3b', '#2e7d6b', '#b3543f', '#7a9e7e'];

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fmt(n, decimals = 1) {
  return Number(n).toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// Horizontal bars: rows of {name, value}. `unit` is printed after each value.
export function barChart(rows, { unit = '', width = 640, rowH = 34, max = null, decimals = 1 } = {}) {
  const top = Math.max(...rows.map((r) => r.value), 0);
  const scale = max ?? top;
  const labelW = 150;
  const valueW = 64;
  const height = rows.length * rowH + 12;
  const bars = rows
    .map((row, i) => {
      const w = Math.max(2, ((row.value / scale) * (width - labelW - valueW - 16)) | 0);
      const y = 6 + i * rowH;
      const color = PALETTE[i % PALETTE.length];
      return `<g>
        <text x="0" y="${y + 15}" class="chart-label">${esc(row.name)}</text>
        <rect x="${labelW}" y="${y}" width="${w}" height="20" rx="3" fill="${color}" />
        <text x="${labelW + w + 8}" y="${y + 15}" class="chart-value">${fmt(row.value, decimals)}${unit}</text>
      </g>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Diagram batang">${bars}</svg>`;
}

// Line chart over {year, value} points. `min`/`max` pin the vertical range.
export function lineChart(points, { width = 640, height = 260, min = null, max = null, unit = '%', decimals = 2 } = {}) {
  const values = points.map((p) => p.value);
  const lo = min ?? Math.min(...values);
  const hi = max ?? Math.max(...values);
  const span = hi - lo || 1;
  const padL = 44;
  const padR = 16;
  const padT = 24;
  const padB = 30;
  const iw = width - padL - padR;
  const ih = height - padT - padB;
  const x = (i) => padL + (i * iw) / (points.length - 1);
  const y = (v) => padT + ih - ((v - lo) / span) * ih;
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const dots = points
    .map(
      (p, i) =>
        `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4.5" fill="#0f4c46" stroke="#fff" stroke-width="1.5" />
         <text x="${x(i).toFixed(1)}" y="${(y(p.value) - 10).toFixed(1)}" class="chart-value chart-center">${fmt(p.value, decimals)}${unit}</text>
         <text x="${x(i).toFixed(1)}" y="${height - 8}" class="chart-label chart-center">${p.year}</text>`,
    )
    .join('');
  const grid = [0, 0.5, 1]
    .map((f) => {
      const gv = lo + span * f;
      const gy = y(gv);
      return `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - padR}" y2="${gy.toFixed(1)}" class="chart-grid" />
              <text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" class="chart-label chart-right">${fmt(gv, decimals)}${unit}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Diagram garis">${grid}<path d="${path}" fill="none" stroke="#e8a33d" stroke-width="3" stroke-linejoin="round" />${dots}</svg>`;
}

// Donut: slices of {name, value} in percent, with a legend.
export function donutChart(slices, { size = 300, decimals = 1 } = {}) {
  const total = slices.reduce((s, p) => s + p.value, 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  let angle = -Math.PI / 2;
  const parts = slices.map((slice, i) => {
    const frac = slice.value / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${PALETTE[i % PALETTE.length]}" />`;
  });
  const legend = slices
    .map(
      (slice, i) =>
        `<li><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>${esc(slice.name)} — <strong>${fmt(slice.value, decimals)}%</strong></li>`,
    )
    .join('');
  return `<div class="donut-wrap">
    <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Diagram lingkaran">${parts.join('')}
      <text x="${cx}" y="${cy - 4}" class="donut-total">${fmt(total, 0)}%</text>
      <text x="${cx}" y="${cy + 16}" class="donut-caption">dari penduduk</text>
    </svg>
    <ul class="legend">${legend}</ul>
  </div>`;
}
