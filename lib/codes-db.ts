/**
 * AUTO CODE FIX — Master Code Database (TypeScript)
 * Single source of truth for:
 *   - Static page generation (generateStaticParams)
 *   - Code lookup logic
 *   - Related codes system
 *   - SEO metadata
 */

export interface OBDCode {
  code: string;
  name: string;
  cat: Category;
  sev: Severity;
  desc?: string;
  causes: string[];
  symptoms: string[];
  solutions: string[];
  diy: boolean;
  avg_cost: string;
  tip?: string;
  img?: string;   // Optional: URL to wiring diagram / component photo
  video?: string; // Optional: YouTube embed URL
}

export type Category =
  | 'engine' | 'fuel' | 'emissions' | 'transmission'
  | 'ignition' | 'abs' | 'airbag' | 'hvac'
  | 'electrical' | 'network' | 'sensors' | 'exhaust';

export type Severity = 'high' | 'med' | 'low';

export const CATEGORY_META: Record<Category, { label: string; icon: string; count: number }> = {
  engine:       { label: 'Engine',        icon: '🔧', count: 620  },
  transmission: { label: 'Transmission',  icon: '⚙️', count: 310  },
  fuel:         { label: 'Fuel System',   icon: '⛽', count: 280  },
  emissions:    { label: 'Emissions',     icon: '💨', count: 240  },
  ignition:     { label: 'Ignition',      icon: '🔑', count: 190  },
  abs:          { label: 'ABS / Brakes',  icon: '🛑', count: 180  },
  airbag:       { label: 'Airbag / SRS',  icon: '🫧', count: 120  },
  hvac:         { label: 'HVAC',          icon: '❄️', count: 115  },
  electrical:   { label: 'Electrical',    icon: '⚡', count: 200  },
  network:      { label: 'Network / CAN', icon: '📡', count: 180  },
  sensors:      { label: 'Sensors',       icon: '📟', count: 310  },
  exhaust:      { label: 'Exhaust',       icon: '🌫️', count: 95   },
};

export const SEV_META: Record<Severity, { label: string; color: string; hex: string }> = {
  high: { label: 'Critical', color: 'text-red-400',    hex: '#FF1744' },
  med:  { label: 'Moderate', color: 'text-yellow-400', hex: '#FFC107' },
  low:  { label: 'Minor',    color: 'text-green-400',  hex: '#00C853' },
};

export const CODES: OBDCode[] = [

  /* ═══════════════════ ENGINE ═══════════════════ */
  { code:'P0300', name:'Random/Multiple Cylinder Misfire Detected',              cat:'engine',   sev:'high',
    causes:['Worn or fouled spark plugs','Faulty ignition coil(s)','Low fuel pressure or clogged injectors','Vacuum leak or low compression'],
    symptoms:['Rough or shaking idle','Check engine light flashing','Loss of power under acceleration','Strong fuel smell from exhaust'],
    solutions:['Inspect and replace spark plugs','Test each ignition coil with a swap test','Check fuel pressure and injector pulse','Perform compression test on all cylinders'],
    diy:true, avg_cost:'$50–$400', tip:'A flashing check engine light during a misfire means catalytic converter damage is occurring — do not delay repair.' },

  { code:'P0301', name:'Cylinder 1 Misfire Detected',                            cat:'engine',   sev:'high',
    causes:['Faulty spark plug on cylinder 1','Bad ignition coil on cylinder 1','Clogged or failed fuel injector','Low compression in cylinder 1'],
    symptoms:['Rough idle especially at startup','Hesitation on acceleration','Possible fuel smell'],
    solutions:['Swap spark plug from cylinder 1 to another','Swap ignition coil to another cylinder and recheck','Test injector with noid light','Check compression'],
    diy:true, avg_cost:'$50–$300', tip:'Always swap parts to another cylinder to confirm the fault follows the part, not the cylinder.' },

  { code:'P0302', name:'Cylinder 2 Misfire Detected',                            cat:'engine',   sev:'high',
    causes:['Worn spark plug cylinder 2','Failed coil on plug cylinder 2','Injector failure on cylinder 2','Burnt valve or low compression'],
    symptoms:['Rough idle','Check engine light on','Reduced power'],
    solutions:['Replace spark plug cylinder 2','Replace ignition coil','Test or replace injector','Perform leak-down test'],
    diy:true, avg_cost:'$50–$350', tip:'Check for oil on the spark plug tip — it indicates a leaking valve cover gasket affecting the coil.' },

  { code:'P0303', name:'Cylinder 3 Misfire Detected',                            cat:'engine',   sev:'high',
    causes:['Bad spark plug','Coil failure','Fuel delivery issue','Carbon buildup on intake valves (direct injection engines)'],
    symptoms:['Shaking at idle','Hesitation','Fuel odor from exhaust'],
    solutions:['Replace spark plug','Replace coil pack','Check injector','Perform walnut blasting on intake valves if GDI engine'],
    diy:true, avg_cost:'$50–$400', tip:'GDI engines are prone to intake valve carbon buildup — not cleaned by fuel additives.' },

  { code:'P0304', name:'Cylinder 4 Misfire Detected',                            cat:'engine',   sev:'high',
    causes:['Fouled spark plug','Failed ignition coil','Injector clog','Cracked piston ring or head gasket'],
    symptoms:['Rough running','Smoke from exhaust','Poor fuel economy'],
    solutions:['Inspect and replace spark plug','Swap and test coil','Replace injector if no pulse','Check for coolant in oil — possible head gasket'],
    diy:true, avg_cost:'$50–$500', tip:'If coolant level drops without a visible leak, suspect head gasket failure alongside the misfire.' },

  { code:'P0011', name:'Camshaft Position Timing Over-Advanced (Bank 1)',        cat:'engine',   sev:'high',
    causes:['Low or dirty engine oil','Faulty variable valve timing (VVT) solenoid','Stuck or blocked oil control valve','Stretched timing chain'],
    symptoms:['Hard start','Rough idle','Rattling noise on cold start','Poor fuel economy'],
    solutions:['Change engine oil and filter first','Clean or replace VVT solenoid','Inspect oil control valve screen','Check timing chain stretch'],
    diy:false, avg_cost:'$100–$800', tip:'Always try an oil change first — this code often clears with fresh oil of the correct viscosity.' },

  { code:'P0016', name:'Crankshaft/Camshaft Position Correlation Bank 1 Sensor A', cat:'engine', sev:'high',
    causes:['Stretched or worn timing chain','Worn timing chain tensioner','Faulty cam or crank sensor','Incorrect engine timing'],
    symptoms:['Engine runs rough','Hard to start','Rattling from timing chain area','Check engine light'],
    solutions:['Inspect timing chain for stretch','Replace timing chain and tensioner','Replace cam/crank sensors','Verify timing marks alignment'],
    diy:false, avg_cost:'$300–$1200', tip:'This code combined with cold-start rattling almost always means timing chain replacement is needed.' },

  { code:'P0101', name:'Mass Air Flow Sensor Range/Performance',                 cat:'engine',   sev:'med',
    causes:['Dirty or contaminated MAF sensor','Air leak between MAF and throttle body','Faulty MAF sensor','Clogged air filter'],
    symptoms:['Poor throttle response','Rough idle','Black smoke from exhaust','Poor fuel economy'],
    solutions:['Clean MAF sensor with MAF cleaner spray','Check all intake hoses for cracks or leaks','Replace air filter','Replace MAF sensor if cleaning fails'],
    diy:true, avg_cost:'$20–$250', tip:'Never touch the MAF sensor wire — even fingerprint oils can throw off readings. Use only MAF-specific cleaner.' },

  { code:'P0128', name:'Coolant Temperature Below Thermostat Regulating Temperature', cat:'engine', sev:'low',
    causes:['Thermostat stuck open','Faulty coolant temperature sensor','Low coolant level','Incorrect thermostat installed'],
    symptoms:['Heater blows cool air','Temperature gauge stays low','Poor fuel economy in cold weather'],
    solutions:['Replace thermostat (most common fix)','Verify coolant temperature sensor reads correctly','Check coolant level','Ensure correct thermostat rating for vehicle'],
    diy:true, avg_cost:'$20–$150', tip:'Replacing the thermostat is cheap and almost always the fix — it is rarely the sensor causing this code.' },

  { code:'P0130', name:'O2 Sensor Circuit Malfunction Bank 1 Sensor 1',          cat:'engine',   sev:'med',
    causes:['Failed upstream O2 sensor','Damaged wiring harness to sensor','Exhaust leak near sensor','Contaminated sensor from oil or coolant burning'],
    symptoms:['Poor fuel economy','Rough idle','Failed emissions test'],
    solutions:['Inspect O2 sensor wiring for damage','Check for exhaust leaks upstream','Replace upstream O2 sensor','Scan for related codes like P0171/P0172'],
    diy:true, avg_cost:'$50–$250', tip:'Exhaust leaks near the O2 sensor can cause false readings — always check for leaks before replacing the sensor.' },

  { code:'P0340', name:'Camshaft Position Sensor Circuit Malfunction',           cat:'engine',   sev:'high',
    causes:['Failed camshaft position sensor','Damaged or corroded wiring','Reluctor wheel damage','Failed PCM'],
    symptoms:['Engine stalls or will not start','Extended crank time','Check engine light'],
    solutions:['Inspect CMP sensor wiring and connector','Test sensor resistance','Replace CMP sensor','Check reluctor wheel for damage'],
    diy:true, avg_cost:'$50–$300', tip:'If the engine cranks but will not start and you have this code, the CMP sensor is the first thing to replace.' },

  { code:'P0351', name:'Ignition Coil A Primary/Secondary Circuit Malfunction',  cat:'ignition', sev:'high',
    causes:['Failed ignition coil pack','Open or short in coil wiring','Failed igniter','Low battery voltage affecting coil saturation'],
    symptoms:['Misfire on cylinder 1','Check engine light','Rough idle'],
    solutions:['Swap coil to another cylinder','Replace coil if fault follows it','Inspect coil wiring harness','Check battery voltage'],
    diy:true, avg_cost:'$30–$200', tip:'Always swap the coil to another cylinder and re-scan — if the misfire moves, the coil is confirmed bad.' },

  { code:'P0505', name:'Idle Air Control System Malfunction',                    cat:'engine',   sev:'med',
    causes:['Dirty or stuck IAC valve','Vacuum leak causing uncontrolled idle air','Throttle body carbon buildup','Failed IAC motor'],
    symptoms:['High or unstable idle','Engine stalls at idle','Idle fluctuates up and down'],
    solutions:['Clean IAC valve with throttle body cleaner','Clean throttle body','Check for vacuum leaks','Replace IAC valve'],
    diy:true, avg_cost:'$20–$250', tip:'Clean the throttle body and IAC valve together — they work as a system and carbon on one affects the other.' },

  /* ═══════════════════ FUEL ═══════════════════ */
  { code:'P0087', name:'Fuel Rail/System Pressure Too Low',                      cat:'fuel',     sev:'high',
    causes:['Weak or failing fuel pump','Clogged fuel filter','Faulty fuel pressure regulator','Leaking fuel injector(s)'],
    symptoms:['Hard starting','Stalling under load','Hesitation on acceleration','Engine surging'],
    solutions:['Check fuel pressure with a gauge','Replace fuel filter first','Test fuel pump flow rate','Inspect pressure regulator'],
    diy:false, avg_cost:'$100–$600', tip:'Measure fuel pressure at idle and at wide-open throttle — a pump that passes idle may fail under load.' },

  { code:'P0171', name:'System Too Lean Bank 1',                                 cat:'fuel',     sev:'med',
    causes:['Vacuum leak (intake manifold gasket, PCV hose, brake booster)','Dirty or failing MAF sensor','Weak fuel pump','Clogged fuel injectors'],
    symptoms:['Rough idle','Hesitation on acceleration','Check engine light','Poor fuel economy'],
    solutions:['Spray carb cleaner around intake to find vacuum leaks','Clean MAF sensor','Check fuel pressure','Clean or replace injectors'],
    diy:true, avg_cost:'$20–$400', tip:'Use a smoke machine to find vacuum leaks quickly — carb cleaner works but can be a fire hazard near hot components.' },

  { code:'P0172', name:'System Too Rich Bank 1',                                 cat:'fuel',     sev:'med',
    causes:['Leaking fuel injector(s)','Faulty O2 or MAP sensor','High fuel pressure','Coolant temperature sensor reading cold'],
    symptoms:['Black smoke from exhaust','Strong fuel smell','Fouled spark plugs','Poor fuel economy'],
    solutions:['Check for leaking injectors (listen for drip)','Test MAP and coolant temp sensor','Check fuel pressure','Inspect for coolant leak into combustion'],
    diy:true, avg_cost:'$50–$400', tip:'A single leaking injector can cause a rich code for the whole bank — check each injector with a stethoscope for dripping sounds.' },

  { code:'P0174', name:'System Too Lean Bank 2',                                 cat:'fuel',     sev:'med',
    causes:['Intake manifold vacuum leak Bank 2 side','MAF sensor contamination','Unequal fuel distribution','PCV system leak'],
    symptoms:['Rough idle','Lean hesitation','Check engine light'],
    solutions:['Inspect Bank 2 intake manifold gaskets','Clean MAF sensor','Check PCV hose condition','Check fuel injectors on Bank 2'],
    diy:true, avg_cost:'$30–$500', tip:'On V6/V8 engines, having both P0171 and P0174 together almost always points to a large vacuum leak or dirty MAF — not individual injectors.' },

  /* ═══════════════════ EMISSIONS ═══════════════════ */
  { code:'P0420', name:'Catalyst System Efficiency Below Threshold Bank 1',      cat:'emissions', sev:'med',
    causes:['Failed catalytic converter','Faulty downstream O2 sensor','Exhaust leak before downstream sensor','Engine oil or coolant burning (fouling the cat)'],
    symptoms:['Check engine light','Possible slight sulphur smell','May fail emissions test'],
    solutions:['Check downstream O2 sensor function first','Inspect for exhaust leaks','Run cat cleaner additive (if cat is borderline)','Replace catalytic converter'],
    diy:false, avg_cost:'$150–$1200', tip:'Before replacing a $1000+ catalytic converter, verify the downstream O2 sensor is working correctly — a bad sensor is a $150 fix.' },

  { code:'P0430', name:'Catalyst System Efficiency Below Threshold Bank 2',      cat:'emissions', sev:'med',
    causes:['Failed Bank 2 catalytic converter','Faulty Bank 2 downstream O2 sensor','Rich running condition degrading the cat','Physical damage to catalyst substrate'],
    symptoms:['Check engine light','Possible rotten egg smell','Emissions test failure'],
    solutions:['Test Bank 2 downstream O2 sensor','Check for rich running codes on Bank 2','Inspect cat for physical damage','Replace Bank 2 catalytic converter'],
    diy:false, avg_cost:'$150–$1200', tip:'On V6 and V8 engines both banks can fail simultaneously — budget for replacing both cats if one is already gone.' },

  { code:'P0442', name:'Evaporative Emission System Leak Detected (Small Leak)', cat:'emissions', sev:'low',
    causes:['Loose or faulty gas cap','Cracked or disconnected EVAP hose','Faulty purge valve','Faulty vent valve'],
    symptoms:['Check engine light','Faint fuel smell (sometimes)','Emissions test failure'],
    solutions:['Tighten or replace gas cap first','Inspect all EVAP hoses for cracks','Test purge solenoid','Perform smoke test to locate leak'],
    diy:true, avg_cost:'$5–$200', tip:'Always try a new gas cap first — it costs $10 and fixes this code about 30% of the time.' },

  { code:'P0455', name:'Evaporative Emission System Leak Detected (Large Leak)', cat:'emissions', sev:'med',
    causes:['Missing or severely damaged gas cap','Large crack in EVAP line','Failed charcoal canister','Stuck open purge or vent valve'],
    symptoms:['Strong fuel smell','Check engine light','Failed evap test'],
    solutions:['Check gas cap and EVAP lines visually','Perform smoke test','Test purge and vent valves','Replace charcoal canister if saturated'],
    diy:true, avg_cost:'$10–$400', tip:'A large EVAP leak is often visible — look for cracked hoses or a split charcoal canister before reaching for diagnostic tools.' },

  { code:'P0456', name:'Evaporative Emission System Leak Detected (Very Small Leak)', cat:'emissions', sev:'low',
    causes:['Micro-crack in EVAP hose','Degraded gas cap seal','Very small leak in charcoal canister','Faulty vent valve seal'],
    symptoms:['Check engine light (only symptom usually)'],
    solutions:['Replace gas cap','Perform professional smoke test','Inspect all EVAP line connections','Replace vent valve if leaking'],
    diy:true, avg_cost:'$5–$300', tip:'Very small leaks require a smoke machine — they are impossible to find reliably without one.' },

  /* ═══════════════════ TRANSMISSION ═══════════════════ */
  { code:'P0700', name:'Transmission Control System Malfunction',                cat:'transmission', sev:'high',
    causes:['Transmission-specific fault code stored alongside this one','Low or degraded transmission fluid','Internal transmission fault','TCM failure'],
    symptoms:['Transmission warning light','Limp mode or harsh shifting','May not shift out of certain gear'],
    solutions:['Read all stored codes — P0700 is a gateway code','Check transmission fluid level and condition','Perform transmission fluid flush if dirty','Address specific TCM fault codes'],
    diy:false, avg_cost:'$150–$3000+', tip:'P0700 is never the only code — always read the full list; the specific transmission code tells you the actual problem.' },

  { code:'P0730', name:'Incorrect Gear Ratio',                                   cat:'transmission', sev:'high',
    causes:['Low or dirty transmission fluid','Worn clutch packs','Failed shift solenoid','Slipping torque converter'],
    symptoms:['Slipping between gears','Delayed engagement','Limp mode','Burning smell from transmission'],
    solutions:['Check transmission fluid level and condition','Flush and refill with correct fluid spec','Test shift solenoids','Internal transmission inspection'],
    diy:false, avg_cost:'$200–$3500', tip:'Transmission fluid that is dark brown or smells burnt indicates clutch pack wear — a full rebuild may be needed.' },

  /* ═══════════════════ IGNITION ═══════════════════ */
  { code:'P0352', name:'Ignition Coil B Primary/Secondary Circuit Malfunction',  cat:'ignition', sev:'high',
    causes:['Failed ignition coil B','Open or short in coil B wiring','Faulty igniter module','Low charging voltage'],
    symptoms:['Cylinder 2 misfire','Rough idle','Check engine light'],
    solutions:['Swap coil to another cylinder and rescan','Replace coil if fault follows','Inspect wiring harness','Verify battery voltage'],
    diy:true, avg_cost:'$30–$200', tip:'A coil swap test takes 5 minutes and definitively proves whether the coil is the fault.' },

  { code:'P0335', name:'Crankshaft Position Sensor Circuit Malfunction',          cat:'sensors',  sev:'high',
    causes:['Failed crankshaft position sensor','Damaged CKP sensor wiring','Damaged reluctor wheel on crankshaft','Interference from nearby wiring'],
    symptoms:['Engine will not start','Intermittent stalling','Check engine light','Erratic RPM gauge'],
    solutions:['Inspect CKP sensor wiring for damage or corrosion','Check reluctor wheel for broken teeth','Measure sensor resistance','Replace CKP sensor'],
    diy:true, avg_cost:'$50–$250', tip:'The CKP sensor is critical — no crank signal means no ignition or fuel injection. It is a priority repair.' },

  /* ═══════════════════ ABS / BRAKES ═══════════════════ */
  { code:'C0035', name:'Left Front Wheel Speed Sensor Circuit Malfunction',      cat:'abs',      sev:'high',
    causes:['Failed wheel speed sensor','Damaged tone ring (reluctor wheel)','Broken or corroded wiring to sensor','Air gap too large between sensor and ring'],
    symptoms:['ABS warning light','Traction control disabled','Stability control disabled','ABS activates at low speed'],
    solutions:['Inspect sensor wiring and connector for damage','Clean sensor and tone ring of debris','Measure sensor resistance (typical 1000–2500 ohms)','Replace wheel speed sensor'],
    diy:true, avg_cost:'$50–$200', tip:'Check the sensor air gap — debris packed between the sensor and tone ring is a common cause that is free to fix.' },

  /* ═══════════════════ NETWORK / CAN ═══════════════════ */
  { code:'U0100', name:'Lost Communication With ECM/PCM A',                      cat:'network',  sev:'high',
    causes:['Faulty ECM/PCM','CAN bus wiring fault (short, open, or high resistance)','Blown fuse for ECM power or ground','Corroded ECM connector'],
    symptoms:['Multiple warning lights','Vehicle may not start','Multiple system failures simultaneously'],
    solutions:['Check all ECM fuses and grounds','Inspect ECM connector pins for corrosion','Test CAN bus for shorts or opens','Have ECM tested or replaced'],
    diy:false, avg_cost:'$200–$1500', tip:'Multiple simultaneous codes across different systems often point to a CAN bus or power supply issue — not multiple component failures.' },

  /* ═══════════════════ SENSORS ═══════════════════ */
  { code:'P0131', name:'O2 Sensor Circuit Low Voltage Bank 1 Sensor 1',          cat:'sensors',  sev:'med',
    causes:['O2 sensor signal wire shorted to ground','Failed O2 sensor','Lean exhaust condition','Open circuit in signal wire'],
    symptoms:['Check engine light','Rich or lean running','Failed smog test'],
    solutions:['Check O2 sensor wiring for shorts','Verify fuel system is not running lean','Replace O2 sensor','Check ECM O2 signal input'],
    diy:true, avg_cost:'$50–$200', tip:'Always address lean codes (P0171/P0174) before replacing the O2 sensor — a lean condition destroys sensors.' },

  { code:'P0135', name:'O2 Sensor Heater Circuit Malfunction Bank 1 Sensor 1',   cat:'sensors',  sev:'med',
    causes:['Blown fuse for O2 sensor heater','Failed heater element in sensor','Open or shorted heater circuit wiring','Failed PCM heater control driver'],
    symptoms:['Check engine light','Slightly poor cold-start fuel economy'],
    solutions:['Check O2 sensor heater fuse','Measure heater resistance (should be 10–20 ohms)','Inspect heater wiring','Replace O2 sensor if heater resistance is infinite'],
    diy:true, avg_cost:'$50–$200', tip:'Check the fuse first — it takes 30 seconds and is the most common cause of this code.' },

  /* ═══════════════════ ELECTRICAL ═══════════════════ */
  { code:'P0562', name:'System Voltage Low',                                     cat:'electrical', sev:'high',
    causes:['Failing alternator','Weak or dying battery','Loose or corroded battery terminals','High resistance in charging circuit'],
    symptoms:['Battery warning light','Dim headlights','Electrical accessories behaving oddly','Multiple random fault codes'],
    solutions:['Load test the battery','Test alternator output (should be 13.5–14.8V running)','Clean battery terminals','Replace battery or alternator as needed'],
    diy:true, avg_cost:'$50–$400', tip:'Multiple random codes across different systems combined with this code almost always mean the battery or alternator — fix power supply first, then re-scan.' },
];

/* ─── Helper functions ─── */

export function getCode(code: string): OBDCode | undefined {
  return CODES.find(c => c.code.toLowerCase() === code.toLowerCase());
}

export function getCodesByCategory(cat: Category): OBDCode[] {
  return CODES.filter(c => c.cat === cat);
}

/**
 * Related codes system:
 * 1. Same category (primary signal)
 * 2. Boost with codes that share keyword overlap in name
 * 3. Exclude the current code itself
 * Returns up to 6 related codes, scored by relevance
 */
export function getRelatedCodes(code: OBDCode, limit = 6): OBDCode[] {
  const targetWords = new Set(
    code.name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3)
  );

  const scored = CODES
    .filter(c => c.code !== code.code)
    .map(c => {
      let score = 0;

      // Same category = strong signal
      if (c.cat === code.cat) score += 10;

      // Same code family prefix (P030x, P017x etc.)
      if (c.code.slice(0, 4) === code.code.slice(0, 4)) score += 5;

      // Shared code letter (P/B/C/U)
      if (c.code[0] === code.code[0]) score += 2;

      // Same severity
      if (c.sev === code.sev) score += 1;

      // Keyword overlap in name
      const cWords = c.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
      for (const w of cWords) {
        if (w.length > 3 && targetWords.has(w)) score += 3;
      }

      return { code: c, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.code);

  return scored;
}

export function getAllSlugs(): string[] {
  return CODES.map(c => c.code.toLowerCase());
}

export function catLabel(cat: Category): string {
  return CATEGORY_META[cat]?.label ?? cat;
}

export function sevLabel(sev: Severity): string {
  return SEV_META[sev]?.label ?? sev;
}

export function sevHex(sev: Severity): string {
  return SEV_META[sev]?.hex ?? '#999';
}

/* ─── Search helpers ─── */

export interface SearchResult {
  code: string;
  name: string;
  cat: Category;
  sev: Severity;
  desc?: string;
}

export function searchCodes(query: string, limit = 10): SearchResult[] {
  const q = query.trim().toUpperCase();
  if (!q || q.length < 2) return [];

  const ql = q.toLowerCase();

  const scored = CODES.map(c => {
    let score = 0;
    const codeLower = c.code.toLowerCase();
    const nameLower = c.name.toLowerCase();
    const descLower = (c.desc ?? '').toLowerCase();

    // Exact code match — highest priority
    if (c.code === q) score += 100;
    // Code starts with query
    else if (c.code.startsWith(q)) score += 60;
    // Code contains query
    else if (c.code.includes(q)) score += 30;
    // Name starts with query word
    if (nameLower.startsWith(ql)) score += 20;
    // Name contains query
    if (nameLower.includes(ql)) score += 10;
    // Desc contains query
    if (descLower.includes(ql)) score += 5;

    return { code: c, score };
  })
  .filter(s => s.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, limit)
  .map(s => ({
    code: s.code.code,
    name: s.code.name,
    cat: s.code.cat,
    sev: s.code.sev,
    desc: s.code.desc,
  }));

  return scored;
}


export function getCategoryStats(cat: Category) {
  const codes = CODES.filter(c => c.cat === cat);
  const high = codes.filter(c => c.sev === 'high').length;
  const med  = codes.filter(c => c.sev === 'med').length;
  const low  = codes.filter(c => c.sev === 'low').length;
  const diy  = codes.filter(c => c.diy).length;
  return { total: codes.length, high, med, low, diy };
}
