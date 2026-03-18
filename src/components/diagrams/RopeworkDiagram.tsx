export function RopeworkDiagram() {
  const knotStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center' }
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Inter,sans-serif',
    fontSize: '10px',
    fontWeight: '600',
    color: '#555555',
    textAlign: 'center',
    marginTop: '4px',
    letterSpacing: '0.3px',
    lineHeight: '1.3',
  }
  const rope = { fill: 'none', stroke: '#0A2540', strokeWidth: 5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const ropeLight = { ...rope, stroke: '#2A4A6A', strokeWidth: 3 }
  const post = { stroke: '#C8D8EC', strokeWidth: 8, strokeLinecap: 'round' as const }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px 8px', padding: '4px 0' }}>

      {/* ── Figure of Eight ── */}
      <div style={knotStyle}>
        <svg viewBox="0 0 80 72" width="80" height="72" aria-label="Figure of eight knot">
          {/* Entry tail from top */}
          <path d="M 40 8 L 40 20" {...rope}/>
          {/* Upper loop - crosses right over left */}
          <path d="M 40 20 C 56 20 64 30 56 38 C 48 46 32 42 32 34 C 32 26 40 20 40 20" {...rope}/>
          {/* Lower loop - crosses left over right */}
          <path d="M 56 38 C 64 50 56 64 40 62 C 24 60 16 48 24 40 C 32 32 40 42 40 42" {...rope}/>
          {/* Exit tail at bottom — hidden behind */}
          <path d="M 40 42 C 40 48 40 56 40 62" {...ropeLight}/>
        </svg>
        <span style={labelStyle}>Figure of Eight</span>
      </div>

      {/* ── Bowline ── */}
      <div style={knotStyle}>
        <svg viewBox="0 0 80 72" width="80" height="72" aria-label="Bowline knot">
          {/* Main loop (the rabbit hole) */}
          <ellipse cx="40" cy="52" rx="14" ry="11" fill="none" stroke="#0A2540" strokeWidth="5" strokeLinecap="round"/>
          {/* Standing part going up */}
          <path d="M 26 52 L 26 16" {...rope}/>
          {/* Bight — comes up through hole, round the standing part, back down */}
          <path d="M 40 41 C 40 30 32 26 28 22 C 26 20 26 16 26 16" fill="none" stroke="#0A2540" strokeWidth="4" strokeLinecap="round"/>
          {/* Working end going back down through loop */}
          <path d="M 40 41 C 48 38 52 44 54 52" fill="none" stroke="#2A4A6A" strokeWidth="4" strokeLinecap="round"/>
          {/* End tail */}
          <path d="M 54 52 L 54 64" {...ropeLight}/>
        </svg>
        <span style={labelStyle}>Bowline</span>
      </div>

      {/* ── Clove Hitch ── */}
      <div style={knotStyle}>
        <svg viewBox="0 0 80 72" width="80" height="72" aria-label="Clove hitch knot">
          {/* Post/spar */}
          <line x1="40" y1="4" x2="40" y2="68" {...post}/>
          {/* First turn — rope comes from left, goes over post, diagonally down-right */}
          <path d="M 14 26 C 28 26 40 26 52 26 C 60 26 62 30 60 36 C 58 42 50 44 40 44 C 30 44 22 42 16 44" fill="none" stroke="#0A2540" strokeWidth="5" strokeLinecap="round"/>
          {/* Cross-over going behind */}
          <path d="M 52 26 L 28 44" fill="none" stroke="#2A4A6A" strokeWidth="4" strokeLinecap="round"/>
          {/* Second turn — goes back over post left to right */}
          <path d="M 16 44 C 24 44 32 44 40 44 C 52 44 62 48 60 54 C 58 58 50 60 40 60 C 30 60 22 58 16 56" fill="none" stroke="#0A2540" strokeWidth="5" strokeLinecap="round"/>
          {/* Exit tail */}
          <path d="M 16 56 L 8 64" {...ropeLight}/>
        </svg>
        <span style={labelStyle}>Clove Hitch</span>
      </div>

      {/* ── Round Turn & Two Half Hitches ── */}
      <div style={knotStyle}>
        <svg viewBox="0 0 80 72" width="80" height="72" aria-label="Round turn and two half hitches">
          {/* Ring */}
          <circle cx="18" cy="36" r="12" fill="none" stroke="#C8D8EC" strokeWidth="6"/>
          {/* Round turn — two full wraps around the ring */}
          <path d="M 18 24 C 38 18 54 24 54 36 C 54 48 38 54 18 48" fill="none" stroke="#0A2540" strokeWidth="5" strokeLinecap="round"/>
          <path d="M 18 24 C 38 22 56 28 56 36 C 56 44 42 52 18 48" fill="none" stroke="#2A4A6A" strokeWidth="3" strokeLinecap="round" strokeDasharray="1,2"/>
          {/* First half hitch */}
          <path d="M 18 48 C 46 56 64 48 62 38" fill="none" stroke="#0A2540" strokeWidth="5" strokeLinecap="round"/>
          <path d="M 62 38 C 60 30 50 26 60 28 L 70 32" fill="none" stroke="#0A2540" strokeWidth="5" strokeLinecap="round"/>
          {/* Second half hitch */}
          <path d="M 70 32 C 72 38 68 46 60 46 L 70 50" fill="none" stroke="#2A4A6A" strokeWidth="4" strokeLinecap="round"/>
        </svg>
        <span style={labelStyle}>Round Turn + 2HH</span>
      </div>

      {/* ── Reef Knot ── */}
      <div style={knotStyle}>
        <svg viewBox="0 0 80 72" width="80" height="72" aria-label="Reef knot">
          {/* Left entry tail */}
          <path d="M 8 36 L 22 36" {...rope}/>
          {/* First overhand — left over right */}
          <path d="M 22 36 C 28 36 32 28 36 28 C 42 28 46 36 40 40 C 34 44 28 40 28 36 C 28 32 32 28 36 28" fill="none" stroke="#0A2540" strokeWidth="5" strokeLinecap="round"/>
          {/* Second overhand — right over left (creates the flat knot) */}
          <path d="M 40 40 C 44 44 50 44 54 40 C 58 36 56 28 50 28 C 44 28 40 36 44 40 C 48 44 52 42 54 40" fill="none" stroke="#2A4A6A" strokeWidth="4" strokeLinecap="round"/>
          {/* Right exit tail */}
          <path d="M 54 40 L 72 40" {...ropeLight}/>
          {/* Left tail going down */}
          <path d="M 28 36 L 18 50" {...ropeLight}/>
          {/* Right tail going down */}
          <path d="M 50 28 L 62 20" {...ropeLight}/>
        </svg>
        <span style={labelStyle}>Reef Knot</span>
      </div>

      {/* ── Rolling Hitch ── */}
      <div style={knotStyle}>
        <svg viewBox="0 0 80 72" width="80" height="72" aria-label="Rolling hitch">
          {/* Rope being hitched to (thicker, lighter) */}
          <line x1="40" y1="4" x2="40" y2="68" stroke="#C8D8EC" strokeWidth="10" strokeLinecap="round"/>
          {/* First turn — going left to right across */}
          <path d="M 12 44 C 26 44 40 44 54 38" fill="none" stroke="#0A2540" strokeWidth="5" strokeLinecap="round"/>
          {/* Second turn — parallel to first, slightly higher (the double turn that grips) */}
          <path d="M 12 38 C 26 38 40 36 54 30" fill="none" stroke="#0A2540" strokeWidth="5" strokeLinecap="round"/>
          {/* Third turn — crosses over */}
          <path d="M 54 30 C 62 28 66 32 62 38 C 58 44 50 46 40 46 C 30 46 20 46 14 50" fill="none" stroke="#0A2540" strokeWidth="5" strokeLinecap="round"/>
          {/* Load direction arrow */}
          <path d="M 14 50 L 8 58" {...ropeLight}/>
          {/* Cross-tie over standing part */}
          <path d="M 54 38 L 54 30" fill="none" stroke="#2A4A6A" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6"/>
        </svg>
        <span style={labelStyle}>Rolling Hitch</span>
      </div>

    </div>
  )
}
