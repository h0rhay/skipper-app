// Maps topic IDs, card IDs, and term names to generated illustration paths.
// Images live in public/illustrations/ and are served as static assets.

// Hero image for each topic's facts page
export function getHeroPath(topicId: string): string {
  return `/illustrations/hero-${topicId}.png`
}

// Per-card illustration for flashcards
export function getCardPath(cardId: string): string {
  return `/illustrations/card-${cardId}.png`
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
  'transit':            '/illustrations/term-10-transit.png',
}

export function getTermPath(term: string): string | null {
  return TERM_MAP[term.toLowerCase()] ?? null
}
