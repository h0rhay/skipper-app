// Maps topic IDs, card IDs, and term names to illustration public IDs.
// Uses Cloudinary for optimised delivery when VITE_CLOUDINARY_CLOUD_NAME is set,
// falling back to local static assets in development.
//
// Add an entry here when a new image is generated. getCardPath returns null
// for cards without images so the caller never needs to guess.

import { imgUrl, placeholderUrl } from '#/lib/cloudinary'

const heroId = (topicId: string) => `skipper/illustrations/hero-${topicId}`
const cardId = (cardId: string) => `skipper/illustrations/card-${cardId}`
const termId = (name: string) => `skipper/illustrations/${name}`

// ─── Hero ─────────────────────────────────────────────────────
export const getHeroPath = (topicId: string) => imgUrl(heroId(topicId))
export const getHeroPlaceholder = (topicId: string) => placeholderUrl(heroId(topicId))

// ─── Card ─────────────────────────────────────────────────────
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

export const getCardPath = (id: string): string | null =>
  CARD_IMAGES.has(id) ? imgUrl(cardId(id)) : null

export const getCardPlaceholder = (id: string): string | null =>
  CARD_IMAGES.has(id) ? placeholderUrl(cardId(id)) : null

// ─── Term ─────────────────────────────────────────────────────
// Maps term text (case-insensitive) to its illustration filename.
const TERM_FILENAMES: Record<string, string> = {
  'bowline':            'term-01-bowline',
  'clove hitch':        'term-01-clove-hitch',
  'rolling hitch':      'term-01-rolling-hitch',
  'figure of eight':    'term-01-figure-of-eight',
  'keel':               'term-01-keel',
  'tacking':            'term-01-tacking',
  'scope':              'term-02-scope',
  'bruce anchor':       'term-02-bruce-anchor',
  'danforth anchor':    'term-02-danforth-anchor',
  'variation':          'term-05-variation',
  'deviation':          'term-05-deviation',
  'cocked hat':         'term-06-cocked-hat',
  'rule of twelfths':   'term-07-rule-of-twelfths',
  'round turn and two half hitches': 'term-01-round-turn-two-half-hitches',
  'reef knot':                        'term-01-reef-knot',
  'sheet bend':                       'term-01-sheet-bend',
  'delta anchor':                     'term-02-delta-anchor',
  'cqr anchor':                       'term-02-cqr-anchor',
  'fisherman\'s anchor':              'term-02-fishermans-anchor',
  'cardinal mark':                    'term-08-iala-north-cardinal',
  'south cardinal mark':              'term-08-iala-south-cardinal',
  'wind over tide':                   'term-09-wind-over-tide',
  'low pressure':                     'term-09-low-pressure',
  'transit':                          'term-10-transit',
}

export const getTermPath = (term: string): string | null => {
  const file = TERM_FILENAMES[term.toLowerCase()]
  return file ? imgUrl(termId(file)) : null
}

export const getTermPlaceholder = (term: string): string | null => {
  const file = TERM_FILENAMES[term.toLowerCase()]
  return file ? placeholderUrl(termId(file)) : null
}
