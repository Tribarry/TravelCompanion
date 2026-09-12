/* V0.21 live Vietnam data bridge
 * Production override: loads the canonical locked experience bank and replaces
 * the old generic Vietnam cards without disturbing the rest of the app.
 */
(() => {
  'use strict';
  const BANK_URL = 'docs/VIETNAM_LOCKED_EXPERIENCE_BANK_2027.md?v=20260909c';

  const CONTEXT = {
    'Ho Chi Minh City': 'Saigon grew from a river port into the commercial centre of southern Vietnam, shaped by Vietnamese, Chinese and French communities and later by war and rapid post-1975 growth. The result is a city where colonial landmarks, Chợ Lớn trading streets, wartime sites, temples, markets and hyper-modern districts sit almost on top of one another.',
    'Cái Bè / Tân Phong': 'Cái Bè developed around the Tiền River as a Mekong trading and orchard district. The surrounding islands and Đông Hòa Hiệp village preserve a landscape of canals, garden houses, fruit farms and small-scale food production, making the area much more interesting as an overnight rural stop than as a rushed floating-market tour.',
    'Sa Đéc': 'Sa Đéc developed as an important Mekong river-trading town and became a major commercial centre during the French colonial period. Its prosperity attracted Vietnamese, Chinese and French communities, leaving old merchant houses, temples and colonial architecture around the riverfront. The surrounding countryside later became famous for flower cultivation.',
    'Cần Thơ': 'Cần Thơ became the major commercial centre of the western Mekong Delta, where the Hậu River, canals and surrounding agricultural districts funnel produce and people toward the city. Cái Răng is its famous river market, but the deeper story is the network of tributaries, orchards, workshops and island communities surrounding it.',
    'Long Xuyên': 'Long Xuyên grew as a Hậu River trading town in An Giang. Compared with Cần Thơ, its floating-market and island life remain much less performative, with local ferries, fish farms and the rural community of Mỹ Hòa Hưng giving a better sense of an ordinary working Delta city.',
    'Châu Đốc / Núi Sam': 'Châu Đốc grew as a Mekong trading and border town near Cambodia, shaped by Vietnamese, Khmer, Cham and Chinese communities. The Seven Mountains form an important spiritual landscape, while the Hậu River supports fish farms, markets and Cham Muslim villages. That mix explains the city’s distinctive pilgrimage culture and food.',
    'Trà Sư': 'Trà Sư protects a flooded cajuput-forest ecosystem in An Giang near the Cambodian frontier. Its character changes strongly with the seasons: the wet months create the famous green flooded channels, while the dry season is better understood through birdlife, forest ecology and the wider Seven Mountains landscape.',
    'Tịnh Biên / Tri Tôn': 'The Seven Mountains rise abruptly from an otherwise flat Mekong landscape. This is Khmer-influenced border country where pilgrimage peaks, pagodas, rice fields, sugar palms and small villages create one of the Delta’s most distinctive cultural and geographic transitions.',
    'Hà Tiên': 'Hà Tiên grew as a frontier trading port facing the Gulf of Thailand and Cambodia. The Mạc family shaped the town from the early 18th century, leaving temples, tombs and the literary tradition of the Ten Landscapes, while limestone hills and islands give the region a geography unlike most of the Delta.',
    'Kiên Lương': 'Kiên Lương sits within a rare limestone and coastal landscape between Hà Tiên and Rạch Giá. Karst hills, caves, fishing villages and small Gulf islands make this less a conventional town stop than a rural corridor where geology and working coastal life are the attraction.',
    'Rạch Giá': 'Rạch Giá developed as a Gulf port and commercial centre for Kiên Giang. Its harbour still connects the mainland to Phú Quốc, Nam Du and other islands, while the city itself is best understood through its seafood markets, waterfront, temples and the story of Nguyễn Trung Trực.',
    'Bến Tre': 'Bến Tre is the heart of Vietnam’s coconut country, a low-lying landscape of islands, ferries, orchards and narrow canals. The province was also a major centre of the Đồng Khởi movement in 1960, so its quiet agricultural landscape sits over a significant layer of modern Vietnamese history.',
    'Trà Vinh': 'Trà Vinh lies in a region with a large Khmer Krom population alongside Kinh Vietnamese and Chinese communities. Khmer Buddhist temples, scripts, sculpture, performance and food remain unusually visible in daily life, making this one of the strongest places on the route for understanding Khmer culture before Cambodia.',
    'Vĩnh Long / Mang Thít': 'Vĩnh Long developed as a Mekong agricultural and river-trading centre surrounded by fertile islands. Nearby Mang Thít became one of southern Vietnam’s great brick-and-pottery districts, leaving a remarkable landscape of terracotta kilns along canals that once carried clay, bricks and ceramics throughout the region.',
    'Phú Quốc': 'Phú Quốc grew around fishing, fish-sauce production and agriculture, particularly pepper. Its fish-sauce tradition stretches back more than two centuries, while the island also carries the history of Cây Dừa prison and a large protected forest and marine landscape.',
    'Côn Đảo': 'The French established the Côn Đảo penal colony in 1862, beginning more than a century in which the islands were dominated by prisons. Today that history sits beside national-park forest, coral reefs and major sea-turtle habitat, producing an unusually intense mix of memory, pilgrimage and nature.',
    'Vũng Tàu': 'Vũng Tàu developed as a port and seaside retreat on the peninsula guarding the maritime approach to Saigon. French batteries, a lighthouse and villas share the hills with later Catholic and Buddhist landmarks, creating a strange combination of fortified port, pilgrimage centre and beach town.',
    'Đồng Xoài / Bình Phước': 'The red basalt soils of the former Bình Phước region made it one of Vietnam’s major rubber and cashew areas. French plantations, S’tiêng and M’nông communities, and the wartime route toward Cambodia all shaped the landscape now crossed by the road north into the Central Highlands.',
    'Gia Nghĩa / Đắk Nông': 'Đắk Nông sits on ancient volcanic country at the southwestern edge of the Central Highlands. Basalt soils support coffee and pepper, while volcanic craters and one of Southeast Asia’s most extensive lava-tube systems reveal a much older geological story beneath M’nông, Mạ and other highland communities.',
    'Đà Lạt': 'The Lạch and K’Ho lived around the Langbiang Plateau long before the modern city. Alexandre Yersin reached the plateau in 1893 and in 1897 proposed it as a French highland retreat. Colonial planning, villas, railway architecture and cool-climate agriculture subsequently shaped the Đà Lạt seen today.',
    'Buôn Ma Thuột / Đắk Lắk': 'Buôn Ma Thuột began as an Ê Đê Kpă settlement associated with Ama Thuột. The French made it an administrative centre in 1904 and expanded coffee cultivation across the basalt plateau from the early 20th century, helping turn the city into the economic centre of the Central Highlands.',
    'Pleiku / Gia Lai': 'Pleiku began as a Jrai settlement on a volcanic plateau. The French established an administrative post in 1925 and formally created the town in 1929. Ancient crater lakes, extinct cones, coffee country and Jrai villages still sit immediately around the modern city.',
    'Kon Tum': 'Kon Tum developed from Bahnar settlements beside the Đăk Bla River. Nineteenth-century trading routes carrying salt, pottery and gongs also brought Catholic missionaries into the highlands, leaving the city with an unusual combination of Bahnar communal architecture and wooden Catholic buildings.',
    'Măng Đen': 'Măng Đen sits about 1,200 metres above sea level in the Trường Sơn highlands. Xơ Đăng, M’Nâm and other communities long occupied this forested plateau; French surveys later imagined a cool-climate retreat, but development remained limited enough that villages, medicinal plants, pine forest, lakes and waterfalls still define it.',
    'Khâm Đức / Phước Sơn': 'Khâm Đức lies deep in the Trường Sơn on the Hồ Chí Minh Road in Bh’noong country. During the Vietnam War it became a Special Forces base, and the May 1968 fighting at Ngok Tavak and Khâm Đức ended in a dramatic air evacuation from the mountain airfield.',
    'Prao / Đông Giang': 'Prao is the practical gateway into Cơ Tu country rather than the main attraction itself. Villages across the eastern Trường Sơn centre social and ceremonial life on the Gươl communal house, with wood carving, weaving, gong music, palm wine and upland agriculture remaining important cultural threads.',
    'A Lưới / A Shau Valley': 'A Lưới lies in the mountains west of Huế near Laos, home to Tà Ôi, Pa Cô, Pa Hy, Cơ Tu and Bru-Vân Kiều communities. During the war the A Shau Valley became strategically important because routes linked to the Hồ Chí Minh Trail crossed this remote border landscape.',
    'Khe Sanh': 'Khe Sanh sits on a red-basalt plateau close to Laos and Route 9. Internationally it is associated with the enormous 1968 battle, but coffee has been cultivated here since 1926, giving the modern town a second identity as a highland Arabica-growing district.',
    'Western Ho Chi Minh Road': 'The western Hồ Chí Minh Road crosses some of Vietnam’s most isolated Trường Sơn country. The modern paved route passes through landscapes once used by the far larger wartime supply network of roads, tracks, bridges, depots and pipelines running through Vietnam and Laos.',
    'Quy Nhơn': 'Modern Quy Nhơn sits in the heartland of the former Champa kingdom of Vijaya, whose capital fell to Đại Việt in 1471. Bình Định later became the homeland of the Tây Sơn movement and one of Vietnam’s strongest traditional martial-arts regions, giving the coast far more depth than its beaches alone suggest.',
    'Phú Yên / Tuy Hòa': 'Phú Yên’s south-central coast was shaped by ancient volcanic activity, leaving basalt columns, rocky headlands and offshore formations beside fishing villages and lagoons. The region also played a role in the wartime Hồ Chí Minh Sea Trail, linking its spectacular coast to a less obvious layer of history.',
    'Nha Trang': 'Nha Trang sits in old Champa territory around one of Vietnam’s major natural bays. Pô Nagar preserves the Cham religious layer, while fishing, swiftlet-nest harvesting and later recreational diving shaped a modern coastal city whose most interesting stories are still tied to the sea.',
    'Hội An': 'Hội An flourished as an international trading port from roughly the 15th to 19th centuries, drawing Vietnamese, Chinese, Japanese and European merchants. Merchant houses, assembly halls, temples, street patterns and surrounding craft villages preserve that trading history unusually well.',
    'Đà Nẵng': 'Đà Nẵng grew into a major central-Vietnam port, particularly after French forces landed here in 1858. The modern city now spreads between the Hàn River and the sea, but older Cham, Buddhist, fishing and craft landscapes survive around Sơn Trà, Marble Mountains and Nam Ô.',
    'Hải Vân / Lăng Cô': 'The Hải Vân ridge is where the Trường Sơn mountains meet the sea, creating a climatic and strategic divide between Đà Nẵng and Huế. For centuries the pass controlled the north–south route, and the restored Hải Vân Gate still marks that historic choke point above Lăng Cô and Lập An Lagoon.',
    'Huế': 'Gia Long established Huế as the capital of unified Vietnam in 1802. The Nguyễn emperors ruled from here until 1945, leaving the Citadel, royal tombs, ritual sites, court music, crafts and highly distinctive cuisine that still make the city Vietnam’s strongest surviving imperial landscape.',
    'Bạch Mã': 'Bạch Mã rises sharply between Huế and Đà Nẵng. The French developed the mountain as a hill station in the 1930s, building villas and roads in the cool forest. Today ruined colonial structures sit inside a highly biodiverse national park of peaks, lakes and waterfalls.',
    'Phong Nha / Quảng Bình': 'Phong Nha-Kẻ Bàng protects one of the world’s great limestone-karst landscapes. Underground rivers and enormous cave systems developed inside the massif over millions of years, while the surrounding valleys also carry the history of the Hồ Chí Minh Trail and wartime transport routes.',
    'Ninh Bình': 'Ninh Bình contains Hoa Lư, the political centre of Vietnam’s first unified dynasties in the 10th century. Temples and former-capital sites now sit among flooded limestone karsts, caves, wetlands and rice fields, making the landscape itself part of the historical story.',
    'Pù Luông': 'Pù Luông is a mountainous landscape of Thai and Mường villages, limestone forest and terraced valleys. It is best understood through village-to-village movement, water-wheel agriculture, stilt-house stays and the seasonal rhythm of rice cultivation rather than conventional sightseeing.',
    'Hà Nội': 'Thăng Long became the Vietnamese capital in 1010 under the Lý dynasty. More than a thousand years of imperial, colonial, revolutionary and modern history now overlap around Hanoi’s lakes, temples, prisons, markets, bridges and street-food neighbourhoods.',
    'Hạ Long / Lan Hạ Bay': 'Hạ Long and Lan Hạ are drowned limestone-karst landscapes where thousands of towers and islands rise from the Gulf of Tonkin. The wider Hạ Long–Cát Bà system is recognised for both geology and biodiversity, while fishing communities have long used its protected waters.',
    'Cát Bà': 'Cát Bà is the largest island in the Hạ Long–Lan Hạ archipelago. Forest, limestone caves, fishing villages and wartime sites such as Hospital Cave sit within a landscape that works best by combining hiking, cycling and small-boat exploration.',
    'Ba Bể': 'Ba Bể lies inside limestone mountains inhabited largely by Tày communities. Three connected lake basins form one of northern Vietnam’s major natural freshwater systems, surrounded by caves, forest, waterfalls and stilt-house villages.',
    'Cao Bằng': 'Cao Bằng is a mountainous border province shaped by karst valleys, Tày and Nùng communities and revolutionary history. Bản Giốc, Pác Bó, stone villages and remote farming valleys make the province far more than a single waterfall stop.',
    'Hà Giang Loop': 'Hà Giang crosses the Đồng Văn Karst Plateau, a high limestone landscape shaped by H’Mông, Dao, Tày, Nùng and other communities. Mountain passes, former royal compounds, markets and border settlements make the loop as culturally dense as it is visually dramatic.',
    'Hoàng Su Phì': 'Hoàng Su Phì’s steep mountains have been terraced over generations by Dao, Nùng, H’Mông, La Chí and other communities. Ancient Shan Tuyết tea, village agriculture and long footpaths make this a slower, more community-based counterpoint to the famous road loops.',
    'Mù Cang Chải': 'Mù Cang Chải is a high mountain district where H’Mông communities have engineered spectacular rice terraces across steep valleys. Khau Phạ Pass, Tú Lệ and the terrace villages make the road, farming landscape and seasonal agriculture inseparable parts of the experience.',
    'Y Tý': 'Y Tý sits around 2,000 metres near the Chinese border and is strongly associated with Hà Nhì communities. Thick earthen houses, fog, cloud inversions, terraces and remote mountain roads reflect a colder border environment quite different from the lower valleys.',
    'Bắc Hà': 'Bắc Hà is a highland market centre surrounded by Flower H’Mông and other communities. Its Sunday market, Hoàng A Tưởng Palace, horse culture and Bản Phố corn-wine villages reveal both the trading role of the town and the agricultural life of the surrounding hills.',
    'Sa Pa': 'Sa Pa developed as a French hill station in the early 20th century within a much older H’Mông, Red Dao, Giáy and other highland landscape. The town is heavily touristed, but the surrounding valleys, village trails, herbal traditions and mountain passes remain the real reason to stop.',
    'Hà Nội Return': 'This is intentionally not another sightseeing stop. The return to Hanoi is a practical reset before the next country: laundry, backups, editing, favourite food repeats, missing passport stamps and onward transport.'
  };

  const ALIAS = {
    'Ho Chi Minh City':'Ho Chi Minh City','Cái Bè / Tân Phong':'Cái Bè / Tân Phong','Sa Đéc':'Sa Đéc','Cần Thơ':'Cần Thơ','Long Xuyên':'Long Xuyên','Châu Đốc / Núi Sam':'Châu Đốc','Trà Sư':'Trà Sư','Tịnh Biên / Tri Tôn':'Tịnh Biên / Tri Tôn / Seven Mountains','Hà Tiên':'Hà Tiên','Kiên Lương':'Kiên Lương','Rạch Giá':'Rạch Giá + Nam Du','Vĩnh Long / Mang Thít':'Vĩnh Long / Mang Thít','Phú Quốc':'Phú Quốc','Côn Đảo':'Côn Đảo','Vũng Tàu':'Vũng Tàu','Đồng Xoài / Bình Phước':'Đồng Xoài / Bình Phước corridor','Gia Nghĩa / Đắk Nông':'Gia Nghĩa / Đắk Nông','Đà Lạt':'Đà Lạt','Buôn Ma Thuột / Đắk Lắk':'Đắk Lắk / Buôn Ma Thuột / Lắk / Yok Đôn','Yok Đôn / Buôn Đôn':'Đắk Lắk / Buôn Ma Thuột / Lắk / Yok Đôn','Lắk Lake':'Đắk Lắk / Buôn Ma Thuột / Lắk / Yok Đôn','Pleiku / Gia Lai':'Pleiku / Gia Lai','Kon Tum':'Kon Tum','Măng Đen':'Măng Đen','Khâm Đức / Phước Sơn':'Khâm Đức / Phước Sơn','Prao / Đông Giang':'Prao / Cơ Tu country','A Lưới / A Shau Valley':'A Lưới / A Shau Valley','Khe Sanh':'Khe Sanh / Hướng Hóa','Western Ho Chi Minh Road':'Western Hồ Chí Minh Road','Quy Nhơn':'Quy Nhơn / Bình Định','Phú Yên / Tuy Hòa':'Phú Yên','Nha Trang':'Nha Trang / Khánh Hòa','Hội An':'Hội An','Đà Nẵng':'Đà Nẵng','Hải Vân / Lăng Cô':'Hải Vân Pass / Lăng Cô','Huế':'Huế','Bạch Mã':'Bạch Mã','Phong Nha / Quảng Bình':'Phong Nha / Quảng Bình','Ninh Bình':'Ninh Bình','Pù Luông':'Pù Luông','Hà Nội':'Hà Nội','Hạ Long / Lan Hạ Bay':'Hạ Long / Lan Hạ','Cát Bà':'Cát Bà','Ba Bể':'Ba Bể','Cao Bằng':'Cao Bằng','Hà Giang Loop':'Hà Giang Loop','Hoàng Su Phì':'Hoàng Su Phì','Mù Cang Chải':'Mù Cang Chải','Y Tý':'Y Tý','Bắc Hà':'Bắc Hà','Sa Pa':'Sa Pa','Hà Nội Return':'Hà Nội Return'
  };

  function clean(s){return (s||'').replace(/\*\*/g,'').replace(/`/g,'').replace(/\s+/g,' ').trim().replace(/[.]+$/,'');}
  function sentenceTitle(s){
    const t=clean(s);if(!t)return'';
    return t.charAt(0).toLocaleUpperCase('vi-VN')+t.slice(1);
  }
  function canonicalHeading(raw){return clean(raw).replace(/\s+—\s+LOCKED.*$/,'').trim();}
  function parseSections(md){
    const out={}; let current=null;
    for(const line of md.split(/\r?\n/)){
      const m=line.match(/^##\s+(.+?)\s+—\s+LOCKED(?:.*)?$/);
      if(m){current=canonicalHeading(m[1]+' — LOCKED');out[current]=[];continue;}
      if(/^#{1,2}\s+/.test(line)){current=null;continue;}
      if(current && line.trim()) out[current].push(line.trim());
    }
    return Object.fromEntries(Object.entries(out).map(([k,v])=>[k,v.join(' ')]));
  }
  function tagFor(text){
    const t=text.toLowerCase(), tags=[];
    if(/must|absolute|s\+|s\+\+|s\+\+\+|life-list/.test(t)) tags.push('Must Do');
    if(/food:|eat|dish|rice|noodle|bún|bánh|seafood|fish|crab|pork|chicken|salad|soup|hotpot|oyster|snail|cake/.test(t)) tags.push('Food');
    if(/drink|coffee|wine|rượu|tea|juice|coconut|sap/.test(t)) tags.push('Drink');
    if(/history|prison|battle|war|temple|pagoda|museum|palace|tomb|citadel|colonial|trail|airfield|memorial/.test(t)) tags.push('History');
    if(/village|community|weav|gong|dance|artisan|craft|homestay|household|festival|culture|monk|market/.test(t)) tags.push('Culture','Local Life');
    if(/wtf|frog|cicada|ant|mouse|worm|bile|crab on|lava|volcano|inside|low-tide|03:00|secret|weird|odd/.test(t)) tags.push('Unique');
    if(/island|waterfall|forest|lake|trek|hike|boat|kayak|snork|dive|beach|mountain|cave|river|cycling|road/.test(t)) tags.push('Outdoors');
    if(/book ahead|book\/arrange|guide|arrange ahead|long-lead/.test(t)) tags.push('Book Ahead');
    if(/date watch|watch 2027|festival.*watch/.test(t)) tags.push('Date Watch');
    if(/access check|uxo|border|tide check|weather|sea conditions|season check|verify/.test(t)) tags.push('Check');
    if(!tags.length) tags.push('Local Life');
    return [...new Set(tags)].slice(0,5);
  }
  function titleSummary(raw,dest){
    let text=clean(raw), title=text, summary='Locked during the destination deep-research pass for '+dest+'.';
    const dash=text.split(/\s+[—–]\s+/); if(dash.length>1){title=dash.shift();summary=dash.join(' — ');}
    else if(text.includes(':') && text.indexOf(':')<65){const p=text.split(':');title=p.shift();summary=p.join(':').trim()||summary;}
    else if(text.length>95){const cut=text.lastIndexOf(' ',78);title=text.slice(0,cut>30?cut:78)+'…';summary=text;}
    return {title:clean(title),summary:clean(summary)};
  }
  function explode(raw,dest){
    const text=clean(raw).replace(/\.\s+(Drinks?|Food\/WTF|Food|Drink):/g,'; $1:').replace(/\.\s+(Keep|Avoid|Commercial|Current)/g,'; $1');
    const chunks=text.split(/\s*;\s*/).map(clean).filter(Boolean); const items=[];
    for(const chunk of chunks){
      const m=chunk.match(/^(Food\/WTF|Food|Drinks?|Drink):\s*(.+)$/i);
      if(m){
        const kind=/drink/i.test(m[1])?'Drink':'Food';
        m[2].split(/,\s+(?![^()]*\))/).map(clean).filter(Boolean).forEach(v=>items.push({raw:v,title:sentenceTitle(v),summary:'Part of the locked '+kind.toLowerCase()+' passport for '+dest+'.',tags:[kind,'Local Life']}));
      } else {
        const ts=titleSummary(chunk,dest); items.push({raw:chunk,title:sentenceTitle(ts.title),summary:ts.summary,tags:tagFor(chunk)});
      }
    }
    return items.filter((x,i,a)=>x.title && a.findIndex(y=>y.title.toLowerCase()===x.title.toLowerCase())===i);
  }
  function toExperience(it,i){
    const flags=[]; const r=it.raw.toLowerCase();
    if(/book ahead|book\/arrange|long-lead/.test(r))flags.push('BOOK AHEAD');
    if(/date watch|watch 2027/.test(r))flags.push('DATE WATCH');
    if(/access check|verify/.test(r))flags.push('ACCESS CHECK');
    if(/uxo/.test(r))flags.push('UXO');
    if(/tide/.test(r))flags.push('TIDE CHECK');
    if(/weather/.test(r))flags.push('WEATHER CHECK');
    if(/sea conditions/.test(r))flags.push('SEA CONDITIONS');
    if(/border/.test(r))flags.push('BORDER AREA');
    const must=it.tags.includes('Must Do');
    return {name:it.title,tier:must?'S+':(it.tags.includes('Unique')?'S':'A'),type:it.tags[0]||'experience',summary:it.summary,booking:flags.includes('BOOK AHEAD')?'Book ahead':(flags.length?'Check before going':'No advance booking noted'),content:it.tags.includes('Unique')||must?'Very high':'High',tags:it.tags,flags,id:'live-'+i};
  }
  function splitHighlands(items,name){
    if(name==='Lắk Lake') return items.filter(x=>/lắk|buôn jun|m’liêng|m'nông|dugout|mother elephant rock/i.test(x.raw));
    if(name==='Yok Đôn / Buôn Đôn') return items.filter(x=>/yok|buôn đôn|elephant|mahout|sêrêpốk|ferry/i.test(x.raw));
    if(name==='Buôn Ma Thuột / Đắk Lắk') return items.filter(x=>!/lắk lake|buôn jun|m’liêng|dugout|yok|buôn đôn|elephant|mahout/i.test(x.raw));
    return items;
  }
  function applySection(d,sections){
    const key=ALIAS[d.name]||d.name, raw=sections[key]; if(!raw)return;
    let items=explode(raw,d.name); items=splitHighlands(items,d.name); if(items.length<3)items=explode(raw,d.name);
    d.experiences=items.map(toExperience); d.context=CONTEXT[d.name]||CONTEXT[key]||d.summary; d.summary=d.context;
    const food=d.experiences.filter(e=>e.tags.includes('Food')).map(e=>e.name);
    const drink=d.experiences.filter(e=>e.tags.includes('Drink')).map(e=>e.name);
    const unique=d.experiences.find(e=>e.tags.includes('Unique'));
    d.orientation={comeFor:d.experiences.slice(0,2).map(e=>e.name).join(' + '),doDifferently:(d.experiences.find(e=>e.tags.includes('Local Life')||e.tags.includes('Culture'))||d.experiences[2]||d.experiences[0]).name,eat:food.slice(0,2).join(' · ')||'Local food passport',wtf:unique?unique.name:'Find the distinctly local experience',pace:d.stay||'Flexible'};
  }
  function insertDestination(list,name,afterName,sectionKey,sections,stay='2–3',manualItems=null){
    if(list.some(d=>d.name===name))return;
    const d={name,stay,summary:CONTEXT[name]||'',experiences:[]};
    if(manualItems){d.experiences=manualItems.map((s,i)=>toExperience({...titleSummary(s,name),raw:s,tags:tagFor(s)},i));d.context=CONTEXT[name]||d.summary;d.summary=d.context;}
    else {ALIAS[name]=sectionKey;applySection(d,sections);}
    const idx=list.findIndex(x=>x.name===afterName); list.splice(idx>=0?idx+1:list.length,0,d);
  }
  function fixCoordsAndWiki(){
    if(!Array.isArray(VIETNAM_COORDS)||!DEST_WIKI?.vietnam)return;
    const coords={
      'Bến Tre':[10.2434,106.3756],'Trà Vinh':[9.9347,106.3453],'Nam Du Islands':[9.681,104.354],'Vũng Tàu':[10.4114,107.1362],'Hang Én':[17.48,106.29],'Pygmy / Hung Thoong':[17.45,106.25],'Sơn Đoòng':[17.456,106.287],'Hà Nội Return':[21.0285,105.8542]
    };
    const wiki={'Bến Tre':'Bến Tre','Trà Vinh':'Trà Vinh','Nam Du Islands':'Nam Du','Vũng Tàu':'Vũng Tàu','Hang Én':'Hang Én','Pygmy / Hung Thoong':'Phong Nha-Kẻ Bàng National Park','Sơn Đoòng':'Sơn Đoòng Cave','Hà Nội Return':'Hanoi'};
    const oldCoords=new Map(); DATA.destinations.vietnam.forEach((d,i)=>{if(VIETNAM_COORDS[i])oldCoords.set(d.name,VIETNAM_COORDS[i])});
    const oldWiki=new Map(); DATA.destinations.vietnam.forEach((d,i)=>{if(DEST_WIKI.vietnam[i])oldWiki.set(d.name,DEST_WIKI.vietnam[i])});
    VIETNAM_COORDS.splice(0,VIETNAM_COORDS.length,...DATA.destinations.vietnam.map(d=>coords[d.name]||oldCoords.get(d.name)||[16,107]));
    DEST_WIKI.vietnam.splice(0,DEST_WIKI.vietnam.length,...DATA.destinations.vietnam.map(d=>wiki[d.name]||oldWiki.get(d.name)||d.name));
  }

  const READY=(async()=>{
    const res=await fetch(BANK_URL,{cache:'no-store'}); if(!res.ok)throw new Error('Could not load Vietnam locked bank');
    const sections=parseSections(await res.text()); const list=DATA.destinations.vietnam;
    const oldVL=list.find(d=>d.name==='Vĩnh Long / Bến Tre'); if(oldVL)oldVL.name='Vĩnh Long / Mang Thít';
    insertDestination(list,'Bến Tre','Rạch Giá','Bến Tre',sections,'2–3');
    insertDestination(list,'Trà Vinh','Bến Tre','Trà Vinh',sections,'2–3');
    insertDestination(list,'Nam Du Islands','Rạch Giá','Rạch Giá + Nam Du',sections,'2–3',['Island loop and quiet beaches','Fishing villages and working island life','Snorkelling around the archipelago','Seafood from the day’s catch','Fishing or shellfish experience with locals where available','Overnight on the islands']);
    insertDestination(list,'Vũng Tàu','Côn Đảo','Vũng Tàu',sections,'2');
    insertDestination(list,'Hang Én','Phong Nha / Quảng Bình','Cave expeditions',sections,'2',['Hang Én jungle approach','Enter the giant cave and underground river','Camp inside Hang Én — MUST DO / BOOK AHEAD','Wake to natural light entering the cave']);
    insertDestination(list,'Pygmy / Hung Thoong','Hang Én','Cave expeditions',sections,'2–3',['Pygmy / Hung Thoong remote jungle expedition — BOOK AHEAD','Rope and caving components with specialist operator','Expedition camping','Underground river and cave environment']);
    insertDestination(list,'Sơn Đoòng','Pygmy / Hung Thoong','Cave expeditions',sections,'4+',['Sơn Đoòng multi-day expedition — LIFE-LIST / LONG-LEAD BOOKING','Enormous cave passages and underground river','Dolines and underground jungle','Expedition cave camping']);
    insertDestination(list,'Hà Nội Return','Sa Pa','Hà Nội Return',sections,'1–2');
    list.forEach(d=>applySection(d,sections));
    // Preserve Bạc Liêu/Ghositaram even though it is not a separate heading in the locked bank.
    const bac=list.find(d=>d.name==='Bạc Liêu'); if(bac){bac.context='Bạc Liêu sits in the southern Mekong Delta where Kinh, Khmer and Chinese influences overlap. Ghositaram Temple is the key reason it remains in this route: an unusually ornate Khmer Buddhist complex that connects the Delta’s Khmer heritage with the cultural thread continuing into Trà Vinh and Cambodia.';bac.summary=bac.context;}
    const nha=list.find(d=>d.name==='Nha Trang'); if(nha)nha.stay='5';
    DATA.version='0.21-live'; const vnCountry=DATA.countries.find(c=>c.id==='vietnam'); if(vnCountry)vnCountry.subtitle='Locked experience bank · duration optimisation pending';
    fixCoordsAndWiki(); return true;
  })().catch(err=>{console.error('V0.21 live bank:',err);return false});
  window.VN_LIVE_READY=READY;

  const style=document.createElement('style');style.textContent=`
    .vnContext{background:#fffaf1;border:1px solid var(--line);border-radius:18px;padding:16px;margin:15px 0}.vnContext h2{margin:0 0 7px!important}.vnContext p{margin:0;color:#34413d;line-height:1.5}.vnOrient{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0}.vnOrient div{background:#eee4d5;border-radius:12px;padding:10px;font-size:11px}.vnOrient b{display:block;font-size:9px;letter-spacing:.08em;margin-bottom:4px;color:#68726e}.liveFlag{display:inline-block;border-radius:999px;padding:4px 7px;margin:3px 3px 0 0;background:#f2ddc7;font-size:8px;font-weight:900}.liveFlag.book{background:#10372f;color:#fff}.vnPhotoVerify{display:grid;place-items:center;background:linear-gradient(135deg,#173d34,#315d52);color:#fff;text-align:center;font-size:10px;font-weight:900;padding:8px}.vnResultPhoto.vnPhotoVerify:after{content:'PHOTO TO VERIFY'}.vnLiveNav{position:fixed;z-index:900;bottom:0;left:0;right:0;padding:7px 8px calc(7px + env(safe-area-inset-bottom));background:#fffdf8f5;border-top:1px solid #ddd3c3;display:grid;grid-template-columns:repeat(4,1fr)}.vnLiveNav button{border:0;background:none;font-size:18px}.vnLiveNav span{display:block;font-size:10px;margin-top:3px}.vnLiveNav .active{color:#0d5549;font-weight:900}@media(max-width:390px){.vnOrient{grid-template-columns:1fr}.vnHubHero{min-height:70vh}}
  `;document.head.appendChild(style);

  function liveKey(x,it){return 'vn-live-'+vnSlug(x.d.name)+'-'+it.id;}
  vnBaseItems=function(x){return (x.d.experiences||[]).map((e,i)=>({id:e.id||'live-'+i,title:e.name,summary:e.summary||'',tags:e.tags||tagFor(e.name),flags:e.flags||[],tier:e.tier||'A'}));};
  vnSavedKey=function(x,it){return liveKey(x,it);};
  function liveBottom(active){return `<nav class="vnLiveNav"><button class="${active==='overview'?'active':''}" data-vln="overview">⌂<span>Overview</span></button><button class="${active==='experiences'?'active':''}" data-vln="experiences">✦<span>Experiences</span></button><button data-vln="map">♧<span>Map</span></button><button class="${active==='saved'?'active':''}" data-vln="saved">♡<span>My List</span></button></nav>`;}
  function wireLiveNav(){document.querySelectorAll('[data-vln]').forEach(b=>b.onclick=()=>({overview:vnHub,experiences:()=>vnExperiences('All'),map:vietnamMapPage,saved:()=>vnExperiences('Saved')}[b.dataset.vln]||vnHub)());}
  function flagHtml(it){return (it.flags||[]).map(f=>`<span class="liveFlag ${f==='BOOK AHEAD'?'book':''}">${f}</span>`).join('');}

  vnHub=async function(){
    await READY; const x=vnStop(); if(!x)return home(); nav.hidden=true;nav.style.display='none';
    const items=vnBaseItems(x),done=items.filter(it=>state.done[liveKey(x,it)]).length,saved=items.filter(it=>state.saved&&state.saved[liveKey(x,it)]).length,pct=items.length?Math.round(done/items.length*100):0;
    const next=DATA.destinations.vietnam[x.i+1]; const o=x.d.orientation||{};
    app.innerHTML=`<div><section class="vnHubHero vnFallback" data-vnimg="${x.d.name}" data-label="${x.d.name}"><button class="circleBtn" id="vnBack" style="position:absolute;top:18px;left:16px">‹</button><div class="eyebrow">🇻🇳 VIETNAM · V0.21 LOCKED BANK</div><h1>${x.d.name}</h1><p>${x.d.context||x.d.summary||''}</p><div class="vnFacts"><span>${items.length} SAVED EXPERIENCES</span><span>${x.d.stay||'Flexible'} DAYS FOR NOW</span><span>OPTIMISE LATER</span></div><button class="vnExplore" id="vnExplore">Explore Locked Experiences →</button></section><section class="vnBody">
    <div class="vnContext"><h2>Why this place matters</h2><p>${x.d.context||x.d.summary||'Context being completed from the locked research bank.'}</p></div>
    <div class="vnOrient"><div><b>COME FOR</b>${o.comeFor||'The strongest local experiences'}</div><div><b>DO DIFFERENTLY</b>${o.doDifferently||'Slow down and go local'}</div><div><b>EAT / DRINK</b>${o.eat||'Local passport items'}</div><div><b>WTF / UNIQUE</b>${o.wtf||'Find the one-off local experience'}</div></div>
    <h2>Trip Progress</h2><div class="hubProgress"><div class="hubProgressTop"><span>${done} / ${items.length} completed</span><span>${pct}%</span></div><div class="progress"><i style="width:${pct}%"></i></div></div>
    <h2>Don't Miss</h2><div class="vnCards">${items.filter(it=>it.tags.includes('Must Do')).slice(0,4).map(it=>`<button class="vnCard vnFallback" data-label="${it.title}" data-liveopen="${it.id}"><span><b>${it.title}</b><small>${it.summary}</small></span></button>`).join('')||'<div class="card">Priority scoring comes in the duration-optimisation pass. Everything here remains saved.</div>'}</div>
    <h2>My Journey</h2><div class="hubJourney"><button id="vnSaved">♡<br>${saved} Saved</button><button id="vnDone">✓<br>${done} Done</button><button id="vnBook">▣<br>${items.filter(i=>i.flags.includes('BOOK AHEAD')).length} Book Ahead</button></div>
    ${next?`<h2>Go Next</h2><button class="hubNext vnFallback" data-vnimg="${next.name}" data-label="${next.name}" id="vnNext"><span><small>NEXT SAVED DESTINATION</small><b>${next.name} →</b><small>${next.context||next.summary||''}</small></span></button>`:''}</section>${liveBottom('overview')}</div>`;
    vnBack.onclick=()=>destinationSelector('vietnam');vnExplore.onclick=()=>vnExperiences('All');vnSaved.onclick=()=>vnExperiences('Saved');vnDone.onclick=()=>vnExperiences('Completed');vnBook.onclick=()=>vnExperiences('Book Ahead');if(next)vnNext.onclick=()=>{state.here='vietnam:'+(x.i+1);save();vnHub()};
    document.querySelectorAll('[data-liveopen]').forEach(b=>b.onclick=()=>vnExperienceDetail(b.dataset.liveopen));wireLiveNav();hydrateVN();
  };

  vnExperiences=async function(filter='All'){
    await READY;const x=vnStop();if(!x)return;let items=vnBaseItems(x);
    if(filter==='Saved')items=items.filter(it=>state.saved&&state.saved[liveKey(x,it)]);else if(filter==='Completed')items=items.filter(it=>state.done[liveKey(x,it)]);else if(filter==='Book Ahead')items=items.filter(it=>it.flags.includes('BOOK AHEAD'));else if(filter!=='All')items=items.filter(it=>it.tags.includes(filter));
    nav.hidden=true;nav.style.display='none';const filters=['All','Must Do','Unique','Food','Drink','History','Culture','Local Life','Book Ahead','Saved'];
    app.innerHTML=`<div class="vnBody"><button class="back" id="vxBack">← ${x.d.name}</button><div class="vnFilters">${filters.map(f=>`<button class="${f===filter?'on':''}" data-vxfilter="${f}">${f}</button>`).join('')}</div><h1 style="font:800 42px Georgia,serif;margin:15px 0 2px">${filter==='All'?'Locked experiences':filter}</h1><p>${items.length} matching experiences · V0.21 live bank</p>${items.map(it=>`<article class="vnResult"><div class="vnResultPhoto vnPhotoVerify"></div><div><div class="vnTags">${it.tags.map(t=>`<i>${t}</i>`).join('')}</div><h3>${it.title}</h3><p>${it.summary}</p>${flagHtml(it)}<div class="vnActions"><button data-vnsave="${it.id}">${state.saved&&state.saved[liveKey(x,it)]?'♥ Saved':'♡ Save'}</button><button data-vndone="${it.id}">${state.done[liveKey(x,it)]?'✓ Done':'Mark done'}</button><button data-vnopen="${it.id}">Details →</button></div></div></article>`).join('')||'<div class="card">No matching locked experiences.</div>'}${liveBottom(filter==='Saved'?'saved':'experiences')}</div>`;
    vxBack.onclick=vnHub;document.querySelectorAll('[data-vxfilter]').forEach(b=>b.onclick=()=>vnExperiences(b.dataset.vxfilter));document.querySelectorAll('[data-vnsave]').forEach(b=>b.onclick=()=>{const it=vnBaseItems(x).find(z=>z.id===b.dataset.vnsave),k=liveKey(x,it);state.saved=state.saved||{};state.saved[k]=!state.saved[k];save();vnExperiences(filter)});document.querySelectorAll('[data-vndone]').forEach(b=>b.onclick=()=>{const it=vnBaseItems(x).find(z=>z.id===b.dataset.vndone),k=liveKey(x,it);state.done[k]=!state.done[k];save();vnExperiences(filter)});document.querySelectorAll('[data-vnopen]').forEach(b=>b.onclick=()=>vnExperienceDetail(b.dataset.vnopen));wireLiveNav();
  };

  window.vnExperienceDetail=async function(id){
    await READY;const x=vnStop(),it=vnBaseItems(x).find(z=>z.id===id);if(!it)return vnExperiences('All');const k=liveKey(x,it),done=!!state.done[k];
    nav.hidden=true;nav.style.display='none';app.innerHTML=`<div class="vnBody"><button class="back" id="vdBack">← Experiences</button><div class="card"><div class="vnTags">${it.tags.map(t=>`<i>${t}</i>`).join('')}</div><h1 style="font:800 38px/1 Georgia,serif">${it.title}</h1><p style="font-size:16px;line-height:1.5">${it.summary}</p>${flagHtml(it)}</div><div class="vnContext"><h2>Context</h2><p>${x.d.context||x.d.summary||''}</p></div><button class="btn primary wide" id="vdDone">${done?'✓ COMPLETED':'MARK EXPERIENCE COMPLETE'}</button>${liveBottom('experiences')}</div>`;vdBack.onclick=()=>vnExperiences('All');vdDone.onclick=()=>{state.done[k]=!done;save();vnExperienceDetail(id)};wireLiveNav();
  };

  const oldDestinationSelector=destinationSelector;destinationSelector=async function(id){if(id==='vietnam')await READY;return oldDestinationSelector(id);};
  const oldHome=home;home=async function(){const x=cur();if(x&&x.c.id==='vietnam'){await READY;return vnHub();}return oldHome();};
  const oldDo=doHere;doHere=async function(){const x=cur();if(x&&x.c.id==='vietnam'){await READY;return vnExperiences('All');}return oldDo();};
  const oldGoNext=goNext;goNext=async function(){const x=cur();if(x&&x.c.id==='vietnam'){await READY;const n=DATA.destinations.vietnam[x.i+1];if(n){state.here='vietnam:'+(x.i+1);save();return vnHub();}}return oldGoNext();};
})();
