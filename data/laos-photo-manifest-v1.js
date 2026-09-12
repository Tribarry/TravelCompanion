/* Laos exact-photo manifest — 2026-09-12.
 * Exact-subject sources only. Wikimedia Commons is preferred; additional verified
 * web sources remain TO CHECK for final licensing/attribution review.
 */
(()=>{
'use strict';
if(window.LAOS_PHOTO_MANIFEST)return;
const C=(file,sourcePage,subject,license='COMMONS — CHECK FILE PAGE')=>({url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(file),sourcePage,subject,licenseStatus:license,attributionStatus:'SOURCE PAGE SAVED'});
const R=(url,sourcePage,subject)=>({url,sourcePage,subject,licenseStatus:'TO CHECK',attributionStatus:'SOURCE PAGE SAVED'});
window.LAOS_PHOTO_MANIFEST={
 'Huay Xai / Bokeo':C('Huay Xai, Lao and Thai border (12250555386).jpg','https://commons.wikimedia.org/wiki/File:Huay_Xai,_Lao_and_Thai_border_(12250555386).jpg','Mekong river boats at Huay Xai'),
 'Gibbon Experience Classic':R('https://discoverlaos.today/img/thing_to_do/34b86582e78758489bc88d9b55a075ac.jpg?p=image1920x1080','https://discoverlaos.today/bokeo/thing-to-do/the-gibbon-experience-treetop-ziplining','Gibbon Experience canopy treehouse in Nam Kan National Park'),
 'Mekong riverfront at sunset':C('Huay Xai, Lao and Thai border (12250555386).jpg','https://commons.wikimedia.org/wiki/File:Huay_Xai,_Lao_and_Thai_border_(12250555386).jpg','Huay Xai Mekong riverfront and boats'),
 'Morning market':R('https://www.asiakingtravel.com/cuploads/files/Bokeo-province-7.jpg','https://www.asiakingtravel.com/attraction/bokeo-province','Houayxay market fruit stall, Bokeo'),

 'Luang Prabang':C('500px photo (188688677).jpeg','https://commons.wikimedia.org/wiki/File:500px_photo_(188688677).jpeg','Sakkaline Road, Luang Prabang old town'),
 'Old town at first light':C('500px photo (188688677).jpeg','https://commons.wikimedia.org/wiki/File:500px_photo_(188688677).jpeg','Luang Prabang old-town street'),
 'Kuang Si Waterfall':C('20191212 Kuang Si Falls top waterfall-1.jpg','https://commons.wikimedia.org/wiki/File:20191212_Kuang_Si_Falls_top_waterfall-1.jpg','Kuang Si Falls'),
 'Mount Phousi near sunset':C('Photographer taking a sunset shot (Unsplash).jpg','https://commons.wikimedia.org/wiki/File:Photographer_taking_a_sunset_shot_(Unsplash).jpg','Mount Phousi, Luang Prabang'),
 'Royal Palace / National Museum':R('https://d122axpxm39woi.cloudfront.net/images/tours/800_450/5ed07bfadf603.jpg','https://www.bestpricetravel.com/luang-prabang-tours/luang-prabang-city-tour-full-day.html','Royal Palace / National Museum, Luang Prabang'),
 'Morning market food walk':R('https://images.squarespace-cdn.com/content/v1/6298cb774cf3830bc9b342bf/b7e4e744-5a55-42b8-9c12-120450df1a51/luang-prabang-morning-market.jpg?format=2500w','https://www.adventuresofjellie.com/laos/luang-prabang-where-to-eat','Luang Prabang morning market food stall'),

 'Nong Khiaw':C('Nong Khiaw.JPG','https://commons.wikimedia.org/wiki/File:Nong_Khiaw.JPG','Nong Khiaw from Phadeng Peak'),
 'Nong Khiaw viewpoint hike':C('Nong Khiaw.JPG','https://commons.wikimedia.org/wiki/File:Nong_Khiaw.JPG','Nong Khiaw viewpoint panorama'),
 'Guided village and mountain trek':R('https://discoverlaos.today/img/tour/a8b1de384f91a6470672a676d954d95b.jpeg','https://discoverlaos.today/tour/3-day-nong-khiaw-trekking-short','Village and mountain trek near Nong Khiaw'),
 'Nam Ou slow afternoon':C('Nong Khiaw Pier.jpg','https://commons.wikimedia.org/wiki/File:Nong_Khiaw_Pier.jpg','Nong Khiaw riverfront and Nam Ou'),
 'Pha Tok caves':R('https://images.squarespace-cdn.com/content/v1/53774b19e4b02c5d20514493/1451740801812-96TV74Z5DH5E73CUIL15/image-asset.jpeg','https://www.bittenescapes.com/laos/hiking-to-pha-tok-cave-in-nong-khiaw','Pha Tok Cave entrance, Nong Khiaw'),

 'Muang Ngoi':C('View of Muang Ngoi Neua.jpg','https://commons.wikimedia.org/wiki/File:View_of_Muang_Ngoi_Neua.jpg','Muang Ngoi Neua'),
 'Boat into Muang Ngoi':C('Nam Ou in Muang Ngoi.jpg','https://commons.wikimedia.org/wiki/File:Nam_Ou_in_Muang_Ngoi.jpg','Nam Ou at Muang Ngoi'),
 'Slow river morning':C('Nam Ou in Muang Ngoi.jpg','https://commons.wikimedia.org/wiki/File:Nam_Ou_in_Muang_Ngoi.jpg','Nam Ou at Muang Ngoi'),
 'Local cave and countryside loop':R('https://coinventmediastorage.blob.core.windows.net/media-storage-container/instagram_thumbnail_2059570166714655822.jpg','https://airial.travel/attractions/laos/luang-prabang/tham-kang-cave-muang-ngoi-6DBEmkPt','Tham Kang Cave near Muang Ngoi'),

 'Nam Et–Phou Louey':R('https://panorama.solutions/sites/default/files/styles/square_x_large/public/namet-phoulouey_ecotourism.jpeg?h=be2a843e&itok=NmyaHTgG','https://panorama.solutions/en/solution/wildlife-conservation-ecotourism-nam-et-phou-louey-national-park-lao-pdr','Nam Et–Phou Louey National Park ecotourism'),
 'Nam Nern Night Safari':R('https://panorama.solutions/sites/default/files/Safari_at_night.jpg','https://panorama.solutions/en/solution/creating-direct-incentives-through-ecotourism-protecting-wildlife','Nam Nern nighttime river safari'),
 'Community conservation interpretation':R('https://panorama.solutions/sites/default/files/styles/square_x_large/public/namet-phoulouey_ecotourism.jpeg?h=be2a843e&itok=NmyaHTgG','https://panorama.solutions/en/solution/wildlife-conservation-ecotourism-nam-et-phou-louey-national-park-lao-pdr','Community-linked conservation tourism in Nam Et–Phou Louey'),

 'Phonsavan / Plain of Jars':C('The Plain of Jars at Dawn.jpg','https://commons.wikimedia.org/wiki/File:The_Plain_of_Jars_at_Dawn.jpg','Plain of Jars Site 1 near Phonsavan'),
 'Plain of Jars Site 1':C('20171115 Plain of Jars Site 1 Laos 2542 DxO.jpg','https://commons.wikimedia.org/wiki/File:20171115_Plain_of_Jars_Site_1_Laos_2542_DxO.jpg','Plain of Jars Site 1'),
 'Plain of Jars Sites 2 and 3':C('20171115 Plain of Jars Laos 2654 DxO.jpg','https://commons.wikimedia.org/wiki/File:20171115_Plain_of_Jars_Laos_2654_DxO.jpg','Plain of Jars Site 2'),
 'UXO visitor centre':R('https://www.maginternational.org/media/filer_public/64/99/6499b1f8-b5e0-46dd-9ba9-3bbd18467119/xh28458.jpg','https://www.maginternational.org/whats-happening/laos-beyond-the-guidebook-mags-visitor-centres/','MAG UXO visitor-centre exhibit in Laos'),
 'Old Muang Khoun':R('https://www.tourismlaos.org/wp-content/uploads/2023/05/%E0%BB%80%E0%BA%9E%E0%BA%8D%E0%BA%A7%E0%BA%B1%E0%BA%94-1030x686.jpg','https://www.tourismlaos.org/northern-provinces/xiangkhouang-province/','Temple ruins and Buddha at Muang Khoun'),

 'Vang Vieng':C('VangVieng.jpg','https://commons.wikimedia.org/wiki/File:VangVieng.jpg','Vang Vieng limestone cliffs at sunset'),
 'Karst viewpoint hike':C('VangVieng.jpg','https://commons.wikimedia.org/wiki/File:VangVieng.jpg','Vang Vieng karst landscape'),
 'Paramotor or paragliding flight':R('https://www.vangviengshuttleservice.com/cdn/shop/files/Paramotor_3-01.jpg?v=1717660912','https://www.vangviengshuttleservice.com/products/paramotor','Paramotor flight above Vang Vieng and the Nam Song'),
 'Cave and lagoon circuit':R('https://mail.asiatourdeals.com/ckfinder/userfiles/images/blogs/detail/laos/2-Swim-at-Blue-Lagoon-and-Tham-Phu-Kham-Cave-Vang-Vieng-kk1.jpg','https://mail.asiatourdeals.com/blog/attractions-in-vang-vieng.html','Blue Lagoon and cave circuit in Vang Vieng'),
 'Sunset by the Nam Song':C('VangVieng.jpg','https://commons.wikimedia.org/wiki/File:VangVieng.jpg','Vang Vieng limestone cliffs at sunset'),

 'Vientiane':C('Pha That Luang - Vientiane (Laos) I.jpg','https://commons.wikimedia.org/wiki/File:Pha_That_Luang_-_Vientiane_(Laos)_I.jpg','Pha That Luang, Vientiane'),
 'COPE Visitor Centre':R('https://careergappers.com/wp-content/uploads/2018/05/COPE-Visitor-Centre-Vientiane-Laos.jpg','https://careergappers.com/cope-visitor-centre-laos/','COPE Visitor Centre entrance, Vientiane'),
 'Pha That Luang and Patuxai':C('Pha That Luang - Vientiane (Laos) I.jpg','https://commons.wikimedia.org/wiki/File:Pha_That_Luang_-_Vientiane_(Laos)_I.jpg','Pha That Luang, Vientiane'),

 'Thakhek / Kong Lor':C('20171120 Kong Lor cave 3665 DxO.jpg','https://commons.wikimedia.org/wiki/File:20171120_Kong_Lor_cave_3665_DxO.jpg','Entrance to Kong Lor Cave'),
 'Kong Lor Cave underground river':C('20171120 Kong Lor cave 3519 DxO.jpg','https://commons.wikimedia.org/wiki/File:20171120_Kong_Lor_cave_3519_DxO.jpg','Kong Lor Cave underground river'),
 'Thakhek Loop with legal driver/transport':R('https://www.awaygowe.com/wp-content/uploads/2013/01/thakhek-loop-guide-01_9698.jpg','https://www.awaygowe.com/thakhek-loop-motorbiking-guide/','Road through limestone karst on the Thakhek Loop'),
 'Tham Nang Aen or selected cave stop':R('https://love-laos.com/wp-content/uploads/2022/11/DSC_0861a.jpg','https://love-laos.com/tham-nang-aen-cave/','Tham Nang Aen Cave near Thakhek'),
 'Thakhek old town evening':C('ThaKhek @Mekong-2010.jpg','https://commons.wikimedia.org/wiki/File:ThaKhek_@Mekong-2010.jpg','Thakhek viewed from the Mekong'),

 'Savannakhet':C('Rue-Savan-2010.jpg','https://commons.wikimedia.org/wiki/File:Rue-Savan-2010.jpg','Street in Savannakhet'),
 'Old Savannakhet walk':C('Rue-Savan-2010.jpg','https://commons.wikimedia.org/wiki/File:Rue-Savan-2010.jpg','Street in Savannakhet'),
 'Dinosaur Museum':R('https://assets.bucketlistly.blog/sites/5adf778b6eabcc00190b75b1/content_entry5b155bed5711a8176e9f9783/687da44f2ffce50002ff637c/files/savannakhet-laos-travel-photo-20250720092154817-photo-thumb.jpg','https://www.bucketlistly.blog/posts/savannakhet-best-things-to-do','Savannakhet Dinosaur Museum fossil display'),

 'Bolaven Plateau / Pakse':C('Tad Fane.jpg','https://commons.wikimedia.org/wiki/File:Tad_Fane.jpg','Tad Fane on the Bolaven Plateau'),
 'Coffee farm and tasting':R('https://www.asiakingtravel.fr/cuploads/files/plantation-cafe-paksong.jpg','https://www.asiakingtravel.fr/attraction/paksong','Coffee plantation in Paksong on the Bolaven Plateau'),
 'Tad Fane and selected waterfalls':C('Tad Fane.jpg','https://commons.wikimedia.org/wiki/File:Tad_Fane.jpg','Tad Fane waterfall'),
 'Pakse food and Mekong evening':C('The Mekong in Pakse.jpg','https://commons.wikimedia.org/wiki/File:The_Mekong_in_Pakse.jpg','Mekong at Pakse'),

 'Sekong':C('The Sekong River, Sekong, Lao PDR, 2009. Photo- Jim Holmes (10729646056).jpg','https://commons.wikimedia.org/wiki/File:The_Sekong_River,_Sekong,_Lao_PDR,_2009._Photo-_Jim_Holmes_(10729646056).jpg','Sekong River in Sekong'),
 'Sekong market morning':R('https://www.asiaphotos.org/LAOS/PROVINCES/SEKONG/PHOTOS/Sekong%20Market/thumbs/T1118287.jpg','https://www.asiaphotos.org/LAOS/PROVINCES/SEKONG/PHOTOS/Sekong%20Market/index.html','Sekong Market food and produce stall'),

 'Attapeu':C('Attapeu.jpg','https://commons.wikimedia.org/wiki/File:Attapeu.jpg','Attapeu'),
 'Attapeu market and riverfront':R('https://www.asiaphotos.org/LAOS/PROVINCES/ATTAPEU/PHOTOS/Attapeu%20market/thumbs/T1119370.jpg','https://www.asiaphotos.org/LAOS/PROVINCES/ATTAPEU/PHOTOS/Attapeu%20market/index.html','Attapeu market vegetable stall'),
 'Local countryside outing':C('Attapeu rice fields.jpg','https://commons.wikimedia.org/wiki/File:Attapeu_rice_fields.jpg','Rice fields in Attapeu Province')
};
})();