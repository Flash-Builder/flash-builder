// Motion for the top section, in plain CSS. Each style's artwork gets a few gentle loops and entrances,
// and the "animated" hero mode adds slowly drifting color behind it. The base CSS turns all of this off
// for visitors who ask their device for reduced motion. Keyframes animate `transform` only, so they stack
// on top of the `rotate` / `translate` values the skins use for positioning.

const KEYFRAMES = `
@keyframes hm-float{50%{transform:translateY(-10px)}}
@keyframes hm-float-x{50%{transform:translate(9px,-7px)}}
@keyframes hm-breathe{50%{transform:scale(1.045)}}
@keyframes hm-spin{to{transform:rotate(360deg)}}
@keyframes hm-sway{50%{transform:rotate(7deg)}}
@keyframes hm-wiggle{0%,62%,100%{transform:rotate(0)}68%{transform:rotate(-9deg)}76%{transform:rotate(8deg)}84%{transform:rotate(-5deg)}92%{transform:rotate(3deg)}}
@keyframes hm-pop{from{opacity:0;transform:translateY(18px) scale(.94)}}
@keyframes hm-slide{from{opacity:0;transform:translateX(-14px)}}
@keyframes hm-morph{0%{border-radius:62% 38% 46% 54%/48% 56% 44% 52%}50%{border-radius:44% 56% 60% 40%/58% 42% 58% 42%}100%{border-radius:54% 46% 38% 62%/42% 60% 40% 58%}}
@keyframes hm-draw{from{stroke-dashoffset:var(--len)}}
@keyframes hm-sheen{0%,40%{background-position:150% 0}100%{background-position:-150% 0}}
@keyframes hm-misreg{0%,100%{transform:translate(0,0)}33%{transform:translate(2px,-1px)}66%{transform:translate(-1px,2px)}}
`;

// Delays for items that come in one after another
const stagger = (sel, n, step = 0.12, start = 0.25) =>
  Array.from({ length: n }, (_, i) => `${sel}:nth-child(${i + 1}){animation-delay:${(start + i * step).toFixed(2)}s}`).join("");

const ART = {
  material: `.art-material .disc{animation:hm-breathe 7s ease-in-out infinite}
.art-material .chip{animation:hm-float 6s ease-in-out infinite}.art-material .c2{animation-delay:-2s}.art-material .c3{animation-delay:-4s}`,
  organic: `.art-organic .blob{animation:hm-morph 16s ease-in-out infinite alternate}
.art-organic .scribble path{--len:620;stroke-dasharray:620;animation:hm-draw 2.6s cubic-bezier(.6,.1,.3,1) .3s both}
.art-organic .sprig{transform-origin:12% 88%;animation:hm-sway 5s ease-in-out infinite}`,
  skeuo: `.art-skeuo .emblem{animation:hm-spin 90s linear infinite}`,
  aurora: `.art-aurora .g-back{animation:hm-float-x 9s ease-in-out infinite}.art-aurora .g-front{animation:hm-float 7s ease-in-out infinite}`,
  kinetic: `.art-kinetic .r2{animation-direction:reverse;animation-duration:26s}`,
  neumorph: `.art-neu .dial-in{animation:hm-breathe 5s ease-in-out infinite}
.art-neu .toggles li{animation:hm-pop .7s cubic-bezier(.2,.7,.2,1) both}${stagger(".art-neu .toggles li", 3, 0.15, 0.4)}`,
  bento: `.art-bento .bt:not(.bt-main){animation:hm-pop .7s cubic-bezier(.2,.7,.2,1) both}${stagger(".art-bento .bt", 4, 0.14, 0.15)}
.art-bento .bt-call .ic{animation:hm-wiggle 4.5s ease-in-out 1.5s infinite}`,
  retro: `.art-retro .sun{animation:hm-breathe 8s ease-in-out infinite}.art-retro .sun-ic{animation:hm-float 6s ease-in-out infinite}`,
  brutal: `.art-brutal .sticker{animation:hm-wiggle 3.5s ease-in-out 1s infinite}.art-brutal .c-front{animation:hm-float 6s ease-in-out infinite}`,
  editorial: `.art-editorial .ed-index li{animation:hm-slide .7s cubic-bezier(.2,.7,.2,1) both}${stagger(".art-editorial .ed-index li", 4, 0.12, 0.35)}`,
  noir: `.art-noir .crest::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 40%,color-mix(in srgb,var(--primary) 32%,transparent) 50%,transparent 60%) 150% 0/250% 100% no-repeat;animation:hm-sheen 7s ease-in-out 1s infinite}`,
  glass: `.art-glass .gp1{animation:hm-float 7s ease-in-out infinite}.art-glass .gp2{animation:hm-float-x 8s ease-in-out -3s infinite}`,
  deco: `.art-deco .fan line{--len:140;stroke-dasharray:140;animation:hm-draw 1.4s cubic-bezier(.6,.1,.3,1) calc(.2s + var(--i) * .07s) both}
.art-deco .deco-ic{animation:hm-float 7s ease-in-out infinite}`,
  zen: `.art-zen .enso path{--len:560;stroke-dasharray:560;animation:hm-draw 2.8s cubic-bezier(.6,.1,.3,1) .3s both}
.art-zen .zen-ic{animation:hm-breathe 6s ease-in-out infinite}`,
  clay: `.art-clay .cl-main{animation:hm-float 7s ease-in-out infinite}`,
  fullbleed: `.art-full .fb-card p{animation:hm-slide .7s cubic-bezier(.2,.7,.2,1) both}${stagger(".art-full .fb-card p", 3, 0.14, 0.6)}`,
  blueprint: `.art-blueprint .note-line{--len:120;stroke-dasharray:120;animation:hm-draw 1.2s ease 1.6s both}.art-blueprint .bp-ic{animation:hm-breathe 6s ease-in-out infinite}`,
  midcentury: `.art-mid .mid-disc{animation:hm-sway 9s ease-in-out infinite}`,
  riso: `.art-riso .riso-ic.r2{animation:hm-misreg 2.4s steps(1) infinite}.art-riso .ink-a{animation:hm-float-x 11s ease-in-out infinite}`,
  memphis: `.art-memphis .m-disc{animation:hm-breathe 6s ease-in-out infinite}`,
};

// Drifting color behind the top section when there's no photo or video
const AMBIENT = `
.hero.hero-anim{position:relative;isolation:isolate;overflow:hidden}
.hero.hero-anim::before,.hero.hero-anim::after{content:"";position:absolute;z-index:-1;pointer-events:none;border-radius:50%;filter:blur(60px)}
.hero.hero-anim::before{width:46vmax;aspect-ratio:1;left:-10vmax;top:-14vmax;background:color-mix(in srgb,var(--primary) 26%,transparent);animation:hm-orbit-a 22s ease-in-out infinite alternate}
.hero.hero-anim::after{width:38vmax;aspect-ratio:1;right:-8vmax;bottom:-16vmax;background:color-mix(in srgb,var(--accent) 24%,transparent);animation:hm-orbit-b 26s ease-in-out infinite alternate}
@keyframes hm-orbit-a{to{transform:translate(28vw,10vh) scale(1.15)}}
@keyframes hm-orbit-b{to{transform:translate(-30vw,-12vh) scale(.9)}}
`;

// Video behind the top section. It sits above the still photo (which shows while it loads, and instead
// of it for reduced motion) and below the overlay that keeps the headline readable.
const VIDEO = `
.hero-video{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover;pointer-events:none}
.hero.has-video::before{animation:none}
@media (prefers-reduced-motion:reduce){.hero-video{display:none}}
`;

export function heroMotionCss(d) {
  return KEYFRAMES + (ART[d.style] || "") + (d.heroMode === "animated" ? AMBIENT : "") + (d.heroVideo ? VIDEO : "");
}
