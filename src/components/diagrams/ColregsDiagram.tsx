export function ColregsDiagram() {
  return (
    <svg viewBox="0 0 380 220" width="100%" aria-label="COLREGS crossing scenario diagrams">
      <defs>
        <marker id="arrowBlue" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
          <polygon points="0 0, 8 3.5, 0 7" fill="#0066CC"/>
        </marker>
        <marker id="arrowNavy" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
          <polygon points="0 0, 8 3.5, 0 7" fill="#0A2540"/>
        </marker>
        <marker id="arrowRed" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
          <polygon points="0 0, 8 3.5, 0 7" fill="#C41E3A"/>
        </marker>
        <marker id="arrowGreen" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
          <polygon points="0 0, 8 3.5, 0 7" fill="#2D8A4E"/>
        </marker>
      </defs>

      {/* ════════════════════════════════ HEAD-ON (Rule 14) ════════════════════════════════ */}
      <text x="95" y="16" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#999999"
            letterSpacing="1" textAnchor="middle">HEAD-ON (RULE 14)</text>

      {/* Water background */}
      <rect x="14" y="22" width="164" height="120" rx="4" fill="#F0F6FF" stroke="#E5E5E5" strokeWidth="1"/>

      {/* Vessel A — approaching from left, heading right (blue) */}
      {/* Hull shape: pointing right */}
      <polygon points="36,95 70,85 70,105" fill="#0066CC" fillOpacity="0.85"/>
      {/* Mast */}
      <line x1="58" y1="85" x2="58" y2="75" stroke="#0A2540" strokeWidth="1"/>

      {/* Vessel B — approaching from right, heading left (navy) */}
      {/* Hull shape: pointing left */}
      <polygon points="150,85 150,105 116,95" fill="#0A2540" fillOpacity="0.85"/>
      <line x1="130" y1="85" x2="130" y2="75" stroke="#0A2540" strokeWidth="1"/>

      {/* Both alter to starboard — curved arrows */}
      {/* Vessel A turns to its starboard (upward in diagram) */}
      <path d="M 56 82 Q 56 58 72 50" fill="none" stroke="#0066CC" strokeWidth="2" markerEnd="url(#arrowBlue)"/>
      {/* Vessel B turns to its starboard (also upward = same direction) */}
      <path d="M 132 82 Q 132 58 116 50" fill="none" stroke="#0A2540" strokeWidth="2" markerEnd="url(#arrowNavy)"/>

      {/* Starboard labels */}
      <text x="74" y="48" fontFamily="Inter,sans-serif" fontSize="8" fill="#0066CC" fontWeight="600">stbd</text>
      <text x="98" y="48" fontFamily="Inter,sans-serif" fontSize="8" fill="#0A2540" fontWeight="600">stbd</text>

      {/* Rule text */}
      <text x="96" y="155" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#0A2540" textAnchor="middle">Both alter to starboard</text>
      <text x="96" y="168" fontFamily="Inter,sans-serif" fontSize="9" fill="#555555" textAnchor="middle">Pass port-to-port</text>

      {/* ═════════════════════════════════════ DIVIDER ════════════════════════════════════ */}
      <line x1="192" y1="16" x2="192" y2="198" stroke="#E5E5E5" strokeWidth="1.5"/>

      {/* ════════════════════════════════ CROSSING (Rule 15) ════════════════════════════ */}
      <text x="288" y="16" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#999999"
            letterSpacing="1" textAnchor="middle">CROSSING (RULE 15)</text>

      {/* Water background */}
      <rect x="200" y="22" width="172" height="160" rx="4" fill="#F0F6FF" stroke="#E5E5E5" strokeWidth="1"/>

      {/* Give-way vessel — approaching from left/bottom, heading right/up */}
      {/* Red = Give-way */}
      <polygon points="224,128 260,118 260,138" fill="#C41E3A" fillOpacity="0.85"/>
      <line x1="248" y1="118" x2="248" y2="108" stroke="#881020" strokeWidth="1"/>

      {/* Stand-on vessel — approaching from bottom, heading north */}
      {/* Green = Stand-on */}
      <polygon points="298,158 308,158 303,120" fill="#2D8A4E" fillOpacity="0.85"/>
      <line x1="303" y1="125" x2="295" y2="120" stroke="#1A6A38" strokeWidth="1"/>

      {/* Stand-on vessel continues straight ahead */}
      <line x1="303" y1="118" x2="303" y2="82" stroke="#2D8A4E" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowGreen)"/>

      {/* Give-way vessel alters course to pass astern */}
      <path d="M 258 132 Q 280 158 300 162 Q 318 165 330 155" fill="none"
            stroke="#C41E3A" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowRed)"/>

      {/* Labels */}
      <rect x="210" y="142" width="52" height="16" rx="2" fill="#C41E3A" fillOpacity="0.1"/>
      <text x="236" y="154" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#C41E3A" textAnchor="middle">GIVE-WAY</text>

      <rect x="310" y="126" width="52" height="16" rx="2" fill="#2D8A4E" fillOpacity="0.1"/>
      <text x="336" y="138" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#2D8A4E" textAnchor="middle">STAND-ON</text>

      {/* Rule text */}
      <text x="288" y="186" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#0A2540" textAnchor="middle">Other vessel on starboard</text>
      <text x="288" y="199" fontFamily="Inter,sans-serif" fontSize="9" fill="#555555" textAnchor="middle">→ you are the give-way vessel</text>

    </svg>
  )
}
