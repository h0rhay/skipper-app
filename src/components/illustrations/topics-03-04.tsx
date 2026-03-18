import type { FC } from 'react'

const P = { stroke: "var(--color-primary)", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" } as const
const D = { ...P, strokeWidth: 1.5 } as const

// 03-anchorwork-fc-0
// Chain rode at ~30° angle (3:1 scope). Boat on surface, chain to seabed anchor.
export const Ill_03_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Waterline */}
    <line x1="10" y1="28" x2="110" y2="28" {...D} strokeDasharray="6 3" />
    {/* Boat hull */}
    <path d="M30 28 L25 36 L55 36 L50 28" {...P} />
    {/* Seabed */}
    <path d="M10 70 L110 70" {...P} />
    {/* Chain rode (segmented line = chain) */}
    <path d="M40 36 L18 68" {...P} />
    {/* Chain links detail */}
    <path d="M36 42 L34 40 M30 50 L28 48 M24 58 L22 56" {...D} />
    {/* Anchor on seabed */}
    <path d="M14 68 L12 72 L20 72 M16 68 L16 63 M12 65 L16 63 L20 65" {...P} />
    {/* Depth arrow (vertical) */}
    <line x1="100" y1="30" x2="100" y2="68" {...D} />
    <path d="M97 65 L100 70 L103 65" {...D} />
    {/* Scope length arrow (diagonal, longer) */}
    <line x1="105" y1="30" x2="105" y2="68" {...D} strokeDasharray="3 2" />
  </svg>
)

// 03-anchorwork-fc-1
// Warp rode — longer rope, steeper angle, ~5:1 scope shown
export const Ill_03_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Waterline */}
    <line x1="10" y1="24" x2="110" y2="24" {...D} strokeDasharray="6 3" />
    {/* Boat hull */}
    <path d="M60 24 L55 32 L85 32 L80 24" {...P} />
    {/* Seabed */}
    <path d="M10 70 L110 70" {...P} />
    {/* Rope warp — long, shallow angle (5:1 scope) */}
    <path d="M68 32 C50 40 30 55 15 68" {...P} />
    {/* Rope texture — small ticks */}
    <path d="M55 38 L53 36 M42 47 L40 45 M29 56 L27 54" {...D} />
    {/* Anchor on seabed */}
    <path d="M11 68 L9 72 L17 72 M13 68 L13 63 M9 65 L13 63 L17 65" {...P} />
    {/* Depth arrow */}
    <line x1="98" y1="26" x2="98" y2="68" {...D} />
    <path d="M95 65 L98 70 L101 65" {...D} />
    {/* Scope arrow (much longer horizontal span) */}
    <line x1="15" y1="74" x2="68" y2="74" {...D} />
    <path d="M18 71 L13 74 L18 77" {...D} />
    <path d="M65 71 L70 74 L65 77" {...D} />
  </svg>
)

// 03-anchorwork-fc-2
// Bruce/claw anchor — distinctive claw shape suited to rocky/weedy seabeds
export const Ill_03_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Anchor rode */}
    <line x1="60" y1="5" x2="60" y2="28" {...P} />
    {/* Bruce/claw anchor shank */}
    <path d="M60 28 L60 48" {...P} />
    {/* Claw flukes — three curved claws */}
    <path d="M60 48 C55 48 45 52 42 62 C40 68 46 70 50 65 C54 60 58 54 60 52" {...P} />
    <path d="M60 48 C65 48 75 52 78 62 C80 68 74 70 70 65 C66 60 62 54 60 52" {...P} />
    <path d="M60 48 C60 50 58 56 58 62 C58 68 62 68 62 62 C62 56 60 50 60 48" {...D} />
    {/* Rocky seabed */}
    <path d="M10 75 L30 68 L45 73 L60 67 L75 72 L90 66 L110 75" {...P} />
    {/* Rock texture */}
    <path d="M25 70 L28 66 L32 70 M65 68 L68 64 L72 68 M85 68 L88 63 L92 68" {...D} />
    {/* Weed suggestion */}
    <path d="M48 72 C46 68 50 65 48 62 M75 70 C73 66 77 63 75 60" {...D} />
  </svg>
)

// 03-anchorwork-fc-3
// Danforth anchor buried deep in soft mud — difficult recovery
export const Ill_03_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Waterline */}
    <line x1="10" y1="20" x2="110" y2="20" {...D} strokeDasharray="6 3" />
    {/* Seabed surface */}
    <path d="M10 42 L110 42" {...P} />
    {/* Mud layers (wavy lines) */}
    <path d="M15 48 C25 46 35 50 45 48 C55 46 65 50 75 48 C85 46 95 50 105 48" {...D} />
    <path d="M15 56 C25 54 35 58 45 56 C55 54 65 58 75 56 C85 54 95 58 105 56" {...D} />
    <path d="M15 64 C25 62 35 66 45 64 C55 62 65 66 75 64 C85 62 95 66 105 64" {...D} />
    {/* Anchor rode going into mud */}
    <line x1="60" y1="20" x2="60" y2="42" {...P} />
    <line x1="60" y1="42" x2="60" y2="52" {...P} strokeDasharray="3 2" />
    {/* Danforth anchor — flat parallel flukes, buried */}
    <path d="M52 58 L68 58" {...P} />
    <path d="M60 52 L60 62" {...P} />
    <path d="M48 60 L52 58 L52 68 L48 60 M72 60 L68 58 L68 68 L72 60" {...P} />
    {/* Upward pull arrow — recovery effort */}
    <line x1="75" y1="52" x2="75" y2="32" {...P} />
    <path d="M72 36 L75 30 L78 36" {...P} />
  </svg>
)

// 03-anchorwork-fc-4
// Cross-section of seabed: sand (dots) and mud (wavy). Anchor set in each.
export const Ill_03_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Waterline */}
    <line x1="10" y1="15" x2="110" y2="15" {...D} strokeDasharray="5 3" />
    {/* Centre divider */}
    <line x1="60" y1="15" x2="60" y2="78" {...D} strokeDasharray="4 3" />
    {/* Seabed surface */}
    <path d="M10 35 L110 35" {...P} />
    {/* Sand texture (left) — dots */}
    <circle cx="22" cy="42" r="1.5" {...D} />
    <circle cx="30" cy="48" r="1.5" {...D} />
    <circle cx="18" cy="54" r="1.5" {...D} />
    <circle cx="38" cy="44" r="1.5" {...D} />
    <circle cx="26" cy="60" r="1.5" {...D} />
    <circle cx="44" cy="54" r="1.5" {...D} />
    <circle cx="34" cy="66" r="1.5" {...D} />
    {/* Mud texture (right) — wavy lines */}
    <path d="M65 42 C70 40 75 44 80 42 C85 40 90 44 95 42 C100 40 105 44 110 42" {...D} />
    <path d="M65 52 C70 50 75 54 80 52 C85 50 90 54 95 52 C100 50 105 54 110 52" {...D} />
    <path d="M65 62 C70 60 75 64 80 62 C85 60 90 64 95 62 C100 60 105 64 110 62" {...D} />
    {/* Left anchor in sand */}
    <line x1="30" y1="15" x2="30" y2="35" {...P} />
    <path d="M30 35 L30 44 M24 40 L30 38 L36 40 M24 48 L30 44 L36 48" {...P} />
    {/* Right anchor in mud */}
    <line x1="85" y1="15" x2="85" y2="35" {...P} />
    <path d="M85 35 L85 44 M79 40 L85 38 L91 40 M79 48 L85 44 L91 48" {...P} />
  </svg>
)

// 03-anchorwork-fc-5
// Low water vs high water — danger of insufficient scope at high tide
export const Ill_03_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Seabed */}
    <path d="M10 72 L110 72" {...P} />
    {/* LEFT: Low water — shallow, good scope angle */}
    {/* Low waterline */}
    <line x1="10" y1="45" x2="55" y2="45" {...D} />
    {/* Boat (left, low water) */}
    <path d="M15 45 L13 50 L35 50 L33 45" {...P} />
    {/* Scope at low water — good angle */}
    <path d="M22 50 L10 70" {...P} />
    {/* Anchor (left) */}
    <path d="M7 70 L5 74 L13 74 M9 70 L9 66 M5 68 L9 66 L13 68" {...P} />
    {/* RIGHT: High water — deeper, scope too short, anchor nearly vertical */}
    {/* High waterline */}
    <line x1="65" y1="28" x2="110" y2="28" {...D} />
    {/* Boat (right, high water) */}
    <path d="M75 28 L73 33 L95 33 L93 28" {...P} />
    {/* Scope at high water — steep, poor angle */}
    <path d="M82 33 L80 70" {...P} />
    {/* Anchor (right) — nearly being pulled out */}
    <path d="M77 70 L75 74 L83 74 M79 70 L79 66 M75 68 L79 66 L83 68" {...P} />
    {/* Warning arrow showing tension/pull */}
    <path d="M80 50 L83 42 L86 50" {...D} />
    {/* Tide rise arrow between panels */}
    <line x1="60" y1="28" x2="60" y2="45" {...D} />
    <path d="M57 32 L60 27 L63 32" {...D} />
  </svg>
)

// 03-anchorwork-fc-6
// Top-down chart: harbour entrance with leading marks in alignment, boat blocking
export const Ill_03_fc_6: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Harbour entrance channel */}
    <path d="M10 25 L10 55 M110 25 L110 55" {...D} />
    {/* Leading line (alignment) */}
    <line x1="10" y1="40" x2="110" y2="40" {...D} strokeDasharray="5 3" />
    {/* Leading mark 1 (far) — triangle */}
    <path d="M100 33 L105 48 L95 48 Z" {...P} />
    {/* Leading mark 2 (near) — smaller triangle */}
    <path d="M72 36 L76 44 L68 44 Z" {...P} />
    {/* Anchored boat blocking the leading line */}
    {/* Top-down boat shape */}
    <path d="M42 35 C38 38 38 42 42 45 L55 45 L58 40 L55 35 Z" {...P} />
    {/* Anchor rode from boat */}
    <line x1="42" y1="40" x2="32" y2="40" {...D} />
    <circle cx="30" cy="40" r="2" {...D} />
    {/* Approaching vessel blocked */}
    <path d="M15 36 C12 38 12 42 15 44 L24 44 L26 40 L24 36 Z" {...P} />
    {/* Danger X mark */}
    <path d="M44 36 L54 44 M54 36 L44 44" stroke="var(--color-primary)" strokeWidth={2.5} strokeLinecap="round" />
  </svg>
)

// 04-safety-fc-0
// Figure on deck wearing harness with tether, rough weather
export const Ill_04_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Waves / rough water */}
    <path d="M5 65 C15 60 25 68 35 63 C45 58 55 66 65 61 C75 56 85 64 95 59 C105 54 115 62 120 58" {...D} />
    <path d="M5 72 C15 67 25 75 35 70 C45 65 55 73 65 68 C75 63 85 71 95 66 C105 61 115 69 120 65" {...D} />
    {/* Deck / boat top */}
    <path d="M10 55 L110 55" {...P} />
    {/* Jackstay line along deck */}
    <line x1="15" y1="52" x2="105" y2="52" {...D} strokeDasharray="5 2" />
    {/* Figure - legs */}
    <path d="M58 55 L54 68 M62 55 L66 68" {...P} />
    {/* Figure - body */}
    <path d="M54 38 L66 38 L66 55 L54 55 Z" {...D} />
    {/* Harness straps */}
    <path d="M54 42 L66 42 M57 38 L55 50 M63 38 L65 50 M54 46 L66 46" {...D} />
    {/* Figure - head */}
    <circle cx="60" cy="33" r="5" {...P} />
    {/* Arms out for balance */}
    <path d="M54 43 L44 46 M66 43 L76 46" {...P} />
    {/* Tether from harness to jackstay */}
    <path d="M60 50 L60 52" {...P} />
    {/* Carabiner clip */}
    <path d="M57 52 L60 49 L63 52 L60 55 Z" {...D} />
  </svg>
)

// 04-safety-fc-1
// VHF radio handset with Mayday call — three pulses/dots
export const Ill_04_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* VHF handset body */}
    <path d="M35 15 C30 15 28 18 28 22 L28 65 C28 69 31 72 35 72 L55 72 C59 72 62 69 62 65 L62 22 C62 18 60 15 55 15 Z" {...P} />
    {/* Speaker grille at top */}
    <path d="M36 20 L54 20" {...D} />
    <path d="M36 24 L54 24" {...D} />
    <path d="M36 28 L54 28" {...D} />
    {/* Antenna */}
    <line x1="55" y1="15" x2="65" y2="5" {...P} />
    {/* PTT button */}
    <rect x="33" y="40" width="24" height="10" rx="2" {...P} />
    {/* Mic grille at bottom */}
    <path d="M36 58 L54 58" {...D} />
    <path d="M36 62 L54 62" {...D} />
    {/* Speech/signal arcs (Mayday call going out) */}
    <path d="M68 30 C72 28 72 32 68 30" {...D} />
    <path d="M68 30 C78 24 78 36 68 30" {...D} />
    <path d="M68 30 C88 18 88 42 68 30" {...P} />
    {/* Three dots = MAYDAY MAYDAY MAYDAY */}
    <circle cx="95" cy="25" r="2.5" {...P} />
    <circle cx="103" cy="25" r="2.5" {...P} />
    <circle cx="111" cy="25" r="2.5" {...P} />
  </svg>
)

// 04-safety-fc-2
// Mayday (boat sinking) vs Pan Pan (boat drifting/engine failure)
export const Ill_04_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Divider */}
    <line x1="60" y1="5" x2="60" y2="78" {...D} strokeDasharray="4 3" />
    {/* LEFT: MAYDAY — boat sinking, waves engulfing */}
    {/* Waterline high on boat */}
    <path d="M5 50 C12 46 18 54 25 50 C32 46 38 54 45 50 C52 46 58 54 58 50" {...D} />
    {/* Sinking boat — partially submerged */}
    <path d="M15 55 L12 62 L48 62 L45 55" {...P} />
    <path d="M20 55 L25 42 L40 42 L45 55" {...P} />
    {/* Waves engulfing */}
    <path d="M10 58 C18 54 28 62 36 58 C44 54 52 62 58 58" {...D} />
    {/* Distress signal */}
    <path d="M30 38 L28 32 L32 32 Z" {...P} />
    {/* RIGHT: PAN PAN — boat drifting, engine failure */}
    {/* Waterline */}
    <path d="M62 52" {...D} />
    <line x1="62" y1="52" x2="115" y2="52" {...D} />
    {/* Boat hull drifting */}
    <path d="M70 52 L67 60 L108 60 L105 52" {...P} />
    <path d="M75 52 L78 40 L100 40 L103 52" {...P} />
    {/* Engine failure X symbol */}
    <path d="M85 44 L95 50 M95 44 L85 50" {...D} />
    {/* Drift arrow */}
    <path d="M108 55 L116 55" {...P} />
    <path d="M113 52 L117 55 L113 58" {...P} />
    {/* Broken propeller hint */}
    <path d="M88 60 L88 65 M84 62 L92 62" {...D} />
  </svg>
)

// 04-safety-fc-3
// CO2 fire extinguisher with horn nozzle aimed at engine with flame
export const Ill_04_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Engine block */}
    <rect x="72" y="35" width="40" height="28" rx="3" {...P} />
    {/* Engine detail — cylinders */}
    <rect x="77" y="28" width="8" height="10" rx="1" {...D} />
    <rect x="89" y="28" width="8" height="10" rx="1" {...D} />
    <rect x="101" y="28" width="8" height="10" rx="1" {...D} />
    {/* Flame on engine */}
    <path d="M88 35 C86 30 90 26 88 22 C92 26 96 24 92 18 C98 24 100 30 96 35" {...P} />
    {/* CO2 extinguisher body — distinctive black cylinder */}
    <path d="M18 25 C18 20 26 20 26 25 L26 65 C26 70 18 70 18 65 Z" {...P} />
    {/* Cylinder top */}
    <path d="M18 25 L26 25" {...P} />
    {/* Valve/handle */}
    <path d="M22 20 L22 15 M18 15 L26 15 M16 18 L28 18" {...P} />
    {/* Hose */}
    <path d="M26 45 C35 42 45 48 50 44" {...P} />
    {/* Horn nozzle — distinctive CO2 shape */}
    <path d="M50 44 C54 42 60 40 65 43 C68 45 66 50 62 50 C58 50 54 48 50 47 L50 44" {...P} />
    {/* CO2 fog/spray from horn toward engine */}
    <path d="M65 46 C70 44 73 42 76 40" {...D} />
    <path d="M65 47 C70 46 73 45 76 44" {...D} />
    <path d="M65 48 C70 49 73 50 76 52" {...D} />
  </svg>
)

// 04-safety-fc-4
// VHF broadcast to multiple vessels vs mobile phone with no signal
export const Ill_04_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Divider */}
    <line x1="60" y1="5" x2="60" y2="78" {...D} strokeDasharray="4 3" />
    {/* LEFT: VHF radio broadcasting */}
    {/* Radio / Coast Guard station */}
    <rect x="8" y="38" width="20" height="25" rx="2" {...D} />
    <path d="M13 38 L13 30 L18 25 L23 30 L23 38" {...D} />
    <line x1="18" y1="25" x2="18" y2="18" {...P} />
    {/* Signal arcs from station */}
    <path d="M28 38 C32 34 32 42 28 38" {...D} />
    <path d="M28 38 C36 30 36 46 28 38" {...D} />
    <path d="M28 38 C44 22 44 54 28 38" {...P} />
    {/* Receiving boat 1 */}
    <path d="M44 30 L42 35 L54 35 L52 30" {...D} />
    <path d="M46 30 L48 25 L52 25 L54 30" {...D} />
    {/* Receiving boat 2 */}
    <path d="M44 50 L42 55 L54 55 L52 50" {...D} />
    <path d="M46 50 L48 45 L52 45 L54 50" {...D} />
    {/* RIGHT: Mobile phone with no signal */}
    {/* Phone body */}
    <rect x="76" y="22" width="22" height="38" rx="3" {...P} />
    {/* Screen */}
    <rect x="79" y="26" width="16" height="24" rx="1" {...D} />
    {/* Home button */}
    <circle cx="87" cy="55" r="2" {...D} />
    {/* No signal bars — crossed out */}
    <path d="M79 18 L82 14 M84 18 L84 12 M89 18 L89 10" {...D} />
    {/* X through signal */}
    <path d="M78 10 L92 22 M92 10 L78 22" {...P} />
  </svg>
)

// 04-safety-fc-5
// Bilge cross-section: heavy vapour settling low, bilge blower ventilating
export const Ill_04_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Boat hull cross-section */}
    <path d="M15 20 L15 65 C15 72 20 75 25 75 L95 75 C100 75 105 72 105 65 L105 20" {...P} />
    {/* Deck */}
    <path d="M15 20 L105 20" {...P} />
    {/* Bilge floor */}
    <path d="M25 65 L95 65" {...D} />
    {/* Gas/vapour (heavier than air — settles in bilge) — wavy lines low down */}
    <path d="M28 68 C35 65 45 70 55 67 C65 64 75 69 85 66 C90 64 93 67 95 68" {...D} />
    <path d="M28 62 C35 59 45 64 55 61 C65 58 75 63 85 60 C90 58 93 61 95 62" {...D} />
    {/* Downward arrows showing gas settling */}
    <line x1="60" y1="45" x2="60" y2="58" {...D} />
    <path d="M57 55 L60 60 L63 55" {...D} />
    {/* Bilge blower — fan shape on deck */}
    <circle cx="85" cy="20" r="8" {...P} />
    <path d="M85 13 L85 27 M78 20 L92 20 M80 15 L90 25 M90 15 L80 25" {...D} />
    {/* Vent outlet arrow — air/gas going out */}
    <line x1="85" y1="12" x2="85" y2="5" {...P} />
    <path d="M82 8 L85 4 L88 8" {...P} />
    {/* Vent intake */}
    <line x1="30" y1="20" x2="30" y2="12" {...P} />
    <path d="M26 15 L30 10 L34 15" {...D} />
    {/* Air flow arrows inside showing circulation */}
    <path d="M38 35 C50 30 70 30 80 35" {...D} />
    <path d="M77 32 L81 35 L77 38" {...D} />
  </svg>
)

// 04-safety-fc-6
// Liferaft boarding: fittest crew first, then others helped aboard
export const Ill_04_fc_6: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Water surface */}
    <path d="M5 60 C15 56 25 64 35 60 C45 56 55 64 65 60 C75 56 85 64 95 60 C105 56 115 64 120 60" {...D} />
    {/* Liferaft — inflated round shape */}
    <path d="M55 45 C55 35 95 35 95 45 L95 60 C95 65 55 65 55 60 Z" {...P} />
    {/* Liferaft tube detail */}
    <path d="M55 52 C55 48 95 48 95 52" {...D} />
    {/* Canopy arch */}
    <path d="M62 45 C68 38 82 38 88 45" {...D} />
    {/* Figure 1 — fittest crew already aboard, reaching down to help */}
    <circle cx="75" cy="40" r="4" {...P} />
    <path d="M75 44 L75 52 M71 52 L79 52 M75 48 L68 51 M75 48 L82 51" {...P} />
    {/* Arrow showing helping hand reaching down */}
    <path d="M68 51 L62 55" {...D} />
    <path d="M60 52 L61 56 L65 55" {...D} />
    {/* Figure 2 — in water being helped */}
    <circle cx="45" cy="57" r="4" {...P} />
    <path d="M45 61 L45 66 M41 64 L49 64" {...P} />
    {/* Arrow 1 showing boarding sequence */}
    <path d="M38 50 L52 50" {...P} />
    <path d="M49 47 L53 50 L49 53" {...P} />
    {/* "1st" position marker */}
    <path d="M75 35 L75 32 M72 32 L78 32" {...D} />
  </svg>
)

// 04-safety-fc-7
// Top-down: boat heading with arrow, helicopter approaching from upwind
export const Ill_04_fc_7: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Wind direction arrow (from top-left) */}
    <line x1="10" y1="10" x2="30" y2="25" {...D} />
    <path d="M26 21 L31 26 L25 26" {...D} />
    {/* Wind label hint — lines showing wind */}
    <path d="M5 18 L15 18 M5 22 L12 22" {...D} />
    {/* Boat — top-down view, heading into wind (upward) */}
    <path d="M55 30 C52 35 50 50 52 60 L68 60 C70 50 68 35 65 30 Z" {...P} />
    {/* Bow (pointing up-left into wind) */}
    <path d="M55 30 L60 22 L65 30" {...P} />
    {/* Boat heading arrow */}
    <line x1="60" y1="22" x2="60" y2="10" {...P} />
    <path d="M57 14 L60 8 L63 14" {...P} />
    {/* Helicopter approaching from windward (top-left area) */}
    {/* Helo body */}
    <ellipse cx="28" cy="38" rx="10" ry="5" {...P} />
    {/* Main rotor */}
    <line x1="15" y1="34" x2="41" y2="34" {...P} />
    <line x1="28" y1="27" x2="28" y2="41" {...D} />
    {/* Tail */}
    <line x1="38" y1="38" x2="46" y2="36" {...D} />
    {/* Tail rotor */}
    <line x1="46" y1="33" x2="46" y2="39" {...D} />
    {/* Helo approach arrow */}
    <line x1="42" y1="42" x2="52" y2="50" {...D} />
    <path d="M48 50 L53 51 L51 46" {...D} />
    {/* Downwash pattern (dashed circles below helo) */}
    <path d="M18 44 C18 52 38 52 38 44" {...D} strokeDasharray="3 2" />
    {/* Rescue line/winch */}
    <line x1="28" y1="43" x2="28" y2="55" {...D} />
    <circle cx="28" cy="57" r="2" {...D} />
  </svg>
)

// 04-safety-fc-8
// Three extinguisher types side by side: CO2 (horn), Dry Powder, AFFF foam
export const Ill_04_fc_8: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* CO2 extinguisher (left) — black, with distinctive horn nozzle */}
    {/* Body */}
    <path d="M12 28 C12 23 22 23 22 28 L22 68 C22 72 12 72 12 68 Z" {...P} />
    {/* Valve top */}
    <path d="M17 23 L17 18 M13 18 L21 18 M11 21 L23 21" {...P} />
    {/* Hose + horn nozzle */}
    <path d="M22 38 C26 36 28 38 30 36 C33 33 36 35 38 38 C40 41 38 45 34 44" {...P} />
    {/* Dry Powder extinguisher (centre) — generic cylinder, wider */}
    {/* Body */}
    <path d="M47 25 C47 20 63 20 63 25 L63 68 C63 72 47 72 47 68 Z" {...P} />
    {/* Valve top */}
    <path d="M55 20 L55 15 M51 15 L59 15 M49 18 L61 18" {...P} />
    {/* Hose + standard nozzle */}
    <path d="M63 38 L72 36 L74 40 L63 42" {...D} />
    {/* AFFF Foam extinguisher (right) — similar shape, different nozzle */}
    {/* Body */}
    <path d="M82 27 C82 22 96 22 96 27 L96 68 C96 72 82 72 82 68 Z" {...P} />
    {/* Valve top */}
    <path d="M89 22 L89 17 M85 17 L93 17 M83 20 L95 20" {...P} />
    {/* Hose + foam nozzle (wider, fan-shaped) */}
    <path d="M96 38 L104 36 C108 34 112 37 112 40 C112 43 108 44 104 43 L96 42" {...P} />
    {/* Foam spray fan */}
    <path d="M112 38 L116 35 M112 40 L117 40 M112 42 L116 45" {...D} />
  </svg>
)

// 04-safety-fc-9
// Parachute rocket flare with prohibition X, helicopter nearby — never fire at helo
export const Ill_04_fc_9: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Helicopter silhouette (top right) */}
    <ellipse cx="90" cy="22" rx="14" ry="6" {...P} />
    {/* Main rotor */}
    <line x1="73" y1="17" x2="107" y2="17" {...P} />
    {/* Tail boom */}
    <line x1="104" y1="22" x2="115" y2="20" {...D} />
    {/* Tail rotor */}
    <line x1="115" y1="17" x2="115" y2="23" {...D} />
    {/* Rotor downwash circles */}
    <path d="M78 28 C78 35 102 35 102 28" {...D} strokeDasharray="3 2" />
    {/* Parachute flare being fired upward */}
    {/* Flare canister */}
    <rect x="28" y="55" width="10" height="18" rx="2" {...P} />
    {/* Flare trajectory arrow going up toward helo */}
    <line x1="33" y1="55" x2="70" y2="25" {...P} />
    <path d="M65 26 L71 24 L68 30" {...P} />
    {/* Parachute at top of trajectory */}
    <path d="M55 40 C50 35 48 30 52 28 C56 26 62 28 66 32 C68 34 66 39 62 40 L55 40" {...D} />
    <line x1="55" y1="40" x2="58" y2="46" {...D} />
    <line x1="62" y1="40" x2="59" y2="46" {...D} />
    <circle cx="58" cy="48" r="2" {...D} />
    {/* Large prohibition X overlay */}
    <path d="M15 8 L75 70 M75 8 L15 70" stroke="var(--color-primary)" strokeWidth={3.5} strokeLinecap="round" />
    {/* Prohibition circle */}
    <circle cx="45" cy="39" r="36" {...P} strokeWidth={2.5} />
  </svg>
)

export const registryEntries: Record<string, FC> = {
  '03-anchorwork-fc-0': Ill_03_fc_0,
  '03-anchorwork-fc-1': Ill_03_fc_1,
  '03-anchorwork-fc-2': Ill_03_fc_2,
  '03-anchorwork-fc-3': Ill_03_fc_3,
  '03-anchorwork-fc-4': Ill_03_fc_4,
  '03-anchorwork-fc-5': Ill_03_fc_5,
  '03-anchorwork-fc-6': Ill_03_fc_6,
  '04-safety-fc-0': Ill_04_fc_0,
  '04-safety-fc-1': Ill_04_fc_1,
  '04-safety-fc-2': Ill_04_fc_2,
  '04-safety-fc-3': Ill_04_fc_3,
  '04-safety-fc-4': Ill_04_fc_4,
  '04-safety-fc-5': Ill_04_fc_5,
  '04-safety-fc-6': Ill_04_fc_6,
  '04-safety-fc-7': Ill_04_fc_7,
  '04-safety-fc-8': Ill_04_fc_8,
  '04-safety-fc-9': Ill_04_fc_9,
}
