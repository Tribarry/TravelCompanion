/* Travel Companion — destination food passport bank.
 * Every destination resolves to a curated regional food set. HCMC keeps its
 * existing 15-item Saigon passport in the shell; this bank covers all other
 * destinations and provides a fallback so no destination is empty.
 * Costs are indicative 2027 planning estimates in AUD, not live prices.
 */
(()=>{
'use strict';
const D=(id,name,en,desc,price,when='Any time')=>({id,dishId:id,name,en,desc,price,when});
const C={
 vietnam:{
  banhxeo:D('vn-banh-xeo','Bánh xèo','Crispy savoury pancake','Turmeric rice-flour pancake with herbs and fillings; eat it wrapped in greens rather than with cutlery.','Est. A$2–6','Lunch / dinner'),
  hutieu:D('vn-hu-tieu','Hủ tiếu','Southern noodle soup','A southern noodle staple with pork or seafood; especially relevant through Saigon and the Mekong.','Est. A$2–5','Breakfast / lunch'),
  caloc:D('vn-ca-loc-nuong-trui','Cá lóc nướng trui','Charred snakehead fish','Mekong-style whole snakehead fish roasted over straw or charcoal and eaten with herbs and rice paper.','Est. A$5–12','Lunch / dinner'),
  lautmam:D('vn-lau-mam','Lẩu mắm','Fermented-fish hotpot','A strongly flavoured Mekong hotpot built around fermented fish, vegetables, seafood and meat.','Est. A$6–15','Dinner'),
  bunmam:D('vn-bun-mam','Bún mắm','Fermented-fish noodle soup','A deep, savoury Mekong noodle soup with seafood, pork and herbs.','Est. A$2–5','Lunch / dinner'),
  bunnuocleo:D('vn-bun-nuoc-leo','Bún nước lèo','Khmer-influenced noodle soup','A light but aromatic southern noodle soup associated with Khmer communities in the Mekong Delta.','Est. A$2–5','Breakfast / lunch'),
  banhtambi:D('vn-banh-tam-bi','Bánh tằm bì','Thick rice noodles with pork and coconut','Soft rice noodles with shredded pork skin, herbs and coconut-rich sauce.','Est. A$2–5','Breakfast / lunch'),
  buntca:D('vn-bun-ca','Bún cá','Fish noodle soup','Regional fish noodle soup; versions vary across the Mekong and northern border provinces.','Est. A$2–5','Breakfast / lunch'),
  bunken:D('vn-bun-ken','Bún kèn','Coconut fish noodles','A Kiên Giang speciality with fish, coconut milk, herbs and rice noodles.','Est. A$2–5','Breakfast / lunch'),
  bunquay:D('vn-bun-quay','Bún quậy','Fresh seafood noodle soup','Phú Quốc noodle soup assembled with freshly mixed fish or shrimp paste and a bright dipping sauce.','Est. A$2–5','Breakfast / lunch'),
  goicatrich:D('vn-goi-ca-trich','Gỏi cá trích','Herring salad','Phú Quốc-style raw or lightly cured herring with coconut, herbs and rice paper.','Est. A$4–10','Lunch / dinner'),
  banhkhot:D('vn-banh-khot','Bánh khọt','Mini savoury rice pancakes','Small crisp rice pancakes usually topped with shrimp and eaten with herbs and dipping sauce.','Est. A$2–5','Lunch / snack'),
  comlam:D('vn-com-lam','Cơm lam','Bamboo-tube sticky rice','Sticky rice cooked in bamboo, common across highland and mountain regions.','Est. A$1–4','Any time'),
  ganuong:D('vn-ga-nuong','Gà nướng','Grilled chicken','Highland grilled chicken, often paired with cơm lam and local dipping salts.','Est. A$5–12','Lunch / dinner'),
  bunred:D('vn-bun-do','Bún đỏ','Buôn Ma Thuột red noodle soup','A Buôn Ma Thuột noodle soup with a red-orange broth, crab mixture and quail eggs.','Est. A$2–5','Breakfast / lunch'),
  phokho:D('vn-pho-kho','Phở khô Gia Lai','Two-bowl dry pho','Gia Lai speciality serving seasoned dry noodles separately from broth.','Est. A$2–5','Breakfast / lunch'),
  goila:D('vn-goi-la','Gỏi lá','Leaf salad feast','Kon Tum speciality built around a large spread of forest leaves, pork, shrimp and a rich dipping sauce.','Est. A$5–12','Lunch / dinner'),
  banhhoilongheo:D('vn-banh-hoi-long-heo','Bánh hỏi lòng heo','Fine rice vermicelli with pork offal','A Bình Định breakfast staple with delicate rice noodles, pork and herbs.','Est. A$2–5','Breakfast'),
  bunchaquy:D('vn-bun-cha-ca','Bún chả cá','Fish-cake noodle soup','Central-coast noodle soup with springy fish cakes and clear savoury broth.','Est. A$2–5','Breakfast / lunch'),
  banhxeotomnhay:D('vn-banh-xeo-tom-nhay','Bánh xèo tôm nhảy','Fresh-shrimp pancake','Bình Định-style crispy pancakes made with very fresh small shrimp.','Est. A$2–6','Lunch / dinner'),
  matcangu:D('vn-mat-ca-ngu','Mắt cá ngừ đại dương','Braised tuna eye','Phú Yên speciality of slow-cooked tuna eye with herbs and spices.','Est. A$3–8','Dinner'),
  nemnuong:D('vn-nem-nuong','Nem nướng','Grilled pork sausage','Nha Trang-style grilled pork served with rice paper, herbs and a distinctive dipping sauce.','Est. A$3–7','Lunch / dinner'),
  banhcan:D('vn-banh-can','Bánh căn','Mini rice cakes','Small rice-flour cakes cooked in clay moulds, often with egg or seafood.','Est. A$2–5','Breakfast / snack'),
  caolau:D('vn-cao-lau','Cao lầu','Hoi An noodles','Chewy noodles with pork, greens and crisp toppings; a dish closely associated with Hội An.','Est. A$2–5','Lunch / dinner'),
  miquang:D('vn-mi-quang','Mì Quảng','Quảng-style turmeric noodles','Wide noodles with a small amount of concentrated broth, herbs, peanuts and meat or seafood.','Est. A$2–5','Breakfast / lunch'),
  comgahoian:D('vn-com-ga-hoi-an','Cơm gà Hội An','Hoi An chicken rice','Fragrant rice with shredded chicken, herbs and pickles.','Est. A$2–5','Lunch / dinner'),
  bunbohue:D('vn-bun-bo-hue','Bún bò Huế','Spicy beef noodle soup','Huế’s signature lemongrass-forward beef and pork noodle soup.','Est. A$2–5','Breakfast / lunch'),
  comhen:D('vn-com-hen','Cơm hến','Rice with baby clams','Huế dish combining rice, tiny clams, herbs, crunchy toppings and chilli.','Est. A$1–4','Lunch'),
  banhbeo:D('vn-banh-beo','Bánh bèo / nậm / lọc','Huế steamed cakes','A family of small steamed or translucent savoury cakes central to Huế snacking.','Est. A$2–5','Snack / lunch'),
  chaocanh:D('vn-chao-canh','Cháo canh Quảng Bình','Quảng Bình thick noodle soup','A thick noodle soup with fish, pork or seafood, common around Quảng Bình.','Est. A$2–5','Breakfast / lunch'),
  combchay:D('vn-com-chay-ninh-binh','Cơm cháy','Crispy rice','Ninh Bình crispy rice served with savoury sauces or goat dishes.','Est. A$2–6','Lunch / snack'),
  denui:D('vn-de-nui','Dê núi','Mountain goat','Ninh Bình goat served grilled, rare with lime, or in stir-fries.','Est. A$5–12','Lunch / dinner'),
  buncha:D('vn-bun-cha','Bún chả','Hanoi grilled pork noodles','Charcoal-grilled pork served with rice noodles, herbs and dipping broth.','Est. A$2–5','Lunch'),
  pho:D('vn-pho','Phở','Vietnamese noodle soup','The classic northern beef or chicken noodle soup; Hanoi is the key place to compare traditional styles.','Est. A$2–5','Breakfast'),
  chaca:D('vn-cha-ca','Chả cá','Turmeric fish with dill','Hanoi fish dish cooked with turmeric, dill and spring onion, served with noodles and peanuts.','Est. A$5–12','Lunch / dinner'),
  banhcuon:D('vn-banh-cuon','Bánh cuốn','Steamed rice rolls','Thin steamed rice sheets filled with pork and mushrooms, served with herbs and fish sauce.','Est. A$2–4','Breakfast'),
  thangco:D('vn-thang-co','Thắng cố','Northern highland stew','A Hmong-associated highland stew traditionally made from horse offal; modern versions vary.','Est. A$3–8','Market day / lunch'),
  xoinam:D('vn-xoi-ngu-sac','Xôi ngũ sắc','Five-colour sticky rice','Naturally coloured sticky rice associated with several northern ethnic communities.','Est. A$1–4','Breakfast / market'),
  khanhuc:D('vn-khau-nhuc','Khâu nhục','Slow-braised pork','Rich braised pork associated with Tày and Nùng communities in the northeast.','Est. A$3–8','Lunch / dinner'),
  phochua:D('vn-pho-chua','Phở chua','Sour mixed noodles','A northern mountain noodle dish with tangy dressing, pork and crunchy toppings.','Est. A$2–5','Lunch')
 },
 laos:{
  laap:D('la-laap','Larb / laap','Herb-heavy minced meat salad','Minced meat or fish with lime, herbs and toasted rice powder; one of the core Lao dishes.','Est. A$2–6','Lunch / dinner'),
  khaoNiao:D('la-khao-niao','Khao niao','Sticky rice','Lao sticky rice eaten by hand and used to scoop dips, grilled meat and salads.','Est. A$1–3','Any meal'),
  tamMak:D('la-tam-mak-hoong','Tam mak hoong','Lao papaya salad','Punchy green papaya salad commonly made with fermented fish sauce.','Est. A$1–4','Lunch / snack'),
  mokPa:D('la-mok-pa','Mok pa','Steamed fish in banana leaf','Herbed river fish steamed in banana leaves.','Est. A$3–7','Lunch / dinner'),
  orLam:D('la-or-lam','Or lam','Luang Prabang stew','A thick northern Lao stew with herbs, vegetables and meat, associated with Luang Prabang.','Est. A$3–7','Lunch / dinner'),
  khaoSoi:D('la-khao-soi','Khao soi Lao','Luang Prabang noodle soup','Rice noodles with a tomato-minced meat topping; distinct from northern Thai khao soi.','Est. A$2–5','Breakfast / lunch'),
  kaipen:D('la-kaipen','Kaipen','Mekong riverweed sheets','Dried riverweed seasoned with sesame and aromatics, often eaten with chilli dip.','Est. A$2–5','Snack'),
  jeowBong:D('la-jeow-bong','Jeow bong','Luang Prabang chilli relish','Sweet-spicy chilli paste usually eaten with sticky rice or riverweed.','Est. A$1–4','With meals'),
  khaoPiak:D('la-khao-piak-sen','Khao piak sen','Chewy noodle soup','Comforting Lao noodle soup with hand-cut chewy rice noodles.','Est. A$2–5','Breakfast / lunch'),
  saiOua:D('la-sai-oua','Sai oua Lao','Lao herb sausage','Grilled pork sausage heavily seasoned with herbs and aromatics.','Est. A$2–6','Snack / dinner'),
  sinSavanh:D('la-sin-savanh','Sin savanh','Lao beef jerky','Sweet-savoury dried beef, common as a snack or beer food.','Est. A$2–6','Snack'),
  khaoJee:D('la-khao-jee','Khao jee pâté','Lao baguette sandwich','Crisp baguette with pâté, meat, herbs and chilli, reflecting French influence.','Est. A$1–4','Breakfast / lunch'),
  pingGai:D('la-ping-gai','Ping gai','Lao grilled chicken','Charcoal-grilled marinated chicken, especially good with sticky rice and papaya salad.','Est. A$3–8','Lunch / dinner')
 },
 cambodia:{
  amok:D('kh-amok','Amok trei','Fish amok','Coconut-rich fish curry steamed or served in a bowl with kroeung aromatics.','Est. A$3–8','Lunch / dinner'),
  kuyTeav:D('kh-kuy-teav','Kuy teav','Cambodian noodle soup','Pork or beef rice-noodle soup usually eaten at breakfast.','Est. A$2–5','Breakfast'),
  baiSach:D('kh-bai-sach-chrouk','Bai sach chrouk','Pork and rice','Grilled marinated pork over rice with pickles and broth; a classic Cambodian breakfast.','Est. A$2–4','Breakfast'),
  nomBanh:D('kh-nom-banh-chok','Nom banh chok','Khmer noodles','Rice noodles with a fragrant fish-and-herb curry gravy and fresh vegetables.','Est. A$2–5','Breakfast / lunch'),
  lokLak:D('kh-lok-lak','Beef lok lak','Pepper-lime beef','Stir-fried beef served with lettuce, tomato and a sharp lime-pepper dip.','Est. A$3–8','Lunch / dinner'),
  kroeung:D('kh-cha-kroeung','Cha kroeung','Kroeung stir-fry','Meat stir-fried with lemongrass-heavy Khmer spice paste.','Est. A$3–7','Lunch / dinner'),
  prahok:D('kh-prahok-ktis','Prahok ktis','Fermented-fish pork dip','Rich dip of prahok, pork and coconut milk eaten with raw and blanched vegetables.','Est. A$3–7','Lunch / dinner'),
  kralan:D('kh-kralan','Kralan','Bamboo sticky rice','Sticky rice, beans and coconut milk roasted inside bamboo.','Est. A$1–3','Snack'),
  lortCha:D('kh-lort-cha','Lort cha','Short stir-fried noodles','Chewy short noodles fried with vegetables, egg and meat, usually with sweet-spicy sauce.','Est. A$2–5','Lunch / dinner'),
  nomPang:D('kh-nom-pang','Num pang','Cambodian baguette sandwich','Baguette filled with meats, pâté, pickles and herbs.','Est. A$1–4','Breakfast / lunch'),
  crab:D('kh-kep-crab','Kep crab with Kampot pepper','Pepper crab','Fresh crab cooked with green Kampot peppercorns; the signature coastal pairing.','Est. A$8–18','Lunch / dinner'),
  seafood:D('kh-grilled-seafood','Grilled seafood','Coastal seafood','Simple grilled fish, squid or prawns, best on the coast and islands.','Est. A$4–12','Dinner')
 },
 thailand:{
  padKrapao:D('th-pad-krapao','Pad kra pao','Holy-basil stir-fry','Fast stir-fry of meat, chilli and holy basil, usually with rice and a fried egg.','Est. A$2–6','Lunch / dinner'),
  boatNoodles:D('th-boat-noodles','Kuay teow ruea','Boat noodles','Small bowls of intensely seasoned pork or beef noodles associated with Bangkok canal-side trade.','Est. A$1–4','Lunch'),
  tomYum:D('th-tom-yum','Tom yum','Hot-and-sour soup','Lemongrass, lime and chilli soup, often with prawns.','Est. A$3–8','Lunch / dinner'),
  khaoManGai:D('th-khao-man-gai','Khao man gai','Thai chicken rice','Poached chicken with fragrant rice, broth and fermented-soy dipping sauce.','Est. A$2–5','Breakfast / lunch'),
  khaoSoi:D('th-khao-soi','Khao soi','Northern curry noodles','Coconut curry noodle soup topped with crisp noodles, strongly associated with northern Thailand.','Est. A$2–6','Lunch'),
  saiUa:D('th-sai-ua','Sai ua','Northern herb sausage','Grilled pork sausage packed with lemongrass, kaffir lime and curry paste.','Est. A$2–6','Snack / dinner'),
  namPrik:D('th-nam-prik','Nam prik ong / noom','Northern chilli dips','Northern chilli relishes served with vegetables and pork crackling.','Est. A$2–6','With meals'),
  hangLay:D('th-gaeng-hang-lay','Gaeng hang lay','Northern pork curry','Slow-cooked pork curry with ginger and tamarind, influenced by Burmese cuisine.','Est. A$3–7','Lunch / dinner'),
  namNgiao:D('th-nam-ngiao','Khanom jeen nam ngiao','Northern tomato noodle curry','Rice noodles with a tomato, pork and fermented-soy broth.','Est. A$2–5','Breakfast / lunch'),
  gaengSom:D('th-gaeng-som','Gaeng som','Southern sour curry','Sharp, spicy turmeric curry often made with fish and vegetables.','Est. A$3–8','Lunch / dinner'),
  khaoYam:D('th-khao-yam','Khao yam','Southern herb rice salad','Rice mixed with finely shredded herbs, vegetables and a savoury dressing.','Est. A$2–6','Breakfast / lunch'),
  massaman:D('th-massaman','Massaman curry','Mild southern-influenced curry','Rich curry with warming spices, potatoes and meat.','Est. A$3–8','Lunch / dinner'),
  grilledSeafood:D('th-grilled-seafood','Grilled seafood','Island seafood','Fresh fish, squid or prawns grilled simply at local markets or beachside restaurants.','Est. A$4–12','Dinner')
 },
 kazakhstan:{
  besh:D('kz-beshbarmak','Beshbarmak','Boiled meat and noodles','Kazakh celebratory dish of boiled meat over broad noodles with onion broth.','Est. A$6–15','Lunch / dinner'),
  manty:D('kz-manty','Manty','Steamed dumplings','Large steamed dumplings filled with meat and onion.','Est. A$4–9','Lunch / dinner'),
  lagman:D('kz-lagman','Lagman','Hand-pulled noodles','Central Asian noodles with meat, vegetables and a rich sauce or broth.','Est. A$4–9','Lunch / dinner'),
  plov:D('kz-plov','Plov','Rice pilaf','Rice cooked with meat, carrots and spices, common across Central Asia.','Est. A$4–9','Lunch'),
  baursak:D('kz-baursak','Baursak','Fried dough','Pillowy fried dough served with tea or alongside meals.','Est. A$1–4','Breakfast / snack'),
  kazy:D('kz-kazy','Kazy','Horse-meat sausage','Traditional sausage made from horse meat and fat, commonly served on celebratory platters.','Est. A$5–12','Lunch / dinner'),
  shashlik:D('kz-shashlik','Shashlik','Charcoal skewers','Grilled meat skewers served with onion, bread and simple salads.','Est. A$4–10','Dinner'),
  samsa:D('kz-samsa','Samsa','Baked meat pastry','Flaky or bread-like pastry filled with meat and onion.','Est. A$1–4','Snack / lunch'),
  kurt:D('kz-kurt','Kurt','Dried yoghurt cheese','Very salty dried dairy balls made for storage and travel.','Est. A$1–4','Snack')
 },
 kyrgyzstan:{
  lagman:D('kg-lagman','Lagman','Hand-pulled noodles','Noodles with meat and vegetables, found in both soupy and fried versions.','Est. A$3–8','Lunch / dinner'),
  manty:D('kg-manty','Manty','Steamed dumplings','Large steamed dumplings filled with mutton or beef and onion.','Est. A$3–8','Lunch / dinner'),
  plov:D('kg-plov','Plov','Rice pilaf','Rice cooked with meat, carrots and spices, especially common in towns and bazaars.','Est. A$3–8','Lunch'),
  samsa:D('kg-samsa','Samsa','Tandoor pastry','Meat-and-onion pastry baked against the walls of a hot oven.','Est. A$1–4','Snack / lunch'),
  boorsok:D('kg-boorsok','Boorsok','Fried dough','Small pieces of fried dough served at homes, yurt camps and celebrations.','Est. A$1–4','Breakfast / snack'),
  besh:D('kg-beshbarmak','Beshbarmak','Meat and noodles','Boiled meat with broad noodles and broth; a traditional celebratory dish.','Est. A$5–12','Dinner'),
  kuurdak:D('kg-kuurdak','Kuurdak','Fried meat and potatoes','Hearty dish of fried meat, onion and potatoes, well suited to mountain travel.','Est. A$4–10','Lunch / dinner'),
  shorpo:D('kg-shorpo','Shorpo','Mutton soup','Simple, filling broth with mutton, potatoes and vegetables.','Est. A$3–8','Lunch / dinner'),
  ashlyan:D('kg-ashlyan-fu','Ashlyan-fu','Cold spicy Dungan noodles','Karakol speciality of cold noodles, starch jelly, vinegar and chilli.','Est. A$2–5','Lunch'),
  ganfan:D('kg-ganfan','Ganfan','Dungan rice plate','Rice topped with a savoury meat-and-vegetable stir-fry, common in Karakol.','Est. A$3–7','Lunch / dinner'),
  kurut:D('kg-kurut','Kurut','Dried yoghurt balls','Salty dried dairy snack common in pastoral areas.','Est. A$1–4','Snack')
 }
};
const P={
 vietnam:{
  default:['banhxeo','hutieu','pho','banhcuon'],
  mekong:['hutieu','banhxeo','caloc','banhtambi','lautmam'],
  anGiang:['buntca','bunmam','banhxeo','caloc','lautmam'],
  khmerDelta:['bunnuocleo','banhxeo','caloc','lautmam'],
  kienGiang:['bunken','banhxeo','caloc','goicatrich'],
  phuQuoc:['bunquay','goicatrich','bunken','seafood'],
  conDao:['banhkhot','bunchaquy','goicatrich','caloc'],
  southeast:['banhkhot','hutieu','banhxeo','comlam'],
  highlands:['comlam','ganuong','bunred','phokho','goila'],
  centralRoad:['comlam','ganuong','miquang','bunchaquy'],
  binhDinh:['banhhoilongheo','bunchaquy','banhxeotomnhay','comlam'],
  phuYen:['matcangu','bunchaquy','banhxeo','banhcan'],
  nhaTrang:['nemnuong','banhcan','bunchaquy','banhxeo'],
  hoiAn:['caolau','miquang','comgahoian','banhxeo'],
  daNang:['miquang','bunchaquy','banhxeo','comgahoian'],
  hue:['bunbohue','comhen','banhbeo','miquang'],
  quangBinh:['chaocanh','banhbeo','bunchaquy','comlam'],
  ninhBinh:['combchay','denui','pho','banhcuon'],
  puLuong:['comlam','ganuong','xoinam','pho'],
  hanoi:['buncha','pho','chaca','banhcuon'],
  northeast:['khanhuc','buntca','phochua','xoinam'],
  haGiang:['thangco','xoinam','comlam','phochua'],
  northwest:['xoinam','comlam','thangco','pho']
 },
 laos:{default:['laap','khaoNiao','tamMak','pingGai'],north:['laap','khaoNiao','mokPa','saiOua'],luang:['orLam','khaoSoi','kaipen','jeowBong','khaoNiao'],plains:['khaoPiak','laap','khaoNiao','sinSavanh'],capital:['khaoPiak','laap','tamMak','khaoJee'],central:['pingGai','khaoNiao','tamMak','mokPa'],south:['khaoNiao','laap','pingGai','tamMak','mokPa']},
 cambodia:{default:['amok','kuyTeav','baiSach','nomBanh'],siem:['nomBanh','amok','baiSach','kralan','kroeung'],battambang:['nomBanh','baiSach','kralan','kroeung'],pp:['kuyTeav','baiSach','nomPang','lortCha','lokLak'],cardamom:['amok','kroeung','prahok','baiSach'],kampot:['amok','nomBanh','kroeung','lokLak'],kep:['crab','seafood','amok','nomBanh'],island:['seafood','amok','lokLak','nomPang']},
 thailand:{default:['padKrapao','tomYum','khaoManGai','boatNoodles'],bangkok:['boatNoodles','padKrapao','khaoManGai','tomYum'],north:['khaoSoi','saiUa','namPrik','hangLay','namNgiao'],south:['grilledSeafood','gaengSom','khaoYam','massaman']},
 kazakhstan:{default:['manty','lagman','plov','baursak'],almaty:['besh','manty','lagman','kazy','baursak'],road:['shashlik','lagman','plov','samsa'],village:['manty','plov','baursak','kurt','shashlik']},
 kyrgyzstan:{default:['lagman','manty','plov','samsa'],bishkek:['lagman','manty','plov','samsa','boorsok'],mountain:['besh','kuurdak','shorpo','boorsok','kurut'],issyk:['lagman','manty','plov','boorsok'],karakol:['ashlyan','ganfan','lagman','manty','samsa']}
};
/* Vietnam's `seafood` token is an alias to a coastal staple already in the bank. */
C.vietnam.seafood=D('vn-seafood','Hải sản nướng','Grilled seafood','Choose local fish, squid, shellfish or prawns simply grilled; coastal quality matters more than elaborate preparation.','Est. A$4–12','Dinner');
const R={
 vietnam:[
  [/ho chi minh|saigon/,'default'],[/cai be|tan phong|sa dec|can tho|long xuyen|vinh long|ben tre|tra vinh/,'mekong'],[/chau doc|tra su|tinh bien|tri ton/,'anGiang'],[/bac lieu/,'khmerDelta'],[/ha tien|kien luong|rach gia|nam du/,'kienGiang'],[/phu quoc/,'phuQuoc'],[/con dao/,'conDao'],[/vung tau|dong xoai|binh phuoc/,'southeast'],[/gia nghia|dak nong|da lat|buon ma thuot|dak lak|yok don|buon don|lak lake|pleiku|gia lai|kon tum|mang den/,'highlands'],[/kham duc|phuoc son|prao|dong giang|a luoi|a shau|khe sanh|western ho chi minh/,'centralRoad'],[/quy nhon/,'binhDinh'],[/phu yen|tuy hoa/,'phuYen'],[/nha trang/,'nhaTrang'],[/hoi an/,'hoiAn'],[/da nang|hai van|lang co/,'daNang'],[/hue|bach ma/,'hue'],[/phong nha|quang binh|hang en|pygmy|hung thoong|son doong/,'quangBinh'],[/ninh binh/,'ninhBinh'],[/pu luong/,'puLuong'],[/ha noi/,'hanoi'],[/ha long|lan ha|cat ba/,'northeast'],[/ba be|cao bang/,'northeast'],[/ha giang|hoang su phi/,'haGiang'],[/mu cang chai|y ty|bac ha|sa pa/,'northwest']
 ],
 laos:[[/luang prabang/,'luang'],[/huay xai|nong khiaw|muang ngoi|nam et/,'north'],[/phonsavan|plain of jars/,'plains'],[/vientiane/,'capital'],[/thakhek|kong lor|savannakhet/,'central'],[/bolaven|pakse|sekong|attapeu/,'south']],
 cambodia:[[/siem reap/,'siem'],[/battambang/,'battambang'],[/phnom penh/,'pp'],[/cardamom/,'cardamom'],[/kampot/,'kampot'],[/kep/,'kep'],[/koh rong/,'island']],
 thailand:[[/bangkok|tesol/,'bangkok'],[/chiang mai|chiang rai|pai|mae hong son/,'north'],[/southern islands/,'south']],
 kazakhstan:[[/almaty$/,'almaty'],[/charyn|altyn emel/,'road'],[/saty|kolsai|kaindy/,'village']],
 kyrgyzstan:[[/bishkek/,'bishkek'],[/tian shan|song kol/,'mountain'],[/issyk kul|bokonbaevo/,'issyk'],[/karakol|altyn arashan/,'karakol']]
};
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
function preset(countryId,destinationName){const q=norm(destinationName);for(const [re,key] of (R[countryId]||[]))if(re.test(q))return key;return'default'}
function get(countryId,destinationName){const cat=C[countryId]||{},sets=P[countryId]||{},key=preset(countryId,destinationName),ids=sets[key]||sets.default||[];return ids.map(id=>cat[id]).filter(Boolean).map(x=>({...x,scope:key,estimate:true}))}
function audit(data){const rows=[];for(const c of (data?.countries||[])){for(const d of (data?.destinations?.[c.id]||[])){const items=get(c.id,d.name);rows.push({country:c.id,destination:d.name,count:items.length,preset:preset(c.id,d.name)})}}return {total:rows.length,missing:rows.filter(x=>!x.count),rows}}
window.TC1FoodPassport={get,audit,preset,version:'2026-09-11-v1'};
})();
