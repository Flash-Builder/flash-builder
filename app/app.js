// Flash Builder dashboard. All text is inserted with textContent, never innerHTML.
const $ = (id) => document.getElementById(id);

const VERDICTS = {
  all: "All",
  none: "No website",
  social: "Social page only",
  broken: "Broken or parked",
  outdated: "Outdated",
  ok: "Looks fine",
  unknown: "Couldn't check",
  closed: "Closed",
};
const LEAD_STATUSES = [
  ["new", "New"],
  ["shortlisted", "Shortlisted"],
  ["skipped", "Not a fit"],
  ["contacted", "Contacted"],
  ["replied", "Replied"],
  ["won", "Won"],
];
const OPPORTUNITY = ["none", "social", "broken", "outdated"];

const state = { searches: [], current: null, leads: [], filter: "opportunities", poll: null, styles: {} };

async function api(path, opts = {}) {
  const res = await fetch(path, { headers: { "Content-Type": "application/json" }, ...opts });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Request failed (${res.status})`);
    err.hint = data.hint;
    throw err;
  }
  return data;
}

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "bg") node.style.background = v; // CSSOM, allowed by the page's security policy
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) if (c != null && c !== false) node.append(c.nodeType ? c : document.createTextNode(String(c)));
  return node;
}

const verdictOf = (l) => (l.businessStatus && l.businessStatus !== "OPERATIONAL" ? "closed" : l.check?.verdict ?? "pending");

// ---------- status bar ----------
async function refreshStatus() {
  try {
    const s = await api("/api/status");
    $("setup").hidden = s.hasKey;
    const u = $("usage");
    u.replaceChildren("Google requests this month: ", el("b", {}, `${s.used} of ${s.limit}`));
    u.classList.toggle("warn", s.used >= s.limit * 0.9);
    state.status = s;
    if (s.country?.locationExample) $("q-location").placeholder = s.country.locationExample;
    $("mail-usage").replaceChildren(...(s.mail.ready ? ["Emails today: ", el("b", {}, `${s.mail.sentToday} of ${s.mail.dailyLimit}`)] : ["Gmail not set up"]));
    const pb = $("publish-btn");
    pb.textContent = s.netlify.pending ? `Published demos (${s.netlify.pending} waiting)` : "Published demos";
    pb.title = s.netlify.hasToken ? "See the live links, and choose which demos to put online" : "Add NETLIFY_TOKEN to .env first (README step 6)";
  } catch {
    $("usage").textContent = "Can't reach the Flash Builder server. Is it still running?";
  }
}

// ---------- history ----------
function renderHistory() {
  const list = $("history");
  list.replaceChildren(
    ...state.searches.map((s) => {
      const opp = OPPORTUNITY.reduce((n, k) => n + (s.counts[k] || 0), 0);
      const total = s.leadIds.length;
      return el("li", {},
        el("button", { type: "button", "aria-current": String(state.current?.id === s.id), onclick: () => openSearch(s.id) },
          el("span", { class: "h-q" }, s.query),
          el("span", { class: "h-meta" }, `${total} found, ${opp} need a website${s.requests ? `, ${s.requests} request${s.requests > 1 ? "s" : ""}` : ""}, ${new Date(s.createdAt).toLocaleDateString()}`)));
    }));
  $("history-empty").hidden = state.searches.length > 0;
}

async function loadHistory() {
  state.searches = await api("/api/searches");
  renderHistory();
}

// ---------- results ----------
function renderFilters() {
  const counts = state.current.counts;
  const opp = OPPORTUNITY.reduce((n, k) => n + (counts[k] || 0), 0);
  const items = [["opportunities", "Need a website", opp]];
  for (const k of ["none", "social", "broken", "outdated", "ok", "unknown", "closed"]) if (counts[k]) items.push([k, VERDICTS[k], counts[k]]);
  items.push(["all", "All", state.leads.length]);
  $("filters").replaceChildren(
    ...items.map(([key, label, n]) =>
      el("button", { type: "button", class: "chip", "aria-pressed": String(state.filter === key), onclick: () => { state.filter = key; renderResults(); } },
        label, el("span", { class: "n" }, n))));
}

function statusSelect(l, rowRef) {
  return el("select", { "aria-label": `Status for ${l.name || "this business"}`, onchange: async (e) => {
    try {
      await api(`/api/leads/${encodeURIComponent(l.id)}`, { method: "PATCH", body: JSON.stringify({ status: e.target.value }) });
      l.status = e.target.value;
      rowRef()?.classList.toggle("dim", l.status === "skipped");
    } catch (err) { alert(`Couldn't save the status. ${err.message}`); }
  } }, LEAD_STATUSES.map(([val, label]) => el("option", { value: val, selected: l.status === val }, label)));
}

// Google only allows keeping business details for 30 days. Older leads keep your status, notes, website check
// and emails, and can be refreshed for one request.
function expiredRow(l) {
  const v = verdictOf(l);
  const emails = l.check?.emails || [];
  const refresh = el("button", { type: "button", class: "btn small primary-soft", onclick: async (e) => {
    e.target.disabled = true;
    e.target.textContent = "Refreshing…";
    try {
      Object.assign(l, await api(`/api/leads/${encodeURIComponent(l.id)}/refresh`, { method: "POST" }));
      delete l.expiredAt;
      row.replaceWith(leadRow(l));
      refreshStatus();
    } catch (err) {
      alert(`${err.message} ${err.hint || ""}`);
      e.target.disabled = false;
      e.target.textContent = "Refresh from Google";
    }
  } }, "Refresh from Google");
  const row = el("tr", { class: l.status === "skipped" ? "dim expired" : "expired" },
    el("td", {},
      el("div", { class: "b-name" }, "Details removed"),
      el("p", { class: "expired-note" }, `Google allows keeping business details for ${state.status?.keepDays || 30} days. Refreshing uses 1 request.`),
      refresh),
    el("td", {}, el("span", { class: `badge ${v}` }, VERDICTS[v] || v)),
    el("td", {}, el("span", { class: "muted" }, l.notes ? `Your notes: ${l.notes}` : "Refresh to see the details again.")),
    el("td", {}, el("div", { class: "contact" }, emails.length ? emails.map((e) => el("a", { href: `mailto:${e}` }, e)) : el("span", { class: "none" }, "No email found"))),
    el("td", { class: "demo-cell" }, l.demo ? el("a", { class: "btn small", href: l.demo.url, target: "_blank", rel: "noopener" }, "Open demo") : el("span", { class: "muted" }, "—")),
    el("td", {}, el("div", { class: "status-cell" }, statusSelect(l, () => row))));
  return row;
}

function leadRow(l) {
  if (l.expiredAt) return expiredRow(l);
  const v = verdictOf(l);
  const c = l.check || {};
  const emails = c.emails || [];

  const business = el("td", {},
    el("div", { class: "b-name" }, l.name),
    el("div", { class: "b-cat" }, l.category || "Business"),
    el("div", { class: "b-addr" }, l.shortAddress || l.address || "No storefront (serves the area)"),
    el("div", { class: "b-links" }, l.mapsUrl && el("a", { href: l.mapsUrl, target: "_blank", rel: "noopener noreferrer" }, "Google Maps")));

  const site = el("td", {},
    el("span", { class: `badge ${v}` }, v === "pending" ? "Checking" : VERDICTS[v] || v),
    l.website && el("a", { class: "site-url", href: l.website, target: "_blank", rel: "noopener noreferrer", title: l.website }, l.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")));

  const issues = (c.issues || []).filter((i) => i.code !== "no-site");
  const what = el("td", {},
    v === "none" ? el("span", { class: "muted" }, issues[0]?.label || "No website listed on Google")
      : issues.length ? el("ul", { class: "issues" }, issues.map((i) => el("li", {}, i.label)))
      : v === "pending" ? el("span", { class: "muted" }, "Checking the site…")
      : el("span", { class: "muted" }, "Nothing major found"));

  const contact = el("td", {},
    el("div", { class: "contact" },
      l.phone ? el("a", { href: `tel:${l.phone.replace(/[^\d+]/g, "")}` }, l.phone) : el("span", { class: "none" }, "No phone listed"),
      emails.length ? emails.map((e) => el("a", { href: `mailto:${e}` }, e)) : el("span", { class: "none" }, v === "pending" ? "Looking for email…" : "No email found"),
      !emails.length && v !== "pending" && OPPORTUNITY.includes(v) && el("span", { class: "call-flag" }, "Call or message")));

  const select = statusSelect(l, () => row);

  const recheck = l.website && el("button", { type: "button", class: "btn small", onclick: async (e) => {
    e.target.disabled = true;
    e.target.textContent = "Checking…";
    try {
      const updated = await api(`/api/leads/${encodeURIComponent(l.id)}/recheck`, { method: "POST" });
      Object.assign(l, updated);
      await openSearch(state.current.id, true);
    } catch (err) {
      alert(`Couldn't re-check this site. ${err.message}`);
      e.target.disabled = false;
      e.target.textContent = "Check again";
    }
  } }, "Check again");

  const emailBtn = el("button", { type: "button", class: "btn small primary-soft", onclick: () => openSend(l) }, l.check?.emails?.length ? "Email…" : "Pitch…");
  const tags = [l.emailed && el("span", { class: "tag sent" }, "Emailed"), l.optedOut && el("span", { class: "tag optout" }, "Do not contact")];
  const row = el("tr", { class: l.status === "skipped" ? "dim" : null }, business, site, what, contact, demoCell(l, v), el("td", {}, el("div", { class: "status-cell" }, select, emailBtn, recheck, tags)));
  return row;
}

function demoCell(l, v) {
  const td = el("td", { class: "demo-cell" });
  const run = async (btn, payload, busyText) => {
    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = busyText;
    try {
      const updated = await api(`/api/leads/${encodeURIComponent(l.id)}/demo`, { method: "POST", body: JSON.stringify(payload) });
      Object.assign(l, updated, { demoState: l.demoLive ? "changed" : "off" });
      td.replaceWith(demoCell(l, v));
      refreshStatus();
    } catch (err) {
      alert(`${err.message} ${err.hint || ""}`);
      btn.disabled = false;
      btn.textContent = label;
    }
  };

  if (!l.demo) {
    const b = el("button", { type: "button", class: "btn small primary-soft", disabled: v === "pending" }, "Build demo");
    b.addEventListener("click", () => run(b, { style: "auto" }, "Building…"));
    td.append(b);
    return td;
  }

  const d = l.demo;
  const styleSel = el("select", { "aria-label": `Demo style for ${l.name}` },
    el("option", { value: "auto", selected: d.styleChoice === "auto" }, `Auto (${state.styles[d.style] || d.style})`),
    Object.entries(state.styles).map(([k, name]) => el("option", { value: k, selected: d.styleChoice === k }, name)));
  styleSel.addEventListener("change", () => run(shuffleBtn, { style: styleSel.value }, "Building…"));
  const shuffleBtn = el("button", { type: "button", class: "btn small" }, "Shuffle");
  shuffleBtn.addEventListener("click", () => run(shuffleBtn, { shuffle: true }, "Shuffling…"));

  td.append(
    el("a", { class: "btn small primary-soft", href: `${d.url}?v=${Date.parse(d.builtAt)}`, target: "_blank", rel: "noopener" }, "Open demo"),
    el("button", { type: "button", class: "btn small", onclick: () => openCustomize(l) }, "Customize…"),
    el("p", { class: "demo-meta" }, `${d.palette} palette, ${d.font}${d.logo ? ", their logo" : ""}${d.brandColor ? ", their color" : ""}. `,
      l.demoLive && l.demoPublicUrl
        ? el("span", {}, el("a", { href: l.demoPublicUrl, target: "_blank", rel: "noopener" }, "Live link"), l.demoState === "changed" ? " (your latest changes aren't published)" : "")
        : "Not online yet"),
    styleSel,
    shuffleBtn);
  return td;
}

function renderResults() {
  const s = state.current;
  $("empty").hidden = true;
  $("results").hidden = false;
  $("r-title").textContent = s.query;
  const checking = s.state === "checking";
  $("r-meta").replaceChildren(`${s.leadIds.length} businesses found on ${new Date(s.createdAt).toLocaleString()}${s.requests ? ` using ${s.requests} Google request${s.requests > 1 ? "s" : ""}` : ""}${checking ? ". Checking websites now…" : "."}`,
    s.note ? el("span", { class: "search-note" }, s.note) : "");
  const more = $("more-btn");
  more.hidden = !s.hasMore;
  more.disabled = checking;
  more.title = checking ? "Wait until the websites are checked" : "Gets the next 20 businesses from Google (1 request)";
  $("export").href = `/api/searches/${encodeURIComponent(s.id)}/export`;
  renderFilters();

  const order = { none: 0, social: 1, broken: 2, outdated: 3, pending: 4, unknown: 5, ok: 6, closed: 7 };
  const shown = state.leads
    .filter((l) => {
      const v = verdictOf(l);
      if (state.filter === "all") return true;
      if (state.filter === "opportunities") return OPPORTUNITY.includes(v) || v === "pending";
      return v === state.filter;
    })
    .sort((a, b) => order[verdictOf(a)] - order[verdictOf(b)] || (b.check?.score || 0) - (a.check?.score || 0));

  $("rows").replaceChildren(...shown.map(leadRow));
  $("no-rows").hidden = shown.length > 0;
}

async function openSearch(id, keepFilter = false) {
  clearTimeout(state.poll);
  const data = await api(`/api/searches/${encodeURIComponent(id)}`);
  const changedSearch = state.current?.id !== id;
  state.current = data.search;
  state.leads = data.leads;
  if (changedSearch && !keepFilter) state.filter = "opportunities";
  const i = state.searches.findIndex((s) => s.id === id);
  if (i !== -1) state.searches[i] = data.search;
  renderHistory();
  renderResults();
  if (data.search.state === "checking") state.poll = setTimeout(() => openSearch(id, true), 2000);
  else if (keepFilter && !changedSearch) refreshStatus(); // "Stop early" may have used more requests in the background
}

// ---------- events ----------
$("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const msg = $("form-msg");
  const btn = $("search-btn");
  const body = { type: form.type.value.trim(), location: form.location.value.trim(), pages: Number(form.pages.value), stopEarly: form.stopEarly.checked };
  if (!body.type || !body.location) {
    msg.className = "form-msg error";
    msg.textContent = "Enter a business type and a location.";
    return;
  }
  btn.disabled = true;
  btn.textContent = "Searching Google…";
  msg.className = "form-msg";
  msg.textContent = "";
  try {
    const s = await api("/api/search", { method: "POST", body: JSON.stringify(body) });
    if (s.repeat) {
      await openSearch(s.id);
      msg.textContent = `You searched this on ${new Date(s.createdAt).toLocaleDateString()}, so it opened that search instead of paying for the same businesses again.${s.hasMore ? " Use \"Find 20 more\" for new ones." : " To run it again anyway, delete that search first."}`;
      return;
    }
    state.searches.unshift(s);
    await openSearch(s.id);
    msg.textContent = `Found ${s.leadIds.length} businesses. Checking their websites…`;
  } catch (err) {
    msg.className = "form-msg error";
    msg.replaceChildren(err.message, err.hint ? el("span", { class: "hint" }, err.hint) : "");
  } finally {
    btn.disabled = false;
    btn.textContent = "Find businesses";
    refreshStatus();
  }
});

$("delete-search").addEventListener("click", async () => {
  const s = state.current;
  if (!s || !confirm(`Delete the search "${s.query}"? Leads you've marked with a status are kept.`)) return;
  try {
    await api(`/api/searches/${encodeURIComponent(s.id)}`, { method: "DELETE" });
    clearTimeout(state.poll);
    state.searches = state.searches.filter((x) => x.id !== s.id);
    state.current = null;
    $("results").hidden = true;
    $("empty").hidden = false;
    renderHistory();
  } catch (err) {
    alert(`Couldn't delete the search. ${err.message}`);
  }
});

// ---------- customize dialog ----------
const cz = $("cz-dialog");
let czLead = null;
let czPalette = "";

function reviewRow(r = {}) {
  const li = el("li", {},
    el("input", { placeholder: "Customer name", value: r.name || "", class: "r-name", "aria-label": "Customer name" }),
    el("input", { placeholder: "Where from (Google, Facebook…)", value: r.source || "", class: "r-source", "aria-label": "Where the review is from" }),
    el("select", { class: "r-stars", "aria-label": "Stars" }, [5, 4, 3, 2, 1].map((n) => el("option", { value: n, selected: Number(r.stars || 5) === n }, `${n} stars`))),
    el("textarea", { rows: 3, class: "r-text", placeholder: "The review, word for word", "aria-label": "Review text" }, r.text || ""),
    el("label", { class: "cz-check" }, el("input", { type: "checkbox", class: "r-consent", checked: r.consent === true }), "The customer agreed to have this shown on the website"),
    el("button", { type: "button", class: "btn ghost small rm", onclick: () => li.remove() }, "Remove"));
  return li;
}

function renderThumbs(leadId, uploads) {
  $("cz-thumbs").replaceChildren(...uploads.map((f) =>
    el("li", {}, el("img", { src: `/api/leads/${encodeURIComponent(leadId)}/photos/${f}`, alt: "Business photo" }),
      el("button", { type: "button", "aria-label": "Remove photo", onclick: async () => {
        const r = await api(`/api/leads/${encodeURIComponent(leadId)}/photos/${f}`, { method: "DELETE" });
        renderThumbs(leadId, r.uploads);
      } }, "×"))));
  $("cz-photo-source").textContent = uploads.length
    ? `Using ${uploads.length} of the business's own photo${uploads.length > 1 ? "s" : ""}.`
    : `Using free stock photos from ${state.status?.photoSource || "Openverse"} until you add the business's own.`;
  $("cz-new-photos-wrap").hidden = Boolean(uploads.length);
}

let czStockVideo = null;
function renderVideo(leadId, video) {
  const mode = document.querySelector('input[name="cz-hero"]:checked')?.value;
  $("cz-video-wrap").hidden = mode !== "video";
  $("cz-video-row").hidden = !video;
  $("cz-video-add").textContent = video ? "Replace video…" : "Add the business's video…";
  const pv = $("cz-video-preview");
  if (video) {
    pv.src = `/api/leads/${encodeURIComponent(leadId)}/video?t=${Date.now()}`;
    pv.play().catch(() => {});
  } else pv.removeAttribute("src");
  $("cz-video-source").textContent = video
    ? "Using the business's own video."
    : czStockVideo
      ? `Using a free stock video from ${czStockVideo} until you add the business's own.`
      : "Add the business's own video. For stock video, add a free PEXELS_API_KEY or PIXABAY_API_KEY to .env. Until then, a photo is used.";
}

// ---------- pages ----------
let czPageTypes = [];
let czPageDefaults = {};
const pageLabel = (type) => czPageTypes.find((t) => t.key === type)?.label || type;

function itemRow(type, x = {}) {
  const rm = el("button", { type: "button", class: "btn ghost small rm", onclick: () => li.remove() }, "Remove");
  const li = type === "services"
    ? el("li", { class: "cz-item" },
        el("input", { class: "i-title", value: x.title || "", placeholder: "Service name", "aria-label": "Service name" }),
        el("input", { class: "i-price", value: x.price || "", placeholder: "Price (optional)", "aria-label": "Price" }),
        rm,
        el("textarea", { class: "i-desc", rows: 2, placeholder: "Short description", "aria-label": "Description" }, x.desc || ""))
    : el("li", { class: "cz-item" },
        el("input", { class: "i-name", value: x.name || "", placeholder: "Item name", "aria-label": "Item name" }),
        el("input", { class: "i-price", value: x.price || "", placeholder: "Price, or empty for “Ask us”", "aria-label": "Price" }),
        rm,
        el("textarea", { class: "i-note", rows: 2, placeholder: "Description. In cards, put each feature on its own line.", "aria-label": "Description" }, x.note || ""),
        el("label", { class: "cz-check" }, el("input", { type: "checkbox", class: "i-featured", checked: x.featured === true }), " Highlight as most popular (cards only)"));
  return li;
}

function pageRow(p) {
  const type = p.type;
  const id = p.id || Math.random().toString(36).slice(2, 10);
  const body = el("div", { class: "cz-page-body" },
    el("label", {}, "Short line under the title", el("input", { class: "p-intro", value: p.intro || "", maxlength: 240 })));
  if (type === "services" || type === "pricing") {
    if (type === "pricing") {
      body.append(el("label", {}, "Show prices as",
        el("select", { class: "p-layout" },
          el("option", { value: "list", selected: p.layout !== "cards" }, "A price list (like a menu)"),
          el("option", { value: "cards", selected: p.layout === "cards" }, "Price cards (packages)"))));
    }
    const list = el("ul", { class: "cz-items" }, (p.items || []).map((x) => itemRow(type, x)));
    body.append(list, el("button", { type: "button", class: "btn small", onclick: () => list.append(itemRow(type)) }, type === "services" ? "Add a service" : "Add a price"));
    if (czCurrency) body.append(el("p", { class: "sd-hint" }, `Type a number like 450 to show ${czCurrency}450, or write it out ("from ${czCurrency}40", "${czCurrency}120 / hour").`));
  }
  if (type === "about" || type === "custom") {
    body.append(el("label", {}, type === "about" ? "Their story" : "Page text",
      el("textarea", { class: "p-text", rows: 7 }, p.text || "")),
      el("p", { class: "sd-hint" }, "Leave an empty line between paragraphs. Start a line with ## for a heading, or - for a list item."));
  }
  const hint = czPageTypes.find((t) => t.key === type)?.hint;
  if (hint && !["services", "pricing", "about", "custom"].includes(type)) body.append(el("p", { class: "sd-hint" }, hint));
  const move = (dir) => {
    const sib = dir < 0 ? li.previousElementSibling : li.nextElementSibling;
    if (sib) dir < 0 ? sib.before(li) : sib.after(li);
  };
  const li = el("li", { class: "cz-page", "data-type": type, "data-id": id },
    el("div", { class: "cz-page-head" },
      el("span", { class: "cz-page-type" }, pageLabel(type)),
      el("input", { class: "p-title", value: p.title || "", maxlength: 40, "aria-label": "Page title (shown in the menu)" }),
      el("button", { type: "button", class: "btn ghost small", "aria-label": "Move up", onclick: () => move(-1) }, "↑"),
      el("button", { type: "button", class: "btn ghost small", "aria-label": "Move down", onclick: () => move(1) }, "↓"),
      el("button", { type: "button", class: "btn ghost small rm", onclick: () => li.remove() }, "Remove")),
    el("details", {}, el("summary", {}, "Edit content"), body));
  return li;
}

function readPages() {
  return [...$("cz-pages").children].map((li) => {
    const type = li.dataset.type;
    const p = { id: li.dataset.id, type, title: li.querySelector(".p-title").value, intro: li.querySelector(".p-intro").value };
    if (type === "services") p.items = [...li.querySelectorAll(".cz-item")].map((r) => ({ title: r.querySelector(".i-title").value, price: r.querySelector(".i-price").value, desc: r.querySelector(".i-desc").value }));
    if (type === "pricing") {
      p.layout = li.querySelector(".p-layout").value;
      p.items = [...li.querySelectorAll(".cz-item")].map((r) => ({ name: r.querySelector(".i-name").value, price: r.querySelector(".i-price").value, note: r.querySelector(".i-note").value, featured: r.querySelector(".i-featured").checked }));
    }
    if (type === "about" || type === "custom") p.text = li.querySelector(".p-text").value;
    return p;
  });
}

let czCurrency = "";
$("cz-page-add").addEventListener("click", () => {
  if ($("cz-pages").children.length >= 8) return alert("A demo can have up to 8 extra pages.");
  const type = $("cz-page-type").value;
  const row = pageRow({ type, ...structuredClone(czPageDefaults[type] || { title: pageLabel(type) }) });
  $("cz-pages").append(row);
  row.querySelector("details").open = true;
  row.querySelector(".p-title").focus();
});

// ---------- colors for one part of the page ----------
let czAreas = [];
let czAreaDefault = "#FFFFFF";

const AREA_DIRS = [["180", "Top to bottom"], ["90", "Left to right"], ["135", "Diagonal down"], ["45", "Diagonal up"], ["radial", "From the center"]];
const fillCss = (bg, bg2, dir) => (!bg2 ? bg : dir === "radial" ? `radial-gradient(circle at 50% 35%,${bg},${bg2} 75%)` : `linear-gradient(${dir}deg,${bg},${bg2})`);

function areaRow(key = "", v = {}) {
  const used = new Set([...$("cz-area-list").querySelectorAll(".a-key")].map((s) => s.value));
  const first = key || czAreas.find((a) => !used.has(a.key))?.key || czAreas[0]?.key;
  const sel = el("select", { class: "a-key", "aria-label": "Part of the page" }, czAreas.map((a) => el("option", { value: a.key, selected: a.key === first }, a.label)));
  const kind = el("select", { class: "a-kind", "aria-label": "Solid color or gradient" },
    el("option", { value: "solid", selected: !v.bg2 }, "Solid color"), el("option", { value: "gradient", selected: Boolean(v.bg2) }, "Gradient"));
  const bgIn = el("input", { type: "color", class: "a-bg", value: v.bg || czAreaDefault, "aria-label": "Background color" });
  const bg2In = el("input", { type: "color", class: "a-bg2", value: v.bg2 || "#7C3AED", "aria-label": "Second gradient color" });
  const dirSel = el("select", { class: "a-dir", "aria-label": "Gradient direction" }, AREA_DIRS.map(([val, label]) => el("option", { value: val, selected: (v.dir || "135") === val }, label)));
  const gradBits = el("span", { class: "a-grad" }, el("label", {}, "to ", bg2In), dirSel);
  const preview = el("span", { class: "a-preview", "aria-hidden": "true" });
  const autoText = el("input", { type: "checkbox", class: "a-auto", checked: !v.text });
  const textIn = el("input", { type: "color", class: "a-text", value: v.text || "#141414", disabled: !v.text, "aria-label": "Text color" });
  const sync = () => {
    const grad = kind.value === "gradient";
    gradBits.hidden = !grad;
    bgIn.closest("label").firstChild.textContent = grad ? "From " : "Color ";
    preview.style.background = fillCss(bgIn.value, grad && bg2In.value, dirSel.value);
  };
  for (const x of [kind, bgIn, bg2In, dirSel]) x.addEventListener("input", sync);
  autoText.addEventListener("change", () => { textIn.disabled = autoText.checked; });
  const li = el("li", {},
    el("div", { class: "a-line" }, sel, kind, preview),
    el("div", { class: "a-line" }, el("label", {}, "Color ", bgIn), gradBits),
    el("div", { class: "a-line" },
      el("label", { class: "a-auto-wrap" }, autoText, " Automatic text"),
      el("label", {}, "Text ", textIn),
      el("button", { type: "button", class: "btn ghost small rm", "aria-label": "Remove this color", onclick: () => li.remove() }, "Remove")));
  sync();
  return li;
}

function readAreas() {
  const out = {};
  for (const li of $("cz-area-list").children) {
    const grad = li.querySelector(".a-kind").value === "gradient";
    out[li.querySelector(".a-key").value] = {
      bg: li.querySelector(".a-bg").value,
      ...(grad ? { bg2: li.querySelector(".a-bg2").value, dir: li.querySelector(".a-dir").value } : {}),
      text: li.querySelector(".a-auto").checked ? "" : li.querySelector(".a-text").value,
    };
  }
  return out;
}

$("cz-area-add").addEventListener("click", () => {
  if ($("cz-area-list").children.length < czAreas.length) $("cz-area-list").append(areaRow());
});

function selectPalette(name) {
  czPalette = name;
  for (const b of $("cz-palettes").children) b.setAttribute("aria-checked", String(b.dataset.name === name));
}

async function openCustomize(lead) {
  czLead = lead;
  $("cz-title").textContent = `Customize: ${lead.name}`;
  $("cz-msg").className = "form-msg";
  $("cz-msg").textContent = "";
  cz.showModal();
  try {
    const d = await api(`/api/leads/${encodeURIComponent(lead.id)}/custom`);
    const c = d.custom || {};
    $("cz-style").textContent = `Style: ${d.styleName}. To change the style itself, use the style menu on the lead.`;
    const swatch = (name, colors, label) => el("button", { type: "button", class: "swatch", role: "radio", "data-name": name, onclick: () => selectPalette(name) },
      el("span", { class: "dots", "aria-hidden": "true" }, colors.map((col) => el("i", { bg: col }))), label);
    $("cz-palettes").replaceChildren(
      swatch("", [], `Automatic (${d.currentPalette})`),
      ...d.palettes.map((p) => swatch(p.name, [p.bg, p.primary, p.accent], p.name)));
    selectPalette(c.palette || "");
    const own = Boolean(c.primary || c.accent);
    $("cz-own-colors").checked = own;
    $("cz-use-brand").checked = d.useBrand !== false;
    $("cz-color-pickers").hidden = !own;
    const pal = d.palettes.find((p) => p.name === (c.palette || d.currentPalette)) || d.palettes[0] || {};
    $("cz-primary").value = c.primary || pal.primary || "#1A56DB";
    $("cz-accent").value = c.accent || pal.accent || "#F59E0B";
    czAreas = d.areas || [];
    czPageTypes = d.pageTypes || [];
    czPageDefaults = d.pageDefaults || {};
    czCurrency = d.currency || "";
    $("cz-page-type").replaceChildren(...czPageTypes.map((t) => el("option", { value: t.key }, t.label)));
    $("cz-pages").replaceChildren(...(c.pages || []).map(pageRow));
    czAreaDefault = /^#[0-9a-f]{6}$/i.test(pal.bg || "") ? pal.bg : "#FFFFFF";
    $("cz-area-list").replaceChildren(...Object.entries(c.areas || {}).map(([k, v]) => areaRow(k, v)));
    $("cz-photos-on").checked = c.photos?.enabled !== false;
    for (const r of document.querySelectorAll('input[name="cz-hero"]')) r.checked = r.value === d.heroMode;
    czStockVideo = d.stockVideo;
    renderVideo(lead.id, d.video);
    $("cz-new-photos").checked = false;
    renderThumbs(lead.id, d.uploads);
    const mode = c.reviews?.mode || "example";
    for (const r of document.querySelectorAll('input[name="cz-rmode"]')) r.checked = r.value === mode;
    $("cz-real").hidden = mode !== "real";
    $("cz-reviews").replaceChildren(...(c.reviews?.items?.length ? c.reviews.items : [{}]).map(reviewRow));
  } catch (err) {
    $("cz-msg").className = "form-msg error";
    $("cz-msg").textContent = `Couldn't load the settings. ${err.message}`;
  }
}

for (const r of document.querySelectorAll('input[name="cz-hero"]')) r.addEventListener("change", () => { $("cz-video-wrap").hidden = r.value !== "video" || !r.checked; });
$("cz-video-file").addEventListener("change", async (e) => {
  const f = e.target.files[0];
  e.target.value = "";
  if (!f) return;
  $("cz-msg").className = "form-msg";
  $("cz-msg").textContent = `Uploading ${f.name}…`;
  try {
    const res = await fetch(`/api/leads/${encodeURIComponent(czLead.id)}/video`, { method: "POST", headers: { "Content-Type": f.type }, body: f });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    renderVideo(czLead.id, data.video);
    $("cz-msg").textContent = "Video added. Save to rebuild the demo with it.";
  } catch (err) {
    $("cz-msg").className = "form-msg error";
    $("cz-msg").textContent = `${f.name}: ${err.message}`;
  }
});
$("cz-video-rm").addEventListener("click", async () => {
  const r = await api(`/api/leads/${encodeURIComponent(czLead.id)}/video`, { method: "DELETE" });
  renderVideo(czLead.id, r.video);
});
$("cz-own-colors").addEventListener("change", (e) => { $("cz-color-pickers").hidden = !e.target.checked; });
for (const r of document.querySelectorAll('input[name="cz-rmode"]')) r.addEventListener("change", () => { $("cz-real").hidden = r.value !== "real" || !r.checked; });
$("cz-add-review").addEventListener("click", () => {
  if ($("cz-reviews").children.length < 6) $("cz-reviews").append(reviewRow());
});
$("cz-file").addEventListener("change", async (e) => {
  const files = [...e.target.files];
  e.target.value = "";
  for (const f of files) {
    try {
      const res = await fetch(`/api/leads/${encodeURIComponent(czLead.id)}/photos`, { method: "POST", headers: { "Content-Type": f.type }, body: f });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      renderThumbs(czLead.id, data.uploads);
    } catch (err) {
      $("cz-msg").className = "form-msg error";
      $("cz-msg").textContent = `${f.name}: ${err.message}`;
    }
  }
});
$("cz-save").addEventListener("click", async () => {
  const btn = $("cz-save");
  const own = $("cz-own-colors").checked;
  const mode = document.querySelector('input[name="cz-rmode"]:checked')?.value || "example";
  const items = [...$("cz-reviews").children].map((li) => ({
    name: li.querySelector(".r-name").value, source: li.querySelector(".r-source").value, stars: Number(li.querySelector(".r-stars").value),
    text: li.querySelector(".r-text").value, consent: li.querySelector(".r-consent").checked,
  })).filter((r) => r.text.trim());
  btn.disabled = true;
  btn.textContent = "Rebuilding…";
  try {
    const updated = await api(`/api/leads/${encodeURIComponent(czLead.id)}/custom`, {
      method: "PUT",
      body: JSON.stringify({ palette: czPalette, primary: own ? $("cz-primary").value : "", accent: own ? $("cz-accent").value : "", photosEnabled: $("cz-photos-on").checked, heroMode: document.querySelector('input[name="cz-hero"]:checked')?.value || "photo", newPhotos: $("cz-new-photos").checked, reviews: { mode, items }, areas: readAreas(), useBrand: $("cz-use-brand").checked, pages: readPages() }),
    });
    const warn = updated.demo?.warnings?.length ? ` Note: ${updated.demo.warnings.join(" ")}` : "";
    $("cz-msg").className = warn ? "form-msg error" : "form-msg";
    $("cz-msg").textContent = `Saved and rebuilt. Publish it from Published demos to update the live link.${warn}`;
    $("cz-new-photos").checked = false;
    refreshStatus();
    if (state.current) await openSearch(state.current.id, true);
  } catch (err) {
    $("cz-msg").className = "form-msg error";
    $("cz-msg").replaceChildren(err.message, err.hint ? el("span", { class: "hint" }, ` ${err.hint}`) : "");
  } finally {
    btn.disabled = false;
    btn.textContent = "Save and rebuild demo";
  }
});

// ---------- send dialog ----------
const dlg = $("send-dialog");
let sendLead = null;

async function openSend(lead) {
  sendLead = lead;
  $("sd-title").textContent = `Contact ${lead.name}`;
  $("sd-msg").textContent = "";
  $("sd-msg").className = "form-msg";
  $("sd-warnings").replaceChildren(el("li", { class: "info" }, "Writing a draft…"));
  dlg.showModal();
  try {
    const d = await api(`/api/leads/${encodeURIComponent(lead.id)}/draft`);
    $("sd-from").value = d.from || "Gmail not set up";
    $("sd-to").value = d.to;
    $("sd-emails").replaceChildren(...d.emails.map((e) => el("option", { value: e })));
    $("sd-subject").value = d.subject;
    $("sd-text").value = d.text;
    $("sd-warnings").replaceChildren(...d.warnings.map((w) => el("li", { class: w.level }, w.text)));
    $("sd-repeat-wrap").hidden = !d.previous;
    $("sd-repeat").checked = false;
    const demo = $("sd-demo");
    demo.hidden = !d.demoUrl;
    if (d.demoUrl) demo.href = d.demoUrl;
    $("sd-send").disabled = d.warnings.some((w) => w.level === "block");
    $("sd-copy").dataset.text = d.callNotes;
  } catch (err) {
    $("sd-warnings").replaceChildren(el("li", { class: "block" }, `Couldn't write a draft. ${err.message}`));
  }
}

$("sd-send").addEventListener("click", async () => {
  const btn = $("sd-send");
  const msg = $("sd-msg");
  const to = $("sd-to").value.trim();
  if (!confirm(`Send this email to ${to}?`)) return;
  btn.disabled = true;
  btn.textContent = "Sending…";
  msg.className = "form-msg";
  msg.textContent = "";
  try {
    const r = await api(`/api/leads/${encodeURIComponent(sendLead.id)}/send`, {
      method: "POST",
      body: JSON.stringify({ to, subject: $("sd-subject").value, text: $("sd-text").value, confirmRepeat: $("sd-repeat").checked }),
    });
    msg.textContent = `Sent to ${to}. ${r.sentToday} of ${r.limit} emails sent today.`;
    btn.textContent = "Sent";
    await refreshStatus();
    if (state.current) await openSearch(state.current.id, true);
  } catch (err) {
    msg.className = "form-msg error";
    msg.replaceChildren(err.message, err.hint ? el("span", { class: "hint" }, err.hint) : "");
    btn.disabled = false;
    btn.textContent = "Send email";
  }
});

$("sd-copy").addEventListener("click", async (e) => {
  try {
    await navigator.clipboard.writeText(e.currentTarget.dataset.text || "");
    $("sd-msg").className = "form-msg";
    $("sd-msg").textContent = "Script copied. Paste it into a text message or read it on a call.";
  } catch {
    $("sd-msg").textContent = "Couldn't copy automatically. Select the message text and copy it instead.";
  }
});

$("sd-optout").addEventListener("click", async () => {
  if (!sendLead || !confirm(`Mark ${sendLead.name} as do not contact? The app will block any email to them.`)) return;
  try {
    await api(`/api/leads/${encodeURIComponent(sendLead.id)}/optout`, { method: "POST" });
    dlg.close();
    if (state.current) await openSearch(state.current.id, true);
  } catch (err) {
    alert(`Couldn't save that. ${err.message}`);
  }
});

// ---------- published demos ----------
const pub = $("pub-dialog");
const PUB_STATE = { live: "Online", changed: "Online, newer version waiting", off: "Not online" };
let pubDemos = [];

function pubSelected() {
  return [...$("pub-list").querySelectorAll("input:checked")].map((i) => i.value);
}
function pubSync() {
  const n = pubSelected().length;
  $("pub-go").disabled = !n;
  $("pub-go").textContent = n ? `Publish ${n} selected` : "Publish selected";
}

function pubRow(d) {
  const cb = el("input", { type: "checkbox", id: `pub-${d.leadId}`, value: d.leadId, onchange: pubSync });
  const copy = el("button", { type: "button", class: "btn small", onclick: async () => {
    await navigator.clipboard.writeText(d.url).catch(() => {});
    copy.textContent = "Copied";
    setTimeout(() => (copy.textContent = "Copy link"), 1500);
  } }, "Copy link");
  const offline = el("button", { type: "button", class: "btn ghost small", onclick: () => {
    if (confirm(`Take ${d.name}'s demo offline? Its link will stop working until you publish it again.`)) pubRun({ unpublish: [d.leadId] }, `Taking ${d.name} offline…`);
  } }, "Take offline");
  return el("li", {},
    cb,
    el("label", { for: `pub-${d.leadId}` }, el("span", { class: "pub-name" }, d.name),
      el("span", { class: "pub-sub" }, el("span", { class: `pub-state ${d.state}` }, PUB_STATE[d.state]), `${d.styleName || ""}${d.publishedAt ? ` · published ${new Date(d.publishedAt).toLocaleDateString()}` : ""}`)),
    el("div", { class: "pub-acts" },
      el("a", { class: "btn small", href: `${d.localUrl}?v=${Date.parse(d.builtAt)}`, target: "_blank", rel: "noopener" }, "Preview"),
      d.url ? el("a", { class: "btn small primary-soft", href: d.url, target: "_blank", rel: "noopener" }, "Open live") : null,
      d.url ? copy : null,
      d.url ? offline : null),
    d.url ? el("a", { class: "pub-url", href: d.url, target: "_blank", rel: "noopener" }, d.url) : null);
}

async function pubLoad() {
  $("pub-list").replaceChildren(el("li", {}, el("span", {}), el("span", { class: "muted" }, "Loading…")));
  try {
    const r = await api("/api/published");
    pubDemos = r.demos;
    $("pub-list").replaceChildren(...r.demos.map(pubRow));
    if (!r.hasToken) {
      $("pub-msg").className = "form-msg error";
      $("pub-msg").textContent = "Add NETLIFY_TOKEN to .env and restart the app to publish (README step 6).";
    }
  } catch (err) {
    $("pub-list").replaceChildren();
    $("pub-msg").className = "form-msg error";
    $("pub-msg").textContent = `Couldn't load the demos. ${err.message}`;
  }
  pubSync();
}

async function pubRun(payload, busy) {
  const go = $("pub-go");
  go.disabled = true;
  $("pub-msg").className = "form-msg";
  $("pub-msg").textContent = busy;
  try {
    const r = await api("/api/publish", { method: "POST", body: JSON.stringify(payload) });
    await pubLoad();
    $("pub-msg").className = "form-msg";
    $("pub-msg").textContent = r.published.length
      ? `Published ${r.published.length} demo${r.published.length > 1 ? "s" : ""}.${r.ready ? "" : " Netlify is still finishing, so give the links a minute."}`
      : "Done. That demo is offline now.";
    if (state.current) await openSearch(state.current.id, true);
  } catch (err) {
    $("pub-msg").className = "form-msg error";
    $("pub-msg").textContent = `${err.message}${err.hint ? ` ${err.hint}` : ""}`;
    pubSync();
  } finally {
    refreshStatus();
  }
}

$("publish-btn").addEventListener("click", () => {
  $("pub-msg").textContent = "";
  pub.showModal();
  pubLoad();
});
$("pub-pick-waiting").addEventListener("click", () => {
  for (const i of $("pub-list").querySelectorAll("input")) i.checked = pubDemos.find((d) => d.leadId === i.value)?.state !== "live";
  pubSync();
});
$("pub-pick-none").addEventListener("click", () => {
  for (const i of $("pub-list").querySelectorAll("input")) i.checked = false;
  pubSync();
});
$("pub-go").addEventListener("click", () => {
  const ids = pubSelected();
  pubRun({ publish: ids }, `Publishing ${ids.length} demo${ids.length > 1 ? "s" : ""}…`);
});

// ---------- setup check ----------
const SETUP_PILL = { ok: "Working", missing: "Not set up", error: "Problem" };
async function runSetup() {
  const msg = $("setup-msg");
  msg.className = "form-msg";
  msg.textContent = "Checking each account…";
  $("setup-again").disabled = true;
  try {
    const r = await api("/api/setup-check");
    $("setup-list").replaceChildren(...r.items.map((i) => {
      const cls = i.state === "missing" && i.required ? "needed" : i.state;
      return el("li", {},
        el("span", { class: `s-pill ${cls}` }, i.state === "missing" && i.required ? "Needed" : SETUP_PILL[i.state] || i.state),
        el("span", { class: "s-label" }, `${i.label}${i.required ? "" : " (optional)"}`),
        el("span", { class: "s-detail" }, i.detail),
        el("span", { class: "s-fix" }, [i.fix, i.state !== "ok" && i.step ? `See ${i.step}.` : ""].filter(Boolean).join(" ")));
    }));
    msg.className = r.ready ? "form-msg" : "form-msg error";
    msg.textContent = r.ready ? "Ready to find leads. Optional items can be added any time." : "Fix the items marked Needed or Problem, restart the app, then check again.";
  } catch (err) {
    msg.className = "form-msg error";
    msg.textContent = `Couldn't run the check. ${err.message}`;
  } finally {
    $("setup-again").disabled = false;
  }
}
$("setup-btn").addEventListener("click", () => { $("setup-dialog").showModal(); runSetup(); });
$("setup-again").addEventListener("click", runSetup);

state.styles = await api("/api/styles").catch(() => ({}));
await refreshStatus();
// First run: open the setup check when Google or the business name isn't set up yet (once per browser session)
if (state.status && (!state.status.hasKey || !state.status.studioSet)) {
  let shown = false;
  try { shown = sessionStorage.getItem("setupShown") === "1"; sessionStorage.setItem("setupShown", "1"); } catch {}
  if (!shown) { $("setup-dialog").showModal(); runSetup(); }
}
await loadHistory();
if (state.searches.length) await openSearch(state.searches[0].id);

$("more-btn").addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  btn.disabled = true;
  btn.textContent = "Searching Google…";
  try {
    await api(`/api/searches/${encodeURIComponent(state.current.id)}/more`, { method: "POST" });
    await openSearch(state.current.id, true);
  } catch (err) {
    alert(`${err.message} ${err.hint || ""}`);
    await openSearch(state.current.id, true).catch(() => {});
  } finally {
    btn.textContent = "Find 20 more";
    refreshStatus();
  }
});
