/* Travel Companion V1 — remaining country content bank.
 * Content-first pass for Laos, Cambodia, Thailand, Kazakhstan and Kyrgyzstan.
 * Experience photography is intentionally disabled until a complete, exact-photo
 * manifest exists for each country. No generic experience image placeholders.
 */
(()=>{
'use strict';
if(typeof DATA==='undefined'||!DATA.destinations)return;
const E=(name,tier,type,summary,time,cost,booking='No',extra={})=>({name,tier,type,summary,time,cost,booking,...extra});

DATA.destinations.laos=[
 {name:'Huay Xai / Bokeo',stay:'1–2',summary:'A Mekong border town and the practical base for the Gibbon Experience. Treat Huay Xai as a staging point, then spend the real time in the Nam Kan forest.',experiences:[
  E('Gibbon Experience Classic','S+','adventure','Spend three days and two nights trekking through Nam Kan National Park, travelling by long ziplines and sleeping in canopy treehouses. This is the version to prioritise because the wildlife and forest experience matter more than simply ticking off the ziplines.','3D/2N','High','Advance booking',{flags:['BOOK AHEAD','WILDLIFE']}),
  E('Mekong riverfront at sunset','A','local','Walk the riverfront as boats move between Laos and Thailand, then use the evening for a quiet meal rather than trying to turn Huay Xai into a major sightseeing stop.','1–2 hr','Low'),
  E('Morning market','A','local','Browse a working local market for produce, herbs, river fish and everyday northern Lao food before leaving town.','45–90 min','Low')
 ]},
 {name:'Luang Prabang',stay:'4–5',summary:'A former royal capital where Lao Buddhist culture, French-era streets, the Mekong and surrounding waterfalls all fit comfortably into a slow stay.',experiences:[
  E('Kuang Si Waterfall','S+','nature','Go early enough to enjoy the turquoise pools and forest before the busiest part of the day. Leave time for the lower trails rather than treating it as a single-photo stop.','Half day','Low–mid','No',{flags:['WEATHER CHECK']}),
  E('Old town at first light','S','culture','Walk the peninsula while temples open and the streets are still quiet. The point is the atmosphere and architecture, not racing through a checklist of wats.','1–2 hr','Free–low'),
  E('Mount Phousi near sunset','A','viewpoint','Climb the central hill for a broad view over the old town, Mekong and surrounding mountains. Go early enough to avoid arriving with the final rush.','1–2 hr','Low'),
  E('Royal Palace / National Museum','A','history','Use the former royal palace to understand the monarchy and the political transition that shaped modern Laos before exploring the rest of the old town.','1–2 hr','Low','Check opening days'),
  E('Morning market food walk','S','food','Use the morning market to try sticky rice, grilled river food, herbs, fermented flavours and regional snacks in a place locals still actively shop.','1–2 hr','Low'),
  E('Mekong or Nam Khan sunset boat','A','slow','Take a short river trip late in the day for a different view of Luang Prabang and the surrounding hills without committing to a packaged full-day cruise.','1–2 hr','Low–mid','Book locally'),
  E('Lao cooking experience','A','food','Choose a class that starts with market ingredients and explains Lao staples such as sticky rice, jeow and herb-heavy dishes rather than reproducing a generic Southeast Asian menu.','Half day','Mid','Book ahead if popular')
 ]},
 {name:'Nong Khiaw',stay:'3–4',summary:'A small Nam Ou town enclosed by limestone peaks. It works best as an active base for viewpoints, river time and nearby village trekking.',experiences:[
  E('Nong Khiaw viewpoint hike','S+','active','Climb above the Nam Ou valley for the town’s defining panorama of river and karst peaks. Start early or later in the afternoon to avoid the hottest part of the day.','2–4 hr','Low','No',{flags:['WEATHER CHECK']}),
  E('Guided village and mountain trek','S','active','Spend a full day or overnight walking beyond the main road with a local guide, combining forest, farming landscapes and village stays rather than a simple out-and-back hike.','Full day / overnight','Mid','Book locally'),
  E('Nam Ou slow afternoon','A','slow','Take an unstructured afternoon by the river: walk the bridge, cafés and small streets and let Nong Khiaw function as a genuine slow-travel stop.','2–4 hr','Low'),
  E('Pha Tok caves','A','history','Visit caves used as shelter during the Indochina wars and connect the dramatic landscape to the conflict that affected this region.','1–2 hr','Low','Check access')
 ]},
 {name:'Muang Ngoi',stay:'2–3',summary:'A river village north of Nong Khiaw where the attraction is the slower pace, walking paths and surrounding rural valleys rather than a long list of sights.',experiences:[
  E('Boat into Muang Ngoi','S','journey','Make the Nam Ou boat journey part of the experience, arriving by river and staying long enough that the village does not feel like a rushed side trip.','1–2 hr','Low–mid','Check current boat schedule'),
  E('Village-to-village walk','S','active','Follow rural paths through rice fields and nearby villages, with time for a simple meal or homestay rather than turning around immediately.','Half/full day','Low','Guide optional'),
  E('Slow river morning','A','slow','Start without a schedule: breakfast overlooking the river, a village walk and time to watch boats and daily life before the heat builds.','2–3 hr','Low'),
  E('Local cave and countryside loop','A','active','Combine the nearby cave and agricultural paths for a compact walking day close to the village.','2–4 hr','Low','Check conditions')
 ]},
 {name:'Nam Et–Phou Louey',stay:'2–3',summary:'A major protected area in northeastern Laos where community-linked wildlife tourism is designed around conservation rather than guaranteed sightings.',experiences:[
  E('Nam Nern Night Safari','S+','wildlife','Join the protected-area programme for river travel, forest interpretation and nocturnal wildlife watching. The value is the conservation model and remote forest experience; wildlife sightings are never guaranteed.','2D/1N','High','Advance booking',{flags:['BOOK AHEAD','WILDLIFE']}),
  E('Community conservation interpretation','S','culture','Spend time understanding how village livelihoods, hunting pressures and tourism revenue connect to wildlife protection in the reserve.','Part of programme','Included','With programme')
 ]},
 {name:'Phonsavan / Plain of Jars',stay:'2–3',summary:'The Xiangkhouang plateau combines one of Southeast Asia’s great archaeological puzzles with one of the clearest places to understand the long legacy of wartime bombing and UXO.',experiences:[
  E('Plain of Jars Site 1','S+','history','Walk among the largest and most accessible megalithic jar fields while learning what archaeologists know—and still do not know—about their Iron Age origins.','2 hr','Low','No'),
  E('Plain of Jars Sites 2 and 3','S','history','Add the quieter secondary sites to see the jars in more rural settings and avoid reducing the entire landscape to the most visited field.','Half day','Low–mid','Transport required'),
  E('UXO visitor centre','S','history','Learn how intensive bombing continues to affect farming, development and daily life. This context is essential before travelling further through rural Laos.','1–2 hr','Donation/low','No',{flags:['UXO']}),
  E('Old Muang Khoun','A','history','Visit the ruined former provincial capital and surviving religious structures for a tangible sense of the destruction caused by war.','Half day','Low–mid','Transport required',{flags:['UXO']})
 ]},
 {name:'Vang Vieng',stay:'3–4',summary:'Once dominated by backpacker tubing culture, Vang Vieng is now better used as an outdoor base for limestone viewpoints, caves and the Nam Song valley.',experiences:[
  E('Karst viewpoint hike','S+','active','Climb one of the main limestone viewpoints for a dramatic look over rice fields, cliffs and the Nam Song valley.','2–4 hr','Low','No',{flags:['WEATHER CHECK']}),
  E('Paramotor or paragliding flight','S+','adventure','See the karst valley from the air if weather and operator standards are right. Treat this as a conditions-dependent highlight rather than a guaranteed activity.','30–60 min','High','Advance/weather-dependent',{flags:['BOOK AHEAD','WEATHER CHECK']}),
  E('Nam Song kayak','S','active','Paddle a quieter section of the river to experience the cliffs at water level rather than spending the day in traffic between viewpoints.','Half day','Mid','Book locally'),
  E('Cave and lagoon circuit','A','nature','Choose one or two worthwhile caves or lagoons and combine them logically instead of spending the day collecting every commercialised stop.','Half/full day','Low–mid','No'),
  E('Sunset by the Nam Song','A','slow','Finish the day by the river as the light drops behind the karsts—simple, cheap and one of the best reasons not to rush through town.','1 hr','Low')
 ]},
 {name:'Vientiane',stay:'2–3',summary:'Laos’s low-rise capital is best treated as a cultural and food reset between the northern mountains and the long journey south.',experiences:[
  E('COPE Visitor Centre','S','history','Understand the continuing human cost of unexploded ordnance through prosthetics, rehabilitation stories and accessible historical context.','1–2 hr','Donation','No'),
  E('Pha That Luang and Patuxai','A','culture','Pair the national stupa with the city’s monumental Patuxai for a compact introduction to Lao religious and modern civic symbolism.','2–3 hr','Low'),
  E('Mekong evening market','A','local','Walk the riverfront at dusk, browse the night market and use the evening to sample inexpensive local food.','1–2 hr','Low'),
  E('Vientiane café and food reset','A','food','Use the capital for good coffee, bakeries and Lao food before the more transport-heavy southern leg.','Flexible','Low–mid')
 ]},
 {name:'Thakhek / Kong Lor',stay:'4–5',summary:'Central Laos is dominated by limestone mountains, caves and rural roads. The Thakhek–Kong Lor corridor is the major adventure section of the southern route.',experiences:[
  E('Kong Lor Cave underground river','S+','nature','Travel by longtail boat through the vast limestone cave and emerge into a remote valley on the other side. It is one of the strongest natural experiences on the Laos route.','2–3 hr','Low–mid','No',{flags:['WATER LEVEL CHECK']}),
  E('Thakhek Loop with legal driver/transport','S+','road','Experience the limestone plateau, caves, villages and reservoirs over several days without relying on riding illegally. Arrange transport that remains valid for licence and insurance.','3–4 days','Mid','Plan transport',{flags:['ROAD CONDITIONS']}),
  E('Tham Nang Aen or selected cave stop','A','nature','Choose one high-quality cave stop around Thakhek rather than collecting every roadside attraction on the loop.','1–2 hr','Low','No'),
  E('Thakhek old town evening','A','slow','Spend an evening along the Mekong and old French-era streets before or after the loop instead of treating the town only as a rental depot.','1–2 hr','Low')
 ]},
 {name:'Savannakhet',stay:'1–2',summary:'A relaxed Mekong city with preserved colonial-era streets and a practical break between central Laos and the southern plateau.',experiences:[
  E('Old Savannakhet walk','A','history','Walk the compact historic centre for French-era shophouses, churches, temples and quiet Mekong streets.','1–2 hr','Free'),
  E('Dinosaur Museum','A','history','See fossils from southern Laos and add a completely different layer to a route otherwise dominated by recent history and landscapes.','1 hr','Low','Check opening hours'),
  E('Mekong sunset and local dinner','A','slow','Use the city as a genuine pause: riverfront sunset followed by inexpensive local food.','2 hr','Low')
 ]},
 {name:'Bolaven Plateau / Pakse',stay:'3–4',summary:'A cooler southern plateau shaped by waterfalls, volcanic soils, coffee farms and diverse ethnic communities.',experiences:[
  E('Coffee farm and tasting','S+','food','Visit a working farm to understand Arabica and Robusta production, processing and roasting, then taste coffee where it is grown.','2–4 hr','Low–mid','Book locally'),
  E('Tad Fane and selected waterfalls','S','nature','Prioritise the most dramatic waterfalls and leave time to actually walk and sit at them rather than racing through an endless waterfall checklist.','Half/full day','Low–mid','No',{flags:['WEATHER CHECK']}),
  E('Bolaven Plateau road circuit','S','road','Travel through coffee country, villages and waterfall landscapes over multiple days using legal transport rather than treating the plateau as a rushed day trip.','2–3 days','Mid','Plan transport'),
  E('Pakse food and Mekong evening','A','food','Use Pakse for southern Lao food and a riverfront evening before or after the plateau.','1–2 hr','Low')
 ]},
 {name:'Sekong',stay:'1–2',summary:'A quiet southeastern provincial town that earns its place because it breaks up the route and puts you in a less-visited highland part of Laos.',experiences:[
  E('Sekong market morning','A','local','Start in the central market to see highland produce and everyday trade before exploring the surrounding area.','1 hr','Low'),
  E('Remote highland road day','S','journey','Make the road itself the experience: forest, villages and river landscapes in a part of Laos most visitors cross quickly.','Half/full day','Low–mid','Arrange local transport',{flags:['REMOTE ROAD']}),
  E('Slow provincial-town evening','A','slow','Keep one evening deliberately unplanned for local food and a walk around town.','1–2 hr','Low')
 ]},
 {name:'Attapeu',stay:'1–2',summary:'One of Laos’s least-visited provincial capitals, surrounded by rivers, forests and remote borderland landscapes.',experiences:[
  E('Attapeu market and riverfront','A','local','Use the market and riverfront to get a feel for daily life in a remote provincial capital rather than searching for conventional attractions.','1–2 hr','Low'),
  E('Local countryside outing','A','journey','Arrange a simple local driver or guide to explore nearby rural landscapes without pushing into restricted or poorly documented border roads.','Half day','Low–mid','Arrange locally',{flags:['REMOTE ROAD','BORDER AREA']}),
  E('Southern Laos slow finish','A','slow','Give yourself downtime here before the next cross-country move; the value is being somewhere that rarely appears on standard Laos itineraries.','Flexible','Low')
 ]}
];

DATA.destinations.cambodia=[
 {name:'Siem Reap',stay:'5–6',summary:'More than the gateway to Angkor: Siem Reap combines Khmer history, countryside, food and a city that is easy to use as a slow-travel base.',experiences:[
  E('Angkor Wat at first light','S+','history','Use sunrise as the beginning of the day, not the entire Angkor experience. Stay after the first crowd moves on and look carefully at the galleries and scale of the temple.','2–3 hr','Pass required','Pass in advance useful'),
  E('Angkor Thom and Bayon','S+','history','Spend proper time inside the former walled capital, including Bayon, the Terrace of the Elephants and the broader urban landscape.','Half day','Included in pass','No'),
  E('Ta Prohm early or late','S','history','Visit the temple known for trees growing through masonry at a quieter time so it feels like an archaeological site rather than a photo queue.','1–2 hr','Included in pass','No'),
  E('Banteay Srei','S','history','Travel farther from the main circuit for exceptionally detailed pink-sandstone carving and a more rural approach to Angkor.','Half day','Included in pass','Driver useful'),
  E('Countryside cycling','S','local','Ride beyond the temple core through rice fields, villages and small roads to balance monumental Angkor with living rural Cambodia.','Half day','Low–mid','Guide optional'),
  E('Khmer food and market evening','A','food','Build one evening around local dishes and markets rather than defaulting to Pub Street.','2–3 hr','Low'),
  E('APOPO visitor centre','A','history','Learn how trained detection rats are used to locate landmines and unexploded ordnance, linking contemporary Cambodia to the legacy of war.','1–2 hr','Mid','Book if busy')
 ]},
 {name:'Battambang',stay:'3–4',summary:'A relaxed northwestern city surrounded by villages, rice country and some of Cambodia’s best everyday architecture and food.',experiences:[
  E('Phnom Sampov bat cave exodus','S+','wildlife','Watch huge numbers of bats stream from the cave around dusk, then stay for the changing light over the surrounding countryside.','1–2 hr','Low','Timing matters'),
  E('Countryside tuk-tuk or cycling day','S','local','Spend a day outside town visiting villages, food producers and rural roads rather than treating the bamboo train as the main reason to come.','Half/full day','Low–mid','Driver/guide useful'),
  E('Battambang old town walk','S','history','Walk the compact centre for French-era shophouses, Chinese-Khmer architecture, cafés and the riverfront.','1–2 hr','Free'),
  E('Bamboo train','B','novelty','Ride the rebuilt tourist bamboo train for fun if you are curious, but keep it below the countryside and city itself in priority.','1–2 hr','Mid','No'),
  E('Battambang food evening','A','food','Try northwestern Cambodian dishes, snacks and desserts in local restaurants and markets.','2–3 hr','Low')
 ]},
 {name:'Phnom Penh',stay:'4',summary:'Cambodia’s capital is intense, historically heavy and culturally important. The best visit balances Khmer Rouge history with markets, food, riverside life and contemporary Cambodia.',experiences:[
  E('Tuol Sleng Genocide Museum','S+','history','Move slowly through the former S-21 prison and use the exhibits and survivor testimony to understand the Khmer Rouge system rather than treating it as a quick dark-tourism stop.','2–3 hr','Low','No'),
  E('Choeung Ek Killing Fields','S','history','Visit after Tuol Sleng so the site has context. Keep the day light afterwards rather than stacking more heavy historical stops.','2 hr','Low–mid','Driver useful'),
  E('Royal Palace and Silver Pagoda','A','culture','Use the palace complex to understand the continuing role of the monarchy and classical Khmer design in the centre of the capital.','1–2 hr','Low–mid','Check opening hours'),
  E('Central Market and neighbourhood food','S','food','Start with the Art Deco market, then continue into surrounding streets for inexpensive Cambodian food and city life.','2–3 hr','Low'),
  E('Mekong/Tonlé Sap riverfront at dusk','A','slow','Walk the riverfront as ferries and local boats move across the confluence, then eat away from the most tourist-oriented strip.','1–2 hr','Low'),
  E('Bassac Lane and contemporary Phnom Penh','A','night','Spend an evening seeing a more contemporary side of the city after the historical sites.','2–3 hr','Low–mid')
 ]},
 {name:'Cardamom Mountains',stay:'3–4',summary:'One of mainland Southeast Asia’s largest remaining forest landscapes, best experienced through community-based conservation tourism rather than an independent wilderness push.',experiences:[
  E('Community conservation jungle stay','S+','wildlife','Stay with a reputable community tourism project where guides, accommodation and activities support forest protection and local livelihoods.','3D/2N+','Mid–high','Advance booking',{flags:['BOOK AHEAD','REMOTE']}),
  E('Guided forest trek','S','active','Walk with local guides who can interpret the forest, wildlife signs and conservation challenges; the point is the ecosystem, not a guaranteed animal sighting.','Half/full day','Included/medium','With stay'),
  E('River or kayak exploration','A','nature','Use the waterways to experience the forest from a different angle and break up the trekking.','2–4 hr','Included/low','With stay')
 ]},
 {name:'Kampot',stay:'3–4',summary:'A small riverside city backed by Bokor and pepper-growing countryside, good for food, cycling and a few deliberately slow days.',experiences:[
  E('Kampot pepper farm','S+','food','Visit a working pepper farm to understand why the region’s pepper became globally recognised, including cultivation, harvesting and grading.','2–3 hr','Low–mid','Book if doing a guided tasting'),
  E('Kampot river sunset','A','slow','Take a simple boat trip or sit by the river as the light drops behind Bokor—one of the easiest low-cost evenings on the Cambodia route.','1–2 hr','Low'),
  E('Countryside tuk-tuk/cycle loop','S','local','Link salt fields, villages and rural roads into one half-day rather than rushing from one named attraction to another.','Half day','Low–mid','Driver useful'),
  E('Bokor National Park day','A','nature','Head into the cooler hills for viewpoints and the strange remnants of the former hill-station landscape.','Half/full day','Low–mid','Driver required',{flags:['WEATHER CHECK']}),
  E('Kampot food evening','A','food','Try pepper-forward dishes, noodles and local restaurants in the compact town centre.','2 hr','Low')
 ]},
 {name:'Kep',stay:'2',summary:'A small coastal town where the real draw is seafood, the old resort-town atmosphere and a slower rhythm than nearby Kampot.',experiences:[
  E('Kep Crab Market','S+','food','Choose crab or other seafood directly around the market and eat with Kampot pepper rather than treating the market as a photo stop.','1–2 hr','Low–mid'),
  E('Kep National Park loop','A','active','Walk the forested hill loop for viewpoints over the coast and islands.','2–4 hr','Low','No',{flags:['WEATHER CHECK']}),
  E('Old Kep villas and seafront','A','history','Walk or ride past the remains of Cambodia’s former seaside resort era and combine them with the modern waterfront.','1–2 hr','Free')
 ]},
 {name:'Koh Rong',stay:'4–5',summary:'An island stop for beach time, village life and warm-water nights. Keep it slow and choose the base carefully so it does not turn into a party-only detour.',experiences:[
  E('Bioluminescent plankton swim','S+','nature','Go out after dark when conditions are suitable and agitate the water to see the plankton glow. Quality depends heavily on darkness, moonlight and local conditions.','1–2 hr','Low–mid','Book locally',{flags:['CONDITIONS CHECK']}),
  E('Long beach day','S','slow','Give yourself a genuinely unstructured beach day rather than filling the island with tours.','Half/full day','Low'),
  E('Snorkelling boat trip','A','nature','Join a small boat for reef and island stops if visibility is good; skip it if sea conditions are poor.','Half day','Low–mid','Book locally',{flags:['SEA CONDITIONS']}),
  E('Village and island walk','A','local','Walk beyond the main accommodation strip to see the lived-in side of the island and how tourism and fishing coexist.','2–4 hr','Low'),
  E('Sunset from the west coast','A','slow','Finish one day with nothing more complicated than sunset, food and a swim.','1–2 hr','Low')
 ]}
];

DATA.destinations.thailand=[
 {name:'Bangkok',stay:'5–7',summary:'A huge city best approached through neighbourhoods, food, canals and everyday transport rather than trying to collect every famous temple in one visit.',experiences:[
  E('Thonburi canal day','S+','local','Explore the quieter canal side of Bangkok by boat and on foot, pairing waterways, neighbourhoods and small temples rather than doing only the central tourist river.','Half day','Low–mid','Book locally'),
  E('Chinatown food evening','S+','food','Go hungry and treat Yaowarat as a structured food crawl: one or two dishes at a time, side streets included, instead of choosing a single restaurant.','2–3 hr','Low–mid'),
  E('Grand Palace + Wat Pho early','S','culture','See the major royal and religious core before the heaviest crowds, then move into nearby streets rather than staying in temple-collection mode all day.','Half day','Mid','No'),
  E('Neighbourhood market morning','S','local','Choose a genuinely local market and use it as a reason to explore a district you would otherwise miss.','1–2 hr','Low'),
  E('Chao Phraya public-boat day','A','journey','Use the river as transport between neighbourhoods and sights; it is cheap, scenic and keeps the city geographically understandable.','Flexible','Low'),
  E('Rooftop or high-city view once','A','viewpoint','Pick one skyline experience rather than paying for several. Time it around sunset if the price makes sense.','1–2 hr','Mid–high','Reserve if popular'),
  E('Pre-TESOL reset','A','practical','Use a day for laundry, backups, admin, camera preparation and a proper sleep buffer before the training block.','Half/full day','Low')
 ]},
 {name:'Chiang Mai',stay:'5–7',summary:'Northern Thailand’s main cultural base, surrounded by markets, mountains and Lanna food. Slow travel works especially well here.',experiences:[
  E('Lanna cooking class','S+','food','Cook northern Thai dishes such as khao soi or sai ua with proper explanation of herbs, pastes and regional flavours.','Half day','Mid','Book ahead if small-group'),
  E('Old city temple walk at dawn','S','culture','Walk before the heat and traffic build, focusing on a small number of temples and the old city fabric rather than collecting every wat.','2–3 hr','Low'),
  E('Warorot Market and riverside neighbourhoods','S','local','Browse one of the city’s major local markets, then continue through nearby streets and the Ping River area.','2–3 hr','Low'),
  E('Doi Suthep late afternoon','A','culture','Head up the mountain later in the day for cooler air and broad city views, while giving the temple itself enough time.','2–3 hr','Low–mid'),
  E('Northern Thai food crawl','S','food','Prioritise khao soi, sai ua, nam prik and market snacks over generic Thai dishes you can eat anywhere in the country.','2–3 hr','Low'),
  E('Countryside cycling','A','active','Spend half a day outside the moat in agricultural and village areas for a more local counterpoint to the old city.','Half day','Low–mid','Guide optional')
 ]},
 {name:'Chiang Rai',stay:'3',summary:'A smaller northern city that works best as a base for food, markets and the surrounding hills rather than a single-day temple photo circuit.',experiences:[
  E('Wat Rong Khun early','A','culture','See the White Temple before it becomes the day’s main crowd magnet, then move on rather than building the whole visit around it.','1–2 hr','Low'),
  E('Baan Dam / Black House','A','art','Explore Thawan Duchanee’s dark, idiosyncratic collection of architecture and art for something very different from standard temple sightseeing.','1–2 hr','Low'),
  E('Night Bazaar and northern food','S','food','Use the evening to try regional dishes and snacks in a compact, easy-to-navigate part of the city.','2 hr','Low'),
  E('Hill-country day with local guide','S','local','Choose a respectful small-group or private day focused on landscape, agriculture and local communities rather than exploitative “tribal village” staging.','Full day','Mid','Vet operator')
 ]},
 {name:'Pai',stay:'3',summary:'A small mountain town with beautiful countryside that is worth keeping for landscapes and slow days rather than its backpacker nightlife.',experiences:[
  E('Pai Canyon at golden hour','S','landscape','Walk the narrow ridges when the heat drops and the light improves, while staying conservative around exposed edges.','1–2 hr','Low'),
  E('Countryside day','S','slow','Rent a bicycle where practical or arrange local transport through rice fields, villages and quiet roads instead of hopping only between Instagram stops.','Half/full day','Low–mid','Plan transport'),
  E('Hot springs','A','nature','Use a cool morning for a soak if conditions and entry cost make sense.','1–2 hr','Low–mid'),
  E('Pai slow morning','A','slow','Keep one morning unscheduled for coffee, walking and doing very little—the point of staying three nights rather than one.','2–3 hr','Low')
 ]},
 {name:'Mae Hong Son Loop',stay:'4–6',summary:'A mountain-road circuit through northwest Thailand. Because riding legality and insurance matter, treat the route as an experience that can be done by driver, shared transport or other compliant option.',experiences:[
  E('Mountain-road journey','S+','journey','Travel the winding route through forested mountains and small towns, stopping because the journey itself is the main experience.','4–6 days','Mid','Plan legal transport',{flags:['ROAD CONDITIONS']}),
  E('Mae Hong Son town and lake','A','slow','Stay overnight around the small lake and temples rather than arriving and leaving on the same day.','1–2 hr','Low'),
  E('Mountain village homestay','S','local','Choose a reputable community-based stay where the host community controls the experience and benefits directly.','Overnight','Mid','Book ahead'),
  E('Cave or forest stop','A','nature','Select one substantial natural stop on the loop rather than overloading the road days.','2–4 hr','Low–mid','Check conditions')
 ]},
 {name:'Southern Islands',stay:'5–7',summary:'Keep one island block after the north and training period, choosing a base for swimming, snorkelling and recovery rather than trying to hop through multiple islands.',experiences:[
  E('Island slow stay','S','slow','Stay long enough to have weather flexibility and at least one day with no tour or transfer.','3+ days','Low–mid'),
  E('Snorkelling day','S','nature','Choose a small-boat trip when visibility and sea conditions are good; avoid forcing it into a poor-weather day.','Half/full day','Mid','Book locally',{flags:['SEA CONDITIONS']}),
  E('Local fishing village / market','A','local','Make time for the lived-in side of the island rather than remaining entirely inside a resort strip.','1–2 hr','Low'),
  E('Sunrise or sunset walk','A','slow','Simple free time on the coast is part of the point of adding the islands at all.','1 hr','Free')
 ]},
 {name:'TESOL Training',stay:'~1 month',summary:'The fixed Thailand training block before Central Asia and the later Cambodia teaching placement.',experiences:[
  E('TESOL training block','S+','fixed','Complete the one-month training commitment while keeping travel expectations deliberately low.','~1 month','Fixed programme cost','Fixed',{flags:['FIXED COMMITMENT']}),
  E('One local neighbourhood routine','A','local','Pick a nearby market, café or food street and return regularly so the training month still develops a sense of place.','Ongoing','Low'),
  E('Weekly content/admin reset','A','practical','Use one predictable block each week for backups, editing, laundry and onward Central Asia logistics.','2–4 hr weekly','Low')
 ]}
];

DATA.destinations.kazakhstan=[
 {name:'Almaty',stay:'3',summary:'Kazakhstan’s largest city is the practical and cultural base for the southeastern mountain circuit, with excellent food, markets and easy access to the Trans-Ili Alatau.',experiences:[
  E('Green Bazaar and food hall crawl','S','food','Browse fruit, nuts, dairy, meat and prepared foods, then use the surrounding streets for a first taste of Kazakh and Central Asian food.','2–3 hr','Low'),
  E('Panfilov Park and Zenkov Cathedral','A','history','Walk the central park and colourful wooden cathedral as an easy introduction to the city’s Russian-imperial and Soviet layers.','1–2 hr','Low'),
  E('Kok Tobe or city viewpoint','A','viewpoint','Get above the city once for perspective on how abruptly the mountains rise behind Almaty.','1–2 hr','Low–mid'),
  E('Kazakh food dinner','S','food','Try dishes such as beshbarmak, manty and baursak in a place locals actually use, not only a tourist show restaurant.','1–2 hr','Low–mid'),
  E('Medeu / Shymbulak mountain day','S','nature','Head into the mountains directly from the city for high-altitude scenery and hiking without committing to a remote multi-day trek.','Half/full day','Mid','Weather dependent',{flags:['WEATHER CHECK']})
 ]},
 {name:'Charyn Canyon',stay:'1',summary:'A striking desert canyon east of Almaty that contrasts sharply with the alpine landscapes elsewhere on the circuit.',experiences:[
  E('Valley of Castles walk','S+','landscape','Walk down through Charyn’s sculpted red-rock formations, ideally outside the harshest midday heat and light.','2–4 hr','Low–mid','Transport plan',{flags:['HEAT/WEATHER CHECK']}),
  E('Charyn viewpoint stops','A','viewpoint','Use the upper rim viewpoints before or after the canyon walk to understand the scale of the landscape.','30–60 min','Included'),
  E('Sunset or late-afternoon canyon light','S','landscape','If transport timing allows, stay into softer light rather than arriving only at midday.','1 hr','Included','Transport dependent')
 ]},
 {name:'Saty / Kolsai Lakes',stay:'2–3',summary:'Saty is the practical village base for Kolsai and Kaindy, allowing the lake days to be slower than an exhausting out-and-back from Almaty.',experiences:[
  E('Kolsai Lake 1','S+','nature','Walk the shoreline and surrounding trails of the first alpine lake, leaving enough time to enjoy the forest and mountains rather than turning around immediately.','Half day','Low–mid','Transport required'),
  E('Kolsai hike toward Lake 2','S+','active','Hike deeper into the Kolsai system if trail and weather conditions suit your fitness and available time.','Full day','Low–mid','Weather dependent',{flags:['WEATHER CHECK']}),
  E('Saty homestay','S','local','Stay in the village instead of commuting from Almaty, eating home-cooked food and using local drivers for the lakes.','Overnight','Low–mid','Book ahead in peak period'),
  E('Village evening and slow morning','A','slow','Give the trip some breathing room between lake days rather than stacking long drives back-to-back.','Flexible','Low')
 ]},
 {name:'Kaindy Lake',stay:'1',summary:'A mountain lake famous for the trunks of a submerged spruce forest rising from cold turquoise water.',experiences:[
  E('Kaindy submerged forest','S+','nature','Walk around the lake and viewpoints to see the standing tree trunks created after a landslide dammed the valley in the early 20th century.','2–3 hr','Low–mid','4WD/local transport required'),
  E('Forest approach trail','A','active','Walk at least part of the approach rather than treating Kaindy as a quick vehicle stop.','1–2 hr','Included','No',{flags:['WEATHER CHECK']})
 ]},
 {name:'Altyn-Emel National Park',stay:'2',summary:'A vast desert-and-steppe park of colourful mountains, open landscapes and the famous Singing Dune, adding a completely different environment to southeastern Kazakhstan.',experiences:[
  E('Singing Dune','S','landscape','Climb the dune and listen for the low resonant sound that can occur as dry sand moves down the slope.','2–3 hr','Low–mid','Park transport/permit plan',{flags:['WEATHER CHECK']}),
  E('Aktau Mountains','S','landscape','Explore the striped badland formations and broad desert views, ideally with a local driver familiar with park roads.','Half day','Mid','4WD/permit plan'),
  E('Remote park overnight','A','slow','Stay within or near the park so the experience is not dominated by a huge same-day drive from Almaty.','Overnight','Mid','Advance planning')
 ]}
];

DATA.destinations.kyrgyzstan=[
 {name:'Bishkek',stay:'2',summary:'A practical arrival city for food, markets, money, SIMs and horse-trek preparation before heading into the mountains.',experiences:[
  E('Osh Bazaar','S','local','Browse produce, bread, dried fruit, spices and everyday goods while getting a first feel for Kyrgyz urban life.','1–2 hr','Low'),
  E('Kyrgyz food introduction','S','food','Try lagman, manty, plov, samsa and other regional staples before the more limited food options on remote trekking days.','1–2 hr','Low'),
  E('Soviet city walk','A','history','Walk Ala-Too Square and central boulevards for a compact introduction to the city’s Soviet urban fabric and post-independence identity.','1–2 hr','Free'),
  E('Horse-trek preparation day','A','practical','Use Bishkek for cash, snacks, weather layers, charging, laundry and final operator coordination before leaving town.','Half day','Variable')
 ]},
 {name:'Tian Shan horse trek',stay:'4–7',summary:'The Central Asia anchor: several days riding through mountain valleys and high summer pastures with a local operator, with horse welfare and helmets treated as non-negotiable selection criteria.',experiences:[
  E('Multi-day horse expedition','S+','adventure','Ride for several days through valleys, passes and jailoo landscapes rather than taking a short tourist loop. The route should be matched to your riding ability and weather.','4–7 days','High','Advance booking',{flags:['BOOK AHEAD','WEATHER CHECK']}),
  E('Jailoo yurt night','S+','local','Sleep in the high summer pasture landscape where herding families live seasonally, making the yurt part of the route rather than a staged photo stop.','Overnight','Included','With trek'),
  E('Mountain pass riding day','S','adventure','Include at least one substantial pass or high-valley day so the trek has a real sense of journey and progression.','Full day','Included','With trek',{flags:['WEATHER CHECK']}),
  E('Horse-care and welfare check','S','practical','Observe how the operator fits tack, manages rest, rotates horses and responds to lameness or fatigue. This is part of choosing the right trek, not background admin.','Ongoing','Included','Before payment'),
  E('Shared meals with local hosts','A','local','Use meals and overnight stops to learn about pastoral life, food and seasonal movement rather than treating the trip as scenery only.','Daily','Included')
 ]},
 {name:'Song-Köl',stay:'2–3',summary:'A high-altitude summer lake surrounded by jailoo, horses and yurt camps. The appeal is the open pastoral landscape and the absence of urban distraction.',experiences:[
  E('Song-Köl yurt stay','S+','local','Stay at least two nights if timing allows so the lake is more than a quick photo stop and you experience evening, night and morning on the plateau.','2 nights','Mid','Seasonal booking',{flags:['SEASON CHECK','WEATHER CHECK']}),
  E('Horse ride around the lake','S','adventure','Take a shorter ride only if it complements—rather than duplicates—the main multi-day horse trek.','1–3 hr','Low–mid','Book locally'),
  E('Kymyz and pastoral food','A','food','Try fermented mare’s milk and simple highland meals in context, without forcing yourself to like every traditional food.','Flexible','Low/included'),
  E('Night sky','S','slow','Stay outside after dark for the stars when skies are clear; the high plateau and low light pollution are part of Song-Köl’s appeal.','1 hr','Free','No',{flags:['WEATHER CHECK']})
 ]},
 {name:'Issyk-Kul / Bokonbaevo',stay:'2',summary:'The southern shore of Issyk-Kul gives access to semi-arid lake landscapes and traditional hunting culture without needing a long resort stay.',experiences:[
  E('Reputable eagle-hunting demonstration','S','culture','Meet an experienced berkutchi through a reputable local contact who explains the tradition, training and relationship with the bird instead of staging a costume-only photo session.','1–2 hr','Mid','Vet/book operator'),
  E('Issyk-Kul southern-shore swim','A','slow','Take a simple lake stop if the weather is warm enough; the huge alpine basin is worth experiencing at water level.','1–2 hr','Low','No',{flags:['WEATHER CHECK']}),
  E('Skazka / Fairytale Canyon','A','landscape','Walk through eroded red and ochre formations near the southern shore as a compact landscape stop between villages.','1–2 hr','Low','No',{flags:['WEATHER CHECK']})
 ]},
 {name:'Karakol',stay:'3',summary:'A multicultural mountain town and the strongest food stop on the eastern side of Issyk-Kul, with easy access to major trekking valleys.',experiences:[
  E('Dungan family dinner','S+','food','Eat a multi-course Dungan meal with cultural explanation, using food as an entry point into one of Karakol’s distinctive communities.','2–3 hr','Mid','Book ahead'),
  E('Karakol Sunday animal market','S','local','If the timing aligns, visit early to see a working regional livestock market rather than a tourist attraction.','1–2 hr','Low','Sunday only'),
  E('Dungan Mosque and Russian Orthodox Cathedral','A','culture','Pair the colourful mosque and wooden cathedral to see how different communities shaped Karakol.','1–2 hr','Low'),
  E('Ashlyan-fu lunch','S','food','Try Karakol’s cold, spicy Dungan noodle dish in a local market or simple café.','45 min','Low')
 ]},
 {name:'Altyn Arashan',stay:'1–2',summary:'A high mountain valley above Karakol known for alpine scenery and hot springs; keep it only if it complements rather than overloads the main horse-trek plan.',experiences:[
  E('Altyn Arashan valley hike/4WD access','A','active','Travel into the valley for mountain scenery, with the mode of access chosen around fitness, road conditions and time.','Full day / overnight','Mid','Plan locally',{flags:['ROAD CONDITIONS','WEATHER CHECK']}),
  E('Hot spring soak','A','slow','Use the springs as recovery after the approach rather than the sole reason to make the trip.','1 hr','Low–mid'),
  E('Valley overnight','A','slow','Stay overnight only if it adds breathing room and does not crowd the horse trek or friends’ fixed dates.','Overnight','Mid','Book if peak season')
 ]}
];

window.TC1_COUNTRY_CONTENT_VERSION='2026-09-10-content-v1';
window.TC1_EXPERIENCE_PHOTO_COMPLETE={laos:false,cambodia:false,thailand:false,kazakhstan:false,kyrgyzstan:false};
})();
