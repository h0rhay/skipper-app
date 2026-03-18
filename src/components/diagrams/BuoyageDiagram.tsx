export function BuoyageDiagram() {
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Inter,sans-serif',
    fontSize: '9px',
    fontWeight: '700',
    color: '#555555',
    textAlign: 'center',
    marginTop: '6px',
    lineHeight: '1.3',
    letterSpacing: '0.2px',
  }
  const subStyle: React.CSSProperties = {
    ...labelStyle,
    fontSize: '8px',
    fontWeight: '400',
    color: '#888888',
  }
  const cellStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px 4px', padding: '4px 0' }}>

      {/* ── 1. Port (Region A) — Red Can ── */}
      <div style={cellStyle}>
        <svg viewBox="0 0 60 100" width="60" height="100" aria-label="Port lateral mark — red can buoy">
          {/* Staff */}
          <line x1="30" y1="8" x2="30" y2="28" stroke="#0A2540" strokeWidth="1.5"/>
          {/* Can body */}
          <rect x="16" y="28" width="28" height="38" rx="2" fill="#C41E3A"/>
          <line x1="16" y1="34" x2="44" y2="34" stroke="#A01830" strokeWidth="0.5"/>
          {/* Waterline / base */}
          <ellipse cx="30" cy="66" rx="14" ry="4" fill="#A01830"/>
          {/* Chain */}
          <line x1="30" y1="70" x2="30" y2="80" stroke="#888888" strokeWidth="1.5" strokeDasharray="3,2"/>
          {/* Red light symbol */}
          <circle cx="30" cy="8" r="5" fill="#C41E3A" stroke="#881020" strokeWidth="0.5"/>
          {/* Reflection */}
          <ellipse cx="28" cy="7" rx="2" ry="1.5" fill="#E84060" fillOpacity="0.5"/>
        </svg>
        <span style={labelStyle}>PORT</span>
        <span style={subStyle}>Red Can</span>
      </div>

      {/* ── 2. Starboard (Region A) — Green Conical ── */}
      <div style={cellStyle}>
        <svg viewBox="0 0 60 100" width="60" height="100" aria-label="Starboard lateral mark — green conical buoy">
          {/* Staff */}
          <line x1="30" y1="8" x2="30" y2="22" stroke="#0A2540" strokeWidth="1.5"/>
          {/* Conical topmark */}
          <polygon points="30,14 24,26 36,26" fill="#2D8A4E" stroke="#1A6A38" strokeWidth="0.5"/>
          {/* Conical hull body */}
          <path d="M 18 28 L 30 62 L 42 28 Z" fill="#2D8A4E" stroke="#1A6A38" strokeWidth="0.5"/>
          {/* Waterline */}
          <ellipse cx="30" cy="62" rx="12" ry="3.5" fill="#1A6A38"/>
          {/* Chain */}
          <line x1="30" y1="66" x2="30" y2="78" stroke="#888888" strokeWidth="1.5" strokeDasharray="3,2"/>
          {/* Green light */}
          <circle cx="30" cy="8" r="5" fill="#2D8A4E" stroke="#1A6A38" strokeWidth="0.5"/>
          <ellipse cx="28" cy="7" rx="2" ry="1.5" fill="#60C080" fillOpacity="0.5"/>
        </svg>
        <span style={labelStyle}>STBD</span>
        <span style={subStyle}>Green Conical</span>
      </div>

      {/* ── 3. North Cardinal — Black/Yellow, two up-pointing triangles ── */}
      <div style={cellStyle}>
        <svg viewBox="0 0 60 100" width="60" height="100" aria-label="North cardinal mark — black over yellow">
          {/* Staff */}
          <line x1="30" y1="4" x2="30" y2="18" stroke="#0A2540" strokeWidth="1.5"/>
          {/* Two upward triangles topmark */}
          <polygon points="30,4 24,14 36,14" fill="#0A2540"/>
          <polygon points="30,14 24,24 36,24" fill="#0A2540"/>
          {/* Pillar buoy body — BLACK on top, YELLOW below */}
          <rect x="22" y="24" width="16" height="20" rx="1" fill="#0A2540"/>
          <rect x="22" y="44" width="16" height="20" rx="1" fill="#F5C200"/>
          {/* Waterline */}
          <ellipse cx="30" cy="64" rx="10" ry="3" fill="#C9A000"/>
          {/* Chain */}
          <line x1="30" y1="67" x2="30" y2="78" stroke="#888888" strokeWidth="1.5" strokeDasharray="3,2"/>
          {/* White light */}
          <circle cx="30" cy="4" r="4" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="0.5"/>
          <circle cx="30" cy="4" r="2" fill="#FFFFCC"/>
        </svg>
        <span style={labelStyle}>CARDINAL N</span>
        <span style={subStyle}>Black / Yellow</span>
      </div>

      {/* ── 4. Isolated Danger — Black/Red bands, two balls ── */}
      <div style={cellStyle}>
        <svg viewBox="0 0 60 100" width="60" height="100" aria-label="Isolated danger mark — black and red banded buoy">
          {/* Staff */}
          <line x1="30" y1="6" x2="30" y2="18" stroke="#0A2540" strokeWidth="1.5"/>
          {/* Two balls topmark */}
          <circle cx="23" cy="10" r="6" fill="#0A2540"/>
          <circle cx="37" cy="10" r="6" fill="#0A2540"/>
          {/* Pillar body — alternating Black / Red / Black */}
          <rect x="21" y="18" width="18" height="14" rx="1" fill="#0A2540"/>
          <rect x="21" y="32" width="18" height="13" rx="1" fill="#C41E3A"/>
          <rect x="21" y="45" width="18" height="16" rx="1" fill="#0A2540"/>
          {/* Waterline */}
          <ellipse cx="30" cy="61" rx="10" ry="3" fill="#222222"/>
          {/* Chain */}
          <line x1="30" y1="64" x2="30" y2="76" stroke="#888888" strokeWidth="1.5" strokeDasharray="3,2"/>
          {/* White(2) flashing light */}
          <circle cx="30" cy="6" r="4" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="0.5"/>
          <circle cx="30" cy="6" r="2" fill="#FFFFCC"/>
        </svg>
        <span style={labelStyle}>ISOL. DANGER</span>
        <span style={subStyle}>Black/Red</span>
      </div>

      {/* ── 5. Safe Water — Red/White vertical stripes, single ball ── */}
      <div style={cellStyle}>
        <svg viewBox="0 0 60 100" width="60" height="100" aria-label="Safe water mark — red and white striped buoy">
          {/* Staff */}
          <line x1="30" y1="4" x2="30" y2="18" stroke="#0A2540" strokeWidth="1.5"/>
          {/* Single ball topmark */}
          <circle cx="30" cy="10" r="8" fill="#C41E3A" stroke="#881020" strokeWidth="0.5"/>
          <ellipse cx="28" cy="9" rx="3" ry="2" fill="#E84060" fillOpacity="0.5"/>
          {/* Spherical buoy body with vertical red/white stripes */}
          <ellipse cx="30" cy="50" rx="16" ry="22" fill="white" stroke="#0A2540" strokeWidth="1"/>
          {/* Red vertical stripes (3 stripes on visible face) */}
          <clipPath id="sphereClip">
            <ellipse cx="30" cy="50" rx="16" ry="22"/>
          </clipPath>
          <rect x="18" y="28" width="7" height="44" fill="#C41E3A" clipPath="url(#sphereClip)"/>
          <rect x="35" y="28" width="7" height="44" fill="#C41E3A" clipPath="url(#sphereClip)"/>
          {/* Re-draw outline over stripes */}
          <ellipse cx="30" cy="50" rx="16" ry="22" fill="none" stroke="#0A2540" strokeWidth="1"/>
          {/* Waterline */}
          <ellipse cx="30" cy="72" rx="16" ry="4" fill="#DDDDDD" fillOpacity="0.5"/>
          {/* Chain */}
          <line x1="30" y1="74" x2="30" y2="84" stroke="#888888" strokeWidth="1.5" strokeDasharray="3,2"/>
          {/* White isophase light */}
          <circle cx="30" cy="4" r="4" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="0.5"/>
          <circle cx="30" cy="4" r="2" fill="#FFFFCC"/>
        </svg>
        <span style={labelStyle}>SAFE WATER</span>
        <span style={subStyle}>Red/White</span>
      </div>

    </div>
  )
}
