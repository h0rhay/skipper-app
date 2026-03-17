export function TidesDiagram() {
  const svgW = 360
  const svgH = 230
  const padL = 36
  const padR = 14
  const padT = 36
  const padB = 44
  const chartW = svgW - padL - padR
  const chartH = svgH - padT - padB

  // Tide curve: high water at t=0 and t=1, low water at t=0.5
  // Range occupies 80% of chart height, centred
  const hwY = padT + chartH * 0.08
  const lwY = padT + chartH * 0.92

  const points: [number, number][] = []
  for (let i = 0; i <= 120; i++) {
    const t = i / 120
    const tideHeight = (1 + Math.cos(t * 2 * Math.PI)) / 2 // 1=HW, 0=LW
    const x = padL + t * chartW
    const y = hwY + (lwY - hwY) * (1 - tideHeight)
    points.push([x, y])
  }

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const fillD =
    pathD +
    ` L ${points[points.length - 1][0].toFixed(1)} ${(padT + chartH).toFixed(1)}` +
    ` L ${padL} ${(padT + chartH).toFixed(1)} Z`

  // Hour marks for Rule of Twelfths
  const totalHours = 12.4

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH + 8}`} width="100%" aria-label="Tide curve diagram with Rule of Twelfths">

      {/* ── Chart border ── */}
      <rect
        x={padL} y={padT}
        width={chartW} height={chartH}
        fill="#FAFAFA" stroke="#EEEEEE" strokeWidth="1"
      />

      {/* ── HAT reference line ── */}
      <line x1={padL} y1={padT - 8} x2={padL + chartW} y2={padT - 8} stroke="#E5E5E5" strokeWidth="1" strokeDasharray="3,3"/>
      <text x="2" y={padT - 4} fontFamily="Inter,sans-serif" fontSize="8" fill="#AAAAAA">HAT</text>

      {/* ── HW reference line ── */}
      <line x1={padL} y1={hwY} x2={padL + chartW} y2={hwY} stroke="#0066CC" strokeWidth="0.75" strokeDasharray="4,4" strokeOpacity="0.4"/>
      <text x="2" y={hwY + 4} fontFamily="Inter,sans-serif" fontSize="8" fill="#0066CC" fontWeight="600">HW</text>

      {/* ── LW reference line ── */}
      <line x1={padL} y1={lwY} x2={padL + chartW} y2={lwY} stroke="#0066CC" strokeWidth="0.75" strokeDasharray="4,4" strokeOpacity="0.4"/>
      <text x="2" y={lwY + 4} fontFamily="Inter,sans-serif" fontSize="8" fill="#0066CC" fontWeight="600">LW</text>

      {/* ── Chart Datum at bottom ── */}
      <line x1={padL} y1={padT + chartH} x2={padL + chartW} y2={padT + chartH} stroke="#E5E5E5" strokeWidth="1.5" strokeDasharray="5,4"/>
      <text x="2" y={padT + chartH + 4} fontFamily="Inter,sans-serif" fontSize="8" fill="#999999" fontWeight="600">CD</text>

      {/* ── Tide curve fill ── */}
      <path d={fillD} fill="#0066CC" fillOpacity="0.07"/>

      {/* ── Tide curve line ── */}
      <path d={pathD} fill="none" stroke="#0066CC" strokeWidth="2.5" strokeLinejoin="round"/>

      {/* ── HW dot markers ── */}
      <circle cx={padL} cy={hwY} r="4" fill="#0066CC"/>
      <circle cx={padL + chartW} cy={hwY} r="4" fill="#0066CC"/>

      {/* ── LW dot marker ── */}
      <circle cx={padL + chartW / 2} cy={lwY} r="4" fill="#0066CC"/>

      {/* HIGH WATER label */}
      <text
        x={padL + 6}
        y={hwY - 8}
        fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#0066CC"
      >HIGH WATER</text>

      {/* LOW WATER label */}
      <text
        x={padL + chartW / 2 - 24}
        y={lwY + 16}
        fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#0066CC"
      >LOW WATER</text>

      {/* ── Range bracket ── */}
      <line x1={padL + 10} y1={hwY + 2} x2={padL + 10} y2={lwY - 2} stroke="#0A2540" strokeWidth="1.2"/>
      {/* Top tick */}
      <line x1={padL + 6} y1={hwY + 2} x2={padL + 14} y2={hwY + 2} stroke="#0A2540" strokeWidth="1.2"/>
      {/* Bottom tick */}
      <line x1={padL + 6} y1={lwY - 2} x2={padL + 14} y2={lwY - 2} stroke="#0A2540" strokeWidth="1.2"/>
      <text
        x={padL + 16}
        y={(hwY + lwY) / 2 + 4}
        fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#0A2540"
      >RANGE</text>

      {/* ── X-axis hour marks ── */}
      {[0, 2, 4, 6, 8, 10, 12].map((h) => {
        const x = padL + (h / totalHours) * chartW
        return (
          <g key={h}>
            <line x1={x} y1={padT + chartH} x2={x} y2={padT + chartH + 5} stroke="#CCCCCC" strokeWidth="1"/>
            <text
              x={x}
              y={padT + chartH + 16}
              fontFamily="Inter,sans-serif" fontSize="9" fill="#888888" textAnchor="middle"
            >{h}h</text>
          </g>
        )
      })}

      {/* ── Rule of Twelfths panel ── */}
      <rect x={svgW - 118} y={padT + 4} width={112} height={118} rx="4" fill="#FAFAFA" stroke="#EEEEEE" strokeWidth="1"/>
      <text
        x={svgW - 108} y={padT + 20}
        fontFamily="Inter,sans-serif" fontSize="8" fontWeight="700" fill="#999999" letterSpacing="1"
      >RULE OF TWELFTHS</text>

      {[
        ['Hr 1', '1/12', 8],
        ['Hr 2', '2/12', 16],
        ['Hr 3', '3/12', 24],
        ['Hr 4', '3/12', 24],
        ['Hr 5', '2/12', 16],
        ['Hr 6', '1/12', 8],
      ].map(([label, frac, barWidth], i) => {
        const yBase = padT + 36 + i * 16
        return (
          <g key={i}>
            <text x={svgW - 108} y={yBase} fontFamily="Inter,sans-serif" fontSize="9" fill="#555555">{label}</text>
            <rect x={svgW - 78} y={yBase - 9} width={barWidth as number} height="9" rx="1" fill="#0066CC" fillOpacity="0.25"/>
            <text x={svgW - 108 + 70} y={yBase} fontFamily="Inter,sans-serif" fontSize="9" fill="#0066CC" fontWeight="600">{frac}</text>
          </g>
        )
      })}

      {/* ── X-axis title ── */}
      <text
        x={padL + chartW / 2}
        y={svgH + 6}
        fontFamily="Inter,sans-serif" fontSize="9" fill="#999999" textAnchor="middle"
      >Time (semi-diurnal cycle ~12.4 hrs)</text>

    </svg>
  )
}
