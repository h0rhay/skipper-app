import type { FC } from 'react'

const P = { stroke: "var(--color-primary)", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" } as const
const D = { ...P, strokeWidth: 1.5 } as const

// 11-tides-fc-0: Rule of twelfths — uneven bars showing 1/2/3/3/2/1 twelfths per hour
export const Ill_11_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Baseline (chart datum) */}
    <line x1="10" y1="68" x2="110" y2="68" {...D} />
    {/* High water line */}
    <line x1="10" y1="12" x2="110" y2="12" {...D} strokeDasharray="4 3" />
    {/* Hour bars — heights proportional to 1/12, 2/12, 3/12, 3/12, 2/12, 1/12 of total range 56px */}
    {/* Bar 1: 1/12 ≈ 4.7 → ~5px */}
    <rect x="14" y="63" width="12" height="5" {...P} />
    {/* Bar 2: 2/12 ≈ 9.3 → ~9px */}
    <rect x="30" y="59" width="12" height="9" {...P} />
    {/* Bar 3: 3/12 ≈ 14 → 14px */}
    <rect x="46" y="54" width="12" height="14" {...P} />
    {/* Bar 4: 3/12 ≈ 14 → 14px */}
    <rect x="62" y="54" width="12" height="14" {...P} />
    {/* Bar 5: 2/12 ≈ 9 → 9px */}
    <rect x="78" y="59" width="12" height="9" {...P} />
    {/* Bar 6: 1/12 ≈ 5 → 5px */}
    <rect x="94" y="63" width="12" height="5" {...P} />
    {/* Tide curve overlay */}
    <path d="M10 68 C30 68 35 12 60 12 C85 12 90 68 110 68" {...D} strokeDasharray="3 2" />
  </svg>
)

// 11-tides-fc-1: Depth calculation — charted depth + height of tide = total depth
export const Ill_11_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Sea surface */}
    <path d="M5 22 Q20 18 35 22 Q50 26 65 22 Q80 18 95 22 Q108 26 115 22" {...P} />
    {/* Seabed */}
    <path d="M5 72 Q30 68 60 70 Q90 72 115 68" {...P} />
    {/* Chart datum line */}
    <line x1="5" y1="58" x2="115" y2="58" {...D} strokeDasharray="5 3" />
    {/* Height of tide arrow (datum to surface) */}
    <line x1="38" y1="58" x2="38" y2="23" {...D} />
    <polyline points="35,28 38,22 41,28" {...D} />
    {/* Charted depth arrow (datum to seabed) */}
    <line x1="38" y1="58" x2="38" y2="69" {...D} />
    <polyline points="35,64 38,70 41,64" {...D} />
    {/* Total depth arrow (surface to seabed) */}
    <line x1="82" y1="23" x2="82" y2="69" {...P} />
    <polyline points="79,28 82,22 85,28" {...P} />
    <polyline points="79,64 82,70 85,64" {...P} />
    {/* Plus sign between arrows */}
    <line x1="56" y1="44" x2="64" y2="44" {...D} />
    <line x1="60" y1="40" x2="60" y2="48" {...D} />
    {/* Equals sign */}
    <line x1="70" y1="41" x2="76" y2="41" {...D} />
    <line x1="70" y1="47" x2="76" y2="47" {...D} />
  </svg>
)

// 11-tides-fc-2: Standard port vs secondary port
export const Ill_11_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Water/sea background line */}
    <path d="M5 50 Q20 46 35 50 Q50 54 65 50 Q80 46 95 50 Q110 54 115 50" {...D} />
    {/* Standard Port — larger harbour (left) */}
    <rect x="8" y="28" width="28" height="22" {...P} />
    {/* Harbour entrance gap */}
    <line x1="8" y1="50" x2="8" y2="44" {...P} />
    <line x1="36" y1="50" x2="36" y2="44" {...P} />
    {/* Pier arms */}
    <line x1="8" y1="44" x2="14" y2="44" {...P} />
    <line x1="36" y1="44" x2="30" y2="44" {...P} />
    {/* Tidal table symbol — rows inside */}
    <line x1="12" y1="33" x2="32" y2="33" {...D} />
    <line x1="12" y1="38" x2="32" y2="38" {...D} />
    <line x1="12" y1="43" x2="32" y2="43" {...D} />
    {/* Secondary Port — smaller harbour (right) */}
    <rect x="82" y="34" width="18" height="16" {...P} />
    <line x1="82" y1="50" x2="82" y2="46" {...P} />
    <line x1="100" y1="50" x2="100" y2="46" {...P} />
    <line x1="82" y1="46" x2="86" y2="46" {...P} />
    <line x1="100" y1="46" x2="96" y2="46" {...P} />
    {/* Arrow from secondary to standard (reference relationship) */}
    <line x1="72" y1="42" x2="44" y2="42" {...D} strokeDasharray="4 2" />
    <polyline points="48,39 44,42 48,45" {...D} />
    {/* Difference symbol on secondary side */}
    <line x1="108" y1="38" x2="116" y2="38" {...D} />
    <line x1="112" y1="34" x2="112" y2="42" {...D} />
  </svg>
)

// 11-tides-fc-3: Springs vs neaps — moon-earth alignment
export const Ill_11_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Earth in centre */}
    <circle cx="60" cy="40" r="8" {...P} />
    {/* Springs alignment: Sun left, Moon right, all in line */}
    {/* Sun (left) */}
    <circle cx="14" cy="40" r="7" {...D} />
    <line x1="4" y1="40" x2="7" y2="40" {...D} />
    <line x1="21" y1="40" x2="24" y2="40" {...D} />
    <line x1="14" y1="30" x2="14" y2="33" {...D} />
    <line x1="14" y1="47" x2="14" y2="50" {...D} />
    {/* Full moon (right of earth) — springs */}
    <circle cx="104" cy="40" r="6" {...P} />
    {/* Alignment line */}
    <line x1="22" y1="40" x2="52" y2="40" {...D} strokeDasharray="3 2" />
    <line x1="68" y1="40" x2="98" y2="40" {...D} strokeDasharray="3 2" />
    {/* Large spring tide wave below */}
    <path d="M22 65 Q32 55 42 65 Q52 75 62 65 Q72 55 82 65" {...P} />
    {/* Neap moon above earth — quarter moon, at 90° */}
    <path d="M60 14 A6 6 0 0 1 60 26 A4 4 0 0 0 60 14" {...D} />
    {/* Small neap wave dot indicator */}
    <path d="M90 62 Q95 58 100 62 Q105 66 110 62" {...D} />
  </svg>
)

// 11-tides-fc-4: Tidal diamond — chart position with diamond and table
export const Ill_11_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Chart background — depth contour */}
    <path d="M5 55 Q30 50 60 52 Q90 54 115 50" {...D} strokeDasharray="4 2" />
    {/* Tidal diamond shape — prominent */}
    <path d="M30 20 L38 32 L30 44 L22 32 Z" {...P} />
    {/* Letter inside diamond area — represented by cross (no text) */}
    <line x1="27" y1="32" x2="33" y2="32" {...D} />
    <line x1="30" y1="29" x2="30" y2="35" {...D} />
    {/* Table lines (right side) */}
    <rect x="58" y="14" width="56" height="44" {...D} />
    {/* Table header divider */}
    <line x1="58" y1="22" x2="114" y2="22" {...D} />
    {/* Table column dividers */}
    <line x1="76" y1="14" x2="76" y2="58" {...D} />
    <line x1="95" y1="14" x2="95" y2="58" {...D} />
    {/* Table row dividers */}
    <line x1="58" y1="30" x2="114" y2="30" {...D} />
    <line x1="58" y1="38" x2="114" y2="38" {...D} />
    <line x1="58" y1="46" x2="114" y2="46" {...D} />
    {/* Connecting line from diamond to table */}
    <line x1="38" y1="32" x2="56" y2="32" {...D} strokeDasharray="3 2" />
  </svg>
)

// 11-tides-fc-5: Light elevation datum (MHWS) vs soundings datum (chart datum / MLWS)
export const Ill_11_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Seabed */}
    <path d="M5 74 Q30 70 60 72 Q90 74 115 70" {...P} />
    {/* Chart datum line (MLWS) */}
    <line x1="5" y1="62" x2="115" y2="62" {...D} strokeDasharray="6 3" />
    {/* MHWS line */}
    <line x1="5" y1="28" x2="115" y2="28" {...D} strokeDasharray="3 2" />
    {/* Mean water (approximate) */}
    <path d="M5 44 Q25 40 45 44 Q65 48 85 44 Q100 40 115 44" {...D} />
    {/* Lighthouse tower */}
    <line x1="88" y1="62" x2="88" y2="14" {...P} />
    <line x1="84" y1="14" x2="92" y2="14" {...P} />
    <line x1="84" y1="62" x2="92" y2="62" {...P} />
    {/* Light at top */}
    <circle cx="88" cy="11" r="3" {...P} />
    {/* Light elevation arrow — MHWS to light */}
    <line x1="98" y1="28" x2="98" y2="12" {...D} />
    <polyline points="95,16 98,11 101,16" {...D} />
    <line x1="95" y1="28" x2="101" y2="28" {...D} />
    {/* Sounding arrow — datum to seabed */}
    <line x1="30" y1="62" x2="30" y2="72" {...D} />
    <polyline points="27,68 30,73 33,68" {...D} />
    <line x1="27" y1="62" x2="33" y2="62" {...D} />
  </svg>
)

// 12-visual-aids-buoyage-fc-0: Port-hand lateral mark — red can buoy (IALA Region A)
export const Ill_12_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Water */}
    <path d="M5 62 Q25 58 45 62 Q65 66 85 62 Q105 58 115 62" {...D} />
    {/* Can buoy body — flat-topped cylinder */}
    <rect x="45" y="32" width="30" height="28" rx="2" {...P} />
    {/* Flat top emphasised */}
    <line x1="45" y1="32" x2="75" y2="32" {...P} />
    {/* Mooring chain */}
    <line x1="60" y1="60" x2="60" y2="68" {...D} strokeDasharray="2 2" />
    {/* Flash rhythm — Fl.R dots above buoy */}
    <circle cx="50" cy="20" r="3" {...P} />
    <circle cx="62" cy="16" r="2" {...D} />
    <circle cx="72" cy="20" r="2" {...D} />
    {/* Channel arrows showing port side */}
    <line x1="8" y1="40" x2="36" y2="40" {...D} />
    <polyline points="32,37 36,40 32,43" {...D} />
    <line x1="84" y1="40" x2="112" y2="40" {...D} />
    <polyline points="108,37 112,40 108,43" {...D} />
  </svg>
)

// 12-visual-aids-buoyage-fc-1: Starboard-hand lateral mark — green conical buoy (IALA Region A)
export const Ill_12_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Water */}
    <path d="M5 62 Q25 58 45 62 Q65 66 85 62 Q105 58 115 62" {...D} />
    {/* Conical buoy body — triangle/cone shape pointing up */}
    <path d="M60 24 L80 58 L40 58 Z" {...P} />
    {/* Mooring chain */}
    <line x1="60" y1="58" x2="60" y2="68" {...D} strokeDasharray="2 2" />
    {/* Flash rhythm — Fl.G dots above buoy */}
    <circle cx="50" cy="14" r="2.5" {...P} />
    <circle cx="62" cy="10" r="2" {...D} />
    <circle cx="72" cy="14" r="2" {...D} />
    {/* Channel arrows showing starboard side */}
    <line x1="8" y1="44" x2="32" y2="44" {...D} />
    <polyline points="28,41 32,44 28,47" {...D} />
    <line x1="88" y1="44" x2="112" y2="44" {...D} />
    <polyline points="108,41 112,44 108,47" {...D} />
  </svg>
)

// 12-visual-aids-buoyage-fc-2: Preferred channel (junction) mark — composite Fl(2+1)
export const Ill_12_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Water */}
    <path d="M5 66 Q30 62 60 64 Q90 66 115 62" {...D} />
    {/* Can buoy body (preferred channel to port = red can shape) */}
    <rect x="42" y="28" width="36" height="34" rx="2" {...P} />
    {/* Horizontal band across middle — composite mark */}
    <line x1="42" y1="45" x2="78" y2="45" {...P} />
    {/* Mooring chain */}
    <line x1="60" y1="62" x2="60" y2="70" {...D} strokeDasharray="2 2" />
    {/* Fl(2+1) light pattern: two close flashes then one */}
    <circle cx="46" cy="18" r="2.5" {...P} />
    <circle cx="55" cy="14" r="2.5" {...P} />
    {/* gap */}
    <circle cx="72" cy="14" r="3" {...D} />
    {/* Larger than others to suggest 2+1 rhythm */}
    <line x1="62" y1="16" x2="66" y2="16" {...D} />
  </svg>
)

// 12-visual-aids-buoyage-fc-3: North cardinal mark — black/yellow, cones pointing UP
export const Ill_12_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Water */}
    <path d="M5 66 Q30 62 60 64 Q90 66 115 62" {...D} />
    {/* Pillar buoy body */}
    <rect x="50" y="40" width="20" height="24" rx="3" {...P} />
    {/* Upper half (black) — filled look with cross-hatch suggestion */}
    <rect x="50" y="40" width="20" height="12" rx="2" {...P} />
    <line x1="50" y1="46" x2="70" y2="46" {...D} />
    {/* Mooring chain */}
    <line x1="60" y1="64" x2="60" y2="72" {...D} strokeDasharray="2 2" />
    {/* Double topmark cones pointing UP */}
    {/* Lower cone */}
    <path d="M60 30 L68 40 L52 40 Z" {...P} />
    {/* Upper cone */}
    <path d="M60 18 L68 30 L52 30 Z" {...P} />
    {/* North arrow indicator */}
    <line x1="100" y1="30" x2="100" y2="14" {...D} />
    <polyline points="96,18 100,13 104,18" {...D} />
    {/* VQ flash dots — continuous quick */}
    <circle cx="16" cy="20" r="2" {...D} />
    <circle cx="24" cy="20" r="2" {...D} />
    <circle cx="32" cy="20" r="2" {...D} />
    <circle cx="40" cy="20" r="2" {...D} />
  </svg>
)

// 12-visual-aids-buoyage-fc-4: South cardinal mark — yellow/black, cones pointing DOWN
export const Ill_12_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Water */}
    <path d="M5 66 Q30 62 60 64 Q90 66 115 62" {...D} />
    {/* Pillar buoy body */}
    <rect x="50" y="40" width="20" height="24" rx="3" {...P} />
    {/* Top half yellow (lighter) — band division */}
    <line x1="50" y1="52" x2="70" y2="52" {...D} />
    {/* Mooring chain */}
    <line x1="60" y1="64" x2="60" y2="72" {...D} strokeDasharray="2 2" />
    {/* Double topmark cones pointing DOWN */}
    {/* Upper cone (inverted) */}
    <path d="M52 22 L68 22 L60 32 Z" {...P} />
    {/* Lower cone (inverted) */}
    <path d="M52 32 L68 32 L60 42 Z" {...P} />
    {/* South arrow indicator */}
    <line x1="100" y1="14" x2="100" y2="30" {...D} />
    <polyline points="96,26 100,31 104,26" {...D} />
    {/* Q(6)+LFl light pattern — 6 dots then long dash */}
    <circle cx="8" cy="20" r="1.5" {...D} />
    <circle cx="14" cy="20" r="1.5" {...D} />
    <circle cx="20" cy="20" r="1.5" {...D} />
    <circle cx="26" cy="20" r="1.5" {...D} />
    <circle cx="32" cy="20" r="1.5" {...D} />
    <circle cx="38" cy="20" r="1.5" {...D} />
    <line x1="44" y1="20" x2="52" y2="20" {...P} />
  </svg>
)

// 12-visual-aids-buoyage-fc-5: Isolated danger mark — black/red, two spheres topmark, Fl(2)
export const Ill_12_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Water */}
    <path d="M5 66 Q30 62 60 64 Q90 66 115 62" {...D} />
    {/* Pillar buoy body */}
    <rect x="50" y="38" width="20" height="26" rx="3" {...P} />
    {/* Black/red bands — three band dividers */}
    <line x1="50" y1="46" x2="70" y2="46" {...D} />
    <line x1="50" y1="54" x2="70" y2="54" {...D} />
    {/* Mooring chain */}
    <line x1="60" y1="64" x2="60" y2="72" {...D} strokeDasharray="2 2" />
    {/* Two sphere topmarks — clearly two balls */}
    <circle cx="60" cy="28" r="5" {...P} />
    <circle cx="60" cy="16" r="5" {...P} />
    {/* Staff connecting spheres to buoy */}
    <line x1="60" y1="38" x2="60" y2="33" {...D} />
    <line x1="60" y1="23" x2="60" y2="11" {...D} />
    {/* Fl(2) light — two dots */}
    <circle cx="98" cy="22" r="3" {...P} />
    <circle cx="110" cy="22" r="3" {...P} />
  </svg>
)

// 12-visual-aids-buoyage-fc-6: Safe water mark — red/white stripes, sphere topmark, Mo(A)/LFl
export const Ill_12_fc_6: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Water */}
    <path d="M5 66 Q30 62 60 64 Q90 66 115 62" {...D} />
    {/* Spherical buoy body */}
    <circle cx="60" cy="50" r="16" {...P} />
    {/* Vertical stripes on sphere — 4 vertical lines */}
    <line x1="52" y1="34" x2="52" y2="66" {...D} />
    <line x1="60" y1="34" x2="60" y2="66" {...D} />
    <line x1="68" y1="34" x2="68" y2="66" {...D} />
    {/* Clip stripes to sphere using arc paths instead */}
    {/* Mooring chain */}
    <line x1="60" y1="66" x2="60" y2="74" {...D} strokeDasharray="2 2" />
    {/* Red sphere topmark */}
    <circle cx="60" cy="26" r="5" {...P} />
    {/* Staff */}
    <line x1="60" y1="34" x2="60" y2="31" {...D} />
    {/* Mo(A) light — dot then dash (Morse A) */}
    <circle cx="96" cy="20" r="2.5" {...P} />
    <line x1="104" y1="20" x2="114" y2="20" {...P} />
  </svg>
)

// 12-visual-aids-buoyage-fc-7: Special mark — yellow body, X topmark, Fl.Y
export const Ill_12_fc_7: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Water */}
    <path d="M5 66 Q30 62 60 64 Q90 66 115 62" {...D} />
    {/* Buoy body — pillar/spar shape */}
    <rect x="52" y="36" width="16" height="28" rx="4" {...P} />
    {/* Mooring chain */}
    <line x1="60" y1="64" x2="60" y2="72" {...D} strokeDasharray="2 2" />
    {/* X topmark — distinctive cross */}
    <line x1="53" y1="26" x2="67" y2="20" {...P} />
    <line x1="53" y1="20" x2="67" y2="26" {...P} />
    {/* Staff to topmark */}
    <line x1="60" y1="36" x2="60" y2="30" {...D} />
    {/* Fl.Y — single flash yellow (shown as star burst) */}
    <circle cx="100" cy="22" r="4" {...P} />
    <line x1="100" y1="14" x2="100" y2="17" {...D} />
    <line x1="100" y1="27" x2="100" y2="30" {...D} />
    <line x1="92" y1="22" x2="95" y2="22" {...D} />
    <line x1="105" y1="22" x2="108" y2="22" {...D} />
    <line x1="94" y1="16" x2="96" y2="18" {...D} />
    <line x1="104" y1="26" x2="106" y2="28" {...D} />
  </svg>
)

// 12-visual-aids-buoyage-fc-8: Emergency wreck marking buoy — alternating blue/yellow, cross topmark
export const Ill_12_fc_8: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Water */}
    <path d="M5 66 Q30 62 60 64 Q90 66 115 62" {...D} />
    {/* Pillar buoy body */}
    <rect x="48" y="32" width="24" height="32" rx="3" {...P} />
    {/* Alternating vertical stripe bands — bold divisions */}
    <line x1="54" y1="32" x2="54" y2="64" {...P} />
    <line x1="60" y1="32" x2="60" y2="64" {...P} />
    <line x1="66" y1="32" x2="66" y2="64" {...P} />
    {/* Horizontal band marks to indicate alternating pattern */}
    <line x1="48" y1="40" x2="72" y2="40" {...D} />
    <line x1="48" y1="48" x2="72" y2="48" {...D} />
    <line x1="48" y1="56" x2="72" y2="56" {...D} />
    {/* Mooring chain */}
    <line x1="60" y1="64" x2="60" y2="72" {...D} strokeDasharray="2 2" />
    {/* Upright yellow cross topmark */}
    <line x1="60" y1="14" x2="60" y2="30" {...P} />
    <line x1="52" y1="22" x2="68" y2="22" {...P} />
  </svg>
)

// 12-visual-aids-buoyage-fc-9: Leading lights — two lights aligned, vessel on safe track
export const Ill_12_fc_9: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Sea surface */}
    <path d="M5 58 Q30 54 55 58 Q80 62 105 58" {...D} />
    {/* Shore line */}
    <line x1="80" y1="58" x2="115" y2="58" {...P} />
    {/* Front (lower) light tower */}
    <line x1="92" y1="58" x2="92" y2="38" {...P} />
    <line x1="88" y1="38" x2="96" y2="38" {...P} />
    <circle cx="92" cy="35" r="3" {...P} />
    {/* Rear (higher) light tower */}
    <line x1="105" y1="58" x2="105" y2="20" {...P} />
    <line x1="101" y1="20" x2="109" y2="20" {...P} />
    <circle cx="105" cy="17" r="3" {...P} />
    {/* Leading line from both lights — converging to vessel */}
    <line x1="92" y1="35" x2="25" y2="52" {...D} strokeDasharray="4 2" />
    <line x1="105" y1="17" x2="25" y2="52" {...D} strokeDasharray="4 2" />
    {/* Vessel on leading line */}
    <path d="M15 52 Q22 48 30 50 L28 56 L12 56 Z" {...P} />
    {/* Alignment indicator — vertical dashes showing lights in line */}
    <line x1="92" y1="35" x2="92" y2="17" {...D} strokeDasharray="2 2" />
  </svg>
)

export const registryEntries: Record<string, FC> = {
  '11-tides-fc-0': Ill_11_fc_0,
  '11-tides-fc-1': Ill_11_fc_1,
  '11-tides-fc-2': Ill_11_fc_2,
  '11-tides-fc-3': Ill_11_fc_3,
  '11-tides-fc-4': Ill_11_fc_4,
  '11-tides-fc-5': Ill_11_fc_5,
  '12-visual-aids-buoyage-fc-0': Ill_12_fc_0,
  '12-visual-aids-buoyage-fc-1': Ill_12_fc_1,
  '12-visual-aids-buoyage-fc-2': Ill_12_fc_2,
  '12-visual-aids-buoyage-fc-3': Ill_12_fc_3,
  '12-visual-aids-buoyage-fc-4': Ill_12_fc_4,
  '12-visual-aids-buoyage-fc-5': Ill_12_fc_5,
  '12-visual-aids-buoyage-fc-6': Ill_12_fc_6,
  '12-visual-aids-buoyage-fc-7': Ill_12_fc_7,
  '12-visual-aids-buoyage-fc-8': Ill_12_fc_8,
  '12-visual-aids-buoyage-fc-9': Ill_12_fc_9,
}
