export function BoatAnatomyDiagram() {
  return (
    <svg
      viewBox="0 0 400 310"
      width="100%"
      aria-label="Boat anatomy diagram showing side profile and top-down view"
    >
      {/* ═══════════════════════════════════════════════════════ */}
      {/* SIDE PROFILE VIEW                                       */}
      {/* ═══════════════════════════════════════════════════════ */}
      <text x="12" y="16" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#999999" letterSpacing="1.5">SIDE PROFILE</text>

      {/* Waterline */}
      <line x1="28" y1="192" x2="292" y2="192" stroke="#E5E5E5" strokeWidth="1.5" strokeDasharray="5,4"/>
      <text x="295" y="196" fontFamily="Inter,sans-serif" fontSize="8" fill="#AAAAAA">WL</text>

      {/* Hull — smooth sailing yacht shape */}
      <path
        d="M 55 170 Q 90 180 155 184 Q 220 180 268 168 L 258 192 Q 210 200 155 201 Q 100 200 65 192 Z"
        fill="#EBF2FA"
        stroke="#0A2540"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Deck line (cabin top suggestion) */}
      <path
        d="M 82 170 Q 130 162 155 162 Q 180 162 210 165 L 268 168"
        fill="none"
        stroke="#0A2540"
        strokeWidth="1"
        strokeOpacity="0.4"
        strokeDasharray="3,3"
      />

      {/* Keel */}
      <path
        d="M 148 192 L 142 242 L 168 242 L 162 192"
        fill="#C8D8EC"
        stroke="#0A2540"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Mast */}
      <line x1="155" y1="168" x2="155" y2="26" stroke="#0A2540" strokeWidth="2.5" strokeLinecap="round"/>

      {/* Boom */}
      <line x1="155" y1="156" x2="250" y2="172" stroke="#0A2540" strokeWidth="2" strokeLinecap="round"/>

      {/* Mainsail */}
      <path
        d="M 155 30 L 155 156 L 250 172 Z"
        fill="#0066CC"
        fillOpacity="0.10"
        stroke="#0066CC"
        strokeWidth="1.2"
        strokeOpacity="0.55"
        strokeLinejoin="round"
      />

      {/* Forestay wire */}
      <line x1="155" y1="30" x2="265" y2="170" stroke="#0A2540" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.7"/>

      {/* Jib sail */}
      <path
        d="M 155 48 L 265 170 L 155 162 Z"
        fill="#0066CC"
        fillOpacity="0.06"
        stroke="#0066CC"
        strokeWidth="1"
        strokeOpacity="0.4"
        strokeLinejoin="round"
      />

      {/* ── Labels with clean leader lines ── */}

      {/* BOW */}
      <line x1="265" y1="170" x2="286" y2="154" stroke="#CCCCCC" strokeWidth="1"/>
      <text x="289" y="158" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="700" fill="#0A2540">BOW</text>

      {/* STERN */}
      <line x1="55" y1="170" x2="32" y2="154" stroke="#CCCCCC" strokeWidth="1"/>
      <text x="4" y="158" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="700" fill="#0A2540">STERN</text>

      {/* MAST */}
      <line x1="155" y1="26" x2="176" y2="14" stroke="#CCCCCC" strokeWidth="1"/>
      <text x="179" y="18" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="700" fill="#0A2540">MAST</text>

      {/* BOOM */}
      <line x1="202" y1="166" x2="206" y2="182" stroke="#CCCCCC" strokeWidth="1"/>
      <text x="190" y="194" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="700" fill="#0A2540">BOOM</text>

      {/* MAINSAIL */}
      <text x="172" y="108" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#0066CC" letterSpacing="0.5">MAINSAIL</text>

      {/* JIB */}
      <text x="220" y="142" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#0066CC">JIB</text>

      {/* FORESTAY */}
      <text x="218" y="108" fontFamily="Inter,sans-serif" fontSize="8" fill="#888888">FORESTAY</text>

      {/* KEEL */}
      <line x1="162" y1="220" x2="186" y2="220" stroke="#CCCCCC" strokeWidth="1"/>
      <text x="188" y="224" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="700" fill="#0A2540">KEEL</text>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* DIVIDER                                                 */}
      {/* ═══════════════════════════════════════════════════════ */}
      <line x1="326" y1="12" x2="326" y2="292" stroke="#E5E5E5" strokeWidth="1.5"/>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TOP-DOWN VIEW                                           */}
      {/* ═══════════════════════════════════════════════════════ */}
      <text x="338" y="16" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#999999" letterSpacing="1.5">TOP VIEW</text>

      {/* Boat hull silhouette — pointed bow, wide beam, narrowing stern */}
      <path
        d="M 365 64 Q 380 90 382 152 Q 380 214 365 240 Q 352 248 346 240 Q 334 216 332 152 Q 334 88 346 64 Q 352 56 365 64 Z"
        fill="#EBF2FA"
        stroke="#0A2540"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Centreline */}
      <line x1="356" y1="64" x2="356" y2="240" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="3,3"/>

      {/* PORT side highlight (left = red) */}
      <path
        d="M 356 64 Q 332 88 332 152 Q 334 216 356 240"
        fill="none"
        stroke="#C41E3A"
        strokeWidth="3"
        strokeOpacity="0.75"
        strokeLinecap="round"
      />

      {/* STARBOARD side highlight (right = green) */}
      <path
        d="M 356 64 Q 380 90 382 152 Q 380 214 356 240"
        fill="none"
        stroke="#2D8A4E"
        strokeWidth="3"
        strokeOpacity="0.75"
        strokeLinecap="round"
      />

      {/* BOW arrow (top) */}
      <polygon points="356,46 350,60 362,60" fill="#0066CC"/>
      <text x="346" y="38" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="700" fill="#0066CC">BOW</text>

      {/* STERN label (bottom) */}
      <text x="340" y="264" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="700" fill="#0A2540">STERN</text>

      {/* PORT label */}
      <line x1="332" y1="152" x2="314" y2="152" stroke="#CCCCCC" strokeWidth="1"/>
      <text x="294" y="156" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="700" fill="#C41E3A">PORT</text>

      {/* STARBOARD label */}
      <line x1="382" y1="152" x2="394" y2="152" stroke="#CCCCCC" strokeWidth="1"/>
      <text x="338" y="292" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#2D8A4E">STBD</text>
      {/* Starboard annotation pointing right */}
      <text x="395" y="140" fontFamily="Inter,sans-serif" fontSize="8" fill="#2D8A4E" fontWeight="600">S</text>
      <text x="395" y="152" fontFamily="Inter,sans-serif" fontSize="8" fill="#2D8A4E" fontWeight="600">B</text>
      <text x="395" y="164" fontFamily="Inter,sans-serif" fontSize="8" fill="#2D8A4E" fontWeight="600">D</text>

    </svg>
  )
}
