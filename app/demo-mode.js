// Live demo mode, used only on the public demo website (not in the app people install).
// It answers the dashboard's requests from sample data, in the browser. Only the showcase sample
// businesses have sites; the rest are locked. Customize changes are applied for real: the site is
// rebuilt in the browser. Everything is kept in memory only, so reloading the page resets it.
(() => {
  // The build's version tag (from this script's own address), so updated files aren't served from cache
  const V = (document.currentScript?.src.split("?v=")[1] || "").replace(/[^a-z0-9]/gi, "");
  const DATA_URL = `demo-data.json?v=${V}`;
  let dataPromise = null;
  const load = () => (dataPromise ||= fetch(DATA_URL).then((r) => r.json()));
  const realFetch = window.fetch.bind(window);
  const BUY = document.documentElement.dataset.buyUrl || "../#get";

  const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  const off = (what) => json({ error: `${what} is turned off in the live demo.`, hint: "Get Flash Builder to use it with your own leads and accounts." }, 403);

  // Everything changed while looking around. Memory only: a reload starts fresh.
  const session = { status: {}, style: {}, custom: {}, builtAt: {} };

  // ---------- rebuilding a site in the browser ----------
  let engine = null;
  const loadEngine = () => (engine ||= Promise.all([import(`./engine/${V}/render.js`), import(`./engine/${V}/variation.js`), import(`./engine/${V}/areas.js`), import(`./engine/${V}/pages.js`)])
    .then(([render, variation, areas, pages]) => ({ render, variation, areas, pages })));
  const renderCache = {};
  const loadRender = (leadId, style) => (renderCache[`${leadId}-${style}`] ||= realFetch(`render/${leadId}-${style}.json?v=${V}`).then((r) => (r.ok ? r.json() : null)));

  const styleOf = (d, leadId) => session.style[leadId] || d.leads[leadId]?.demo?.style;

  function applyCustom(base, c, m) {
    const HEX = /^#[0-9A-F]{6}$/i;
    const d = structuredClone(base.data);
    const { readableOnWhite, contrast } = m.variation;
    const textOn = (bg) => (contrast(bg, "#FFFFFF") >= contrast(bg, "#111111") ? "#FFFFFF" : "#111111");
    const picked = base.palettes.find((p) => p.name === c.palette);
    const palette = { ...(picked || base.autoPalette) };
    if (HEX.test(c.primary || "")) {
      palette.primary = palette.dark ? c.primary : readableOnWhite(c.primary);
      palette.primaryText = textOn(palette.primary);
    }
    if (HEX.test(c.accent || "")) palette.accent = c.accent;
    d.palette = palette;
    const photos = c.photos?.enabled === false ? [] : base.allPhotos;
    d.heroMode = c.heroMode === "animated" ? "animated" : "photo";
    d.heroVideo = null;
    d.heroPhoto = d.heroMode === "photo" && photos.length ? photos[0] : null;
    d.photos = d.heroPhoto ? photos.slice(1) : photos;
    if (!photos.length) d.photoSource = "none";
    const mode = c.reviews?.mode || "example";
    d.reviewsMode = mode;
    d.reviews = mode === "example" ? base.exampleReviews
      : mode === "real" ? (c.reviews.items || []).filter((x) => x.text?.trim() && x.consent).map((x) => ({ text: x.text.trim(), name: x.name?.trim() || "Customer", stars: Math.min(5, Math.max(1, Number(x.stars) || 5)), source: x.source || "" }))
      : [];
    if ("areas" in c) d.areas = m.areas.cleanAreas(c.areas);
    if ("pages" in c) d.pages = m.pages.withFiles(m.pages.cleanPages(c.pages));
    return d;
  }

  // Used by preview.html (opened from here) to show the customized site
  window.FLASH_DEMO_PREVIEW = {
    async render(leadId, file) {
      const d = await load();
      const style = styleOf(d, leadId);
      const [base, m] = await Promise.all([loadRender(leadId, style), loadEngine()]);
      if (!base) return null;
      const data = applyCustom(base, session.custom[leadId] || d.custom[leadId]?.custom || {}, m);
      const page = file && file !== "index.html" ? data.pages.find((p) => p.file === file) || null : null;
      let html = m.render.renderDemo(data, page);
      // Links between the site's pages stay inside the preview
      for (const f of ["index.html", ...data.pages.map((p) => p.file)]) html = html.split(`href="${f}"`).join(`href="preview.html?v=${V}&amp;lead=${encodeURIComponent(leadId)}&amp;page=${encodeURIComponent(f)}"`);
      return html;
    },
  };

  // A customized site opens in a full-screen viewer inside the dashboard (no pop-up window needed).
  // The viewer's page asks this window to rebuild the site, so the changes stay in memory here.
  let viewer = null;
  function openViewer(href) {
    if (!viewer) {
      viewer = document.createElement("dialog");
      viewer.className = "demo-viewer";
      const bar = document.createElement("div");
      bar.className = "dv-bar";
      const note = document.createElement("p");
      note.textContent = "Your customized version. Changes last until you reload the dashboard.";
      const close = document.createElement("button");
      close.type = "button";
      close.className = "dv-close";
      close.textContent = "Close";
      close.addEventListener("click", () => viewer.close());
      bar.append(note, close);
      const frame = document.createElement("iframe");
      frame.title = "Customized demo site";
      viewer.append(bar, frame);
      viewer.addEventListener("close", () => { frame.src = "about:blank"; });
      document.body.append(viewer);
    }
    viewer.querySelector("iframe").src = href;
    viewer.showModal();
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest?.('a[href^="preview.html"]');
    if (!a) return;
    e.preventDefault();
    openViewer(a.getAttribute("href"));
  }, true);

  function demoFor(d, leadId) {
    const style = styleOf(d, leadId);
    const variant = d.variants[leadId]?.[style];
    if (!variant) return null;
    const customized = Boolean(session.custom[leadId]);
    return {
      ...variant,
      styleChoice: session.style[leadId] ? "picked" : "auto",
      url: customized ? `preview.html?v=${V}&lead=${encodeURIComponent(leadId)}` : variant.url,
      builtAt: session.builtAt[leadId] || variant.builtAt,
    };
  }

  async function customFor(d, leadId) {
    const base = d.custom[leadId] || d.custom._default;
    const style = styleOf(d, leadId);
    const r = style && style !== base.style ? await loadRender(leadId, style) : null;
    return {
      ...base,
      custom: { ...base.custom, ...(session.custom[leadId] || {}) },
      heroMode: session.custom[leadId]?.heroMode || base.heroMode,
      ...(r ? { style, styleName: d.styles[style], palettes: r.palettes.map((p) => ({ name: p.name, primary: p.primary, accent: p.accent, bg: p.bg })), currentPalette: r.autoPalette.name } : {}),
    };
  }

  const lockedMsg = (d) => json({ error: "This sample business is locked in the live demo.", hint: `Try ${d.showcaseNames.join(" or ")}: you can open their sites, switch styles and customize everything.` }, 403);

  async function handle(url, opts = {}) {
    const d = await load();
    const method = (opts.method || "GET").toUpperCase();
    const p = url.pathname;
    let m;

    if (method === "GET") {
      if (p === "/api/status") return json(d.status);
      if (p === "/api/styles") return json(d.styles);
      if (p === "/api/searches") return json(d.searches);
      if (p === "/api/setup-check") return json(d.setupCheck);
      if (p === "/api/published") return json(d.published);
      if ((m = p.match(/^\/api\/searches\/([\w-]+)$/))) {
        const s = d.searches.find((x) => x.id === m[1]);
        if (!s) return json({ error: "That sample search doesn't exist." }, 404);
        const leads = s.leadIds.map((id) => d.leads[id]).filter(Boolean).map((l) => {
          const demo = l.locked ? null : demoFor(d, l.id);
          return { ...l, status: session.status[l.id] || l.status, ...(demo ? { demo } : {}) };
        });
        return json({ search: s, leads });
      }
      if ((m = p.match(/^\/api\/leads\/([\w-]+)\/custom$/))) return d.leads[m[1]]?.locked ? lockedMsg(d) : json(await customFor(d, m[1]));
      if ((m = p.match(/^\/api\/leads\/([\w-]+)\/draft$/))) return d.drafts[m[1]] ? json(d.drafts[m[1]]) : json({ error: "No sample email for this business." }, 404);
      if (/\/export$/.test(p)) return off("Downloading leads");
      return json({ error: "Not available in the live demo." }, 404);
    }

    // Style menu and Shuffle: switch between the styles built in advance, keeping any customizations
    if (method === "POST" && (m = p.match(/^\/api\/leads\/([\w-]+)\/demo$/))) {
      const lead = d.leads[m[1]];
      if (!lead || lead.locked) return lockedMsg(d);
      const keys = Object.keys(d.variants[m[1]] || {});
      const body = JSON.parse(opts.body || "{}");
      let style = body.style && body.style !== "auto" ? body.style : lead.demo.style;
      if (body.shuffle) style = keys[(keys.indexOf(styleOf(d, m[1])) + 1) % keys.length];
      if (!keys.includes(style)) return json({ error: "That style isn't available here." }, 404);
      session.style[m[1]] = style;
      session.builtAt[m[1]] = new Date().toISOString();
      return json({ ...lead, status: session.status[m[1]] || lead.status, demo: demoFor(d, m[1]) });
    }
    // Customize: kept in memory and applied to the site right away
    if (method === "PUT" && (m = p.match(/^\/api\/leads\/([\w-]+)\/custom$/))) {
      const lead = d.leads[m[1]];
      if (!lead || lead.locked) return lockedMsg(d);
      const b = JSON.parse(opts.body || "{}");
      session.custom[m[1]] = {
        palette: b.palette || "", primary: b.primary || "", accent: b.accent || "",
        photos: { enabled: b.photosEnabled !== false }, heroMode: b.heroMode === "animated" ? "animated" : "photo",
        reviews: b.reviews || { mode: "example", items: [] }, areas: b.areas || {}, useBrand: b.useBrand !== false, pages: b.pages || [],
      };
      session.builtAt[m[1]] = new Date().toISOString();
      const warnings = [];
      if (b.heroMode === "video") warnings.push("Video needs an upload, which is turned off in the live demo, so a photo is used at the top.");
      if (b.newPhotos) warnings.push("New photos need Flash Builder's photo search, which is turned off in the live demo.");
      return json({ ...lead, status: session.status[m[1]] || lead.status, demo: { ...demoFor(d, m[1]), warnings } });
    }
    if (method === "PATCH" && (m = p.match(/^\/api\/leads\/([\w-]+)$/))) {
      const body = JSON.parse(opts.body || "{}");
      if (body.status) session.status[m[1]] = body.status;
      return json({ ...d.leads[m[1]], status: session.status[m[1]] });
    }
    if (p === "/api/search") return off("Searching Google");
    if (/\/send$/.test(p)) return off("Sending email");
    if (p === "/api/publish") return off("Publishing");
    if (/\/(photos|video)/.test(p)) return off("Uploading");
    if (/\/recheck$/.test(p)) return off("Checking websites");
    return off("This");
  }

  window.fetch = (input, opts) => {
    const url = new URL(typeof input === "string" ? input : input.url, location.href);
    if (url.origin === location.origin && url.pathname.startsWith("/api/")) return handle(url, opts);
    return realFetch(input, opts);
  };

  // Banner at the top, so it's always clear this is a demo
  document.documentElement.classList.add("is-demo");
  document.addEventListener("DOMContentLoaded", () => {
    const bar = document.createElement("div");
    bar.className = "demo-banner";
    bar.setAttribute("role", "note");
    const text = document.createElement("p");
    text.textContent = "Live demo with made-up sample businesses. Open and customize the Crumb & Crust Bakery and Blue Pipe Plumbing sites. Changes last until you reload the page. Searching, sending and publishing are turned off.";
    const back = document.createElement("a");
    back.href = "../";
    back.textContent = "About Flash Builder";
    const get = document.createElement("a");
    get.href = BUY;
    get.className = "demo-get";
    get.textContent = "Get Flash Builder";
    bar.append(text, back, get);
    document.body.prepend(bar);
  });
})();
