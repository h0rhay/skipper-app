import type { FC } from 'react'

const P = { stroke: "var(--color-primary)", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" } as const
const D = { ...P, strokeWidth: 1.5 } as const

// 07-charts-and-publications-fc-0
// Underlined sounding figure indicating drying height above chart datum
export const Ill_07_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Chart border */}
    <rect x="8" y="8" width="104" height="64" rx="2" {...D} />
    {/* Normal soundings */}
    <text x="22" y="30" fontSize="9" stroke="var(--color-primary)" strokeWidth="1" fill="var(--color-primary)" fontFamily="monospace">12</text>
    <text x="80" y="28" fontSize="9" stroke="var(--color-primary)" strokeWidth="1" fill="var(--color-primary)" fontFamily="monospace">45</text>
    <text x="90" y="55" fontSize="9" stroke="var(--color-primary)" strokeWidth="1" fill="var(--color-primary)" fontFamily="monospace">8</text>
    <text x="28" y="58" fontSize="9" stroke="var(--color-primary)" strokeWidth="1" fill="var(--color-primary)" fontFamily="monospace">31</text>
    {/* Underlined sounding — centre of chart */}
    <text x="52" y="43" fontSize="11" stroke="var(--color-primary)" strokeWidth="1" fill="var(--color-primary)" fontFamily="monospace" fontWeight="bold">3</text>
    {/* Underline beneath the figure */}
    <line x1="50" y1="46" x2="62" y2="46" {...P} />
    {/* Drying rock symbol below — cross hatching suggestion */}
    <line x1="56" y1="50" x2="56" y2="58" {...D} />
    <line x1="51" y1="54" x2="61" y2="54" {...D} />
  </svg>
)

// 07-charts-and-publications-fc-1
// K12 (covers/uncovers — asterisk above water) vs K13 (submerged — cross)
export const Ill_07_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Waterline */}
    <line x1="8" y1="42" x2="112" y2="42" {...D} />
    {/* Wave hints */}
    <path d="M15 42 Q22 38 29 42 Q36 46 43 42" {...D} />
    {/* Divider */}
    <line x1="60" y1="10" x2="60" y2="72" {...D} strokeDasharray="3 3" />
    {/* K12 label area — left side */}
    {/* Asterisk / star shape for K12 (rock that covers and uncovers) */}
    <line x1="30" y1="22" x2="30" y2="34" {...P} />
    <line x1="24" y1="25" x2="36" y2="31" {...P} />
    <line x1="36" y1="25" x2="24" y2="31" {...P} />
    {/* K12 label */}
    <text x="22" y="56" fontSize="8" stroke="var(--color-primary)" strokeWidth="0.8" fill="var(--color-primary)" fontFamily="monospace">K12</text>
    <text x="16" y="65" fontSize="6.5" stroke="var(--color-primary)" strokeWidth="0.5" fill="var(--color-primary)" fontFamily="sans-serif">covers/uncovers</text>
    {/* K13 label area — right side */}
    {/* Cross / plus shape for K13 (always submerged) */}
    <line x1="88" y1="52" x2="88" y2="64" {...P} />
    <line x1="82" y1="58" x2="94" y2="58" {...P} />
    {/* K13 label */}
    <text x="80" y="72" fontSize="8" stroke="var(--color-primary)" strokeWidth="0.8" fill="var(--color-primary)" fontFamily="monospace">K13</text>
    <text x="67" y="20" fontSize="6.5" stroke="var(--color-primary)" strokeWidth="0.5" fill="var(--color-primary)" fontFamily="sans-serif">always submerged</text>
  </svg>
)

// 07-charts-and-publications-fc-2
// Light description format on Admiralty chart: Fl.R.4s
export const Ill_07_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Chart base */}
    <rect x="6" y="6" width="108" height="68" rx="2" {...D} />
    {/* Lighthouse symbol — circle with rays */}
    <circle cx="22" cy="38" r="5" {...P} />
    <line x1="22" y1="28" x2="22" y2="24" {...P} />
    <line x1="29" y1="31" x2="32" y2="28" {...P} />
    <line x1="29" y1="45" x2="32" y2="48" {...P} />
    <line x1="15" y1="31" x2="12" y2="28" {...P} />
    {/* Leader line to annotation */}
    <line x1="27" y1="35" x2="42" y2="30" {...D} />
    {/* Light description text broken into parts */}
    <text x="44" y="24" fontSize="8" stroke="var(--color-primary)" strokeWidth="0.8" fill="var(--color-primary)" fontFamily="monospace" fontWeight="bold">Fl</text>
    <text x="56" y="24" fontSize="8" stroke="var(--color-primary)" strokeWidth="0.8" fill="var(--color-primary)" fontFamily="monospace">.</text>
    <text x="60" y="24" fontSize="8" stroke="var(--color-primary)" strokeWidth="0.8" fill="var(--color-primary)" fontFamily="monospace" fontWeight="bold">R</text>
    <text x="68" y="24" fontSize="8" stroke="var(--color-primary)" strokeWidth="0.8" fill="var(--color-primary)" fontFamily="monospace">.</text>
    <text x="72" y="24" fontSize="8" stroke="var(--color-primary)" strokeWidth="0.8" fill="var(--color-primary)" fontFamily="monospace" fontWeight="bold">4s</text>
    {/* Component labels below */}
    <line x1="48" y1="26" x2="48" y2="36" {...D} />
    <text x="38" y="44" fontSize="6" stroke="var(--color-primary)" strokeWidth="0.5" fill="var(--color-primary)" fontFamily="sans-serif">character</text>
    <line x1="63" y1="26" x2="63" y2="36" {...D} />
    <text x="56" y="44" fontSize="6" stroke="var(--color-primary)" strokeWidth="0.5" fill="var(--color-primary)" fontFamily="sans-serif">colour</text>
    <line x1="77" y1="26" x2="77" y2="36" {...D} />
    <text x="70" y="44" fontSize="6" stroke="var(--color-primary)" strokeWidth="0.5" fill="var(--color-primary)" fontFamily="sans-serif">period</text>
    {/* Bracket under all three */}
    <path d="M38 46 L38 50 L85 50 L85 46" {...D} />
    <text x="44" y="60" fontSize="6.5" stroke="var(--color-primary)" strokeWidth="0.5" fill="var(--color-primary)" fontFamily="sans-serif">light description</text>
  </svg>
)

// 07-charts-and-publications-fc-3
// Longitude lines converge — can't use for distance measurement
export const Ill_07_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Chart outline */}
    <rect x="8" y="8" width="104" height="64" rx="2" {...D} />
    {/* Converging longitude lines (closer together at top) */}
    <line x1="30" y1="10" x2="24" y2="70" {...D} />
    <line x1="50" y1="10" x2="50" y2="70" {...D} />
    <line x1="70" y1="10" x2="76" y2="70" {...D} />
    <line x1="90" y1="10" x2="102" y2="70" {...D} />
    {/* Parallel latitude lines — evenly spaced */}
    <line x1="8" y1="28" x2="112" y2="28" {...D} strokeDasharray="4 2" />
    <line x1="8" y1="48" x2="112" y2="48" {...D} strokeDasharray="4 2" />
    {/* Dividers on longitude scale (top) — unequal gaps */}
    <line x1="28" y1="11" x2="28" y2="17" {...P} />
    <line x1="42" y1="11" x2="42" y2="17" />
    {/* Wrong indicator — X */}
    <line x1="32" y1="13" x2="38" y2="17" {...P} strokeWidth={2} />
    <line x1="38" y1="13" x2="32" y2="17" {...P} strokeWidth={2} />
    {/* Dividers on latitude scale (side) — equal gaps */}
    <line x1="9" y1="30" x2="15" y2="30" {...P} />
    <line x1="9" y1="46" x2="15" y2="46" {...P} />
    {/* Tick marks showing equal spacing on latitude */}
    <line x1="10" y1="30" x2="10" y2="46" {...D} />
    <text x="62" y="74" fontSize="6" stroke="var(--color-primary)" strokeWidth="0.5" fill="var(--color-primary)" fontFamily="sans-serif">longitude converges</text>
  </svg>
)

// 07-charts-and-publications-fc-4
// Magenta diamond with letter = GPS waypoint marker
export const Ill_07_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Chart base */}
    <rect x="6" y="6" width="108" height="68" rx="2" {...D} />
    {/* Coastline hint */}
    <path d="M6 55 Q20 50 28 58 Q36 65 50 62 Q60 60 68 65 Q80 70 90 64 Q100 58 114 60" {...D} />
    {/* Diamond shape — prominent centre */}
    <path d="M60 18 L76 38 L60 58 L44 38 Z" {...P} />
    {/* Letter A inside diamond */}
    <text x="55" y="42" fontSize="12" stroke="var(--color-primary)" strokeWidth="1" fill="var(--color-primary)" fontFamily="monospace" fontWeight="bold">A</text>
    {/* Small buoy symbol near diamond */}
    <circle cx="95" cy="38" r="4" {...D} />
    <line x1="95" y1="34" x2="95" y2="28" {...D} />
    <line x1="91" y1="28" x2="99" y2="28" {...D} />
    {/* Leader from diamond to buoy */}
    <line x1="76" y1="38" x2="91" y2="38" {...D} strokeDasharray="3 2" />
  </svg>
)

// 07-charts-and-publications-fc-5
// Chart corrections via Notices to Mariners
export const Ill_07_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Chart — left side */}
    <rect x="6" y="10" width="60" height="50" rx="2" {...D} />
    {/* Some chart detail lines */}
    <path d="M10 35 Q20 30 30 35 Q40 40 50 36" {...D} />
    <line x1="10" y1="48" x2="55" y2="48" {...D} strokeDasharray="3 2" />
    {/* Correction mark on chart — pencil circle */}
    <circle cx="38" cy="30" r="6" {...P} strokeDasharray="2 1" />
    {/* Pencil making correction */}
    <path d="M46 22 L52 16 L56 20 L50 26 Z" {...P} />
    <line x1="46" y1="22" x2="50" y2="26" {...D} />
    <line x1="50" y1="14" x2="54" y2="18" {...D} />
    {/* NtM document — right side */}
    <rect x="72" y="12" width="42" height="52" rx="2" {...P} />
    {/* Document fold corner */}
    <path d="M100 12 L114 12 L114 26 L100 26 Z" {...D} />
    <path d="M100 12 L100 26 L114 26" {...D} />
    {/* Text lines on document */}
    <line x1="76" y1="22" x2="96" y2="22" {...D} />
    <line x1="76" y1="28" x2="96" y2="28" {...D} />
    <line x1="76" y1="34" x2="104" y2="34" {...D} />
    <line x1="76" y1="40" x2="104" y2="40" {...D} />
    {/* NM label */}
    <text x="76" y="54" fontSize="7" stroke="var(--color-primary)" strokeWidth="0.8" fill="var(--color-primary)" fontFamily="monospace">NtM</text>
  </svg>
)

// 08-navigational-instruments-fc-0
// Parallel rulers walking across chart from compass rose to course line
export const Ill_08_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Chart base */}
    <rect x="4" y="4" width="112" height="72" rx="2" {...D} />
    {/* Compass rose — left side, small */}
    <circle cx="22" cy="40" r="12" {...D} />
    <line x1="22" y1="28" x2="22" y2="32" {...P} />
    <line x1="22" y1="48" x2="22" y2="52" {...P} />
    <line x1="10" y1="40" x2="14" y2="40" {...P} />
    <line x1="30" y1="40" x2="34" y2="40" {...P} />
    {/* Parallel rulers — two rectangular bars with hinge */}
    {/* First ruler position */}
    <rect x="38" y="32" width="36" height="6" rx="1" {...P} />
    {/* Second ruler position (stepped) */}
    <rect x="52" y="44" width="36" height="6" rx="1" {...P} />
    {/* Hinge/pivot connecting mechanism */}
    <line x1="48" y1="38" x2="56" y2="44" {...D} />
    <line x1="68" y1="38" x2="76" y2="44" {...D} />
    {/* Course line on chart */}
    <line x1="88" y1="20" x2="108" y2="60" {...P} />
    {/* Arrow showing direction of walk */}
    <path d="M86 40 L92 36 L90 42 Z" {...D} />
  </svg>
)

// 08-navigational-instruments-fc-1
// Dividers on longitude (top/bottom) vs latitude (side) — can't use longitude for distance
export const Ill_08_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Chart outline */}
    <rect x="8" y="8" width="104" height="64" rx="2" {...D} />
    {/* Converging longitude lines */}
    <line x1="32" y1="9" x2="27" y2="71" {...D} />
    <line x1="56" y1="9" x2="56" y2="71" {...D} />
    <line x1="80" y1="9" x2="85" y2="71" {...D} />
    {/* Horizontal latitude lines */}
    <line x1="8" y1="30" x2="112" y2="30" {...D} strokeDasharray="4 2" />
    <line x1="8" y1="52" x2="112" y2="52" {...D} strokeDasharray="4 2" />
    {/* Dividers on top (longitude) — wrong usage */}
    {/* Divider left leg */}
    <line x1="36" y1="14" x2="40" y2="22" {...P} />
    {/* Divider right leg */}
    <line x1="52" y1="14" x2="48" y2="22" {...P} />
    {/* Divider hinge */}
    <circle cx="44" cy="12" r="2" {...P} />
    {/* Unequal spacing arrows at bottom of those longitude lines */}
    <line x1="27" y1="66" x2="56" y2="66" {...D} />
    <line x1="56" y1="66" x2="85" y2="66" {...D} />
    {/* X mark over top dividers = wrong */}
    <line x1="38" y1="10" x2="50" y2="18" {...P} strokeWidth={2} />
    <line x1="50" y1="10" x2="38" y2="18" {...P} strokeWidth={2} />
    {/* Dividers on side (latitude) — correct */}
    <line x1="9" y1="32" x2="14" y2="38" {...P} />
    <line x1="9" y1="50" x2="14" y2="44" {...P} />
    <circle cx="8" cy="41" r="2" {...P} />
  </svg>
)

// 08-navigational-instruments-fc-2
// Portland/Breton plotter — rectangular with rotating compass disc
export const Ill_08_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Chart base */}
    <rect x="4" y="4" width="112" height="72" rx="2" {...D} />
    {/* Some chart lines for context */}
    <line x1="4" y1="40" x2="116" y2="40" {...D} strokeDasharray="5 3" />
    <line x1="60" y1="4" x2="60" y2="76" {...D} strokeDasharray="5 3" />
    {/* Portland plotter body — rectangle */}
    <rect x="28" y="18" width="64" height="44" rx="2" {...P} />
    {/* Rotating compass rose disc — inset circle */}
    <circle cx="60" cy="40" r="16" {...P} />
    {/* Compass markings on disc */}
    <line x1="60" y1="24" x2="60" y2="28" {...D} />
    <line x1="60" y1="52" x2="60" y2="56" {...D} />
    <line x1="44" y1="40" x2="48" y2="40" {...D} />
    <line x1="72" y1="40" x2="76" y2="40" {...D} />
    {/* North indicator on disc */}
    <path d="M57 27 L60 23 L63 27" {...D} />
    {/* Course line through plotter */}
    <line x1="28" y1="40" x2="92" y2="40" {...P} />
    {/* Rotation indicator arc */}
    <path d="M68 32 A10 10 0 0 1 72 40" {...D} strokeDasharray="2 1" />
    <path d="M70 31 L68 32 L72 34" {...D} />
  </svg>
)

// 08-navigational-instruments-fc-3
// Pencil (removable) vs pen (permanent) — always use pencil for chartwork
export const Ill_08_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Pencil — left side, large */}
    {/* Body */}
    <rect x="14" y="22" width="12" height="38" rx="1" {...P} />
    {/* Tip / point */}
    <path d="M14 60 L20 72 L26 60" {...P} />
    {/* Lead tip */}
    <circle cx="20" cy="72" r="1.5" {...P} />
    {/* Eraser band */}
    <rect x="14" y="18" width="12" height="6" rx="1" {...P} />
    {/* Eraser top */}
    <rect x="15" y="14" width="10" height="4" rx="1" {...P} />
    {/* Pencil wood grain lines */}
    <line x1="18" y1="22" x2="18" y2="60" {...D} />
    {/* Tick / checkmark over pencil */}
    <path d="M10 36 L16 44 L30 28" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Light pencil line on chart — right */}
    <path d="M44 50 Q70 30 96 45" {...D} strokeDasharray="3 1" />
    {/* Pen — right side, smaller */}
    <rect x="86" y="26" width="8" height="30" rx="2" {...P} />
    <path d="M86 56 L90 66 L94 56" {...P} />
    {/* Pen clip */}
    <line x1="94" y1="28" x2="98" y2="36" {...D} />
    {/* X mark over pen */}
    <line x1="82" y1="28" x2="98" y2="44" {...P} strokeWidth={2.5} />
    <line x1="98" y1="28" x2="82" y2="44" {...P} strokeWidth={2.5} />
  </svg>
)

// 08-navigational-instruments-fc-4
// Dividers on latitude scale — read at SAME latitude as position
export const Ill_08_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Chart outline */}
    <rect x="8" y="6" width="104" height="68" rx="2" {...D} />
    {/* Latitude scale on left margin */}
    <rect x="8" y="6" width="14" height="68" rx="1" {...D} />
    {/* Latitude tick marks */}
    <line x1="16" y1="18" x2="22" y2="18" {...D} />
    <line x1="16" y1="30" x2="22" y2="30" {...D} />
    <line x1="16" y1="42" x2="22" y2="42" {...D} />
    <line x1="16" y1="54" x2="22" y2="54" {...D} />
    <line x1="16" y1="66" x2="22" y2="66" {...D} />
    {/* Smaller ticks */}
    <line x1="18" y1="24" x2="22" y2="24" {...D} />
    <line x1="18" y1="36" x2="22" y2="36" {...D} />
    <line x1="18" y1="48" x2="22" y2="48" {...D} />
    <line x1="18" y1="60" x2="22" y2="60" {...D} />
    {/* Position being measured — horizontal dashed line */}
    <line x1="22" y1="42" x2="112" y2="42" {...D} strokeDasharray="4 2" />
    {/* Chart feature at that latitude */}
    <circle cx="80" cy="42" r="4" {...P} />
    {/* Dividers — legs touching latitude scale at SAME latitude */}
    {/* Left leg of dividers */}
    <line x1="26" y1="34" x2="22" y2="42" {...P} />
    {/* Right leg of dividers */}
    <line x1="26" y1="50" x2="22" y2="42" {...P} />
    {/* Divider hinge */}
    <circle cx="26" cy="42" r="2.5" {...P} />
    {/* Arrow highlighting correct level */}
    <path d="M38 42 L32 38 L32 46 Z" {...P} />
    {/* Wrong position indicators — top and bottom with X */}
    <line x1="22" y1="15" x2="26" y2="19" {...P} />
    <line x1="26" y1="15" x2="22" y2="19" {...P} />
    <line x1="22" y1="63" x2="26" y2="67" {...P} />
    <line x1="26" y1="63" x2="22" y2="67" {...P} />
  </svg>
)

export const registryEntries: Record<string, FC> = {
  '07-charts-and-publications-fc-0': Ill_07_fc_0,
  '07-charts-and-publications-fc-1': Ill_07_fc_1,
  '07-charts-and-publications-fc-2': Ill_07_fc_2,
  '07-charts-and-publications-fc-3': Ill_07_fc_3,
  '07-charts-and-publications-fc-4': Ill_07_fc_4,
  '07-charts-and-publications-fc-5': Ill_07_fc_5,
  '08-navigational-instruments-fc-0': Ill_08_fc_0,
  '08-navigational-instruments-fc-1': Ill_08_fc_1,
  '08-navigational-instruments-fc-2': Ill_08_fc_2,
  '08-navigational-instruments-fc-3': Ill_08_fc_3,
  '08-navigational-instruments-fc-4': Ill_08_fc_4,
}
