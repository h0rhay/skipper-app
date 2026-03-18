// Maps topic IDs, card IDs, and term names to generated illustration paths.
// Images live in public/illustrations/ and are served as static assets.
//
// Add an entry here when a new image is generated. getCardPath returns null
// for cards without images so the caller never needs to guess.

// Hero image for each topic's facts page
export function getHeroPath(topicId: string): string {
  return `/illustrations/hero-${topicId}.png`
}

// Exhaustive list of card IDs that have generated images.
// Update this when running scripts/generate-illustrations.mjs.
const CARD_IMAGES = new Set([
  '01-nautical-terms-fc-0',
  '01-nautical-terms-fc-1',
  '01-nautical-terms-fc-2',
  '01-nautical-terms-fc-3',
  '01-nautical-terms-fc-4',
  '01-nautical-terms-fc-7',
  '01-nautical-terms-fc-11',
  '02-ropework-fc-1',
  '02-ropework-fc-2',
  '02-ropework-fc-3',
  '02-ropework-fc-6',
  '03-anchorwork-fc-0',
  '03-anchorwork-fc-1',
  '03-anchorwork-fc-2',
  '03-anchorwork-fc-4',
  '04-safety-fc-0',
  '04-safety-fc-1',
  '04-safety-fc-2',
  '04-safety-fc-3',
  '04-safety-fc-9',
  '05-irpcs-colregs-fc-1',
  '05-irpcs-colregs-fc-2',
  '05-irpcs-colregs-fc-4',
  '05-irpcs-colregs-fc-6',
  '06-position-course-speed-fc-0',
  '06-position-course-speed-fc-1',
  '06-position-course-speed-fc-2',
  '06-position-course-speed-fc-4',
  '07-charts-and-publications-fc-0',
  '07-charts-and-publications-fc-1',
  '07-charts-and-publications-fc-2',
  '08-navigational-instruments-fc-0',
  '08-navigational-instruments-fc-1',
  '08-navigational-instruments-fc-2',
  '09-compass-fc-0',
  '09-compass-fc-1',
  '09-compass-fc-3',
  '10-chartwork-fc-1',
  '10-chartwork-fc-2',
  '10-chartwork-fc-3',
  '11-tides-fc-0',
  '11-tides-fc-1',
  '11-tides-fc-3',
  '12-visual-aids-buoyage-fc-0',
  '12-visual-aids-buoyage-fc-1',
  '12-visual-aids-buoyage-fc-2',
  '12-visual-aids-buoyage-fc-3',
  '12-visual-aids-buoyage-fc-4',
  '12-visual-aids-buoyage-fc-5',
  '12-visual-aids-buoyage-fc-6',
  '12-visual-aids-buoyage-fc-7',
  '12-visual-aids-buoyage-fc-8',
  '12-visual-aids-buoyage-fc-9',
  '13-meteorology-fc-0',
  '13-meteorology-fc-1',
  '13-meteorology-fc-2',
  '13-meteorology-fc-4',
  '14-passage-planning-fc-0',
  '14-passage-planning-fc-1',
  '14-passage-planning-fc-5',
  '15-restricted-visibility-fc-2',
  '15-restricted-visibility-fc-3',
  '15-restricted-visibility-fc-5',
  '16-pilotage-fc-0',
  '16-pilotage-fc-1',
  '16-pilotage-fc-2',
  '16-pilotage-fc-3',
  '17-marine-environment-fc-0',
  '17-marine-environment-fc-2',
  '17-marine-environment-fc-3',
])

// Returns the illustration path for a card, or null if none exists.
export function getCardPath(cardId: string): string | null {
  return CARD_IMAGES.has(cardId) ? `/illustrations/card-${cardId}.png` : null
}

// Per-term illustration — keyed by term text (case-insensitive)
const TERM_MAP: Record<string, string> = {
  'bowline':            '/illustrations/term-01-bowline.png',
  'clove hitch':        '/illustrations/term-01-clove-hitch.png',
  'rolling hitch':      '/illustrations/term-01-rolling-hitch.png',
  'figure of eight':    '/illustrations/term-01-figure-of-eight.png',
  'keel':               '/illustrations/term-01-keel.png',
  'tacking':            '/illustrations/term-01-tacking.png',
  'scope':              '/illustrations/term-02-scope.png',
  'bruce anchor':       '/illustrations/term-02-bruce-anchor.png',
  'danforth anchor':    '/illustrations/term-02-danforth-anchor.png',
  'variation':          '/illustrations/term-05-variation.png',
  'deviation':          '/illustrations/term-05-deviation.png',
  'cocked hat':         '/illustrations/term-06-cocked-hat.png',
  'rule of twelfths':   '/illustrations/term-07-rule-of-twelfths.png',
  'cardinal mark':      '/illustrations/term-08-iala-north-cardinal.png',
  'wind over tide':     '/illustrations/term-09-wind-over-tide.png',
  'transit':            '/illustrations/term-10-transit.png',
}

export function getTermPath(term: string): string | null {
  return TERM_MAP[term.toLowerCase()] ?? null
}
