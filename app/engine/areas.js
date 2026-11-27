// Colors for one part of a demo page (the header, the top section, the services…), set in Customize.
// Each part gets its own background, and its text color is picked automatically for contrast unless set by hand.
// Inside a part, the page's color variables are redefined, so its cards, lines and muted text follow along.
import { contrast } from "./variation.js";

export const AREAS = {
  page: { label: "Whole page background", sel: "body" },
  header: { label: "Header (menu bar)", sel: ".top" },
  hero: { label: "Top section", sel: ".hero" },
  services: { label: "Services", sel: ".services" },
  why: { label: "Why choose us", sel: ".why" },
  gallery: { label: "Photos", sel: ".gallery" },
  reviews: { label: "Reviews", sel: ".reviews" },
  steps: { label: "How it works", sel: ".steps-sec" },
  facts: { label: "Quick facts strip", sel: ".facts" },
  faq: { label: "Questions", sel: ".faq" },
  pricing: { label: "Prices page", sel: ".pricing-sec" },
  about: { label: "About page story", sel: ".about-sec" },
  contactpage: { label: "Contact page", sel: ".contact-page" },
  custom: { label: "Your own pages", sel: ".custom-sec" },
  visit: { label: "Visit us and hours", sel: ".visit" },
  cta: { label: "Call-to-action band", sel: ".cta-band" },
  footer: { label: "Footer", sel: ".foot" },
  popup: { label: "Contact form popup", sel: ".cmodal-box" },
};


const HEX = /^#[0-9a-f]{6}$/i;
// Gradient directions offered in Customize: degrees for straight ones, "radial" for a glow from the center
export const DIRECTIONS = ["180", "90", "135", "45", "radial"];

/** Keeps only known parts with valid colors. Input: { header: { bg: "#112233", bg2: "#445566", dir: "135", text: "" }, … } */
export function cleanAreas(input) {
  const out = {};
  if (!input || typeof input !== "object") return out;
  for (const [key, v] of Object.entries(input)) {
    if (!AREAS[key] || !v || !HEX.test(v.bg || "")) continue;
    const area = { bg: v.bg.toUpperCase(), text: HEX.test(v.text || "") ? v.text.toUpperCase() : "" };
    if (HEX.test(v.bg2 || "")) {
      area.bg2 = v.bg2.toUpperCase();
      area.dir = DIRECTIONS.includes(String(v.dir)) ? String(v.dir) : "135";
    }
    out[key] = area;
  }
  return out;
}

// The color halfway between two colors, used for card and muted-text colors on a gradient
function mix(a, b) {
  const n = (h, i) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  return "#" + [0, 1, 2].map((i) => Math.round((n(a, i) + n(b, i)) / 2).toString(16).padStart(2, "0")).join("").toUpperCase();
}

// Black or white, whichever stays readable across every color of the background
const autoText = (colors) => {
  const worst = (t) => Math.min(...colors.map((c) => contrast(c, t)));
  return worst("#FFFFFF") >= worst("#141414") ? "#FFFFFF" : "#141414";
};

function vars(bg, text) {
  const surface = `color-mix(in srgb,${bg} 90%,${text})`;
  return `--bg:${bg};--band:${bg};--surface:${surface};--pane:color-mix(in srgb,${surface} 75%,transparent);--text:${text};--muted:color-mix(in srgb,${text} 72%,${bg});color:${text}`;
}

export function areaCss(areas = {}, palette = {}) {
  let css = "";
  const lowContrast = (colors) => HEX.test(palette.primary || "") && Math.min(...colors.map((c) => contrast(palette.primary, c))) < 3;
  // When the whole page's headings were switched to its text color, parts with their own color need their own text color too
  const p = areas.page;
  const pageHeadings = p && lowContrast(p.bg2 ? [p.bg, p.bg2] : [p.bg]);
  for (const [key, { bg, bg2, dir, text }] of Object.entries(areas)) {
    const a = AREAS[key];
    if (!a) continue;
    const colors = bg2 ? [bg, bg2] : [bg];
    const base = bg2 ? mix(bg, bg2) : bg;
    const fill = !bg2 ? bg : dir === "radial" ? `radial-gradient(circle at 50% 35%,${bg},${bg2} 75%)` : `linear-gradient(${dir}deg,${bg},${bg2})`;
    const t = text || autoText(colors);
    // Some styles color headings with the main color; when that's hard to read on this background, use the text color
    const sel = key === "page" ? "body" : key === "popup" ? "body .cmodal .form-card.cmodal-box" : `body ${a.sel}`;
    if (lowContrast(colors) || (pageHeadings && key !== "page")) css += `${sel} :is(h1,h2,h3,.kicker,.logo-name,.btn-ghost){color:${t}!important}`;
    if (key === "page") {
      // The whole page: new base colors everywhere, the background spread over the full page, and no glow behind it
      css += `:root{${vars(base, t)}}html{background:${fill}!important;min-height:100%}body{background:transparent!important}body::before,body::after{display:none!important}`;
    } else if (key === "hero") {
      // With a photo or video the color tints it; without one it becomes the background
      css += `body .hero{${vars(base, t)}}body .hero:not(.has-photo){background:${fill}!important}body .hero:not(.has-photo)::before,body .hero:not(.has-photo)::after{opacity:.35}`;
    } else if (key === "popup") {
      css += `body .cmodal .form-card.cmodal-box{${vars(base, t)};background:${fill}!important}`;
    } else {
      css += `body ${a.sel}{${vars(base, t)};background:${fill}!important}`;
    }
  }
  return css;
}
