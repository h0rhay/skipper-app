export function ChartworkDiagram() {
  return (
    <svg viewBox="0 0 380 230" width="100%" aria-label="Chartwork symbols — DR, EP and Fix positions">
      <defs>
        <marker id="cwArrowNavy" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
          <polygon points="0 0, 8 3.5, 0 7" fill="#0A2540"/>
        </marker>
        <marker id="cwArrowBlue" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
          <polygon points="0 0, 8 3.5, 0 7" fill="#0066CC"/>
        </marker>
        <marker id="cwArrowRed" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
          <polygon points="0 0, 8 3.5, 0 7" fill="#C41E3A"/>
        </marker>
        <marker id="cwArrowGreen" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
          <polygon points="0 0, 8 3.5, 0 7" fill="#2D8A4E"/>
        </marker>
      </defs>

      {/* ── Chart background with light grid ── */}
      <rect x="14" y="14" width="356" height="186" rx="4" fill="#F6F9FE" stroke="#E5E5E5" strokeWidth="1"/>

      {/* Latitude/longitude grid */}
      {[0, 1, 2, 3, 4].map(i => (
        <line key={`h${i}`} x1="14" y1={46 + i * 40} x2="370" y2={46 + i * 40}
              stroke="#E8EEF5" strokeWidth="0.75"/>
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <line key={`v${i}`} x1={20 + i * 50} y1="14" x2={20 + i * 50} y2="200"
              stroke="#E8EEF5" strokeWidth="0.75"/>
      ))}

      {/* ── Points layout ──
          FIX at (68, 158)
          DR at (228, 82)
          EP at (270, 104)  (DR + tidal vector)
      ── */}

      {/* === Course steered line (FIX → DR) === */}
      <line x1="68" y1="158" x2="220" y2="84"
            stroke="#0A2540" strokeWidth="2" strokeDasharray="10,5" markerEnd="url(#cwArrowNavy)"/>
      {/* Course label rotated along line */}
      <text
        x="140" y="126" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="600" fill="#0A2540"
        textAnchor="middle" transform="rotate(-29, 140, 126)"
      >Course to steer 045°T</text>

      {/* === Tidal stream vector (DR → EP) === */}
      <line x1="228" y1="82" x2="268" y2="102"
            stroke="#0066CC" strokeWidth="2.5" markerEnd="url(#cwArrowBlue)"/>
      {/* Triple arrow convention for tidal stream */}
      <line x1="234" y1="84" x2="262" y2="98" stroke="#0066CC" strokeWidth="1" strokeOpacity="0.5"/>
      <line x1="240" y1="87" x2="256" y2="96" stroke="#0066CC" strokeWidth="1" strokeOpacity="0.5"/>
      <text x="268" y="88" fontFamily="Inter,sans-serif" fontSize="9" fill="#0066CC" fontWeight="600">Tidal stream</text>
      <text x="268" y="100" fontFamily="Inter,sans-serif" fontSize="9" fill="#0066CC">080°, 1.8kn</text>

      {/* === Ground track (FIX → EP dashed red) === */}
      <line x1="68" y1="158" x2="265" y2="103"
            stroke="#C41E3A" strokeWidth="1.2" strokeDasharray="4,4" markerEnd="url(#cwArrowRed)"/>

      {/* ──────────────── SYMBOLS ──────────────── */}

      {/* FIX — circle with central dot (green) */}
      <circle cx="68" cy="158" r="8" fill="none" stroke="#2D8A4E" strokeWidth="2.5"/>
      <circle cx="68" cy="158" r="2.5" fill="#2D8A4E"/>
      <line x1="68" y1="150" x2="68" y2="140" stroke="#2D8A4E" strokeWidth="1"/>
      <text x="76" y="145" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#2D8A4E">FIX</text>
      <text x="58" y="176" fontFamily="Inter,sans-serif" fontSize="8" fill="#2D8A4E">14:00</text>

      {/* DR — cross symbol (navy) */}
      <line x1="218" y1="72" x2="238" y2="92" stroke="#0A2540" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="238" y1="72" x2="218" y2="92" stroke="#0A2540" strokeWidth="2.5" strokeLinecap="round"/>
      <text x="240" y="76" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#0A2540">DR</text>
      <text x="218" y="102" fontFamily="Inter,sans-serif" fontSize="8" fill="#0A2540">14:45</text>

      {/* EP — triangle (red) */}
      <polygon points="270,98 260,116 280,116" fill="none" stroke="#C41E3A" strokeWidth="2.5"/>
      <text x="283" y="112" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#C41E3A">EP</text>
      <text x="258" y="128" fontFamily="Inter,sans-serif" fontSize="8" fill="#C41E3A">14:45</text>

      {/* ── Legend panel ── */}
      <rect x="18" y="18" width="180" height="56" rx="3" fill="white" fillOpacity="0.9" stroke="#EEEEEE" strokeWidth="1"/>

      {/* Fix */}
      <circle cx="34" cy="34" r="5" fill="none" stroke="#2D8A4E" strokeWidth="2"/>
      <circle cx="34" cy="34" r="1.5" fill="#2D8A4E"/>
      <text x="44" y="38" fontFamily="Inter,sans-serif" fontSize="9" fill="#2D8A4E" fontWeight="600">Fix — observed position</text>

      {/* DR */}
      <line x1="28" y1="52" x2="40" y2="52" stroke="#0A2540" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="34" y1="46" x2="34" y2="58" stroke="#0A2540" strokeWidth="2.5" strokeLinecap="round"/>
      <text x="44" y="56" fontFamily="Inter,sans-serif" fontSize="9" fill="#0A2540" fontWeight="600">DR — dead reckoning</text>

      {/* EP */}
      <polygon points="34,62 28,72 40,72" fill="none" stroke="#C41E3A" strokeWidth="2"/>
      <text x="44" y="72" fontFamily="Inter,sans-serif" fontSize="9" fill="#C41E3A" fontWeight="600">EP — estimated position</text>

    </svg>
  )
}
