import type { FC } from 'react'

const P = { stroke: "var(--color-primary)", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" } as const
const D = { ...P, strokeWidth: 1.5 } as const

// 01-nautical-terms-fc-0: Port side — boat from above, arrow pointing left
export const Ill_01_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Hull outline — pointed bow at top, flat stern at bottom */}
    <path {...D} d="M60 8 C75 8 82 20 82 40 C82 60 75 72 60 72 C45 72 38 60 38 40 C38 20 45 8 60 8 Z" />
    {/* Port (left) side highlighted bold */}
    <path {...P} d="M60 8 C45 8 38 20 38 40 C38 60 45 72 60 72" />
    {/* Centreline */}
    <path {...D} d="M60 8 L60 72" strokeDasharray="4 3" />
    {/* PORT arrow pointing left */}
    <path {...P} d="M35 40 L14 40" />
    <path {...P} d="M14 40 L22 34" />
    <path {...P} d="M14 40 L22 46" />
    {/* Bow indicator at top */}
    <path {...D} d="M60 4 L60 10" />
  </svg>
)

// 01-nautical-terms-fc-1: No-go zone — sailboat with dead-zone cone in front
export const Ill_01_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Wind arrows from top-left */}
    <path {...D} d="M10 12 L28 28" />
    <path {...D} d="M10 12 L18 12" />
    <path {...D} d="M10 12 L10 20" />
    <path {...D} d="M18 20 L32 34" />
    <path {...D} d="M18 20 L26 20" />
    <path {...D} d="M18 20 L18 28" />
    {/* Sailboat — hull at bottom centre */}
    <path {...P} d="M52 68 L68 68 L65 58 L55 58 Z" />
    {/* Mast */}
    <path {...P} d="M60 58 L60 30" />
    {/* Sail */}
    <path {...D} d="M60 32 L72 56 L60 56 Z" />
    {/* No-go zone cone — two boundary lines from bow */}
    <path {...P} d="M60 30 L30 10" strokeDasharray="5 3" />
    <path {...P} d="M60 30 L90 10" strokeDasharray="5 3" />
    {/* Arc across top of zone */}
    <path {...D} d="M30 10 Q60 18 90 10" />
    {/* Blocked wind arrows (X marks) */}
    <path {...P} d="M42 20 L50 28 M50 20 L42 28" />
    <path {...P} d="M70 20 L78 28 M78 20 L70 28" />
  </svg>
)

// 01-nautical-terms-fc-2: Draught — hull at waterline, arrow from waterline to keel
export const Ill_01_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Waterline */}
    <path {...P} d="M10 35 L110 35" />
    {/* Water ripple */}
    <path {...D} d="M10 40 Q25 37 40 40 Q55 43 70 40 Q85 37 100 40 Q110 43 110 43" />
    {/* Hull above waterline */}
    <path {...P} d="M30 35 C30 25 40 18 60 18 C80 18 90 25 90 35" />
    {/* Hull below waterline */}
    <path {...P} d="M30 35 L30 55 Q60 62 90 55 L90 35" />
    {/* Keel fin */}
    <path {...P} d="M55 62 L55 72 L65 72 L65 62" />
    {/* Draught arrow — from waterline down to keel bottom */}
    <path {...P} d="M104 35 L104 72" />
    <path {...P} d="M104 35 L100 43" />
    <path {...P} d="M104 35 L108 43" />
    <path {...P} d="M104 72 L100 64" />
    <path {...P} d="M104 72 L108 64" />
    {/* Dimension ticks */}
    <path {...D} d="M100 35 L108 35" />
    <path {...D} d="M100 72 L108 72" />
  </svg>
)

// 01-nautical-terms-fc-3: Three edges of a sail — triangle with luff/leech/foot
export const Ill_01_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Main sail triangle */}
    <path {...P} d="M30 72 L30 8 L90 72 Z" />
    {/* Luff — leading edge (left, vertical) — bold highlight */}
    <path {...P} d="M30 8 L30 72" strokeWidth={3.5} />
    {/* Leech — trailing edge (right diagonal) */}
    <path {...P} d="M30 8 L90 72" strokeWidth={2.5} />
    {/* Foot — bottom edge (horizontal) */}
    <path {...P} d="M30 72 L90 72" strokeWidth={2.5} />
    {/* Mast indication */}
    <path {...D} d="M30 4 L30 8" />
    {/* Luff label line */}
    <path {...D} d="M18 38 L26 38" />
    <circle cx="18" cy="38" r="2" fill="var(--color-primary)" />
    {/* Leech label line */}
    <path {...D} d="M72 36 L80 30" />
    <circle cx="80" cy="30" r="2" fill="var(--color-primary)" />
    {/* Foot label line */}
    <path {...D} d="M60 76 L60 72" />
    <circle cx="60" cy="76" r="2" fill="var(--color-primary)" />
  </svg>
)

// 01-nautical-terms-fc-4: Tacking vs gybing — top-down, two manoeuvres
export const Ill_01_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Wind arrow from top */}
    <path {...P} d="M60 4 L60 14" />
    <path {...P} d="M60 4 L56 10" />
    <path {...P} d="M60 4 L64 10" />
    {/* TACK — left side: bow through wind */}
    {/* Boat 1 before tack */}
    <path {...D} d="M18 45 C16 40 22 35 28 38 C34 35 40 40 38 45 C38 55 28 58 18 45 Z" />
    {/* Curved arrow — bow through wind (left turn, bow swings through top) */}
    <path {...P} d="M28 36 Q20 20 35 18 Q50 16 42 30" />
    <path {...P} d="M42 30 L36 24" />
    <path {...P} d="M42 30 L44 22" />
    {/* Tack divider */}
    <path {...D} d="M60 15 L60 78" strokeDasharray="3 3" />
    {/* GYBE — right side: stern through wind */}
    {/* Boat 2 before gybe */}
    <path {...D} d="M82 45 C80 40 86 35 92 38 C98 35 104 40 102 45 C102 55 92 58 82 45 Z" />
    {/* Curved arrow — stern through wind (stern swings through top) */}
    <path {...P} d="M92 58 Q84 72 98 74 Q112 72 106 60" />
    <path {...P} d="M106 60 L100 64" />
    <path {...P} d="M106 60 L108 68" />
    {/* Small wind arrow label dots */}
    <circle cx="60" cy="4" r="1.5" fill="var(--color-primary)" />
  </svg>
)

// 01-nautical-terms-fc-5: Jackstay — mast and wire along deck with crew clipped on
export const Ill_01_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Boat hull side profile */}
    <path {...P} d="M10 55 Q20 58 60 58 Q95 58 110 55 L105 65 Q60 70 15 65 Z" />
    {/* Deck line */}
    <path {...P} d="M15 55 L105 55" />
    {/* Mast */}
    <path {...P} d="M40 55 L40 10" />
    {/* Boom */}
    <path {...D} d="M40 48 L75 48" />
    {/* Jackstay wire — running along deck from bow to stern */}
    <path {...P} d="M15 52 L105 52" strokeDasharray="6 2" />
    {/* Jackstay anchor points */}
    <circle cx="15" cy="52" r="2.5" fill="var(--color-primary)" />
    <circle cx="105" cy="52" r="2.5" fill="var(--color-primary)" />
    {/* Crew figure */}
    <circle cx="65" cy="46" r="4" {...D} />
    <path {...D} d="M65 50 L65 56" />
    <path {...D} d="M61 53 L69 53" />
    <path {...D} d="M65 56 L62 62" />
    <path {...D} d="M65 56 L68 62" />
    {/* Tether from crew to jackstay */}
    <path {...P} d="M65 54 L65 52" />
    <circle cx="65" cy="52" r="2" fill="var(--color-primary)" />
  </svg>
)

// 01-nautical-terms-fc-6: Kicking strap (vang) — mast, boom, diagonal strut with force arrows
export const Ill_01_fc_6: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Mast — vertical */}
    <path {...P} d="M30 8 L30 70" />
    {/* Boom — horizontal from mast */}
    <path {...P} d="M30 38 L100 38" />
    {/* Kicking strap — diagonal from mast base to boom */}
    <path {...P} d="M30 65 L75 38" />
    {/* Force arrow — upward on boom (force being prevented) */}
    <path {...D} d="M75 38 L75 22" strokeDasharray="4 2" />
    <path {...D} d="M75 22 L71 30" />
    <path {...D} d="M75 22 L79 30" />
    {/* Force arrow — vang force downward */}
    <path {...P} d="M75 38 L75 50" />
    <path {...P} d="M75 50 L71 44" />
    <path {...P} d="M75 50 L79 44" />
    {/* Sail suggestion on boom */}
    <path {...D} d="M30 10 L90 36" />
    {/* Fitting dots */}
    <circle cx="30" cy="65" r="3" fill="var(--color-primary)" />
    <circle cx="75" cy="38" r="3" fill="var(--color-primary)" />
  </svg>
)

// 01-nautical-terms-fc-7: Fin keel vs long keel — two hull cross-sections
export const Ill_01_fc_7: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Divider */}
    <path {...D} d="M60 5 L60 78" strokeDasharray="3 3" />
    {/* LEFT — Fin keel */}
    {/* Hull */}
    <path {...P} d="M8 25 Q15 15 30 14 Q45 15 52 25 L52 38 Q30 42 8 38 Z" />
    {/* Fin keel — short deep fin */}
    <path {...P} d="M25 38 L25 65 L35 65 L35 38" />
    {/* Waterline */}
    <path {...D} d="M6 32 L54 32" />
    {/* LEFT label dot */}
    <circle cx="30" cy="72" r="2" fill="var(--color-primary)" />
    {/* RIGHT — Long keel */}
    {/* Hull */}
    <path {...P} d="M68 25 Q75 15 90 14 Q105 15 112 25 L112 40 Q90 44 68 40 Z" />
    {/* Long keel — full length shallow */}
    <path {...P} d="M70 40 L70 52 Q90 56 110 52 L110 40" />
    {/* Waterline */}
    <path {...D} d="M66 32 L114 32" />
    {/* RIGHT label dot */}
    <circle cx="90" cy="72" r="2" fill="var(--color-primary)" />
  </svg>
)

// 01-nautical-terms-fc-8: Mooring warps alongside tidal wall — long warps, tidal range
export const Ill_01_fc_8: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Tidal wall — right side */}
    <path {...P} d="M105 5 L105 75" />
    {/* High water mark */}
    <path {...D} d="M105 18 L112 18" />
    {/* Low water mark */}
    <path {...D} d="M105 62 L112 62" />
    {/* Tidal range arrow */}
    <path {...D} d="M110 18 L110 62" />
    <path {...D} d="M110 18 L107 26" />
    <path {...D} d="M110 62 L107 54" />
    {/* Boat hull — side view */}
    <path {...P} d="M18 42 Q22 36 60 34 Q85 34 95 38 L95 50 Q60 54 22 52 Z" />
    {/* Long warp — bow to wall (shallow angle) */}
    <path {...P} d="M35 36 L105 20" />
    {/* Long warp — stern to wall (shallow angle) */}
    <path {...P} d="M88 38 L105 55" />
    {/* Breast line — short perpendicular */}
    <path {...D} d="M65 34 L105 38" />
    {/* Cleat on wall — forward */}
    <circle cx="105" cy="20" r="3" fill="var(--color-primary)" />
    {/* Cleat on wall — aft */}
    <circle cx="105" cy="55" r="3" fill="var(--color-primary)" />
    {/* Water */}
    <path {...D} d="M8 56 Q20 52 35 56 Q50 60 65 56" />
  </svg>
)

// 01-nautical-terms-fc-9: Raft mooring — 3 boats, outermost lines to shore
export const Ill_01_fc_9: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Pontoon/shore — left side */}
    <path {...P} d="M8 5 L8 75" strokeWidth={3.5} />
    {/* Boat 1 — innermost (closest to pontoon) */}
    <path {...P} d="M14 28 L14 52 Q24 56 44 52 L44 28 Q24 24 14 28 Z" />
    {/* Boat 2 — middle */}
    <path {...P} d="M48 28 L48 52 Q58 56 78 52 L78 28 Q58 24 48 28 Z" />
    {/* Boat 3 — outermost */}
    <path {...P} d="M82 28 L82 52 Q92 56 112 52 L112 28 Q92 24 82 28 Z" />
    {/* Boat 1 lines — dashed (inner, relying on others) */}
    <path {...D} d="M14 30 L8 22" strokeDasharray="3 2" />
    <path {...D} d="M14 50 L8 58" strokeDasharray="3 2" />
    {/* Boat 2 lines — dashed (middle, relying on others) */}
    <path {...D} d="M48 30 L8 18" strokeDasharray="3 2" />
    <path {...D} d="M48 50 L8 62" strokeDasharray="3 2" />
    {/* Boat 3 lines — BOLD (outermost, goes to shore) */}
    <path {...P} d="M82 28 L8 12" />
    <path {...P} d="M82 52 L8 68" />
    {/* Arrow on outermost lines */}
    <path {...P} d="M8 12 L14 16" />
    <path {...P} d="M8 68 L14 64" />
    {/* Shore cleats */}
    <circle cx="8" cy="12" r="2.5" fill="var(--color-primary)" />
    <circle cx="8" cy="68" r="2.5" fill="var(--color-primary)" />
  </svg>
)

// 01-nautical-terms-fc-10: Pontoon floating — rises with tide unlike fixed wall
export const Ill_01_fc_10: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Fixed wall — left */}
    <path {...P} d="M15 5 L15 75" strokeWidth={3.5} />
    {/* High water mark on wall */}
    <path {...D} d="M15 22 L22 22" />
    {/* Low water mark on wall */}
    <path {...D} d="M15 55 L22 55" />
    {/* Tidal range brace */}
    <path {...D} d="M20 22 L20 55" />
    {/* Water level */}
    <path {...D} d="M15 38 L110 38" strokeDasharray="4 2" />
    {/* Pontoon floating at water level */}
    <path {...P} d="M30 34 L100 34 L100 42 L30 42 Z" />
    {/* Pontoon up-arrow (rises with tide) */}
    <path {...P} d="M65 28 L65 20" />
    <path {...P} d="M65 20 L61 28" />
    <path {...P} d="M65 20 L69 28" />
    {/* Pile/guide through pontoon */}
    <path {...D} d="M50 10 L50 72" />
    <path {...D} d="M80 10 L80 72" />
    {/* Boat on pontoon */}
    <path {...P} d="M38 30 Q45 24 65 23 Q82 24 88 30 L88 34 L38 34 Z" />
    {/* Boat-pontoon line (stays same length) */}
    <path {...P} d="M60 30 L60 34" />
  </svg>
)

// 01-nautical-terms-fc-11: Spring lines — top-down boat, four lines highlighted
export const Ill_01_fc_11: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Pontoon/dock — top edge */}
    <path {...P} d="M5 8 L115 8" strokeWidth={3.5} />
    {/* Boat hull — top down view */}
    <path {...P} d="M30 20 Q60 15 90 20 L92 55 Q60 60 28 55 Z" />
    {/* Breast lines — perpendicular (dashed, secondary) */}
    <path {...D} d="M42 18 L42 8" strokeDasharray="3 2" />
    <path {...D} d="M78 18 L78 8" strokeDasharray="3 2" />
    {/* Forward spring — diagonal aft from bow cleat to shore point forward */}
    <path {...P} d="M35 20 L75 8" />
    {/* Aft spring — diagonal fwd from stern cleat to shore point aft */}
    <path {...P} d="M85 22 L45 8" />
    {/* Spring line arrows showing fore/aft tension */}
    <path {...P} d="M75 8 L67 12" />
    <path {...P} d="M75 8 L74 16" />
    <path {...P} d="M45 8 L53 12" />
    <path {...P} d="M45 8 L46 16" />
    {/* Fore/aft arrows blocked */}
    <path {...D} d="M60 65 L60 72" />
    <path {...D} d="M60 72 L56 66" />
    <path {...D} d="M60 72 L64 66" />
    <path {...D} d="M18 38 L10 38" />
    <path {...D} d="M10 38 L16 34" />
    <path {...D} d="M10 38 L16 42" />
  </svg>
)

// 02-ropework-fc-0: Nylon rope elasticity — wavy rope vs stiff rope, cleat with shock absorption
export const Ill_02_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Cleat/dock — left */}
    <path {...P} d="M8 10 L8 70" strokeWidth={3.5} />
    <path {...P} d="M5 35 L14 35" />
    <path {...P} d="M5 45 L14 45" />
    {/* Nylon rope — wavy/springy */}
    <path {...P} d="M14 30 Q22 22 30 30 Q38 38 46 30 Q54 22 62 30 Q70 38 78 30 Q82 26 86 28" />
    {/* Boat cleat right */}
    <circle cx="90" cy="28" r="4" {...D} />
    {/* Nylon label arrow — spring symbol */}
    <path {...D} d="M50 14 L50 20" />
    <path {...D} d="M50 14 L46 18" />
    <path {...D} d="M50 14 L54 18" />
    {/* Divider */}
    <path {...D} d="M10 56 L110 56" strokeDasharray="2 2" />
    {/* Stiff rope (polyester/other) — straight */}
    <path {...P} d="M14 65 L86 65" />
    {/* Stiff rope indicator — rigid ticks */}
    <path {...D} d="M30 62 L30 68" />
    <path {...D} d="M50 62 L50 68" />
    <path {...D} d="M70 62 L70 68" />
    {/* Boat cleat right */}
    <circle cx="90" cy="65" r="4" {...D} />
    {/* X mark on stiff */}
    <path {...P} d="M100 60 L110 70 M110 60 L100 70" />
  </svg>
)

// 02-ropework-fc-1: Bowline knot — clear recognizable bowline
export const Ill_02_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Standing part — comes from left */}
    <path {...P} d="M8 40 L40 40" />
    {/* The loop (bight) — eye of the bowline */}
    <path {...P} d="M40 40 Q44 28 55 30 Q66 32 64 42 Q62 52 52 50 Q44 48 44 40" />
    {/* Rabbit — tail end comes UP through the loop */}
    <path {...P} d="M52 50 L52 36" />
    {/* Around the tree — goes behind standing part */}
    <path {...P} d="M52 36 Q52 30 46 30 Q38 30 38 38 Q38 44 44 44" />
    {/* Back down the hole — tail exits downward */}
    <path {...P} d="M44 44 Q50 46 52 54 L52 68" />
    {/* Working end tail */}
    <path {...P} d="M52 68 L52 74" />
    {/* The fixed loop clearly shown */}
    <path {...P} d="M64 42 Q66 55 80 55 Q100 55 108 42 Q108 28 90 28 Q72 28 64 42" />
  </svg>
)

// 02-ropework-fc-2: Round turn and two half hitches on rail with fender
export const Ill_02_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Guard rail — horizontal tube */}
    <path {...P} d="M15 28 L105 28" />
    {/* Round turn — rope going around rail twice */}
    <path {...P} d="M55 12 L55 22 Q48 28 48 36 Q48 44 55 44" />
    <path {...P} d="M55 22 Q62 28 62 36 Q62 44 55 44" />
    {/* First half hitch */}
    <path {...P} d="M55 44 Q52 50 56 54 Q62 58 64 52 L64 44" />
    {/* Second half hitch */}
    <path {...P} d="M64 44 Q61 36 55 36" />
    {/* Rope going over rail */}
    <path {...D} d="M50 22 Q52 20 55 20 Q58 20 60 22" />
    {/* Fender hanging below */}
    <path {...P} d="M55 58 L55 64" />
    <path {...P} d="M55 64 Q44 64 44 70 Q44 76 55 76 Q66 76 66 70 Q66 64 55 64" />
    {/* Fender bumps */}
    <path {...D} d="M44 68 Q55 66 66 68" />
    <path {...D} d="M44 72 Q55 74 66 72" />
  </svg>
)

// 02-ropework-fc-3: Rolling hitch — gripping hitch on spar with extra turns
export const Ill_02_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Spar/rope being gripped — horizontal */}
    <path {...P} d="M10 38 L110 38" strokeWidth={3.5} />
    {/* Rolling hitch — extra turns on load side */}
    {/* First turn — left of centre (load side, 2 turns here) */}
    <path {...P} d="M40 18 L40 30 Q30 38 30 46 Q30 54 40 54" />
    <path {...P} d="M40 30 Q50 38 50 46 Q50 54 40 54" />
    {/* Second turn same side (the extra gripping turn) */}
    <path {...P} d="M50 28 L50 32 Q42 38 42 44 Q42 50 50 50" />
    {/* Single turn right of centre */}
    <path {...P} d="M60 54 Q68 46 68 38 Q68 30 60 28 L60 54" />
    {/* Running end exits right */}
    <path {...P} d="M60 54 L90 54" />
    {/* Standing end / load direction — bold arrow */}
    <path {...P} d="M40 18 L40 10 L20 10" />
    <path {...P} d="M20 10 L28 6" />
    <path {...P} d="M20 10 L28 14" />
    {/* Load arrow label */}
    <path {...D} d="M110 38 L118 38" />
    <path {...D} d="M110 38 L114 34" />
    <path {...D} d="M110 38 L114 42" />
  </svg>
)

// 02-ropework-fc-4: Reef knot failure with different diameter ropes
export const Ill_02_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* LEFT side — reef knot with mismatched ropes (FAILING) */}
    {/* Thick rope */}
    <path {...P} d="M8 35 Q15 30 22 35 Q28 40 35 35" strokeWidth={3.5} />
    {/* Thin rope */}
    <path {...D} d="M8 45 Q15 50 22 45 Q28 40 35 45" />
    {/* Knot area — mismatched */}
    <path {...P} d="M22 30 L22 50" strokeWidth={1} />
    {/* Slip arrow — showing knot capsizing */}
    <path {...P} d="M30 38 L42 32" />
    <path {...P} d="M42 32 L36 30" />
    <path {...P} d="M42 32 L42 38" />
    {/* X mark — bad */}
    <path {...P} d="M46 28 L56 38 M56 28 L46 38" />
    {/* Divider */}
    <path {...D} d="M62 10 L62 70" strokeDasharray="3 3" />
    {/* RIGHT side — reef knot with matched ropes (HOLDING) */}
    {/* Both ropes same thickness */}
    <path {...P} d="M66 35 Q73 30 80 35 Q87 40 94 35" />
    <path {...P} d="M66 45 Q73 50 80 45 Q87 40 94 45" />
    {/* Knot locked correctly */}
    <path {...P} d="M80 30 Q84 36 80 42 Q76 48 80 54" strokeWidth={2} />
    <path {...P} d="M74 32 Q78 40 74 48" strokeWidth={1.5} />
    {/* Check mark — good */}
    <path {...P} d="M100 42 L106 50 L116 32" strokeWidth={2.5} />
  </svg>
)

// 02-ropework-fc-5: Release rope under load — winch then release jammer
export const Ill_02_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Winch drum */}
    <path {...P} d="M25 38 m-18 0 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0" />
    <circle cx="25" cy="38" r="6" {...D} />
    {/* Rope on winch — spiral wrap suggesting clockwise */}
    <path {...D} d="M38 28 Q42 38 38 48" />
    {/* Rope coming off winch to jammer */}
    <path {...P} d="M43 38 L65 38" />
    {/* Jammer/clutch */}
    <path {...P} d="M65 30 L85 30 L88 38 L85 46 L65 46 L62 38 Z" />
    {/* Jammer lever — open/release state */}
    <path {...P} d="M75 30 L75 20 L85 16" />
    {/* Rope continuing past jammer to load */}
    <path {...P} d="M88 38 L108 38" />
    {/* Load arrow */}
    <path {...P} d="M108 38 L116 38" />
    <path {...P} d="M116 38 L110 34" />
    <path {...P} d="M116 38 L110 42" />
    {/* Step 1 arrow — take turn on winch */}
    <path {...D} d="M25 18 Q10 18 8 30" />
    <path {...D} d="M8 30 L6 22" />
    <path {...D} d="M8 30 L14 26" />
    {/* Step number dots */}
    <circle cx="25" cy="14" r="5" stroke="var(--color-primary)" strokeWidth={1.5} fill="none" />
    <path {...D} d="M25 11 L25 17" />
    <circle cx="75" cy="10" r="5" stroke="var(--color-primary)" strokeWidth={1.5} fill="none" />
    <path {...D} d="M72 10 L78 10" />
    <path {...D} d="M75 7 L75 13" />
  </svg>
)

// 02-ropework-fc-6: Winch winding direction — clockwise from front/above
export const Ill_02_fc_6: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Winch drum — viewed from front */}
    {/* Outer drum */}
    <path {...P} d="M60 40 m-32 0 a32 32 0 1 0 64 0 a32 32 0 1 0 -64 0" />
    {/* Inner hub */}
    <path {...P} d="M60 40 m-12 0 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0" />
    {/* Drum surface detail */}
    <path {...D} d="M60 40 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0" />
    {/* Clockwise arrow — large arc with arrowhead */}
    <path {...P} d="M60 12 Q88 12 90 32 Q92 52 72 58" />
    <path {...P} d="M72 58 L80 52" />
    <path {...P} d="M72 58 L66 64" />
    {/* Rope coming onto drum from left */}
    <path {...P} d="M8 40 L28 40" />
    {/* Rope wrapping around drum */}
    <path {...D} d="M28 40 Q34 32 40 38" />
    {/* Winch handle socket */}
    <circle cx="60" cy="40" r="4" fill="var(--color-primary)" />
    {/* Base platform */}
    <path {...P} d="M30 72 L90 72 L90 76 L30 76 Z" />
    <path {...D} d="M45 68 L45 72" />
    <path {...D} d="M75 68 L75 72" />
    <path {...D} d="M60 66 L60 72" />
  </svg>
)

export const registryEntries: Record<string, FC> = {
  '01-nautical-terms-fc-0': Ill_01_fc_0,
  '01-nautical-terms-fc-1': Ill_01_fc_1,
  '01-nautical-terms-fc-2': Ill_01_fc_2,
  '01-nautical-terms-fc-3': Ill_01_fc_3,
  '01-nautical-terms-fc-4': Ill_01_fc_4,
  '01-nautical-terms-fc-5': Ill_01_fc_5,
  '01-nautical-terms-fc-6': Ill_01_fc_6,
  '01-nautical-terms-fc-7': Ill_01_fc_7,
  '01-nautical-terms-fc-8': Ill_01_fc_8,
  '01-nautical-terms-fc-9': Ill_01_fc_9,
  '01-nautical-terms-fc-10': Ill_01_fc_10,
  '01-nautical-terms-fc-11': Ill_01_fc_11,
  '02-ropework-fc-0': Ill_02_fc_0,
  '02-ropework-fc-1': Ill_02_fc_1,
  '02-ropework-fc-2': Ill_02_fc_2,
  '02-ropework-fc-3': Ill_02_fc_3,
  '02-ropework-fc-4': Ill_02_fc_4,
  '02-ropework-fc-5': Ill_02_fc_5,
  '02-ropework-fc-6': Ill_02_fc_6,
}
