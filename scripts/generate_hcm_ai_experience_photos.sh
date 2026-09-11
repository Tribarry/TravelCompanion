#!/usr/bin/env bash
set -euo pipefail
mkdir -p assets/ai/hcm
BASE='https://image.pollinations.ai/prompt/'
MODEL='flux'

generate(){
  slug="$1"; seed="$2"; prompt="$3"
  encoded=$(python3 -c 'import sys,urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$prompt")
  out="assets/ai/hcm/${slug}.jpg"
  url="${BASE}${encoded}?width=1024&height=640&nologo=true&seed=${seed}&model=${MODEL}"
  echo "Generating ${slug}"
  curl -L --fail --retry 4 --retry-delay 2 --max-time 180 "$url" -o "$out"
  file "$out"
  bytes=$(stat -c%s "$out")
  if [ "$bytes" -lt 30000 ]; then echo "Image too small: $out ($bytes bytes)"; exit 1; fi
  if ! file "$out" | grep -Eq 'JPEG image data|PNG image data'; then echo "Not an image: $out"; exit 1; fi
  sleep 1
}

STYLE='photorealistic documentary travel photography, natural candid scene, authentic Ho Chi Minh City Vietnam, realistic people and architecture, warm natural light, 35mm travel photo, no text, no logo, no watermark, no illustration'

generate 'book-street-wander' 1101 "$STYLE, Nguyen Van Binh Book Street, leafy pedestrian book street, independent book stalls, coffee shops, local visitors walking"
generate 'central-post-office' 1102 "$STYLE, Saigon Central Post Office interior, grand yellow colonial hall, iron roof, tiled floor, visitors and working postal counters"
generate 'notre-dame-precinct' 1103 "$STYLE, Notre-Dame Cathedral Basilica of Saigon exterior precinct, red brick cathedral, central Ho Chi Minh City streetscape, pedestrians"
generate 'war-remnants-museum' 1104 "$STYLE, War Remnants Museum Ho Chi Minh City, museum exterior and historic military displays, respectful documentary atmosphere"
generate 'night-sightseeing-bus' 1105 "$STYLE, open-top double deck sightseeing bus at night in central Saigon, illuminated boulevards, skyline and motorbike traffic, upper deck perspective"
generate 'bui-vien-after-dark' 1106 "$STYLE, Bui Vien walking street after dark, neon nightlife, crowds, scooters, street bars and backpacker district atmosphere"
generate 'motorbike-food-tour' 1107 "$STYLE, local guided motorbike food tour in Saigon at night, traveller riding pillion with helmet, street food stop, busy neighbourhood lane"
generate 'landmark-81-skyline' 1108 "$STYLE, Landmark 81 and Saigon river skyline at golden hour, modern Ho Chi Minh City high rises, riverside promenade"
generate 'tan-dinh-pink-church' 1109 "$STYLE, Tan Dinh Church Ho Chi Minh City, vivid pink Gothic church facade, daylight, local street life"
generate 'cafe-apartment' 1110 "$STYLE, 42 Nguyen Hue Cafe Apartment facade at dusk, stacked balconies and independent cafes, Nguyen Hue pedestrian boulevard"
generate 'cu-chi-tunnels' 1111 "$STYLE, Cu Chi Tunnels historical site, traveller carefully entering preserved tunnel opening in forest, educational wartime site, respectful"
generate 'jade-emperor-pagoda' 1112 "$STYLE, Jade Emperor Pagoda interior Saigon, incense smoke, ornate carved wood, Taoist Buddhist deities, worshippers, moody natural temple light"
generate 'saigon-river-night-cruise' 1113 "$STYLE, small Saigon River sightseeing cruise at night, Ho Chi Minh City skyline reflections, illuminated bridges and waterfront"
generate 'secret-commando-trail' 1114 "$STYLE, hidden Saigon wartime commando bunker inside an ordinary old townhouse, concealed compartment, historical guide showing visitors"
generate 'cho-lon-deep-dive' 1115 "$STYLE, Cho Lon Chinatown Saigon, Binh Tay Market and Chinese Vietnamese trading streets, incense, market activity, local pedestrians"
generate 'ho-thi-ky-after-dark' 1116 "$STYLE, Ho Thi Ky flower and street food market after dark, narrow lively lanes, flowers, grills, local diners, warm night lighting"
generate 'district-4-food-crawl' 1117 "$STYLE, District 4 Saigon alley food crawl at night, seafood and snail stalls, smoky grills, low plastic tables, locals eating"
generate 'fish-sauce-tasting' 1118 "$STYLE, craft Vietnamese fish sauce tasting in Saigon, small tasting table with glass bowls and bottles, host explaining to traveller, refined local food experience"
generate 'fito-museum' 1119 "$STYLE, FITO Museum of Traditional Vietnamese Medicine interior, antique wooden pharmacy cabinets, medicinal jars and traditional tools, atmospheric"
generate 'herbal-pharmacy-walk' 1120 "$STYLE, Hai Thuong Lan Ong herbal medicine street in Cho Lon, traditional pharmacy storefronts, dried roots and herbs, local shoppers"
generate 'can-gio-mangroves' 1121 "$STYLE, Can Gio mangrove waterways near Ho Chi Minh City, small boat through dense mangrove forest, traveller and local guide, wetland adventure"

echo 'Generated 21 Saigon AI experience photos.'
