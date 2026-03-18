export function CompassDiagram() {
  const cx = 130
  const cy = 155
  const r = 105
  const cardinalPts = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

  // Variation: 8° East (True to Magnetic)
  const variationDeg = 8
  // Deviation: 4° West (Magnetic to Compass) — so compass is 4° west of magnetic
  const deviationDeg = -4

  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180
  const px = (deg: number, radius: number) => cx + radius * Math.cos(toRad(deg))
  const py = (deg: number, radius: number) => cy + radius * Math.sin(toRad(deg))

  const mDeg = variationDeg
  const cDeg = mDeg + deviationDeg

  return (
    <svg viewBox="0 0 390 310" width="100%" aria-label="Compass diagram showing True, Magnetic and Compass north">

      {/* ── Outer ring decorations ── */}
      <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="#E5E5E5" strokeWidth="0.5"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E5E5E5" strokeWidth="1.5"/>
      <circle cx={cx} cy={cy} r={r - 12} fill="none" stroke="#F5F5F5" strokeWidth="0.5"/>

      {/* Degree tick marks every 10° */}
      {Array.from({ length: 36 }).map((_, i) => {
        const deg = i * 10
        const isCardinal = deg % 90 === 0
        const isIntercard = deg % 45 === 0
        const innerR = isCardinal ? r - 22 : isIntercard ? r - 18 : r - 10
        const outerR = r
        const a = toRad(deg)
        return (
          <line
            key={i}
            x1={cx + outerR * Math.cos(a)}
            y1={cy + outerR * Math.sin(a)}
            x2={cx + innerR * Math.cos(a)}
            y2={cy + innerR * Math.sin(a)}
            stroke="#CCCCCC"
            strokeWidth={isCardinal ? 1.5 : 0.75}
          />
        )
      })}

      {/* Cardinal & intercardinal labels */}
      {cardinalPts.map((pt, i) => {
        const deg = i * 45
        const a = toRad(deg)
        const tr = r + 20
        const isCardinal = i % 2 === 0
        return (
          <text
            key={pt}
            x={cx + tr * Math.cos(a)}
            y={cy + tr * Math.sin(a)}
            fontFamily="Inter,sans-serif"
            fontSize={isCardinal ? 13 : 10}
            fontWeight={isCardinal ? '700' : '400'}
            fill={isCardinal ? '#0A2540' : '#777777'}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {pt}
          </text>
        )
      })}

      {/* ── Compass rose inner fill ── */}
      <circle cx={cx} cy={cy} r={14} fill="#F8FAFD" stroke="#E5E5E5" strokeWidth="1"/>

      {/* ── TRUE NORTH needle (solid navy, straight up = 0°) ── */}
      <line x1={cx} y1={cy} x2={px(0, r - 18)} y2={py(0, r - 18)} stroke="#0A2540" strokeWidth="3" strokeLinecap="round"/>
      {/* North tip arrowhead */}
      <polygon
        points={`${px(0, r - 16)},${py(0, r - 16)} ${px(-3, r - 28)},${py(-3, r - 28)} ${px(3, r - 28)},${py(3, r - 28)}`}
        fill="#0A2540"
      />
      {/* T label */}
      <text x={px(0, r - 10) + 6} y={py(0, r - 10) - 4} fontFamily="Inter,sans-serif" fontSize="11" fontWeight="800" fill="#0A2540">T</text>

      {/* ── MAGNETIC NORTH needle (blue dashed, variation east = +8°) ── */}
      <line
        x1={cx} y1={cy}
        x2={px(mDeg, r - 22)} y2={py(mDeg, r - 22)}
        stroke="#0066CC" strokeWidth="2.5" strokeDasharray="6,4" strokeLinecap="round"
      />
      <polygon
        points={`${px(mDeg, r - 20)},${py(mDeg, r - 20)} ${px(mDeg - 3, r - 30)},${py(mDeg - 3, r - 30)} ${px(mDeg + 3, r - 30)},${py(mDeg + 3, r - 30)}`}
        fill="#0066CC"
      />
      {/* M label */}
      <text x={px(mDeg, r - 8) + 6} y={py(mDeg, r - 8)} fontFamily="Inter,sans-serif" fontSize="11" fontWeight="800" fill="#0066CC">M</text>

      {/* ── COMPASS NORTH needle (red dashed, deviation west = -4° from M = +4° True) ── */}
      <line
        x1={cx} y1={cy}
        x2={px(cDeg, r - 32)} y2={py(cDeg, r - 32)}
        stroke="#C41E3A" strokeWidth="2" strokeDasharray="3,4" strokeLinecap="round"
      />
      <polygon
        points={`${px(cDeg, r - 30)},${py(cDeg, r - 30)} ${px(cDeg - 3, r - 40)},${py(cDeg - 3, r - 40)} ${px(cDeg + 3, r - 40)},${py(cDeg + 3, r - 40)}`}
        fill="#C41E3A"
      />
      {/* C label */}
      <text x={px(cDeg, r - 20) - 16} y={py(cDeg, r - 20) - 6} fontFamily="Inter,sans-serif" fontSize="11" fontWeight="800" fill="#C41E3A">C</text>

      {/* ── Variation arc annotation ── */}
      {/* Small arc between T (0°) and M (8°) near the rim */}
      <path
        d={`M ${px(1, r - 40)} ${py(1, r - 40)} A ${r - 40} ${r - 40} 0 0 1 ${px(mDeg - 1, r - 40)} ${py(mDeg - 1, r - 40)}`}
        fill="none" stroke="#0066CC" strokeWidth="1.5" strokeOpacity="0.6"
      />

      {/* ── Legend panel ── */}
      <rect x="260" y="48" width="122" height="128" rx="4" fill="#FAFAFA" stroke="#E5E5E5" strokeWidth="1"/>
      <text x="272" y="68" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#999999" letterSpacing="1.5">LEGEND</text>

      {/* True */}
      <line x1="272" y1="88" x2="304" y2="88" stroke="#0A2540" strokeWidth="3"/>
      <text x="310" y="92" fontFamily="Inter,sans-serif" fontSize="11" fill="#0A2540" fontWeight="600">True (T)</text>

      {/* Magnetic */}
      <line x1="272" y1="110" x2="304" y2="110" stroke="#0066CC" strokeWidth="2.5" strokeDasharray="6,4"/>
      <text x="310" y="114" fontFamily="Inter,sans-serif" fontSize="11" fill="#0066CC" fontWeight="600">Magnetic (M)</text>

      {/* Compass */}
      <line x1="272" y1="132" x2="304" y2="132" stroke="#C41E3A" strokeWidth="2" strokeDasharray="3,4"/>
      <text x="310" y="136" fontFamily="Inter,sans-serif" fontSize="11" fill="#C41E3A" fontWeight="600">Compass (C)</text>

      {/* ── Variation & Deviation explanation ── */}
      <rect x="260" y="192" width="122" height="100" rx="4" fill="#FAFAFA" stroke="#E5E5E5" strokeWidth="1"/>

      <text x="272" y="210" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#0066CC" letterSpacing="0.5">VARIATION</text>
      <text x="272" y="224" fontFamily="Inter,sans-serif" fontSize="9" fill="#555555">Angle T → M</text>
      <text x="272" y="237" fontFamily="Inter,sans-serif" fontSize="9" fill="#555555">Due to Earth's</text>
      <text x="272" y="250" fontFamily="Inter,sans-serif" fontSize="9" fill="#555555">magnetic field</text>

      <text x="272" y="268" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#C41E3A" letterSpacing="0.5">DEVIATION</text>
      <text x="272" y="281" fontFamily="Inter,sans-serif" fontSize="9" fill="#555555">Angle M → C</text>

      {/* Formula */}
      <text x="14" y="288" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#999999" letterSpacing="0.5">T(rue) + V(ariation) = M(ag) + D(eviation) = C(ompass)</text>

    </svg>
  )
}
