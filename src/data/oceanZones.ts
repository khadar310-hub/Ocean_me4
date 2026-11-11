export interface Creature {
  id: string;
  name: string;
  scientificName: string;
  depthRange: string;
  depthMin: number;
  depthMax: number;
  zoneId: string;
  length: string;
  diet: string;
  bioluminescence: boolean;
  bioluminescenceDetail?: string;
  glowColor?: string;
  pressureTolerance: string;
  summary: string;
  adaptations: string[];
  funFact: string;
  svgIcon: 'jelly' | 'angler' | 'squid' | 'turtle' | 'whale' | 'eel' | 'isopod' | 'tubeworm' | 'snailfish' | 'tripod' | 'microbe' | 'dumbo';
  imageOverride?: string;
}

export interface Landmark {
  depth: number;
  title: string;
  description: string;
  type: 'human' | 'fauna' | 'geological';
}

export interface OceanZone {
  id: string;
  name: string;
  latinName: string;
  depthStart: number;
  depthEnd: number;
  depthRangeLabel: string;
  ambientLight: string;
  temperatureRange: string;
  pressureRange: string;
  bgGradient: string;
  overview: string;
  scientificSignificance: string;
  creatures: Creature[];
  landmarks: Landmark[];
  ambientColor: string;
  accentColor: string;
}

export const OCEAN_ZONES: OceanZone[] = [
  {
    id: 'epipelagic',
    name: 'Epipelagic Zone',
    latinName: 'Sunlit Zone',
    depthStart: 0,
    depthEnd: 200,
    depthRangeLabel: '0 m – 200 m',
    ambientLight: '100% – 1% (Active Photosynthesis)',
    temperatureRange: '20°C – 32°C (68°F – 90°F)',
    pressureRange: '1 – 21 atm (14.7 – 308 psi)',
    bgGradient: 'from-cyan-600 via-sky-700 to-blue-900',
    ambientColor: '#0ea5e9',
    accentColor: '#38bdf8',
    overview: 'The uppermost layer of the ocean bathed in solar radiance. Although it represents less than 3% of the total ocean volume, this zone produces over 50% of the Earth’s oxygen through phytoplankton photosynthesis and hosts 90% of all marine species.',
    scientificSignificance: 'Global carbon fixation and primary marine productivity take place almost exclusively here. Sunlight penetrates down to roughly 200 meters, marking the photic boundary below which plants cannot survive.',
    landmarks: [
      { depth: 40, title: 'Recreational Scuba Limit', description: 'Standard safe limit for recreational compressed-air scuba diving.', type: 'human' },
      { depth: 100, title: 'Mesophotic Coral Reefs', description: 'Deepest coral reef ecosystems capable of utilizing filtered sunlight.', type: 'geological' },
      { depth: 200, title: 'The Photic Boundary', description: 'The absolute limit of light necessary for biological photosynthesis.', type: 'geological' }
    ],
    creatures: [
      {
        id: 'green-sea-turtle',
        name: 'Green Sea Turtle',
        scientificName: 'Chelonia mydas',
        depthRange: '0 – 110 m',
        depthMin: 0,
        depthMax: 110,
        zoneId: 'epipelagic',
        length: '1.2 m (3.9 ft)',
        diet: 'Seagrasses, marine algae, and jellyfish',
        bioluminescence: false,
        pressureTolerance: 'Moderate (compresses lungs to dive up to 5 hours)',
        summary: 'Ancient marine reptiles that navigate global currents using geomagnetic sensing, grazing extensively on seagrass beds.',
        adaptations: [
          'Lacrymal salt glands that excrete concentrated excess brine from seawater drinking',
          'Hydrodynamic streamlined carapace engineered for low drag during migration',
          'Myoglobin-enriched muscular system enabling prolonged oxygen storage'
        ],
        funFact: 'Their diet of seagrass and algae turns their internal body fat green, giving them their common name.',
        svgIcon: 'turtle'
      },
      {
        id: 'bottlenose-dolphin',
        name: 'Bottlenose Dolphin',
        scientificName: 'Tursiops truncatus',
        depthRange: '0 – 200 m',
        depthMin: 0,
        depthMax: 200,
        zoneId: 'epipelagic',
        length: '2.5 – 3.8 m',
        diet: 'Squid, schooling fish, crustaceans',
        bioluminescence: false,
        pressureTolerance: 'High mammalian elasticity; thoracic cage collapses smoothly under pressure',
        summary: 'Highly intelligent cetaceans utilizing high-frequency biosonar echolocation to map their aquatic topography.',
        adaptations: [
          'Melon organ in forehead focusing click trains for acoustic imaging',
          'Countershading coloration (dark dorsum, light belly) for vertical camouflage',
          'Voluntary conscious breathing cycle with rapid respiratory exchange rate'
        ],
        funFact: 'Dolphins sleep by shutting down one brain hemisphere at a time while keeping the opposite eye open to surface and breathe.',
        svgIcon: 'whale'
      }
    ]
  },
  {
    id: 'mesopelagic',
    name: 'Mesopelagic Zone',
    latinName: 'Twilight Zone',
    depthStart: 200,
    depthEnd: 1000,
    depthRangeLabel: '200 m – 1,000 m',
    ambientLight: '1% – 0.001% (Faint Indigo Twilight)',
    temperatureRange: '4°C – 20°C (39°F – 68°F)',
    pressureRange: '21 – 101 atm (308 – 1,484 psi)',
    bgGradient: 'from-blue-900 via-indigo-950 to-slate-950',
    ambientColor: '#6366f1',
    accentColor: '#818cf8',
    overview: 'A vast twilight realm where daylight rapidly dims to near total obscurity. With zero plant growth, life here depends on nutrients falling from above. This zone is the setting of the Diel Vertical Migration—the largest animal migration on Earth, taking place every single night.',
    scientificSignificance: 'Home to the Deep Scattering Layer, an acoustic boundary of billions of fish and krill detected by naval sonar that ascend nightly to feed on the surface and descend at sunrise to hide in darkness.',
    landmarks: [
      { depth: 332, title: 'World Record Scuba Descent', description: 'Ahmed Gabr dove to 332.35m in Dahab, requiring 12 minutes to descend and 15 hours of decompression.', type: 'human' },
      { depth: 500, title: 'Deepest Blue Whale Foraging Dive', description: 'Maximum documented dive depth recorded for the planet’s largest mammal.', type: 'fauna' },
      { depth: 1000, title: 'Permanent Total Darkness', description: 'Solar photons are completely extinguished; all subsequent natural illumination is bioluminescent.', type: 'geological' }
    ],
    creatures: [
      {
        id: 'bioluminescent-jelly',
        name: 'Crystal Crown Jelly',
        scientificName: 'Atolla wyvillei',
        depthRange: '500 – 1,000 m',
        depthMin: 500,
        depthMax: 1000,
        zoneId: 'mesopelagic',
        length: '20 cm bell diameter',
        diet: 'Small pelagic crustaceans, copepods, marine snow',
        bioluminescence: true,
        bioluminescenceDetail: 'Bioluminescent burglar alarm: emits rapid pinwheel flashes of electric blue light (470nm) when attacked by predators to attract a larger predator to eat its attacker.',
        glowColor: '#38bdf8',
        pressureTolerance: 'Exceptional; gelatinous water-dense body maintains internal hydrostatic equilibrium',
        summary: 'A deep-sea scyphozoan jellyfish featuring deep scarlet coloration that appears completely invisible in the blue wavelengths of twilight.',
        adaptations: [
          'High concentration of coelenterazine luciferase generating blue flash bursts',
          'One hyper-elongated trailing tentacle specialized in snaring larger deep prey',
          'Ruby red body pigment absorbing all blue wavelengths, rendering it pitch black to predators'
        ],
        funFact: 'Scientists created an optical decoy mimicking the Atolla’s flashing burglar alarm, which successfully lured a giant squid to cameras for the first time.',
        svgIcon: 'jelly',
        imageOverride: '/src/assets/images/mesopelagic_twilight_jelly_1791553619592.jpg'
      },
      {
        id: 'barreleye-fish',
        name: 'Barreleye Fish',
        scientificName: 'Macropinna microstoma',
        depthRange: '600 – 800 m',
        depthMin: 600,
        depthMax: 800,
        zoneId: 'mesopelagic',
        length: '15 cm (6 in)',
        diet: 'Siphonophores and gelatinous zooplankton',
        bioluminescence: false,
        pressureTolerance: 'Highly adapted osmotic pressure regulation in unpressurized fluid chamber',
        summary: 'Equipped with a completely transparent, fluid-filled dome on its head through which its glowing green tubular eyes rotate.',
        adaptations: [
          'Ultra-sensitive tubular eyes capable of rotating 90° from vertical to forward facing',
          'Transparent head dome shielding eyes from siphonophore stinging nematocysts',
          'Green ocular filters that selectively eliminate downwelling sunlight to detect prey bioluminescence'
        ],
        funFact: 'The two indentations on the front of its face that resemble eyes are actually nares (olfactory organs); its true eyes are the bright green globes inside its transparent head.',
        svgIcon: 'angler'
      },
      {
        id: 'vampire-squid',
        name: 'Vampire Squid',
        scientificName: 'Vampyroteuthis infernalis',
        depthRange: '600 – 900 m',
        depthMin: 600,
        depthMax: 900,
        zoneId: 'mesopelagic',
        length: '30 cm (12 in)',
        diet: 'Marine snow, zooplankton faecal pellets, detritus',
        bioluminescence: true,
        bioluminescenceDetail: 'Tips of arms and body possess photophores capable of releasing glowing bioluminescent mucous clouds instead of ink.',
        glowColor: '#60a5fa',
        pressureTolerance: 'Extreme metabolic reduction; functions at the lowest oxygen levels in the ocean',
        summary: 'A living fossil neither true squid nor octopus, cloaked in a dark webbing like a cape that turns inside out into a defensive spiky posture.',
        adaptations: [
          'Hemocyanin blood with highest known oxygen binding affinity among cephalopods',
          'Retractable sensory velar filaments coated in mucus to capture falling marine snow',
          'Bioluminescent cloud ejection that dazzles attackers in ink-free pitch black water'
        ],
        funFact: 'Its scientific name translates to "Vampire squid from Hell", yet it is entirely non-predatory, gently consuming drifting organic ocean dust.',
        svgIcon: 'squid'
      }
    ]
  },
  {
    id: 'bathypelagic',
    name: 'Bathypelagic Zone',
    latinName: 'Midnight Zone',
    depthStart: 1000,
    depthEnd: 4000,
    depthRangeLabel: '1,000 m – 4,000 m',
    ambientLight: '0% (Total Absolute Darkness)',
    temperatureRange: '1°C – 4°C (34°F – 39°F)',
    pressureRange: '101 – 401 atm (1,484 – 5,894 psi)',
    bgGradient: 'from-slate-950 via-[#030712] to-black',
    ambientColor: '#3b82f6',
    accentColor: '#60a5fa',
    overview: 'The midnight realm of perpetual darkness. The only light here is produced by living organisms. Crushing hydrostatic pressures exceed 400 atmospheres, and the water is near freezing. Creatures have evolved bizarre adaptations like enormous unhingable jaws, glowing lures, and flabby, buoyant musculature.',
    scientificSignificance: 'The continuous descent of "marine snow"—a blizzard of organic flakes, dead plankton, and fecal debris from above—fuels this entire ecosystem, functioning as the planet’s greatest biological carbon sequestration pump.',
    landmarks: [
      { depth: 2200, title: 'Sperm Whale Maximum Combat Dive', description: 'Documented hunting depth of sperm whales battling colossal squid.', type: 'fauna' },
      { depth: 3810, title: 'RMS Titanic Resting Depth', description: 'The historic transatlantic liner lies in two pieces on the North Atlantic seafloor.', type: 'human' },
      { depth: 4000, title: 'Abyssal Plain Boundary', description: 'Transition into the vast, sediment-covered ocean plains spanning over 50% of Earth’s surface.', type: 'geological' }
    ],
    creatures: [
      {
        id: 'humpback-anglerfish',
        name: 'Humpback Anglerfish',
        scientificName: 'Melanocetus johnsonii',
        depthRange: '1,000 – 4,000 m',
        depthMin: 1000,
        depthMax: 4000,
        zoneId: 'bathypelagic',
        length: 'Female: 18 cm | Male: 3 cm',
        diet: 'Deep sea fish, crustacea, cephalopods',
        bioluminescence: true,
        bioluminescenceDetail: 'Symbiotic Photobacterium bioluminescent bacteria cultivate inside the esca (lure) bulb hanging from its dorsal ilicium.',
        glowColor: '#34d399',
        pressureTolerance: '400+ atm; cartilage skeleton, water-heavy tissues, lacking gas swim bladder',
        summary: 'Iconic deep-sea predator with immense translucent teeth, an expandable stomach, and a glowing bio-rod bait suspended over its mouth.',
        adaptations: [
          'Symbiotic bacterial pouch nourished with sugar nutrients by the anglerfish vascular system',
          'Elastic stomach expanding up to twice its normal volume to swallow meals larger than itself',
          'Extreme sexual dimorphism: miniature males lack lures and exist solely to locate females by scent'
        ],
        funFact: 'Because finding food is so rare in the midnight zone, anglerfish cannot afford to let anything escape; inward-curving teeth lock prey inside upon contact.',
        svgIcon: 'angler'
      },
      {
        id: 'gulper-eel',
        name: 'Pelican Gulper Eel',
        scientificName: 'Eurypharynx pelecanoides',
        depthRange: '1,500 – 3,000 m',
        depthMin: 1500,
        depthMax: 3000,
        zoneId: 'bathypelagic',
        length: '0.75 – 1.0 m (3.3 ft)',
        diet: 'Cephalopods, shrimp, small fish',
        bioluminescence: true,
        bioluminescenceDetail: 'Bioluminescent luminous organ located at the very tip of its whip-like tail that flashes pink and red.',
        glowColor: '#f43f5e',
        pressureTolerance: 'Minimal mineralization of bones; gelatinous muscle tissue resist compression',
        summary: 'Possesses the largest mouth-to-body ratio of any vertebrate on Earth, featuring loosely hinged jaws capable of unfurling like a parachute.',
        adaptations: [
          'Unhinged quadrate bone permitting jaw opening wide enough to envelop much larger organisms',
          'Extremely rudimentary skeletal system with tiny teeth and no ribs or scales to conserve energy',
          'Caudal bioluminescent lure waved enticingly while the mouth lies dormant in wait'
        ],
        funFact: 'When hunting, the gulper eel inflates its mouth with water like a giant balloon to scoop up schools of crustaceans in a single gulp.',
        svgIcon: 'eel'
      },
      {
        id: 'giant-isopod',
        name: 'Giant Isopod',
        scientificName: 'Bathynomus giganteus',
        depthRange: '1,000 – 2,140 m',
        depthMin: 1000,
        depthMax: 2140,
        zoneId: 'bathypelagic',
        length: '30 – 50 cm (12 – 20 in)',
        diet: 'Whale falls, dead fish carcasses, benthic detritus',
        bioluminescence: false,
        pressureTolerance: 'Thick, flexible calcified exoskeleton fortified with protein matrix',
        summary: 'A monumental deep-sea cousin of terrestrial pill bugs displaying deep-sea gigantism, scavenging upon fallen biomass.',
        adaptations: [
          'Deep-sea gigantism: significantly larger cell size and slower metabolic rate in cold water',
          'Pleopods adapted as specialized respiratory structures (gills) that pump efficiently in cold brine',
          'Capable of surviving over 5 years between meals in extreme cold environments'
        ],
        funFact: 'A captive giant isopod in Toba Aquarium, Japan, survived for 5 years and 43 days without consuming any food whatsoever.',
        svgIcon: 'isopod'
      }
    ]
  },
  {
    id: 'abyssopelagic',
    name: 'Abyssopelagic Zone',
    latinName: 'The Abyss',
    depthStart: 4000,
    depthEnd: 6000,
    depthRangeLabel: '4,000 m – 6,000 m',
    ambientLight: '0% (Pitch Black Void)',
    temperatureRange: '1°C – 2°C (33°F – 35°F)',
    pressureRange: '401 – 601 atm (5,894 – 8,834 psi)',
    bgGradient: 'from-black via-[#010309] to-[#050711]',
    ambientColor: '#2563eb',
    accentColor: '#3b82f6',
    overview: 'Derived from the Greek word "abyssos", meaning bottomless. The Abyssal zone encompasses 83% of the world’s ocean floor. In this immense, desolate desert of marine sediment, temperatures hover just above freezing, and hydrostatic pressure reaches 600 times atmospheric pressure.',
    scientificSignificance: 'Covered in millions of square kilometers of soft abyssal clay and biogenic ooze, punctuated by abyssal hills and polymetallic manganese nodules that take millions of years to precipitate.',
    landmarks: [
      { depth: 4000, title: 'Carbonate Compensation Depth (CCD)', description: 'Depth below which calcium carbonate shells dissolve faster than they can accumulate.', type: 'geological' },
      { depth: 5000, title: 'Abyssal Manganese Nodule Fields', description: 'Vast plains carpeted with mineral concretions rich in nickel, cobalt, and rare earth elements.', type: 'geological' },
      { depth: 6000, title: 'Subduction Trench Ingress', description: 'The boundary where oceanic tectonic plates plunge beneath continental plates into the Hadal realm.', type: 'geological' }
    ],
    creatures: [
      {
        id: 'tripod-fish',
        name: 'Tripod Fish',
        scientificName: 'Bathypterois grallator',
        depthRange: '4,000 – 5,600 m',
        depthMin: 4000,
        depthMax: 5600,
        zoneId: 'abyssopelagic',
        length: '35 cm (excluding 1m ray fins)',
        diet: 'Copepods, benthic decapods, mysids',
        bioluminescence: false,
        pressureTolerance: 'Stabilized cellular membranes packed with polyunsaturated fatty acids',
        summary: 'Equipped with elongated pelvic and caudal fin rays measuring over 1 meter, allowing it to perch motionless atop soft abyssal ooze facing into the current.',
        adaptations: [
          'Hyper-elongated fin rays that act as stilts, elevating the body above the low-oxygen benthic boundary',
          'Enlarged pectoral fins acting as tactile antennae to sense vibrations of incoming prey',
          'Simultaneous hermaphroditism: produces both eggs and sperm to ensure reproduction in sparse populations'
        ],
        funFact: 'It stands entirely motionless facing the ocean current like a three-legged tripod, waiting for food to drift directly into its open mouth.',
        svgIcon: 'tripod'
      },
      {
        id: 'dumbo-octopus',
        name: 'Grimpoteuthis (Dumbo Octopus)',
        scientificName: 'Grimpoteuthis bathynectes',
        depthRange: '3,000 – 7,000 m',
        depthMin: 3000,
        depthMax: 7000,
        zoneId: 'abyssopelagic',
        length: '20 – 30 cm (largest recorded 1.8 m)',
        diet: 'Polychaetes, bivalves, isopods, amphipods',
        bioluminescence: false,
        pressureTolerance: 'Lacks rigid shell or internal skeleton; buoyant gelatinous umbrella mantle',
        summary: 'The deepest known octopuses in the world, swimming gracefully by flapping ear-like fins resembling the Disney character Dumbo.',
        adaptations: [
          'Webbed arms forming an umbrella-like mantle used to crawl across sediment and trap prey',
          'Loss of the traditional cephalopod ink sac, which is useless in absolute pitch blackness',
          'Swallows benthic prey whole without chewing using its simplified radula'
        ],
        funFact: 'Dumbo octopuses can survive down to 7,000 meters, making them the deepest living octopuses discovered by science.',
        svgIcon: 'dumbo'
      }
    ]
  },
  {
    id: 'hadal',
    name: 'Hadal Zone',
    latinName: 'Trenches of the Underworld',
    depthStart: 6000,
    depthEnd: 11034,
    depthRangeLabel: '6,000 m – 11,034 m',
    ambientLight: '0% (V-Shaped Tectonic Abyss)',
    temperatureRange: '1°C – 4°C (Hydrothermal vents up to 400°C)',
    pressureRange: '601 – 1,086+ atm (8,834 – 16,000 psi)',
    bgGradient: 'from-black via-[#090209] to-[#020d18]',
    ambientColor: '#06b6d4',
    accentColor: '#22d3ee',
    overview: 'Named after Hades, the Greek underworld. The Hadal zone is composed exclusively of steep, V-shaped tectonic subduction trenches that plunge into Earth’s mantle. At the Mariana Trench Challenger Deep (10,935m), the hydrostatic pressure exceeds 1,000 atmospheres—equivalent to the weight of 50 jumbo jets stacked on an individual.',
    scientificSignificance: 'Far from barren, hadal trenches act as funneling nutrient traps. Hydrothermal black smokers spew mineral-rich fluids exceeding 400°C, sustaining ecosystems through chemosynthesis without any sunlight.',
    landmarks: [
      { depth: 8178, title: 'Theoretical Fish Depth Limit', description: 'Biochemical boundary: TMAO cellular piezolyte concentrations reach max osmotic capacity (approx 8,200m).', type: 'geological' },
      { depth: 10000, title: 'Mariana Trench Floor Ingress', description: 'The deepest tectonic subduction zone on planet Earth.', type: 'geological' },
      { depth: 10935, title: 'Challenger Deep (Highest Recorded Depth)', description: 'Deepest point on Earth, explored by Jacques Piccard & Don Walsh (1960) and James Cameron (2012).', type: 'human' }
    ],
    creatures: [
      {
        id: 'mariana-snailfish',
        name: 'Mariana Snailfish',
        scientificName: 'Pseudoliparis swirei',
        depthRange: '6,000 – 8,178 m',
        depthMin: 6000,
        depthMax: 8178,
        zoneId: 'hadal',
        length: '28 cm (11 in)',
        diet: 'Hadal amphipods (Hirondellea gigas)',
        bioluminescence: false,
        pressureTolerance: '1,000+ atm; highest recorded cellular TMAO piezolyte concentration in vertebrates',
        summary: 'The reigning champion of deepest living fish on Earth. A delicate, translucent pink apex predator of the hadal trenches.',
        adaptations: [
          'High cellular concentrations of Trimethylamine N-oxide (TMAO) preventing protein collapse at 800+ atm',
          'Non-calcified, cartilage-soft skull and skeleton with unfused cranial sutures to withstand crushing pressures',
          'Transparent scale-less skin and hyper-sensitive lateral line system to hunt in perpetual darkness'
        ],
        funFact: 'If brought rapidly to the surface, the lack of intense hydrostatic pressure causes its cell membranes to dissolve and its body to melt.',
        svgIcon: 'snailfish'
      },
      {
        id: 'giant-tubeworm',
        name: 'Giant Hydrothermal Tubeworm',
        scientificName: 'Riftia pachyptila',
        depthRange: '2,000 – 8,000 m (Hydrothermal Vents)',
        depthMin: 2000,
        depthMax: 8000,
        zoneId: 'hadal',
        length: 'Up to 2.4 m (8 ft)',
        diet: 'Chemosynthetic symbiotic sulfur-oxidizing bacteria',
        bioluminescence: false,
        pressureTolerance: 'Extreme; thrives directly adjacent to 400°C scalding hydrothermal mineral plumes',
        summary: 'Fastest-growing marine invertebrates on the planet, growing encased inside rigid white chitin tubes around boiling black smoker vents.',
        adaptations: [
          'Complete absence of mouth, digestive tract, or gut: entirely nourished by internal trophosome bacteria',
          'Specialized unique hemoglobin binding both toxic hydrogen sulfide and oxygen simultaneously',
          'Chitin-protein outer cylindrical tube providing physical shielding and thermal insulation'
        ],
        funFact: 'They can grow over 85 cm per year, creating colossal underwater forests around superheated volcanic fissures.',
        svgIcon: 'tubeworm',
        imageOverride: '/src/assets/images/hadal_hydrothermal_vent_1791553631667.jpg'
      },
      {
        id: 'supergiant-amphipod',
        name: 'Supergiant Amphipod',
        scientificName: 'Alicella gigantea',
        depthRange: '5,000 – 10,900 m',
        depthMin: 5000,
        depthMax: 10900,
        zoneId: 'hadal',
        length: '34 cm (vs normal 3 mm shallow relatives)',
        diet: 'Carrion, organic silt, wood falls',
        bioluminescence: false,
        pressureTolerance: 'Aluminum hydroxide armor synthesized from hadal sediments to prevent shell crushing',
        summary: 'A colossal crustacean displaying extreme hadal gigantism, over 100 times larger than its shallow water cousins.',
        adaptations: [
          'Bio-synthetic concentration of aluminum into chitin carapaces to reinforce against 1,000 atm pressure',
          'Cellular enzymes with low activation volumes that function seamlessly under extreme compression',
          'Chemosensory antennae detecting carrion scent miles away along steep trench currents'
        ],
        funFact: 'While surface amphipods are the size of a flea, this deep trench giant is the size of an adult human forearm.',
        svgIcon: 'isopod'
      }
    ]
  },
  {
    id: 'subseafloor',
    name: 'The Sub-Seafloor Biosphere',
    latinName: 'Deep Lithospheric Biosphere',
    depthStart: 11034,
    depthEnd: 15000,
    depthRangeLabel: '11,000 m+ (Crust & Lithosphere)',
    ambientLight: '0% (Solid Basalt & Sediment)',
    temperatureRange: '60°C – 122°C (Geothermal Heat)',
    pressureRange: '1,200 – 2,500+ atm',
    bgGradient: 'from-[#020d18] via-[#1a0505] to-[#120000]',
    ambientColor: '#f97316',
    accentColor: '#fb923c',
    overview: 'Beneath the ocean floor lies one of the planet’s largest yet least understood biomes: the deep sub-seafloor biosphere. Living miles deep within sediment layers, basaltic fractures, and hydrothermal crust, single-celled organisms thrive without light, oxygen, or organic matter.',
    scientificSignificance: 'Discovered through scientific ocean drilling (IODP), this realm accounts for up to one-third of Earth’s total microbial biomass. Organisms here survive on radioactive radiolysis of water and serpentinization, with metabolic turnover times spanning thousands of years.',
    landmarks: [
      { depth: 11500, title: 'Sediment-Basalt Interface', description: 'Transition from pelagic clay sediment into igneous oceanic basalt crust.', type: 'geological' },
      { depth: 12500, title: 'Serpentinization Reaction Zone', description: 'Mantle peridotite reacts with seawater, releasing hydrogen and methane gas.', type: 'geological' },
      { depth: 14000, title: 'Upper Temperature Boundary of Life', description: '122°C record limit where hyperthermophilic archaea sustain protein integrity.', type: 'geological' }
    ],
    creatures: [
      {
        id: 'piezophilic-archaea',
        name: 'Endolithic Methanotrophic Archaea',
        scientificName: 'Methanocaldococcus villosus',
        depthRange: 'Sub-seafloor Basalt (11,000m – 14,000m+)',
        depthMin: 11000,
        depthMax: 14000,
        zoneId: 'subseafloor',
        length: '1 – 2 micrometers (μm)',
        diet: 'Geothermal hydrogen gas and carbon dioxide',
        bioluminescence: false,
        pressureTolerance: 'Unprecedented: lipid monolayer membranes stabilized by ether bonds resisting 1,500+ atm',
        summary: 'Microscopic single-celled extremophiles inhabiting micro-fissures in solid basalt crust, metabolizing rocks and geothermal gases.',
        adaptations: [
          'Tetraether lipid monolayer cell membrane that prevents membrane liquidization at 100°C+ heat',
          'DNA reverse gyrase enzyme preventing thermal denaturation and double-strand chromosome breaks',
          'Ultra-slow metabolic rate: cell division can take anywhere from decades to thousands of years'
        ],
        funFact: 'These deep lithospheric microbes are so ancient and slow-living that some individuals in core samples were alive during the last Ice Age without dividing once.',
        svgIcon: 'microbe'
      }
    ]
  }
];

export interface DeepSeaFact {
  title: string;
  depth: string;
  fact: string;
}

export const DEEP_SEA_FACTS: DeepSeaFact[] = [
  {
    title: 'More Humans on the Moon than the Deep Trenches',
    depth: '11,000 m',
    fact: 'Twelve astronauts have walked on the Moon, but until recent years, only three people had ever reached the bottom of Challenger Deep.'
  },
  {
    title: 'The Great Bioluminescence Spectrum',
    depth: '200 – 1,000 m',
    fact: 'Over 90% of all organisms in the twilight and midnight zones produce their own living light, mostly in blue-green wavelengths (470nm) which travel furthest in clear water.'
  },
  {
    title: 'Whale Falls: An Instant Abyssal Feast',
    depth: '3,000 m',
    fact: 'When a 50-ton whale dies, its carcass sinks to the abyssal plain. This creates a "whale fall" that sustains specialized deep-sea scavengers, bone-eating Osedax worms, and microbes for up to 100 years.'
  },
  {
    title: 'The World’s Tallest Mountain is Underwater',
    depth: 'Pacific Ocean',
    fact: 'From its base on the Pacific seafloor to its peak, Mauna Kea measures over 10,210 meters (33,500 ft)—significantly taller than Mount Everest.'
  }
];
