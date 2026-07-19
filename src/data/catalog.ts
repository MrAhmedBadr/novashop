import type { Category, Product, Review, Coupon, FlashSale } from "@/types";
import { slugify } from "@/lib/utils";

/**
 * Deterministic mock catalog. Every product points at a hand-picked Unsplash
 * photo of the actual product type — no random placeholders. Swap
 * `productService` to Firebase later without touching the UI.
 */

/** Unsplash photo id -> square, cropped, auto-formatted delivery URL. */
const img = (id: string, size = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${size}&h=${size}&q=80`;

/**
 * Photo ids grouped by category. The first seven of each group map 1:1 to the
 * seven products in that category (order matches `productSeeds` below); the
 * gallery on the product page cycles through the rest of the group.
 */
const photos = {
  c1: [
    "1505740420928-5e560c06d30e", // over-ear headphones
    "1590658268037-6bf12165a8df", // true-wireless earbuds
    "1545454675-3531b543be5d", // bookshelf speaker
    "1598488035139-bdbb2231ce04", // studio control room
    "1608043152269-423dbba4e7e1", // portable bluetooth speaker
    "1606220945770-b5b6c2c55bf1", // sport earbuds
    "1558584673-c834fb1cc3ca", // turntable + hi-fi amplifier
    "1520170350707-b2da59970118", // premium headphones
    "1613040809024-b4ef7ba99bc3", // headphones, studio lighting
  ],
  c2: [
    "1546868871-7041f2a55e12", // smartwatch, product shot
    "1576243345690-4e4b79b63288", // fitness band
    "1524592094714-0f0654e20314", // analog hybrid watch
    "1508057198894-247b23fe5ade", // watch on nato strap
    "1605100804763-247f67b3557e", // ring
    "1434493789847-2f02dc6ca35d", // smartwatch on wrist
    "1523275335684-37898b6baf30", // round sport watch
  ],
  c3: [
    "1496181133206-80ce9b88a853", // ultrabook
    "1625948515291-69613efd103f", // mechanical keyboard
    "1527864550417-7fd91fc51a46", // wireless mouse
    "1593640408182-31c70c8268f5", // desktop monitor setup
    "1618410320928-25228d811631", // laptop + dock on desk
    "1517336714731-489689fd1ca8", // 16" laptop
    "1595044426077-d36d9236d54a", // TKL keyboard, exposed switches
    "1587829741301-dc798b83add3", // low-profile keyboard
  ],
  c4: [
    "1516724562728-afc824a36e84", // mirrorless body
    "1617005082133-548c4dd27f35", // prime lens
    "1502920917128-1aa500764cbd", // compact camera
    "1512790182412-b19e6d62bc39", // cine lens / rig
    "1500634245200-e5245c7574ef", // SLR with zoom lens
    "1495707902641-75cac588d2e9", // camera body on table
    "1473968512647-3e447244af8f", // quadcopter drone
  ],
  c5: [
    "1606813907291-d86efa9b94db", // current-gen console
    "1592840496694-26d035b52b48", // controller
    "1592478411213-6153e4ebc07d", // VR headset in use
    "1599669454699-248893623440", // gaming headset
    "1618384887929-16ec33fab9ef", // mechanical gaming keyboard
    "1615663245857-ac93bb7c39e7", // gaming mouse
    "1449965408869-eaa3f722e40d", // driving position / wheel
    "1587202372775-e229f172b9d7", // RGB rig
    "1542751371-adc38448a05e", // esports setup
  ],
  c6: [
    "1545259741-2ea3ebf61fa3", // smart thermostat
    "1507473885765-e6ed057f782c", // lamp / smart lighting
    "1558002038-1055907df827", // smart door device + app
    "1524634126442-357e0eac3c14", // bright, clean living room
    "1558317374-067fb5f30001", // robot vacuum
    "1543512214-318c7553f230", // smart speaker
    "1521302080334-4bebac2763a6", // espresso
  ],
  c7: [
    "1511707171634-5f897ff02aa9", // flagship phone
    "1592286927505-1def25115558", // colourful phone
    "1601593346740-925612772716", // phone case in hand
    "1583863788434-e58a36330cf0", // charging adapter
    "1609091839311-d5365f9ff1c5", // device in hand, backlit
    "1610945265064-0e34e5519bbf", // phone pair, product shot
    "1580910051074-3eb694886505", // phone on a flat surface
  ],
  c8: [
    "1622560480605-d83c853bc5c3", // leather backpack
    "1511499767150-a48a237f0083", // sunglasses
    "1602143407151-7111542de6e8", // insulated bottle
    "1553062407-98eeb64c6a62", // weekender bag
    "1627123424574-724758594e93", // leather wallet
    "1547949003-9792a18a2601", // travel bag
    "1581553680321-4fffae59fccd", // luggage set
  ],
} as const;

export const categories: Category[] = [
  { id: "c1", name: "Audio", slug: "audio", description: "Reference-tuned headphones, earbuds and speakers engineered for pure, room-filling sound.", image: img(photos.c1[0], 1200), productCount: 0, featured: true },
  { id: "c2", name: "Wearables", slug: "wearables", description: "Smartwatches, rings and bands that track every heartbeat and keep pace with your day.", image: img(photos.c2[0], 1200), productCount: 0, featured: true },
  { id: "c3", name: "Computing", slug: "computing", description: "Featherweight laptops, tactile keyboards and pro accessories built to move fast.", image: img(photos.c3[0], 1200), productCount: 0, featured: true },
  { id: "c4", name: "Photography", slug: "photography", description: "Mirrorless bodies, fast glass and stabilizers for every frame worth keeping.", image: img(photos.c4[0], 1200), productCount: 0, featured: true },
  { id: "c5", name: "Gaming", slug: "gaming", description: "Next-gen consoles, low-latency controllers and immersive gear that disappears in your hands.", image: img(photos.c5[0], 1200), productCount: 0 },
  { id: "c6", name: "Home", slug: "home", description: "Smart-home essentials that make everyday spaces calmer, safer and effortlessly connected.", image: img(photos.c6[0], 1200), productCount: 0 },
  { id: "c7", name: "Mobile", slug: "mobile", description: "Flagship phones and the fast-charging, drop-proof accessories that go everywhere with them.", image: img(photos.c7[0], 1200), productCount: 0 },
  { id: "c8", name: "Lifestyle", slug: "lifestyle", description: "Everyday carry in full-grain leather and recycled fabrics, finished to a premium standard.", image: img(photos.c8[0], 1200), productCount: 0 },
];

const colorPalette = [
  { name: "Midnight", value: "#0f172a" },
  { name: "Graphite", value: "#334155" },
  { name: "Silver", value: "#cbd5e1" },
  { name: "Sand", value: "#e7dcc8" },
  { name: "Ocean", value: "#0ea5e9" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Forest", value: "#166534" },
];

interface ProductSeed {
  name: string;
  cat: string;
  brand: string;
  price: number;
  compare?: number;
  tags: string[];
  description: string;
  highlights: [string, string, string, string];
  stock: number;
  sizes?: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
}

const productSeeds: ProductSeed[] = [
  // ---------------------------------------------------------------- Audio (c1)
  {
    name: "Aurora Wireless Headphones", cat: "c1", brand: "Nova", price: 299, compare: 349,
    tags: ["wireless", "noise-cancelling", "over-ear"],
    description: "Adaptive noise cancellation reads the room 200 times a second, so the commute, the office and the flight all fall silent. Plush memory-foam cups and a 40-hour battery mean you can wear them from takeoff to touchdown without a second thought.",
    highlights: ["Adaptive hybrid ANC with transparency mode", "40-hour battery, 5-hour charge in 10 minutes", "Custom 40mm drivers tuned for flat, honest sound", "Multipoint Bluetooth 5.3 pairs to two devices"],
    stock: 42, featured: true, bestSeller: true,
  },
  {
    name: "Pulse Pro Earbuds", cat: "c1", brand: "Aeris", price: 179, compare: 219,
    tags: ["earbuds", "anc", "wireless"],
    description: "Tiny in the ear, huge on detail — dual drivers separate bass and treble for studio clarity in a bud that weighs less than a coin. Six microphones strip out wind and chatter so every call sounds like you're in a quiet room.",
    highlights: ["Dual-driver acoustics with dedicated bass driver", "8h per charge, 32h with the case", "IPX5 sweat and rain resistance", "Wireless charging case with USB-C"],
    stock: 7, bestSeller: true,
  },
  {
    name: "Resonance Bookshelf Speaker", cat: "c1", brand: "Halcyon", price: 449,
    tags: ["speaker", "hi-fi", "home-audio"],
    description: "A real hi-fi pair for a real room, with a woven-fibre woofer and silk-dome tweeter voiced for warmth without mud. The furniture-grade walnut cabinet is braced to stay silent so only the music moves.",
    highlights: ["5.25\" woven woofer + 1\" silk tweeter", "Bi-wire binding posts for pro setups", "Hand-finished walnut cabinet", "Sold as a matched stereo pair"],
    stock: 23, featured: true,
  },
  {
    name: "Echo Studio Monitor", cat: "c1", brand: "Monolith", price: 529, compare: 599,
    tags: ["studio", "monitor", "reference"],
    description: "A near-field reference monitor that tells you the truth — flat response and a wide sweet spot make mix decisions translate everywhere. Rear-firing bass ports and a room-tuning dial adapt it to any studio corner.",
    highlights: ["Flat, uncoloured reference response", "Room-correction EQ dial on the rear", "Class-D amp with 120W of clean headroom", "Kevlar cone for pistonic, distortion-free bass"],
    stock: 14,
  },
  {
    name: "Nimbus Portable Speaker", cat: "c1", brand: "Orbit", price: 129,
    tags: ["portable", "bluetooth", "waterproof"],
    description: "Grab-and-go sound that shrugs off the pool, the picnic and the beach thanks to a full IP67 seal. Pair two for true stereo, and count on 24 hours of playback from a single charge.",
    highlights: ["IP67 fully waterproof and dustproof", "24-hour battery life", "Stereo pairing for two speakers", "Built-in strap and USB-C power out"],
    stock: 58, bestSeller: true,
  },
  {
    name: "Cadence Open-Ear Sport Earbuds", cat: "c1", brand: "Aeris", price: 159, compare: 189,
    tags: ["open-ear", "sport", "earbuds"],
    description: "An open-ear design keeps you aware of traffic and teammates while directional drivers pipe your music straight to the ear canal. Featherlight hooks stay put through the hardest intervals without pressure or fatigue.",
    highlights: ["Open-ear design keeps you aware of surroundings", "Secure air-hook fit for running and cycling", "IP57 sweat and dust resistance", "10-hour battery, quick-charge ready"],
    stock: 31, isNew: true,
  },
  {
    name: "Sonata Hi-Fi DAC Amplifier", cat: "c1", brand: "Halcyon", price: 379,
    tags: ["dac", "amplifier", "hi-fi"],
    description: "A desktop DAC and headphone amp that drives everything from sensitive IEMs to demanding planar cans without breaking a sweat. A precision ladder DAC and low-noise output stage reveal detail you didn't know your files held.",
    highlights: ["Hi-res decoding up to 32-bit / 768kHz", "Balanced and single-ended outputs", "Three-level gain for IEMs to planars", "Machined aluminium chassis with volume wheel"],
    stock: 0, isNew: true,
  },

  // ------------------------------------------------------------ Wearables (c2)
  {
    name: "Chronos Smartwatch Series 7", cat: "c2", brand: "Nova", price: 399, compare: 449,
    tags: ["smartwatch", "gps", "health"], sizes: true,
    description: "A titanium-cased flagship that tracks your heart, sleep and stress on a display bright enough to read in full sun. Dual-band GPS locks on fast and the battery keeps going for two full days between charges.",
    highlights: ["Always-on LTPO display up to 2000 nits", "Dual-band GPS and offline maps", "ECG, SpO2 and skin-temperature sensors", "Aerospace titanium case, sapphire crystal"],
    stock: 36, featured: true, bestSeller: true,
  },
  {
    name: "Vitals Fitness Band", cat: "c2", brand: "Vantage", price: 129,
    tags: ["fitness", "tracker", "health"], sizes: true,
    description: "A slim band that quietly logs every step, heartbeat and sleep cycle for a week and a half on one charge. Automatic workout detection and a bright AMOLED strip keep your goals in view without weighing down your wrist.",
    highlights: ["10-day battery life", "Automatic workout and sleep detection", "5 ATM water resistance for swimming", "Slim AMOLED touch display"],
    stock: 64, bestSeller: true,
  },
  {
    name: "Meridian Hybrid Watch", cat: "c2", brand: "Kestrel", price: 259,
    tags: ["hybrid", "analog", "smartwatch"], sizes: true,
    description: "Classic mechanical hands over a hidden e-ink dial give you smart notifications without a screen glowing on your wrist. The result is a handsome analog watch that still counts your steps and lasts two weeks per charge.",
    highlights: ["Real analog hands with hidden smart display", "Two-week battery life", "Discreet vibration alerts and step tracking", "Sapphire-coated dial, 316L steel case"],
    stock: 19,
  },
  {
    name: "Solstice Solar Watch", cat: "c2", brand: "Kestrel", price: 349, compare: 429,
    tags: ["solar", "outdoor", "gps"], sizes: true,
    description: "Built for the backcountry, it tops up from daylight so the battery can stretch for weeks between wall charges. Topographic maps, a barometric altimeter and a rugged fibre-reinforced case make it a trail companion you can trust.",
    highlights: ["Solar charging extends battery for weeks", "Topo maps with barometric altimeter", "Military-grade shock and thermal rating", "Multi-band GNSS for canyon-proof tracking"],
    stock: 5, featured: true,
  },
  {
    name: "Pulse Ring Tracker", cat: "c2", brand: "Vantage", price: 279,
    tags: ["ring", "sleep", "recovery"],
    description: "All the health insight of a smartwatch in a titanium ring you'll forget you're wearing. It scores your sleep and recovery each morning and runs a full week between quick charges on its slim dock.",
    highlights: ["Continuous heart-rate and SpO2 from the finger", "Personalised sleep and readiness scores", "7-day battery on a pocket-sized dock", "Scratch-resistant titanium, 100m water rating"],
    stock: 12, isNew: true,
  },
  {
    name: "Chronos SE Smartwatch", cat: "c2", brand: "Nova", price: 249,
    tags: ["smartwatch", "gps", "everyday"], sizes: true,
    description: "The essential Chronos experience at a friendlier price, with the same fast GPS and crash detection in a lighter aluminium case. It covers workouts, notifications and contactless pay while easily lasting through the day and night.",
    highlights: ["Built-in GPS and crash detection", "Heart-rate and sleep tracking", "Contactless payments on your wrist", "Swim-proof 50m water resistance"],
    stock: 47,
  },
  {
    name: "Summit GPS Sport Watch", cat: "c2", brand: "Kestrel", price: 449, compare: 499,
    tags: ["multisport", "gps", "training"], sizes: true,
    description: "A serious training computer for runners, cyclists and triathletes, with lab-grade metrics like VO2 max, running power and recovery time. A transflective display sips power for weeks of tracking and days of continuous GPS.",
    highlights: ["Multi-band GPS with breadcrumb navigation", "VO2 max, running power and training load", "Up to 21 days smartwatch battery", "Structured workout and race-pace coaching"],
    stock: 3,
  },

  // ------------------------------------------------------------ Computing (c3)
  {
    name: "Quill Ultrabook 14", cat: "c3", brand: "Nova", price: 1499, compare: 1699,
    tags: ["laptop", "ultrabook", "productivity"],
    description: "A 2.6-pound machined-aluminium laptop that runs cool and silent yet powers through code, edits and a dozen browser tabs. The 3K OLED display and 18-hour battery make it just as good on the sofa as at the desk.",
    highlights: ["14\" 3K OLED, 120Hz, 100% DCI-P3", "12-core CPU with all-day 18h battery", "Machined unibody weighs just 2.6 lb", "Thunderbolt 4, Wi-Fi 7 and a 1080p webcam"],
    stock: 21, featured: true, bestSeller: true,
  },
  {
    name: "Mechanist Keyboard Pro", cat: "c3", brand: "Vantage", price: 189,
    tags: ["keyboard", "mechanical", "wireless"],
    description: "A gasket-mounted board with a soft, cushioned typing feel and sound-dampening foam that turns every keystroke into a satisfying thock. Hot-swap switches and per-key RGB let you tune it to exactly how you like to type.",
    highlights: ["Gasket-mounted plate for a cushioned feel", "Hot-swappable pre-lubed switches", "Triple-mode: USB-C, Bluetooth and 2.4GHz", "Aluminium frame with per-key RGB"],
    stock: 33,
  },
  {
    name: "Glide Wireless Mouse", cat: "c3", brand: "Orbit", price: 89, compare: 109,
    tags: ["mouse", "wireless", "ergonomic"],
    description: "An ergonomic shape and near-frictionless PTFE feet make long editing sessions painless and precise. A silent-click mechanism and 70-day battery mean it stays out of your way in the office and the library alike.",
    highlights: ["8000 DPI sensor with adjustable steps", "Whisper-quiet silent-click buttons", "70-day battery on a single charge", "MagSpeed scroll wheel with USB-C"],
    stock: 8,
  },
  {
    name: "Vista 4K Monitor 27", cat: "c3", brand: "Lumen", price: 649,
    tags: ["monitor", "4k", "usb-c"],
    description: "A colour-accurate 27-inch 4K panel that arrives factory-calibrated for photo and video work straight out of the box. A single USB-C cable carries picture, data and 96W of laptop charging to keep your desk clutter-free.",
    highlights: ["27\" 4K IPS, factory-calibrated Delta-E < 2", "USB-C with 96W passthrough charging", "Built-in KVM and 3-port USB hub", "Height, tilt and pivot ergonomic stand"],
    stock: 17, featured: true,
  },
  {
    name: "Nexus Docking Station", cat: "c3", brand: "Orbit", price: 219,
    tags: ["dock", "usb-c", "thunderbolt"],
    description: "Turn a single Thunderbolt cable into a full workstation with dual 4K displays, gigabit ethernet and eleven ports on tap. It charges your laptop at 96W while it's at it, so one cable really does it all.",
    highlights: ["Drives dual 4K 60Hz displays", "11 ports including SD and gigabit ethernet", "96W laptop charging over Thunderbolt 4", "Compact aluminium body runs cool and quiet"],
    stock: 26,
  },
  {
    name: "Quill Pro 16 Laptop", cat: "c3", brand: "Nova", price: 2399, compare: 2599,
    tags: ["laptop", "creator", "performance"],
    description: "A 16-inch creator's workstation with a discrete GPU that chews through 8K timelines, 3D renders and heavy compiles. The mini-LED display hits reference-grade brightness and the vapor-chamber cooling keeps it composed under load.",
    highlights: ["16\" mini-LED, 1600 nits, 165Hz", "16-core CPU + studio-grade discrete GPU", "Vapor-chamber cooling stays quiet under load", "99Wh battery, SDXC and full-size HDMI"],
    stock: 9, isNew: true, featured: true,
  },
  {
    name: "Forge Mechanical Keyboard TKL", cat: "c3", brand: "Vantage", price: 139, compare: 159,
    tags: ["keyboard", "tenkeyless", "mechanical"],
    description: "A compact tenkeyless board that frees up desk space for the mouse without giving up the arrow keys and function row. Double-shot PBT keycaps and a solid steel plate deliver a crisp, rattle-free type that lasts for years.",
    highlights: ["Space-saving tenkeyless layout", "Double-shot PBT keycaps that never fade", "Screw-in stabilisers for rattle-free spacebar", "South-facing RGB with onboard profiles"],
    stock: 44, bestSeller: true,
  },

  // ---------------------------------------------------------- Photography (c4)
  {
    name: "Lumina Mirrorless Camera", cat: "c4", brand: "Lumen", price: 1299, compare: 1499,
    tags: ["camera", "mirrorless", "full-frame"],
    description: "A full-frame mirrorless body that pairs a 33MP sensor with subject-detect autofocus that locks onto eyes, animals and vehicles instantly. In-body stabilisation buys you five extra stops so handheld shots stay sharp after dark.",
    highlights: ["33MP full-frame back-illuminated sensor", "AI subject-detect autofocus with eye tracking", "5-axis IBIS worth up to 7 stops", "4K/60 10-bit video with a fully articulating screen"],
    stock: 11, featured: true, bestSeller: true,
  },
  {
    name: "Prime 50mm f/1.8 Lens", cat: "c4", brand: "Lumen", price: 499,
    tags: ["lens", "prime", "portrait"],
    description: "A fast standard prime that renders creamy, rounded bokeh and stays razor sharp wide open at f/1.8. Weather sealing and a near-silent stepping motor make it equally at home shooting portraits or run-and-gun video.",
    highlights: ["Bright f/1.8 aperture for low light and bokeh", "11-blade rounded diaphragm", "Weather-sealed metal barrel", "Silent linear AF motor for video"],
    stock: 28,
  },
  {
    name: "Voyager Action Cam", cat: "c4", brand: "Orbit", price: 379, compare: 429,
    tags: ["action", "4k", "waterproof"],
    description: "Waterproof to 10 metres without a case and stabilised so smoothly it looks gimbal-mounted, this pocket cam is built for the chaos. A front screen frames your vlogs while 5.3K capture keeps every splash crisp.",
    highlights: ["5.3K/60 video, waterproof to 10m case-free", "Gimbal-smooth HyperSteady stabilisation", "Front and rear touch displays", "Magnetic quick-release mounting"],
    stock: 22, isNew: true,
  },
  {
    name: "Steadicam Gimbal 3", cat: "c4", brand: "Vantage", price: 259,
    tags: ["gimbal", "stabilizer", "video"],
    description: "A three-axis gimbal that carries mirrorless bodies with ease and glides your footage into buttery cinematic motion. Intelligent tracking keeps your subject centred while a 14-hour battery outlasts the longest shoot day.",
    highlights: ["3-axis stabilisation for mirrorless rigs", "Subject tracking with a smartphone clip", "14-hour battery, USB-C fast charge", "Folds flat for a backpack side pocket"],
    stock: 15,
  },
  {
    name: "Aperture Zoom 24-70mm Lens", cat: "c4", brand: "Lumen", price: 1099, compare: 1249,
    tags: ["lens", "zoom", "standard"],
    description: "The one lens that lives on your camera — a constant f/2.8 across the whole range for weddings, travel and everything between. Dual focus motors and pro-grade sealing keep it fast and dependable in any weather.",
    highlights: ["Constant f/2.8 from 24mm to 70mm", "Dual linear motors for silent, instant AF", "Fully weather-sealed with fluorine coating", "Customisable control ring and lock switch"],
    stock: 6,
  },
  {
    name: "Beacon LED Light Panel", cat: "c4", brand: "Lumen", price: 189,
    tags: ["lighting", "led", "studio"],
    description: "A pocketable bi-colour panel that puts soft, accurate light exactly where you need it, from interviews to product shots. Full RGB effects and app control turn one small light into a whole creative toolkit.",
    highlights: ["Bi-colour 2500K-8500K with CRI 96+", "Full RGB and 20 built-in lighting effects", "Magnetic back and 1/4\" mounts", "USB-C powered, all-metal chassis"],
    stock: 39,
  },
  {
    name: "Falcon Drone 4K", cat: "c4", brand: "Orbit", price: 899, compare: 999,
    tags: ["drone", "4k", "aerial"],
    description: "A sub-250g folding drone that shoots stabilised 4K HDR from the sky and dodges obstacles on every side. A 34-minute flight time and 12km transmission range let your shots travel far beyond the launch point.",
    highlights: ["4K/60 HDR on a 3-axis gimbal", "Omnidirectional obstacle sensing", "34-minute flight time, 12km video link", "Folds to fit in a jacket pocket, under 250g"],
    stock: 0, isNew: true,
  },

  // -------------------------------------------------------------- Gaming (c5)
  {
    name: "Titan Console X", cat: "c5", brand: "Monolith", price: 549,
    tags: ["console", "4k", "gaming"],
    description: "A flagship console with a custom SSD that erases loading screens and a GPU that holds 4K at 120fps in the biggest worlds. Ray-traced lighting and 3D audio pull you so far in you'll forget the couch exists.",
    highlights: ["4K gaming up to 120fps with ray tracing", "Ultra-fast 1TB SSD kills load times", "Immersive 3D spatial audio engine", "Backward compatible with thousands of titles"],
    stock: 13, featured: true, bestSeller: true,
  },
  {
    name: "Reflex Pro Controller", cat: "c5", brand: "Monolith", price: 79, compare: 99,
    tags: ["controller", "wireless", "pro"],
    description: "A tournament-grade controller with hall-effect sticks that never drift and back paddles you can remap on the fly. Swappable thumbsticks and hair-trigger locks let you build the perfect layout for any game.",
    highlights: ["Drift-free hall-effect thumbsticks", "Four remappable rear paddles", "Adjustable hair triggers and swappable sticks", "Sub-1ms wireless with a 40-hour battery"],
    stock: 41, bestSeller: true,
  },
  {
    name: "Immersion VR Headset", cat: "c5", brand: "Monolith", price: 499, compare: 599,
    tags: ["vr", "headset", "immersive"],
    description: "Standalone VR with pancake lenses and 4K-per-eye clarity that makes the virtual world feel startlingly real. Inside-out tracking and full colour passthrough blend games seamlessly with the room around you.",
    highlights: ["4K per eye through slim pancake lenses", "Full-colour mixed-reality passthrough", "Inside-out tracking, no base stations", "Comfort-balanced strap with spatial audio"],
    stock: 18,
  },
  {
    name: "Vortex Gaming Headset", cat: "c5", brand: "Aeris", price: 149,
    tags: ["headset", "surround", "gaming"],
    description: "A wireless headset with positional surround so precise you'll hear footsteps before you see them. A broadcast-quality detachable mic and 50-hour battery keep you in the squad all weekend long.",
    highlights: ["Low-latency 2.4GHz wireless + Bluetooth", "Spatial surround with tunable EQ", "Detachable broadcast-grade mic", "50-hour battery, memory-foam earcups"],
    stock: 27,
  },
  {
    name: "Rapid Mechanical Gaming Keyboard", cat: "c5", brand: "Vantage", price: 169, compare: 199,
    tags: ["keyboard", "gaming", "optical"],
    description: "Magnetic switches let you set the exact depth each key actuates and fire two commands from a single press. An 8000Hz polling rate turns every keystroke into an instant, and the aluminium deck keeps it planted.",
    highlights: ["Adjustable actuation magnetic switches", "8000Hz polling for near-zero latency", "Rapid-trigger and dual-action key binds", "Aircraft-aluminium top with a wrist rest"],
    stock: 4, isNew: true,
  },
  {
    name: "Apex Gaming Mouse", cat: "c5", brand: "Orbit", price: 129,
    tags: ["mouse", "gaming", "lightweight"],
    description: "A 58-gram esports mouse with a flagship 30K sensor and optical switches that click at the speed of light. The wireless connection is so fast it beats most wired mice, and it charges without ever leaving the mousepad.",
    highlights: ["30K-DPI sensor, 750 IPS tracking", "Ultralight 58g shell for fast flicks", "Optical switches rated for 100M clicks", "Sub-1ms wireless with powerplay charging"],
    stock: 34,
  },
  {
    name: "Arena Racing Wheel", cat: "c5", brand: "Monolith", price: 399, compare: 449,
    tags: ["racing", "wheel", "force-feedback"],
    description: "Direct-drive force feedback puts every kerb, skid and camber straight into your hands with brutal precision. A leather-wrapped rim and load-cell brake pedal turn your living room into a proper sim-racing cockpit.",
    highlights: ["Direct-drive motor with 8Nm of torque", "Load-cell brake for consistent braking", "Hand-stitched leather 300mm rim", "Quick-release hub, multi-platform support"],
    stock: 2,
  },

  // ---------------------------------------------------------------- Home (c6)
  {
    name: "Hearth Smart Thermostat", cat: "c6", brand: "Halcyon", price: 199,
    tags: ["smart-home", "thermostat", "energy"],
    description: "A learning thermostat that studies your routine and trims your energy bill without you lifting a finger. Room sensors balance the temperature across the house and a machined dial makes manual tweaks a pleasure.",
    highlights: ["Learns your schedule to cut energy use", "Wireless room sensors for even heating", "Works with every major voice assistant", "Machined aluminium dial, colour display"],
    stock: 29, bestSeller: true,
  },
  {
    name: "Aura Smart Bulb Set", cat: "c6", brand: "Lumen", price: 89, compare: 119,
    tags: ["lighting", "smart", "rgb"],
    description: "Sixteen million colours and warm-to-cool whites let you paint any mood, from focused daylight to a candlelit dinner. Scenes, schedules and voice control come baked in, and setup takes under a minute per bulb.",
    highlights: ["16M colours plus tunable white", "Set of four bulbs with a bridge included", "Scenes, schedules and away-mode automation", "Works with voice assistants and widgets"],
    stock: 52,
  },
  {
    name: "Sentinel Video Doorbell", cat: "c6", brand: "Halcyon", price: 179,
    tags: ["security", "camera", "smart-home"],
    description: "A head-to-toe 2K view shows packages on the step and visitors at the door, day or night. On-device AI tells people from parcels and cars, so you only get the alerts that actually matter.",
    highlights: ["2K HDR head-to-toe field of view", "On-device person, parcel and vehicle alerts", "Colour night vision and two-way talk", "Wired or battery, with local storage option"],
    stock: 20,
  },
  {
    name: "Breeze Air Purifier", cat: "c6", brand: "Halcyon", price: 299,
    tags: ["air", "purifier", "hepa"],
    description: "A true-HEPA purifier that clears a large room of smoke, dust and pollen in under fifteen minutes. A laser particle sensor ramps it up automatically and reports your air quality in real time on the front dial.",
    highlights: ["True-HEPA + activated carbon filtration", "Cleans a 1000 sq ft room every 30 minutes", "Laser air-quality sensor with auto mode", "Whisper-quiet 24dB sleep setting"],
    stock: 16,
  },
  {
    name: "Verta Robot Vacuum", cat: "c6", brand: "Halcyon", price: 599, compare: 699,
    tags: ["vacuum", "robot", "smart-home"],
    description: "It maps your home with lidar, vacuums and mops in a single pass, then empties and washes itself at the dock. Obstacle avoidance steers around cables and pet messes so you can just come home to clean floors.",
    highlights: ["Precision lidar mapping with no-go zones", "Vacuums and mops in one pass", "Self-emptying, self-washing base station", "AI obstacle avoidance for cords and pets"],
    stock: 8, featured: true, isNew: true,
  },
  {
    name: "Halo Smart Speaker Hub", cat: "c6", brand: "Nova", price: 149,
    tags: ["speaker", "smart-home", "hub"],
    description: "A room-filling smart speaker with a built-in home hub that ties your lights, locks and sensors together. A 7-inch touch display doubles as a photo frame, video-call screen and always-ready recipe book.",
    highlights: ["360-degree room-filling sound", "Built-in smart-home hub for Matter devices", "7\" touch display for calls and photos", "Far-field mics with a hardware mute switch"],
    stock: 37,
  },
  {
    name: "Terra Espresso Machine", cat: "c6", brand: "Halcyon", price: 749, compare: 849,
    tags: ["espresso", "kitchen", "premium"],
    description: "A prosumer espresso machine with PID temperature control and a real 58mm portafilter for café-quality shots at home. The built-in grinder doses straight into the basket, so great coffee is only a few taps away.",
    highlights: ["PID-controlled brew temperature", "Integrated conical burr grinder", "Commercial 58mm portafilter and steam wand", "Stainless steel body with a shot timer"],
    stock: 6, isNew: true,
  },

  // -------------------------------------------------------------- Mobile (c7)
  {
    name: "Zephyr Pro Smartphone", cat: "c7", brand: "Nova", price: 899, compare: 999,
    tags: ["phone", "flagship", "5g"],
    description: "A flagship phone with a triple camera that shoots stunning low-light photos and 8K video from the palm of your hand. The titanium frame and armored glass survive real life while a silicon battery easily lasts all day.",
    highlights: ["6.7\" LTPO 120Hz display, 2600 nits", "Triple 50MP camera with 5x optical zoom", "Titanium frame, IP68 water resistance", "All-day silicon battery with 80W fast charge"],
    stock: 24, featured: true, bestSeller: true,
  },
  {
    name: "Zephyr Lite Smartphone", cat: "c7", brand: "Nova", price: 499,
    tags: ["phone", "midrange", "5g"],
    description: "The essential Zephyr experience for less, with the same clean software and a battery that stretches into a second day. A bright 120Hz screen and a dependable dual camera make it feel far above its price.",
    highlights: ["6.5\" 120Hz AMOLED display", "Dual 50MP camera with night mode", "5000mAh two-day battery, 45W charging", "Clean software with 5 years of updates"],
    stock: 48,
  },
  {
    name: "Guardian Phone Case", cat: "c7", brand: "Orbit", price: 39, compare: 49,
    tags: ["case", "protection", "magsafe"], sizes: true,
    description: "Military-tested drop protection in a slim case that keeps the phone's lines intact and the buttons tactile. Built-in magnets snap to every charger and mount, and the coating shrugs off fingerprints and scratches.",
    highlights: ["Tested to 4m military-grade drops", "Strong magnetic array for chargers and mounts", "Raised bezel guards screen and cameras", "Anti-yellowing, anti-fingerprint coating"],
    stock: 96,
  },
  {
    name: "FastCharge 100W Adapter", cat: "c7", brand: "Orbit", price: 59,
    tags: ["charger", "usb-c", "gan"],
    description: "A compact GaN charger with four ports that can power a laptop, tablet and two phones from one wall socket. It's barely bigger than a matchbox yet delivers a full 100 watts, making it the only travel charger you'll pack.",
    highlights: ["100W total across 3x USB-C + 1x USB-A", "GaN design half the size of old bricks", "Charges most laptops at full speed", "Foldable pins and worldwide voltage support"],
    stock: 61, bestSeller: true,
  },
  {
    name: "PowerCell 20K Power Bank", cat: "c7", brand: "Orbit", price: 69, compare: 89,
    tags: ["power-bank", "usb-c", "travel"],
    description: "A 20,000mAh bank that refuels a phone four times over and can fast-charge a laptop in a pinch. A built-in display shows exactly how much juice is left, and pass-through charging tops up the bank and your devices at once.",
    highlights: ["20,000mAh, ~4 full phone charges", "140W USB-C output charges laptops", "Digital readout of remaining charge", "Airline-safe capacity with pass-through charging"],
    stock: 43,
  },
  {
    name: "Zephyr Fold Smartphone", cat: "c7", brand: "Nova", price: 1699, compare: 1799,
    tags: ["phone", "foldable", "flagship"],
    description: "A phone that unfolds into a tablet, with a crease-minimised inner display and a hinge rated for hundreds of thousands of flips. Multitask across three apps at once, then fold it back to pocket size in a titanium-hinged frame.",
    highlights: ["7.8\" folding inner display, 6.3\" cover screen", "Durable titanium hinge, IP68 rated", "Three-app multitasking and drag-and-drop", "Triple camera with flex-mode tripod shots"],
    stock: 0, isNew: true, featured: true,
  },
  {
    name: "MagMount Car Charger", cat: "c7", brand: "Orbit", price: 45,
    tags: ["car", "charger", "magsafe"],
    description: "A vent mount with a strong magnetic grip that holds your phone rock-steady and fast-charges it at 15 watts. One-hand docking and a tension-locked arm mean it stays put over potholes and hairpin turns alike.",
    highlights: ["15W magnetic wireless charging", "Vibration-proof vent clamp", "One-handed magnetic docking", "Adjustable arm with a metal grip"],
    stock: 55,
  },

  // ----------------------------------------------------------- Lifestyle (c8)
  {
    name: "Nomad Leather Backpack", cat: "c8", brand: "Kestrel", price: 189, compare: 229,
    tags: ["bag", "leather", "commuter"],
    description: "A full-grain leather commuter pack with a padded, quick-access laptop sleeve and hardware that only looks better with age. Thoughtful pockets keep cables, passport and water bottle in their place from office to airport.",
    highlights: ["Full-grain leather that patinas beautifully", "Protective 16\" laptop and tablet sleeves", "Luggage pass-through and hidden back pocket", "Water-resistant lining with YKK zips"],
    stock: 25, featured: true,
  },
  {
    name: "Drift Polarized Sunglasses", cat: "c8", brand: "Kestrel", price: 149,
    tags: ["eyewear", "polarized", "uv"],
    description: "Hand-finished acetate frames with polarized lenses that kill glare off water, roads and snow. Spring hinges and a lightweight fit keep them comfortable from the morning drive to the evening deck.",
    highlights: ["Polarized lenses with 100% UV400 protection", "Hand-polished Italian acetate frames", "Scratch-resistant, anti-reflective coating", "Includes hard case and cleaning cloth"],
    stock: 38, bestSeller: true,
  },
  {
    name: "Ember Insulated Bottle", cat: "c8", brand: "Vantage", price: 45,
    tags: ["bottle", "steel", "insulated"],
    description: "Double-wall vacuum insulation keeps drinks icy for a full day or piping hot through the morning meetings. The powder-coated steel shrugs off dents and the leak-proof lid is safe to toss straight in the bag.",
    highlights: ["Cold for 24h, hot for 12h", "Leak-proof, one-hand flip lid", "Durable powder-coated 18/8 steel", "Sweat-free exterior, fits most cup holders"],
    stock: 72,
  },
  {
    name: "Trail Weekender Duffel", cat: "c8", brand: "Kestrel", price: 159, compare: 199,
    tags: ["duffel", "travel", "carry-on"],
    description: "A carry-on-sized duffel in tough, water-repellent fabric with a separate ventilated shoe and laundry compartment. It carries as a duffel or a backpack, so a two-night trip is packed and out the door in minutes.",
    highlights: ["Carry-on legal 40L capacity", "Water-repellent recycled fabric", "Separate shoe / laundry compartment", "Converts between duffel and backpack straps"],
    stock: 11,
  },
  {
    name: "Meridian Leather Wallet", cat: "c8", brand: "Kestrel", price: 65,
    tags: ["wallet", "leather", "rfid"],
    description: "A slim bifold in vegetable-tanned leather that holds a week's worth of cards without the bulk. RFID-blocking lining guards your contactless cards while the pull-tab makes reaching the ones you use effortless.",
    highlights: ["Vegetable-tanned full-grain leather", "RFID-blocking card protection", "Slim profile holds up to 10 cards", "Quick-access pull tab and cash sleeve"],
    stock: 58,
  },
  {
    name: "Atlas Travel Organizer", cat: "c8", brand: "Kestrel", price: 79, compare: 99,
    tags: ["organizer", "travel", "tech"],
    description: "A tech organiser that tames every cable, charger, dongle and SD card in labelled elastic loops and mesh pockets. The water-resistant shell keeps it all safe in your bag so nothing goes missing between trips.",
    highlights: ["Elastic loops and mesh for cables and chargers", "Water-resistant, protective outer shell", "Fits a power bank, hard drive and dongles", "Lays flat with a lockable double zip"],
    stock: 33, isNew: true,
  },
  {
    name: "Wander Packing Cubes Set", cat: "c8", brand: "Vantage", price: 55,
    tags: ["packing", "travel", "organization"],
    description: "A set of four ripstop cubes that compress a week of clothes into half the space and keep your suitcase in order. Two-way zips and mesh tops let you find anything at a glance without unpacking the whole bag.",
    highlights: ["Set of four sizes for any trip", "Compression zips shrink bulky clothes", "Breathable mesh tops to see contents", "Ultralight, tear-resistant ripstop nylon"],
    stock: 47,
  },
];

// Simple deterministic pseudo-random for stable data.
function seeded(n: number) {
  const x = Math.sin(n * 999) * 10000;
  return x - Math.floor(x);
}

export const products: Product[] = productSeeds.map((seed, i) => {
  const brand = seed.brand;
  const rating = Number((4.1 + seeded(i + 1) * 0.85).toFixed(1));
  const reviewCount = Math.floor(40 + seeded(i + 2) * 1600);
  const slug = slugify(`${seed.name}`);
  const category = categories.find((c) => c.id === seed.cat)!;
  const colorCount = 2 + Math.floor(seeded(i + 3) * 5);
  // Products appear grouped by category in `productSeeds`, so the n-th product
  // of a category takes the n-th photo of that category's group; the gallery
  // wraps around the group for the remaining three shots.
  const pool = photos[seed.cat as keyof typeof photos];
  const offset = productSeeds.slice(0, i).filter((s) => s.cat === seed.cat).length;
  const images = [0, 1, 2, 3].map((k) => img(pool[(offset + k) % pool.length], 900));

  return {
    id: `p${i + 1}`,
    name: seed.name,
    slug,
    brand,
    description: seed.description,
    highlights: seed.highlights,
    price: seed.price,
    comparePrice: seed.compare,
    currency: "USD",
    images,
    categoryId: seed.cat,
    categorySlug: category.slug,
    tags: seed.tags,
    rating,
    reviewCount,
    stock: seed.stock,
    colors: colorPalette.slice(0, colorCount).map((c, k) => ({ id: `${slug}-c${k}`, name: c.name, value: c.value, available: k < colorCount - 1 || seeded(i + k) > 0.3 })),
    sizes: seed.sizes
      ? ["S", "M", "L", "XL"].map((s, k) => ({ id: `${slug}-s${k}`, name: s, value: s, available: k !== 3 || seeded(i + 9) > 0.5 }))
      : [],
    featured: Boolean(seed.featured),
    bestSeller: Boolean(seed.bestSeller),
    isNew: Boolean(seed.isNew),
    onSale: Boolean(seed.compare),
    createdAt: new Date(2025, 6 + (i % 6), (i % 27) + 1).toISOString(),
  };
});

// Backfill category counts.
categories.forEach((c) => {
  c.productCount = products.filter((p) => p.categoryId === c.id).length;
});

// Larger, varied review pool keyed loosely by star rating.
const reviewPool: Array<{ rating: number; title: string; body: string }> = [
  { rating: 5, title: "Exceeded every expectation", body: "The build quality is genuinely premium and it has held up flawlessly after two months of heavy daily use. Worth every cent." },
  { rating: 5, title: "My new favorite gadget", body: "I put off buying this for ages and now I regret waiting. It does exactly what it promises and the little details are so well thought out." },
  { rating: 5, title: "Feels like a luxury product", body: "From the packaging to the finish in the hand, this feels twice the price. Setup took two minutes and it has just worked ever since." },
  { rating: 5, title: "Best purchase this year", body: "Battery life is even better than advertised and the performance is rock solid. I've already recommended it to three coworkers." },
  { rating: 5, title: "Absolutely worth it", body: "Replaced a well-known brand competitor and there is simply no going back. Quieter, faster and far more comfortable." },
  { rating: 5, title: "Superb craftsmanship", body: "You can feel where the money went. Everything is precise, nothing rattles, and it looks stunning on the desk." },
  { rating: 4, title: "Great, with one small nitpick", body: "Really happy overall — performance and design are excellent. The companion app could be a touch more polished, but that's minor." },
  { rating: 4, title: "Very solid, fast shipping", body: "Arrived a day early and beautifully packaged. Does everything I hoped; I just wish it came with a carrying case in the box." },
  { rating: 4, title: "Nearly perfect", body: "Comfortable, well made and reliable. Knocked off a star only because the default settings needed some tweaking to get right." },
  { rating: 4, title: "Impressed after two weeks", body: "It's become part of my daily routine and I barely think about charging it. Only wish it came in more color options." },
  { rating: 4, title: "Premium feel, fair price", body: "Materials feel high-end and it's clearly built to last. A slightly longer cable would have made it a five-star for me." },
  { rating: 4, title: "Would buy again", body: "Reliable and good looking. The learning curve was a little steeper than I expected but the support docs sorted me out quickly." },
  { rating: 3, title: "Good but not for everyone", body: "The quality is there and it performs fine, but it's a bit heavier than I expected and the price is on the higher side." },
  { rating: 3, title: "Decent, some quirks", body: "Works as described most of the time. I ran into a couple of connectivity hiccups that a firmware update mostly fixed." },
  { rating: 3, title: "Solid, wanted a bit more", body: "It's a capable product and looks the part, but for the money I hoped a few extras would be included rather than sold separately." },
];

const reviewers = [
  "Alex Morgan", "Priya Nair", "Diego Santos", "Mei Chen", "Jonas Weber",
  "Sara Ali", "Tom Becker", "Yuki Tanaka", "Emma Wilson", "Liam Murphy",
  "Nina Patel", "Omar Haddad", "Chloe Dubois", "Marcus Reed", "Aisha Khan",
  "Ben Carter", "Sofia Rossi", "Daniel Kim", "Hannah Fischer", "Ravi Kapoor",
];

const reviewMonths = [
  { y: 2025, m: 7 }, { y: 2025, m: 9 }, { y: 2025, m: 11 },
  { y: 2026, m: 1 }, { y: 2026, m: 3 }, { y: 2026, m: 5 }, { y: 2026, m: 6 },
];

export const reviews: Review[] = products.flatMap((p, pi) => {
  // 4-8 reviews per product.
  const count = 4 + Math.floor(seeded(pi + 20) * 5);
  return Array.from({ length: count }).map((_, ri) => {
    // Bias toward the product's own rating while keeping variety.
    const roll = seeded(pi * 13 + ri * 7);
    const poolIndex = roll < 0.55
      ? Math.floor(seeded(pi * 5 + ri) * 6)          // 5-star bucket (0-5)
      : roll < 0.85
        ? 6 + Math.floor(seeded(pi * 3 + ri) * 6)    // 4-star bucket (6-11)
        : 12 + Math.floor(seeded(pi + ri * 4) * 3);  // 3-star bucket (12-14)
    const snip = reviewPool[Math.min(poolIndex, reviewPool.length - 1)];
    const date = reviewMonths[(pi + ri) % reviewMonths.length];
    return {
      id: `${p.id}-r${ri}`,
      productId: p.id,
      author: reviewers[(pi * 3 + ri) % reviewers.length],
      rating: snip.rating,
      title: snip.title,
      body: snip.body,
      createdAt: new Date(date.y, date.m, ((pi + ri * 3) % 27) + 1).toISOString(),
      verified: seeded(pi + ri * 2) > 0.25,
      helpful: Math.floor(seeded(pi * 3 + ri) * 240),
    };
  });
});

export const coupons: Coupon[] = [
  { code: "NOVA10", type: "percent", value: 10, description: "Welcome gift: 10% off your entire order, no minimum.", expiresAt: "2026-12-31" },
  { code: "WELCOME20", type: "percent", value: 20, minSubtotal: 200, description: "New here? Take 20% off orders over $200.", expiresAt: "2026-12-31" },
  { code: "FREESHIP", type: "fixed", value: 15, description: "$15 off to cover shipping on any order.", expiresAt: "2026-12-31" },
  { code: "FLASH50", type: "fixed", value: 50, minSubtotal: 400, description: "Flash deal: $50 off when you spend $400 or more.", expiresAt: "2026-12-31" },
];

export const flashSale: FlashSale = {
  id: "fs1",
  title: "Flash Sale",
  subtitle: "Limited-time drops at their lowest prices. Ends soon.",
  endsAt: "2026-07-25T20:00:00.000Z",
  productIds: products.filter((p) => p.onSale).slice(0, 8).map((p) => p.id),
};
