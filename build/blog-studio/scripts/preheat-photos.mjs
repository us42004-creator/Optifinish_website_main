#!/usr/bin/env node
// Pre-generates a curated photo library by running FLUX.1-dev across 18
// brand-locked prompts covering every common OptiFinish post subject.
// Saves JPEGs to public/photos/, updates index.json with rich alt-tags.
//
// Result: photoLibrary.searchBest() can reliably return a real (well,
// brand-consistent) image instead of running fresh Flux per post. Visual
// register stays uniform across the entire blog.
//
// Run: node scripts/preheat-photos.mjs
// Re-runnable: skips photos that already exist.

import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PHOTOS_DIR = path.join(ROOT, 'public', 'photos');
const INDEX_PATH = path.join(PHOTOS_DIR, 'index.json');
const PROXY = process.env.PROXY || 'http://localhost:5001';

// Brand-style suffix — same as src/services/nvidiaImageService.ts
const BRAND_SUFFIX = `Shot on Hasselblad X2D, 80mm lens, f/4, natural directional light. Editorial industrial photography, calm and precise, restrained color palette of graphite, steel grey, and warm white, with a single ember-orange accent acting as the warmest light source. Kodak Portra 400 color science. Sharp focus on the subject, gentle falloff into shadow.`;

// 18 photos covering every common OptiFinish blog subject.
// Each has a precise alt tag (semantic-search input) and category tags.
const PHOTOS = [
  {
    id: 'preheat-curing-oven-interior',
    subject: 'Interior of an industrial curing oven photographed from the entrance, glowing radiant heating elements diffused along both walls, mesh conveyor mid-cycle with empty hooks. Wide framing, deliberate negative space at the top.',
    alt: 'Interior of an industrial curing oven, glowing radiant heating elements visible, mesh conveyor mid-cycle',
    tags: ['curing oven', 'interior', 'radiant heating', 'conveyor', 'thermal', 'cure profile', 'facility'],
    categories: ['facility-behind-scenes', 'technical-deep-dive', 'pillar-guide']
  },
  {
    id: 'preheat-thermocouple-on-panel',
    subject: 'A calibrated K-type thermocouple probe resting against a freshly powder-coated metal panel inside a curing oven. Gloved technician hand visible at the edge of frame steadying the harness. Macro detail of the probe tip in sharp focus.',
    alt: 'Calibrated K-type thermocouple probe resting against a freshly coated metal panel inside a curing oven, gloved hand steadying the harness',
    tags: ['thermocouple', 'calibration', 'diagnostic', 'cure profile', 'panel', 'instrument', 'K-type'],
    categories: ['technical-deep-dive', 'how-to', 'facility-behind-scenes']
  },
  {
    id: 'preheat-gun-mid-spray',
    subject: 'Electrostatic powder coating gun mid-spray on a recessed metal part inside a booth. Visible cloud of powder mist between the gun and the part. GEMA-style applicator with hose visible. Side-on framing showing gun-to-part distance.',
    alt: 'Electrostatic powder coating gun mid-spray on a recessed metal part, visible cloud of powder mist, gun-to-part distance clearly framed',
    tags: ['spray gun', 'electrostatic', 'GEMA', 'transfer efficiency', 'booth', 'applicator', 'powder mist'],
    categories: ['technical-deep-dive', 'pillar-guide', 'case-study']
  },
  {
    id: 'preheat-pretreatment-dip',
    subject: 'A steel part being lowered by a stainless dip cage into a degreasing tank, faint chemical mist hovering above the bath surface. The dip cage chains are taut. Industrial pretreatment line in the background, slightly out of focus.',
    alt: 'Steel part being lowered into a degreasing tank, stainless dip-cage visible, chemical mist hovering above the bath',
    tags: ['pretreatment', 'degreasing', 'dip tank', 'phosphate', 'chemistry', 'preparation'],
    categories: ['technical-deep-dive', 'how-to', 'facility-behind-scenes']
  },
  {
    id: 'preheat-finished-automotive-panel',
    subject: 'A finished powder-coated automotive body panel cooling under the exit-tunnel light. Smooth gloss surface reflecting the overhead bars in long parallel streaks. The panel hangs on a clean conveyor hook.',
    alt: 'Finished powder-coated automotive body panel cooling under exit-tunnel light, smooth finish reflecting overhead bars',
    tags: ['finished part', 'automotive', 'body panel', 'exit tunnel', 'gloss', 'outcome'],
    categories: ['case-study', 'comparison-decision', 'industry-trends']
  },
  {
    id: 'preheat-rd-booth-greater-noida',
    subject: 'A small R&D-scale spray booth at a powder coating facility, instrumented with thermal probes and a powder hopper. Late-afternoon natural light through high windows. Small test panels racked nearby, awaiting application.',
    alt: 'Small R&D-scale spray booth at the OptiFinish Greater Noida facility, instrumented with thermal probes and powder hoppers, late-afternoon natural light',
    tags: ['R&D', 'test bay', 'facility', 'Greater Noida', 'small batch', 'powder hopper', 'natural light'],
    categories: ['facility-behind-scenes', 'case-study', 'pillar-guide']
  },
  {
    id: 'preheat-orange-peel-macro',
    subject: 'Macro detail of an orange-peel-textured powder-coated metal surface, raking side light exposing the dimpled topology. Extreme close-up, surface texture in sharp focus, defect diagnostic reference image.',
    alt: 'Macro detail of orange-peel-textured powder-coated surface, raking side light exposing the dimpled topology',
    tags: ['defect', 'orange peel', 'macro', 'surface texture', 'troubleshooting', 'diagnostic', 'rejection'],
    categories: ['how-to', 'technical-deep-dive']
  },
  {
    id: 'preheat-conveyor-line-wide',
    subject: 'A wide overhead view of a powder coating conveyor line, parts hanging on hooks moving through the frame. Curing oven entrance visible at the far end. Plant lighting, restrained palette.',
    alt: 'Wide overhead view of a powder coating conveyor line, parts hanging on hooks moving through a curing oven entrance',
    tags: ['conveyor', 'line', 'overhead', 'plant', 'throughput', 'wide shot'],
    categories: ['facility-behind-scenes', 'pillar-guide', 'case-study']
  },
  {
    id: 'preheat-cbam-export-coil',
    subject: 'A coil of cold-rolled steel sheet wrapped for export with customs paperwork resting on top. EU destination stamp clearly visible on the bill of lading. Forklift fork tine visible at frame edge. Loading-bay setting.',
    alt: 'Coil of cold-rolled steel wrapped for export, customs paperwork resting on top, EU destination stamp visible on the bill of lading',
    tags: ['export', 'CBAM', 'steel coil', 'customs', 'EU', 'regulation', 'compliance', 'shipment'],
    categories: ['industry-trends', 'cost-of-inaction']
  },
  {
    id: 'preheat-application-pump',
    subject: 'A GEMA-style powder application pump, canister and nozzle visible, control valves and powder hose in frame, mounted at a powder coating booth. Wall-mounted control panel with knobs to the right.',
    alt: 'GEMA-style powder application pump, canister and nozzle visible, control valves and powder hose in frame, mounted at a powder coating booth',
    tags: ['pump', 'application', 'GEMA', 'OptiSpray', 'control valve', 'hose', 'booth equipment'],
    categories: ['pillar-guide', 'technical-deep-dive', 'case-study']
  },
  {
    id: 'preheat-blistering-cast-aluminium',
    subject: 'A coated cast-aluminium part on a cooling rack, surface showing fine micro-blistering across one face. Raked side light reveals the defect texture. Macro framing. Diagnostic reference image.',
    alt: 'Coated cast-aluminium part on a cooling rack, surface showing fine micro-blistering, raked side light revealing the defect texture',
    tags: ['defect', 'blistering', 'outgassing', 'cast aluminium', 'rejection', 'diagnostic', 'monsoon'],
    categories: ['how-to', 'technical-deep-dive']
  },
  {
    id: 'preheat-pfas-free-powder-bags',
    subject: 'A row of powder bags labelled PFAS-free on a warehouse pallet, scanner gun and compliance clipboard in foreground. Stockroom shelving in background, slightly out of focus.',
    alt: 'Row of powder bags labelled PFAS-free on a warehouse pallet, scanner gun and compliance clipboard in foreground',
    tags: ['compliance', 'PFAS', 'powder bags', 'warehouse', 'scanner', 'stockroom', 'regulation'],
    categories: ['industry-trends', 'cost-of-inaction']
  },
  {
    id: 'preheat-architectural-extrusion-stack',
    subject: 'A stack of finished powder-coated architectural aluminium extrusion profiles in a Qualicoat warehouse, ends visible. Fluorescent overhead light. Industrial storage setting.',
    alt: 'Stack of finished powder-coated architectural aluminium extrusion profiles in a Qualicoat warehouse, ends visible',
    tags: ['architectural', 'extrusion', 'aluminium', 'Qualicoat', 'finished', 'facade'],
    categories: ['case-study', 'industry-trends', 'comparison-decision']
  },
  {
    id: 'preheat-engineer-with-tablet',
    subject: 'A process engineer in dark protective gear holding a tablet, inspecting a curing oven temperature profile on screen. Soft factory ambient light. No eye contact with camera. Hands-at-work framing.',
    alt: 'Process engineer with tablet inspecting a curing oven temperature profile, soft factory ambient light, no posed eye contact',
    tags: ['engineer', 'inspection', 'tablet', 'temperature profile', 'oven', 'people'],
    categories: ['facility-behind-scenes', 'how-to']
  },
  {
    id: 'preheat-powder-hopper',
    subject: 'A powder hopper close-up showing the powder bed and feed valve, light dust haze above the bed. Macro framing on the valve mechanism, brand-neutral.',
    alt: 'Close-up of a powder hopper feed valve, powder bed visible, light dust haze above the bed',
    tags: ['hopper', 'feed valve', 'powder bed', 'macro', 'equipment'],
    categories: ['technical-deep-dive', 'pillar-guide']
  },
  {
    id: 'preheat-exit-tunnel-cooling',
    subject: 'Coated panels exiting a curing oven into the cooling tunnel, glowing slightly orange from residual heat. Wide framing showing the conveyor turn and the cooling rack ahead.',
    alt: 'Coated panels exiting a curing oven into the cooling tunnel, glowing slightly orange from residual heat, conveyor turn visible',
    tags: ['exit tunnel', 'cooling', 'oven', 'conveyor', 'thermal', 'finished'],
    categories: ['facility-behind-scenes', 'case-study']
  },
  {
    id: 'preheat-degreasing-rinse',
    subject: 'A multi-stage rinse line in a pretreatment section, water cascading over a steel part on a stainless rack. Steam visible at the top of frame, blue-grey palette.',
    alt: 'Multi-stage rinse line in a pretreatment section, water cascading over a steel part on a stainless rack',
    tags: ['rinse', 'pretreatment', 'water', 'stainless', 'cascading', 'preparation'],
    categories: ['technical-deep-dive', 'how-to']
  },
  {
    id: 'preheat-faraday-cage-detail',
    subject: 'Macro detail of a powder-coated metal part with visible Faraday-cage dropouts in a recessed corner — dull patches against the surrounding gloss surface. Diagnostic reference framing.',
    alt: 'Macro detail of Faraday-cage dropouts on a coated recessed corner, dull patches against surrounding gloss surface',
    tags: ['defect', 'Faraday cage', 'dropouts', 'recess', 'diagnostic', 'macro', 'transfer efficiency'],
    categories: ['how-to', 'technical-deep-dive']
  },

  // ───── Expansion set: adds subject variety so back-to-back posts don't
  // draw from the same 18-image pool. Focus: QC instruments, procurement/
  // decision scenes, defect variety, line detail, people-at-work, plant
  // context. No new "curing oven interior" shots — that bucket is already
  // full. Every entry has 6-8 tags for BM25 matching latitude.
  {
    id: 'preheat-adhesion-cross-cut-test',
    subject: 'A cross-cut adhesion tester pressed against a powder-coated black test panel, the lattice pattern of scored squares visible in raking light, a tape strip pulled halfway back. Macro framing, sharp focus on the intersection.',
    alt: 'Cross-cut adhesion test in progress on a coated black test panel, scored lattice visible under raking light, tape strip half-lifted',
    tags: ['adhesion', 'cross-cut', 'QC', 'test', 'tape', 'panel', 'lattice', 'diagnostic'],
    categories: ['how-to', 'technical-deep-dive', 'case-study']
  },
  {
    id: 'preheat-gloss-meter-reading',
    subject: 'A hand-held gloss meter pressed against a coated metal panel, digital readout glowing on the instrument face. Gloved hand steadying the meter, workbench edge visible.',
    alt: 'Hand-held gloss meter pressed against a coated metal panel, digital readout visible, gloved hand steadying the instrument',
    tags: ['gloss meter', 'measurement', 'QC', 'instrument', 'panel', 'diagnostic', 'reading'],
    categories: ['technical-deep-dive', 'how-to', 'comparison-decision']
  },
  {
    id: 'preheat-quote-clipboard-shop-floor',
    subject: 'A wooden clipboard with a printed spec sheet resting on a shop-floor workbench, digital calipers and a red measuring square nearby. Overhead fluorescent light. Blurred plant machinery in the background.',
    alt: 'Clipboard with a spec sheet on a shop-floor workbench, digital calipers and red measuring square nearby',
    tags: ['spec sheet', 'clipboard', 'procurement', 'documentation', 'calipers', 'workbench', 'measurement'],
    categories: ['comparison-decision', 'cost-of-inaction', 'pillar-guide']
  },
  {
    id: 'preheat-powder-color-samples',
    subject: 'A row of small square powder-coated color-swatch panels racked vertically on a metal rack, gradient from cool grey through warm terracotta. Studio light, shallow depth of field on the front sample.',
    alt: 'Row of powder-coated color-swatch panels racked on a metal rack, gradient from cool grey to warm terracotta',
    tags: ['color', 'swatch', 'samples', 'rack', 'RAL', 'palette', 'formulation'],
    categories: ['pillar-guide', 'technical-deep-dive', 'industry-trends']
  },
  {
    id: 'preheat-back-ionization-defect',
    subject: 'Macro detail of a powder-coated metal surface with visible back-ionization craters — small pockmarks and dry-spray texture on an otherwise smooth film. Raking side light, diagnostic reference framing.',
    alt: 'Macro detail of back-ionization craters on a coated surface, small pockmarks and dry-spray texture, raking side light',
    tags: ['defect', 'back-ionization', 'craters', 'dry spray', 'macro', 'diagnostic', 'rejection'],
    categories: ['how-to', 'technical-deep-dive']
  },
  {
    id: 'preheat-oven-control-panel',
    subject: 'An industrial oven HMI touchscreen mounted on a metal control cabinet, showing a cure profile graph in soft amber-on-black. Cabinet lit by cool ambient overhead light.',
    alt: 'Industrial oven HMI touchscreen showing a cure profile graph in amber, mounted on a metal control cabinet',
    tags: ['HMI', 'control', 'oven', 'cure profile', 'touchscreen', 'PLC', 'panel'],
    categories: ['technical-deep-dive', 'facility-behind-scenes', 'pillar-guide']
  },
  {
    id: 'preheat-dust-collector-cartridge',
    subject: 'Close-up detail of a booth dust-collector cartridge lifted partially out of its housing, pleated filter media visible, thin powder residue at the base. Industrial gantry above.',
    alt: 'Booth dust-collector cartridge lifted from its housing, pleated filter media visible, powder residue at the base',
    tags: ['dust collector', 'cartridge', 'filter', 'booth', 'maintenance', 'reclaim'],
    categories: ['how-to', 'technical-deep-dive', 'facility-behind-scenes']
  },
  {
    id: 'preheat-loading-bay-dispatch',
    subject: 'A dispatch loading bay at an industrial finishing plant, palletised finished parts wrapped in stretch film ready for a truck. Open shutter door in the background, morning light spilling across the concrete floor.',
    alt: 'Dispatch loading bay with palletised finished parts wrapped in stretch film, open shutter door with morning light',
    tags: ['dispatch', 'loading bay', 'palletised', 'finished parts', 'logistics', 'plant', 'shipment'],
    categories: ['facility-behind-scenes', 'case-study', 'industry-trends']
  },
  {
    id: 'preheat-engineer-marking-defect',
    subject: 'A process engineer marking a defect on a powder-coated test panel with a fine paint pen, the paint pen tip touching the panel surface. Overhead task light, macro framing on the pen tip, no eye contact.',
    alt: 'Process engineer marking a defect on a coated test panel with a fine paint pen, macro framing on the pen tip',
    tags: ['engineer', 'defect', 'marking', 'test panel', 'diagnostic', 'people', 'QC'],
    categories: ['how-to', 'technical-deep-dive', 'facility-behind-scenes']
  },
  {
    id: 'preheat-cast-aluminium-blank',
    subject: 'An untreated cast-aluminium blank resting on a workbench, casting texture and gate stub visible. Overhead cool light, macro framing on the surface pores.',
    alt: 'Untreated cast-aluminium blank on a workbench, casting texture and gate stub visible, macro on surface pores',
    tags: ['cast aluminium', 'substrate', 'blank', 'casting', 'porosity', 'preparation', 'untreated'],
    categories: ['technical-deep-dive', 'how-to']
  },
  {
    id: 'preheat-conveyor-hook-detail',
    subject: 'A close-up of a conveyor hook holding a small coated part mid-transit through a powder line, the hook and part in sharp focus, motion blur on the background chain and structure.',
    alt: 'Close-up of a conveyor hook holding a coated part mid-transit, motion blur on background chain',
    tags: ['conveyor', 'hook', 'transit', 'part carrier', 'line', 'motion', 'detail'],
    categories: ['facility-behind-scenes', 'technical-deep-dive', 'pillar-guide']
  },
  {
    id: 'preheat-hygrometer-plant',
    subject: 'A wall-mounted analog hygrometer and thermometer in an industrial plant, needle showing high humidity. Painted concrete wall texture behind, subtle warm ambient light.',
    alt: 'Wall-mounted analog hygrometer and thermometer in an industrial plant, needle showing high humidity',
    tags: ['humidity', 'hygrometer', 'monsoon', 'ambient', 'plant', 'reading', 'instrument'],
    categories: ['how-to', 'technical-deep-dive', 'facility-behind-scenes']
  }
];

const PROMPT_DEFAULTS = {
  width: 1024,
  height: 1024,
  cfg_scale: 5,
  mode: 'base',
  steps: 30,
  samples: 1
};

async function fluxImage(prompt, attempt = 1) {
  const res = await fetch(`${PROXY}/api/nvidia/flux`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...PROMPT_DEFAULTS,
      prompt: `${prompt.trim()}\n\n${BRAND_SUFFIX}`,
      seed: Math.floor(Math.random() * 100000)
    })
  });
  if (!res.ok) {
    if (res.status >= 500 && attempt < 3) {
      console.log(`     ${res.status} on attempt ${attempt}, retrying…`);
      await new Promise((r) => setTimeout(r, 2000));
      return fluxImage(prompt, attempt + 1);
    }
    const t = await res.text();
    throw new Error(`Flux ${res.status}: ${t.slice(0, 200)}`);
  }
  const j = await res.json();
  const b64 = j?.artifacts?.[0]?.base64;
  if (!b64) throw new Error('No base64 in Flux response');
  return b64;
}

async function main() {
  await fs.mkdir(PHOTOS_DIR, { recursive: true });
  const successes = [];
  const failures = [];

  console.log(`[preheat-photos] generating ${PHOTOS.length} brand-locked photos...`);
  for (let i = 0; i < PHOTOS.length; i++) {
    const photo = PHOTOS[i];
    const filePath = path.join(PHOTOS_DIR, `${photo.id}.jpg`);
    process.stdout.write(`  ${i + 1}/${PHOTOS.length}  ${photo.id}  `);
    if (existsSync(filePath)) {
      console.log('exists ✓ skip');
      successes.push(photo);
      continue;
    }
    const t0 = Date.now();
    try {
      const b64 = await fluxImage(photo.subject);
      await fs.writeFile(filePath, Buffer.from(b64, 'base64'));
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      console.log(`✓ ${elapsed}s`);
      successes.push(photo);
    } catch (err) {
      console.log(`✗ ${err.message?.slice(0, 80)}`);
      failures.push({ photo, error: err.message });
    }
  }

  // Build the new index, preserving existing seed entries that aren't superseded
  const aspectRatio = '1:1'; // FLUX.1-dev on NVIDIA hosted only renders 1024×1024
  const newEntries = successes.map((p) => ({
    id: p.id,
    url: `/photos/${p.id}.jpg`,
    alt: p.alt,
    tags: p.tags,
    categories: p.categories,
    aspectRatio,
    isPlaceholder: false
  }));

  const index = {
    $schema: 'https://optifinish.com/schemas/photo-library.json',
    version: 2,
    lastUpdated: new Date().toISOString().slice(0, 10),
    note: `Preheated library: ${successes.length} brand-locked Flux renders. Replace individual entries with real Greater Noida photography by saving photo to /public/photos/<id>.jpg and editing this index.`,
    photos: newEntries
  };
  await fs.writeFile(INDEX_PATH, JSON.stringify(index, null, 2));

  console.log(``);
  console.log(`[preheat-photos] done: ${successes.length} success, ${failures.length} failure`);
  if (failures.length > 0) {
    console.log(`  failures:`);
    for (const f of failures) console.log(`    - ${f.photo.id}: ${f.error?.slice(0, 100)}`);
    console.log(`  re-run the script to retry failures.`);
  }
}

main().catch((e) => {
  console.error('FAILED:', e);
  process.exit(1);
});
