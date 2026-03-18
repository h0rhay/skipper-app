import type { FC } from 'react'

const P = { stroke: "var(--color-primary)", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" } as const
const D = { ...P, strokeWidth: 1.5 } as const

// 05-irpcs-colregs-fc-0
// Two boats on converging courses with parallel bearing lines showing no bearing change = collision risk
export const Ill_05_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Boat A — bottom left, heading upper-right */}
    <path d="M18 60 L14 66 L28 66 L26 60 Z" {...P} />
    <path d="M22 60 L22 54" {...P} />
    {/* Boat B — upper right, heading lower-left */}
    <path d="M88 18 L84 24 L98 24 L96 18 Z" {...P} />
    <path d="M92 18 L92 12" {...P} />
    {/* Converging course arrows */}
    <path d="M26 56 L82 26" {...D} strokeDasharray="4 3" />
    {/* Bearing line from A to B — position 1 */}
    <path d="M22 60 L92 22" {...D} />
    {/* Bearing line from A to B — position 2 (parallel, same bearing = danger) */}
    <path d="M35 52 L105 14" {...D} />
    {/* Parallel indicator marks */}
    <path d="M52 44 L55 42" {...P} />
    <path d="M68 34 L71 32" {...P} />
  </svg>
)

// 05-irpcs-colregs-fc-1
// Crossing situation: boat from right has right of way, left boat gives way with curved arrow
export const Ill_05_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Stand-on boat — coming from RIGHT, heading left */}
    <path d="M78 38 L74 32 L96 32 L94 38 Z" {...P} />
    <path d="M86 32 L86 26" {...P} />
    {/* Stand-on straight arrow (maintaining course) */}
    <path d="M72 35 L52 35" {...P} />
    <path d="M56 31 L52 35 L56 39" {...P} />
    {/* Give-way boat — approaching from LEFT, heading right */}
    <path d="M24 52 L20 46 L42 46 L40 52 Z" {...P} />
    <path d="M32 46 L32 40" {...P} />
    {/* Give-way curved avoidance arrow (turn right/south to avoid) */}
    <path d="M44 49 Q58 49 62 60 L58 58" {...P} />
    <path d="M62 60 L66 57" {...P} />
    {/* Right-of-way indicator */}
    <path d="M100 30 L108 30 L108 22 L100 22" {...D} />
  </svg>
)

// 05-irpcs-colregs-fc-2
// Head-on situation: both vessels turning RIGHT (port-to-port passing)
export const Ill_05_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Left boat heading right */}
    <path d="M18 36 L14 30 L36 30 L34 36 Z" {...P} />
    <path d="M26 30 L26 24" {...P} />
    {/* Right boat heading left */}
    <path d="M102 44 L98 38 L82 38 L86 44 Z" {...P} />
    <path d="M94 38 L94 32" {...P} />
    {/* Left boat turns RIGHT (downward) */}
    <path d="M36 33 Q50 33 54 46" {...P} />
    <path d="M54 46 L50 43" {...P} />
    <path d="M54 46 L58 43" {...P} />
    {/* Right boat turns RIGHT (also downward from its perspective = upward on page) */}
    <path d="M82 41 Q68 41 64 54" {...P} />
    <path d="M64 54 L60 51" {...P} />
    <path d="M64 54 L68 51" {...P} />
    {/* Dotted original head-on course line */}
    <path d="M38 33 L80 41" {...D} strokeDasharray="3 3" />
  </svg>
)

// 05-irpcs-colregs-fc-3
// Vessel hierarchy: NUC/fishing > sailing > power (three boat silhouettes stacked)
export const Ill_05_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* 1st priority — NUC / fishing vessel with nets, top */}
    <path d="M20 16 L16 22 L38 22 L36 16 Z" {...P} />
    <path d="M28 16 L28 10" {...P} />
    {/* Net/fishing lines trailing */}
    <path d="M36 18 Q48 14 52 22 Q48 28 36 22" {...D} />
    {/* 2nd priority — sailing vessel, middle */}
    <path d="M56 42 L52 48 L74 48 L72 42 Z" {...P} />
    <path d="M64 42 L64 28 L72 42" {...P} />
    {/* 3rd priority — power vessel, bottom */}
    <path d="M86 62 L82 68 L104 68 L102 62 Z" {...P} />
    <path d="M94 62 L94 56" {...P} />
    {/* Propeller indicator */}
    <path d="M94 70 Q96 73 98 70 Q96 67 94 70" {...D} />
    {/* Priority arrows downward */}
    <path d="M44 22 L50 30" {...D} />
    <path d="M76 48 L82 56" {...D} />
    <path d="M50 30 L47 28" {...D} />
    <path d="M82 56 L79 54" {...D} />
  </svg>
)

// 05-irpcs-colregs-fc-4
// Sailing vessel with inverted cone day shape (motor-sailing)
export const Ill_05_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Boat hull */}
    <path d="M30 52 L26 60 L74 60 L70 52 Z" {...P} />
    {/* Mast */}
    <path d="M50 52 L50 18" {...P} />
    {/* Mainsail */}
    <path d="M50 20 L68 52 L50 52 Z" {...P} />
    {/* Headsail */}
    <path d="M50 28 L32 52 L50 52" {...P} />
    {/* Inverted cone day shape on forestay/mast — point downward */}
    <path d="M50 8 L44 18 L56 18 Z" {...P} />
    {/* Propeller / motor indicator at stern */}
    <path d="M68 62 Q71 65 74 62 Q71 59 68 62" {...D} />
    {/* Wake lines indicating motoring */}
    <path d="M76 58 Q82 56 88 58" {...D} />
    <path d="M76 62 Q82 60 88 62" {...D} />
  </svg>
)

// 05-irpcs-colregs-fc-5
// Stand-on vessel maintaining course, give-way vessel altering course
export const Ill_05_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Stand-on vessel — top, straight arrow */}
    <path d="M72 22 L68 16 L90 16 L88 22 Z" {...P} />
    <path d="M80 16 L80 10" {...P} />
    {/* Stand-on straight bold arrow */}
    <path d="M66 19 L20 19" {...P} />
    <path d="M26 15 L20 19 L26 23" {...P} />
    {/* Give-way vessel — bottom left, curved avoidance arrow */}
    <path d="M24 52 L20 46 L42 46 L40 52 Z" {...P} />
    <path d="M32 46 L32 40" {...P} />
    {/* Give-way curved arrow turning away */}
    <path d="M44 49 Q60 49 66 62" {...P} />
    <path d="M66 62 L62 59" {...P} />
    <path d="M66 62 L70 59" {...P} />
    {/* Stand-on indicator: double line = hold course */}
    <path d="M92 14 L100 14 L100 24 L92 24" {...D} />
  </svg>
)

// 05-irpcs-colregs-fc-6
// Narrow channel: large ship fills channel, small sailing boat moves aside
export const Ill_05_fc_6: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Channel banks */}
    <path d="M10 20 L10 60" {...P} />
    <path d="M110 20 L110 60" {...P} />
    {/* Channel boundary markings */}
    <path d="M10 20 L18 14" {...D} />
    <path d="M10 32 L18 26" {...D} />
    <path d="M10 44 L18 38" {...D} />
    <path d="M10 56 L18 50" {...D} />
    <path d="M110 20 L102 14" {...D} />
    <path d="M110 32 L102 26" {...D} />
    <path d="M110 44 L102 38" {...D} />
    <path d="M110 56 L102 50" {...D} />
    {/* Large ship filling channel */}
    <path d="M30 28 L22 42 L98 42 L90 28 Z" {...P} />
    <path d="M60 28 L60 20" {...P} />
    <path d="M50 20 L70 20" {...P} />
    {/* Small sailing boat tucked to edge */}
    <path d="M16 54 L14 58 L22 58 L20 54 Z" {...P} />
    <path d="M18 54 L18 48 L22 54" {...D} />
    {/* Arrow showing small boat moving to edge */}
    <path d="M24 56 L12 56" {...D} />
    <path d="M15 53 L12 56 L15 59" {...D} />
  </svg>
)

// 05-irpcs-colregs-fc-7
// Five short blasts — boat with foghorn and 5 sound wave bursts
export const Ill_05_fc_7: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Boat hull */}
    <path d="M12 46 L8 54 L52 54 L48 46 Z" {...P} />
    {/* Mast / superstructure */}
    <path d="M30 46 L30 36" {...P} />
    <path d="M24 36 L36 36" {...P} />
    {/* Horn pointing right */}
    <path d="M36 36 L46 32 L46 40 L36 36 Z" {...P} />
    {/* 5 short blast arcs — evenly spaced */}
    <path d="M50 30 Q56 36 50 42" {...P} />
    <path d="M56 26 Q65 36 56 46" {...P} />
    <path d="M62 22 Q74 36 62 50" {...D} />
    <path d="M68 18 Q83 36 68 54" {...D} />
    <path d="M74 14 Q92 36 74 58" {...D} />
    {/* Wake lines */}
    <path d="M54 56 Q62 54 70 56" {...D} />
  </svg>
)

// 06-position-course-speed-fc-0
// 1852m nautical mile vs 1000m kilometre scale comparison
export const Ill_06_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Nautical mile bar — longer */}
    <path d="M10 30 L98 30" {...P} />
    <path d="M10 26 L10 34" {...P} />
    <path d="M98 26 L98 34" {...P} />
    {/* 1852 tick marks along nautical mile */}
    <path d="M34 28 L34 32" {...D} />
    <path d="M58 28 L58 32" {...D} />
    <path d="M82 28 L82 32" {...D} />
    {/* Kilometre bar — shorter for comparison */}
    <path d="M10 52 L58 52" {...P} />
    <path d="M10 48 L10 56" {...P} />
    <path d="M58 48 L58 56" {...P} />
    {/* Compass arc suggesting nautical context */}
    <path d="M104 24 Q114 30 104 36" {...D} />
    <path d="M100 20 Q114 30 100 40" {...D} />
    {/* Labels area — bracket for nautical mile */}
    <path d="M98 30 Q108 30 108 38" {...D} />
    <path d="M58 52 Q66 52 66 60" {...D} />
  </svg>
)

// 06-position-course-speed-fc-1
// Knot: traditional knotted rope log trailing behind boat
export const Ill_06_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Boat hull */}
    <path d="M10 32 L6 40 L46 40 L42 32 Z" {...P} />
    <path d="M26 32 L26 24" {...P} />
    {/* Log line trailing behind */}
    <path d="M6 38 Q20 50 40 52 Q60 54 80 50 Q100 46 108 42" {...P} />
    {/* Knots on the rope — small loops at intervals */}
    <path d="M48 52 Q50 48 52 52 Q50 56 48 52" {...P} />
    <path d="M66 51 Q68 47 70 51 Q68 55 66 51" {...P} />
    <path d="M84 48 Q86 44 88 48 Q86 52 84 48" {...P} />
    {/* Speed arrow / water wake */}
    <path d="M46 38 Q60 36 74 38" {...D} />
    <path d="M46 42 Q60 40 74 42" {...D} />
    {/* Log board at end */}
    <path d="M106 38 L112 38 L112 46 L106 46 Z" {...P} />
  </svg>
)

// 06-position-course-speed-fc-2
// One minute of latitude = 1 nautical mile: arc with angle marked
export const Ill_06_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Globe arc — large circle segment */}
    <path d="M60 75 Q10 75 10 25 Q10 5 60 5 Q110 5 110 25 Q110 75 60 75 Z" {...D} strokeDasharray="4 3" />
    {/* Solid arc segment showing one degree */}
    <path d="M60 75 L60 5" {...D} />
    <path d="M60 75 L30 12" {...P} />
    {/* One-degree arc */}
    <path d="M60 28 Q47 22 43 35" {...P} />
    {/* Minute subdivision marks on the arc */}
    <path d="M51 13 Q48 17 45 21" {...D} />
    {/* Highlight one minute = 1nm */}
    <path d="M56 11 Q50 13 46 18" {...P} />
    <path d="M56 11 L60 14" {...D} />
    {/* Distance arrow alongside */}
    <path d="M26 14 L26 44" {...P} />
    <path d="M22 18 L26 14 L30 18" {...P} />
    <path d="M22 40 L26 44 L30 40" {...P} />
    {/* Parallel latitude lines */}
    <path d="M35 60 L85 60" {...D} strokeDasharray="3 2" />
    <path d="M30 48 L90 48" {...D} strokeDasharray="3 2" />
  </svg>
)

// 06-position-course-speed-fc-3
// Longitude lines converging at poles vs parallel latitude lines
export const Ill_06_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Globe outline */}
    <ellipse cx="60" cy="40" rx="50" ry="36" {...P} />
    {/* Longitude lines — converging toward top and bottom poles */}
    <path d="M60 4 Q40 40 60 76" {...P} />
    <path d="M60 4 Q48 40 56 76" {...D} />
    <path d="M60 4 Q72 40 64 76" {...D} />
    <path d="M60 4 Q80 40 74 76" {...D} />
    <path d="M60 4 Q20 40 34 76" {...D} />
    {/* Latitude lines — parallel horizontal */}
    <path d="M12 28 L108 28" {...P} />
    <path d="M10 40 L110 40" {...D} />
    <path d="M12 52 L108 52" {...D} />
    {/* X mark over longitude scale — unreliable */}
    <path d="M96 64 L108 74" {...P} />
    <path d="M108 64 L96 74" {...P} />
    {/* Checkmark over latitude scale */}
    <path d="M8 64 L14 70 L22 62" {...P} />
  </svg>
)

// 06-position-course-speed-fc-4
// Three compass arrows: True (T), Magnetic (M), Compass (C) fanning out
export const Ill_06_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Base compass circle */}
    <circle cx="60" cy="58" r="8" {...D} />
    {/* True north arrow — straight up, bold */}
    <path d="M60 50 L60 14" {...P} />
    <path d="M56 20 L60 14 L64 20" {...P} />
    {/* Magnetic north arrow — offset left (variation) */}
    <path d="M60 50 L50 16" {...P} />
    <path d="M47 23 L50 16 L55 21" {...P} />
    {/* Compass north arrow — further offset left (variation + deviation) */}
    <path d="M60 50 L42 20" {...D} />
    <path d="M40 27 L42 20 L47 24" {...D} />
    {/* Angle arcs showing offsets */}
    <path d="M60 30 Q56 28 54 32" {...D} />
    <path d="M54 32 Q50 30 48 34" {...D} />
    {/* Labels guide lines */}
    <path d="M60 14 L68 10" {...D} />
    <path d="M50 16 L42 12" {...D} />
    <path d="M42 20 L34 16" {...D} />
  </svg>
)

// 06-position-course-speed-fc-5
// Coordinate grid showing LAT first (horizontal lines) then LON (vertical)
export const Ill_06_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Grid — latitude lines (horizontal) */}
    <path d="M15 20 L105 20" {...P} />
    <path d="M15 40 L105 40" {...P} />
    <path d="M15 60 L105 60" {...P} />
    {/* Grid — longitude lines (vertical) */}
    <path d="M35 10 L35 70" {...D} />
    <path d="M60 10 L60 70" {...D} />
    <path d="M85 10 L85 70" {...D} />
    {/* Position point */}
    <circle cx="85" cy="20" r="4" {...P} />
    {/* Latitude reference arrow (horizontal, numbered up/down) */}
    <path d="M15 20 L10 20" {...P} />
    <path d="M13 17 L10 20 L13 23" {...P} />
    {/* Longitude reference arrow (vertical, numbered left/right) */}
    <path d="M85 70 L85 75" {...P} />
    <path d="M82 72 L85 75 L88 72" {...P} />
    {/* Step 1 bracket — latitude line to point (horizontal) */}
    <path d="M85 20 Q95 20 100 12" {...P} />
    <path d="M98 16 L100 12 L103 15" {...P} />
    {/* Step 2 bracket — longitude line to point (vertical) */}
    <path d="M85 20 Q85 10 94 8" {...D} />
  </svg>
)

// 06-position-course-speed-fc-6
// Relative bearing: ship bow as 0°, object at 045° relative vs true north
export const Ill_06_fc_6: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Boat at center, pointing upward */}
    <path d="M60 48 L54 64 L66 64 L60 48 Z" {...P} />
    {/* Boat bow direction (ship's head) — straight up */}
    <path d="M60 48 L60 22" {...D} strokeDasharray="3 3" />
    {/* True north arrow */}
    <path d="M60 40 L44 16" {...P} />
    <path d="M44 23 L44 16 L50 19" {...P} />
    {/* Object / landmark */}
    <circle cx="96" cy="18" r="5" {...P} />
    {/* Relative bearing line from boat to object */}
    <path d="M60 48 L92 22" {...P} />
    {/* Relative bearing arc (from bow 0° to bearing line) */}
    <path d="M60 34 Q66 30 68 36" {...P} />
    {/* True bearing arc (from true north to bearing line) */}
    <path d="M54 28 Q58 22 62 24" {...D} />
    {/* Compass rose hint */}
    <circle cx="60" cy="48" r="18" {...D} strokeDasharray="2 4" />
  </svg>
)

export const registryEntries: Record<string, FC> = {
  '05-irpcs-colregs-fc-0': Ill_05_fc_0,
  '05-irpcs-colregs-fc-1': Ill_05_fc_1,
  '05-irpcs-colregs-fc-2': Ill_05_fc_2,
  '05-irpcs-colregs-fc-3': Ill_05_fc_3,
  '05-irpcs-colregs-fc-4': Ill_05_fc_4,
  '05-irpcs-colregs-fc-5': Ill_05_fc_5,
  '05-irpcs-colregs-fc-6': Ill_05_fc_6,
  '05-irpcs-colregs-fc-7': Ill_05_fc_7,
  '06-position-course-speed-fc-0': Ill_06_fc_0,
  '06-position-course-speed-fc-1': Ill_06_fc_1,
  '06-position-course-speed-fc-2': Ill_06_fc_2,
  '06-position-course-speed-fc-3': Ill_06_fc_3,
  '06-position-course-speed-fc-4': Ill_06_fc_4,
  '06-position-course-speed-fc-5': Ill_06_fc_5,
  '06-position-course-speed-fc-6': Ill_06_fc_6,
}
