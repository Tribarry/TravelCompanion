(()=>{
/* Home carousel v0.23 — 18 curated journey frames */
const photos=[
 {country:'🇻🇳 Vietnam',place:'Ho Chi Minh City',url:'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇻🇳 Vietnam',place:'Hạ Long Bay',url:'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇻🇳 Vietnam',place:'Northern rice terraces',url:'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇻🇳 Vietnam',place:'Hanoi',url:'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇻🇳 Vietnam',place:'Phong Nha',url:'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇻🇳 Vietnam',place:'Hội An',url:'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇱🇦 Laos',place:'Luang Prabang',url:'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇱🇦 Laos',place:'Nong Khiaw',url:'https://images.unsplash.com/photo-1570366583862-f91883984fde?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇱🇦 Laos',place:'Kong Lor',url:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇰🇭 Cambodia',place:'Angkor',url:'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇰🇭 Cambodia',place:'Phnom Penh',url:'https://images.unsplash.com/photo-1600664356348-10686526af4f?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇰🇭 Cambodia',place:'Koh Rong',url:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇹🇭 Thailand',place:'Bangkok',url:'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇹🇭 Thailand',place:'Chiang Mai',url:'https://images.unsplash.com/photo-1598970605070-a38a6ccd3a2d?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇹🇭 Thailand',place:'Railay',url:'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇰🇿 Kazakhstan',place:'Almaty',url:'https://images.unsplash.com/photo-1596395819057-e37f55a8516b?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇰🇿 Kazakhstan',place:'Kolsai Lakes',url:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=88'},
 {country:'🇰🇬 Kyrgyzstan',place:'Song-Köl',url:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=88'}
];
if(Array.isArray(window.COVER_PHOTOS)){window.COVER_PHOTOS.splice(0,window.COVER_PHOTOS.length,...photos)}
else try{COVER_PHOTOS.splice(0,COVER_PHOTOS.length,...photos)}catch(e){}
})();