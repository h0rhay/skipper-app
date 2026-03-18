/**
 * Skipper — AI Illustration Generator
 * Uses Gemini image generation to create nautical illustrations.
 *
 * Usage:
 *   GEMINI_API_KEY=xxx node scripts/generate-illustrations.mjs
 *   GEMINI_API_KEY=xxx node scripts/generate-illustrations.mjs --filter hero
 *   GEMINI_API_KEY=xxx node scripts/generate-illustrations.mjs --id hero-01-nautical-terms
 */

import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "illustrations");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ─── MASTER STYLE PROMPT ─────────────────────────────────────────────────────
// Appended to every subject description. This is what ensures visual
// consistency across all images.
const STYLE = `
VISUAL STYLE — follow exactly:
Elegant two-color nautical illustration. Navy blue (#0066CC) and white only. No other colors, no grey, no gradients, no shadows, no shading.

Technique: fine navy blue line art on a pure white background — like a high-quality steel engraving, copper etching, or Admiralty chart illustration. Clean, precise lines with confident strokes. Where shapes are filled, use solid navy blue with fine white detail lines cut through the fill. Mix of fine linework and selective solid fills — not everything solid, not everything outline.

Character: refined, elegant, technical. The aesthetic of a vintage Admiralty nautical chart, a 19th century maritime engraving, or a quality sailing publication illustration. Precise and factually accurate. Strokes are 1–2px for fine detail, 2–3px for primary outlines — elegant and considered, never crude or chunky.

Composition: centered subject on a PURE WHITE background. Generous white margin. Clean and airy — not packed with detail.

Accuracy: for knots, rigging, anchors, instruments and technical subjects — the illustration must be factually correct and recognizable to a trained sailor or navigator. Show the subject as it actually appears, not a simplified approximation.

HARD RULES:
- NO text, NO labels, NO numbers, NO letters anywhere in the image.
- NO gradients, NO drop shadows, NO glow effects, NO photographic realism.
- BOATS: elegant hull profile with visible keel, mast, and sails. Side profile unless stated otherwise.
- WIND arrows point DOWNWARD (wind blows from top of image toward bottom).
- KNOTS: must show the actual rope path accurately — the correct over/under sequence, the correct loop geometry. A sailor must be able to identify the knot and tie it from the illustration.
- Style reference: the fine line illustrations in an RYA training manual, or the engraved nautical vignettes on vintage Admiralty charts.
`.trim();

// ─── IMAGE MANIFEST ──────────────────────────────────────────────────────────
// Each entry: id (used for filename), type, ratio, and subject description.
// ratio: '3:2' for hero/landscape, '1:1' for card/term illustrations
export const IMAGES = [

  // ── HERO IMAGES ─ one per topic, landscape format ──────────────────────────

  { id: "hero-01-nautical-terms", type: "hero", ratio: "3:2",
    subject: "A classic cruising sailboat under full sail at sea, heeled over in a breeze. Side profile view. Visible hull, keel below waterline, mast, mainsail, and headsail. Small waves with white foam. Confident maritime illustration." },

  { id: "hero-02-ropework", type: "hero", ratio: "3:2",
    subject: "A coiled mooring rope in the foreground with three knots visible nearby: a bowline loop, a cleat hitch on a cleat, and a figure-of-eight. Arranged artfully on a wooden dock surface." },

  { id: "hero-03-anchorwork", type: "hero", ratio: "3:2",
    subject: "A CQR plough anchor hanging from a bow roller, with heavy chain links dropping below it. Water surface visible. Seabed with sandy texture below. Bold anchor silhouette." },

  { id: "hero-04-safety", type: "hero", ratio: "3:2",
    subject: "A lifebuoy ring mounted on a stanchion, with a crew member in a safety harness clipped to a jackstay wire running along the deck. Rough sea conditions suggested by wave lines." },

  { id: "hero-05-colregs", type: "hero", ratio: "3:2",
    subject: "Two motor vessels at sea in a crossing situation, viewed from slightly above. The vessel coming from the right has a straight arrow showing it holding course. The vessel on the left has a curved arrow showing it giving way to starboard. Both vessels are clearly recognizable boat-shaped silhouettes with wakes." },

  { id: "hero-06-position-course-speed", type: "hero", ratio: "3:2",
    subject: "A ship's compass binnacle with the compass rose visible, alongside parallel rulers and pencil on a nautical chart. Depth soundings visible on the chart. Navigation plotting scene." },

  { id: "hero-07-charts", type: "hero", ratio: "3:2",
    subject: "An Admiralty nautical chart partially unrolled, showing a coastline, depth soundings, buoy symbols, and a compass rose. Parallel rulers resting diagonally across the chart." },

  { id: "hero-08-instruments", type: "hero", ratio: "3:2",
    subject: "Navigational instruments arranged on a chart: parallel rulers, brass dividers, a pencil, and a Portland plotter. Top-down flat-lay view. Clean technical illustration." },

  { id: "hero-09-compass", type: "hero", ratio: "3:2",
    subject: "A detailed compass rose showing the 32 points of the compass, with a bold north arrow. A second smaller magnetic north arrow offset slightly to the left showing variation. Clean, precise nautical compass illustration." },

  { id: "hero-10-chartwork", type: "hero", ratio: "3:2",
    subject: "A nautical chart with a plotted course line, dead reckoning position (circle with dot), estimated position (triangle with dot), and a fix (circle with cross). Tidal stream arrows showing drift. Classic chartwork symbols." },

  { id: "hero-11-tides", type: "hero", ratio: "3:2",
    subject: "A coastal cliff face with clear high water and low water marks. A sine-wave tide curve shown alongside. Seabed with exposed rocks at low tide, covered at high tide. Rule of twelfths bars alongside." },

  { id: "hero-12-buoyage", type: "hero", ratio: "3:2",
    subject: "A row of five IALA buoys: red can buoy (port), green conical buoy (starboard), black-yellow pillar with two upward cones (north cardinal), yellow X-topmark (special mark), and red-white striped sphere (safe water). Floating on calm sea." },

  { id: "hero-13-meteorology", type: "hero", ratio: "3:2",
    subject: "A weather map showing curved isobar lines around a low pressure centre marked L. Wind arrows circling anticlockwise. Storm waves building on the sea below. Barometer visible at the side." },

  { id: "hero-14-passage-planning", type: "hero", ratio: "3:2",
    subject: "A harbour entrance viewed from above, with a planned passage route marked. Two transit marks aligned. Depth contour lines. A clearing bearing line running clear of rocks. A small sailboat approaching on the safe route." },

  { id: "hero-15-restricted-visibility", type: "hero", ratio: "3:2",
    subject: "A sailboat in dense fog. Fog haze lines across the image. A foghorn at the bow sending bold sound wave arcs ahead. Radar scanner on the mast rotating. Very limited visibility ahead." },

  { id: "hero-16-pilotage", type: "hero", ratio: "3:2",
    subject: "A harbour entrance from the approaching boat's perspective. Two transit marks (a church steeple behind a harbour post) perfectly aligned vertically. The boat on the correct leading line track. Rocks visible to the side." },

  { id: "hero-17-marine-environment", type: "hero", ratio: "3:2",
    subject: "An anchor resting gently on a sandy seabed, carefully positioned away from a patch of seagrass. Seagrass plants visible with distinctive blade shapes. Clean clear water above." },

  // ── FLASHCARD ILLUSTRATIONS ─ selected high-impact cards ───────────────────

  // Topic 01 — Nautical Terms
  { id: "card-01-nautical-terms-fc-0", type: "card", ratio: "1:1",
    subject: "A sailing boat viewed from directly ahead (head-on). The left half of the hull is clearly the port side, the right half is starboard. A bold arrow points to the left (port) side." },

  { id: "card-01-nautical-terms-fc-2", type: "card", ratio: "1:1",
    subject: "Side profile of a sailboat hull at the waterline. A bold vertical double-headed arrow shows the distance from the waterline down to the bottom of the keel — the draught measurement." },

  { id: "card-01-nautical-terms-fc-3", type: "card", ratio: "1:1",
    subject: "A triangular sail with its three edges clearly shown: the leading vertical edge (luff), the trailing diagonal edge (leech), and the horizontal bottom edge (foot). Clean triangle sail shape." },

  { id: "card-01-nautical-terms-fc-4", type: "card", ratio: "1:1",
    subject: "Two manoeuvres shown top-down: a boat turning its bow through the wind (tacking, curved arrow going left through wind direction), and a boat turning its stern through the wind (gybing, curved arrow going right). Wind arrow pointing downward at top." },

  { id: "card-01-nautical-terms-fc-7", type: "card", ratio: "1:1",
    subject: "Two boat hull cross-sections side by side. Left: a short deep fin keel projecting below the hull. Right: a long shallow keel running the full length of the bottom of the hull. Both clearly boat-shaped cross-sections." },

  { id: "card-01-nautical-terms-fc-11", type: "card", ratio: "1:1",
    subject: "Top-down view of a boat alongside a dock. Two diagonal spring lines shown: one running forward from stern, one running aft from bow, both attached to dock cleats. These prevent the boat moving forwards or backwards." },

  // Topic 02 — Ropework
  { id: "card-02-ropework-fc-1", type: "card", ratio: "1:1",
    subject: "A correctly tied bowline knot shown from the front at slight angle. The anatomy must be exact: a fixed loop hangs at the bottom formed by the bight of the rope. At the top of the loop, the working end passes UP through the bight from behind (the rabbit coming out of the hole), then passes BEHIND and around the standing part of the rope (around the tree), then passes back DOWN through the bight (back down the hole). The standing part continues upward. The result is a secure non-slipping loop. Show the full knot with enough rope either side to make the structure legible. Factually correct enough that a sailor could tie it from this image alone." },

  { id: "card-02-ropework-fc-3", type: "card", ratio: "1:1",
    subject: "A rolling hitch tied around a thick spar or rope. Shows the extra turns on the loaded side that give it its gripping power. A load arrow pulling in one direction, the hitch gripping firmly." },

  { id: "card-02-ropework-fc-6", type: "card", ratio: "1:1",
    subject: "A winch drum viewed from the front, with rope wound clockwise around it in neat turns. A bold curved arrow showing the clockwise winding direction. Handle socket visible at top." },

  // Topic 03 — Anchorwork
  { id: "card-03-anchorwork-fc-0", type: "card", ratio: "1:1",
    subject: "Side view: boat on the surface, chain anchor rode dropping at a shallow angle to an anchor on the seabed. A depth arrow showing the water depth. A longer diagonal arrow showing the scope length — demonstrating a 3:1 ratio." },

  { id: "card-03-anchorwork-fc-2", type: "card", ratio: "1:1",
    subject: "A CQR plough anchor and a Fisherman's anchor side by side. The Fisherman's anchor shows its traditional cross-bar stock design, ideal for rocky or weedy seabeds where other anchors cannot penetrate." },

  { id: "card-03-anchorwork-fc-4", type: "card", ratio: "1:1",
    subject: "A seabed cross-section divided in two halves. Left half: sandy bottom with fine dots texture, anchor set firmly with good holding. Right half: muddy bottom with wavy line texture, anchor also holding well. Both are good holding ground." },

  // Topic 04 — Safety
  { id: "card-04-safety-fc-1", type: "card", ratio: "1:1",
    subject: "A VHF radio handset held close to a mouth with speech lines radiating from it. Three bold signal arc bursts in sequence represent the three MAYDAY calls transmitted. Maritime distress communication scene." },

  { id: "card-04-safety-fc-3", type: "card", ratio: "1:1",
    subject: "A CO2 fire extinguisher with its distinctive black body and large horn-shaped nozzle, aimed at an engine block with a small flame. The horn is clearly visible and distinctive — the key identifier for CO2 extinguishers." },

  { id: "card-04-safety-fc-9", type: "card", ratio: "1:1",
    subject: "A parachute rocket flare being fired with a large prohibition circle-and-cross symbol overlaid on it. A helicopter silhouette visible nearby in the background. Danger: never fire flares toward helicopters." },

  // Topic 05 — IRPCS/COLREGS
  { id: "card-05-irpcs-colregs-fc-1", type: "card", ratio: "1:1",
    subject: "Two motor vessels crossing paths, viewed from above. The vessel coming from the right has a bold straight arrow — it is the stand-on vessel. The vessel on the left has a curved arrow turning to starboard — it is the give-way vessel." },

  { id: "card-05-irpcs-colregs-fc-2", type: "card", ratio: "1:1",
    subject: "Two motor vessels heading directly toward each other, viewed from above. Both vessels have bold curved arrows showing them both turning to starboard simultaneously — passing port to port. The classic head-on rule." },

  { id: "card-05-irpcs-colregs-fc-4", type: "card", ratio: "1:1",
    subject: "A sailing vessel with mainsail and headsail visible, but also with a motor wake at the stern showing it is motoring. An inverted black cone day shape hanging from the forestay — the required signal for a sailing vessel under engine." },

  { id: "card-05-irpcs-colregs-fc-6", type: "card", ratio: "1:1",
    subject: "A narrow channel with steep banks. A large container ship filling almost the full width of the channel with no room to deviate. A small sailing dinghy tucked right against the bank, getting out of the way. Shows why power does not automatically give way to sail in narrow channels." },

  // Topic 06 — Position, Course and Speed
  { id: "card-06-position-course-speed-fc-4", type: "card", ratio: "1:1",
    subject: "Three compass needles or arrows from a single centre point, fanning out slightly: True north pointing straight up, Magnetic north slightly offset by the variation angle, Compass further offset by deviation. Three distinct arrows with small angle arcs between them." },

  // Topic 07 — Charts
  { id: "card-07-charts-fc-0", type: "card", ratio: "1:1",
    subject: "A nautical chart extract showing several depth soundings in fathoms or metres. One sounding has an underline beneath the number, indicating it is a drying height above chart datum — the rock uncovers at low water." },

  { id: "card-07-charts-fc-2", type: "card", ratio: "1:1",
    subject: "A lighthouse symbol on a nautical chart with a light description label showing the standard Admiralty format: Fl.R.4s — flash character, colour abbreviation, period in seconds. Clean chart notation illustration." },

  // Topic 08 — Instruments
  { id: "card-08-instruments-fc-0", type: "card", ratio: "1:1",
    subject: "Parallel rulers on a nautical chart, walking across from a compass rose. The two connected rulers shown stepping sideways to transfer a bearing across the chart. The hinge mechanism clearly visible between the two ruler bars." },

  { id: "card-08-instruments-fc-2", type: "card", ratio: "1:1",
    subject: "A Portland plotter (rectangular protractor with a rotating compass rose disc) laid flat on a chart. The rotating disc clearly shown with north mark. A course line drawn through it. Much simpler to use than parallel rulers." },

  // Topic 09 — Compass
  { id: "card-09-compass-fc-0", type: "card", ratio: "1:1",
    subject: "A compass rose with two north arrows from the centre: one pointing straight up (True North, geographic), one pointing slightly to the left (Magnetic North). A curved arc between them with 'Var' indicating the variation angle." },

  { id: "card-09-compass-fc-3", type: "card", ratio: "1:1",
    subject: "Three sequential steps shown left to right: TRUE compass arrow, then an addition sign and variation arc giving MAGNETIC, then another addition and deviation arc giving COMPASS. The classic TVMDC conversion sequence shown as a three-step flow." },

  // Topic 10 — Chartwork
  { id: "card-10-chartwork-fc-1", type: "card", ratio: "1:1",
    subject: "Three chartwork position symbols in a row on a chart background: a circle with a centre dot (Dead Reckoning), a triangle with a centre dot (Estimated Position), and a circle with a cross through it (Fix). The three standard chartwork symbols." },

  { id: "card-10-chartwork-fc-2", type: "card", ratio: "1:1",
    subject: "The classic chartwork vector triangle on a chart. Three arrows forming a triangle: a solid arrow for the water track (course steered), a double-arrow for the tidal stream vector, and the resultant ground track. The navigator's tidal triangle." },

  { id: "card-10-chartwork-fc-3", type: "card", ratio: "1:1",
    subject: "Three position lines crossing on a chart to form a small triangle — the cocked hat. A rocky shoal visible nearby. An X mark placed at the corner of the triangle nearest the danger — the cautious position fix." },

  // Topic 11 — Tides
  { id: "card-11-tides-fc-0", type: "card", ratio: "1:1",
    subject: "Six vertical bars in a row representing the Rule of Twelfths. The bars increase in height then decrease: 1, 2, 3, 3, 2, 1 units tall. A smooth cosine tide curve overlaid above the bars. Shows unequal tidal rise per hour." },

  { id: "card-11-tides-fc-1", type: "card", ratio: "1:1",
    subject: "A cross-section showing the seabed, chart datum line at the bottom, water surface at the top. An upward arrow showing height of tide from datum to surface. A downward arrow showing charted depth from datum to seabed. The total depth = both combined." },

  { id: "card-11-tides-fc-3", type: "card", ratio: "1:1",
    subject: "The Sun, Earth, and Moon shown twice. Top: Sun, Earth, Moon all in a line — spring tides, large tidal range shown by a tall wave. Bottom: Moon at 90 degrees to the Sun-Earth line — neap tides, small tidal range shown by a small wave." },

  // Topic 12 — Buoyage
  { id: "card-12-buoyage-fc-0", type: "card", ratio: "1:1",
    subject: "An IALA port-hand lateral mark: a red cylindrical can buoy with a flat top. A channel arrow showing the buoy is kept to the left when entering harbour. Fl.R light pulses shown above." },

  { id: "card-12-buoyage-fc-1", type: "card", ratio: "1:1",
    subject: "An IALA starboard-hand lateral mark: a green conical buoy with pointed top. Channel arrow showing the buoy is kept to the right when entering harbour. Fl.G light pulses shown above." },

  { id: "card-12-buoyage-fc-3", type: "card", ratio: "1:1",
    subject: "A North Cardinal buoy: pillar buoy with black upper half and yellow lower half. Two cone topmarks both pointing UPWARD (north). A north arrow above. Safe water is to the north — pass to the north of this mark." },

  { id: "card-12-buoyage-fc-9", type: "card", ratio: "1:1",
    subject: "Two shore structures at different heights: a low front lighthouse and a taller rear lighthouse. A boat approaching from seaward with both lights in perfect vertical alignment — on the correct leading line track entering the harbour." },

  // Topic 13 — Meteorology
  { id: "card-13-meteorology-fc-0", type: "card", ratio: "1:1",
    subject: "Three concentric oval isobar lines with a bold L at the centre (low pressure). Four wind arrows at N, E, S, W positions — all curving anticlockwise around the centre. Northern Hemisphere low pressure circulation." },

  { id: "card-13-meteorology-fc-1", type: "card", ratio: "1:1",
    subject: "Two large ocean waves with white cresting foam on their tops. A heeled sailboat riding the waves. Horizontal streaks showing strong wind from above. Force 5 sea state — fresh breeze with moderate waves." },

  { id: "card-13-meteorology-fc-4", type: "card", ratio: "1:1",
    subject: "A tidal stream arrow running from left to right at the bottom of the image. A wind arrow coming from the right (pointing left and downward) — opposing the tide direction. Between them: steep, short, choppy waves with nearly vertical faces. Wind over tide creates dangerous conditions." },

  // Topic 14 — Passage Planning
  { id: "card-14-passage-planning-fc-1", type: "card", ratio: "1:1",
    subject: "A headland with submerged rocks. A lighthouse on the headland. A bold bearing line from the lighthouse running just clear of the outermost rocks — the clearing bearing. Hatching on the dangerous side of the line. A sailboat on the safe side." },

  { id: "card-14-passage-planning-fc-5", type: "card", ratio: "1:1",
    subject: "A straight dashed line showing the desired GPS track between two waypoints. The actual boat position shown slightly offset from this line. A perpendicular bracket arrow showing the Cross Track Error — the distance off the intended track." },

  // Topic 15 — Restricted Visibility
  { id: "card-15-restricted-visibility-fc-2", type: "card", ratio: "1:1",
    subject: "Top-down view of a boat in fog. Sound signal source shown forward of the beam — ahead and to one side. Bold arrow showing the boat altering course to avoid — steering well clear. Fog haze lines around the scene." },

  { id: "card-15-restricted-visibility-fc-5", type: "card", ratio: "1:1",
    subject: "A large foghorn or ship's whistle sending one long bold sound wave arc out ahead. A clock face showing the 2-minute interval between blasts. Power vessel in fog sound signal: one prolonged blast every 2 minutes." },

  // Topic 16 — Pilotage
  { id: "card-16-pilotage-fc-0", type: "card", ratio: "1:1",
    subject: "Two shore objects in perfect vertical alignment as seen from the approaching boat: a white post in the foreground exactly in front of a church steeple behind it. The boat on the correct transit line. When two objects align, you are exactly on the transit." },

  { id: "card-16-pilotage-fc-2", type: "card", ratio: "1:1",
    subject: "A headland with rocks extending from it. A lighthouse as the clearing mark. A bearing line running just clear of the outermost rocks. Boat on the safe side. Hazard marking on the dangerous side. Classic clearing bearing pilotage." },

  // Topic 17 — Marine Environment
  { id: "card-17-marine-environment-fc-2", type: "card", ratio: "1:1",
    subject: "A boat hull cross-section with bilge pump visible below the waterline. A large prohibition circle-and-cross sign over the pump discharge outlet. No oily bilge water may be pumped overboard. Clean sea beside the vessel." },

  { id: "card-17-marine-environment-fc-3", type: "card", ratio: "1:1",
    subject: "Seabed cross-section split in two: left side shows delicate seagrass plants with an anchor hovering above with a prohibition X — do not anchor here. Right side shows bare sandy seabed with an anchor set firmly — anchor here instead." },

  // ── KEY TERM ILLUSTRATIONS ─ selected visually strong terms ─────────────────

  { id: "term-01-bowline", type: "term", ratio: "1:1",
    subject: "A bowline knot shown as the primary subject. The classic loop-at-end-of-rope knot structure: the bight, the rabbit hole, the tree, and the rabbit. Most important knot in sailing. Clear and accurate rope path." },

  { id: "term-01-clove-hitch", type: "term", ratio: "1:1",
    subject: "A clove hitch tied around a round guardrail or post. Two diagonal turns crossing each other on the rail. Quick to tie. Used for fenders. Classic knot illustration." },

  { id: "term-01-rolling-hitch", type: "term", ratio: "1:1",
    subject: "A rolling hitch tied around a thicker rope, with the load direction shown by an arrow. Extra turn on the load side creates the gripping action. Used to take the strain off a loaded rope." },

  { id: "term-01-figure-of-eight", type: "term", ratio: "1:1",
    subject: "A figure-of-eight stopper knot at the end of a rope. The distinctive figure-8 shape clearly shown. The rope end exits at the bottom. Prevents the rope pulling through a block or fairlead." },

  { id: "term-01-keel", type: "term", ratio: "1:1",
    subject: "Side profile cross-section of a sailing yacht hull showing the keel as the deep fin projecting below the hull. Ballast indicated by its heavy solid appearance. Provides stability and prevents sideways drift." },

  { id: "term-01-tacking", type: "term", ratio: "1:1",
    subject: "Top-down view of a sailboat. Wind arrow pointing downward. The boat shown in three positions: approaching close-hauled on port tack, bow passing through the wind (dashed), then sailing close-hauled on starboard tack. Curved arrow tracing the tack manoeuvre." },

  { id: "term-02-scope", type: "term", ratio: "1:1",
    subject: "Side view showing a boat at anchor. Chain dropping from the bow roller at a shallow angle to the anchor on the seabed. Depth measurement shown vertically. Scope (total chain length) shown diagonally. Illustrating the 3:1 scope ratio concept." },

  { id: "term-02-bruce-anchor", type: "term", ratio: "1:1",
    subject: "A Bruce claw anchor shown from the side. Three curved claws radiating from a central shank. The distinctive claw shape clearly shown. Good all-round anchor, easy to self-launch from bow roller." },

  { id: "term-02-danforth-anchor", type: "term", ratio: "1:1",
    subject: "A Danforth anchor shown from the side. Two large flat parallel flukes on a pivoting stock. Stows flat. Excellent in sand and mud. The flat fluke design clearly visible." },

  { id: "term-05-variation", type: "term", ratio: "1:1",
    subject: "A compass rose showing True North (straight up) and Magnetic North (a few degrees to one side). A clear arc between the two north arrows labelled as Variation. The angular difference between geographic and magnetic north." },

  { id: "term-05-deviation", type: "term", ratio: "1:1",
    subject: "A compass inside a boat, with the compass needle pulled away from magnetic north by local magnetic influences from the boat's engine and metal fittings. Two arrows from centre: magnetic north and the deviated compass reading, with a small arc showing the deviation angle." },

  { id: "term-06-cocked-hat", type: "term", ratio: "1:1",
    subject: "Three position lines on a chart, each from a different landmark, crossing to form a small triangle — the cocked hat. The position is placed at the corner of the triangle nearest the charted danger. Rocks visible nearby." },

  { id: "term-07-rule-of-twelfths", type: "term", ratio: "1:1",
    subject: "Six vertical bars showing the Rule of Twelfths tide pattern: 1, 2, 3, 3, 2, 1 twelfths of the tidal range per hour. A smooth cosine tide curve drawn above the bars. The middle hours have the fastest tidal rise or fall." },

  { id: "term-08-iala-north-cardinal", type: "term", ratio: "1:1",
    subject: "A North Cardinal buoy: black upper half, yellow lower half pillar buoy. Two upward-pointing cone topmarks. Bold north arrow. Safe water lies to the north of this mark. Pass it on its north side." },

  { id: "term-08-iala-south-cardinal", type: "term", ratio: "1:1",
    subject: "A South Cardinal buoy: yellow upper half, black lower half pillar buoy. Two downward-pointing inverted cone topmarks. Bold south arrow. Safe water lies to the south. Pass it on its south side." },

  { id: "term-09-low-pressure", type: "term", ratio: "1:1",
    subject: "A low pressure weather system viewed from above. Concentric oval isobar lines. Wind arrows at four compass points all circling anticlockwise around the centre. The classic cyclonic circulation pattern in the Northern Hemisphere." },

  { id: "term-09-wind-over-tide", type: "term", ratio: "1:1",
    subject: "A bold tidal stream arrow running from left to right. A wind arrow from the right pointing downward-left — opposing the tide direction. Between them: steep, short, dangerous choppy waves with nearly vertical faces. The hazardous wind-against-tide sea state." },

  { id: "term-10-transit", type: "term", ratio: "1:1",
    subject: "Viewed from the boat approaching a harbour: a red and white striped leading beacon in the foreground, with a church tower perfectly aligned behind it. When these two objects are vertically aligned, the boat is exactly on the transit line — the most accurate pilotage method." },

];

// ─── GENERATOR ───────────────────────────────────────────────────────────────
async function generate(image) {
  const filename = `${image.id}.png`;
  const outPath = path.join(OUT_DIR, filename);

  if (fs.existsSync(outPath)) {
    console.log(`  ✓ skip  ${filename} (already exists)`);
    return;
  }

  const prompt = `${image.subject}\n\n${STYLE}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: prompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio: image.ratio },
      },
    });

    let saved = false;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, "base64");
        fs.writeFileSync(outPath, buffer);
        saved = true;
        console.log(`  ✓ done  ${filename}`);
      }
    }
    if (!saved) {
      console.warn(`  ✗ no image returned for ${filename}`);
    }
  } catch (err) {
    console.error(`  ✗ error ${filename}: ${err.message}`);
  }
}

async function run() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY environment variable not set.");
    process.exit(1);
  }

  // Parse CLI flags
  const args = process.argv.slice(2);
  const filterFlag = args.indexOf("--filter");
  const idFlag = args.indexOf("--id");
  let items = IMAGES;

  if (filterFlag !== -1) {
    const type = args[filterFlag + 1];
    items = IMAGES.filter((i) => i.type === type);
    console.log(`Filtered to type="${type}": ${items.length} images`);
  } else if (idFlag !== -1) {
    const id = args[idFlag + 1];
    items = IMAGES.filter((i) => i.id === id);
    console.log(`Filtered to id="${id}": ${items.length} images`);
  }

  const BATCH = 2;
  const DELAY = 4000; // 4s between batches to respect rate limits

  console.log(`\nGenerating ${items.length} illustrations (batches of ${BATCH})...\n`);

  for (let i = 0; i < items.length; i += BATCH) {
    const batch = items.slice(i, i + BATCH);
    const batchNum = Math.floor(i / BATCH) + 1;
    const totalBatches = Math.ceil(items.length / BATCH);
    console.log(`Batch ${batchNum}/${totalBatches}:`);
    await Promise.all(batch.map(generate));
    if (i + BATCH < items.length) {
      await new Promise((r) => setTimeout(r, DELAY));
    }
  }

  console.log("\n✓ Complete. Images saved to public/illustrations/");
}

run();
