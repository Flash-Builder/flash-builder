// Seeded choices so each business always gets the same demo until you press Shuffle.

export function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function rng(seedStr) {
  let a = hash(seedStr);
  const next = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return { next, pick: (arr) => arr[Math.floor(next() * arr.length)], bool: () => next() < 0.5 };
}

// Palettes per style. "primary" fills buttons with white text, so each keeps 4.5:1 contrast against #fff.
export const PALETTES = {
  material: [
    { name: "Signal blue", bg: "#F4F6FA", surface: "#FFFFFF", text: "#15202B", muted: "#55606E", primary: "#1E5BD8", accent: "#FFB020", band: "#123A8C" },
    { name: "Safety orange", bg: "#F7F5F2", surface: "#FFFFFF", text: "#1D1B18", muted: "#5E5850", primary: "#C2410C", accent: "#1F2937", band: "#1F2937" },
    { name: "Pine", bg: "#F2F6F4", surface: "#FFFFFF", text: "#13201B", muted: "#4F5F58", primary: "#0F7A55", accent: "#F2C94C", band: "#0B4D37" },
    { name: "Brick", bg: "#F8F4F3", surface: "#FFFFFF", text: "#211715", muted: "#665450", primary: "#B42318", accent: "#2B3A4A", band: "#2B3A4A" },
    { name: "Teal", bg: "#F1F7F8", surface: "#FFFFFF", text: "#102226", muted: "#4C6166", primary: "#0E7490", accent: "#F59E0B", band: "#164E63" },
  ],
  organic: [
    { name: "Sage", bg: "#F3F1E9", surface: "#FBFAF5", text: "#2B3326", muted: "#5D6655", primary: "#4F6B3A", accent: "#D9A441", band: "#DCE3CF" },
    { name: "Clay", bg: "#F6EEE6", surface: "#FFF9F3", text: "#3A2A22", muted: "#6E5A4E", primary: "#9C4A2E", accent: "#E2B65B", band: "#EAD8C6" },
    { name: "Plum", bg: "#F4EEF1", surface: "#FFFAFC", text: "#33232C", muted: "#6B5562", primary: "#7A3E62", accent: "#E7A977", band: "#E8D6DF" },
    { name: "Mustard", bg: "#F7F1E1", surface: "#FFFBF0", text: "#2F2A1C", muted: "#655D48", primary: "#7A5B12", accent: "#5E8C6A", band: "#EFE2BC" },
    { name: "Seaglass", bg: "#EEF3F0", surface: "#FAFCFB", text: "#20312C", muted: "#56675F", primary: "#2F6B5E", accent: "#E8956F", band: "#D4E3DC" },
  ],
  skeuo: [
    { name: "Leather & brass", bg: "#EFE6D6", surface: "#F8F1E3", text: "#2A1E14", muted: "#5F4E3C", primary: "#6B3E1F", accent: "#C9A04B", band: "#3A2416" },
    { name: "Racing green", bg: "#ECE7DA", surface: "#F7F3E8", text: "#1C2620", muted: "#4E5A52", primary: "#1F4D36", accent: "#C8A45A", band: "#16301F" },
    { name: "Oxblood", bg: "#F1E7E0", surface: "#FAF3EC", text: "#2B1A1A", muted: "#634A47", primary: "#7A1F24", accent: "#D1A85C", band: "#2E1517" },
    { name: "Navy diner", bg: "#EEE9DF", surface: "#FBF7EE", text: "#1A2230", muted: "#4D5666", primary: "#1E3A66", accent: "#D9473B", band: "#16243F" },
  ],
  aurora: [
    { name: "Dawn", bg: "#F7F7FC", surface: "rgba(255,255,255,0.66)", text: "#16162A", muted: "#555671", primary: "#5B3FD9", accent: "#FF8A65", band: "#1C1640", glow: ["#B9A8FF", "#FFC2D1", "#9EE6FF"] },
    { name: "Lagoon", bg: "#F3F8F8", surface: "rgba(255,255,255,0.66)", text: "#10232A", muted: "#4C6168", primary: "#0F6E86", accent: "#7C5CFF", band: "#0E2A33", glow: ["#8FE3D9", "#A9C9FF", "#F4D7FF"] },
    { name: "Peach", bg: "#FBF6F3", surface: "rgba(255,255,255,0.7)", text: "#2A1A16", muted: "#6A5650", primary: "#B3402B", accent: "#5B6CFF", band: "#33140E", glow: ["#FFC3A8", "#FFE3A3", "#C9C2FF"] },
    { name: "Midnight", bg: "#0E1020", surface: "rgba(255,255,255,0.07)", text: "#EEF0FF", muted: "#AAB0D6", primary: "#6E56FF", accent: "#3DD6C6", band: "#06070F", glow: ["#5A3CFF", "#00B3A4", "#FF4F9A"], dark: true },
  ],
  kinetic: [
    { name: "Volt", bg: "#0C0C0E", surface: "#17171B", text: "#F5F5F2", muted: "#A9A9A3", primary: "#D7FF3A", primaryText: "#0C0C0E", accent: "#FF4D2E", band: "#D7FF3A", dark: true },
    { name: "Heat", bg: "#120B0A", surface: "#1E1412", text: "#FFF4EE", muted: "#C2ABA2", primary: "#FF5A1F", primaryText: "#120B0A", accent: "#FFD23F", band: "#FF5A1F", dark: true },
    { name: "Ice", bg: "#F2F4F7", surface: "#FFFFFF", text: "#0B1020", muted: "#4F5669", primary: "#2440FF", accent: "#00C2A8", band: "#0B1020" },
    { name: "Magenta", bg: "#0E0A14", surface: "#1A1324", text: "#F8F2FF", muted: "#B9AACB", primary: "#FF3FA4", primaryText: "#0E0A14", accent: "#5EE6FF", band: "#FF3FA4", dark: true },
  ],
  neumorph: [
    { name: "Cloud", bg: "#E6E9EF", surface: "#E6E9EF", text: "#1E2533", muted: "#566074", primary: "#3557D6", accent: "#11A683", light: "#FFFFFF", shade: "#C3C8D2" },
    { name: "Sand", bg: "#ECE7E1", surface: "#ECE7E1", text: "#2A241E", muted: "#665C52", primary: "#B4531E", accent: "#2F7D6D", light: "#FFFFFF", shade: "#CDC6BD" },
    { name: "Mint", bg: "#E3EDEA", surface: "#E3EDEA", text: "#17302A", muted: "#4F665F", primary: "#0E7A64", accent: "#4F5BD5", light: "#FFFFFF", shade: "#C1D0CB" },
    { name: "Graphite", bg: "#2A2E35", surface: "#2A2E35", text: "#EDF0F5", muted: "#A7AFBD", primary: "#5B8CFF", primaryText: "#0F1420", accent: "#38D6A0", light: "#363B44", shade: "#1E2126", dark: true },
  ],
  bento: [
    { name: "Paper", bg: "#F5F5F3", surface: "#FFFFFF", text: "#111318", muted: "#5A5F6E", primary: "#4338CA", accent: "#F59E0B", band: "#111318" },
    { name: "Ink", bg: "#0A0C11", surface: "#12151D", text: "#EEF0F5", muted: "#9AA3B5", primary: "#7C6CFF", accent: "#22D3EE", band: "#1A1E2A", dark: true },
    { name: "Sage", bg: "#F2F4F0", surface: "#FFFFFF", text: "#17201A", muted: "#556157", primary: "#2F6B4F", accent: "#E9A23B", band: "#17201A" },
    { name: "Coral", bg: "#FBF4F0", surface: "#FFFFFF", text: "#24150F", muted: "#6B5249", primary: "#C2410C", accent: "#6366F1", band: "#24150F" },
  ],
  retro: [
    { name: "Synthwave", bg: "#0D0221", surface: "#1A0B3A", text: "#FBE9FF", muted: "#C9AEE4", primary: "#FF2E97", primaryText: "#0D0221", accent: "#00E5FF", band: "#2A0E5C", dark: true },
    { name: "Sunset drive", bg: "#120818", surface: "#22102D", text: "#FFF1E8", muted: "#D4B4C2", primary: "#FF8A1F", primaryText: "#120818", accent: "#FF2E97", band: "#3A1240", dark: true },
    { name: "Arcade", bg: "#04070E", surface: "#0C1424", text: "#EAFBFF", muted: "#9CC2CF", primary: "#39FF88", primaryText: "#04070E", accent: "#FFD400", band: "#0B2238", dark: true },
  ],
  brutal: [
    { name: "Lemon", bg: "#FFF4C7", surface: "#FFFFFF", text: "#0E0E0E", muted: "#2E2E2E", primary: "#0E0E0E", accent: "#FF5C39", band: "#FFD23F" },
    { name: "Bubblegum", bg: "#FFE0EF", surface: "#FFFFFF", text: "#0E0E0E", muted: "#2E2E2E", primary: "#0E0E0E", accent: "#2D5BFF", band: "#FF8AC6" },
    { name: "Mint", bg: "#DDF6E8", surface: "#FFFFFF", text: "#0E0E0E", muted: "#2E2E2E", primary: "#0E0E0E", accent: "#FF6B35", band: "#7CE3B1" },
    { name: "Sky", bg: "#DCEAFF", surface: "#FFFFFF", text: "#0E0E0E", muted: "#2E2E2E", primary: "#0E0E0E", accent: "#FFB800", band: "#6EA8FF" },
  ],
  editorial: [
    { name: "Bone", bg: "#FAF9F6", surface: "#FFFFFF", text: "#141414", muted: "#5E5E5E", primary: "#141414", accent: "#B4522F", band: "#141414" },
    { name: "Harbor", bg: "#F4F5F7", surface: "#FFFFFF", text: "#0F172A", muted: "#526074", primary: "#1E3A5F", accent: "#8A6D3B", band: "#0F172A" },
    { name: "Forest", bg: "#F5F6F2", surface: "#FFFFFF", text: "#18221C", muted: "#56615A", primary: "#1F3D2B", accent: "#A47148", band: "#18221C" },
    { name: "Night", bg: "#111214", surface: "#18191C", text: "#EDEDED", muted: "#A3A3A3", primary: "#EDEDED", primaryText: "#111214", accent: "#C9A96E", band: "#000000", dark: true },
  ],
  noir: [
    { name: "Onyx & gold", bg: "#0B0B0C", surface: "#141416", text: "#F3EEE4", muted: "#A89F8E", primary: "#C9A45C", primaryText: "#0B0B0C", accent: "#E8D5A9", band: "#000000", dark: true },
    { name: "Midnight champagne", bg: "#0C1016", surface: "#141A23", text: "#F1ECE2", muted: "#A5A196", primary: "#D4B483", primaryText: "#0C1016", accent: "#8FA6C7", band: "#06080C", dark: true },
    { name: "Burgundy noir", bg: "#130A0D", surface: "#1D1015", text: "#F4EAE3", muted: "#B8A398", primary: "#C8A15A", primaryText: "#130A0D", accent: "#A33A4C", band: "#0A0507", dark: true },
    { name: "Ivory & ink", bg: "#F6F1E8", surface: "#FFFDF8", text: "#15120E", muted: "#6B6152", primary: "#15120E", accent: "#B08D57", band: "#15120E" },
  ],
  glass: [
    { name: "Frost", bg: "#E9EEF5", surface: "rgba(255,255,255,0.55)", text: "#0F172A", muted: "#475569", primary: "#2B59C3", accent: "#F472B6", band: "#0F172A", glow: ["#93C5FD", "#F9A8D4", "#A7F3D0"] },
    { name: "Dusk", bg: "#0F1226", surface: "rgba(255,255,255,0.08)", text: "#EEF0FF", muted: "#B0B5D9", primary: "#8B7CFF", primaryText: "#0F1226", accent: "#5EEAD4", band: "#070914", glow: ["#6D28D9", "#0EA5E9", "#DB2777"], dark: true },
    { name: "Blush", bg: "#F7ECEC", surface: "rgba(255,255,255,0.58)", text: "#2B1418", muted: "#6E4F55", primary: "#B4415A", accent: "#8B5CF6", band: "#2B1418", glow: ["#FBCFE8", "#FDE68A", "#C7D2FE"] },
    { name: "Mint glass", bg: "#E6F2EE", surface: "rgba(255,255,255,0.55)", text: "#0F2A24", muted: "#4B6660", primary: "#0F766E", accent: "#F59E0B", band: "#0F2A24", glow: ["#99F6E4", "#BFDBFE", "#FEF08A"] },
  ],
  deco: [
    { name: "Gatsby", bg: "#0E1B1A", surface: "#132523", text: "#F1E7D0", muted: "#BFB39A", primary: "#D4AF37", primaryText: "#0E1B1A", accent: "#2E8B7A", band: "#081211", dark: true },
    { name: "Jazz black", bg: "#0C0C0C", surface: "#161512", text: "#F3EBDA", muted: "#B4AA95", primary: "#C9A227", primaryText: "#0C0C0C", accent: "#9C2F2F", band: "#000000", dark: true },
    { name: "Ivory deco", bg: "#F4ECDD", surface: "#FBF6EC", text: "#1D1A14", muted: "#5F5647", primary: "#1F3B36", accent: "#B8902F", band: "#1F3B36" },
  ],
  zen: [
    { name: "Washi", bg: "#F5F2EC", surface: "#FBF9F5", text: "#2A2723", muted: "#6E675D", primary: "#3F4A3C", accent: "#B5532F", band: "#E9E3D8" },
    { name: "Stone", bg: "#EFEFEC", surface: "#F8F8F6", text: "#22272B", muted: "#62686D", primary: "#34404A", accent: "#8C6E4A", band: "#E2E2DD" },
    { name: "Sumi", bg: "#1A1917", surface: "#22211E", text: "#ECE7DD", muted: "#A39C90", primary: "#C9B79C", primaryText: "#1A1917", accent: "#B4604A", band: "#121110", dark: true },
  ],
  clay: [
    { name: "Candy", bg: "#FDEFF4", surface: "#FFF8FB", text: "#3A1F36", muted: "#7A5A72", primary: "#C2255C", accent: "#7C5CFF", band: "#FFD6E7" },
    { name: "Sky clay", bg: "#EAF3FF", surface: "#F7FBFF", text: "#14294A", muted: "#4F6385", primary: "#2257C9", accent: "#FF8A3D", band: "#CFE3FF" },
    { name: "Lime clay", bg: "#F0F8E6", surface: "#FAFDF5", text: "#1F3312", muted: "#566B47", primary: "#3F7D20", accent: "#F2A33A", band: "#D8EFC2" },
    { name: "Lavender", bg: "#F1ECFF", surface: "#FAF8FF", text: "#271A4F", muted: "#615787", primary: "#5B3FC4", accent: "#16A37A", band: "#E0D6FF" },
  ],
  fullbleed: [
    { name: "Charcoal", bg: "#111111", surface: "#1A1A1A", text: "#F5F5F5", muted: "#B5B5B5", primary: "#F5F5F5", primaryText: "#111111", accent: "#E4B363", band: "#000000", dark: true },
    { name: "Paper", bg: "#FAFAF7", surface: "#FFFFFF", text: "#111111", muted: "#555555", primary: "#111111", accent: "#C2410C", band: "#111111" },
    { name: "Olive", bg: "#F3F2EC", surface: "#FFFFFF", text: "#1E2416", muted: "#5A6150", primary: "#3D4A2A", accent: "#C9A14A", band: "#1E2416" },
  ],
  blueprint: [
    { name: "Cyanotype", bg: "#0F3A6B", surface: "#134678", text: "#EAF2FF", muted: "#B3CAE8", primary: "#FFFFFF", primaryText: "#0F3A6B", accent: "#FFD23F", band: "#0A2A50", dark: true },
    { name: "Drafting white", bg: "#F4F7FB", surface: "#FFFFFF", text: "#0E2547", muted: "#4A5D7A", primary: "#1D4ED8", accent: "#EA580C", band: "#0E2547" },
    { name: "Night drafting", bg: "#10151C", surface: "#161D26", text: "#E6EDF5", muted: "#9AA8B8", primary: "#4FC3F7", primaryText: "#10151C", accent: "#FFB020", band: "#0A0E13", dark: true },
    { name: "Redline", bg: "#0B3157", surface: "#0F3B68", text: "#EEF4FB", muted: "#B0C4DC", primary: "#FF6B6B", primaryText: "#0B3157", accent: "#FFFFFF", band: "#06213D", dark: true },
  ],
  midcentury: [
    { name: "Atomic teal", bg: "#F4ECDC", surface: "#FBF6EC", text: "#2A2420", muted: "#6A5E52", primary: "#1F6F6B", accent: "#E5A632", band: "#1F3B3A" },
    { name: "Boomerang orange", bg: "#F6EBDD", surface: "#FFF8EE", text: "#2B201A", muted: "#6B5A4C", primary: "#B5461A", accent: "#2E8C86", band: "#3A2A22" },
    { name: "Olive lounge", bg: "#EFEBDA", surface: "#FAF7EA", text: "#26261C", muted: "#5F5F4C", primary: "#5A6B26", accent: "#D9822B", band: "#2F3322" },
    { name: "Diner night", bg: "#1F2A2E", surface: "#26343A", text: "#F6EEDC", muted: "#C2B9A6", primary: "#E8A33A", primaryText: "#1F2A2E", accent: "#E5573A", band: "#141C1F", dark: true },
  ],
  riso: [
    { name: "Blue & fluoro pink", bg: "#F5F1E8", surface: "#FFFDF7", text: "#1C2340", muted: "#4D5470", primary: "#0068A8", accent: "#FF48B0", band: "#0068A8" },
    { name: "Teal & sunflower", bg: "#F6F0E0", surface: "#FFFBF0", text: "#1E2A2A", muted: "#556060", primary: "#00757C", accent: "#FFE14D", band: "#00757C" },
    { name: "Red & green", bg: "#F4EFE6", surface: "#FFFCF5", text: "#222222", muted: "#555555", primary: "#C42B3A", accent: "#3DBE7B", band: "#C42B3A" },
    { name: "Violet & orange", bg: "#F3EFF5", surface: "#FFFDFE", text: "#231A33", muted: "#5B5168", primary: "#6A4C9C", accent: "#FF8A3D", band: "#6A4C9C" },
  ],
  memphis: [
    { name: "Classic pop", bg: "#FFFDF7", surface: "#FFFFFF", text: "#161616", muted: "#4A4A4A", primary: "#2D3FE0", accent: "#FF5FA2", band: "#FFD23F" },
    { name: "Mint pop", bg: "#EAFBF5", surface: "#FFFFFF", text: "#161616", muted: "#474747", primary: "#6C2BD9", accent: "#FF7A45", band: "#FFE45C" },
    { name: "Peach pop", bg: "#FFF1EA", surface: "#FFFFFF", text: "#161616", muted: "#4A4A4A", primary: "#0F6FA8", accent: "#FFB000", band: "#7AD3C2" },
    { name: "Night pop", bg: "#161427", surface: "#221F3A", text: "#FFF7ED", muted: "#C9C2E0", primary: "#FFD23F", primaryText: "#161427", accent: "#FF5FA2", band: "#00C2A8", dark: true },
  ],
};

const g = (family, weights) => `family=${family.replace(/ /g, "+")}:wght@${weights}`;
export const FONTS = {
  material: [
    { display: "Manrope", body: "Manrope", q: [g("Manrope", "400;600;800")] },
    { display: "Rubik", body: "Rubik", q: [g("Rubik", "400;500;700")] },
    { display: "Archivo", body: "Inter", q: [g("Archivo", "700;800"), g("Inter", "400;600")] },
  ],
  organic: [
    { display: "Fraunces", body: "Nunito", q: [g("Fraunces", "500;700"), g("Nunito", "400;600;700")] },
    { display: "Gloock", body: "Karla", q: [g("Gloock", "400"), g("Karla", "400;600;700")] },
    { display: "Young Serif", body: "Figtree", q: [g("Young Serif", "400"), g("Figtree", "400;600")] },
  ],
  skeuo: [
    { display: "Rye", body: "Lora", q: [g("Rye", "400"), g("Lora", "400;600")] },
    { display: "Playfair Display", body: "Source Serif 4", q: [g("Playfair Display", "700;900"), g("Source Serif 4", "400;600")] },
    { display: "Alfa Slab One", body: "Libre Franklin", q: [g("Alfa Slab One", "400"), g("Libre Franklin", "400;600")] },
  ],
  aurora: [
    { display: "Sora", body: "Inter", q: [g("Sora", "500;700"), g("Inter", "400;500")] },
    { display: "Outfit", body: "Outfit", q: [g("Outfit", "400;500;700")] },
    { display: "Plus Jakarta Sans", body: "Plus Jakarta Sans", q: [g("Plus Jakarta Sans", "400;500;800")] },
  ],
  kinetic: [
    { display: "Anton", body: "Inter Tight", q: [g("Anton", "400"), g("Inter Tight", "400;600")] },
    { display: "Bebas Neue", body: "Barlow", q: [g("Bebas Neue", "400"), g("Barlow", "400;600")] },
    { display: "Archivo Black", body: "Archivo", q: [g("Archivo Black", "400"), g("Archivo", "400;600")] },
  ],
  neumorph: [
    { display: "Poppins", body: "Poppins", q: [g("Poppins", "400;500;700")] },
    { display: "DM Sans", body: "DM Sans", q: [g("DM Sans", "400;500;700")] },
    { display: "Nunito Sans", body: "Nunito Sans", q: [g("Nunito Sans", "400;600;800")] },
  ],
  bento: [
    { display: "Geist", body: "Geist", q: [g("Geist", "400;500;700")] },
    { display: "Onest", body: "Onest", q: [g("Onest", "400;500;700")] },
    { display: "Bricolage Grotesque", body: "Inter", q: [g("Bricolage Grotesque", "600;800"), g("Inter", "400;500")] },
  ],
  retro: [
    { display: "Orbitron", body: "Exo 2", q: [g("Orbitron", "700;900"), g("Exo 2", "400;600")] },
    { display: "Audiowide", body: "Rajdhani", q: [g("Audiowide", "400"), g("Rajdhani", "500;600;700")] },
    { display: "Tilt Neon", body: "Chakra Petch", q: [g("Tilt Neon", "400"), g("Chakra Petch", "400;600")] },
  ],
  brutal: [
    { display: "Archivo Black", body: "Space Grotesk", q: [g("Archivo Black", "400"), g("Space Grotesk", "400;500;700")] },
    { display: "Rubik Mono One", body: "Rubik", q: [g("Rubik Mono One", "400"), g("Rubik", "400;500;700")] },
    { display: "Bricolage Grotesque", body: "Bricolage Grotesque", q: [g("Bricolage Grotesque", "400;600;800")] },
  ],
  editorial: [
    { display: "Instrument Serif", body: "Instrument Sans", q: [g("Instrument Serif", "400"), g("Instrument Sans", "400;500;600")] },
    { display: "Newsreader", body: "Inter Tight", q: [g("Newsreader", "400;500"), g("Inter Tight", "400;500;600")] },
    { display: "Cormorant Garamond", body: "Work Sans", q: [g("Cormorant Garamond", "500;600"), g("Work Sans", "400;500")] },
  ],
  noir: [
    { display: "Bodoni Moda", body: "Jost", q: [g("Bodoni Moda", "400;600"), g("Jost", "300;400;500")] },
    { display: "Cormorant Garamond", body: "Manrope", q: [g("Cormorant Garamond", "500;600"), g("Manrope", "400;500")] },
    { display: "Italiana", body: "Josefin Sans", q: [g("Italiana", "400"), g("Josefin Sans", "300;400;600")] },
  ],
  glass: [
    { display: "Urbanist", body: "Urbanist", q: [g("Urbanist", "400;500;700;800")] },
    { display: "Lexend", body: "Lexend", q: [g("Lexend", "300;400;600")] },
    { display: "Albert Sans", body: "Albert Sans", q: [g("Albert Sans", "400;500;800")] },
  ],
  deco: [
    { display: "Limelight", body: "Josefin Sans", q: [g("Limelight", "400"), g("Josefin Sans", "300;400;600")] },
    { display: "Poiret One", body: "Raleway", q: [g("Poiret One", "400"), g("Raleway", "400;500;600")] },
    { display: "Federo", body: "Raleway", q: [g("Federo", "400"), g("Raleway", "400;500;600")] },
  ],
  zen: [
    { display: "Shippori Mincho", body: "Zen Kaku Gothic New", q: [g("Shippori Mincho", "500;600"), g("Zen Kaku Gothic New", "400;500")] },
    { display: "Zen Old Mincho", body: "Noto Sans", q: [g("Zen Old Mincho", "400;600"), g("Noto Sans", "400;500")] },
    { display: "Cormorant Garamond", body: "Karla", q: [g("Cormorant Garamond", "500;600"), g("Karla", "400;500")] },
  ],
  clay: [
    { display: "Baloo 2", body: "Baloo 2", q: [g("Baloo 2", "400;600;800")] },
    { display: "Fredoka", body: "Nunito", q: [g("Fredoka", "500;600;700"), g("Nunito", "400;600")] },
    { display: "Nunito", body: "Nunito", q: [g("Nunito", "400;600;900")] },
  ],
  fullbleed: [
    { display: "Big Shoulders Display", body: "Inter", q: [g("Big Shoulders Display", "700;900"), g("Inter", "400;500")] },
    { display: "DM Serif Display", body: "DM Sans", q: [g("DM Serif Display", "400"), g("DM Sans", "400;500")] },
    { display: "Oswald", body: "Source Sans 3", q: [g("Oswald", "500;700"), g("Source Sans 3", "400;600")] },
  ],
  // Blueprint: "display" is the monospace used for labels; headings use the body face
  blueprint: [
    { display: "IBM Plex Mono", body: "IBM Plex Sans", q: [g("IBM Plex Mono", "400;600"), g("IBM Plex Sans", "400;600;700")] },
    { display: "Space Mono", body: "Space Grotesk", q: [g("Space Mono", "400;700"), g("Space Grotesk", "400;500;700")] },
    { display: "JetBrains Mono", body: "Inter", q: [g("JetBrains Mono", "400;600"), g("Inter", "400;600;700")] },
  ],
  midcentury: [
    { display: "Shrikhand", body: "Nunito Sans", q: [g("Shrikhand", "400"), g("Nunito Sans", "400;600;700")] },
    { display: "Righteous", body: "Mulish", q: [g("Righteous", "400"), g("Mulish", "400;600;700")] },
    { display: "League Spartan", body: "Lora", q: [g("League Spartan", "600;800"), g("Lora", "400;600")] },
  ],
  riso: [
    { display: "Syne", body: "Inter", q: [g("Syne", "700;800"), g("Inter", "400;600")] },
    { display: "Dela Gothic One", body: "Work Sans", q: [g("Dela Gothic One", "400"), g("Work Sans", "400;500;700")] },
    { display: "Rammetto One", body: "Karla", q: [g("Rammetto One", "400"), g("Karla", "400;600;700")] },
  ],
  memphis: [
    { display: "Bungee", body: "Rubik", q: [g("Bungee", "400"), g("Rubik", "400;500;700")] },
    { display: "Chango", body: "Nunito", q: [g("Chango", "400"), g("Nunito", "400;600;800")] },
    { display: "Lilita One", body: "Poppins", q: [g("Lilita One", "400"), g("Poppins", "400;500;600")] },
  ],
};

export const fontHref = (f) => `https://fonts.googleapis.com/css2?${f.q.join("&")}&display=swap`;

// ---------- color helpers (for brand colors pulled from an old site) ----------
export function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const toHex = (r, g, b) => `#${[r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
function luminance([r, g, b]) {
  const c = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
export const contrast = (a, b) => {
  const [l1, l2] = [luminance(hexToRgb(a)), luminance(hexToRgb(b))].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
// Darken a color until white text on it is readable
export function readableOnWhite(hex) {
  let [r, g, b] = hexToRgb(hex);
  let out = toHex(r, g, b);
  for (let i = 0; i < 30 && contrast(out, "#FFFFFF") < 4.6; i++) {
    r *= 0.9; g *= 0.9; b *= 0.9;
    out = toHex(r, g, b);
  }
  return out;
}
export function saturationLightness(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
  return { s, l };
}

export function choose(style, seedStr) {
  const r = rng(seedStr);
  return {
    palette: r.pick(PALETTES[style]),
    font: r.pick(FONTS[style]),
    layout: r.pick(["a", "b", "c"]),
    headline: Math.floor(r.next() * 3),
    whyFirst: r.bool(),
    r,
  };
}
