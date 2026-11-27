// Extra pages for a demo (services, pricing, about…). The home page is always index.html; each extra page
// gets its own file, shares the demo's header, colors, background and effects, and has a layout of its own.

export const PAGE_TYPES = {
  services: { label: "Services", title: "Services", hint: "Every service with a description and an optional price." },
  pricing: { label: "Pricing", title: "Prices", hint: "A price list or price cards. Leave a price empty to show “Ask us”." },
  about: { label: "About", title: "About us", hint: "Their story, what they value, and the key facts." },
  gallery: { label: "Gallery", title: "Gallery", hint: "All the demo's photos in a large photo wall." },
  reviews: { label: "Reviews", title: "Reviews", hint: "All the demo's reviews with a rating summary." },
  faq: { label: "Questions", title: "Questions", hint: "All the common questions, with a call-us box." },
  contact: { label: "Contact", title: "Contact", hint: "Every way to reach them, opening hours and a message button." },
  custom: { label: "Your own page", title: "New page", hint: "Write anything. Start a line with ## for a heading or - for a list item." },
};

const MAX_PAGES = 8;
const str = (v, max) => String(v ?? "").replace(/\s+$/g, "").slice(0, max);
const line = (v, max) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);

export function slugifyTitle(title) {
  return title.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_-]+/g, "-").slice(0, 40);
}

/** Validates pages from Customize. Keeps only known types and sensible lengths. */
export function cleanPages(input) {
  if (!Array.isArray(input)) return [];
  return input.slice(0, MAX_PAGES).filter((p) => p && PAGE_TYPES[p.type]).map((p) => {
    const page = {
      id: line(p.id, 20) || Math.random().toString(36).slice(2, 10),
      type: p.type,
      title: line(p.title, 40) || PAGE_TYPES[p.type].title,
      intro: line(p.intro, 240),
    };
    if (p.type === "services") {
      page.items = (Array.isArray(p.items) ? p.items : []).slice(0, 24)
        .map((x) => ({ title: line(x?.title, 60), desc: line(x?.desc, 300), price: line(x?.price, 30) }))
        .filter((x) => x.title);
    } else if (p.type === "pricing") {
      page.layout = p.layout === "cards" ? "cards" : "list";
      page.items = (Array.isArray(p.items) ? p.items : []).slice(0, 24)
        .map((x) => ({ name: line(x?.name, 60), price: line(x?.price, 30), note: str(x?.note, 300), featured: x?.featured === true }))
        .filter((x) => x.name);
    } else if (p.type === "about" || p.type === "custom") {
      page.text = str(p.text, 4000);
    }
    return page;
  });
}

/** Gives each page a unique file name from its title ("Our prices" -> our-prices.html). */
export function withFiles(pages = []) {
  const used = new Set(["index"]);
  return pages.map((p) => {
    let base = slugifyTitle(p.title) || p.type;
    let slug = base;
    for (let i = 2; used.has(slug); i++) slug = `${base}-${i}`;
    used.add(slug);
    return { ...p, slug, file: `${slug}.html` };
  });
}

const FOOD_OR_BEAUTY = ["bakery", "cafe", "restaurant", "foodtruck", "bar", "salon", "barber", "spa", "cooking"];
const fill = (s, v) => String(s).replace(/\{(\w+)\}/g, (_, k) => v[k] ?? "");

/** What a new page starts with in Customize, so it's never empty. */
export function pageDefaults(profile, { name, city, noun }) {
  const v = { name, city };
  const services = (profile.services || []).map(([title, desc]) => ({ title: fill(title, v), desc: fill(desc, v), price: "" }));
  return {
    services: { title: "Services", intro: `Everything ${name} offers in ${city}.`, items: services },
    pricing: {
      title: "Prices",
      intro: "Clear prices, no surprises. Call or message for anything not listed.",
      layout: FOOD_OR_BEAUTY.includes(profile.key) ? "list" : "cards",
      items: services.slice(0, 4).map((s, i) => ({ name: s.title, price: "", note: s.desc, featured: i === 1 })),
    },
    about: {
      title: "About us",
      intro: `The people behind ${name}.`,
      text: `${name} is a ${noun} in ${city}.\n\nThis is where their story goes: how they started, who's on the team, and what they're proud of. Ask the owner, and write it in their words.`,
    },
    gallery: { title: "Gallery", intro: `A look inside ${name}.` },
    reviews: { title: "Reviews", intro: `What customers say about ${name}.` },
    faq: { title: "Questions", intro: "Answers to what people ask us most." },
    contact: { title: "Contact", intro: `Call, message or visit ${name}. We'd love to hear from you.` },
    custom: { title: "New page", intro: "", text: "## A heading\n\nA paragraph of text.\n\n- A list item\n- Another list item" },
  };
}

// Layouts for the extra pages. They use the demo's own color and font variables, and reuse its card
// classes (.svc, .rev, .qa…), so every style's look and effects carry over.
export const PAGES_CSS = `
.page-hero{padding-block:clamp(2.5rem,1.5rem + 4vw,5rem)}
.page-hero .wrap{position:relative}
.page-hero h1{font-size:clamp(2.2rem,1.5rem + 3vw,4rem)}
.page-hero .wrap{text-align:left}
.page-hero .lead{max-width:46ch;margin-inline:0;text-align:left}
.crumbs{display:flex;gap:.5rem;align-items:center;margin:0 0 1rem;font-size:.9rem;font-weight:600;color:var(--muted)}
.crumbs a{color:inherit}
.see-all{display:inline-flex;align-items:center;gap:.35rem;margin-top:1rem;font-weight:700;color:var(--primary);text-decoration:none}
.see-all:hover{text-decoration:underline}
.nav a[aria-current="page"]{color:var(--primary)}
.nav a[aria-current="page"]::after{scale:1 1}
/* phone menu, only when a demo has extra pages */
.mnav{display:none;position:relative}
.mnav summary{list-style:none;cursor:pointer;padding:.55rem .95rem;border-radius:999px;font-weight:700;font-size:.9rem;box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--text) 25%,transparent)}
.mnav summary::-webkit-details-marker{display:none}
.mnav-panel{position:absolute;right:0;top:calc(100% + .5rem);z-index:40;display:grid;min-width:13rem;padding:.5rem;border-radius:16px;background:linear-gradient(var(--surface),var(--surface)),var(--bg);color:var(--text);box-shadow:0 20px 40px -12px rgb(0 0 0 / .35),inset 0 0 0 1px color-mix(in srgb,var(--text) 12%,transparent)}
.mnav-panel a{padding:.7rem .9rem;border-radius:10px;text-decoration:none;font-weight:600}
.mnav-panel a:hover,.mnav-panel a[aria-current="page"]{background:color-mix(in srgb,var(--primary) 14%,transparent)}
@media (max-width:52rem){.has-pages .mnav{display:block}}
/* More than four extra pages: the menu button on every screen size, so the header stays tidy */
.many-pages .nav{display:none}
.many-pages .mnav{display:block}
.nav a{white-space:nowrap}
.page-hero.has-photo .lead{color:var(--text)}

/* Services page: numbered rows with a price and a button each */
.svc-rows{list-style:none;margin:0;padding:0;display:grid;gap:1rem;counter-reset:svc}
.svc-page .svc.svc-row{display:grid;grid-template-columns:auto auto minmax(0,1fr) auto;align-items:center;gap:1rem 1.5rem;padding:clamp(1.1rem,.8rem + 1vw,1.6rem)}
.svc-num{font-family:var(--display);font-size:clamp(1.6rem,1.2rem + 1vw,2.4rem);font-weight:700;line-height:1;opacity:.3;min-width:2.2ch}
.svc-row .svc-ic{margin:0}
.svc-row h2{margin:0;font-size:clamp(1.15rem,1rem + .5vw,1.45rem)}
.svc-row .svc-desc{margin:.35rem 0 0;color:var(--muted)}
.svc-side{display:flex;align-items:center;gap:1rem;justify-self:end}
.svc-price{margin:0;font-family:var(--display);font-weight:700;font-size:1.15rem;white-space:nowrap}
.svc-row .btn{white-space:nowrap}

/* Pricing: a menu-style list with dotted leaders, or price cards */
.price-panel{max-width:52rem;margin-inline:auto;padding:clamp(1.25rem,1rem + 2vw,2.5rem)}
.pricing-sec .price-panel.svc{display:block}
.price-list{list-style:none;margin:0;padding:0}
.price-item{display:grid;grid-template-columns:auto minmax(1.5rem,1fr) auto;grid-template-areas:"name dots price" "note note note";align-items:baseline;column-gap:.75rem;padding:1.1rem 0;border-bottom:1px solid color-mix(in srgb,var(--text) 12%,transparent)}
.price-item:last-child{border-bottom:0}
.pi-name{grid-area:name;margin:0;font-size:1.15rem}
.pi-dots{grid-area:dots;border-bottom:2px dotted color-mix(in srgb,var(--text) 30%,transparent);transform:translateY(-.3em)}
.pi-price{grid-area:price;font-family:var(--display);font-size:1.2rem;white-space:nowrap}
.pi-note{grid-area:note;margin:.3rem 0 0;color:var(--muted);max-width:60ch}
.price-cards{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(15rem,100%),1fr));gap:1.25rem;align-items:stretch}
.pricing-sec .svc.price-card{position:relative;display:flex;flex-direction:column;gap:.75rem;padding:clamp(1.4rem,1rem + 1.5vw,2rem)}
.price-card h3{margin:0;font-size:1.2rem}
.pc-price{margin:0;font-family:var(--display);font-size:clamp(2rem,1.5rem + 1.6vw,2.8rem);font-weight:800;line-height:1}
.pc-feat{list-style:none;margin:0;padding:0;display:grid;gap:.45rem;color:var(--muted)}
.pc-feat li{display:flex;gap:.5rem}
.pc-feat li::before{content:"✓";color:var(--primary);font-weight:800}
.price-card .btn{margin-top:auto;justify-content:center}
.price-card.is-featured{box-shadow:0 0 0 2.5px var(--primary),0 24px 48px -20px color-mix(in srgb,var(--primary) 55%,transparent)!important;translate:0 -6px}
.pc-badge{position:absolute;top:-.8rem;left:1.25rem;padding:.25rem .75rem;border-radius:999px;font-size:.75rem;font-weight:800;letter-spacing:.04em;text-transform:uppercase;background:var(--primary);color:var(--on-primary)}
.price-foot{margin:1.5rem auto 0;max-width:52rem;color:var(--muted);font-size:.95rem;text-align:center}

/* About: the story with a large first letter, and a facts card beside it */
.about-grid{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:clamp(2rem,1rem + 4vw,4.5rem);align-items:start}
.about-story{font-size:clamp(1.05rem,1rem + .3vw,1.2rem);max-width:62ch}
.about-story p{margin:0 0 1.2em}
.about-story > p:first-child::first-letter{float:left;font-family:var(--display);font-size:3.4em;line-height:.85;padding:.08em .12em 0 0;color:var(--primary);font-weight:700}
.about-story h2{margin:1.5em 0 .6em}
.about-sec .about-side.svc{display:grid;gap:1rem;padding:1.6rem}
.about-side dl{margin:0;display:grid;gap:.9rem}
.about-side dt{font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
.about-side dd{margin:.15rem 0 0;font-weight:600}

/* Gallery page: a photo wall */
.gal-wall{list-style:none;margin:0;padding:0;columns:3 16rem;column-gap:1rem}
.gal-wall li{break-inside:avoid;margin:0 0 1rem;border-radius:var(--r-card,18px);overflow:hidden}
.gal-wall img{display:block;width:100%;height:auto;transition:scale .5s ease}
.gal-wall li:hover img{scale:1.04}

/* Reviews page: a rating summary and a wall of reviews */
.rev-summary{display:flex;flex-wrap:wrap;align-items:center;gap:1rem 2rem;margin-bottom:2rem;padding:1.5rem 1.75rem}
.reviews-page .rev-summary.svc{display:flex}
.rs-score{font-family:var(--display);font-size:clamp(2.6rem,2rem + 2vw,3.6rem);font-weight:800;line-height:1}
.rev-wall{columns:3 18rem;column-gap:1.25rem}
.reviews-page .rev-wall{display:block}
.rev-wall .rev{break-inside:avoid;margin-bottom:1.25rem}

/* Questions page */
.faq-page .faq-grid{grid-template-columns:minmax(0,1.4fr) minmax(0,.8fr)}
.faq-page .faq-side.svc{display:grid;gap:.9rem;padding:1.6rem;position:sticky;top:6rem}
.faq-side h2{margin:0;font-size:1.35rem}
.faq-side .actions{margin:0;flex-direction:column;align-items:stretch}

/* Contact page: one card per way to get in touch */
.cp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(16rem,100%),1fr));gap:1.25rem}
.contact-page .svc.cp-card{display:flex;flex-direction:column;gap:.6rem;padding:1.6rem}
.cp-card h2{margin:0;font-size:1.2rem}
.cp-card p{margin:0;color:var(--muted)}
.cp-card .btn{margin-top:auto;align-self:flex-start}
.cp-hours{grid-column:1/-1}

/* Your own page */
.prose{max-width:46rem;font-size:clamp(1.05rem,1rem + .3vw,1.2rem)}
.prose h2{margin:1.6em 0 .6em}
.prose p{margin:0 0 1.1em}
.prose ul{margin:0 0 1.2em;padding-left:1.2em;display:grid;gap:.4em}

@media (max-width:52rem){
  .svc-page .svc.svc-row{grid-template-columns:auto minmax(0,1fr)}
  .svc-row .svc-ic{display:none}
  .svc-side{grid-column:1/-1;justify-self:start;flex-wrap:wrap}
  .about-grid,.faq-page .faq-grid{grid-template-columns:1fr}
  .faq-page .faq-side.svc{position:static}
  .price-card.is-featured{translate:none}
}
`;
