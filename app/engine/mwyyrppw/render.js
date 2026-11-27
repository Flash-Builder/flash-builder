// Turns a business + chosen style into one self-contained HTML page.
import { areaCss } from "./areas.js";
import { icon } from "./icons.js";
import { SKINS } from "./skins.js";
import { fontHref } from "./variation.js";
import { contactForm } from "./forms.js";
import { heroMotionCss } from "./motion.js";
import { PAGES_CSS } from "./pages.js";

// Magic UI-style effects, recreated in plain CSS (no scripts). Each style turns on the ones that suit it.
// reveal: headline words rise in one by one. grain: film-grain texture. parallax: hero art drifts on scroll.
const FX = {
  material: { shimmer: 1, fade: 1, reveal: 1, parallax: 1 },
  organic: { fade: 1, reveal: 1, parallax: 1 },
  skeuo: { fade: 1, shine: 1, grain: 1 },
  aurora: { beam: 1, fade: 1, shimmer: 1, reveal: 1, parallax: 1 },
  kinetic: { beam: 1, marquee: 1 },
  neumorph: { fade: 1, reveal: 1 },
  bento: { beam: 1, shimmer: 1, fade: 1, reveal: 1 },
  retro: { beam: 1, shimmer: 1, marquee: 1, fade: 1, grain: 1 },
  brutal: { marquee: 1, reveal: 1 },
  editorial: { fade: 1, reveal: 1, grain: 1 },
  noir: { fade: 1, reveal: 1, grain: 1, shimmer: 1, parallax: 1 },
  glass: { beam: 1, fade: 1, reveal: 1, shimmer: 1 },
  deco: { fade: 1, reveal: 1, grain: 1 },
  zen: { fade: 1, reveal: 1 },
  clay: { fade: 1, reveal: 1, parallax: 1 },
  fullbleed: { fade: 1, reveal: 1, marquee: 1, grain: 1 },
  blueprint: { fade: 1, reveal: 1 },
  midcentury: { fade: 1, reveal: 1, parallax: 1, grain: 1 },
  riso: { fade: 1, reveal: 1, marquee: 1, grain: 1 },
  memphis: { fade: 1, reveal: 1, marquee: 1, parallax: 1 },
};
const initials = (name) => name.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "•";

// "Joe's" but "Lone Star Barbers'"
const poss = (name) => (/s$/i.test(name.trim()) ? `${name.trim()}'` : `${name.trim()}'s`);

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function hoursRows(hours) {
  return hours
    .map((h) => {
      const i = h.indexOf(":");
      const day = i > 0 ? h.slice(0, i) : h;
      const time = i > 0 ? h.slice(i + 1).trim().replace(/ | /g, " ") : "";
      return `<tr><th scope="row">${esc(day)}</th><td>${esc(time || "Call to check")}</td></tr>`;
    })
    .join("");
}

function hoursSummary(hours) {
  if (!hours.length) return "";
  const open = hours.filter((h) => !/closed/i.test(h)).length;
  if (open === 7) return "Open 7 days";
  if (open === 6) return "Open 6 days a week";
  if (open > 0) return `Open ${open} days a week`;
  return "";
}

function art(d) {
  const ic = icon(d.icon, "art-ic");
  const s = d.services;
  switch (d.style) {
    case "material":
      return `<div class="art art-material"><div class="disc">${ic}</div>
        <span class="chip c1">${icon(s[0].icon)}${esc(s[0].title)}</span>
        <span class="chip c2">${icon(s[1].icon)}${esc(s[1].title)}</span>
        <span class="chip c3">${icon(s[2].icon)}${esc(s[2].title)}</span></div>`;
    case "organic":
      return `<div class="art art-organic"><div class="blob"></div>${ic}
        <svg class="scribble" viewBox="0 0 200 200" aria-hidden="true"><path d="M100 18c48 2 84 34 80 82-4 46-42 80-86 78-44-2-76-40-74-82C22 52 58 20 106 22" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
        <svg class="sprig" viewBox="0 0 60 60" aria-hidden="true"><path d="M8 52C20 40 34 24 52 8M20 40c-6-2-10-8-10-14 6 0 11 5 12 11M30 30c-6-3-9-9-8-15 6 1 10 7 10 13M40 20c-2-6 0-12 5-15 3 5 1 12-3 15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></div>`;
    case "skeuo": {
      const top = esc(d.name.length > 26 ? d.name.slice(0, 25) + "…" : d.name);
      const bottom = esc(d.city || d.noun);
      return `<div class="art art-skeuo"><svg viewBox="0 0 300 300" class="emblem" role="img" aria-label="${esc(d.name)} badge">
        <defs><path id="arcTop" d="M60 150a90 90 0 0 1 180 0"/><path id="arcBot" d="M52 150a98 98 0 0 0 196 0"/>
        <radialGradient id="brass" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#FBE7B0"/><stop offset=".45" style="stop-color:var(--accent)"/><stop offset="1" stop-color="#6E4E1C"/></radialGradient></defs>
        <circle cx="150" cy="150" r="140" fill="url(#brass)"/><circle cx="150" cy="150" r="126" style="fill:var(--band)"/>
        <circle cx="150" cy="150" r="118" fill="none" style="stroke:var(--accent)" stroke-width="2" stroke-dasharray="3 6"/>
        <circle cx="150" cy="150" r="62" fill="none" style="stroke:var(--accent)" stroke-width="2"/>
        <text class="arc"><textPath href="#arcTop" startOffset="50%" text-anchor="middle">${top}</textPath></text>
        <text class="arc small"><textPath href="#arcBot" startOffset="50%" text-anchor="middle">${bottom}</textPath></text>
        </svg><div class="emblem-ic">${ic}</div></div>`;
    }
    case "aurora":
      return `<div class="art art-aurora"><div class="glass g-back"></div><div class="glass g-front fx-beam">
        <div class="g-ic">${ic}</div><p class="g-t">${esc(s[0].title)}</p><p class="g-s">${esc(s[0].line)}</p>
        <div class="g-row"><span>${esc(s[1].title)}</span><span>${esc(s[2].title)}</span></div></div></div>`;
    case "kinetic":
      return `<div class="art art-kinetic"><div class="ring"></div><div class="ring r2"></div>${ic}</div>`;
    case "neumorph":
      return `<div class="art art-neu"><div class="dial"><div class="dial-in">${ic}</div></div>
        <ul class="toggles">${s.slice(0, 3).map((x, i) => `<li><span>${esc(x.title)}</span><i class="sw${i === 2 ? "" : " on"}"></i></li>`).join("")}</ul></div>`;
    case "bento": {
      const open = hoursSummary(d.hours) || "Call for hours";
      return `<div class="art art-bento">
        <div class="bt bt-main fx-beam">${ic}<p>${esc(s[0].title)}</p></div>
        <div class="bt bt-hours">${icon("clock")}<p><strong>${esc(open)}</strong></p></div>
        <div class="bt bt-svc">${icon(s[1].icon)}<p>${esc(s[1].title)}</p></div>
        <div class="bt bt-call">${icon("call")}<p>${esc(d.phone || d.city)}</p></div>
      </div>`;
    }
    case "retro":
      return `<div class="art art-retro"><div class="sun"></div><div class="sun-ic">${ic}</div></div>`;
    case "brutal":
      return `<div class="art art-brutal"><div class="card c-back"></div><div class="card c-front">${ic}<p>${esc(s[0].title)}</p></div>
        <span class="sticker">${esc(d.phone ? "Call us!" : "Say hi!")}</span></div>`;
    case "editorial":
      return `<div class="art art-editorial"><p class="ed-cap">${esc(d.category || d.noun[0].toUpperCase() + d.noun.slice(1))} in ${esc(d.city)}</p>
        <ul class="ed-index">${s.slice(0, 4).map((x) => `<li><span>${esc(x.title)}</span>${icon(x.icon)}</li>`).join("")}</ul>
        <p class="ed-foot">${esc(hoursSummary(d.hours) || d.phone || "")}</p></div>`;
    case "noir":
      return `<div class="art art-noir"><div class="crest"><span class="crest-mono">${esc(initials(d.name))}</span></div>
        <p class="crest-cap">${esc(d.noun)} · ${esc(d.city)}</p></div>`;
    case "glass": {
      const open = hoursSummary(d.hours) || "Call for hours";
      return `<div class="art art-glass"><div class="gl gl-main fx-beam"><div class="gl-ic">${ic}</div><p class="gl-t">${esc(s[0].title)}</p><p class="gl-s">${esc(s[0].line)}</p></div>
        <div class="gl gl-pill gp1">${icon("clock")}<span>${esc(open)}</span></div>
        <div class="gl gl-pill gp2">${icon("call")}<span>${esc(d.phone || d.city)}</span></div></div>`;
    }
    case "deco":
      return `<div class="art art-deco"><svg class="fan" viewBox="0 0 300 300" aria-hidden="true">
        <g fill="none" style="stroke:var(--primary)" stroke-width="1.5">${Array.from({ length: 13 }, (_, i) => { const a = Math.PI * (i / 12); return `<line style="--i:${i}" x1="150" y1="230" x2="${(150 - 130 * Math.cos(a)).toFixed(1)}" y2="${(230 - 130 * Math.sin(a)).toFixed(1)}"/>`; }).join("")}
        <path d="M20 230a130 130 0 0 1 260 0"/><path d="M50 230a100 100 0 0 1 200 0"/><path d="M80 230a70 70 0 0 1 140 0"/><path d="M10 240h280M30 250h240M50 260h200"/></g></svg>
        <div class="deco-ic">${ic}</div></div>`;
    case "zen":
      return `<div class="art art-zen"><svg class="enso" viewBox="0 0 200 200" aria-hidden="true"><path d="M150 46c-30-24-86-22-112 14-26 36-14 92 30 108 44 16 96-8 104-56 5-30-10-56-30-68" fill="none" style="stroke:var(--text)" stroke-width="9" stroke-linecap="round" opacity=".85"/></svg>
        <div class="zen-ic">${ic}</div><p class="zen-v">${esc(d.city)}</p></div>`;
    case "clay":
      return `<div class="art art-clay"><div class="cl cl-main">${ic}<p>${esc(s[0].title)}</p></div>
        <div class="cl cl-b1">${icon(s[1].icon)}</div><div class="cl cl-b2">${icon("heart")}</div></div>`;
    case "fullbleed": {
      const open = hoursSummary(d.hours);
      return `<div class="art art-full"><div class="fb-card">${open ? `<p>${icon("clock")}<span>${esc(open)}</span></p>` : ""}${d.address ? `<p>${icon("pin")}<span>${esc(d.address.split(",")[0])}</span></p>` : ""}${d.phone ? `<p>${icon("call")}<span>${esc(d.phone)}</span></p>` : ""}</div></div>`;
    }
    case "blueprint": {
      const nm = esc(d.name.length > 24 ? d.name.slice(0, 23) + "…" : d.name);
      return `<div class="art art-blueprint"><svg class="bp" viewBox="0 0 300 300" aria-hidden="true">
        <g fill="none" stroke="currentColor" stroke-width="1.2">
          <rect class="draw" x="60" y="50" width="180" height="180"/>
          <circle class="draw" cx="150" cy="140" r="66" stroke-dasharray="4 4"/>
          <path d="M150 62v156M72 140h156" stroke-opacity=".4"/>
          <path d="M60 30h180M60 24v12M240 24v12M36 50v180M30 50h12M30 230h12"/>
          <path class="note-line" d="M206 96l52-48h36"/>
          <rect x="130" y="246" width="164" height="46"/><path d="M130 268h164"/>
        </g>
        <text x="150" y="21" text-anchor="middle">${esc(s[0].title)}</text>
        <text x="24" y="140" text-anchor="middle" transform="rotate(-90 24 140)">${esc(s[1].title)}</text>
        <text class="note" x="262" y="43">${esc(s[2].title.length > 12 ? "Detail A" : s[2].title)}</text>
        <text class="tb" x="138" y="262">${nm}</text>
        <text x="138" y="284">Sheet 01 · ${esc(d.city)}</text>
        </svg><div class="bp-ic">${ic}</div></div>`;
    }
    case "midcentury": {
      const rays = Array.from({ length: 16 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 16, r0 = 92, r1 = i % 2 ? 122 : 142;
        const [x0, y0, x1, y1] = [150 + r0 * Math.cos(a), 150 + r0 * Math.sin(a), 150 + r1 * Math.cos(a), 150 + r1 * Math.sin(a)].map((n) => n.toFixed(1));
        return `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}"/><circle cx="${x1}" cy="${y1}" r="${i % 2 ? 3.5 : 5.5}" class="${i % 4 === 0 ? "dot-a" : "dot"}"/>`;
      }).join("");
      return `<div class="art art-mid"><svg class="atom" viewBox="0 0 300 300" aria-hidden="true">
        <g class="rays" stroke-width="2" stroke-linecap="round">${rays}</g>
        <path class="boom b1" d="M18 262c34-62 98-70 132-36-50-14-92 4-132 36z"/>
        <path class="boom b2" d="M196 22c58 0 92 40 88 92-16-44-46-72-88-92z"/>
        </svg><div class="mid-disc">${ic}</div></div>`;
    }
    case "riso":
      return `<div class="art art-riso"><div class="ink ink-a"></div><div class="ink ink-b"></div>
        <div class="riso-ic r1">${ic}</div><div class="riso-ic r2">${ic}</div>
        <p class="riso-tag">${esc(s[0].title)}</p></div>`;
    case "memphis":
      return `<div class="art art-memphis"><div class="m-disc">${ic}</div>
        <span class="m m-tri"></span><span class="m m-dots"></span><span class="m m-sq"></span>
        <span class="m m-half"></span><span class="m m-zig"></span><span class="m m-ring"></span></div>`;
    default:
      return `<div class="art">${ic}</div>`;
  }
}

// Each headline word gets its own span so it can rise in after the one before it
const revealWords = (text) => esc(text).split(" ").map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`).join(" ");

// Tailored contact form in a popup, opened by a floating "Contact us" button. No scripts: the button links to
// #contact and CSS shows the popup while it's the :target. Close links go to #close (no such id), so the page
// stays where it was. Fields have ids but no names, so a demo submission sends nothing anywhere: the browser
// just jumps to #sent and CSS shows the thank-you note.
function contactSection(d, fx, tel, summary) {
  const f = d.form;
  if (!f) return "";
  let n = 0;
  const id = () => `f${++n}`;
  const req = (x) => (x.required ? " required" : "");
  const star = (x) => (x.required ? ' <span class="req" aria-hidden="true">*</span>' : "");
  const hint = (x, i) => (x.hint ? `<small class="hint" id="${i}-h">${esc(x.hint)}</small>` : "");
  const desc = (x, i) => (x.hint ? ` aria-describedby="${i}-h"` : "");
  const field = (x) => {
    const i = id();
    if (x.type === "chips") {
      return `<fieldset class="fld fld-wide"><legend>${esc(x.label)}${star(x)}</legend><div class="chips">${x.options.map((o, k) => `<label><input type="radio" name="${i}"${k === 0 && x.required ? " required" : ""}><span>${esc(o)}</span></label>`).join("")}</div></fieldset>`;
    }
    const lab = `<label for="${i}">${esc(x.label)}${star(x)}</label>`;
    if (x.type === "select") {
      return `<div class="fld">${lab}<select id="${i}"${req(x)}${desc(x, i)}><option value="">Choose…</option>${x.options.map((o) => `<option>${esc(o)}</option>`).join("")}</select>${hint(x, i)}</div>`;
    }
    const extra = [x.placeholder && ` placeholder="${esc(x.placeholder)}"`, x.autocomplete && ` autocomplete="${esc(x.autocomplete)}"`, x.type === "number" && ` min="${x.min}" inputmode="numeric"`].filter(Boolean).join("");
    return `<div class="fld">${lab}<input id="${i}" type="${x.type}"${extra}${req(x)}${desc(x, i)}>${hint(x, i)}</div>`;
  };
  const msgId = id();
  return `<a class="contact-fab${tel ? " has-callbar" : ""}" href="#contact">${icon("chat")}<span>Contact us</span></a>
<div id="contact" class="cmodal" role="dialog" aria-modal="true" aria-labelledby="cm-title">
  <a class="cmodal-bg" href="#close" tabindex="-1" aria-hidden="true"></a>
  <div class="form-card cmodal-box${fx.beam ? " fx-beam" : ""}">
    <a class="cmodal-x" href="#close" aria-label="Close">×</a>
    <h2 id="cm-title" class="cmodal-t">${esc(f.title)}</h2><p class="cmodal-intro">${esc(f.intro)}</p>
    <ul class="contact-ways">
      ${d.phone ? `<li>${icon("call")}<a href="${tel}">${esc(d.phone)}</a></li>` : ""}
      ${d.whatsapp ? `<li>${icon("chat")}<a href="${esc(d.whatsapp)}" target="_blank" rel="noopener">Message us on WhatsApp</a></li>` : ""}
      ${d.address ? `<li>${icon("pin")}<span>${esc(d.address)}</span></li>` : ""}
      ${summary ? `<li>${icon("clock")}<span>${esc(summary)}</span></li>` : ""}
    </ul>
    <form class="cform" action="#sent" method="get" aria-label="${esc(f.title)}">
      <div class="fld"><label for="${id()}">${esc(f.nameLabel || "Your name")} <span class="req" aria-hidden="true">*</span></label><input id="f${n}" type="text" autocomplete="name" required></div>
      <div class="fld"><label for="${id()}">Phone</label><input id="f${n}" type="tel" autocomplete="tel" inputmode="tel"></div>
      <div class="fld fld-wide"><label for="${id()}">Email <span class="req" aria-hidden="true">*</span></label><input id="f${n}" type="email" autocomplete="email" required></div>
      ${f.fields.map(field).join("")}
      <div class="fld fld-wide"><label for="${msgId}">${esc(f.message)}</label><textarea id="${msgId}" rows="4"${f.messageHint ? ` aria-describedby="${msgId}-h"` : ""}></textarea>${f.messageHint ? `<small class="hint" id="${msgId}-h">${esc(f.messageHint)}</small>` : ""}</div>
      <div class="fld-wide form-foot"><button class="btn btn-primary${fx.shimmer ? " fx-shimmer" : ""}" type="submit">${esc(f.submit)}</button>
      <p class="form-note">Demo form: nothing you type here is sent or saved.</p></div>
    </form>
    <div id="sent" class="sent" role="status"><p class="sent-t">${icon("check")}<span>Thanks, that's the idea!</span></p><p>On the live site, this request would go straight to ${esc(d.name)}. In this demo nothing was sent.</p><div class="actions"><a href="#close" class="btn btn-primary">Close</a><a href="#contact" class="btn btn-ghost">Back to the form</a></div></div>
  </div>
</div>`;
}

const wave = (flip = false) =>
  `<svg class="wave${flip ? " flip" : ""}" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40c120-30 240-30 360 0s240 30 360 0 240-30 360 0 240 30 360 0v40H0z"/></svg>`;

/**
 * Renders the home page (page = null) or one extra page. Every page shares the same frame: head and styles,
 * header and menu, the top section's look, the contact popup, the call-to-action band and the footer.
 */
export function renderDemo(d, page = null) {
  const fx = FX[d.style] || {};
  const pages = d.pages || [];
  const tel = d.phone ? `tel:${d.phoneDial || d.phone.replace(/[^\d+]/g, "")}` : "";
  // A WhatsApp chat button, for countries where customers message businesses there (mobile numbers only)
  const waBtn = d.whatsapp ? `<a class="btn btn-ghost btn-wa" href="${esc(d.whatsapp)}" target="_blank" rel="noopener">${icon("chat")}<span>WhatsApp</span></a>` : "";
  const callBtn = (cls = `btn btn-primary${fx.shimmer ? " fx-shimmer" : ""}`) =>
    tel ? `<a class="${cls}" href="${tel}">${icon("call")}<span>Call ${esc(d.phone)}</span></a>` : `<a class="${cls}" href="#contact">${esc(d.cta)}</a>`;
  const dirBtn = d.directions ? `<a class="btn btn-ghost" href="${esc(d.directions)}" target="_blank" rel="noopener">${icon("pin")}<span>Get directions</span></a>` : "";
  const summary = hoursSummary(d.hours);
  const logo = d.logo
    ? `<img src="${esc(d.logo)}" alt="${esc(d.name)}" class="logo-img">`
    : `<span class="mono" aria-hidden="true">${esc(initials(d.name))}</span><span class="logo-name">${esc(d.name)}</span>`;
  const fade = fx.fade ? " fx-fade" : "";
  const pageOf = (type) => pages.find((p) => p.type === type);
  const seeAll = (type, text) => (pageOf(type) ? `<a class="see-all" href="${esc(pageOf(type).file)}">${esc(text)} <span aria-hidden="true">→</span></a>` : "");

  const services = `<section id="services" class="services sec"><div class="wrap">
    <div class="sec-head"><h2>${esc(d.servicesTitle)}</h2><p>${esc(d.servicesSub)}</p>${seeAll("services", `See all ${pageOf("services")?.title.toLowerCase() || "services"}`)}${seeAll("pricing", `See ${pageOf("pricing")?.title.toLowerCase() || "prices"}`)}</div>
    <ul class="svc-list">${d.services.map((s) => `<li class="svc${fade}">${icon(s.icon, "svc-ic")}<h3>${esc(s.title)}</h3><p>${esc(s.line)}</p></li>`).join("")}</ul>
  </div></section>`;

  const valuesList = `<ul class="why-list">${d.points.map((p) => `<li${fx.fade ? ' class="fx-fade"' : ""}><h3>${esc(p.title)}</h3><p>${esc(p.line)}</p></li>`).join("")}</ul>`;
  const why = `<section class="why sec"><div class="wrap">
    <div class="sec-head"><h2>${esc(d.whyTitle)}</h2>${seeAll("about", `More about ${d.name}`)}</div>
    ${valuesList}
  </div></section>`;

  const stars = (n) => `<p class="stars" aria-label="${n} out of 5 stars">${"★".repeat(n)}${"☆".repeat(5 - n)}</p>`;
  const allPhotos = [...(d.heroPhoto && !d.heroVideo ? [d.heroPhoto] : []), ...d.photos].filter((p) => p?.file);
  const credits = [...new Map([...allPhotos, ...d.photos].map((p) => p.credit).filter((c) => c?.name).map((c) => [c.name + c.site, c])).values()];
  const creditLine = credits.length ? `<p class="credit">Photos by ${credits.map((c) => `<a href="${esc(c.url || c.page)}" target="_blank" rel="noopener">${esc(c.name)}</a>`).join(", ")} via ${[...new Map(credits.map((c) => [c.site, c.siteUrl])).entries()].map(([site, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(site)}</a>`).join(" and ")}</p>` : "";
  const vc = d.heroVideo?.credit;
  const videoCredit = vc?.name ? `<p class="credit video-credit">Video at the top by <a href="${esc(vc.url || vc.page)}" target="_blank" rel="noopener">${esc(vc.name)}</a> via <a href="${esc(vc.siteUrl)}" target="_blank" rel="noopener">${esc(vc.site)}</a></p>` : "";
  const sampleNote = d.photoSource === "stock" ? `<p>Sample photos for this demo. ${esc(poss(d.name))} own photos would go here.</p>` : "";
  const gallery = d.photos.length
    ? `<section class="gallery sec"><div class="wrap">
    <div class="sec-head"><h2>${esc(d.galleryTitle || "A look around")}</h2>${sampleNote}${seeAll("gallery", "See all photos")}</div>
    <ul class="gal">${d.photos.map((p) => `<li${fx.fade ? ' class="fx-fade"' : ""}><img src="${esc(p.file)}" alt="${esc(p.alt)}" loading="lazy" width="940" height="627"></li>`).join("")}</ul>
    ${creditLine}
  </div></section>`
    : "";
  const exampleNote = d.reviewsMode === "example" ? `<p>Example reviews to show the layout. They'll be replaced with real reviews from ${esc(poss(d.name))} customers.</p>` : "";
  const reviewItem = (r) => `<li class="rev${fade}">${r.example ? '<span class="rev-tag">Example</span>' : ""}${stars(r.stars)}<blockquote>${esc(r.text)}</blockquote><p class="rev-by">${esc(r.name)}${r.source ? `, via ${esc(r.source)}` : ""}</p></li>`;
  const reviewsSec = d.reviews.length
    ? `<section class="reviews sec"><div class="wrap">
    <div class="sec-head"><h2>${esc(d.reviewsTitle || "What customers say")}</h2>${exampleNote}${seeAll("reviews", "Read all reviews")}</div>
    <ul class="rev-list">${d.reviews.map(reviewItem).join("")}</ul>
  </div></section>`
    : "";

  const steps = d.steps?.length
    ? `<section class="steps-sec sec"><div class="wrap">
    <div class="sec-head"><h2>${esc(d.stepsTitle)}</h2></div>
    <ol class="steps">${d.steps.map((st, i) => `<li class="step${fade}"><span class="step-n" aria-hidden="true">${i + 1}</span><h3>${esc(st.title)}</h3><p>${esc(st.line)}</p></li>`).join("")}</ol>
  </div></section>`
    : "";
  const factsStrip = d.facts?.length
    ? `<section class="facts" aria-label="Quick facts"><div class="wrap"><ul class="fact-list">${d.facts.map((f) => `<li><strong>${esc(f.big)}</strong><span>${esc(f.small)}</span></li>`).join("")}</ul></div></section>`
    : "";
  const qaList = `<div class="faq-list">${(d.faq || []).map((f) => `<details class="qa"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div>`;
  const faq = d.faq?.length
    ? `<section class="faq sec"><div class="wrap faq-grid">
    <div class="sec-head"><h2>${esc(d.faqTitle)}</h2>${seeAll("faq", "All questions")}</div>
    ${qaList}
  </div></section>`
    : "";

  const hoursCard = d.hours.length
    ? `<div class="hours-card${fx.beam ? " fx-beam" : ""}"><h3>Opening hours</h3><table class="hours">${hoursRows(d.hours)}</table></div>`
    : `<div class="hours-card${fx.beam ? " fx-beam" : ""}"><h3>Opening hours</h3><p>Call ${esc(d.phone || "us")} for today's hours.</p></div>`;
  const visit = `<section id="hours" class="visit sec"><div class="wrap visit-grid">
    <div><h2>${esc(d.visitTitle)}</h2>
      ${d.about ? `<p class="about">${esc(d.about)}</p>` : ""}
      ${d.address ? `<p class="addr">${icon("pin")}<span>${esc(d.address)}</span></p>` : ""}
      ${d.phone ? `<p class="addr">${icon("call")}<a href="${tel}">${esc(d.phone)}</a></p>` : ""}
      <div class="actions">${callBtn()}${waBtn}${dirBtn}</div></div>
    ${hoursCard}
  </div></section>`;

  const marquee = fx.marquee
    ? `<div class="marquee" aria-hidden="true"><div class="track">${[...d.services, ...d.services].map((s) => `<span>${esc(s.title)}</span>`).join("")}</div></div>`
    : "";
  const organic = d.style === "organic";
  const heroBg = `${d.heroPhoto || d.heroVideo ? " has-photo" : ""}${d.heroMode === "animated" ? " hero-anim" : ""}`;

  // ---------- the home page ----------
  const homeBody = () => `<section class="hero${heroBg}${d.heroVideo ? " has-video" : ""}${d.style === "fullbleed" || d.style === "glass" ? " hero-full" : ""}">${heroVideoTag(d)}${d.style === "retro" ? '<div class="floor" aria-hidden="true"></div>' : ""}<div class="wrap hero-grid">
  <div class="hero-copy">
    <p class="kicker">${esc(d.kicker)}</p>
    <h1${fx.reveal ? ' class="reveal"' : ""}>${fx.reveal ? revealWords(d.headline) : esc(d.headline)}</h1>
    <p class="lead">${esc(d.sub)}</p>
    <div class="actions">${callBtn()}${waBtn}${dirBtn}</div>
    ${summary ? `<p class="hero-note">${icon("clock")}<span>${esc(summary)}</span></p>` : ""}
  </div>
  ${art(d).replace('class="art ', `class="art${fx.parallax ? " fx-parallax" : ""} `)}
</div></section>
${factsStrip}
${marquee}
${organic ? wave() : ""}
${d.whyFirst ? why + services : services + why}
${steps}
${gallery}
${reviewsSec}
${faq}
${organic ? wave(true) : ""}
${visit}`;

  // ---------- extra pages: same frame, a layout of their own ----------
  const money = (p) => {
    const t = String(p || "").trim();
    if (!t) return "Ask us";
    return /^[\d.,]+$/.test(t) ? `${d.currency || ""}${t}` : t;
  };
  const paras = (text) => {
    const out = [];
    for (const block of String(text || "").split(/\n\s*\n/)) {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      if (!lines.length) continue;
      if (lines.every((l) => /^[-*•]\s+/.test(l))) out.push(`<ul>${lines.map((l) => `<li>${esc(l.replace(/^[-*•]\s+/, ""))}</li>`).join("")}</ul>`);
      else if (lines.length === 1 && /^#{1,3}\s+/.test(lines[0])) out.push(`<h2>${esc(lines[0].replace(/^#{1,3}\s+/, ""))}</h2>`);
      else out.push(`<p>${lines.map(esc).join("<br>")}</p>`);
    }
    return out.join("");
  };

  const BODIES = {
    services: (p) => {
      const items = p.items?.length ? p.items : d.services.map((s) => ({ title: s.title, desc: s.line, price: "" }));
      const icons = d.services.map((s) => s.icon);
      return `<section class="services svc-page sec"><div class="wrap"><ol class="svc-rows">${items.map((s, i) => `<li class="svc svc-row${fade}">
        <span class="svc-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>${icon(icons[i % icons.length] || d.icon, "svc-ic")}
        <div><h2>${esc(s.title)}</h2>${s.desc ? `<p class="svc-desc">${esc(s.desc)}</p>` : ""}</div>
        <div class="svc-side">${s.price ? `<p class="svc-price">${esc(money(s.price))}</p>` : ""}<a class="btn btn-ghost" href="#contact">Ask about this</a></div></li>`).join("")}</ol>
        ${seeAll("pricing", `See ${pageOf("pricing")?.title.toLowerCase() || "prices"}`)}</div></section>`;
    },
    pricing: (p) => {
      const items = p.items?.length ? p.items : d.services.map((s) => ({ name: s.title, price: "", note: s.line }));
      const askNote = items.some((x) => !x.price) ? `<p class="price-foot">“Ask us” prices depend on the job. Call${d.whatsapp ? " or WhatsApp" : ""} for a quick quote.</p>` : "";
      if (p.layout === "cards") {
        return `<section class="pricing-sec sec"><div class="wrap"><ul class="price-cards">${items.map((x) => {
          const feats = String(x.note || "").split(/\n|;/).map((s) => s.trim()).filter(Boolean);
          return `<li class="svc price-card${x.featured ? " is-featured" : ""}${fade}">${x.featured ? '<span class="pc-badge">Most popular</span>' : ""}
            <h3>${esc(x.name)}</h3><p class="pc-price">${esc(money(x.price))}</p>
            ${feats.length > 1 ? `<ul class="pc-feat">${feats.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : feats.length ? `<p>${esc(feats[0])}</p>` : ""}
            <a class="btn ${x.featured ? `btn-primary${fx.shimmer ? " fx-shimmer" : ""}` : "btn-ghost"}" href="#contact">Book this</a></li>`;
        }).join("")}</ul>${askNote}</div></section>`;
      }
      return `<section class="pricing-sec sec"><div class="wrap"><div class="svc price-panel${fade}"><ul class="price-list">${items.map((x) => `<li class="price-item">
        <h3 class="pi-name">${esc(x.name)}</h3><span class="pi-dots" aria-hidden="true"></span><strong class="pi-price">${esc(money(x.price))}</strong>
        ${x.note ? `<p class="pi-note">${esc(x.note)}</p>` : ""}</li>`).join("")}</ul></div>${askNote}</div></section>`;
    },
    about: (p) => `<section class="about-sec sec"><div class="wrap about-grid">
        <div class="about-story">${paras(p.text) || `<p>${esc(d.name)} is a ${esc(d.noun)} in ${esc(d.city)}.</p>`}</div>
        <aside class="svc about-side${fade}"><dl>
          <div><dt>Where</dt><dd>${esc(d.address || d.city)}</dd></div>
          ${summary ? `<div><dt>Open</dt><dd>${esc(summary)}</dd></div>` : ""}
          ${d.phone ? `<div><dt>Call</dt><dd><a href="${tel}">${esc(d.phone)}</a></dd></div>` : ""}
        </dl><div class="actions">${callBtn()}${waBtn}</div></aside>
      </div></section>
      <section class="why sec"><div class="wrap"><div class="sec-head"><h2>${esc(d.whyTitle)}</h2></div>${valuesList}</div></section>
      ${factsStrip}`,
    gallery: () => `<section class="gallery gallery-page sec"><div class="wrap">
        ${sampleNote ? `<div class="sec-head">${sampleNote}</div>` : ""}
        ${allPhotos.length ? `<ul class="gal-wall">${allPhotos.map((ph) => `<li${fx.fade ? ' class="fx-fade"' : ""}><img src="${esc(ph.file)}" alt="${esc(ph.alt || d.name)}" loading="lazy"></li>`).join("")}</ul>` : `<p>Photos of ${esc(d.name)} will go here.</p>`}
        ${creditLine}</div></section>`,
    reviews: () => {
      const avg = d.reviews.length ? d.reviews.reduce((s, r) => s + r.stars, 0) / d.reviews.length : 0;
      return `<section class="reviews reviews-page sec"><div class="wrap">
        ${d.reviews.length ? `<div class="svc rev-summary${fade}"><span class="rs-score">${avg.toFixed(1)}</span><div>${stars(Math.round(avg))}<p>From ${d.reviews.length} review${d.reviews.length > 1 ? "s" : ""}</p></div></div>
        ${exampleNote ? `<div class="sec-head">${exampleNote}</div>` : ""}
        <ul class="rev-list rev-wall">${d.reviews.map(reviewItem).join("")}</ul>` : `<p>Reviews from ${esc(poss(d.name))} customers will go here.</p>`}
      </div></section>`;
    },
    faq: () => `<section class="faq faq-page sec"><div class="wrap faq-grid">
        ${qaList}
        <aside class="svc faq-side${fade}"><h2>Still have a question?</h2><p>Ask us directly. We're happy to help.</p><div class="actions">${callBtn()}${waBtn}<a class="btn btn-ghost" href="#contact">${icon("chat")}<span>Send a message</span></a></div></aside>
      </div></section>`,
    contact: () => `<section class="contact-page sec"><div class="wrap cp-grid">
        ${d.phone ? `<div class="svc cp-card${fade}">${icon("call", "svc-ic")}<h2>Call</h2><p>${esc(d.phone)}</p>${callBtn()}</div>` : ""}
        ${d.whatsapp ? `<div class="svc cp-card${fade}">${icon("chat", "svc-ic")}<h2>WhatsApp</h2><p>Message us any time.</p>${waBtn}</div>` : ""}
        ${d.address ? `<div class="svc cp-card${fade}">${icon("pin", "svc-ic")}<h2>Visit</h2><p>${esc(d.address)}</p>${dirBtn}</div>` : ""}
        <div class="svc cp-card${fade}">${icon("chat", "svc-ic")}<h2>Send a message</h2><p>Tell us what you need and we'll get back to you.</p><a class="btn btn-ghost" href="#contact">Write to us</a></div>
        <div class="cp-hours">${hoursCard}</div>
      </div></section>`,
    custom: (p) => `<section class="custom-sec sec"><div class="wrap prose">${paras(p.text)}</div></section>`,
  };

  const pageBody = (p) => `<section class="hero page-hero${heroBg}"><div class="wrap">
  <p class="crumbs"><a href="index.html">Home</a><span aria-hidden="true">/</span><span>${esc(p.title)}</span></p>
  <h1${fx.reveal ? ' class="reveal"' : ""}>${fx.reveal ? revealWords(p.title) : esc(p.title)}</h1>
  ${p.intro ? `<p class="lead">${esc(p.intro)}</p>` : ""}
</div></section>
${organic ? wave() : ""}
${(BODIES[p.type] || BODIES.custom)(p)}
${organic ? wave(true) : ""}`;

  // ---------- menu ----------
  const contactPage = pageOf("contact");
  const navItems = pages.length
    ? [`<a href="index.html"${page ? "" : ' aria-current="page"'}>Home</a>`,
       ...pages.map((p) => `<a href="${esc(p.file)}"${page?.file === p.file ? ' aria-current="page"' : ""}>${esc(p.title)}</a>`),
       ...(contactPage ? [] : ['<a href="#contact">Contact</a>'])]
    : ['<a href="#services">Services</a>', '<a href="#hours">Hours</a>', '<a href="#contact">Contact</a>'];
  const pageTitle = page ? `${esc(page.title)} | ${esc(d.name)} (demo)` : `${esc(d.name)} | ${esc(d.noun[0].toUpperCase() + d.noun.slice(1))} in ${esc(d.city)} (demo)`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${pageTitle}</title>
<meta name="description" content="${esc(page?.intro || d.sub)}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${esc(fontHref(d.font))}">
<style>${baseCss(d)}${SKINS[d.style](d)}${heroPhotoCss(d)}${heroMotionCss(d)}${PAGES_CSS}${areaCss(d.areas, d.palette)}</style>
</head>
<body class="s-${d.style} l-${d.layout}${fx.grain ? " has-grain" : ""}${pages.length ? " has-pages" : ""}${pages.length > 4 ? " many-pages" : ""}${page ? ` page-${page.type}` : " page-home"}">
<div class="progress" aria-hidden="true"></div>
<p class="ribbon">Demo concept for ${esc(d.name)}, made by ${esc(d.studio)}. This isn't their official website.</p>
<header class="top"><div class="wrap top-row">
  <a class="logo" href="${page ? "index.html" : "#top"}">${logo}</a>
  <nav class="nav" aria-label="Main">${navItems.join("")}</nav>
  ${pages.length ? `<details class="mnav"><summary>Menu</summary><nav class="mnav-panel" aria-label="Pages">${navItems.join("")}</nav></details>` : ""}
  ${callBtn("btn btn-primary top-cta")}
</div></header>
<main id="top">
${page ? pageBody(page) : homeBody()}
${contactSection(d, fx, tel, summary)}
<section${d.form ? "" : ' id="contact"'} class="cta-band sec"><div class="wrap cta-row">
  <div><h2>${esc(d.ctaHeadline)}</h2><p>${esc(d.ctaLine)}</p></div>
  ${callBtn("btn btn-invert")}
</div></section>
</main>
<footer class="foot"><div class="wrap foot-row">
  <p><strong>${esc(d.name)}</strong>${d.address ? `<br>${esc(d.address)}` : ""}</p>
  <p>${d.phone ? `<a href="${tel}">${esc(d.phone)}</a>` : ""}${d.whatsapp ? `<br><a href="${esc(d.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>` : ""}</p>
  <p class="made">Demo website by ${esc(d.studio)}</p>
</div>${videoCredit ? `<div class="wrap">${videoCredit}</div>` : ""}</footer>
${tel ? `<a class="callbar" href="${tel}">${icon("call")}<span>Call ${esc(d.phone)}</span></a>` : ""}
</body>
</html>`;
}

// Muted, looping video for the top section. No controls: it's decoration, and the headline carries the content.
function heroVideoTag(d) {
  if (!d.heroVideo) return "";
  const v = d.heroVideo;
  const clean = (f) => String(f).replace(/[^\w.-]/g, "");
  return `<video class="hero-video" autoplay muted loop playsinline preload="auto" disablepictureinpicture aria-hidden="true"${d.heroPhoto ? ` poster="${clean(d.heroPhoto.file)}"` : ""}><source src="${clean(v.file)}" type="${esc(v.type)}"></video>`;
}

// Photo behind the top section. Comes after the skin so it wins; the text side fades into the
// style's own background color, so the headline keeps its normal colors and stays readable.
function heroPhotoCss(d) {
  const full = d.style === "fullbleed" || d.style === "glass";
  if (!d.heroPhoto && !d.heroVideo) return full ? `.hero-full{background:radial-gradient(80% 70% at 70% 20%,color-mix(in srgb,var(--primary) 35%,transparent),transparent 70%),var(--band)}` : "";
  const file = String(d.heroPhoto?.file || "").replace(/[^\w.-]/g, "");
  return `
.hero.has-photo{--tint:var(--bg);position:relative;isolation:isolate;overflow:hidden;background:none}
.hero.has-photo::before{content:"";position:absolute;inset:0;z-index:-2;background:${file ? `url("${file}") center/cover no-repeat` : "var(--band)"};animation:kenburns 26s ease-in-out infinite alternate}
.hero.has-photo::after{content:"";position:absolute;inset:0;z-index:-1;background:var(--hero-overlay)}
@keyframes kenburns{from{scale:1;translate:0 0}to{scale:1.09;translate:-1.5% -1%}}
.s-material.l-c .hero.has-photo{--tint:var(--band)}
.l-a .hero.has-photo{--hero-overlay:linear-gradient(90deg,var(--tint) 0 38%,color-mix(in srgb,var(--tint) 78%,transparent) 58%,color-mix(in srgb,var(--tint) 30%,transparent))}
.l-c .hero.has-photo{--hero-overlay:linear-gradient(270deg,var(--tint) 0 38%,color-mix(in srgb,var(--tint) 78%,transparent) 58%,color-mix(in srgb,var(--tint) 30%,transparent))}
.l-b .hero.has-photo{--hero-overlay:radial-gradient(ellipse 60% 70% at 50% 42%,color-mix(in srgb,var(--tint) 93%,transparent) 0 45%,color-mix(in srgb,var(--tint) 62%,transparent) 100%)}
/* Full-photo heroes: the photo fills the screen, text sits on a dark scrim or a glass panel */
.hero-full.has-photo{--hero-overlay:linear-gradient(180deg,rgb(0 0 0 / .35),rgb(0 0 0 / .62))!important}
.s-glass .hero-full.has-photo{--hero-overlay:linear-gradient(180deg,rgb(0 0 0 / .12),rgb(0 0 0 / .32))!important}
@media (max-width:52rem){.hero.has-photo:not(.hero-full){--hero-overlay:linear-gradient(color-mix(in srgb,var(--tint) 88%,transparent),color-mix(in srgb,var(--tint) 88%,transparent))!important}}
`;
}

// Structure shared by every style. Skins set the look.
function baseCss(d) {
  const p = d.palette;
  const dark = p.dark ? 1 : 0;
  return `
:root{--bg:${p.bg};--surface:${p.surface};--text:${p.text};--muted:${p.muted};--primary:${p.primary};--on-primary:${p.primaryText || "#FFFFFF"};--accent:${p.accent};--band:${p.band};
--display:"${d.font.display}",system-ui,sans-serif;--body:"${d.font.body}",system-ui,sans-serif;--wrap:72rem;--pad:clamp(1rem,.5rem + 2.5vw,2.5rem);--sec:clamp(4rem,3rem + 4vw,7rem);color-scheme:${dark ? "dark" : "light"}}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font-family:var(--body);font-size:1.0625rem;line-height:1.6;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:var(--display);line-height:1.1;margin:0;text-wrap:balance}
p{margin:0;text-wrap:pretty}
a{color:inherit}
img,svg{display:block;max-width:100%}
.wrap{width:min(100% - 2*var(--pad),var(--wrap));margin-inline:auto}
:focus-visible{outline:3px solid var(--primary);outline-offset:3px}
.ic{width:1.15em;height:1.15em;flex:none}
.ribbon{margin:0;padding:.5rem var(--pad);font:500 .8125rem/1.4 system-ui,sans-serif;text-align:center;background:#111;color:#fff}
.top{position:sticky;top:0;z-index:20}
.top-row{display:flex;align-items:center;gap:1.5rem;min-height:4.5rem}
.logo{display:flex;align-items:center;gap:.65rem;text-decoration:none;margin-right:auto;min-width:0}
.logo-img{max-height:2.75rem;width:auto}
.mono{display:grid;place-items:center;width:2.4rem;height:2.4rem;flex:none;font-family:var(--display);font-weight:700;font-size:.95rem}
.logo-name{font-family:var(--display);font-weight:700;font-size:1.15rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nav{display:flex;gap:1.5rem}
.nav a{text-decoration:none;font-weight:500}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.55rem;min-height:3rem;padding:.75rem 1.4rem;font:600 1rem/1.2 var(--body);text-decoration:none;cursor:pointer;border:0}
.btn .ic{width:1.1em;height:1.1em}
.hero{padding-block:clamp(3rem,2rem + 4vw,6rem)}
.hero-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(2rem,1rem + 4vw,4.5rem);align-items:center}
.kicker{font-weight:600;color:var(--muted);margin-bottom:1rem}
.hero h1{font-size:clamp(2.4rem,1.4rem + 4vw,4.6rem)}
.lead{margin-top:1.25rem;font-size:clamp(1.1rem,1rem + .4vw,1.3rem);color:var(--muted);max-width:38ch}
.actions{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:2rem}
.hero-note{display:flex;align-items:center;gap:.5rem;margin-top:1.5rem;font-weight:600;color:var(--muted)}
.art{position:relative;display:grid;place-items:center;aspect-ratio:1;max-width:30rem;width:100%;justify-self:center}
.art-ic{width:42%;height:42%}
.sec{padding-block:var(--sec)}
.sec-head{max-width:40rem;margin-bottom:clamp(2rem,1.5rem + 2vw,3.5rem)}
.sec-head h2,.visit h2,.cta-band h2{font-size:clamp(1.9rem,1.3rem + 2.2vw,3rem)}
.sec-head p{margin-top:.9rem;color:var(--muted);font-size:1.125rem}
.svc-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.25rem}
.svc-list:has(> :nth-child(4):last-child){grid-template-columns:repeat(2,minmax(0,1fr))}
.svc h3{font-size:1.25rem;margin-top:1rem}
.svc p{margin-top:.45rem;color:var(--muted)}
.svc-ic{width:2.6rem;height:2.6rem}
.why-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:2rem}
.why-list h3{font-size:1.3rem}
.why-list p{margin-top:.5rem;color:var(--muted)}
.visit-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(2rem,1rem + 4vw,4rem);align-items:start}
.about{margin-top:1rem;max-width:44ch;color:var(--muted);font-size:1.05rem}
.addr{display:flex;gap:.6rem;align-items:flex-start;margin-top:1.1rem;font-size:1.1rem}
.addr .ic{margin-top:.3rem}
.hours-card h3{font-size:1.3rem;margin-bottom:1rem}
.hours{width:100%;border-collapse:collapse}
.hours th,.hours td{padding:.55rem 0;text-align:left;font-weight:400;border-bottom:1px solid color-mix(in srgb,var(--text) 14%,transparent)}
.hours th{font-weight:600;padding-right:1rem}
.hours td{text-align:right;font-variant-numeric:tabular-nums}
.cta-row{display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap}
.cta-band p{margin-top:.6rem;font-size:1.125rem;opacity:.85}
.foot{padding-block:2.5rem;font-size:.95rem}
.foot-row{display:flex;flex-wrap:wrap;gap:1rem 3rem;align-items:flex-start}
.foot .made{margin-left:auto;opacity:.7}
/* Layout B: centered hero, list services */
.l-b .hero-grid{grid-template-columns:1fr;text-align:center;justify-items:center}
.l-b .lead{margin-inline:auto}
.l-b .hero .actions,.l-b .hero-note{justify-content:center}
.l-b .art{max-width:22rem}
.l-b .svc-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:0 3rem}
.l-b .svc{display:grid;grid-template-columns:auto 1fr;column-gap:1.25rem;padding-block:1.4rem;border-top:1px solid color-mix(in srgb,var(--text) 14%,transparent)}
.l-b .svc .svc-ic{grid-row:span 2}
.l-b .svc h3{margin-top:0}
/* Layout C: art first */
.l-c .hero-grid{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}
.l-c .hero-copy{order:2}
.l-c .svc-list{grid-template-columns:repeat(2,minmax(0,1fr))}
@media (max-width:52rem){
  .nav{display:none}
  .hero-grid,.l-c .hero-grid{grid-template-columns:1fr}
  .l-c .hero-copy{order:0}
  .art{max-width:20rem}
  .svc-list,.l-b .svc-list,.l-c .svc-list,.why-list,.visit-grid{grid-template-columns:1fr}
  .foot .made{margin-left:0}
}
@media (max-width:30rem){
  .top-cta span{display:none}
  .top-cta{padding:.75rem}
  .logo-name{font-size:1rem}
}
/* ---- Gallery and reviews ---- */
.gal{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:clamp(10rem,8rem + 8vw,15rem);gap:1rem}
.gal li{overflow:hidden;border-radius:var(--r-img,16px)}
/* Spans chosen per photo count so the grid never leaves a gap */
.gal:has(> :nth-child(4)) > li:first-child{grid-row:span 2}
.gal:has(> :nth-child(4):last-child) > li:nth-child(4){grid-column:span 2}
.gal:has(> :nth-child(6):last-child) > li:nth-child(6){grid-column:span 3}
.gal:has(> :nth-child(2):last-child){grid-template-columns:1fr 1fr}
.gal:has(> :only-child){grid-template-columns:1fr;grid-auto-rows:clamp(14rem,10rem + 14vw,26rem)}
.gal img{width:100%;height:100%;object-fit:cover}
.credit{margin-top:1rem;font-size:.85rem;color:var(--muted)}
.rev-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.25rem}
.rev{position:relative;display:grid;align-content:start;gap:.75rem;padding:1.6rem;background:var(--surface);border-radius:var(--r-card,18px);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--text) 10%,transparent)}
.rev blockquote{margin:0;font-size:1.05rem;line-height:1.55}
.stars{color:var(--accent);letter-spacing:.15em;font-size:1.1rem}
.rev-by{font-weight:600;color:var(--muted);font-size:.95rem}
.rev-tag{position:absolute;top:1rem;right:1rem;padding:.15rem .6rem;border-radius:999px;font:600 .75rem/1.4 system-ui,sans-serif;background:color-mix(in srgb,var(--text) 10%,transparent);color:var(--text)}
@media (max-width:52rem){.gal{grid-template-columns:1fr 1fr}.gal > li{grid-row:auto!important;grid-column:auto!important}.gal > li:first-child{grid-column:span 2!important}.gal:has(> :nth-child(4):last-child) > li:nth-child(4){grid-column:span 2!important}.rev-list{grid-template-columns:1fr}}
/* Style-specific touches for photos and review cards */
.s-brutal .gal li,.s-brutal .rev{border:3px solid var(--text);border-radius:14px;box-shadow:6px 6px 0 var(--text)}
.s-brutal .rev:nth-child(2){background:var(--band)}
.s-editorial .gal li,.s-editorial .rev{border-radius:0}
.s-editorial .rev{background:none;box-shadow:none;border-top:2px solid var(--text);padding-inline:0}
.s-editorial .rev blockquote{font-family:var(--display);font-size:1.4rem;line-height:1.35}
.s-retro .gal li{box-shadow:0 0 0 1px var(--accent),0 0 30px -8px var(--accent)}
.s-retro .rev{box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--accent) 35%,transparent)}
.s-retro .gal img{filter:saturate(1.2) contrast(1.05)}
.s-skeuo .gal li{border:8px solid #FBF6EA;border-radius:4px;box-shadow:0 10px 20px -8px rgb(0 0 0 / .45)}
.s-skeuo .gal li:nth-child(odd){rotate:-1deg}.s-skeuo .gal li:nth-child(even){rotate:1deg}
.s-skeuo .rev{border-radius:4px;border:1px solid rgb(0 0 0 / .18)}
.s-neumorph .gal li{border-radius:22px;box-shadow:6px 6px 14px ${d.palette.shade || "rgb(0 0 0 / .15)"},-6px -6px 14px ${d.palette.light || "#fff"};padding:.5rem}
.s-neumorph .gal img{border-radius:16px}
.s-neumorph .rev{background:var(--bg);box-shadow:inset 5px 5px 10px ${d.palette.shade || "rgb(0 0 0 / .15)"},inset -5px -5px 10px ${d.palette.light || "#fff"}}
.s-organic .gal li{border-radius:40px 40px 40px 8px}
.s-organic .rev{border-radius:28px 28px 28px 6px}
.s-kinetic .gal li,.s-kinetic .rev{border-radius:0}
.s-kinetic .rev{border-left:4px solid var(--primary)}
.s-aurora .rev{backdrop-filter:blur(14px)}
.s-bento .gal li,.s-bento .rev{border-radius:20px}
/* ---- Premium sections ---- */
.facts{padding-block:clamp(1.5rem,1rem + 2vw,2.5rem);border-block:1px solid color-mix(in srgb,var(--text) 12%,transparent)}
.fact-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:1rem 2rem}
.fact-list li{display:grid;gap:.15rem}
.fact-list strong{font-family:var(--display);font-size:clamp(1.6rem,1.2rem + 1.4vw,2.4rem);line-height:1.05;color:var(--text)}
.fact-list span{color:var(--muted);font-size:.95rem}
.steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.5rem;counter-reset:none}
.step{position:relative;padding:1.6rem;border-radius:var(--r-card,18px);background:var(--surface);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--text) 10%,transparent)}
.step-n{display:grid;place-items:center;width:2.6rem;height:2.6rem;border-radius:50%;background:var(--primary);color:var(--on-primary);font-family:var(--display);font-weight:700;margin-bottom:1rem}
.step h3{font-size:1.25rem}
.step p{margin-top:.45rem;color:var(--muted)}
.steps .step:not(:last-child)::after{content:"";position:absolute;top:2.9rem;left:calc(100% + .1rem);width:1.3rem;height:2px;background:color-mix(in srgb,var(--text) 25%,transparent)}
.faq-grid{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(2rem,1rem + 3vw,4rem);align-items:start}
.qa{border-bottom:1px solid color-mix(in srgb,var(--text) 14%,transparent)}
.qa summary{display:flex;justify-content:space-between;gap:1rem;padding-block:1.15rem;font-weight:600;font-size:1.1rem;cursor:pointer;list-style:none}
.qa summary::-webkit-details-marker{display:none}
.qa summary::after{content:"+";font-size:1.5rem;line-height:1;color:var(--primary);transition:rotate .25s}
.qa[open] summary::after{rotate:45deg}
.qa p{padding-bottom:1.2rem;color:var(--muted);max-width:60ch}
@media (max-width:52rem){.steps,.faq-grid{grid-template-columns:1fr}.steps .step::after{display:none}}
/* ---- Premium details on every style ---- */
.progress{position:fixed;inset:0 0 auto;height:3px;z-index:60;background:linear-gradient(90deg,var(--primary),var(--accent));transform-origin:0 50%;scale:0 1}
@supports (animation-timeline:scroll()){.progress{animation:grow linear both;animation-timeline:scroll(root)}@keyframes grow{to{scale:1 1}}}
@supports not (animation-timeline:scroll()){.progress{display:none}}
.nav a{position:relative}
.nav a::after{content:"";position:absolute;left:0;right:0;bottom:-4px;height:2px;background:currentColor;scale:0 1;transform-origin:0 50%;transition:scale .25s}
.nav a:hover::after{scale:1 1}
.gal img{transition:scale .6s cubic-bezier(.2,.7,.2,1)}
.gal li:hover img{scale:1.06}
.callbar{display:none}
@media (max-width:52rem){
  .callbar{position:fixed;left:.75rem;right:.75rem;bottom:.75rem;z-index:50;display:flex;align-items:center;justify-content:center;gap:.55rem;min-height:3.25rem;border-radius:999px;background:var(--primary);color:var(--on-primary);font:700 1rem/1 var(--body);text-decoration:none;box-shadow:0 12px 30px -8px rgb(0 0 0 / .45)}
  .callbar .ic{width:1.2em;height:1.2em}
  .foot{padding-bottom:5.5rem}
}
.has-grain::after{content:"";position:fixed;inset:0;z-index:70;pointer-events:none;opacity:.06;mix-blend-mode:overlay;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.reveal .w{display:inline-block;animation:rise .9s cubic-bezier(.2,.7,.2,1) both;animation-delay:calc(var(--i) * 70ms + 120ms)}
@keyframes rise{from{opacity:0;translate:0 .45em;filter:blur(6px)}to{opacity:1;translate:0 0;filter:none}}
@supports (animation-timeline:view()){.fx-parallax{animation:drift linear both;animation-timeline:view();animation-range:cover 30% cover 100%}@keyframes drift{to{translate:0 -60px}}}
/* New sections in the original styles */
.s-material .step{box-shadow:0 1px 3px rgb(0 0 0 / .12),0 1px 2px rgb(0 0 0 / .08)}
.s-organic .step{border-radius:28px 28px 28px 6px}
.s-skeuo .step{border-radius:4px;border:1px solid rgb(0 0 0 / .18)}
.s-aurora .step{backdrop-filter:blur(14px)}
.s-kinetic .step{border-radius:0;border-left:4px solid var(--primary)}.s-kinetic .step-n{border-radius:0}.s-kinetic .fact-list strong{color:var(--primary);text-transform:uppercase}
.s-neumorph .step{background:var(--bg);box-shadow:6px 6px 14px ${d.palette.shade || "rgb(0 0 0 / .15)"},-6px -6px 14px ${d.palette.light || "#fff"};border-radius:22px}
.s-bento .step{border-radius:20px}
.s-retro .step{box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--accent) 35%,transparent)}.s-retro .step-n{box-shadow:0 0 18px var(--primary)}.s-retro .fact-list strong{color:var(--accent);text-shadow:0 0 14px var(--accent)}
.s-brutal .step{border:3px solid var(--text);border-radius:14px;box-shadow:6px 6px 0 var(--text)}.s-brutal .step-n{border:3px solid var(--text);background:var(--accent);color:var(--text)}.s-brutal .facts{background:var(--band);border-block:3px solid var(--text)}.s-brutal .qa{border-bottom:3px solid var(--text)}
.s-editorial .step{background:none;box-shadow:none;border-radius:0;border-top:2px solid var(--text);padding-inline:0}.s-editorial .step-n{background:none;color:var(--accent);border:1px solid var(--accent)}.s-editorial .fact-list strong{font-weight:400}
/* ---- Shared effects ---- */
@property --ba{syntax:"<angle>";inherits:false;initial-value:0deg}
.fx-beam{position:relative}
.fx-beam::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:1.5px;pointer-events:none;
  background:conic-gradient(from var(--ba),transparent 0 72%,var(--primary) 84%,var(--accent) 94%,transparent);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:beam 6s linear infinite}
@keyframes beam{to{--ba:360deg}}
.fx-shimmer{position:relative;overflow:hidden;isolation:isolate}
.fx-shimmer::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(110deg,transparent 30%,rgb(255 255 255 / .38) 50%,transparent 70%);translate:-120% 0;animation:shim 3.6s ease-in-out infinite}
@keyframes shim{55%,100%{translate:120% 0}}
.marquee{overflow:hidden;padding-block:1rem}
.marquee .track{display:flex;gap:3rem;width:max-content;animation:slide 30s linear infinite}
.marquee span{white-space:nowrap}
@keyframes slide{to{translate:-50% 0}}
@supports (animation-timeline:view()){
  .fx-fade{animation:bfade linear both;animation-timeline:view();animation-range:entry 0% entry 55%}
  @keyframes bfade{from{opacity:0;filter:blur(6px);translate:0 18px}to{opacity:1;filter:none;translate:0 0}}
}
/* ---- Contact form ---- */
/* Floating contact button + popup */
.contact-fab{position:fixed;right:clamp(.75rem,2vw,1.5rem);bottom:clamp(.75rem,2vw,1.5rem);z-index:60;display:inline-flex;align-items:center;gap:.5rem;min-height:3.25rem;padding:0 1.35rem;border-radius:999px;background:var(--primary);color:var(--on-primary);font:700 1rem/1 var(--body);text-decoration:none;box-shadow:0 14px 32px -10px rgb(0 0 0 / .5);transition:translate .2s,box-shadow .2s}
.contact-fab:hover{translate:0 -2px;box-shadow:0 18px 36px -10px rgb(0 0 0 / .55)}
.contact-fab:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.contact-fab .ic{width:1.25em;height:1.25em}
body:has(.cmodal:target,.cmodal :target) :is(.contact-fab,.callbar){display:none}
body:has(.cmodal:target,.cmodal :target){overflow:hidden}
.cmodal{position:fixed;inset:0;z-index:100;display:none;place-items:center;padding:clamp(.75rem,3vw,2rem);overflow-y:auto}
.cmodal:target,.cmodal:has(:target){display:grid}
.cmodal-bg{position:fixed;inset:0;background:rgb(10 12 16 / .6);backdrop-filter:blur(4px);cursor:default;animation:cm-fade .25s ease both}
.cmodal .form-card.cmodal-box{position:relative;width:min(44rem,100%);margin:auto;color:var(--text);background:linear-gradient(var(--surface),var(--surface)),var(--bg);padding:clamp(1.25rem,1rem + 1.5vw,2.25rem);animation:cm-in .35s cubic-bezier(.2,.7,.2,1) both}
@keyframes cm-fade{from{opacity:0}}
@keyframes cm-in{from{opacity:0;translate:0 24px;scale:.97}}
.cmodal-x{position:absolute;top:.75rem;right:.75rem;display:grid;place-items:center;width:2.5rem;height:2.5rem;border-radius:50%;font-size:1.6rem;line-height:1;color:var(--text);text-decoration:none;background:color-mix(in srgb,var(--text) 8%,transparent)}
.cmodal-x:hover{background:color-mix(in srgb,var(--text) 15%,transparent)}
.cmodal-t{font-family:var(--display);font-size:clamp(1.5rem,1.2rem + 1.2vw,2.1rem);line-height:1.15;margin:0 2.5rem .4rem 0}
.cmodal-intro{color:var(--muted);margin:0}
.contact-ways{list-style:none;margin:1rem 0 1.5rem;padding:0;display:flex;flex-wrap:wrap;gap:.5rem 1.5rem;font-size:.95rem}
.contact-ways li{display:flex;gap:.5rem;align-items:flex-start}
.contact-ways .ic{margin-top:.3rem;color:var(--primary)}
.form-card{position:relative;padding:clamp(1.25rem,1rem + 1.5vw,2.25rem);background:var(--surface);border-radius:var(--r-card,18px);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--text) 12%,transparent)}
.cform{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.1rem 1rem}
.fld{display:grid;gap:.4rem;min-width:0;margin:0;padding:0;border:0}
.fld-wide{grid-column:1/-1}
.fld label,.fld legend{font-weight:600;font-size:.95rem;padding:0}
.fld legend{margin-bottom:.5rem}
.req{color:var(--primary)}
.cform input:not([type=radio]),.cform select,.cform textarea{width:100%;min-height:3rem;padding:.7rem .9rem;font:inherit;font-size:1rem;color:var(--text);background:var(--field-bg,color-mix(in srgb,var(--bg) 70%,transparent));border:var(--field-border,1.5px solid color-mix(in srgb,var(--text) 22%,transparent));border-radius:var(--r-field,10px);transition:border-color .2s,box-shadow .2s}
.cform textarea{resize:vertical;min-height:7rem}
.cform select{appearance:none;padding-right:2.4rem;background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);background-position:calc(100% - 1.2rem) 52%,calc(100% - .85rem) 52%;background-size:.35rem .35rem;background-repeat:no-repeat}
.cform select option{color:#111;background:#fff}
.cform input::placeholder,.cform textarea::placeholder{color:var(--muted);opacity:.8}
.cform input:not([type=radio]):focus,.cform select:focus,.cform textarea:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--primary) 28%,transparent)}
.hint{color:var(--muted);font-size:.85rem}
.chips{display:flex;flex-wrap:wrap;gap:.5rem}
.chips label{position:relative;display:inline-flex;cursor:pointer;font-weight:500}
.chips input{position:absolute;opacity:0;inset:0;margin:0;cursor:pointer}
.chips span{display:inline-flex;align-items:center;min-height:2.6rem;padding:.5rem 1rem;border-radius:var(--r-chip,999px);border:var(--field-border,1.5px solid color-mix(in srgb,var(--text) 22%,transparent));background:var(--field-bg,transparent);transition:background-color .2s,color .2s}
.chips label:hover span{border-color:var(--primary)}
.chips input:checked + span{background:var(--primary);color:var(--on-primary);border-color:var(--primary)}
.chips input:focus-visible + span{outline:3px solid var(--primary);outline-offset:2px}
.form-foot{display:flex;flex-wrap:wrap;align-items:center;gap:.75rem 1.25rem;margin-top:.4rem}
.form-note{color:var(--muted);font-size:.85rem}
.sent{display:none;gap:.9rem;justify-items:start}
.sent-t{display:flex;gap:.6rem;align-items:center;font-family:var(--display);font-size:1.5rem;font-weight:700}
.sent-t .ic{color:var(--primary);width:1.4em;height:1.4em}
.sent:target{display:grid}
.form-card:has(.sent:target) .cform{display:none}
@media (max-width:52rem){.cform{grid-template-columns:1fr}.contact-fab.has-callbar{bottom:4.75rem}.cmodal{place-items:end center;padding:0}.cmodal .form-card.cmodal-box{width:100%;margin:auto 0 0;border-radius:var(--r-card,18px) var(--r-card,18px) 0 0!important;max-height:none}}
.s-material{--r-field:8px}.s-material .form-card{border-radius:12px;box-shadow:0 2px 6px rgb(0 0 0 / .1),0 1px 2px rgb(0 0 0 / .06)}
.s-organic{--r-field:16px}.s-organic .form-card{border-radius:32px 32px 32px 8px}
.s-skeuo{--r-field:4px;--field-bg:#FFFDF6}.s-skeuo .form-card{border-radius:4px;border:1px solid rgb(0 0 0 / .18);box-shadow:0 10px 20px -10px rgb(0 0 0 / .35)}
.s-aurora .form-card,.s-glass .form-card{backdrop-filter:blur(16px)}
.s-kinetic,.s-zen,.s-fullbleed,.s-editorial{--r-field:0;--r-chip:0}
.s-kinetic .form-card{border-radius:0;border-left:4px solid var(--primary)}
.s-zen .form-card,.s-fullbleed .form-card{border-radius:0;box-shadow:none}
.s-editorial{--field-bg:transparent}.s-editorial .form-card{background:none;box-shadow:none;border-radius:0;border-top:2px solid var(--text);padding-inline:0}
.s-neumorph{--field-border:0;--field-bg:var(--bg);--r-field:14px}
.s-neumorph .form-card{background:var(--bg);border-radius:26px;box-shadow:8px 8px 18px ${d.palette.shade || "rgb(0 0 0 / .15)"},-8px -8px 18px ${d.palette.light || "#fff"}}
.s-neumorph .cform input:not([type=radio]),.s-neumorph .cform select,.s-neumorph .cform textarea,.s-neumorph .chips span{box-shadow:inset 4px 4px 8px ${d.palette.shade || "rgb(0 0 0 / .15)"},inset -4px -4px 8px ${d.palette.light || "#fff"}}
.s-bento .form-card{border-radius:20px}
.s-retro .form-card{box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--accent) 35%,transparent),0 0 40px -12px var(--primary)}
.s-brutal{--field-border:3px solid var(--text)}.s-brutal .form-card{border:3px solid var(--text);border-radius:16px;box-shadow:8px 8px 0 var(--text)}
.s-noir,.s-deco{--r-field:0;--r-chip:0;--field-border:1px solid color-mix(in srgb,var(--primary) 45%,transparent)}
.s-noir .form-card,.s-deco .form-card{border-radius:0;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--primary) 40%,transparent)}
.s-clay{--r-field:16px}.s-clay .form-card{border-radius:30px;box-shadow:0 18px 34px -14px color-mix(in srgb,var(--primary) 45%,transparent),inset -6px -8px 16px rgb(0 0 0 / .07),inset 6px 8px 16px rgb(255 255 255 / .85)}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;
}
