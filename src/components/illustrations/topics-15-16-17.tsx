import type { FC } from 'react'

const P = { stroke: "var(--color-primary)", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" } as const
const D = { ...P, strokeWidth: 1.5 } as const

// 15-restricted-visibility-fc-0
// Rule 19 — boat in fog with radar antenna
export const Ill_15_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Fog haze lines */}
    <line x1="8" y1="30" x2="30" y2="30" {...D} opacity="0.5" />
    <line x1="5" y1="40" x2="25" y2="40" {...D} opacity="0.4" />
    <line x1="8" y1="50" x2="28" y2="50" {...D} opacity="0.5" />
    {/* Boat hull */}
    <path d="M40 55 L45 45 L90 45 L96 55 Z" {...P} />
    {/* Cabin */}
    <rect x="55" y="36" width="22" height="9" rx="1" {...P} />
    {/* Mast */}
    <line x1="66" y1="36" x2="66" y2="22" {...P} />
    {/* Radar scanner arm */}
    <line x1="66" y1="22" x2="80" y2="18" {...D} />
    <line x1="66" y1="22" x2="52" y2="26" {...D} />
    {/* Radar sweep arc */}
    <path d="M66 22 A18 18 0 0 1 82 30" {...D} strokeDasharray="3 2" />
    {/* More fog on right */}
    <line x1="100" y1="32" x2="116" y2="32" {...D} opacity="0.5" />
    <line x1="103" y1="42" x2="118" y2="42" {...D} opacity="0.4" />
    <line x1="100" y1="52" x2="115" y2="52" {...D} opacity="0.5" />
    {/* Water line */}
    <path d="M36 58 Q50 61 64 58 Q78 55 92 58 Q100 60 108 58" {...D} />
  </svg>
)

// 15-restricted-visibility-fc-1
// First actions in fog: reduce speed, foghorn, radar on
export const Ill_15_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Foghorn/horn on left */}
    <path d="M12 38 L22 33 L22 47 L12 42 Z" {...P} />
    <path d="M22 35 Q30 34 32 40 Q30 46 22 45" {...P} />
    {/* Sound waves from horn */}
    <path d="M34 37 Q38 40 34 43" {...D} />
    <path d="M37 34 Q43 40 37 46" {...D} />
    {/* Speed reduction arrow — throttle back */}
    <line x1="60" y1="25" x2="60" y2="55" {...P} />
    <polyline points="53,45 60,55 67,45" {...P} />
    {/* Radar screen (simple arc) */}
    <circle cx="98" cy="40" r="16" {...P} />
    <line x1="98" y1="40" x2="98" y2="24" {...D} />
    <path d="M98 40 L110 32" {...D} strokeDasharray="2 2" />
    <circle cx="98" cy="40" r="3" {...P} fill="var(--color-primary)" />
    {/* Fog haze across bottom */}
    <path d="M0 65 Q20 62 40 65 Q60 68 80 65 Q100 62 120 65" {...D} opacity="0.5" />
    <path d="M0 72 Q20 69 40 72 Q60 75 80 72 Q100 69 120 72" {...D} opacity="0.3" />
  </svg>
)

// 15-restricted-visibility-fc-2
// Fog signal forward of beam — slow and alter course to starboard
export const Ill_15_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Own boat top-down, heading up */}
    <path d="M58 62 L52 50 L54 40 L62 36 L70 40 L72 50 L66 62 Z" {...P} />
    {/* Boat centreline */}
    <line x1="62" y1="36" x2="62" y2="30" {...D} strokeDasharray="3 2" />
    {/* Sound source forward-port */}
    <path d="M30 18 L38 14 L38 22 L30 18 Z" {...P} />
    <path d="M40 15 Q44 18 40 21" {...D} />
    <path d="M42 12 Q48 18 42 24" {...D} />
    {/* Arrow: alter course to starboard (right) and slow */}
    <path d="M66 44 Q80 38 84 30" {...P} />
    <polyline points="78,30 84,30 84,36" {...P} />
    {/* Fog haze */}
    <line x1="5" y1="35" x2="20" y2="35" {...D} opacity="0.5" />
    <line x1="3" y1="45" x2="18" y2="45" {...D} opacity="0.4" />
    <line x1="95" y1="20" x2="115" y2="20" {...D} opacity="0.4" />
    <line x1="98" y1="28" x2="118" y2="28" {...D} opacity="0.5" />
  </svg>
)

// 15-restricted-visibility-fc-3
// Vessel at anchor — black ball day shape at bow
export const Ill_15_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Boat hull */}
    <path d="M25 50 L32 40 L85 40 L92 50 Z" {...P} />
    {/* Cabin */}
    <rect x="48" y="30" width="24" height="10" rx="1" {...P} />
    {/* Mast/forestay */}
    <line x1="60" y1="30" x2="60" y2="18" {...P} />
    {/* Black ball at bow forestay — filled circle */}
    <circle cx="34" cy="32" r="6" stroke="var(--color-primary)" strokeWidth={2.5} fill="var(--color-primary)" />
    {/* Halyard line from bow to ball */}
    <line x1="34" y1="26" x2="38" y2="30" {...D} />
    {/* Anchor chain going down */}
    <path d="M25 52 Q22 58 24 65" {...P} strokeDasharray="3 2" />
    {/* Anchor at bottom */}
    <line x1="24" y1="65" x2="24" y2="72" {...P} />
    <line x1="18" y1="72" x2="30" y2="72" {...P} />
    <path d="M18 72 Q16 68 20 66" {...D} />
    <path d="M30 72 Q32 68 28 66" {...D} />
    {/* Water line */}
    <path d="M20 54 Q40 57 60 54 Q80 51 100 54" {...D} />
  </svg>
)

// 15-restricted-visibility-fc-4
// Don't rely on visual watch — radar vs eyes in fog
export const Ill_15_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Left side: eye in fog — limited view */}
    {/* Eye */}
    <path d="M12 35 Q22 26 32 35 Q22 44 12 35 Z" {...P} />
    <circle cx="22" cy="35" r="4" {...D} />
    {/* Fog blocking view — dense haze */}
    <line x1="34" y1="28" x2="46" y2="28" {...P} />
    <line x1="32" y1="35" x2="48" y2="35" {...P} />
    <line x1="34" y1="42" x2="46" y2="42" {...P} />
    {/* Small visible range arc */}
    <path d="M34 35 A4 4 0 0 1 38 31" {...D} />
    {/* Divider */}
    <line x1="60" y1="10" x2="60" y2="70" {...D} strokeDasharray="4 3" />
    {/* Right side: radar screen with full 360° */}
    <circle cx="90" cy="38" r="22" {...P} />
    {/* Radar sweep lines */}
    <line x1="90" y1="38" x2="90" y2="16" {...D} />
    <line x1="90" y1="38" x2="108" y2="27" {...D} strokeDasharray="2 2" />
    <line x1="90" y1="38" x2="112" y2="38" {...D} strokeDasharray="2 2" />
    {/* Target blip */}
    <circle cx="103" cy="28" r="2.5" {...P} fill="var(--color-primary)" />
    <circle cx="90" cy="38" r="3" {...P} fill="var(--color-primary)" />
  </svg>
)

// 15-restricted-visibility-fc-5
// Fog signal for power vessel making way — one long blast every 2 minutes
export const Ill_15_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Foghorn */}
    <path d="M18 36 L30 30 L30 50 L18 44 Z" {...P} />
    <path d="M30 33 Q40 31 42 40 Q40 49 30 47" {...P} />
    {/* One long sound wave (bold, long) */}
    <path d="M46 36 Q58 40 46 44" {...P} />
    <path d="M50 32 Q66 40 50 48" {...P} />
    {/* Clock face showing 2-minute cycle */}
    <circle cx="95" cy="40" r="20" {...P} />
    {/* Clock hands — one full cycle 2 min */}
    <line x1="95" y1="40" x2="95" y2="23" {...P} />
    <line x1="95" y1="40" x2="108" y2="40" {...D} />
    {/* Clock tick marks at 12, 3, 6, 9 */}
    <line x1="95" y1="21" x2="95" y2="24" {...D} />
    <line x1="114" y1="40" x2="111" y2="40" {...D} />
    <line x1="95" y1="59" x2="95" y2="56" {...D} />
    <line x1="76" y1="40" x2="79" y2="40" {...D} />
    {/* "1 blast" indicator — single bold dash */}
    <line x1="55" y1="68" x2="75" y2="68" strokeWidth={5} stroke="var(--color-primary)" strokeLinecap="round" />
  </svg>
)

// 16-pilotage-fc-0
// Transit — two shore marks aligned
export const Ill_16_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Shore line */}
    <line x1="70" y1="10" x2="70" y2="70" {...P} />
    <line x1="70" y1="10" x2="120" y2="10" {...D} />
    <line x1="70" y1="70" x2="120" y2="70" {...D} />
    {/* Back mark (taller tower) */}
    <rect x="88" y="18" width="10" height="22" {...P} />
    <polygon points="88,18 93,10 98,18" {...P} />
    {/* Front mark (shorter beacon) */}
    <rect x="75" y="30" width="8" height="16" {...P} />
    <line x1="79" y1="30" x2="79" y2="24" {...D} />
    <line x1="75" y1="24" x2="83" y2="24" {...D} />
    {/* Transit line extending to sea */}
    <line x1="4" y1="55" x2="79" y2="38" {...D} strokeDasharray="4 3" />
    {/* Boat on transit */}
    <path d="M4 58 L8 52 L20 52 L24 58 Z" {...P} />
    <line x1="14" y1="52" x2="14" y2="46" {...D} />
    {/* Alignment indicator — arrow */}
    <path d="M26 50 L38 44" {...D} />
    <polyline points="34,42 38,44 36,48" {...D} />
  </svg>
)

// 16-pilotage-fc-1
// Leading lights — vertical alignment means on the line
export const Ill_16_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Shore */}
    <line x1="80" y1="8" x2="80" y2="72" {...P} />
    {/* Upper light (higher) */}
    <rect x="88" y="14" width="12" height="10" {...P} />
    <circle cx="94" cy="19" r="3" {...D} fill="var(--color-primary)" opacity="0.6" />
    <line x1="88" y1="14" x2="80" y2="14" {...D} />
    {/* Lower light */}
    <rect x="82" y="36" width="10" height="8" {...P} />
    <circle cx="87" cy="40" r="2.5" {...D} fill="var(--color-primary)" opacity="0.6" />
    {/* Aligned: lower light directly below upper — vertical dashed line */}
    <line x1="87" y1="24" x2="87" y2="36" {...D} strokeDasharray="3 2" />
    {/* Leading line to sea */}
    <line x1="10" y1="58" x2="82" y2="40" {...D} strokeDasharray="4 3" />
    {/* Boat on line */}
    <path d="M8 61 L12 55 L24 55 L28 61 Z" {...P} />
    <line x1="18" y1="55" x2="18" y2="49" {...D} />
    {/* Off-line indicator: lights offset horizontally (wrong position) */}
    <rect x="100" y="20" width="10" height="8" rx="1" {...D} />
    <rect x="106" y="38" width="10" height="8" rx="1" {...D} />
    <line x1="110" y1="28" x2="108" y2="38" {...D} strokeDasharray="2 2" />
    {/* X for wrong */}
    <line x1="99" y1="52" x2="107" y2="58" {...D} />
    <line x1="107" y1="52" x2="99" y2="58" {...D} />
  </svg>
)

// 16-pilotage-fc-2
// Clearing bearing — landmark with bearing line just clear of danger
export const Ill_16_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Landmark on shore */}
    <rect x="90" y="20" width="12" height="20" {...P} />
    <polygon points="90,20 96,12 102,20" {...P} />
    {/* Shore */}
    <line x1="80" y1="10" x2="80" y2="70" {...P} />
    {/* Danger (rocks) */}
    <path d="M40 52 Q44 46 50 50 Q54 44 58 50 Q62 46 66 52 Z" {...P} />
    <line x1="42" y1="52" x2="40" y2="56" {...D} />
    <line x1="52" y1="50" x2="52" y2="54" {...D} />
    <line x1="64" y1="52" x2="66" y2="56" {...D} />
    {/* Clearing bearing line — just clear of the danger */}
    <line x1="8" y1="40" x2="96" y2="30" {...D} strokeDasharray="5 3" />
    {/* Safe boat above clearing line */}
    <path d="M10 34 L14 28 L26 28 L30 34 Z" {...P} />
    {/* Arrow indicating bearing direction */}
    <path d="M28 30 L38 27" {...D} />
    <polyline points="34,25 38,27 36,31" {...D} />
  </svg>
)

// 16-pilotage-fc-3
// Pilotage plan — clipboard with 6 checklist items
export const Ill_16_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Clipboard body */}
    <rect x="28" y="16" width="64" height="56" rx="3" {...P} />
    {/* Clipboard clip at top */}
    <rect x="46" y="11" width="28" height="10" rx="3" {...P} />
    {/* 6 checklist rows */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <>
        <rect key={`box-${i}`} x="36" y={24 + i * 8} width="6" height="6" rx="1" {...D} />
        <line key={`line-${i}`} x1="46" y1={27 + i * 8} x2="82" y2={27 + i * 8} {...D} />
      </>
    ))}
  </svg>
)

// 16-pilotage-fc-4
// Written notepad vs chartplotter — reliability contrast
export const Ill_16_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Left: chartplotter/GPS screen */}
    <rect x="8" y="20" width="44" height="36" rx="3" {...P} />
    {/* Screen content — chart lines */}
    <line x1="14" y1="32" x2="46" y2="32" {...D} />
    <line x1="14" y1="40" x2="46" y2="40" {...D} />
    <line x1="28" y1="26" x2="28" y2="50" {...D} />
    {/* X over chartplotter (can fail) */}
    <line x1="12" y1="24" x2="48" y2="52" strokeWidth={3} stroke="var(--color-primary)" strokeLinecap="round" />
    <line x1="48" y1="24" x2="12" y2="52" strokeWidth={3} stroke="var(--color-primary)" strokeLinecap="round" />
    {/* Divider */}
    <line x1="60" y1="12" x2="60" y2="68" {...D} strokeDasharray="4 3" />
    {/* Right: notepad */}
    <rect x="68" y="18" width="44" height="44" rx="2" {...P} />
    {/* Notepad lines */}
    <line x1="74" y1="28" x2="106" y2="28" {...D} />
    <line x1="74" y1="36" x2="106" y2="36" {...D} />
    <line x1="74" y1="44" x2="106" y2="44" {...D} />
    <line x1="74" y1="52" x2="96" y2="52" {...D} />
    {/* Pen */}
    <line x1="100" y1="56" x2="112" y2="68" {...P} />
    <path d="M100 56 L106 50 L110 54 L104 60 Z" {...P} />
    <line x1="106" y1="50" x2="108" y2="48" {...D} />
    {/* Tick/checkmark on notepad */}
    <polyline points="78,35 82,40 90,30" {...P} />
  </svg>
)

// 16-pilotage-fc-5
// IALA Region A — green conical buoy to starboard going in
export const Ill_16_fc_5: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Channel — two parallel banks */}
    <line x1="20" y1="15" x2="100" y2="15" {...D} />
    <line x1="20" y1="65" x2="100" y2="65" {...D} />
    {/* Boat heading up-channel (from left) */}
    <path d="M22 42 L26 34 L44 34 L48 42 L44 50 L26 50 Z" {...P} />
    <line x1="35" y1="34" x2="35" y2="26" {...D} />
    {/* Direction arrow */}
    <path d="M48 40 L60 40" {...D} />
    <polyline points="56,36 60,40 56,44" {...D} />
    {/* Green conical buoy — STARBOARD (right/top of channel as going up) */}
    <polygon points="78,18 86,35 70,35" {...P} />
    <line x1="78" y1="35" x2="78" y2="42" {...D} />
    <circle cx="78" cy="45" r="3" {...D} />
    {/* Red can buoy — PORT (left/bottom) */}
    <rect x="70" y="53" width="16" height="12" rx="2" {...P} />
    <line x1="78" y1="53" x2="78" y2="47" {...D} />
    <circle cx="78" cy="44" r="2" {...D} fill="var(--color-primary)" opacity="0.3" />
  </svg>
)

// 16-pilotage-fc-6
// Minimum depth clearance over bar calculation
export const Ill_16_fc_6: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Water surface */}
    <path d="M5 22 Q20 18 35 22 Q50 26 65 22 Q80 18 95 22 Q110 26 118 22" {...P} />
    {/* Chart datum line */}
    <line x1="5" y1="62" x2="118" y2="62" {...D} strokeDasharray="6 3" />
    {/* Bar/shoal hump on seabed */}
    <path d="M5 72 Q30 72 45 62 Q60 54 75 62 Q90 72 118 72" {...P} />
    {/* Bar top level line */}
    <line x1="45" y1="62" x2="75" y2="62" {...D} />
    {/* Charted depth arrow: datum to bar top */}
    <line x1="30" y1="62" x2="30" y2="56" {...D} />
    <polyline points="27,58 30,54 33,58" {...D} />
    {/* Height of tide arrow: datum up to water surface */}
    <line x1="50" y1="62" x2="50" y2="22" {...D} />
    <polyline points="47,26 50,22 53,26" {...D} />
    {/* Boat draught: water surface down to keel */}
    <rect x="80" y="18" width="26" height="10" rx="1" {...P} />
    <path d="M80 28 L78 38 L106 38 L104 28 Z" {...P} />
    {/* Draught arrow */}
    <line x1="93" y1="22" x2="93" y2="38" {...D} />
    <polyline points="90,34 93,38 96,34" {...D} />
    {/* Clearance bracket */}
    <path d="M108 38 L112 38 L112 22 L108 22" {...D} />
  </svg>
)

// 17-marine-environment-fc-0
// MARPOL — ship with crossed-out oil spill
export const Ill_17_fc_0: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Ship silhouette */}
    <path d="M20 48 L26 36 L70 36 L80 48 Z" {...P} />
    {/* Superstructure */}
    <rect x="36" y="26" width="22" height="10" rx="1" {...P} />
    {/* Funnel */}
    <rect x="50" y="18" width="8" height="8" rx="1" {...P} />
    {/* Globe circle */}
    <circle cx="96" cy="35" r="20" {...D} />
    <path d="M76 35 Q86 20 96 20 Q106 20 116 35" {...D} />
    <path d="M76 35 Q86 50 96 50 Q106 50 116 35" {...D} />
    <line x1="76" y1="35" x2="116" y2="35" {...D} />
    {/* No-pollution X over globe */}
    <line x1="80" y1="19" x2="112" y2="51" strokeWidth={3} stroke="var(--color-primary)" strokeLinecap="round" />
    <line x1="112" y1="19" x2="80" y2="51" strokeWidth={3} stroke="var(--color-primary)" strokeLinecap="round" />
    {/* Water line */}
    <path d="M14 52 Q36 55 56 52 Q76 49 100 52" {...D} />
  </svg>
)

// 17-marine-environment-fc-1
// MARPOL Annex V — garbage / plastics no dumping
export const Ill_17_fc_1: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Boat hull */}
    <path d="M10 52 L16 42 L65 42 L72 52 Z" {...P} />
    <rect x="26" y="32" width="22" height="10" rx="1" {...P} />
    {/* Rubbish bag over the side with prohibition circle + slash */}
    <path d="M72 44 Q80 44 84 50 Q82 58 76 58 Q70 58 68 52 Q68 46 72 44 Z" {...P} />
    {/* Bag tie at top */}
    <line x1="76" y1="44" x2="76" y2="40" {...D} />
    <path d="M72 40 Q76 37 80 40" {...D} />
    {/* Prohibition circle */}
    <circle cx="98" cy="46" r="16" {...P} />
    {/* Slash through prohibition */}
    <line x1="86" y1="34" x2="110" y2="58" {...P} />
    {/* Bag icon inside prohibition */}
    <path d="M93 44 Q97 42 101 44 L103 54 Q97 57 91 54 Z" {...D} />
    {/* Water */}
    <path d="M6 56 Q25 59 45 56 Q65 53 85 56" {...D} />
  </svg>
)

// 17-marine-environment-fc-2
// No oily bilge water overboard — prohibition
export const Ill_17_fc_2: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Boat hull cross-section */}
    <path d="M30 24 L18 56 L90 56 L78 24 Z" {...P} />
    {/* Bilge pump */}
    <rect x="44" y="36" width="20" height="14" rx="2" {...P} />
    {/* Pump handle */}
    <line x1="54" y1="36" x2="54" y2="28" {...P} />
    <line x1="46" y1="28" x2="62" y2="28" {...P} />
    {/* Discharge pipe going out the side — with prohibition */}
    <path d="M64 44 L76 44 L80 48" {...P} />
    {/* Oil drop */}
    <path d="M82 44 Q86 40 90 44 Q86 52 82 44 Z" {...D} />
    {/* Large prohibition circle over discharge */}
    <circle cx="90" cy="48" r="18" {...P} />
    <line x1="77" y1="35" x2="103" y2="61" strokeWidth={3} stroke="var(--color-primary)" strokeLinecap="round" />
    {/* Water line */}
    <path d="M12 60 Q40 63 70 60 Q90 57 108 60" {...D} />
  </svg>
)

// 17-marine-environment-fc-3
// Anchor site selection — avoid seagrass, use sandy area
export const Ill_17_fc_3: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Water surface */}
    <path d="M5 20 Q25 16 45 20 Q65 24 85 20 Q105 16 118 20" {...D} />
    {/* Seabed cross-section */}
    <line x1="5" y1="68" x2="118" y2="68" {...P} />
    {/* Seagrass area (left) */}
    <line x1="20" y1="68" x2="20" y2="58" {...D} />
    <path d="M20 58 Q17 54 14 56" {...D} />
    <path d="M20 58 Q22 52 24 55" {...D} />
    <line x1="30" y1="68" x2="30" y2="56" {...D} />
    <path d="M30 56 Q27 51 24 53" {...D} />
    <path d="M30 56 Q32 50 35 53" {...D} />
    <line x1="40" y1="68" x2="40" y2="60" {...D} />
    <path d="M40 60 Q37 56 34 58" {...D} />
    <path d="M40 60 Q42 54 45 57" {...D} />
    {/* X over seagrass anchor */}
    <path d="M22 30 L14 48" {...P} />
    <path d="M22 30 L10 36" {...P} />
    <line x1="18" y1="30" x2="26" y2="30" {...D} />
    <line x1="14" y1="48" x2="22" y2="48" strokeWidth={2} stroke="var(--color-primary)" strokeLinecap="round" />
    <line x1="13" y1="44" x2="22" y2="34" strokeWidth={3} stroke="var(--color-primary)" strokeLinecap="round" />
    {/* Sandy area (right) — dots */}
    <circle cx="80" cy="67" r="1.5" {...D} fill="var(--color-primary)" />
    <circle cx="90" cy="66" r="1.5" {...D} fill="var(--color-primary)" />
    <circle cx="100" cy="67" r="1.5" {...D} fill="var(--color-primary)" />
    {/* Anchor over sandy area with tick */}
    <line x1="90" y1="22" x2="90" y2="38" {...P} />
    <path d="M84 28 Q90 22 96 28" {...D} />
    <line x1="86" y1="38" x2="94" y2="38" {...P} />
    <path d="M86 38 Q84 34 88 32" {...D} />
    <path d="M94 38 Q96 34 92 32" {...D} />
    {/* Tick checkmark */}
    <polyline points="82,50 87,56 100,44" {...P} />
  </svg>
)

// 17-marine-environment-fc-4
// Holding tank — collects sewage, sealed, no direct discharge
export const Ill_17_fc_4: FC = () => (
  <svg viewBox="0 0 120 80" fill="none">
    {/* Boat hull cross-section */}
    <path d="M10 18 L6 60 L114 60 L110 18 Z" {...P} />
    {/* Waterline */}
    <path d="M5 60 Q30 64 60 60 Q90 56 115 60" {...D} />
    {/* Toilet above */}
    <rect x="30" y="24" width="18" height="10" rx="3" {...P} />
    <path d="M30 34 L28 42 L50 42 L48 34 Z" {...D} />
    {/* Pipe from toilet down to tank */}
    <line x1="39" y1="42" x2="39" y2="50" {...P} />
    {/* Holding tank */}
    <rect x="24" y="50" width="30" height="18" rx="3" {...P} />
    {/* Sealed lid indicator — bold top edge */}
    <line x1="24" y1="53" x2="54" y2="53" strokeWidth={3.5} stroke="var(--color-primary)" strokeLinecap="round" />
    {/* Wavy lines inside tank (sewage) */}
    <path d="M28 60 Q33 57 38 60 Q43 63 48 60" {...D} />
    {/* Prohibited direct discharge — pipe going to sea with X */}
    <line x1="80" y1="42" x2="80" y2="58" {...D} strokeDasharray="4 2" />
    <path d="M74 56 Q80 62 86 56" {...D} />
    {/* Prohibition circle */}
    <circle cx="95" cy="48" r="14" {...P} />
    <line x1="85" y1="38" x2="105" y2="58" strokeWidth={3} stroke="var(--color-primary)" strokeLinecap="round" />
  </svg>
)

export const registryEntries: Record<string, FC> = {
  '15-restricted-visibility-fc-0': Ill_15_fc_0,
  '15-restricted-visibility-fc-1': Ill_15_fc_1,
  '15-restricted-visibility-fc-2': Ill_15_fc_2,
  '15-restricted-visibility-fc-3': Ill_15_fc_3,
  '15-restricted-visibility-fc-4': Ill_15_fc_4,
  '15-restricted-visibility-fc-5': Ill_15_fc_5,
  '16-pilotage-fc-0': Ill_16_fc_0,
  '16-pilotage-fc-1': Ill_16_fc_1,
  '16-pilotage-fc-2': Ill_16_fc_2,
  '16-pilotage-fc-3': Ill_16_fc_3,
  '16-pilotage-fc-4': Ill_16_fc_4,
  '16-pilotage-fc-5': Ill_16_fc_5,
  '16-pilotage-fc-6': Ill_16_fc_6,
  '17-marine-environment-fc-0': Ill_17_fc_0,
  '17-marine-environment-fc-1': Ill_17_fc_1,
  '17-marine-environment-fc-2': Ill_17_fc_2,
  '17-marine-environment-fc-3': Ill_17_fc_3,
  '17-marine-environment-fc-4': Ill_17_fc_4,
}
