// The visual styles. Each returns CSS layered on top of the shared structure.

const material = () => `
.top{background:var(--surface);box-shadow:0 1px 3px rgb(0 0 0 / .12),0 1px 2px rgb(0 0 0 / .08)}
.mono{background:var(--primary);color:var(--on-primary);border-radius:10px}
.btn{border-radius:8px;letter-spacing:.01em;box-shadow:0 1px 2px rgb(0 0 0 / .2);transition:box-shadow .2s,background-color .2s}
.btn-primary{background:var(--primary);color:var(--on-primary)}
.btn-primary:hover{box-shadow:0 4px 10px rgb(0 0 0 / .22)}
.btn-ghost{background:var(--surface);color:var(--primary);box-shadow:inset 0 0 0 1.5px currentColor}
.btn-invert{background:var(--accent);color:var(--band)}
.hero{background:var(--bg)}
.hero h1{font-weight:800;letter-spacing:-.02em}
.l-c .hero{background:var(--band);color:#fff}
.l-c .hero .kicker,.l-c .hero .lead,.l-c .hero .hero-note{color:rgb(255 255 255 / .82)}
.l-c .hero .btn-ghost{background:transparent;color:#fff}
.art-material .disc{width:72%;aspect-ratio:1;border-radius:50%;background:var(--primary);color:var(--on-primary);display:grid;place-items:center;box-shadow:0 18px 40px -12px color-mix(in srgb,var(--primary) 60%,transparent)}
.art-material .disc .art-ic{width:46%;height:46%}
.art-material .chip{position:absolute;display:inline-flex;align-items:center;gap:.5rem;padding:.6rem 1rem;border-radius:999px;background:var(--surface);color:var(--text);font-weight:600;font-size:.95rem;box-shadow:0 6px 16px rgb(0 0 0 / .14),0 2px 4px rgb(0 0 0 / .08)}
.art-material .chip .ic{color:var(--primary)}
.art-material .c1{top:8%;left:0}.art-material .c2{top:46%;right:-4%}.art-material .c3{bottom:6%;left:10%}
.sec-head h2,.visit h2{font-weight:800;letter-spacing:-.015em}
.svc{background:var(--surface);padding:1.5rem;border-radius:12px;box-shadow:0 1px 3px rgb(0 0 0 / .1),0 1px 2px rgb(0 0 0 / .06)}
.l-b .svc{background:none;box-shadow:none;border-radius:0;padding-inline:0}
.svc-ic{padding:.55rem;border-radius:50%;background:color-mix(in srgb,var(--primary) 12%,transparent);color:var(--primary)}
.why{background:var(--surface)}
.why-list li{border-top:4px solid var(--primary);padding-top:1.25rem}
.hours-card{background:var(--surface);padding:1.75rem;border-radius:12px;box-shadow:0 2px 6px rgb(0 0 0 / .1)}
.cta-band{background:var(--band);color:#fff}
.foot{background:var(--surface);color:var(--muted)}
`;

const organic = () => `
body{background:var(--bg)}
.top{background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(8px)}
.mono{background:var(--primary);color:#fff;border-radius:58% 42% 55% 45%/50% 60% 40% 50%}
.logo-name,.hero h1,.sec-head h2,.visit h2,.cta-band h2,.why-list h3,.svc h3,.hours-card h3{font-weight:500}
.btn{border-radius:999px 999px 999px 999px/ 60% 60% 70% 70%;padding-inline:1.6rem}
.btn-primary{background:var(--primary);color:#fff}
.btn-primary:hover{background:color-mix(in srgb,var(--primary) 85%,#000)}
.btn-ghost{background:transparent;color:var(--primary);box-shadow:inset 0 0 0 2px currentColor}
.btn-invert{background:var(--surface);color:var(--primary)}
.hero h1{letter-spacing:-.01em}
.kicker{color:var(--primary)}
.art-organic{color:var(--primary)}
.art-organic .blob{position:absolute;inset:8%;background:var(--band);border-radius:62% 38% 46% 54%/48% 56% 44% 52%}
.art-organic .art-ic{position:relative;width:40%;height:40%}
.art-organic .scribble{position:absolute;inset:0;width:100%;height:100%;color:var(--accent);rotate:-8deg}
.art-organic .sprig{position:absolute;width:22%;right:4%;bottom:6%;color:var(--primary)}
.sec-head h2{position:relative;display:inline-block;padding-bottom:.6rem}
.sec-head h2::after{content:"";position:absolute;left:0;right:0;bottom:0;height:10px;background:var(--accent);
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 10'%3E%3Cpath d='M2 6c20-6 36 4 58-1s38-4 58 1' fill='none' stroke='black' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E") center/100% 100% no-repeat;
  mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 10'%3E%3Cpath d='M2 6c20-6 36 4 58-1s38-4 58 1' fill='none' stroke='black' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E") center/100% 100% no-repeat}
.wave{display:block;width:100%;height:clamp(30px,5vw,70px);fill:var(--band);margin-bottom:-1px}
.wave.flip{rotate:180deg;margin-top:-1px;margin-bottom:0}
.services,.why{background:var(--band)}
.svc{background:var(--surface);padding:1.6rem;border-radius:28px 28px 28px 6px}
.l-b .svc{background:none;border-radius:0;padding-inline:0;border-color:color-mix(in srgb,var(--primary) 25%,transparent)}
.svc-ic{color:var(--primary)}
.why-list li{padding:1.5rem;border-radius:6px 28px 28px 28px;background:color-mix(in srgb,var(--surface) 70%,transparent)}
.hours-card{background:var(--surface);padding:1.75rem;border-radius:32px 32px 32px 8px;border:2px solid var(--band)}
.cta-band{background:var(--primary);color:#fff}
.foot{color:var(--muted)}
`;

const paper = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.25 0 0 0 0 0.12 0 0 0 0.09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const skeuo = () => `
body{background:${paper},var(--bg)}
.top{background:${paper},linear-gradient(180deg,color-mix(in srgb,var(--band) 85%,#fff 15%),var(--band));color:#F6EBD8;box-shadow:0 3px 0 var(--accent),0 8px 18px rgb(0 0 0 / .35)}
.top-row{outline:1.5px dashed color-mix(in srgb,var(--accent) 70%,transparent);outline-offset:-7px;border-radius:4px;padding-inline:1rem}
.mono{border-radius:50%;background:radial-gradient(circle at 35% 30%,#FBE7B0,var(--accent) 45%,#6E4E1C);color:var(--band);box-shadow:inset 0 1px 1px rgb(255 255 255 / .6),0 2px 3px rgb(0 0 0 / .45)}
.logo-name{letter-spacing:.02em}
.btn{border-radius:6px;font-weight:700;letter-spacing:.02em;text-shadow:0 1px 0 rgb(0 0 0 / .3)}
.btn-primary{color:#FFF8EA;background:linear-gradient(180deg,color-mix(in srgb,var(--primary) 70%,#fff),var(--primary) 55%,color-mix(in srgb,var(--primary) 70%,#000));box-shadow:inset 0 1px 0 rgb(255 255 255 / .35),inset 0 -2px 0 rgb(0 0 0 / .3),0 3px 6px rgb(0 0 0 / .35)}
.btn-primary:active{translate:0 1px;box-shadow:inset 0 2px 4px rgb(0 0 0 / .4)}
.top .btn-primary{color:var(--band);text-shadow:0 1px 0 rgb(255 255 255 / .5);background:linear-gradient(180deg,#FBE7B0,var(--accent) 50%,#8A6427)}
.btn-ghost{color:var(--text);background:linear-gradient(180deg,#FFFDF6,#E9DDC5);box-shadow:inset 0 1px 0 #fff,0 0 0 1px rgb(0 0 0 / .25),0 2px 4px rgb(0 0 0 / .2);text-shadow:none}
.btn-invert{color:var(--band);text-shadow:0 1px 0 rgb(255 255 255 / .5);background:linear-gradient(180deg,#FBE7B0,var(--accent) 50%,#8A6427);box-shadow:inset 0 1px 0 rgb(255 255 255 / .6),0 3px 6px rgb(0 0 0 / .4)}
.hero h1{font-weight:400;color:var(--primary);text-shadow:0 1px 0 rgb(255 255 255 / .7)}
.kicker{color:var(--primary);font-style:italic}
.art-skeuo{filter:drop-shadow(0 14px 22px rgb(0 0 0 / .35))}
.art-skeuo .emblem{width:100%;height:100%}
.art-skeuo::after{content:"";position:absolute;inset:3%;border-radius:50%;pointer-events:none;background:linear-gradient(115deg,transparent 42%,rgb(255 255 255 / .3) 50%,transparent 58%) -150% 0/250% 100% no-repeat;animation:shine 6s ease-in-out infinite}
@keyframes shine{55%,100%{background-position:150% 0}}
.art-skeuo .arc{font-family:var(--display);font-size:22px;fill:var(--accent);letter-spacing:2px}
.art-skeuo .arc.small{font-size:16px;letter-spacing:4px}
.art-skeuo .emblem-ic{position:absolute;inset:0;display:grid;place-items:center;color:var(--accent)}
.art-skeuo .emblem-ic .art-ic{width:28%;height:28%}
.sec-head h2,.visit h2{color:var(--primary);font-weight:400}
.sec-head{text-align:center;margin-inline:auto}
.sec-head h2::after{content:"";display:block;width:7rem;height:10px;margin:1rem auto 0;background:linear-gradient(var(--accent),var(--accent)) center/100% 2px no-repeat,radial-gradient(circle,var(--accent) 3px,transparent 3.5px) center/10px 10px no-repeat}
.svc{position:relative;padding:1.6rem;background:${paper},var(--surface);border:1px solid rgb(0 0 0 / .18);border-radius:4px;box-shadow:0 1px 0 #fff inset,0 6px 14px -6px rgb(0 0 0 / .35);
  -webkit-mask:radial-gradient(circle 10px at 0 50%,#0000 98%,#000) left/51% 100% no-repeat,radial-gradient(circle 10px at 100% 50%,#0000 98%,#000) right/51% 100% no-repeat;
  mask:radial-gradient(circle 10px at 0 50%,#0000 98%,#000) left/51% 100% no-repeat,radial-gradient(circle 10px at 100% 50%,#0000 98%,#000) right/51% 100% no-repeat}
.svc::before{content:"";position:absolute;inset:8px;border:1px dashed rgb(0 0 0 / .22);border-radius:2px;pointer-events:none}
.l-b .svc{border-top:1px solid rgb(0 0 0 / .18)}
.svc-ic{color:var(--primary)}
.why{background:${paper},linear-gradient(180deg,color-mix(in srgb,var(--band) 85%,#fff 15%),var(--band));color:#F6EBD8}
.why .sec-head h2{color:var(--accent);text-shadow:0 1px 0 rgb(0 0 0 / .5)}
.why-list li{padding:1.5rem;border:1px solid color-mix(in srgb,var(--accent) 55%,transparent);border-radius:4px;box-shadow:inset 0 0 0 4px color-mix(in srgb,var(--band) 100%,transparent),inset 0 0 0 5px color-mix(in srgb,var(--accent) 35%,transparent)}
.why-list h3{color:var(--accent)}
.why-list p{color:rgb(246 235 216 / .82)}
.hours-card{padding:1.75rem;background:${paper},var(--surface);border:1px solid rgb(0 0 0 / .2);box-shadow:0 1px 0 #fff inset,0 10px 24px -10px rgb(0 0 0 / .45);rotate:-.6deg}
.hours th,.hours td{border-bottom:1px dotted rgb(0 0 0 / .35)}
.cta-band{background:${paper},linear-gradient(180deg,color-mix(in srgb,var(--primary) 85%,#fff 15%),var(--primary));color:#FFF8EA}
.cta-band h2{font-weight:400}
.foot{background:var(--band);color:#E8DCC6}
`;

const aurora = (d) => {
  const [g1, g2, g3] = d.palette.glow;
  const dark = d.palette.dark;
  return `
body{background:var(--bg)}
body::before{content:"";position:fixed;inset:-20%;z-index:-1;pointer-events:none;filter:blur(70px);opacity:${dark ? .55 : .85};
  background:radial-gradient(40% 35% at 15% 20%,${g1},transparent 70%),radial-gradient(35% 30% at 85% 15%,${g2},transparent 70%),radial-gradient(45% 40% at 60% 85%,${g3},transparent 70%);
  animation:drift 24s ease-in-out infinite alternate}
@keyframes drift{to{translate:3% -2%;scale:1.06}}
.top{background:${dark ? "rgb(14 16 32 / .55)" : "rgb(255 255 255 / .55)"};backdrop-filter:blur(16px) saturate(1.4);border-bottom:1px solid ${dark ? "rgb(255 255 255 / .08)" : "rgb(255 255 255 / .7)"}}
.mono{border-radius:12px;background:linear-gradient(135deg,var(--primary),var(--accent));color:#fff}
.hero h1{font-weight:700;letter-spacing:-.03em}
.btn{border-radius:14px;transition:translate .2s,box-shadow .2s}
.btn-primary{background:var(--primary);color:var(--on-primary);box-shadow:0 10px 30px -10px var(--primary)}
.btn-primary:hover{translate:0 -1px}
.btn-ghost{background:var(--surface);color:var(--text);backdrop-filter:blur(10px);box-shadow:inset 0 0 0 1px ${dark ? "rgb(255 255 255 / .14)" : "rgb(255 255 255 / .9)"},0 4px 14px -6px rgb(0 0 0 / .15)}
.btn-invert{background:#fff;color:#111}
.glass{background:var(--surface);backdrop-filter:blur(18px) saturate(1.5);border:1px solid ${dark ? "rgb(255 255 255 / .12)" : "rgb(255 255 255 / .85)"};border-radius:24px;box-shadow:0 30px 60px -30px rgb(0 0 0 / ${dark ? .6 : .25})}
.art-aurora .g-back{position:absolute;inset:14% 4% 20% 22%;rotate:6deg;opacity:.7}
.art-aurora .g-front{position:relative;width:78%;padding:1.75rem;display:grid;gap:.5rem}
.art-aurora .g-ic{display:grid;place-items:center;width:3.5rem;height:3.5rem;border-radius:16px;background:linear-gradient(135deg,var(--primary),var(--accent));color:#fff;margin-bottom:.5rem}
.art-aurora .g-ic .art-ic{width:60%;height:60%}
.art-aurora .g-t{font-family:var(--display);font-weight:700;font-size:1.35rem}
.art-aurora .g-s{color:var(--muted)}
.art-aurora .g-row{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.75rem}
.art-aurora .g-row span{padding:.35rem .8rem;border-radius:999px;font-size:.85rem;font-weight:500;background:${dark ? "rgb(255 255 255 / .08)" : "rgb(255 255 255 / .8)"}}
.sec-head h2,.visit h2,.cta-band h2{font-weight:700;letter-spacing:-.02em}
.svc{padding:1.6rem;background:var(--surface);backdrop-filter:blur(14px);border:1px solid ${dark ? "rgb(255 255 255 / .1)" : "rgb(255 255 255 / .85)"};border-radius:20px}
.l-b .svc{background:none;backdrop-filter:none;border-width:1px 0 0;border-radius:0;padding-inline:0}
.svc-ic{padding:.6rem;border-radius:14px;color:#fff;background:linear-gradient(135deg,var(--primary),var(--accent))}
.why-list li{padding-left:1.25rem;border-left:2px solid var(--primary)}
.hours-card{padding:1.75rem;background:var(--surface);backdrop-filter:blur(14px);border:1px solid ${dark ? "rgb(255 255 255 / .1)" : "rgb(255 255 255 / .85)"};border-radius:24px}
.cta-band .wrap{padding:clamp(2rem,1.5rem + 2vw,3.5rem);border-radius:28px;background:linear-gradient(120deg,var(--band),color-mix(in srgb,var(--primary) 70%,var(--band)));color:#fff}
.cta-band{padding-top:0}
.foot{color:var(--muted)}
`;
};

const kinetic = (d) => `
html,body{overflow-x:clip}
.ribbon{background:var(--primary);color:var(--on-primary)}
.top{background:var(--bg);border-bottom:1px solid color-mix(in srgb,var(--text) 12%,transparent)}
.mono{background:var(--primary);color:var(--on-primary);border-radius:0;font-size:1.1rem}
.logo-name{text-transform:uppercase;letter-spacing:.02em}
.btn{border-radius:0;text-transform:uppercase;letter-spacing:.06em;font-weight:700;transition:background-color .2s,color .2s,translate .2s}
.btn-primary{background:var(--primary);color:var(--on-primary)}
.btn-primary:hover{translate:4px -4px;box-shadow:-4px 4px 0 var(--accent)}
.btn-ghost{background:transparent;color:var(--text);box-shadow:inset 0 0 0 2px currentColor}
.btn-invert{background:var(--bg);color:var(--text)}
.hero h1{font-size:clamp(3.2rem,1.5rem + 8vw,8.5rem);line-height:.9;text-transform:uppercase;letter-spacing:-.01em;font-weight:400}
.hero h1{background:linear-gradient(90deg,var(--text) 0 40%,var(--primary) 50%,var(--text) 60% 100%) 0 0/250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:sweep 6s cubic-bezier(.6,0,.2,1) .6s infinite}
@keyframes sweep{0%{background-position:100% 0}60%,100%{background-position:0 0}}
.kicker{color:var(--primary);text-transform:none}
.art-kinetic{color:var(--primary)}
.art-kinetic .art-ic{width:46%;height:46%;animation:pulse 2.4s ease-in-out infinite}
.art-kinetic .ring{position:absolute;inset:6%;border:2px dashed var(--primary);border-radius:50%;animation:spin 18s linear infinite}
.art-kinetic .r2{inset:20%;border:10px solid color-mix(in srgb,var(--accent) 80%,transparent);border-right-color:transparent;border-bottom-color:transparent;animation-duration:6s}
@keyframes spin{to{rotate:360deg}}
@keyframes pulse{50%{scale:1.08}}
.marquee{overflow:hidden;background:var(--primary);color:var(--on-primary);padding-block:1rem;rotate:-1.5deg;margin-block:1rem;width:104%;margin-left:-2%}
.marquee .track{display:flex;gap:3rem;width:max-content;animation:slide 26s linear infinite;font-family:var(--display);font-size:clamp(1.6rem,1rem + 2vw,2.6rem);text-transform:uppercase}
.marquee span::after{content:"✦";margin-left:3rem;color:var(--accent)}
@keyframes slide{to{translate:-50% 0}}
.sec-head h2,.visit h2,.cta-band h2{text-transform:uppercase;font-weight:400;font-size:clamp(2.4rem,1.4rem + 4vw,5rem);line-height:.95}
.svc{padding:1.75rem;background:var(--surface);border-left:4px solid var(--primary);transition:translate .25s,background-color .25s}
.svc:hover{translate:0 -6px;background:color-mix(in srgb,var(--surface) 85%,var(--primary))}
.l-b .svc{background:none;border-left:0;padding-inline:0}
.svc-ic{color:var(--primary)}
.svc h3{text-transform:uppercase;font-weight:400;font-size:1.6rem}
.why-list h3{font-size:2rem;text-transform:uppercase;font-weight:400;color:var(--primary)}
.hours-card{padding:1.75rem;background:var(--surface);border-top:4px solid var(--primary)}
.cta-band{background:var(--primary);color:var(--on-primary)}
.foot{color:var(--muted);border-top:1px solid color-mix(in srgb,var(--text) 12%,transparent)}
@supports (animation-timeline:view()){
  .svc,.why-list li,.hours-card{animation:rise linear both;animation-timeline:view();animation-range:entry 0% entry 60%}
  @keyframes rise{from{opacity:0;translate:0 40px}to{opacity:1;translate:0 0}}
}
`;

const neumorph = (d) => {
  const p = d.palette;
  const out = `6px 6px 14px ${p.shade},-6px -6px 14px ${p.light}`;
  const outLg = `14px 14px 30px ${p.shade},-14px -14px 30px ${p.light}`;
  const inset = `inset 5px 5px 10px ${p.shade},inset -5px -5px 10px ${p.light}`;
  return `
.top{background:var(--bg);box-shadow:0 8px 16px -10px ${p.shade}}
.mono{border-radius:14px;background:var(--bg);color:var(--primary);box-shadow:${out}}
.btn{border-radius:16px;background:var(--bg);color:var(--text);box-shadow:${out};transition:box-shadow .2s,color .2s}
.btn:active{box-shadow:${inset}}
.btn-primary{color:var(--primary)}
.btn-primary:hover{box-shadow:${inset}}
.top-cta,.cta-band .btn{background:var(--primary);color:var(--on-primary);box-shadow:${out}}
.btn-ghost{color:var(--muted)}
.hero h1{font-weight:700;letter-spacing:-.02em}
.kicker{color:var(--primary)}
.art-neu{display:grid;place-items:center;gap:2rem;aspect-ratio:auto}
.art-neu .dial{width:min(18rem,70vw);aspect-ratio:1;border-radius:50%;background:var(--bg);box-shadow:${outLg};display:grid;place-items:center}
.art-neu .dial-in{width:62%;aspect-ratio:1;border-radius:50%;box-shadow:${inset};display:grid;place-items:center;color:var(--primary)}
.art-neu .dial-in .art-ic{width:44%;height:44%}
.toggles{list-style:none;margin:0;padding:1rem 1.25rem;border-radius:22px;box-shadow:${out};display:grid;gap:.8rem;width:min(18rem,80vw)}
.toggles li{display:flex;justify-content:space-between;align-items:center;font-weight:500}
.sw{position:relative;width:2.8rem;height:1.5rem;border-radius:999px;box-shadow:${inset}}
.sw::after{content:"";position:absolute;top:.2rem;left:.25rem;width:1.1rem;height:1.1rem;border-radius:50%;background:var(--muted);box-shadow:2px 2px 4px ${p.shade}}
.sw.on::after{left:auto;right:.25rem;background:var(--accent)}
.sec-head h2,.visit h2,.cta-band h2{font-weight:700;letter-spacing:-.015em}
.svc{padding:1.6rem;border-radius:22px;box-shadow:${out}}
.l-b .svc{box-shadow:none;border-radius:0;padding-inline:0;border-color:${p.shade}}
.svc-ic{padding:.6rem;border-radius:50%;color:var(--primary);box-shadow:${inset}}
.why-list li{padding:1.5rem;border-radius:22px;box-shadow:${inset}}
.hours-card{padding:1.75rem;border-radius:24px;box-shadow:${out}}
.hours th,.hours td{border-bottom-color:${p.shade}}
.cta-band .wrap{padding:clamp(2rem,1.5rem + 2vw,3rem);border-radius:28px;box-shadow:${out}}
.foot{color:var(--muted)}
`;
};


// ---------- Bento Glow: mixed-size tiles, light beams, dot pattern ----------
const bento = (d) => {
  const dark = d.palette.dark;
  const line = dark ? "rgb(255 255 255 / .09)" : "rgb(17 19 24 / .09)";
  return `
body{background:radial-gradient(circle,${dark ? "rgb(255 255 255 / .07)" : "rgb(17 19 24 / .08)"} 1px,transparent 1.2px) 0 0/22px 22px,var(--bg)}
.top{background:color-mix(in srgb,var(--bg) 80%,transparent);backdrop-filter:blur(14px);border-bottom:1px solid ${line}}
.mono{border-radius:10px;background:var(--text);color:var(--bg)}
.btn{border-radius:12px}
.btn-primary{background:var(--primary);color:var(--on-primary);box-shadow:0 8px 24px -10px var(--primary)}
.btn-ghost{background:var(--surface);color:var(--text);box-shadow:inset 0 0 0 1px ${line}}
.btn-invert{background:var(--surface);color:var(--text)}
.kicker{display:inline-block;padding:.3rem .8rem;border-radius:999px;background:var(--surface);box-shadow:inset 0 0 0 1px ${line};font-size:.9rem}
.hero h1{font-weight:700;letter-spacing:-.035em}
.art-bento{aspect-ratio:auto;place-items:stretch;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:minmax(7.5rem,auto);gap:.9rem;width:100%}
.bt{position:relative;display:grid;align-content:space-between;gap:1rem;padding:1.2rem;border-radius:20px;background:var(--surface);box-shadow:inset 0 0 0 1px ${line},0 12px 30px -18px rgb(0 0 0 / .25)}
.bt .ic{width:1.6rem;height:1.6rem;color:var(--primary)}
.bt p{font-weight:600}
.bt-main{grid-row:span 2;background:linear-gradient(160deg,color-mix(in srgb,var(--primary) 14%,var(--surface)),var(--surface))}
.bt-main .art-ic{width:3.6rem;height:3.6rem;color:var(--primary)}
.bt-main p{font-family:var(--display);font-size:1.5rem;font-weight:700;letter-spacing:-.02em}
.bt-call{grid-column:span 2;display:flex;align-items:center;background:var(--primary);color:var(--on-primary)}
.bt-call p{font-size:1.15rem}
.bt-call .ic{color:inherit}
.sec-head h2,.visit h2,.cta-band h2{font-weight:700;letter-spacing:-.03em}
/* Bento: tile spans chosen so 3, 4 or 6 services always fill the grid with no gaps */
.s-bento .svc-list{grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
.s-bento .svc-list:has(> :nth-child(4):last-child){grid-template-columns:repeat(2,minmax(0,1fr))}
.svc{position:relative;padding:1.5rem;border-radius:20px;background:var(--surface);box-shadow:inset 0 0 0 1px ${line}}
.s-bento .svc-list > .svc:first-child{grid-column:span 2;background:linear-gradient(135deg,color-mix(in srgb,var(--primary) 12%,var(--surface)),var(--surface))}
.s-bento .svc-list:has(> :nth-child(6)) > .svc:nth-child(4),.s-bento .svc-list:has(> :nth-child(6)) > .svc:nth-child(6),
.s-bento .svc-list:has(> :nth-child(4):last-child) > .svc:nth-child(4){grid-column:span 2}
.s-bento .svc-list:has(> :nth-child(3):last-child) > .svc:nth-child(3){grid-column:span 3}
.s-bento .svc-list > .svc:nth-child(4){background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 12%,var(--surface)),var(--surface))}
.l-b .svc{padding-inline:1.5rem;border-top:0}
.svc-ic{padding:.55rem;border-radius:12px;background:color-mix(in srgb,var(--primary) 12%,transparent);color:var(--primary)}
.why-list li{padding:1.5rem;border-radius:20px;background:var(--surface);box-shadow:inset 0 0 0 1px ${line}}
.hours-card{padding:1.75rem;border-radius:22px;background:var(--surface);box-shadow:inset 0 0 0 1px ${line}}
.cta-band .wrap{padding:clamp(2rem,1.5rem + 2vw,3.25rem);border-radius:26px;background:var(--band);color:#fff}
.cta-band{padding-top:0}
.foot{color:var(--muted)}
@media (max-width:52rem){.s-bento .svc-list,.s-bento .svc-list:has(> :nth-child(4):last-child){grid-template-columns:1fr}.s-bento .svc-list > .svc{grid-column:auto!important}}
`;
};

// ---------- Retro Grid / Neon: perspective floor, sun, glowing type ----------
const retro = () => `
html,body{overflow-x:clip}
body{background:var(--bg)}
.ribbon{background:var(--primary);color:var(--on-primary)}
.top{background:color-mix(in srgb,var(--bg) 75%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid color-mix(in srgb,var(--accent) 30%,transparent)}
.mono{border-radius:8px;background:transparent;color:var(--accent);box-shadow:0 0 0 2px var(--accent),0 0 18px var(--accent)}
.logo-name{text-shadow:0 0 12px color-mix(in srgb,var(--accent) 70%,transparent)}
.btn{border-radius:10px;text-transform:uppercase;letter-spacing:.08em;font-weight:700;font-size:.9rem}
.btn-primary{background:var(--primary);color:var(--on-primary);box-shadow:0 0 0 1px var(--primary),0 0 28px -4px var(--primary)}
.btn-ghost{background:transparent;color:var(--accent);box-shadow:inset 0 0 0 2px var(--accent),0 0 18px -6px var(--accent)}
.btn-invert{background:var(--bg);color:var(--text)}
.hero{position:relative;overflow:hidden;padding-bottom:clamp(6rem,4rem + 8vw,11rem);background:radial-gradient(60% 55% at 70% 20%,color-mix(in srgb,var(--primary) 30%,transparent),transparent 70%),linear-gradient(180deg,var(--bg) 40%,var(--band))}
.hero .wrap{position:relative;z-index:1}
.floor{position:absolute;inset:auto -50% 0;height:48%;transform-origin:bottom;transform:perspective(320px) rotateX(62deg);
  background:linear-gradient(transparent 0 calc(100% - 2px),var(--accent) 0) 0 0/100% 44px,linear-gradient(90deg,transparent 0 calc(100% - 2px),var(--accent) 0) 0 0/44px 100%;
  -webkit-mask:linear-gradient(transparent,#000 70%);mask:linear-gradient(transparent,#000 70%);opacity:.55;animation:floor 2.2s linear infinite}
@keyframes floor{to{background-position:0 44px,0 0}}
.kicker{color:var(--accent);letter-spacing:.06em}
.hero h1{background:linear-gradient(180deg,#fff 10%,var(--primary) 60%,var(--accent));-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 22px color-mix(in srgb,var(--primary) 55%,transparent));font-weight:900}
.lead,.hero-note{color:var(--muted)}
.art-retro .sun{width:78%;aspect-ratio:1;border-radius:50%;background:linear-gradient(180deg,var(--accent),var(--primary) 70%);box-shadow:0 0 80px -10px var(--primary);
  -webkit-mask:linear-gradient(#000 0 55%,transparent 55% 59%,#000 59% 66%,transparent 66% 71%,#000 71% 77%,transparent 77% 83%,#000 83% 88%,transparent 88% 94%,#000 94%);
  mask:linear-gradient(#000 0 55%,transparent 55% 59%,#000 59% 66%,transparent 66% 71%,#000 71% 77%,transparent 77% 83%,#000 83% 88%,transparent 88% 94%,#000 94%)}
.art-retro .sun-ic{position:absolute;inset:0;display:grid;place-items:center;color:var(--bg)}
.art-retro .sun-ic .art-ic{width:26%;height:26%;margin-bottom:24%;stroke-width:2.2}
.marquee{background:var(--surface);border-block:1px solid color-mix(in srgb,var(--accent) 35%,transparent);font-family:var(--display);font-size:clamp(1.2rem,1rem + 1vw,1.7rem);color:var(--accent);text-shadow:0 0 14px var(--accent)}
.marquee span::after{content:"◆";margin-left:3rem;color:var(--primary)}
.sec-head h2,.visit h2,.cta-band h2{color:var(--text);text-shadow:0 0 24px color-mix(in srgb,var(--primary) 50%,transparent)}
.svc{padding:1.5rem;border-radius:14px;background:linear-gradient(180deg,var(--surface),color-mix(in srgb,var(--surface) 70%,var(--bg)));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--accent) 25%,transparent)}
.svc:hover{box-shadow:inset 0 0 0 1px var(--accent),0 0 30px -10px var(--accent)}
.l-b .svc{background:none;box-shadow:none;border-radius:0;padding-inline:0;border-color:color-mix(in srgb,var(--accent) 25%,transparent)}
.svc-ic{color:var(--accent);filter:drop-shadow(0 0 8px var(--accent))}
.why-list h3{color:var(--primary)}
.hours-card{padding:1.75rem;border-radius:16px;background:var(--surface)}
.hours th,.hours td{border-bottom-color:color-mix(in srgb,var(--accent) 20%,transparent)}
.cta-band{background:linear-gradient(90deg,var(--primary),var(--accent));color:var(--on-primary)}
.cta-band h2{color:inherit;text-shadow:none}
.foot{color:var(--muted);border-top:1px solid color-mix(in srgb,var(--accent) 25%,transparent)}
`;

// ---------- Neo-Brutalism: thick borders, hard shadows, flat brights ----------
const brutal = () => `
body{background:var(--bg)}
.ribbon{background:var(--text);color:var(--bg)}
.top{background:var(--surface);border-bottom:3px solid var(--text)}
.mono{background:var(--accent);color:var(--text);border:3px solid var(--text);box-shadow:3px 3px 0 var(--text)}
.logo-name{font-weight:800}
.btn{border:3px solid var(--text);border-radius:10px;font-weight:800;box-shadow:4px 4px 0 var(--text);transition:translate .12s,box-shadow .12s}
.btn:hover{translate:-2px -2px;box-shadow:6px 6px 0 var(--text)}
.btn:active{translate:3px 3px;box-shadow:1px 1px 0 var(--text)}
.btn-primary{background:var(--accent);color:var(--text)}
.btn-ghost{background:var(--surface);color:var(--text)}
.btn-invert{background:var(--surface);color:var(--text)}
.kicker{display:inline-block;padding:.3rem .8rem;background:var(--band);border:3px solid var(--text);border-radius:8px;color:var(--text);font-weight:700;rotate:-2deg}
.hero h1{font-weight:400;letter-spacing:-.01em;line-height:1.02}
.lead{color:var(--muted)}
.art-brutal .card{position:absolute;width:64%;aspect-ratio:4/5;border:3px solid var(--text);border-radius:18px}
.art-brutal .c-back{background:var(--band);rotate:8deg;translate:14% 4%}
.art-brutal .c-front{display:grid;place-items:center;align-content:center;gap:1rem;background:var(--surface);box-shadow:8px 8px 0 var(--text);rotate:-4deg}
.art-brutal .c-front .art-ic{width:clamp(5rem,40%,9rem);height:auto;aspect-ratio:1;stroke-width:2}
.art-brutal .c-front p{font-family:var(--display);font-size:1.3rem;text-align:center;padding-inline:1rem}
.art-brutal .sticker{position:absolute;top:8%;left:2%;padding:.6rem 1rem;border:3px solid var(--text);border-radius:999px;background:var(--accent);font-weight:800;rotate:-12deg;box-shadow:4px 4px 0 var(--text)}
.marquee{background:var(--band);border-block:3px solid var(--text);font-family:var(--display);font-size:clamp(1.3rem,1rem + 1.2vw,2rem);color:var(--text)}
.marquee span::after{content:"✱";margin-left:3rem}
.sec-head h2,.visit h2,.cta-band h2{font-weight:400}
.svc{padding:1.5rem;background:var(--surface);border:3px solid var(--text);border-radius:16px;box-shadow:6px 6px 0 var(--text)}
.svc:nth-child(3n+2){background:var(--band)}
.l-b .svc{box-shadow:none;border-width:3px 0 0;border-radius:0;background:none;padding-inline:0}
.svc-ic{padding:.5rem;border:3px solid var(--text);border-radius:12px;background:var(--accent);color:var(--text);stroke-width:2.2}
.why{background:var(--band);border-block:3px solid var(--text)}
.why-list li{padding:1.5rem;background:var(--surface);border:3px solid var(--text);border-radius:16px;box-shadow:5px 5px 0 var(--text)}
.hours-card{padding:1.5rem;background:var(--surface);border:3px solid var(--text);border-radius:16px;box-shadow:6px 6px 0 var(--text)}
.hours th,.hours td{border-bottom:2px solid var(--text)}
.cta-band{background:var(--accent);border-top:3px solid var(--text);color:var(--text)}
.foot{background:var(--text);color:var(--bg)}
`;

// ---------- Editorial / Swiss: type-led, grid, fine rules ----------
const editorial = (d) => {
  const rule = d.palette.dark ? "rgb(255 255 255 / .16)" : "rgb(0 0 0 / .14)";
  return `
body{background:var(--bg)}
.top{background:var(--bg);border-bottom:1px solid ${rule}}
.mono{background:none;color:var(--text);border:1px solid var(--text);border-radius:50%;font-family:var(--display);font-weight:400;font-size:1.05rem}
.logo-name{font-weight:500;letter-spacing:-.01em}
.btn{border-radius:0;font-weight:500;letter-spacing:.01em}
.btn-primary{background:var(--primary);color:var(--on-primary)}
.btn-ghost{background:none;color:var(--text);box-shadow:inset 0 -1px 0 currentColor;padding-inline:.2rem}
.btn-invert{background:var(--bg);color:var(--text)}
.hero{border-bottom:1px solid ${rule}}
.kicker{color:var(--accent);font-weight:500}
.hero h1{font-weight:400;font-size:clamp(2.8rem,1.4rem + 5.5vw,6.2rem);line-height:.98;letter-spacing:-.025em}
.lead{font-size:1.2rem}
.art.art-editorial{aspect-ratio:auto;align-self:end;display:grid;place-items:stretch;align-content:end;max-width:none;justify-self:stretch;padding-top:1.5rem;border-top:2px solid var(--text)}
.ed-cap{font-family:var(--display);font-style:italic;font-size:1.6rem;margin-bottom:1rem}
.ed-index{list-style:none;margin:0;padding:0;width:100%}
.ed-index li{display:flex;justify-content:space-between;align-items:center;padding:.85rem 0;border-bottom:1px solid ${rule};font-size:1.1rem}
.ed-index .ic{color:var(--accent)}
.ed-foot{margin-top:1rem;color:var(--muted);font-size:.95rem}
.sec-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:2rem;max-width:none;align-items:end;padding-bottom:1.5rem;border-bottom:1px solid ${rule}}
.sec-head h2,.visit h2,.cta-band h2{font-weight:400;letter-spacing:-.02em;font-size:clamp(2.2rem,1.4rem + 3vw,3.8rem)}
.sec-head p{margin-top:0}
.svc-list{gap:0}
.svc{padding:1.5rem 1.5rem 1.75rem 0;border-top:1px solid ${rule}}
.svc-list > .svc{border-right:1px solid ${rule};padding-left:1.5rem}
.svc-ic{width:2rem;height:2rem;color:var(--accent);stroke-width:1.4}
.svc h3{font-weight:400;font-size:1.6rem}
.l-b .svc{border-right:0;padding-left:0}
.why-list{gap:0}
.why-list li{padding:0 2rem 0 0;border-left:1px solid ${rule};padding-left:1.5rem}
.why-list h3{font-weight:400;font-size:1.7rem}
.hours-card{padding-top:1rem;border-top:2px solid var(--text)}
.hours-card h3{font-weight:400;font-size:1.6rem}
.hours th,.hours td{border-bottom-color:${rule}}
.cta-band{background:var(--band);color:#fff}
.foot{color:var(--muted);border-top:1px solid ${rule}}
@media (max-width:52rem){.sec-head{grid-template-columns:1fr}.svc-list > .svc{border-right:0;padding-left:0}.why-list li{border-left:0;padding-left:0;border-top:1px solid ${rule};padding-top:1.25rem}}
`;
};


// ---------- Luxury Noir: black, gold hairlines, fine serif ----------
const noir = (d) => {
  const hair = "color-mix(in srgb,var(--primary) 45%,transparent)";
  const onBand = d.palette.dark ? "var(--muted)" : "var(--bg)";
  return `
body{background:var(--bg)}
.ribbon{background:var(--band);color:var(--muted);border-bottom:1px solid ${hair}}
.top{background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:blur(14px);border-bottom:1px solid ${hair}}
.mono{width:2.6rem;height:2.6rem;border:1px solid var(--primary);color:var(--primary);rotate:45deg;font-weight:400}
.mono{font-size:.85rem}
.logo-name{font-weight:400;letter-spacing:.08em;text-transform:uppercase;font-size:1rem}
.nav a{letter-spacing:.12em;text-transform:uppercase;font-size:.8rem}
.btn{border-radius:2px;text-transform:uppercase;letter-spacing:.16em;font-size:.8rem;font-weight:500;padding-inline:1.8rem}
.btn-primary{background:linear-gradient(135deg,color-mix(in srgb,var(--primary) 80%,#fff),var(--primary) 45%,color-mix(in srgb,var(--primary) 75%,#000));color:var(--on-primary)}
.btn-ghost{background:transparent;color:var(--primary);box-shadow:inset 0 0 0 1px var(--primary)}
.btn-invert{background:var(--primary);color:var(--on-primary)}
.kicker{color:var(--primary);text-transform:uppercase;letter-spacing:.32em;font-size:.78rem;font-weight:500}
.hero h1{font-weight:400;letter-spacing:-.01em;line-height:1.02;font-size:clamp(2.8rem,1.4rem + 5vw,5.6rem)}
.lead{color:var(--muted)}
.art-noir{display:grid;place-items:center;gap:2rem}
.art-noir .crest{position:relative;width:58%;aspect-ratio:1;rotate:45deg;border:1px solid var(--primary);display:grid;place-items:center;box-shadow:0 0 0 10px var(--bg),0 0 0 11px ${hair},0 40px 80px -30px color-mix(in srgb,var(--primary) 40%,transparent)}
.art-noir .crest::before{content:"";position:absolute;inset:14%;border:1px solid ${hair}}
.crest-mono{rotate:-45deg;font-family:var(--display);font-size:clamp(3rem,2rem + 4vw,5.5rem);color:var(--primary);letter-spacing:.04em}
.crest-cap{color:var(--muted);text-transform:uppercase;letter-spacing:.3em;font-size:.75rem}
.sec-head h2,.visit h2,.cta-band h2{font-weight:400;letter-spacing:-.01em}
.sec-head h2::before{content:"";display:block;width:3.5rem;height:9px;margin-bottom:1.2rem;background:linear-gradient(var(--primary),var(--primary)) 0 50%/100% 1px no-repeat,linear-gradient(45deg,transparent 45%,var(--primary) 45% 55%,transparent 55%) 100% 0/9px 9px no-repeat}
.svc{padding:1.8rem 0;border-top:1px solid ${hair}}
.svc-ic{color:var(--primary);stroke-width:1.2}
.svc h3{font-weight:400;font-size:1.45rem}
.why{background:var(--surface)}
.why-list li{padding-left:1.4rem;border-left:1px solid var(--primary)}
.why-list h3{font-weight:400;font-size:1.5rem}
.hours-card{padding:1.8rem;border:1px solid ${hair};background:var(--surface)}
.hours th,.hours td{border-bottom-color:${hair}}
.facts{border-color:${hair}}
.fact-list strong{color:var(--primary);font-weight:400}
.step{background:transparent;box-shadow:none;border:1px solid ${hair};border-radius:0}
.step-n{background:transparent;color:var(--primary);border:1px solid var(--primary);border-radius:0;rotate:45deg}
.step-n{font-weight:400}
.rev{background:var(--surface);border-radius:0;box-shadow:inset 0 0 0 1px ${hair}}
.rev blockquote{font-family:var(--display);font-size:1.3rem}
.gal li{border-radius:0}
.qa{border-color:${hair}}
.cta-band{background:${d.palette.dark ? "linear-gradient(180deg,var(--surface),var(--band))" : "var(--band)"};color:${d.palette.dark ? "var(--text)" : "var(--bg)"};border-top:1px solid ${hair}}
.cta-band .btn-invert{background:var(--accent);color:var(--band)}
.foot{background:var(--band);color:${onBand};border-top:1px solid ${hair}}
.ribbon{color:${onBand}}
`;
};

// ---------- Glassmorphism: frosted panels over a full photo ----------
const glass = (d) => {
  const p = d.palette;
  const [g1, g2, g3] = p.glow || ["#c7d2fe", "#fbcfe8", "#bbf7d0"];
  const edge = p.dark ? "rgb(255 255 255 / .14)" : "rgb(255 255 255 / .75)";
  // Panels read --pane, so a part of the page colored in Customize can tint its own panels
  const pane = "var(--pane)";
  return `
:root{--pane:${p.dark ? "rgb(15 18 38 / .5)" : "rgb(255 255 255 / .62)"}}
body{background:var(--bg)}
body::before{content:"";position:fixed;inset:-20%;z-index:-1;filter:blur(80px);opacity:${p.dark ? .5 : .75};background:radial-gradient(35% 30% at 20% 25%,${g1},transparent 70%),radial-gradient(35% 30% at 80% 20%,${g2},transparent 70%),radial-gradient(40% 35% at 50% 85%,${g3},transparent 70%)}
.top{background:${pane};backdrop-filter:blur(20px) saturate(1.5);border-bottom:1px solid ${edge}}
.mono{border-radius:14px;background:linear-gradient(135deg,var(--primary),var(--accent));color:#fff}
.btn{border-radius:14px}
.btn-primary{background:var(--primary);color:var(--on-primary);box-shadow:0 10px 30px -10px var(--primary)}
.btn-ghost{background:${pane};color:var(--text);backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px ${edge}}
.btn-invert{background:#fff;color:#111}
.hero-full{min-height:min(88vh,56rem);display:grid;align-items:center}
.hero-full .hero-copy{padding:clamp(1.5rem,1rem + 2vw,2.6rem);border-radius:28px;background:${pane};backdrop-filter:blur(22px) saturate(1.6);box-shadow:inset 0 0 0 1px ${edge},0 30px 60px -30px rgb(0 0 0 / .4)}
.hero h1{font-weight:800;letter-spacing:-.035em;font-size:clamp(2.2rem,1.3rem + 2.8vw,3.7rem)}
.kicker{color:var(--primary)}
.lead{color:var(--muted)}
.art-glass{aspect-ratio:auto;display:grid;gap:1rem;justify-items:stretch;max-width:24rem}
.gl{background:${pane};backdrop-filter:blur(22px) saturate(1.6);border-radius:24px;box-shadow:inset 0 0 0 1px ${edge},0 24px 50px -24px rgb(0 0 0 / .35)}
.gl-main{padding:1.6rem;display:grid;gap:.5rem}
.gl-ic{display:grid;place-items:center;width:3.4rem;height:3.4rem;border-radius:16px;background:linear-gradient(135deg,var(--primary),var(--accent));color:#fff;margin-bottom:.4rem}
.gl-ic .art-ic{width:60%;height:60%}
.gl-t{font-family:var(--display);font-weight:800;font-size:1.35rem}
.gl-s{color:var(--muted)}
.gl-pill{display:flex;align-items:center;gap:.6rem;padding:.8rem 1.1rem;border-radius:999px;font-weight:600;justify-self:start}
.gl-pill .ic{color:var(--primary)}
.gp2{justify-self:end}
.sec-head h2,.visit h2,.cta-band h2{font-weight:800;letter-spacing:-.03em}
.svc,.why-list li,.hours-card,.step,.rev{background:${pane};backdrop-filter:blur(18px);border-radius:22px;box-shadow:inset 0 0 0 1px ${edge}}
.svc,.why-list li,.hours-card{padding:1.6rem}
.l-b .svc{background:none;backdrop-filter:none;box-shadow:none;border-radius:0;padding-inline:0;border-color:${edge}}
.svc-ic{padding:.55rem;border-radius:14px;color:#fff;background:linear-gradient(135deg,var(--primary),var(--accent))}
.facts{background:${pane};backdrop-filter:blur(18px);border-color:${edge}}
.cta-band .wrap{padding:clamp(2rem,1.5rem + 2vw,3.2rem);border-radius:28px;background:linear-gradient(120deg,var(--primary),var(--accent));color:#fff}
.cta-band{padding-top:0}
.foot{color:var(--muted)}
@media (max-width:52rem){.hero-full{min-height:auto}}
`;
};

// ---------- Art Deco: gold fans, stepped frames, 1920s type ----------
const deco = (d) => {
  const gold = "var(--primary)";
  const onBand = d.palette.dark ? "var(--text)" : "var(--bg)";
  const goldOnBand = d.palette.dark ? "var(--primary)" : "var(--accent)";
  return `
body{background:var(--bg)}
.ribbon{background:var(--band);color:var(--muted)}
.top{background:var(--band);border-bottom:4px double ${goldOnBand};color:${onBand}}
.top .mono{color:${goldOnBand};border-color:${goldOnBand};box-shadow:inset 0 0 0 3px var(--band),inset 0 0 0 4px ${goldOnBand}}
.top .btn-primary{background:${goldOnBand};color:var(--band)}
.ribbon{color:${onBand}}
.mono{background:none;border:1px solid ${gold};color:${gold};box-shadow:inset 0 0 0 3px var(--band),inset 0 0 0 4px ${gold}}
.logo-name{letter-spacing:.14em;text-transform:uppercase;font-size:1rem}
.nav a{text-transform:uppercase;letter-spacing:.16em;font-size:.8rem}
.btn{border-radius:0;text-transform:uppercase;letter-spacing:.18em;font-size:.8rem;font-weight:600}
.btn-primary{background:${gold};color:var(--on-primary);box-shadow:inset 0 0 0 2px var(--primary),inset 0 0 0 4px color-mix(in srgb,var(--on-primary) 40%,transparent)}
.btn-ghost{background:transparent;color:${gold};box-shadow:inset 0 0 0 1px ${gold},inset 0 0 0 4px var(--bg),inset 0 0 0 5px color-mix(in srgb,${gold} 50%,transparent)}
.btn-invert{background:var(--bg);color:${gold};box-shadow:inset 0 0 0 1px ${gold}}
.kicker{color:${gold};text-transform:uppercase;letter-spacing:.3em;font-size:.8rem}
.hero h1{font-weight:400;letter-spacing:.02em;line-height:1.08}
.lead{color:var(--muted)}
.art-deco{display:grid;place-items:end center}
.art-deco .fan{width:100%;height:100%}
.deco-ic{position:absolute;bottom:20%;left:50%;translate:-50% 0;display:grid;place-items:center;width:28%;aspect-ratio:1;border:1px solid ${gold};background:var(--bg);color:${gold};rotate:45deg}
.deco-ic .art-ic{width:52%;height:52%;rotate:-45deg}
.sec-head{text-align:center;margin-inline:auto}
.sec-head h2{font-weight:400;letter-spacing:.04em}
.sec-head h2::after{content:"";display:block;width:12rem;height:14px;margin:1.1rem auto 0;background:linear-gradient(${gold},${gold}) 0 50%/38% 1px no-repeat,linear-gradient(${gold},${gold}) 100% 50%/38% 1px no-repeat,linear-gradient(45deg,transparent 42%,${gold} 42% 58%,transparent 58%) 50% 50%/14px 14px no-repeat,linear-gradient(-45deg,transparent 42%,${gold} 42% 58%,transparent 58%) 50% 50%/14px 14px no-repeat}
.visit h2,.cta-band h2{font-weight:400;letter-spacing:.04em}
.svc,.why-list li,.step,.rev,.hours-card{position:relative;padding:1.7rem;background:var(--surface);border:1px solid color-mix(in srgb,${gold} 60%,transparent);border-radius:0}
.svc::before,.why-list li::before,.hours-card::before{content:"";position:absolute;inset:6px;border:1px solid color-mix(in srgb,${gold} 25%,transparent);pointer-events:none}
.l-b .svc{border-width:1px 0 0;background:none;padding-inline:0}.l-b .svc::before{display:none}
.svc-ic{color:${gold};stroke-width:1.4}
.svc h3,.why-list h3{font-weight:400;letter-spacing:.04em}
.why{background:var(--band);color:${onBand}}
.why .sec-head h2::after{filter:${d.palette.dark ? "none" : "brightness(1.6)"}}
.why .svc,.why .why-list li{background:color-mix(in srgb,var(--band) 85%,#fff);color:${onBand}}
.why-list p{color:inherit;opacity:.8}
.step-n{border-radius:0;rotate:45deg;background:${gold};color:var(--on-primary)}
.facts{border-color:color-mix(in srgb,${gold} 50%,transparent)}
.fact-list{text-align:center}
.fact-list strong{color:${gold};font-weight:400}
.cta-band{background:var(--band);border-block:4px double ${goldOnBand};color:${onBand}}
.cta-band .btn-invert{background:${goldOnBand};color:var(--band);box-shadow:none}
.foot{background:var(--band);color:${onBand}}
.foot .made{opacity:.7}
`;
};

// ---------- Zen Minimal: space, ink circle, quiet type ----------
const zen = (d) => `
:root{--sec:clamp(5rem,3.5rem + 6vw,9.5rem)}
body{background:var(--bg)}
.top{background:color-mix(in srgb,var(--bg) 90%,transparent);backdrop-filter:blur(8px)}
.mono{border-radius:50%;border:1px solid var(--text);background:none;color:var(--text);font-weight:500}
.logo-name{font-weight:500;letter-spacing:.06em}
.btn{border-radius:0;font-weight:500;letter-spacing:.06em;padding-inline:1.7rem}
.btn-primary{background:var(--primary);color:var(--on-primary)}
.btn-ghost{background:none;color:var(--text);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--text) 40%,transparent)}
.btn-invert{background:var(--bg);color:var(--text)}
.kicker{display:flex;align-items:center;gap:.8rem;color:var(--accent);letter-spacing:.2em;font-size:.85rem}
.kicker::before{content:"";width:2.5rem;height:1px;background:currentColor}
.l-b .kicker{justify-content:center}
.hero h1{font-weight:500;line-height:1.28;letter-spacing:.01em;font-size:clamp(2.2rem,1.4rem + 3vw,3.8rem)}
.lead{line-height:1.8}
.art-zen{display:grid;place-items:center}
.art-zen .enso{width:82%;height:82%}
.zen-ic{position:absolute;inset:0;display:grid;place-items:center;color:var(--accent)}
.zen-ic .art-ic{width:22%;height:22%;stroke-width:1.3}
.zen-v{position:absolute;right:2%;top:12%;writing-mode:vertical-rl;letter-spacing:.4em;color:var(--muted);font-size:.85rem}
.sec-head h2,.visit h2,.cta-band h2{font-weight:500;line-height:1.3;letter-spacing:.02em}
.svc{padding:1.8rem 0;border-top:1px solid color-mix(in srgb,var(--text) 14%,transparent)}
.svc-ic{color:var(--accent);stroke-width:1.3;width:2rem;height:2rem}
.svc h3,.why-list h3{font-weight:500;letter-spacing:.02em}
.svc p,.why-list p{line-height:1.8}
.why{background:var(--band)}
.hours-card{padding:2rem;background:var(--surface)}
.step{background:none;box-shadow:none;border-radius:0;border-top:1px solid color-mix(in srgb,var(--text) 20%,transparent);padding-inline:0}
.step-n{background:none;color:var(--accent);width:auto;height:auto;justify-content:start;font-weight:500}
.steps .step::after{display:none}
.rev{background:var(--surface);border-radius:0;box-shadow:none}
.gal li{border-radius:2px}
.cta-band{background:var(--band);color:var(--text)}
.foot{color:var(--muted)}
`;

// ---------- Claymorphism: puffy soft-3D shapes ----------
const clay = (d) => {
  const puff = `0 18px 34px -14px color-mix(in srgb,var(--primary) 45%,transparent),inset -6px -8px 16px rgb(0 0 0 / .07),inset 6px 8px 16px rgb(255 255 255 / .85)`;
  return `
body{background:var(--bg)}
.top{background:color-mix(in srgb,var(--bg) 85%,transparent);backdrop-filter:blur(10px)}
.mono{border-radius:42% 58% 52% 48%/50% 44% 56% 50%;background:var(--primary);color:#fff;box-shadow:inset -4px -5px 8px rgb(0 0 0 / .18),inset 4px 5px 8px rgb(255 255 255 / .35)}
.logo-name{font-weight:800}
.btn{border-radius:999px;font-weight:700;transition:translate .2s}
.btn:hover{translate:0 -2px}
.btn-primary{background:var(--primary);color:#fff;box-shadow:0 12px 24px -10px var(--primary),inset -4px -6px 10px rgb(0 0 0 / .18),inset 4px 6px 10px rgb(255 255 255 / .3)}
.btn-ghost{background:var(--surface);color:var(--text);box-shadow:${puff}}
.btn-invert{background:#fff;color:var(--primary)}
.kicker{display:inline-block;padding:.35rem .9rem;border-radius:999px;background:var(--band);color:var(--primary);font-weight:700}
.hero h1{font-weight:800;letter-spacing:-.02em}
.art-clay{display:grid;place-items:center}
.cl{background:var(--surface);box-shadow:${puff};border-radius:36px}
.cl-main{width:70%;aspect-ratio:1;display:grid;place-items:center;align-content:center;gap:.8rem;color:var(--primary);border-radius:44px}
.cl-main .art-ic{width:42%;height:42%;stroke-width:2}
.cl-main p{font-family:var(--display);font-weight:800;font-size:1.3rem;color:var(--text)}
.cl-b1,.cl-b2{position:absolute;display:grid;place-items:center;width:22%;aspect-ratio:1;border-radius:50%;animation:bob 5s ease-in-out infinite}
.cl-b1{top:6%;right:6%;background:var(--band);color:var(--primary)}
.cl-b2{bottom:8%;left:4%;background:var(--accent);color:#fff;animation-delay:-2.5s}
.cl-b1 .ic,.cl-b2 .ic{width:45%;height:45%}
@keyframes bob{50%{translate:0 -10px}}
.sec-head h2,.visit h2,.cta-band h2{font-weight:800}
.svc,.why-list li,.hours-card,.step,.rev{background:var(--surface);border-radius:30px;box-shadow:${puff};padding:1.6rem}
.l-b .svc{border-top:0;margin-bottom:1rem}
.svc-ic{padding:.6rem;border-radius:18px;background:var(--band);color:var(--primary)}
.why{background:var(--band)}
.facts{border:0}
.fact-list li{padding:1.2rem 1.4rem;border-radius:26px;background:var(--surface);box-shadow:${puff}}
.fact-list strong{color:var(--primary)}
.gal li{border-radius:30px}
.cta-band .wrap{padding:clamp(2rem,1.5rem + 2vw,3rem);border-radius:40px;background:var(--primary);color:#fff;box-shadow:0 24px 40px -18px var(--primary),inset -8px -10px 20px rgb(0 0 0 / .18),inset 8px 10px 20px rgb(255 255 255 / .2)}
.cta-band{padding-top:0}
.foot{color:var(--muted)}
`;
};

// ---------- Full-bleed Photo: magazine-style, image-led ----------
const fullbleed = (d) => `
body{background:var(--bg)}
.top{position:sticky;background:color-mix(in srgb,var(--band) 82%,transparent);backdrop-filter:blur(12px);color:#fff}
.mono{background:#fff;color:#111;border-radius:0}
.logo-name{text-transform:uppercase;letter-spacing:.06em}
.btn{border-radius:0;text-transform:uppercase;letter-spacing:.1em;font-size:.85rem;font-weight:700}
.btn-primary{background:var(--accent);color:#111}
.top .btn-primary{background:#fff;color:#111}
.btn-ghost{background:transparent;color:#fff;box-shadow:inset 0 0 0 2px #fff}
.btn-invert{background:var(--accent);color:#111}
.hero-full{min-height:min(90vh,58rem);display:grid;align-items:end;color:#fff}
.hero-full .hero-grid{align-items:end}
.hero-full .kicker{color:var(--accent);letter-spacing:.14em;text-transform:uppercase;font-size:.85rem}
.hero-full h1{font-size:clamp(3rem,1.6rem + 6vw,7.2rem);line-height:.95;letter-spacing:-.01em;text-transform:${/Big Shoulders|Oswald/.test(d.font.display) ? "uppercase" : "none"}}
.hero-full .lead,.hero-full .hero-note{color:rgb(255 255 255 / .85)}
.art-full{aspect-ratio:auto;align-self:end;justify-self:end;max-width:20rem}
.fb-card{display:grid;gap:.7rem;padding:1.3rem 1.5rem;background:rgb(0 0 0 / .45);backdrop-filter:blur(14px);border-left:3px solid var(--accent)}
.fb-card p{display:flex;gap:.6rem;align-items:center}
.fb-card .ic{color:var(--accent)}
.marquee{background:var(--accent);color:#111;font-family:var(--display);font-size:clamp(1.3rem,1rem + 1.2vw,2rem);text-transform:uppercase}
.marquee span::after{content:"—";margin-left:3rem}
.sec-head h2,.visit h2,.cta-band h2{font-size:clamp(2.2rem,1.4rem + 3vw,4rem);line-height:1;text-transform:${/Big Shoulders|Oswald/.test(d.font.display) ? "uppercase" : "none"}}
.svc{padding:1.6rem 0;border-top:2px solid var(--text)}
.svc-ic{color:var(--accent)}
.why{background:var(--band);color:#fff}
.why .sec-head p,.why-list p{color:rgb(255 255 255 / .75)}
.why-list h3{color:var(--accent)}
.gallery{padding-top:0}
.gallery .gal{grid-auto-rows:clamp(12rem,9rem + 12vw,22rem)}
.gal li,.rev,.step,.hours-card{border-radius:0}
.step{background:none;box-shadow:none;border-top:2px solid var(--text);padding-inline:0}
.step-n{border-radius:0;background:var(--text);color:var(--bg)}
.hours-card{padding:1.6rem;background:var(--surface)}
.cta-band{background:var(--band);color:#fff}
.foot{background:var(--band);color:rgb(255 255 255 / .7)}
@media (max-width:52rem){.hero-full{min-height:auto;padding-top:6rem}.art-full{justify-self:stretch;max-width:none}}
`;

// ---------- Blueprint: technical drawing on a drafting grid ----------
const blueprint = () => {
  const line = "color-mix(in srgb,var(--text) 35%,transparent)";
  const grid = `linear-gradient(color-mix(in srgb,var(--text) 6%,transparent) 1px,transparent 1px) 0 0/24px 24px,linear-gradient(90deg,color-mix(in srgb,var(--text) 6%,transparent) 1px,transparent 1px) 0 0/24px 24px,linear-gradient(color-mix(in srgb,var(--text) 12%,transparent) 1px,transparent 1px) 0 0/120px 120px,linear-gradient(90deg,color-mix(in srgb,var(--text) 12%,transparent) 1px,transparent 1px) 0 0/120px 120px`;
  const a = "linear-gradient(var(--accent) 0 0)";
  const corners = `${a} top left/12px 2px,${a} top left/2px 12px,${a} top right/12px 2px,${a} top right/2px 12px,${a} bottom left/12px 2px,${a} bottom left/2px 12px,${a} bottom right/12px 2px,${a} bottom right/2px 12px`;
  const panel = "color-mix(in srgb,var(--bg) 82%,transparent)";
  return `
body{background:${grid},var(--bg);--r-field:0;--r-chip:0;--field-bg:${panel};--field-border:1px solid ${line}}
h1,h2,h3{font-family:var(--body);font-weight:700;letter-spacing:-.02em}
.top{background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid ${line}}
.mono{position:relative;border:1.5px solid var(--text);font-family:var(--display);font-size:.8rem;letter-spacing:.08em}
.mono::after{content:"";position:absolute;inset:-6px;border:1px dashed ${line}}
.logo-name{font-family:var(--body);text-transform:uppercase;letter-spacing:.05em;font-size:1rem}
.nav a,.btn,.kicker,.step-n,.fact-list span,.hours td,.form-note,.foot{font-family:var(--display)}
.nav a{font-size:.85rem;text-transform:uppercase;letter-spacing:.1em}
.btn{border-radius:0;font-size:.9rem;text-transform:uppercase;letter-spacing:.08em;transition:translate .15s,box-shadow .15s}
.btn-primary{background:var(--primary);color:var(--on-primary);box-shadow:4px 4px 0 var(--accent)}
.btn-primary:hover{translate:-1px -1px;box-shadow:6px 6px 0 var(--accent)}
.btn-ghost{background:transparent;color:var(--text);box-shadow:inset 0 0 0 1.5px var(--text)}
.btn-invert{background:var(--accent);color:#111}
.kicker{color:var(--accent);text-transform:uppercase;letter-spacing:.14em;font-size:.8rem}
.kicker::before{content:"// "}
.lead{color:var(--muted)}
.art-blueprint{color:var(--text)}
.art-blueprint .bp{width:100%;height:100%;overflow:visible}
.art-blueprint text{fill:currentColor;font-family:var(--display);font-size:9px;letter-spacing:.08em;text-transform:uppercase}
.art-blueprint .tb{font-size:10px;font-weight:600}
.art-blueprint .note{fill:var(--accent)}
.art-blueprint .note-line{stroke:var(--accent)}
.art-blueprint .draw{stroke-dasharray:760;animation:bpdraw 2.6s cubic-bezier(.4,0,.2,1) .2s both}
.art-blueprint circle.draw{stroke-dasharray:4 4;stroke-dashoffset:0;animation:bpspin 40s linear infinite;transform-origin:150px 140px}
@keyframes bpdraw{from{stroke-dashoffset:760}}
@keyframes bpspin{to{rotate:360deg}}
.bp-ic{position:absolute;left:0;top:0;width:100%;height:93.4%;display:grid;place-items:center;color:var(--accent)}
.bp-ic .art-ic{width:24%;height:24%;stroke-width:1.4}
.sec-head::before{content:"";display:block;width:3rem;height:2px;background:var(--accent);margin-bottom:1rem}
.svc-list{counter-reset:svc}
.svc,.hours-card,.form-card{position:relative;background:${panel};box-shadow:inset 0 0 0 1px ${line};border-radius:0}
.svc{counter-increment:svc;padding:1.5rem}
.svc::before{content:"0" counter(svc);position:absolute;top:.9rem;right:1rem;font-family:var(--display);font-size:.8rem;color:var(--muted)}
.svc::after,.hours-card::after,.form-card::after{content:"";position:absolute;inset:-5px;pointer-events:none;background:${corners};background-repeat:no-repeat}
.l-b .svc{background:none;box-shadow:none;border-top:1px dashed ${line}}
.l-b .svc::after{display:none}
.svc-ic{color:var(--accent);stroke-width:1.4}
.why{border-block:1px dashed ${line}}
.why-list li{padding-top:1rem;border-top:1px dashed ${line}}
.why-list h3::before{content:"→ ";color:var(--accent)}
.hours-card{padding:1.75rem}
.hours th,.hours td{border-bottom:1px dashed ${line}}
.hours td{font-size:.9rem}
.facts{border-block:1px dashed ${line}}
.fact-list strong{font-family:var(--display);color:var(--accent);font-weight:600}
.step,.rev{border-radius:0;background:${panel};box-shadow:inset 0 0 0 1px ${line}}
.step-n{border-radius:0;background:none;border:1.5px solid var(--accent);color:var(--accent)}
.gal li{border-radius:0;outline:1px solid ${line};outline-offset:6px}
.qa{border-bottom:1px dashed ${line}}
.qa summary::after{color:var(--accent)}
.cta-band{background:var(--band);color:#fff}
.foot{border-top:1px solid ${line};color:var(--muted);font-size:.85rem}
`;
};

// ---------- Mid-century Modern: atomic starbursts, boomerangs, warm 1950s color ----------
const midcentury = () => `
body{background:var(--bg);--r-field:14px}
.top{background:var(--surface);box-shadow:0 4px 0 var(--accent),0 8px 0 var(--primary)}
.mono{border-radius:50%;background:var(--accent);color:#1D1D1D;box-shadow:0 0 0 3px var(--surface),0 0 0 5px var(--primary)}
.logo-name{font-weight:700}
.btn{border-radius:999px;font-weight:700;letter-spacing:.02em;transition:translate .15s,box-shadow .15s}
.btn-primary{background:var(--primary);color:var(--on-primary);box-shadow:0 4px 0 color-mix(in srgb,var(--primary) 60%,#000)}
.btn-primary:hover{translate:0 -2px;box-shadow:0 6px 0 color-mix(in srgb,var(--primary) 60%,#000)}
.btn-ghost{background:transparent;color:var(--text);box-shadow:inset 0 0 0 2px var(--text)}
.btn-invert{background:var(--accent);color:#1D1D1D}
.kicker{display:inline-flex;align-items:center;gap:.6rem;color:var(--primary);font-weight:700;text-transform:uppercase;letter-spacing:.12em;font-size:.85rem}
.kicker::before{content:"✦";color:var(--accent);font-size:1.2rem}
.l-b .kicker{justify-content:center}
.hero h1,.sec-head h2,.visit h2,.cta-band h2{font-weight:400;line-height:1.05}
.art-mid .atom{position:absolute;inset:0;width:100%;height:100%}
.art-mid .rays{stroke:var(--text);transform-origin:150px 150px;animation:midspin 80s linear infinite}
.art-mid .dot{fill:var(--text)}.art-mid .dot-a{fill:var(--accent)}
.art-mid .boom{animation:midbob 7s ease-in-out infinite}
.art-mid .b1{fill:var(--primary)}.art-mid .b2{fill:var(--accent);animation-delay:-3.5s}
@keyframes midspin{to{rotate:360deg}}
@keyframes midbob{50%{translate:0 -6px}}
.mid-disc{position:relative;display:grid;place-items:center;width:52%;aspect-ratio:1;border-radius:50%;background:var(--primary);color:var(--on-primary);box-shadow:0 0 0 10px var(--bg),0 0 0 14px var(--accent)}
.mid-disc .art-ic{width:44%;height:44%}
.sec-head h2::after{content:"";display:block;width:4.5rem;height:8px;margin-top:.9rem;border-radius:4px;background:linear-gradient(90deg,var(--primary) 0 33%,var(--accent) 33% 66%,var(--text) 66%)}
.svc{padding:1.6rem;background:var(--surface);border-radius:20px;border-top:6px solid var(--primary)}
.svc:nth-child(3n+2){border-top-color:var(--accent)}.svc:nth-child(3n){border-top-color:var(--text)}
.l-b .svc{background:none;border-radius:0;border-top:3px solid var(--primary);padding-inline:0}
.svc-ic{padding:.55rem;border-radius:50%;background:color-mix(in srgb,var(--primary) 14%,transparent);color:var(--primary)}
.why{background:var(--band);color:#fff}
.why .sec-head p,.why-list p{color:rgb(255 255 255 / .78)}
.why .sec-head h2::after{background:linear-gradient(90deg,var(--accent) 0 50%,#fff 50%)}
.why-list li{padding-left:1.25rem;border-left:4px solid var(--accent)}
.why-list h3{color:var(--accent)}
.hours-card{padding:1.75rem;background:var(--surface);border-radius:24px;border:3px solid var(--text)}
.hours th,.hours td{border-bottom:2px dotted color-mix(in srgb,var(--text) 35%,transparent)}
.facts{background:var(--surface);border-block:3px solid var(--text)}
.fact-list strong{color:var(--primary)}
.step{border-radius:24px;background:var(--surface);box-shadow:none}
.step-n{background:var(--accent);color:#1D1D1D}
.rev{border-radius:24px;box-shadow:none}
.gal li{border-radius:20px}
.gal li:nth-child(odd){border-radius:240px 240px 20px 20px}
.form-card{border-radius:28px;border:3px solid var(--text);box-shadow:8px 8px 0 var(--accent)}
.cta-band{background:var(--primary);color:var(--on-primary)}
.foot{background:var(--band);color:rgb(255 255 255 / .75)}
`;

// ---------- Risograph: two spot inks, halftone dots, slightly off registration ----------
const riso = () => `
body{background:var(--bg);--r-field:6px}
.top{background:var(--bg);border-bottom:2px solid var(--primary)}
.mono{border-radius:50%;background:var(--accent);color:var(--text);box-shadow:3px 2px 0 var(--primary)}
.logo-name{color:var(--primary);font-weight:800}
.btn{border-radius:999px;font-weight:700;transition:translate .15s,box-shadow .15s}
.btn-primary{background:var(--primary);color:var(--on-primary);box-shadow:4px 3px 0 var(--accent)}
.btn-primary:hover{translate:-1px -1px;box-shadow:6px 5px 0 var(--accent)}
.btn-ghost{background:transparent;color:var(--primary);box-shadow:inset 0 0 0 2px var(--primary)}
.btn-invert{background:var(--accent);color:var(--text)}
.kicker{display:inline-block;padding:.25rem .8rem;background:var(--accent);color:var(--text);font-weight:700;border-radius:4px;rotate:-1.5deg}
.hero h1,.sec-head h2,.visit h2{color:var(--primary);font-weight:800;letter-spacing:-.02em;text-shadow:.045em .03em 0 color-mix(in srgb,var(--accent) 75%,transparent)}
.lead{color:var(--muted)}
.art-riso .ink{position:absolute;border-radius:50%;mix-blend-mode:multiply}
.art-riso .ink-a{width:66%;aspect-ratio:1;left:4%;top:6%;background:radial-gradient(circle,var(--primary) 1.7px,transparent 2.1px) 0 0/9px 9px,color-mix(in srgb,var(--primary) 22%,transparent)}
.art-riso .ink-b{width:58%;aspect-ratio:1;right:4%;bottom:8%;background:var(--accent);animation:risofloat 9s ease-in-out infinite}
@keyframes risofloat{50%{translate:-4% -3%}}
.riso-ic{position:absolute;inset:0;display:grid;place-items:center}
.riso-ic .art-ic{width:34%;height:34%;stroke-width:2.4}
.r1{color:var(--primary)}
.r2{color:var(--accent);translate:6px 4px;mix-blend-mode:multiply}
.riso-tag{position:absolute;bottom:4%;left:6%;padding:.4rem .9rem;background:var(--surface);border:2px solid var(--primary);color:var(--primary);font-weight:800;rotate:-4deg}
.marquee{background:var(--primary);color:var(--on-primary);font-family:var(--display);font-size:clamp(1.2rem,1rem + 1vw,1.8rem);text-transform:uppercase}
.marquee span::after{content:"●";color:var(--accent);margin-left:3rem}
.svc{padding:1.6rem;background:var(--surface);border:2px solid var(--primary);border-radius:6px;box-shadow:6px 5px 0 color-mix(in srgb,var(--accent) 80%,transparent)}
.svc-ic{padding:.5rem;border-radius:50%;background:color-mix(in srgb,var(--accent) 45%,transparent);color:var(--primary)}
.l-b .svc{border:0;border-top:2px solid var(--primary);box-shadow:none;background:none;border-radius:0;padding-inline:0}
.svc h3,.why-list h3{color:var(--primary)}
.why{background:radial-gradient(circle,color-mix(in srgb,var(--accent) 40%,transparent) 1.4px,transparent 1.8px) 0 0/10px 10px,var(--bg)}
.why-list li{padding:1.4rem;background:var(--surface);border-radius:6px;border-left:6px solid var(--accent)}
.hours-card,.form-card{padding:1.75rem;background:var(--surface);border:2px solid var(--primary);border-radius:6px;box-shadow:7px 5px 0 var(--accent)}
.hours th,.hours td{border-bottom:1.5px dotted var(--primary)}
.step,.rev{border-radius:6px;box-shadow:inset 0 0 0 2px var(--primary)}
.step-n{background:var(--accent);color:var(--text);box-shadow:3px 2px 0 var(--primary)}
.gal li{border-radius:6px;background:var(--accent)}
.gal img{filter:grayscale(1) contrast(1.15);mix-blend-mode:multiply;transition:filter .4s,scale .6s cubic-bezier(.2,.7,.2,1)}
.gal li:hover img{filter:none;mix-blend-mode:normal}
.facts{background:var(--accent);border:0}
.fact-list strong,.fact-list span{color:var(--text)}
.cta-band{background:var(--primary);color:var(--on-primary)}
.cta-band h2{text-shadow:.04em .03em 0 color-mix(in srgb,var(--accent) 80%,transparent)}
.foot{border-top:2px solid var(--primary);color:var(--muted)}
`;

// ---------- Memphis Pop: confetti shapes, squiggles, bold outlines ----------
const squiggle = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 24'%3E%3Cpath d='M3 12q9-12 19 0t19 0 19 0 19 0 19 0 19 0' fill='none' stroke='black' stroke-width='5' stroke-linecap='round'/%3E%3C/svg%3E\") center/100% 100% no-repeat";
const memphis = () => `
body{background:var(--bg);--r-field:14px;--field-border:2px solid var(--text)}
.top{background:var(--surface);border-bottom:3px solid var(--text)}
.mono{border-radius:50%;background:var(--primary);color:var(--on-primary);border:3px solid var(--text);box-shadow:3px 3px 0 var(--accent)}
.btn{border-radius:999px;border:3px solid var(--text);font-weight:700;box-shadow:4px 4px 0 var(--accent);transition:translate .15s,box-shadow .15s}
.btn:hover{translate:-2px -2px;box-shadow:6px 6px 0 var(--accent)}
.btn-primary{background:var(--primary);color:var(--on-primary)}
.btn-ghost,.btn-invert{background:var(--surface);color:var(--text)}
.kicker{display:inline-block;padding:.3rem .9rem;border-radius:999px;background:var(--band);color:#161616;font-weight:700;border:2px solid var(--text)}
.hero h1,.sec-head h2,.visit h2,.cta-band h2{font-weight:400;line-height:1.04}
.hero h1 .w:nth-child(3n+2){color:var(--primary)}
.art-memphis .m-disc{position:relative;z-index:1;display:grid;place-items:center;width:58%;aspect-ratio:1;border-radius:50%;background:var(--primary);color:var(--on-primary);border:4px solid var(--text);box-shadow:10px 10px 0 var(--accent)}
.art-memphis .m-disc .art-ic{width:44%;height:44%;stroke-width:2.2}
.art-memphis .m{position:absolute;animation:mwob 6s ease-in-out infinite}
.m-tri{width:22%;aspect-ratio:1;top:4%;left:6%;background:var(--accent);clip-path:polygon(50% 0,100% 100%,0 100%);rotate:-15deg}
.m-dots{width:26%;aspect-ratio:1;top:0;right:4%;background:radial-gradient(circle,var(--text) 2.5px,transparent 3px) 0 0/14px 14px;animation-delay:-1s}
.m-sq{width:42%;height:9%;bottom:4%;left:0;background:var(--text);-webkit-mask:${squiggle};mask:${squiggle};animation-delay:-2s}
.m-half{width:22%;aspect-ratio:2/1;bottom:16%;right:0;background:var(--band);border:3px solid var(--text);border-bottom:0;border-radius:999px 999px 0 0;animation-delay:-3s}
.m-zig{width:30%;height:6%;top:46%;left:-6%;background:conic-gradient(from -45deg at 50% 30%,var(--primary) 90deg,transparent 0) 0 0/16px 100%;animation-delay:-4s}
.m-ring{width:15%;aspect-ratio:1;top:30%;right:-2%;border-radius:50%;border:5px solid var(--primary);animation-delay:-5s}
@keyframes mwob{50%{transform:translateY(-8px) rotate(8deg)}}
.marquee{background:var(--band);border-block:3px solid var(--text);color:#161616;font-family:var(--display);font-size:clamp(1.2rem,1rem + 1vw,1.8rem)}
.marquee span::after{content:"▲";margin-left:3rem;color:var(--primary)}
.sec-head h2::after{content:"";display:block;width:7rem;height:14px;margin-top:.8rem;background:var(--accent);-webkit-mask:${squiggle};mask:${squiggle}}
.svc,.why-list li,.hours-card,.step,.rev,.form-card{background:var(--surface);border:3px solid var(--text);border-radius:20px}
.svc{padding:1.6rem}
.svc:nth-child(odd){box-shadow:6px 6px 0 var(--accent)}.svc:nth-child(even){box-shadow:6px 6px 0 var(--band)}
.svc-ic{padding:.5rem;border-radius:50%;background:var(--band);color:#161616;border:2px solid var(--text)}
.l-b .svc{background:none;border-width:3px 0 0;border-radius:0;box-shadow:none!important;padding-inline:0}
.why{background:radial-gradient(circle,color-mix(in srgb,var(--text) 16%,transparent) 1.5px,transparent 2px) 0 0/18px 18px,var(--bg);border-block:3px solid var(--text)}
.why-list li{padding:1.5rem}
.why-list li:nth-child(odd){rotate:-1deg}.why-list li:nth-child(even){rotate:1deg}
.hours-card{padding:1.75rem;box-shadow:8px 8px 0 var(--primary)}
.hours th,.hours td{border-bottom:2px solid color-mix(in srgb,var(--text) 20%,transparent)}
.step,.rev{box-shadow:none}
.step-n{background:var(--accent);color:#161616;border:2px solid var(--text)}
.gal li{border:3px solid var(--text);border-radius:20px}
.gal li:nth-child(2){border-radius:20px 120px 20px 20px}
.facts{background:var(--surface);border-block:3px solid var(--text)}
.fact-list strong{color:var(--primary)}
.form-card{box-shadow:10px 10px 0 var(--accent)}
.cta-band{background:var(--primary);color:var(--on-primary);border-top:3px solid var(--text)}
.foot{background:var(--text);color:var(--bg)}
`;

export const SKINS = { material, organic, skeuo, aurora, kinetic, neumorph, bento, retro, brutal, editorial, noir, glass, deco, zen, clay, fullbleed, blueprint, midcentury, riso, memphis };
