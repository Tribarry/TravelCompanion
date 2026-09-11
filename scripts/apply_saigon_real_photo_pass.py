from pathlib import Path
from urllib.parse import quote
import re

# Curated real-photo sources for the 21 Ho Chi Minh City rating cards.
# Exact named-place photography is preferred. Two cards use clearly documented
# contextual photography where no suitably licensed exact interior/bunker image
# was found (Secret Commando history; FITO traditional-medicine context).
sources = [
    ("Nguyen Van Binh Street (52681309899).jpg", "https://commons.wikimedia.org/wiki/File:Nguyen_Van_Binh_Street_(52681309899).jpg", "Nguyễn Văn Bình Book Street", "exact"),
    ("20190923 Saigon Central Post Office interior-2.jpg", "https://commons.wikimedia.org/wiki/File:20190923_Saigon_Central_Post_Office_interior-2.jpg", "Saigon Central Post Office", "exact"),
    ("Saigon Notre-Dame Basilica.jpg", "https://commons.wikimedia.org/wiki/File:Saigon_Notre-Dame_Basilica.jpg", "Notre-Dame Cathedral Precinct", "exact"),
    ("War Remnants Museum.jpg", "https://commons.wikimedia.org/wiki/File:War_Remnants_Museum.jpg", "War Remnants Museum", "exact"),
    ("CSS Thaco Sightseeing 120SS, Lê Lợi Boulevard, Ho Chi Minh City, 2023 (01).jpg", "https://commons.wikimedia.org/wiki/File:CSS_Thaco_Sightseeing_120SS,_L%C3%AA_L%E1%BB%A3i_Boulevard,_Ho_Chi_Minh_City,_2023_(01).jpg", "Saigon Night Sightseeing Bus", "exact vehicle / daytime photo"),
    ("Bui Vien Street.jpg", "https://commons.wikimedia.org/wiki/File:Bui_Vien_Street.jpg", "Bùi Viện After Dark", "exact"),
    ("Administrator Power joins a street food tour in Ho Chi Minh City to appreciate Vietnam’s signature local dishes and cultural history. (52733438298).jpg", "https://commons.wikimedia.org/wiki/File:Administrator_Power_joins_a_street_food_tour_in_Ho_Chi_Minh_City_to_appreciate_Vietnam%E2%80%99s_signature_local_dishes_and_cultural_history._(52733438298).jpg", "Motorbike Food Tour", "real HCMC street-food tour context"),
    ("Landmark 81.png", "https://commons.wikimedia.org/wiki/File:Landmark_81.png", "Landmark 81 Skyline", "exact"),
    ("Church of the Sacred Heart of Jesus, Ho Chi Minh City.jpg", "https://commons.wikimedia.org/wiki/File:Church_of_the_Sacred_Heart_of_Jesus,_Ho_Chi_Minh_City.jpg", "Tân Định Pink Church", "exact"),
    ("42 Nguyen Hue Boulevard, Saigon (53547606514).jpg", "https://commons.wikimedia.org/wiki/File:42_Nguyen_Hue_Boulevard,_Saigon_(53547606514).jpg", "42 Nguyễn Huệ Café Apartment", "exact"),
    ("20190925 Cu Chi tunnel entrance.jpg", "https://commons.wikimedia.org/wiki/File:20190925_Cu_Chi_tunnel_entrance.jpg", "Củ Chi Tunnels", "exact"),
    ("Jade Emperor Pagoda (9981966414).jpg", "https://commons.wikimedia.org/wiki/File:Jade_Emperor_Pagoda_(9981966414).jpg", "Jade Emperor Pagoda", "exact"),
    ("Nighttime boat in the Saigon River.jpg", "https://commons.wikimedia.org/wiki/File:Nighttime_boat_in_the_Saigon_River.jpg", "Saigon River Night Cruise", "exact"),
    ("2023-12-10 Memorial stele for Special Forces soldiers who died at the Independence Palace 01.jpg", "https://commons.wikimedia.org/wiki/File:2023-12-10_Memorial_stele_for_Special_Forces_soldiers_who_died_at_the_Independence_Palace_01.jpg", "Secret Saigon Commando Trail + Bunker", "Saigon Special Forces historical context"),
    ("Binh Tay market.jpg", "https://commons.wikimedia.org/wiki/File:Binh_Tay_market.jpg", "Chợ Lớn Deep Dive", "exact"),
    ("20180413 201710Saigon Hotpot Night Food Tour Ho Thi Ky Flower Market Thanh Hằng Lý Thái Minh Hiếu Kim Euncheol Lee Junho Choi Kwangmo.jpg", "https://commons.wikimedia.org/wiki/File:20180413_201710Saigon_Hotpot_Night_Food_Tour_Ho_Thi_Ky_Flower_Market_Thanh_H%E1%BA%B1ng_L%C3%BD_Th%C3%A1i_Minh_Hi%E1%BA%BFu_Kim_Euncheol_Lee_Junho_Choi_Kwangmo.jpg", "Hồ Thị Kỷ After Dark", "exact"),
    ("Dishes in Saigon.jpg", "https://commons.wikimedia.org/wiki/File:Dishes_in_Saigon.jpg", "District 4 Alley Food Crawl", "exact District 4 food context"),
    ("Nước mắm bottle.JPG", "https://commons.wikimedia.org/wiki/File:N%C6%B0%E1%BB%9Bc_m%E1%BA%AFm_bottle.JPG", "Craft Fish-Sauce Tasting", "real Vietnamese fish-sauce context"),
    ("Traditional Vietnamese Medicine store in Pho Truc (2017).jpg", "https://commons.wikimedia.org/wiki/File:Traditional_Vietnamese_Medicine_store_in_Pho_Truc_(2017).jpg", "FITO Museum of Traditional Vietnamese Medicine", "traditional Vietnamese medicine context; not FITO interior"),
    ("Hai thuong lang ong street- phường 10, Quận 5, TPHCM, Việt Nam - panoramio.jpg", "https://commons.wikimedia.org/wiki/File:Hai_thuong_lang_ong_street-_ph%C6%B0%E1%BB%9Dng_10,_Qu%E1%BA%ADn_5,_TPHCM,_Vi%E1%BB%87t_Nam_-_panoramio.jpg", "Traditional Medicine & Herbal Pharmacy Walk", "exact street"),
    ("Can Gio mangrove forest.jpg", "https://commons.wikimedia.org/wiki/File:Can_Gio_mangrove_forest.jpg", "Cần Giờ Mangrove Adventure", "exact"),
]

assert len(sources) == 21

p = Path('data/hcm-rater-content-v2.js')
s = p.read_text()
lines = s.splitlines()
records = [i for i, line in enumerate(lines) if line.lstrip().startswith('R(/')]
assert len(records) == 21, f'expected 21 HCMC curated records, got {len(records)}'

for idx, (filename, page, label, accuracy) in zip(records, sources):
    direct = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/' + quote(filename, safe='') + '?width=1400'
    line = lines[idx]
    assert "photo:'" in line, f'missing photo field for {label}'
    line = re.sub(r"photo:'[^']*'", f"photo:'{direct}'", line, count=1)
    lines[idx] = line

p.write_text('\n'.join(lines) + '\n')

# Real photos should not carry the old AI disclosure pill.
p = Path('data/rater-cinematic-v2.css')
c = p.read_text()
c = re.sub(r'\.tc1RatePhotoDirect:before\{[^}]*\}', '.tc1RatePhotoDirect:before{display:none!important}', c, count=1)
p.write_text(c)

# Cache-bust only the presentation assets touched by this pass.
p = Path('index.html')
i = p.read_text()
i = re.sub(r'data/rater-cinematic-v2\.css\?v=[^"\']+', 'data/rater-cinematic-v2.css?v=20260911-real-hcm-v1', i)
i = re.sub(r'data/hcm-rater-content-v2\.js\?v=[^"\']+', 'data/hcm-rater-content-v2.js?v=20260911-real-hcm-v1', i)
p.write_text(i)

# Keep source/licence provenance in-repo. Each Commons file page contains its
# creator and licence details; contextual substitutions are explicitly marked.
credits = [
    '# Saigon experience photo sources\n',
    'Real-photo pass for the 21 Ho Chi Minh City rating cards. Source pages below are the attribution/licence record. Images are displayed via Wikimedia Commons Special:Redirect rather than copied into the repository.\n',
    'Two cards are intentionally marked as contextual because a suitably licensed exact image was not found during this pass. They must not be presented as photographs of the exact venue.\n'
]
for n, (_, page, label, accuracy) in enumerate(sources, 1):
    credits.append(f'{n}. **{label}** — {accuracy} — {page}')
Path('docs/SAIGON_EXPERIENCE_PHOTO_SOURCES.md').write_text('\n'.join(credits) + '\n')

# The rejected generated images must not remain part of the active photo path.
# Remove the directory from this branch if it exists; it is no longer referenced.
ai = Path('assets/ai/hcm')
if ai.exists():
    for f in ai.glob('*'):
        if f.is_file(): f.unlink()
    try: ai.rmdir()
    except OSError: pass

print('SAIGON REAL PHOTO PASS APPLIED: 21 curated photo URLs')
