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

// Load .env.local if present
const __envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", ".env.local");
if (fs.existsSync(__envPath)) {
  for (const line of fs.readFileSync(__envPath, "utf8").split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] ??= match[2].trim();
  }
}

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

  { id: "hero-05-irpcs-colregs", type: "hero", ratio: "3:2",
    subject: "Two motor vessels at sea in a crossing situation, viewed from slightly above. The vessel coming from the right has a straight arrow showing it holding course. The vessel on the left has a curved arrow showing it giving way to starboard. Both vessels are clearly recognizable boat-shaped silhouettes with wakes." },

  { id: "hero-06-position-course-speed", type: "hero", ratio: "3:2",
    subject: "A ship's compass binnacle with the compass rose visible, alongside parallel rulers and pencil on a nautical chart. Depth soundings visible on the chart. Navigation plotting scene." },

  { id: "hero-07-charts-and-publications", type: "hero", ratio: "3:2",
    subject: "An Admiralty nautical chart partially unrolled, showing a coastline, depth soundings, buoy symbols, and a compass rose. Parallel rulers resting diagonally across the chart." },

  { id: "hero-08-navigational-instruments", type: "hero", ratio: "3:2",
    subject: "Navigational instruments arranged on a chart: parallel rulers, brass dividers, a pencil, and a Portland plotter. Top-down flat-lay view. Clean technical illustration." },

  { id: "hero-09-compass", type: "hero", ratio: "3:2",
    subject: "A detailed compass rose showing the 32 points of the compass, with a bold north arrow. A second smaller magnetic north arrow offset slightly to the left showing variation. Clean, precise nautical compass illustration." },

  { id: "hero-10-chartwork", type: "hero", ratio: "3:2",
    subject: "A nautical chart with a plotted course line, dead reckoning position (circle with dot), estimated position (triangle with dot), and a fix (circle with cross). Tidal stream arrows showing drift. Classic chartwork symbols." },

  { id: "hero-11-tides", type: "hero", ratio: "3:2",
    subject: "A coastal cliff face with clear high water and low water marks. A sine-wave tide curve shown alongside. Seabed with exposed rocks at low tide, covered at high tide. Rule of twelfths bars alongside." },

  { id: "hero-12-visual-aids-buoyage", type: "hero", ratio: "3:2",
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
    subject: "Top-down aerial view of a sailing boat. The bow points toward the TOP of the image, stern at the bottom. A bold arrow on the LEFT side of the image points LEFT — indicating port, the left side of the vessel when facing forward. The right side of the image is starboard." },

  { id: "card-01-nautical-terms-fc-2", type: "card", ratio: "1:1",
    subject: "Side profile of a sailboat hull at the waterline. A bold vertical double-headed arrow shows the distance from the waterline down to the bottom of the keel — the draught measurement." },

  { id: "card-01-nautical-terms-fc-3", type: "card", ratio: "1:1",
    subject: "A triangular sail with its three edges clearly shown: the leading vertical edge (luff), the trailing diagonal edge (leech), and the horizontal bottom edge (foot). Clean triangle sail shape." },

  { id: "card-01-nautical-terms-fc-1", type: "card", ratio: "1:1",
    subject: "Top-down view of a sailing boat. A wind arrow pointing directly downward from the top of the image shows the wind direction. On either side of the wind arrow, two bold dashed lines fan out at approximately 45 degrees — forming a cone-shaped no-go zone directly ahead of the boat. The cone is shaded or hatched to show it is forbidden sailing territory. The boat sits at the bottom of the image, bow pointing toward the cone. A clear label-free diagram showing that sailing directly into wind is impossible within this 45-degree arc on each side." },

  { id: "card-01-nautical-terms-fc-4", type: "card", ratio: "1:1",
    subject: "Two manoeuvres shown top-down: a boat turning its bow through the wind (tacking, curved arrow going left through wind direction), and a boat turning its stern through the wind (gybing, curved arrow going right). Wind arrow pointing downward at top." },

  { id: "card-01-nautical-terms-fc-7", type: "card", ratio: "1:1",
    subject: "Two boat hull cross-sections side by side. Left: a short deep fin keel projecting below the hull. Right: a long shallow keel running the full length of the bottom of the hull. Both clearly boat-shaped cross-sections." },

  { id: "card-01-nautical-terms-fc-11", type: "card", ratio: "1:1",
    subject: "Top-down view of a boat alongside a dock. Two diagonal spring lines shown: one running forward from stern, one running aft from bow, both attached to dock cleats. These prevent the boat moving forwards or backwards." },

  // Topic 02 — Ropework
  { id: "card-02-ropework-fc-1", type: "card", ratio: "1:1",
    subject: "A correctly tied bowline knot shown from the front at slight angle. The anatomy must be exact: a fixed loop hangs at the bottom formed by the bight of the rope. At the top of the loop, the working end passes UP through the bight from behind (the rabbit coming out of the hole), then passes BEHIND and around the standing part of the rope (around the tree), then passes back DOWN through the bight (back down the hole). The standing part continues upward. The result is a secure non-slipping loop. Show the full knot with enough rope either side to make the structure legible. Factually correct enough that a sailor could tie it from this image alone." },

  { id: "card-02-ropework-fc-2", type: "card", ratio: "1:1",
    subject: "A clove hitch tied around a horizontal guard rail wire or stanchion, with a fender hanging below on its tail. The clove hitch is shown clearly: two diagonal turns crossing over each other on the rail, with the fender's lanyard descending from the lower turn. The correct knot for attaching a fender to a guard rail — quick to tie and easy to adjust height." },

  { id: "card-02-ropework-fc-3", type: "card", ratio: "1:1",
    subject: "A rolling hitch tied around a thick spar or rope. Shows the extra turns on the loaded side that give it its gripping power. A load arrow pulling in one direction, the hitch gripping firmly." },

  { id: "card-02-ropework-fc-6", type: "card", ratio: "1:1",
    subject: "A winch drum viewed from the front, with rope wound clockwise around it in neat turns. A bold curved arrow showing the clockwise winding direction. Handle socket visible at top." },

  // Topic 03 — Anchorwork
  { id: "card-03-anchorwork-fc-0", type: "card", ratio: "1:1",
    subject: "Side view: boat on the surface, chain anchor rode dropping at a shallow angle to an anchor on the seabed. A depth arrow showing the water depth. A longer diagonal arrow showing the scope length — demonstrating a 3:1 ratio." },

  { id: "card-03-anchorwork-fc-1", type: "card", ratio: "1:1",
    subject: "Side view of a boat at anchor using a warp (rope) rode instead of chain. The rope rode runs from the bow roller at a shallow angle down to the anchor on the seabed. A depth arrow showing water depth, and a longer scope arrow showing the recommended 5:1 rope length ratio. Rope texture clearly distinguished from chain." },

  { id: "card-03-anchorwork-fc-2", type: "card", ratio: "1:1",
    subject: "A CQR plough anchor and a Fisherman's anchor side by side. The Fisherman's anchor shows its traditional cross-bar stock design, ideal for rocky or weedy seabeds where other anchors cannot penetrate." },

  { id: "card-03-anchorwork-fc-4", type: "card", ratio: "1:1",
    subject: "A seabed cross-section divided in two halves. Left half: sandy bottom with fine dots texture, anchor set firmly with good holding. Right half: muddy bottom with wavy line texture, anchor also holding well. Both are good holding ground." },

  // Topic 04 — Safety
  { id: "card-04-safety-fc-0", type: "card", ratio: "1:1",
    subject: "A sailor on the deck of a heeling yacht in rough weather, clipped on with a safety harness and tether. The tether is attached to a jackstay running along the deck. Heavy seas in the background. The harness webbing and chest clip clearly visible." },

  { id: "card-04-safety-fc-2", type: "card", ratio: "1:1",
    subject: "Two VHF radios side by side. Left radio has bold urgent sound arcs and the word channel 16 shown on its display — a Pan Pan call, urgent situation. Right radio shows a more extreme distress scene with a boat hull sinking in the waves — a Mayday, grave and imminent danger. Contrasting severity shown by the two scenes." },

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
  { id: "card-06-position-course-speed-fc-0", type: "card", ratio: "1:1",
    subject: "A ruler or scale bar showing exactly 1852 metres divided into equal segments. Below it, the same length labelled as one nautical mile. Clean measurement diagram — the exact length of a nautical mile." },

  { id: "card-06-position-course-speed-fc-1", type: "card", ratio: "1:1",
    subject: "A speedometer dial showing a reading. Below it, a clock face showing one hour. An arrow pointing to a label showing 1 nautical mile. One knot = one nautical mile per hour. Simple diagram of the unit of speed." },

  { id: "card-06-position-course-speed-fc-2", type: "card", ratio: "1:1",
    subject: "A globe with latitude lines circling it. One degree of latitude arc highlighted with a bold bracket on the surface. Below it, a zoomed-in view showing that one minute of arc along the latitude scale equals one nautical mile. The latitude scale on the side of the globe with tick marks." },

  { id: "card-06-position-course-speed-fc-4", type: "card", ratio: "1:1",
    subject: "Three compass needles or arrows from a single centre point, fanning out slightly: True north pointing straight up, Magnetic north slightly offset by the variation angle, Compass further offset by deviation. Three distinct arrows with small angle arcs between them." },

  // Topic 07 — Charts and Publications
  { id: "card-07-charts-and-publications-fc-1", type: "card", ratio: "1:1",
    subject: "Two rock symbols from a nautical chart shown side by side. Left: a plus sign inside a circle surrounded by dots — rock awash at chart datum (K12). Right: an asterisk or star symbol — rock with less than 2 metres of water over it at chart datum (K13). Clear distinction between the two critical rock hazard symbols." },

  { id: "card-07-charts-and-publications-fc-0", type: "card", ratio: "1:1",
    subject: "A nautical chart extract showing several depth soundings in fathoms or metres. One sounding has an underline beneath the number, indicating it is a drying height above chart datum — the rock uncovers at low water." },

  { id: "card-07-charts-and-publications-fc-2", type: "card", ratio: "1:1",
    subject: "A lighthouse symbol on a nautical chart with a light description label showing the standard Admiralty format: Fl.R.4s — flash character, colour abbreviation, period in seconds. Clean chart notation illustration." },

  // Topic 08 — Navigational Instruments
  { id: "card-08-navigational-instruments-fc-1", type: "card", ratio: "1:1",
    subject: "A Mercator projection world map showing latitude lines getting further apart toward the poles. A large prohibition circle-and-cross sign over the longitude (vertical) scale. A tick-mark arrow pointing to the latitude (horizontal) scale on the side — this is the correct scale for measuring distance." },

  { id: "card-08-navigational-instruments-fc-0", type: "card", ratio: "1:1",
    subject: "Parallel rulers on a nautical chart, walking across from a compass rose. The two connected rulers shown stepping sideways to transfer a bearing across the chart. The hinge mechanism clearly visible between the two ruler bars." },

  { id: "card-08-navigational-instruments-fc-2", type: "card", ratio: "1:1",
    subject: "A Portland plotter (rectangular protractor with a rotating compass rose disc) laid flat on a chart. The rotating disc clearly shown with north mark. A course line drawn through it. Much simpler to use than parallel rulers." },

  // Topic 09 — Compass
  { id: "card-09-compass-fc-1", type: "card", ratio: "1:1",
    subject: "A boat hull cross-section viewed from above. A compass card visible inside the boat. True north arrow pointing straight up. Magnetic north arrow offset by a small angle. Compass north arrow offset further still by an additional deviation angle — caused by the boat's steel and electrical equipment. Three north arrows showing the cumulative angular offsets." },

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

  // Topic 12 — Visual Aids and Buoyage
  { id: "card-12-visual-aids-buoyage-fc-0", type: "card", ratio: "1:1",
    subject: "An IALA port-hand lateral mark: a red cylindrical can buoy with a flat top. A channel arrow showing the buoy is kept to the left when entering harbour. Fl.R light pulses shown above." },

  { id: "card-12-visual-aids-buoyage-fc-1", type: "card", ratio: "1:1",
    subject: "An IALA starboard-hand lateral mark: a green conical buoy with pointed top. Channel arrow showing the buoy is kept to the right when entering harbour. Fl.G light pulses shown above." },

  { id: "card-12-visual-aids-buoyage-fc-2", type: "card", ratio: "1:1",
    subject: "A preferred channel (junction) mark buoy: red and green horizontal bands on a pillar buoy. A split-channel arrow showing the main channel going one way and the secondary channel the other. A flashing light sequence showing the unique composite group flash Fl(2+1) — two flashes then one flash." },

  { id: "card-12-visual-aids-buoyage-fc-3", type: "card", ratio: "1:1",
    subject: "A North Cardinal pillar buoy. The topmark consists of TWO cones mounted on a single vertical staff — stacked one directly above the other on the same vertical axis, both pointing UPWARD with their points facing up. The lower cone sits immediately below the upper cone on the same staff. They are never side by side. Below the topmarks is the buoy body: black upper half, yellow lower half. A north arrow above the whole assembly. Safe water lies to the north of this mark." },

  { id: "card-12-visual-aids-buoyage-fc-4", type: "card", ratio: "1:1",
    subject: "Two cardinal buoys side by side for comparison. Left: South Cardinal buoy — yellow upper half, black lower half, two downward-pointing inverted cone topmarks, a south arrow. Right: West Cardinal buoy — black upper, yellow middle band, black lower, two cones pointing toward each other (waist shape), a west arrow. Key visual differences highlighted." },

  { id: "card-12-visual-aids-buoyage-fc-5", type: "card", ratio: "1:1",
    subject: "An isolated danger mark: a black pillar buoy with red horizontal band. Two black spheres as topmark — stacked vertically. Light pulses showing Fl(2) — the mandatory two-flash light characteristic. This mark sits on top of or near a danger with navigable water all around it." },

  { id: "card-12-visual-aids-buoyage-fc-6", type: "card", ratio: "1:1",
    subject: "A safe water mark: a red and white vertically striped spherical buoy. A single red spherical topmark on top. Light showing the Mo(A) Morse code sequence — a short flash then long flash. This mark indicates safe navigable water all around." },

  { id: "card-12-visual-aids-buoyage-fc-7", type: "card", ratio: "1:1",
    subject: "A special mark: a plain yellow X-shaped cross topmark on a yellow buoy of any shape. A single yellow flashing light above it. A question mark nearby indicating it marks something special — pipeline, military exercise area, aquaculture. Not a navigation hazard mark." },

  { id: "card-12-visual-aids-buoyage-fc-8", type: "card", ratio: "1:1",
    subject: "An emergency wreck marking buoy: a striking buoy with alternating blue and yellow vertical stripes. A blue and yellow flag-style topmark. A quick flashing blue and yellow light alternating. Clearly unlike any other mark type — designed to be immediately recognisable as a newly discovered wreck hazard." },

  { id: "card-12-visual-aids-buoyage-fc-9", type: "card", ratio: "1:1",
    subject: "Two shore structures at different heights: a low front lighthouse and a taller rear lighthouse. A boat approaching from seaward with both lights in perfect vertical alignment — on the correct leading line track entering the harbour." },

  // Topic 13 — Meteorology
  { id: "card-13-meteorology-fc-0", type: "card", ratio: "1:1",
    subject: "Three concentric oval isobar lines with a bold L at the centre (low pressure). Four wind arrows at N, E, S, W positions — all curving anticlockwise around the centre. Northern Hemisphere low pressure circulation." },

  { id: "card-13-meteorology-fc-1", type: "card", ratio: "1:1",
    subject: "Two large ocean waves with white cresting foam on their tops. A heeled sailboat riding the waves. Horizontal streaks showing strong wind from above. Force 5 sea state — fresh breeze with moderate waves." },

  { id: "card-13-meteorology-fc-2", type: "card", ratio: "1:1",
    subject: "Two compass circles side by side. Left circle: wind direction arrow rotating anticlockwise (backing — from SW to S to SE). Right circle: wind direction arrow rotating clockwise (veering — from SW to W to NW). Bold curved arrows on each circle showing the direction of rotation. A clear comparison of backing versus veering wind shifts." },

  { id: "card-13-meteorology-fc-4", type: "card", ratio: "1:1",
    subject: "A tidal stream arrow running from left to right at the bottom of the image. A wind arrow coming from the right (pointing left and downward) — opposing the tide direction. Between them: steep, short, choppy waves with nearly vertical faces. Wind over tide creates dangerous conditions." },

  // Topic 14 — Passage Planning
  { id: "card-14-passage-planning-fc-0", type: "card", ratio: "1:1",
    subject: "A coastline with six small numbered pilotage technique icons around it: (1) two objects aligned as a transit line, (2) a depth contour line hugging the coast, (3) a bearing line looking back to a mark behind, (4) a clearing bearing line just outside rocks, (5) a distance-off circle around a headland, (6) a position fix cross from two bearings. Six distinct diagrams arranged around the coastline." },

  { id: "card-14-passage-planning-fc-1", type: "card", ratio: "1:1",
    subject: "A headland with submerged rocks. A lighthouse on the headland. A bold bearing line from the lighthouse running just clear of the outermost rocks — the clearing bearing. Hatching on the dangerous side of the line. A sailboat on the safe side." },

  { id: "card-14-passage-planning-fc-5", type: "card", ratio: "1:1",
    subject: "A straight dashed line showing the desired GPS track between two waypoints. The actual boat position shown slightly offset from this line. A perpendicular bracket arrow showing the Cross Track Error — the distance off the intended track." },

  // Topic 15 — Restricted Visibility
  { id: "card-15-restricted-visibility-fc-2", type: "card", ratio: "1:1",
    subject: "Top-down view of a boat in fog. Sound signal source shown forward of the beam — ahead and to one side. Bold arrow showing the boat altering course to avoid — steering well clear. Fog haze lines around the scene." },

  { id: "card-15-restricted-visibility-fc-3", type: "card", ratio: "1:1",
    subject: "A boat at anchor showing its anchor ball day shape: a single black sphere hanging in the forward part of the vessel where it can best be seen. The classic black ball shape clearly visible. An anchor chain visible at the bow going down into the water. Daytime, at anchor, no power." },

  { id: "card-15-restricted-visibility-fc-5", type: "card", ratio: "1:1",
    subject: "A large foghorn or ship's whistle sending one long bold sound wave arc out ahead. A clock face showing the 2-minute interval between blasts. Power vessel in fog sound signal: one prolonged blast every 2 minutes." },

  // Topic 16 — Pilotage
  { id: "card-16-pilotage-fc-3", type: "card", ratio: "1:1",
    subject: "A pilotage plan diagram showing six numbered elements arranged on a simple harbour entrance: (1) a transit alignment mark, (2) a depth contour line, (3) a bar with depth arrow and clearance measurement, (4) an IALA buoy with its identification label, (5) a harbour entry angle arrow, (6) a VHF channel number label. All six elements of a formal pilotage plan." },

  { id: "card-16-pilotage-fc-0", type: "card", ratio: "1:1",
    subject: "Two shore objects in perfect vertical alignment as seen from the approaching boat: a white post in the foreground exactly in front of a church steeple behind it. The boat on the correct transit line. When two objects align, you are exactly on the transit." },

  { id: "card-16-pilotage-fc-1", type: "card", ratio: "1:1",
    subject: "Two leading lights shown from the approaching vessel: a lower front light and a taller rear light. In the LEFT panel — the lights are perfectly vertically aligned (on the leading line). In the RIGHT panel — the rear light has shifted to one side of the front light (off the leading line). Simple side-by-side comparison showing correct alignment versus being off track." },

  { id: "card-16-pilotage-fc-2", type: "card", ratio: "1:1",
    subject: "A headland with rocks extending from it. A lighthouse as the clearing mark. A bearing line running just clear of the outermost rocks. Boat on the safe side. Hazard marking on the dangerous side. Classic clearing bearing pilotage." },

  // Topic 17 — Marine Environment
  { id: "card-17-marine-environment-fc-0", type: "card", ratio: "1:1",
    subject: "A large cargo ship viewed from the side. A bold shield or banner above it shows 'MARPOL'. Below the ship, a crossed-out oil barrel symbol with prohibition lines — no oil discharge. Clean sea alongside the vessel." },

  { id: "card-17-marine-environment-fc-2", type: "card", ratio: "1:1",
    subject: "A boat hull cross-section with bilge pump visible below the waterline. A large prohibition circle-and-cross sign over the pump discharge outlet. No oily bilge water may be pumped overboard. Clean sea beside the vessel." },

  { id: "card-17-marine-environment-fc-3", type: "card", ratio: "1:1",
    subject: "Seabed cross-section split in two: left side shows delicate seagrass plants with an anchor hovering above with a prohibition X — do not anchor here. Right side shows bare sandy seabed with an anchor set firmly — anchor here instead." },

  // ── KEY TERM ILLUSTRATIONS ─ selected visually strong terms ─────────────────

  { id: "term-01-bowline", type: "term", ratio: "1:1",
    subject: "A bowline knot shown as the primary subject. The classic loop-at-end-of-rope knot structure: the bight, the rabbit hole, the tree, and the rabbit. Most important knot in sailing. Clear and accurate rope path." },

  { id: "term-01-clove-hitch", type: "term", ratio: "1:1",
    reference: "references/clove-hitch.jpg",
    subject: "A clove hitch tied around a round wooden dock post or stainless steel rail. Reproduce the exact rope structure from the reference photograph. The defining feature: two diagonal strands form a clear X-shaped crossing on the face of the post. Both the standing part and working end exit on the same side of the post. Two parallel rope wraps sit snug against each other. Tight, compact and symmetric." },

  { id: "term-01-rolling-hitch", type: "term", ratio: "1:1",
    reference: "references/rolling-hitch.jpg",
    subject: "A rolling hitch tied around a thicker rope. Reproduce the exact rope structure from the reference photograph. The thinner rope makes three wraps: two tight wraps clustered together on the load side, plus one separate locking half hitch on the other side. Visually asymmetric — the double-wrap cluster is the defining feature." },

  { id: "term-01-figure-of-eight", type: "term", ratio: "1:1",
    reference: "references/figure-of-eight.jpg",
    subject: "A figure-of-eight stopper knot at the end of a rope. Reproduce the exact rope structure from the reference photograph. Two distinct round lobes separated by a central diagonal crossing — the shape of the numeral 8. Standing part exits the top lobe upward; tail exits the bottom lobe downward." },

  { id: "term-01-round-turn-two-half-hitches", type: "term", ratio: "1:1",
    reference: "references/round-turn-two-half-hitches.jpg",
    subject: "A round turn and two half hitches on a metal ring. Reproduce the exact rope structure from the reference photograph. Two complete parallel bands wrap around the ring (the round turn), then two neat half-hitch loops sit in a column on the standing part. Clearly two-part structure." },

  { id: "term-01-reef-knot", type: "term", ratio: "1:1",
    reference: "references/reef-knot.jpg",
    subject: "A reef knot joining two ropes of equal diameter. Reproduce the exact rope structure from the reference photograph. Two symmetrical interlocking bights lying flat and parallel. Each rope's standing part and tail emerge from the same side of their own bight. Flat, compact, symmetric — not a granny knot." },

  { id: "term-01-sheet-bend", type: "term", ratio: "1:1",
    reference: "references/sheet-bend.jpg",
    subject: "A sheet bend joining a thick rope and a thin rope. Reproduce the exact rope structure from the reference photograph. The thick rope forms a U-shaped bight as the foundation. The thin rope passes through the bight, wraps around the outside of both legs, then tucks under its own standing part. Both tails exit on the same side. Diameter difference clearly visible." },

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

  { id: "term-02-delta-anchor", type: "term", ratio: "1:1",
    subject: "A Delta anchor shown from the side. A rigid (non-hinged) plough-type anchor. The plough head is a flat triangular delta shape — wider at the back, tapering to a point at the front. A single straight shank extends forward from the crown of the plough head. No moving parts or hinges — the shank connects directly and rigidly to the plough body. The plough blade is solid and fixed. Self-launching design — the centre of gravity is forward. Clearly a plough shape, clearly has no hinge. Factually correct enough that a sailor could identify it." },

  { id: "term-02-cqr-anchor", type: "term", ratio: "1:1",
    subject: "A CQR plough anchor shown from the side. A plough-type anchor with a distinctive HINGED JOINT between the shank and the plough head — this pivot allows the plough head to swing approximately 30 degrees side to side. The shank is long and straight. The plough head resembles a farmer's plough blade: curved underside, angled to dig into the seabed. The hinge/pivot joint is clearly visible where shank meets plough — this is the defining feature. Different from a Delta anchor which has no hinge. Factually correct enough that a sailor could identify it." },

  { id: "term-02-fishermans-anchor", type: "term", ratio: "1:1",
    subject: "A Fisherman's anchor (Admiralty pattern) shown from the side. Traditional design with these exact features: a long vertical SHANK; a horizontal STOCK (crossbar) at the TOP of the shank, perpendicular to it, forming a T or cross shape; a RING at the very top for the rode; at the BOTTOM of the shank, two ARMS extending diagonally outward at about 45 degrees in the plane perpendicular to the stock; each arm ending in a FLUKE — a flat triangular palm-shaped blade. When the anchor lies on the seabed, one fluke points up ready to dig in. The stock keeps it from rolling over. Clearly distinct from modern plough or claw anchors. Factually correct — a sailor must recognise it." },

  { id: "term-05-variation", type: "term", ratio: "1:1",
    subject: "A compass rose showing True North (straight up) and Magnetic North (a few degrees to one side). A clear arc between the two north arrows labelled as Variation. The angular difference between geographic and magnetic north." },

  { id: "term-05-deviation", type: "term", ratio: "1:1",
    subject: "A compass inside a boat, with the compass needle pulled away from magnetic north by local magnetic influences from the boat's engine and metal fittings. Two arrows from centre: magnetic north and the deviated compass reading, with a small arc showing the deviation angle." },

  { id: "term-06-cocked-hat", type: "term", ratio: "1:1",
    subject: "Three position lines on a chart, each from a different landmark, crossing to form a small triangle — the cocked hat. The position is placed at the corner of the triangle nearest the charted danger. Rocks visible nearby." },

  { id: "term-07-rule-of-twelfths", type: "term", ratio: "1:1",
    subject: "Six vertical bars showing the Rule of Twelfths tide pattern: 1, 2, 3, 3, 2, 1 twelfths of the tidal range per hour. A smooth cosine tide curve drawn above the bars. The middle hours have the fastest tidal rise or fall." },

  { id: "term-08-iala-north-cardinal", type: "term", ratio: "1:1",
    subject: "A North Cardinal pillar buoy. The topmark consists of TWO cones mounted on a single vertical staff — stacked one directly above the other on the same vertical axis, both pointing UPWARD with their points facing up. The lower cone sits immediately below the upper cone on the same staff. They are never side by side. Below the topmarks: black upper half body, yellow lower half body. Bold north arrow above. Safe water lies to the north — pass it on its north side." },

  { id: "term-08-iala-south-cardinal", type: "term", ratio: "1:1",
    subject: "A South Cardinal buoy: yellow upper half, black lower half pillar buoy. Two downward-pointing inverted cone topmarks. Bold south arrow. Safe water lies to the south. Pass it on its south side." },

  { id: "term-09-low-pressure", type: "term", ratio: "1:1",
    subject: "A low pressure weather system viewed from above. Concentric oval isobar lines. Wind arrows at four compass points all circling anticlockwise around the centre. The classic cyclonic circulation pattern in the Northern Hemisphere." },

  { id: "term-09-wind-over-tide", type: "term", ratio: "1:1",
    subject: "A bold tidal stream arrow running from left to right. A wind arrow from the right pointing downward-left — opposing the tide direction. Between them: steep, short, dangerous choppy waves with nearly vertical faces. The hazardous wind-against-tide sea state." },

  { id: "term-10-transit", type: "term", ratio: "1:1",
    subject: "Viewed from the boat approaching a harbour: a red and white striped leading beacon in the foreground, with a church tower perfectly aligned behind it. When these two objects are vertically aligned, the boat is exactly on the transit line — the most accurate pilotage method." },

  // Topic 04 — Safety equipment
  { id: "term-04-lifejacket", type: "term", ratio: "1:1",
    subject: "A modern offshore lifejacket (150N gas-inflation type), shown inflated, side-facing view. Key features: the large horseshoe-shaped inflated collar bladder wrapping around the neck and chest, a crotch strap, a manual firing handle on the front. A small thin tube is present for top-up inflation — shown as a simple narrow tube tucked discreetly to the side, not prominent. Focus on the overall silhouette and the distinctive horseshoe collar. Clearly distinct from a buoyancy aid." },

  { id: "term-04-buoyancy-aid", type: "term", ratio: "1:1",
    subject: "A foam buoyancy aid vest (50N class). Key features: a close-fitting foam-filled vest with zip or buckle fastening, open at the sides, no neck collar bladder. Shown front-facing view. Clearly distinct from a lifejacket — no gas bladder, no inflation mechanism, worn like a vest." },

  { id: "term-04-epirb", type: "term", ratio: "1:1",
    subject: "An EPIRB (Emergency Position-Indicating Radio Beacon). Key features: a cylindrical/rectangular unit with a domed antenna at the top, orange and white housing, a bracket for vessel mounting. Shown in a side or three-quarter view. The device that transmits a distress signal via satellite when activated or when it floats free." },

  { id: "term-04-plb", type: "term", ratio: "1:1",
    subject: "A PLB (Personal Locator Beacon). Key features: a compact handheld unit, smaller than an EPIRB, with a fold-out antenna at the top, bright orange housing. Shown in a side or three-quarter view. A personal distress device that transmits position via satellite — worn by an individual crew member." },

  { id: "term-04-liferaft", type: "term", ratio: "1:1",
    subject: "A valise-packed liferaft canister. Key features: a rigid fibreglass or hard-shell canister with a mounting bracket, connected to the vessel by a painter line. Shown side view. When thrown overboard and the painter is pulled, the liferaft inflates. Clearly a packed, ready-to-deploy unit — not an inflated raft." },

  { id: "term-04-parachute-flare", type: "term", ratio: "1:1",
    subject: "A parachute rocket flare. Key features: a cylindrical tube approximately 30cm long, with a firing cap at one end and launch instructions on the body. Shown side view. This is the handheld rocket type that fires a red flare skyward on a parachute — for long-range distress signalling. Distinct from a handheld flare." },

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

  // Build contents: if a reference image is provided, send it alongside the prompt
  let contents;
  if (image.reference) {
    const refPath = path.join(__dirname, image.reference);
    const refData = fs.readFileSync(refPath).toString("base64");
    contents = [{
      role: "user",
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: refData } },
        { text: `This is a reference photograph of the correct knot. Use it as the source of truth for the rope path, structure and appearance.\n\n${prompt}` },
      ],
    }];
  } else {
    contents = prompt;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio: image.ratio },
        temperature: 0,
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
