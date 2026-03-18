import type { FC } from 'react'

const P = { stroke: "var(--color-primary)", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" } as const
const D = { ...P, strokeWidth: 1.5 } as const

// 13-meteorology-fc-0
// Low pressure system — circular isobars with anticlockwise wind arrows
export const Ill_13_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Outer isobar */}
    <circle cx="60" cy="40" r="34" {...D} strokeDasharray="none" />
    {/* Middle isobar */}
    <circle cx="60" cy="40" r="22" {...D} />
    {/* Inner isobar */}
    <circle cx="60" cy="40" r="11" {...P} />
    {/* Anticlockwise wind arrow — top (pointing left) */}
    <path d="M60 6 L54 6" {...P} />
    <path d="M54 6 L57 3 M54 6 L57 9" {...D} />
    {/* Anticlockwise wind arrow — right (pointing up) */}
    <path d="M94 40 L94 34" {...P} />
    <path d="M94 34 L91 37 M94 34 L97 37" {...D} />
    {/* Anticlockwise wind arrow — bottom (pointing right) */}
    <path d="M60 74 L66 74" {...P} />
    <path d="M66 74 L63 71 M66 74 L63 77" {...D} />
    {/* Anticlockwise wind arrow — left (pointing down) */}
    <path d="M26 40 L26 46" {...P} />
    <path d="M26 46 L23 43 M26 46 L29 43" {...D} />
  </svg>
)

// 13-meteorology-fc-1
// Beaufort Force 5 — waves with foam crests, boat heeled in breeze
export const Ill_13_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Wave 1 — large */}
    <path d="M5 55 Q20 42 35 52 Q50 62 65 50 Q80 38 95 48 Q110 58 118 52" {...P} />
    {/* Wave 2 — secondary */}
    <path d="M5 65 Q18 56 30 62 Q45 70 60 60 Q75 50 90 58 Q105 66 118 62" {...D} />
    {/* Foam streaks on crest */}
    <path d="M32 51 L40 49" {...D} />
    <path d="M62 49 L72 47" {...D} />
    <path d="M93 47 L101 45" {...D} />
    {/* Boat hull */}
    <path d="M52 46 Q60 50 68 46 L66 52 Q60 55 54 52 Z" {...P} />
    {/* Mast */}
    <path d="M60 46 L60 28" {...P} />
    {/* Sail — heeled, wind from port */}
    <path d="M60 29 L74 38 L60 46" {...P} />
    {/* Wind streaks */}
    <path d="M8 22 L22 22 M8 30 L18 30" {...D} />
  </svg>
)

// 13-meteorology-fc-2
// Backing vs veering — two compass roses with directional arrows
export const Ill_13_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* LEFT compass — backing (anticlockwise: S→SE→E) */}
    <circle cx="30" cy="40" r="22" {...D} />
    <path d="M30 18 L30 22 M30 58 L30 62 M8 40 L12 40 M48 40 L52 40" {...D} />
    {/* N/S/E/W tick marks */}
    <path d="M30 22 L30 26" {...D} />
    {/* Wind direction arrow — pointing from S */}
    <path d="M30 55 L30 44" {...P} />
    <path d="M30 44 L27 48 M30 44 L33 48" {...P} />
    {/* Anticlockwise curved arrow */}
    <path d="M44 30 Q38 18 26 22 Q18 26 18 36" {...D} />
    <path d="M18 36 L14 33 M18 36 L21 32" {...D} />

    {/* Label area divider */}
    <path d="M60 15 L60 65" {...D} strokeDasharray="3 3" />

    {/* RIGHT compass — veering (clockwise: S→SW→W) */}
    <circle cx="90" cy="40" r="22" {...D} />
    <path d="M90 18 L90 22 M90 58 L90 62 M68 40 L72 40 M108 40 L112 40" {...D} />
    {/* Wind direction arrow — pointing from S */}
    <path d="M90 55 L90 44" {...P} />
    <path d="M90 44 L87 48 M90 44 L93 48" {...P} />
    {/* Clockwise curved arrow */}
    <path d="M76 30 Q82 18 94 22 Q102 26 102 36" {...D} />
    <path d="M102 36 L106 33 M102 36 L99 32" {...D} />
  </svg>
)

// 13-meteorology-fc-3
// Poor visibility — boat in fog, distant lighthouse barely visible
export const Ill_13_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Fog haze lines — horizontal wavy */}
    <path d="M5 28 Q20 25 35 28 Q50 31 65 28 Q80 25 95 28 Q110 31 118 28" {...D} strokeDasharray="4 2" />
    <path d="M5 38 Q22 35 40 38 Q58 41 75 38 Q92 35 118 38" {...D} strokeDasharray="4 2" />
    <path d="M5 48 Q25 45 45 48 Q65 51 85 48 Q100 45 118 48" {...D} strokeDasharray="3 3" />
    {/* Distant lighthouse — faint/dim at right edge */}
    <path d="M98 55 L98 25" {...D} strokeDasharray="2 2" />
    <path d="M94 25 L102 25 L100 20 L96 20 Z" {...D} strokeDasharray="2 2" />
    {/* Lighthouse beam — faint */}
    <path d="M98 22 L85 35" {...D} strokeDasharray="2 4" />
    {/* Foreground boat — hull */}
    <path d="M22 62 Q35 57 48 62 L46 68 Q35 72 24 68 Z" {...P} />
    {/* Mast */}
    <path d="M35 58 L35 40" {...P} />
    {/* Boom/sail outline */}
    <path d="M35 41 L46 54 L35 58" {...P} />
    {/* Visibility ring — dashed circle around boat */}
    <circle cx="35" cy="60" r="28" {...D} strokeDasharray="5 3" />
  </svg>
)

// 13-meteorology-fc-4
// Wind over tide — opposing arrows creating steep choppy waves
export const Ill_13_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Tide arrow — left to right, below */}
    <path d="M8 65 L52 65" {...P} />
    <path d="M52 65 L46 61 M52 65 L46 69" {...P} />
    {/* Tide label line */}
    <path d="M15 68 L40 68" {...D} />

    {/* Wind arrow — right to left, above */}
    <path d="M112 18 L68 18" {...P} />
    <path d="M68 18 L74 14 M68 18 L74 22" {...P} />
    {/* Wind streaks */}
    <path d="M100 12 L112 12" {...D} />
    <path d="M105 24 L115 24" {...D} />

    {/* Steep choppy waves in middle — short, vertical peaks close together */}
    <path d="M58 50 L62 35 L66 50" {...P} />
    <path d="M66 50 L70 34 L74 50" {...P} />
    <path d="M74 50 L78 36 L82 50" {...P} />
    <path d="M50 50 L54 37 L58 50" {...P} />
    <path d="M82 50 L86 36 L90 50" {...P} />
    {/* Baseline water */}
    <path d="M42 50 L98 50" {...D} />
  </svg>
)

// 13-meteorology-fc-5
// Gale warning — tight isobars, Force 8 threshold
export const Ill_13_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Tight isobars — close-packed curves suggesting low pressure */}
    <path d="M10 65 Q30 55 50 60 Q70 65 90 55 Q105 48 115 52" {...P} />
    <path d="M10 56 Q28 46 48 51 Q68 56 88 46 Q103 39 115 43" {...P} />
    <path d="M15 47 Q32 38 50 42 Q68 47 86 38 Q100 31 115 34" {...D} />
    <path d="M20 38 Q36 30 52 33 Q68 38 84 30 Q98 23 114 25" {...D} />
    <path d="M28 29 Q42 22 56 25 Q70 29 82 22 Q96 15 112 17" {...D} />
    {/* Force 8 indicator — Beaufort flag symbol (storm cone) */}
    <path d="M18 12 L18 30" {...P} />
    {/* Pennant flags for Force 8 */}
    <path d="M18 13 L30 17 L18 21" {...P} />
    <path d="M18 21 L30 25 L18 29" {...P} />
    {/* Full flag for F8 (two pennants + one square flag) */}
    <rect x="18" y="29" width="12" height="6" {...D} />
  </svg>
)

// 14-passage-planning-fc-0
// Six pilotage techniques on a harbour approach chart
export const Ill_14_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Chart background outline */}
    <rect x="5" y="5" width="110" height="70" rx="2" {...D} />
    {/* Harbour entrance — two headlands */}
    <path d="M45 75 L45 55 L55 45 L65 55 L65 75" {...P} />
    {/* Depth contour line */}
    <path d="M5 60 Q25 55 40 58 Q50 60 60 58 Q80 55 100 58 Q110 60 115 62" {...D} strokeDasharray="4 2" />
    {/* Transit marks — two beacons in line */}
    <path d="M90 15 L90 28" {...P} />
    <path d="M87 15 L93 15" {...P} />
    <path d="M85 28 L95 28" {...D} />
    {/* Leading line — from transit marks to entrance */}
    <path d="M90 28 L60 50" {...D} strokeDasharray="5 2" />
    {/* Waypoint — cross/diamond symbol */}
    <path d="M25 30 L29 34 L25 38 L21 34 Z" {...P} />
    <path d="M25 30 L25 38 M21 34 L29 34" {...D} />
    {/* Clearing bearing line */}
    <path d="M10 20 L48 52" {...D} />
    <path d="M10 20 L16 21 M10 20 L11 26" {...D} />
    {/* Rock/hazard marker */}
    <path d="M40 45 L44 39 L48 45 Z" {...P} />
    <path d="M44 39 L44 36" {...D} />
  </svg>
)

// 14-passage-planning-fc-1
// Clearing bearing — headland, bearing line, boat on safe side
export const Ill_14_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Headland / rocky outcrop */}
    <path d="M60 75 L60 45 Q65 35 72 30 Q80 25 85 30 L85 75" {...P} />
    {/* Rocks / danger */}
    <path d="M70 38 L74 32 L78 38 Z" {...P} />
    <path d="M68 42 L71 37 L74 42 Z" {...D} />
    {/* Prominent landmark on shore — lighthouse */}
    <path d="M100 60 L100 30" {...P} />
    <path d="M96 30 L104 30 L102 24 L98 24 Z" {...P} />
    {/* Clearing bearing line from landmark — runs just clear of danger */}
    <path d="M100 35 L20 55" {...P} strokeDasharray="none" />
    {/* Bearing angle arc at landmark */}
    <path d="M100 35 Q92 33 88 38" {...D} />
    {/* Safe side label zone */}
    <path d="M15 62 Q25 58 35 62" {...D} />
    {/* Boat on safe side (below/left of bearing line) */}
    <path d="M28 68 Q35 64 42 68 L40 72 Q35 75 30 72 Z" {...P} />
    <path d="M35 64 L35 53" {...P} />
    <path d="M35 54 L44 60 L35 64" {...P} />
    {/* Danger zone — shaded with hatching above bearing line */}
    <path d="M50 45 L56 40 M57 42 L63 37 M64 40 L70 35" {...D} />
  </svg>
)

// 14-passage-planning-fc-2
// GPS waypoint check — GPS screen next to paper chart
export const Ill_14_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* GPS unit — left side */}
    <rect x="5" y="10" width="48" height="60" rx="4" {...P} />
    {/* GPS screen */}
    <rect x="10" y="16" width="38" height="35" rx="2" {...D} />
    {/* GPS screen content — waypoint coords and bearing/distance */}
    <path d="M14 26 L44 26" {...D} />
    <path d="M14 32 L38 32" {...D} />
    <path d="M14 38 L40 38" {...D} />
    <path d="M14 44 L36 44" {...D} />
    {/* GPS buttons */}
    <circle cx="19" cy="60" r="4" {...D} />
    <circle cx="35" cy="60" r="4" {...D} />
    {/* Check mark / confirmation */}
    <path d="M28 56 L32 62 L42 50" {...P} />

    {/* Paper chart — right side */}
    <rect x="62" y="10" width="53" height="60" rx="2" {...D} />
    {/* Chart coastline */}
    <path d="M70 50 Q80 40 88 45 Q96 50 106 42" {...D} />
    {/* Waypoint on chart — diamond */}
    <path d="M85 30 L89 34 L85 38 L81 34 Z" {...P} />
    {/* Bearing line on chart */}
    <path d="M70 65 L85 34" {...D} strokeDasharray="4 2" />
    {/* Distance arc */}
    <path d="M70 50 Q78 30 85 34" {...D} />
    {/* Double-check arrow between GPS and chart */}
    <path d="M53 40 L62 40" {...P} />
    <path d="M57 36 L62 40 L57 44" {...P} />
  </svg>
)

// 14-passage-planning-fc-3
// Magnetic vs True bearings — compass rose with M bearing, helmsman's compass
export const Ill_14_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Compass rose — left */}
    <circle cx="38" cy="40" r="28" {...P} />
    <circle cx="38" cy="40" r="20" {...D} />
    {/* Cardinal points */}
    <path d="M38 12 L38 18 M38 62 L38 68 M10 40 L16 40 M60 40 L66 40" {...P} />
    {/* Intercardinal ticks */}
    <path d="M18 20 L22 24 M54 20 L50 24 M18 60 L22 56 M54 60 L50 56" {...D} />
    {/* Magnetic north offset — angled line showing variation */}
    <path d="M38 40 L38 14" {...P} />
    <path d="M38 40 L33 15" {...D} strokeDasharray="3 2" />
    {/* Variation arc */}
    <path d="M38 20 Q35 19 33 21" {...D} />
    {/* M label position indicator arc — highlighted bearing */}
    <path d="M38 40 L58 24" {...P} />
    <path d="M52 20 Q56 22 58 26" {...D} />

    {/* Boat compass — right side */}
    <circle cx="88" cy="40" r="24" {...P} />
    <circle cx="88" cy="40" r="16" {...D} />
    {/* Compass needle */}
    <path d="M88 40 L88 20" {...P} />
    <path d="M88 40 L88 58" {...D} />
    <path d="M85 24 L88 20 L91 24" {...P} />
    {/* Lubber line */}
    <path d="M88 16 L88 20" {...P} />
    {/* Degree marks */}
    <path d="M88 24 L96 30 M88 24 L80 30" {...D} />
    {/* Arrow from compass to bearing line showing direct read */}
    <path d="M64 40 L72 40" {...P} />
    <path d="M69 37 L72 40 L69 43" {...P} />
  </svg>
)

// 14-passage-planning-fc-4
// Pilotage plan checklist — 2×2 grid of planning icons
export const Ill_14_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Grid dividers */}
    <path d="M60 10 L60 70" {...D} />
    <path d="M10 40 L110 40" {...D} />

    {/* Top-left: Tides / depth — tide arrow and depth lines */}
    <path d="M15 20 L15 32" {...P} />
    <path d="M12 20 L18 20" {...P} />
    <path d="M12 32 L18 32" {...P} />
    <path d="M20 25 L50 25" {...D} strokeDasharray="3 2" />
    <path d="M20 29 L45 29" {...D} strokeDasharray="3 2" />
    <path d="M44 23 L50 25 L44 27" {...D} />

    {/* Top-right: Marks / buoys — buoy shape */}
    <path d="M82 15 L82 22" {...P} />
    <path d="M78 22 Q82 28 86 22 Z" {...P} />
    <circle cx="82" cy="14" r="3" {...P} />
    <path d="M70 30 L95 30" {...D} />
    <path d="M95 22 L98 18 L101 22" {...D} />
    <path d="M95 22 L101 22 L98 28 Z" {...D} />

    {/* Bottom-left: Hazards / rocks — rock symbols */}
    <path d="M22 50 L26 44 L30 50 Z" {...P} />
    <path d="M30 53 L34 47 L38 53 Z" {...P} />
    <path d="M15 56 L50 56" {...D} />
    {/* X marks for danger */}
    <path d="M42 46 L46 50 M46 46 L42 50" {...D} />

    {/* Bottom-right: Timing / arrival — clock face */}
    <circle cx="85" cy="55" r="14" {...P} />
    <path d="M85 45 L85 55 L93 55" {...P} />
    <path d="M85 42 L85 44 M85 66 L85 68 M72 55 L74 55 M96 55 L98 55" {...D} />
  </svg>
)

// 14-passage-planning-fc-5
// XTE — Cross Track Error, desired track vs actual position offset
export const Ill_14_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Desired track — straight dashed line */}
    <path d="M10 40 L110 40" {...P} strokeDasharray="6 3" />
    {/* Desired track direction arrow */}
    <path d="M104 36 L110 40 L104 44" {...P} />

    {/* Actual boat track — slightly offset curved path */}
    <path d="M10 40 Q30 38 50 52 Q70 62 95 58 L110 56" {...P} />

    {/* Boat at actual position */}
    <path d="M88 53 Q95 49 102 53 L100 58 Q95 62 90 58 Z" {...P} />
    <path d="M95 49 L95 38" {...D} />

    {/* XTE perpendicular arrow — from actual position to desired track */}
    <path d="M95 40 L95 53" {...P} />
    <path d="M92 44 L95 40 L98 44" {...P} />

    {/* XTE bracket marks at both ends */}
    <path d="M92 40 L98 40" {...D} />
    <path d="M92 53 L98 53" {...D} />

    {/* Waypoint markers on desired track */}
    <path d="M30 36 L34 40 L30 44 L26 40 Z" {...D} />
    <path d="M70 36 L74 40 L70 44 L66 40 Z" {...D} />

    {/* Small label indicator lines for XTE */}
    <path d="M95 46 L108 46" {...D} />
    <path d="M106 44 L110 46 L106 48" {...D} />
  </svg>
)

export const registryEntries: Record<string, FC> = {
  '13-meteorology-fc-0': Ill_13_fc_0,
  '13-meteorology-fc-1': Ill_13_fc_1,
  '13-meteorology-fc-2': Ill_13_fc_2,
  '13-meteorology-fc-3': Ill_13_fc_3,
  '13-meteorology-fc-4': Ill_13_fc_4,
  '13-meteorology-fc-5': Ill_13_fc_5,
  '14-passage-planning-fc-0': Ill_14_fc_0,
  '14-passage-planning-fc-1': Ill_14_fc_1,
  '14-passage-planning-fc-2': Ill_14_fc_2,
  '14-passage-planning-fc-3': Ill_14_fc_3,
  '14-passage-planning-fc-4': Ill_14_fc_4,
  '14-passage-planning-fc-5': Ill_14_fc_5,
}
