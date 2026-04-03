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
  '05-irpcs-colregs-fc-0',
  '05-irpcs-colregs-fc-1',
  '05-irpcs-colregs-fc-2',
  '05-irpcs-colregs-fc-3',
  '05-irpcs-colregs-fc-4',
  '05-irpcs-colregs-fc-5',
  '05-irpcs-colregs-fc-6',
  '05-irpcs-colregs-fc-7',
  '06-position-course-speed-fc-0',
  '06-position-course-speed-fc-1',
  '06-position-course-speed-fc-2',
  '06-position-course-speed-fc-3',
  '06-position-course-speed-fc-4',
  '06-position-course-speed-fc-6',
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
  'scope':              'term-03-scope',
  'bruce anchor':       'term-03-bruce-anchor',
  'danforth anchor':    'term-03-danforth-anchor',
  'variation':          'term-05-variation',
  'deviation':          'term-05-deviation',
  'cocked hat':         'term-06-cocked-hat',
  'rule of twelfths':   'term-07-rule-of-twelfths',
  'round turn and two half hitches': 'term-01-round-turn-two-half-hitches',
  'reef knot':                        'term-01-reef-knot',
  'sheet bend':                       'term-01-sheet-bend',
  'delta anchor':                     'term-03-delta-anchor',
  'cqr anchor':                       'term-03-cqr-anchor',
  'fisherman\'s anchor':              'term-03-fishermans-anchor',
  'lifejacket':                        'term-04-lifejacket',
  'buoyancy aid':                      'term-04-buoyancy-aid',
  'epirb':                             'term-04-epirb',
  'plb':                               'term-04-plb',
  'liferaft':                          'term-04-liferaft',
  'parachute flare':                   'term-04-parachute-flare',
  // Topic 05 — IRPCS
  'give-way vessel':                   'card-05-irpcs-colregs-fc-1',
  'crossing situation':                'card-05-irpcs-colregs-fc-1',
  'stand-on vessel':                   'card-05-irpcs-colregs-fc-5',
  'head-on situation':                 'card-05-irpcs-colregs-fc-2',
  'narrow channel':                    'card-05-irpcs-colregs-fc-6',
  'risk of collision':                 'card-05-irpcs-colregs-fc-0',
  'steaming light':                    'term-05-lights-power-vessel',
  'day shape':                         'term-05-anchor-ball',
  'motoring cone':                     'term-05-motoring-cone',
  'overtaking situation':              'term-05-overtaking',
  'traffic separation scheme (tss)':   'term-05-tss',
  'tricolour light':                   'term-05-tricolour-light',

  // Topic 06 — Position, Course and Speed
  'latitude':                          'term-06-latitude',
  'parallel of latitude':              'term-06-latitude',
  'longitude':                         'term-06-longitude',
  'meridian':                          'term-06-longitude',
  'nautical mile':                     'card-06-position-course-speed-fc-0',
  'knot':                              'card-06-position-course-speed-fc-1',
  'true bearing':                      'card-06-position-course-speed-fc-4',
  'magnetic bearing':                  'card-06-position-course-speed-fc-4',
  'compass bearing':                   'card-06-position-course-speed-fc-4',
  'relative bearing':                  'term-06-relative-bearing',

  // Topic 01 — Nautical Terms (reuse flashcard images)
  'draught':                           'card-01-nautical-terms-fc-2',
  'leech':                             'card-01-nautical-terms-fc-3',
  'luff':                              'card-01-nautical-terms-fc-3',
  'port':                              'card-01-nautical-terms-fc-0',

  // Topic 04 — Safety (reuse flashcard image)
  'harness':                           'card-04-safety-fc-0',

  // Topic 07 — Charts and Publications (reuse flashcard images)
  'rock awash':                        'card-07-charts-and-publications-fc-1',
  'sounding':                          'card-07-charts-and-publications-fc-0',

  // Topic 08 — Navigational Instruments (reuse flashcard images)
  'breton plotter':                    'card-08-navigational-instruments-fc-2',
  'parallel rulers':                   'card-08-navigational-instruments-fc-0',
  'portland plotter':                  'card-08-navigational-instruments-fc-2',

  'cardinal mark':                     'term-08-iala-north-cardinal',
  'south cardinal mark':               'term-08-iala-south-cardinal',
  'wind over tide':                    'term-09-wind-over-tide',
  'low pressure':                      'term-09-low-pressure',

  // Topic 10 — Chartwork (reuse flashcard image)
  'fix':                               'card-10-chartwork-fc-1',
  'transit':                           'term-10-transit',

  // Topic 12 — IALA Buoyage (reuse flashcard images)
  'emergency wreck marking buoy':      'card-12-visual-aids-buoyage-fc-8',
  'isolated danger mark':              'card-12-visual-aids-buoyage-fc-5',
  'safe water mark':                   'card-12-visual-aids-buoyage-fc-6',
  'special mark':                      'card-12-visual-aids-buoyage-fc-7',

  // Topic 14 — Passage Planning (reuse flashcard image)
  'clearing bearing':                  'card-14-passage-planning-fc-1',

  // Topic 16 — Pilotage (reuse flashcard images)
  'leading line':                      'card-16-pilotage-fc-1',

  // Topic 17 — Marine Environment (reuse flashcard image)
  'marpol':                            'card-17-marine-environment-fc-0',
}

export const getTermPath = (term: string): string | null => {
  const file = TERM_FILENAMES[term.toLowerCase()]
  return file ? imgUrl(termId(file)) : null
}

export const getTermPlaceholder = (term: string): string | null => {
  const file = TERM_FILENAMES[term.toLowerCase()]
  return file ? placeholderUrl(termId(file)) : null
}
