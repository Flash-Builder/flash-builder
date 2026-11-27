// Live demo mode, used only on the public demo site (not in the app people install).
// It answers the dashboard's requests from sample data in demo-data.json, in the browser.
// Nothing is saved, sent, searched or published: those requests get a clear "turned off" answer.
(() => {
  const DATA_URL = "demo-data.json";
  let dataPromise = null;
  const load = () => (dataPromise ||= fetch(DATA_URL).then((r) => r.json()));
  const realFetch = window.fetch.bind(window);
  const BUY = document.documentElement.dataset.buyUrl || "../#get";

  const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  const off = (what) => json({ error: `${what} is turned off in the live demo.`, hint: "Get Flash Builder to use it with your own leads and accounts." }, 403);

  // Changes made while looking around (lead status, demo style) last until the page is reloaded
  const session = { status: {}, demo: {} };

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
        const leads = s.leadIds.map((id) => d.leads[id]).filter(Boolean).map((l) => ({
          ...l,
          status: session.status[l.id] || l.status,
          ...(session.demo[l.id] ? { demo: session.demo[l.id] } : {}),
        }));
        return json({ search: s, leads });
      }
      if ((m = p.match(/^\/api\/leads\/([\w-]+)\/custom$/))) return json(d.custom[m[1]] || d.custom._default);
      if ((m = p.match(/^\/api\/leads\/([\w-]+)\/draft$/))) return json(d.drafts[m[1]] || { error: "No sample email for this business." }, d.drafts[m[1]] ? 200 : 404);
      if (/\/export$/.test(p)) return off("Downloading leads");
      return json({ error: "Not available in the live demo." }, 404);
    }

    // Trying a different style uses the versions built in advance for the sample businesses
    if (method === "POST" && (m = p.match(/^\/api\/leads\/([\w-]+)\/demo$/))) {
      const lead = d.leads[m[1]];
      const variants = d.variants[m[1]] || {};
      const body = JSON.parse(opts.body || "{}");
      const current = session.demo[m[1]] || lead?.demo;
      let style = body.style && body.style !== "auto" ? body.style : null;
      if (body.shuffle) {
        const keys = Object.keys(variants);
        style = keys[(keys.indexOf(current?.style) + 1) % keys.length];
      }
      if (!style && body.style === "auto") style = lead?.demo?.style;
      const v = variants[style];
      if (!v) return json({ error: "That style isn't built for this sample business.", hint: `Try the style menu on ${d.showcaseNames.join(" or ")}, which have every style.` }, 403);
      session.demo[m[1]] = { ...v, styleChoice: body.style === "auto" || body.shuffle ? "auto" : style };
      return json({ ...lead, demo: session.demo[m[1]] });
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
    if (/\/custom$/.test(p)) return off("Saving changes");
    return off("Saving changes");
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
    text.textContent = "Live demo with made-up sample businesses. Look around, open the demo websites and try the styles. Searching, saving, sending and publishing are turned off.";
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
