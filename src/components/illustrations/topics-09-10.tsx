import type { FC } from 'react'

const P = { stroke: "var(--color-primary)", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" } as const
const D = { ...P, strokeWidth: 1.5 } as const

// 09-compass-fc-0: What is variation?
// Compass rose with geographic north (straight up) vs magnetic north (offset a few degrees west)
export const Ill_09_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Compass rose circle */}
    <circle cx="60" cy="42" r="28" {...D} />
    {/* Geographic / True North arrow — straight up */}
    <line x1="60" y1="42" x2="60" y2="12" {...P} />
    <polyline points="56,20 60,12 64,20" {...P} />
    {/* Magnetic North arrow — offset ~10° west (left) */}
    <line x1="60" y1="42" x2="49" y2="13" {...P} />
    <polyline points="45,21 49,13 55,19" {...P} />
    {/* Variation arc between the two arrows */}
    <path d="M 60 22 A 20 20 0 0 0 51 19" {...D} />
    {/* "T" label zone mark — tick at top of circle */}
    <line x1="60" y1="14" x2="60" y2="10" {...D} />
    {/* Center dot */}
    <circle cx="60" cy="42" r="2" stroke="var(--color-primary)" strokeWidth={2} fill="var(--color-primary)" />
  </svg>
)

// 09-compass-fc-1: What is deviation?
// Boat with compass. Magnetic north arrow vs deviated compass needle, angle shown.
export const Ill_09_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Boat hull — simple outline */}
    <path d="M 30 52 Q 60 62 90 52 L 84 44 Q 60 40 36 44 Z" {...P} />
    {/* Mast */}
    <line x1="60" y1="44" x2="60" y2="28" {...D} />
    {/* Compass housing circle inside boat */}
    <circle cx="60" cy="50" r="8" {...D} />
    {/* Magnetic north arrow — straight up from compass */}
    <line x1="60" y1="50" x2="60" y2="20" {...P} />
    <polyline points="57,28 60,20 63,28" {...P} />
    {/* Deviated compass needle — tilted ~12° right */}
    <line x1="60" y1="50" x2="71" y2="22" {...P} />
    <polyline points="68,30 71,22 66,28" {...P} />
    {/* Deviation arc */}
    <path d="M 60 28 A 22 22 0 0 1 69 26" {...D} />
  </svg>
)

// 09-compass-fc-2: True 080° + 5°W variation = Magnetic 085°
// Arc/angle diagram showing T→M conversion with westerly variation added.
export const Ill_09_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Compass circle */}
    <circle cx="42" cy="44" r="28" {...D} />
    {/* True north — straight up */}
    <line x1="42" y1="44" x2="42" y2="16" {...P} />
    <polyline points="39,24 42,16 45,24" {...P} />
    {/* True bearing 080° — nearly east, slight south */}
    <line x1="42" y1="44" x2="69" y2="49" {...P} />
    <polyline points="62,43 69,49 61,53" {...P} />
    {/* Magnetic bearing 085° — 5° further clockwise from true */}
    <line x1="42" y1="44" x2="69" y2="52" {...D} strokeDasharray="4 2" />
    {/* 5° variation arc near the bearing lines */}
    <path d="M 65 47 A 24 24 0 0 1 66 51" {...D} />
    {/* Arrow showing +5° addition — to the right of diagram */}
    <line x1="84" y1="35" x2="96" y2="35" {...P} />
    <polyline points="93,32 96,35 93,38" {...P} />
    {/* Stacked label bars — T on left, M on right (no text) */}
    <rect x="76" y="28" width="10" height="10" rx="1" {...D} />
    <rect x="98" y="28" width="10" height="10" rx="1" {...D} />
    {/* + 5° tick marks near arrow */}
    <line x1="88" y1="32" x2="88" y2="38" {...D} />
  </svg>
)

// 09-compass-fc-3: True → Magnetic → Compass (TVMDC)
// Three sequential arrows showing the conversion steps.
export const Ill_09_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Step 1 box — True */}
    <rect x="5" y="30" width="24" height="20" rx="3" {...P} />
    {/* Arrow True → Magnetic */}
    <line x1="29" y1="40" x2="46" y2="40" {...P} />
    <polyline points="43,37 46,40 43,43" {...P} />
    {/* Variation label arc above arrow */}
    <path d="M 32 40 Q 37 32 44 40" {...D} strokeDasharray="3 2" />
    {/* Step 2 box — Magnetic */}
    <rect x="46" y="30" width="28" height="20" rx="3" {...P} />
    {/* Arrow Magnetic → Compass */}
    <line x1="74" y1="40" x2="91" y2="40" {...P} />
    <polyline points="88,37 91,40 88,43" {...P} />
    {/* Deviation label arc above arrow */}
    <path d="M 77 40 Q 82 32 89 40" {...D} strokeDasharray="3 2" />
    {/* Step 3 box — Compass */}
    <rect x="91" y="30" width="24" height="20" rx="3" {...P} />
    {/* True north tick inside box 1 */}
    <line x1="17" y1="35" x2="17" y2="28" {...D} />
    <polyline points="15,31 17,27 19,31" {...D} />
    {/* Compass rose tick inside box 3 */}
    <circle cx="103" cy="40" r="5" {...D} />
    <line x1="103" y1="35" x2="103" y2="32" {...D} />
    <polyline points="101,34 103,31 105,34" {...D} />
    {/* Step label dashes under each box */}
    <line x1="5" y1="54" x2="29" y2="54" {...D} strokeDasharray="2 2" />
    <line x1="46" y1="54" x2="74" y2="54" {...D} strokeDasharray="2 2" />
    <line x1="91" y1="54" x2="115" y2="54" {...D} strokeDasharray="2 2" />
  </svg>
)

// 09-compass-fc-4: Where do you find variation? — On the chart compass rose
// Admiralty chart compass rose with outer true ring and inner magnetic ring.
export const Ill_09_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Outer true ring */}
    <circle cx="60" cy="40" r="32" {...P} />
    {/* Inner magnetic ring */}
    <circle cx="60" cy="40" r="22" {...D} />
    {/* Center small circle (variation value area) */}
    <circle cx="60" cy="40" r="8" {...D} />
    {/* True north point — outer ring */}
    <line x1="60" y1="40" x2="60" y2="8" {...P} />
    <polyline points="57,16 60,8 63,16" {...P} />
    {/* Magnetic north point — inner ring, slightly offset west */}
    <line x1="60" y1="40" x2="56" y2="18" {...D} />
    <polyline points="53,25 56,18 60,24" {...D} />
    {/* Cardinal tick marks on outer ring */}
    <line x1="92" y1="40" x2="88" y2="40" {...D} />
    <line x1="28" y1="40" x2="32" y2="40" {...D} />
    <line x1="60" y1="72" x2="60" y2="68" {...D} />
    {/* Variation arc between north arrows */}
    <path d="M 60 20 A 20 20 0 0 0 57 18" {...D} />
  </svg>
)

// 10-chartwork-fc-0: DR position (circle+dot) vs EP (triangle+dot)
// Two position symbols side by side on a chart section.
export const Ill_10_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Chart grid lines */}
    <line x1="10" y1="20" x2="110" y2="20" {...D} strokeDasharray="4 3" />
    <line x1="10" y1="40" x2="110" y2="40" {...D} strokeDasharray="4 3" />
    <line x1="10" y1="60" x2="110" y2="60" {...D} strokeDasharray="4 3" />
    <line x1="35" y1="10" x2="35" y2="70" {...D} strokeDasharray="4 3" />
    <line x1="85" y1="10" x2="85" y2="70" {...D} strokeDasharray="4 3" />
    {/* DR symbol — circle with center dot */}
    <circle cx="35" cy="40" r="12" {...P} />
    <circle cx="35" cy="40" r="2.5" stroke="var(--color-primary)" strokeWidth={2} fill="var(--color-primary)" />
    {/* EP symbol — triangle with center dot */}
    <polygon points="85,28 73,52 97,52" {...P} />
    <circle cx="85" cy="44" r="2.5" stroke="var(--color-primary)" strokeWidth={2} fill="var(--color-primary)" />
  </svg>
)

// 10-chartwork-fc-1: Three symbols — DR circle+dot, EP triangle+dot, Fix circle+cross
export const Ill_10_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* DR — circle with center dot */}
    <circle cx="20" cy="40" r="13" {...P} />
    <circle cx="20" cy="40" r="2.5" stroke="var(--color-primary)" strokeWidth={2} fill="var(--color-primary)" />
    {/* Separator line */}
    <line x1="44" y1="18" x2="44" y2="62" {...D} strokeDasharray="3 3" />
    {/* EP — triangle with center dot */}
    <polygon points="68,27 56,53 80,53" {...P} />
    <circle cx="68" cy="46" r="2.5" stroke="var(--color-primary)" strokeWidth={2} fill="var(--color-primary)" />
    {/* Separator line */}
    <line x1="90" y1="18" x2="90" y2="62" {...D} strokeDasharray="3 3" />
    {/* Fix — circle with cross */}
    <circle cx="105" cy="40" r="11" {...P} />
    <line x1="105" y1="29" x2="105" y2="51" {...P} />
    <line x1="94" y1="40" x2="116" y2="40" {...P} />
  </svg>
)

// 10-chartwork-fc-2: Course to Steer — vector triangle (water track + tide vector + ground track)
export const Ill_10_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Ground track — actual course made good, A to C */}
    <line x1="15" y1="65" x2="105" y2="20" {...P} />
    <polyline points="98,18 105,20 100,26" {...P} />
    {/* Water track — boat's heading through water, A to B */}
    <line x1="15" y1="65" x2="85" y2="28" {...P} strokeDasharray="6 3" />
    <polyline points="79,25 85,28 80,34" {...P} />
    {/* Tide vector — tidal stream, B to C */}
    <line x1="85" y1="28" x2="105" y2="20" {...D} />
    <polyline points="99,17 105,20 101,25" {...D} />
    {/* Point A — starting position */}
    <circle cx="15" cy="65" r="3" stroke="var(--color-primary)" strokeWidth={2} fill="var(--color-primary)" />
    {/* Point B — end of water track */}
    <circle cx="85" cy="28" r="2.5" stroke="var(--color-primary)" strokeWidth={2} fill="var(--color-primary)" />
    {/* Point C — actual position */}
    <circle cx="105" cy="20" r="3" stroke="var(--color-primary)" strokeWidth={2} fill="var(--color-primary)" />
    {/* Tide double-tick marks on tide vector */}
    <line x1="93" y1="26" x2="96" y2="21" {...D} />
    <line x1="96" y1="25" x2="99" y2="20" {...D} />
  </svg>
)

// 10-chartwork-fc-3: Cocked hat — three position lines forming a triangle, danger point marked
export const Ill_10_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Three bearing lines extending beyond the cocked hat */}
    <line x1="10" y1="15" x2="80" y2="68" {...D} strokeDasharray="5 3" />
    <line x1="110" y1="12" x2="40" y2="70" {...D} strokeDasharray="5 3" />
    <line x1="8" y1="58" x2="112" y2="42" {...D} strokeDasharray="5 3" />
    {/* Cocked hat triangle — the intersection triangle */}
    <polygon points="48,32 72,44 56,56" {...P} />
    {/* Shoal/hazard nearby — bottom left of triangle (most dangerous corner) */}
    <path d="M 30 68 Q 38 60 46 65 Q 42 72 30 68 Z" {...D} />
    {/* Danger X mark at nearest corner to hazard */}
    <line x1="44" y1="28" x2="52" y2="36" {...P} />
    <line x1="52" y1="28" x2="44" y2="36" {...P} />
    {/* Small depth sounding dots near hazard */}
    <circle cx="34" cy="63" r="1.5" stroke="var(--color-primary)" strokeWidth={1.5} fill="var(--color-primary)" />
    <circle cx="39" cy="66" r="1.5" stroke="var(--color-primary)" strokeWidth={1.5} fill="var(--color-primary)" />
  </svg>
)

// 10-chartwork-fc-4: GPS as one tool among many — GPS with alert + compass/DR backup
export const Ill_10_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* GPS device outline — left side */}
    <rect x="8" y="18" width="44" height="44" rx="4" {...P} />
    {/* GPS screen */}
    <rect x="13" y="23" width="34" height="26" rx="2" {...D} />
    {/* GPS satellite signal arcs */}
    <path d="M 22 31 A 8 8 0 0 1 38 31" {...D} />
    <path d="M 18 27 A 12 12 0 0 1 42 27" {...D} />
    {/* Warning triangle on GPS screen */}
    <polygon points="30,28 24,38 36,38" {...P} />
    <line x1="30" y1="31" x2="30" y2="35" {...D} />
    <circle cx="30" cy="37" r="1" stroke="var(--color-primary)" strokeWidth={1.5} fill="var(--color-primary)" />
    {/* Dividing line */}
    <line x1="60" y1="12" x2="60" y2="68" {...D} strokeDasharray="4 2" />
    {/* Right side — traditional compass rose */}
    <circle cx="90" cy="40" r="22" {...D} />
    <circle cx="90" cy="40" r="5" {...D} />
    {/* Compass north arrow */}
    <line x1="90" y1="40" x2="90" y2="18" {...P} />
    <polyline points="87,25 90,18 93,25" {...P} />
    {/* Compass cardinal ticks */}
    <line x1="112" y1="40" x2="108" y2="40" {...D} />
    <line x1="68" y1="40" x2="72" y2="40" {...D} />
    <line x1="90" y1="62" x2="90" y2="58" {...D} />
  </svg>
)

// 10-chartwork-fc-5: GPS straight line to waypoint crossing a shoal — danger of straight-line nav
export const Ill_10_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Boat — start position left */}
    <path d="M 8 52 Q 18 58 28 52 L 25 46 Q 18 43 11 46 Z" {...P} />
    {/* Waypoint flag — right side */}
    <line x1="100" y1="62" x2="100" y2="28" {...P} />
    <polygon points="100,28 115,34 100,40" {...P} />
    {/* GPS straight-line route — dashed, goes through shoal */}
    <line x1="22" y1="50" x2="100" y2="50" {...D} strokeDasharray="6 3" />
    <polyline points="96,47 100,50 96,53" {...D} />
    {/* Shoal / rock hazard in the middle of the straight line */}
    <path d="M 54 44 Q 62 38 70 44 Q 66 52 58 52 Q 52 50 54 44 Z" {...P} />
    {/* Hazard cross marks on the shoal */}
    <line x1="59" y1="41" x2="65" y2="47" {...D} />
    <line x1="65" y1="41" x2="59" y2="47" {...D} />
    {/* Safe route — curved arc going around the hazard above */}
    <path d="M 28 50 Q 44 28 62 26 Q 80 26 100 50" {...P} />
    <polyline points="96,47 100,50 96,53" {...P} />
  </svg>
)

export const registryEntries: Record<string, FC> = {
  '09-compass-fc-0': Ill_09_fc_0,
  '09-compass-fc-1': Ill_09_fc_1,
  '09-compass-fc-2': Ill_09_fc_2,
  '09-compass-fc-3': Ill_09_fc_3,
  '09-compass-fc-4': Ill_09_fc_4,
  '10-chartwork-fc-0': Ill_10_fc_0,
  '10-chartwork-fc-1': Ill_10_fc_1,
  '10-chartwork-fc-2': Ill_10_fc_2,
  '10-chartwork-fc-3': Ill_10_fc_3,
  '10-chartwork-fc-4': Ill_10_fc_4,
  '10-chartwork-fc-5': Ill_10_fc_5,
}
