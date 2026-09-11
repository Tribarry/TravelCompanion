from pathlib import Path
import re

# Map the 21 curated HCMC rater records to local AI-generated assets in their existing order.
photos=[
'book-street-wander','central-post-office','notre-dame-precinct','war-remnants-museum','night-sightseeing-bus','bui-vien-after-dark','motorbike-food-tour','landmark-81-skyline','tan-dinh-pink-church','cafe-apartment','cu-chi-tunnels','jade-emperor-pagoda','saigon-river-night-cruise','secret-commando-trail','cho-lon-deep-dive','ho-thi-ky-after-dark','district-4-food-crawl','fish-sauce-tasting','fito-museum','herbal-pharmacy-walk','can-gio-mangroves']

p=Path('data/hcm-rater-content-v2.js')
s=p.read_text()
lines=s.splitlines()
ri=[i for i,l in enumerate(lines) if l.lstrip().startswith('R(/')]
assert len(ri)==21, f'expected 21 HCMC records, got {len(ri)}'
for idx,slug in zip(ri,photos):
    line=lines[idx]
    assert "photo:'" in line, f'missing photo field: {line[:80]}'
    line=re.sub(r"photo:'[^']*'", f"photo:'assets/ai/hcm/{slug}.jpg'", line, count=1)
    lines[idx]=line
s='\n'.join(lines)+'\n'
p.write_text(s)

# Experience list: show the same direct local image, identify the filter row, and use compact list metadata.
p=Path('data/travel-companion-v1-shell.js')
s=p.read_text()

# Add a compact list-facts helper before experienceList.
marker='function experienceList(id,i,filter)'
assert marker in s
helper="""function experienceListFacts(it){const r=it?.raw||{};const time=it?.time||r.time||r.duration||'Flexible',cost=it?.cost||r.cost||'Check locally',booking=it?.booking||r.booking||'Usually flexible';return `<div class=\"tc1ExpMeta\"><span>${esc(time)}</span><span>${esc(cost)}</span><span>${esc(booking)}</span></div>`}\n"""
if 'function experienceListFacts(it)' not in s:
    s=s.replace(marker,helper+marker,1)

# Add a visible label so the chips read as filters rather than destination navigation.
start=s.index('function experienceList(id,i,filter)')
end=s.index('function wireExperienceActions',start)
block=s[start:end]
old='return `<button class="tc1RateAll tc1RateListLaunch"'
new='return `<button class="tc1RateAll tc1RateListLaunch"'
assert old in block
# Insert label immediately before filter strip.
block=block.replace('</button><div class="tc1Filters">','</button><div class="tc1FilterLabel">FILTER EXPERIENCES</div><div class="tc1Filters">',1)
# Direct local AI image for curated HCMC cards; otherwise retain existing resolver.
old_photo="<article class=\"tc1Exp\">${photoDiv(id,it.title,'tc1ExpPhoto')}<div class=\"tc1ExpCopy\">"
new_photo="<article class=\"tc1Exp\">${it.photo?`<div class=\"tc1ExpPhoto tc1ExpPhotoDirect\" style=\"background-image:url('${esc(it.photo)}')\"></div>`:photoDiv(id,it.title,'tc1ExpPhoto')}<div class=\"tc1ExpCopy\">"
assert old_photo in block
block=block.replace(old_photo,new_photo,1)
# Do not use rater fact-card CSS inside the browse list.
assert '${ratingFacts(it)}' in block
block=block.replace('${ratingFacts(it)}','${experienceListFacts(it)}',1)
s=s[:start]+block+s[end:]

# Destination overview spotlight also uses the exact local image where available.
spot_old="return large?`<button class=\"tc1Feature tc1SpotlightHero ${id==='vietnam'?'vnFallback':''}\" data-open-exp=\"${j}\" ${id==='vietnam'?`data-vnimg=\"${esc(it.title)}\" data-label=\"${esc(it.title)}\"`:`data-label=\"${esc(it.title)}\"`}><span>"
spot_new="return large?`<button class=\"tc1Feature tc1SpotlightHero ${id==='vietnam'&&!it.photo?'vnFallback':''}\" data-open-exp=\"${j}\" ${it.photo?`style=\"background-image:url('${esc(it.photo)}')\"`:(id==='vietnam'?`data-vnimg=\"${esc(it.title)}\" data-label=\"${esc(it.title)}\"`:`data-label=\"${esc(it.title)}\"`)}><span>"
assert spot_old in s
s=s.replace(spot_old,spot_new,1)
# Secondary spotlight direct image too.
sec_old="`<button class=\"tc1SpotlightCard ${id==='vietnam'?'vnFallback':'tc1TextOnly'}\" data-open-exp=\"${j}\" data-label=\"${esc(it.title)}\" ${id==='vietnam'?`data-vnimg=\"${esc(it.title)}\"`:''}><span>"
sec_new="`<button class=\"tc1SpotlightCard ${id==='vietnam'&&!it.photo?'vnFallback':(!it.photo?'tc1TextOnly':'')}\" data-open-exp=\"${j}\" data-label=\"${esc(it.title)}\" ${it.photo?`style=\"background-image:url('${esc(it.photo)}')\"`:(id==='vietnam'?`data-vnimg=\"${esc(it.title)}\"`:'')}><span>"
assert sec_old in s
s=s.replace(sec_old,sec_new,1)
p.write_text(s)

# Styling for clearer filters and clean browse-card metadata. Scope AI labels to local direct images.
p=Path('data/travel-companion-v1-shell.css')
c=p.read_text()
extra="""
/* HCMC experience browse repair: category chips are filters, not navigation. */
.tc1FilterLabel{padding:12px 18px 0;font-size:8px;font-weight:900;letter-spacing:.14em;color:var(--tc-muted)}
.tc1FilterLabel+.tc1Filters{padding-top:7px}
.tc1ExpMeta{display:flex;flex-wrap:wrap;gap:5px;margin:8px 0}
.tc1ExpMeta span{font-size:7px;font-weight:800;line-height:1.2;border:1px solid #33353b;border-radius:999px;padding:5px 7px;color:#c7c7ca;background:#16171a}
.tc1ExpPhotoDirect{background-position:center;background-size:cover;background-repeat:no-repeat}
"""
if 'HCMC experience browse repair' not in c:
    c += extra
p.write_text(c)

# Rater: disclose generated imagery subtly and remove the old hidden pseudo-element rule.
p=Path('data/rater-cinematic-v2.css')
c=p.read_text()
c=c.replace('.tc1RatePhotoDirect:before{display:none!important}','.tc1RatePhotoDirect:before{content:"AI VISUAL";display:block!important;position:absolute;right:10px;top:10px;z-index:3;padding:4px 6px;border-radius:999px;background:#0009;color:#fff;font-size:7px;font-weight:900;letter-spacing:.08em}')
p.write_text(c)

# Cache bust all modified presentation assets.
p=Path('index.html')
i=p.read_text()
i=re.sub(r'data/rater-cinematic-v2\.css\?v=[^"\']+', 'data/rater-cinematic-v2.css?v=20260911-ai-hcm-v1', i)
i=re.sub(r'data/hcm-rater-content-v2\.js\?v=[^"\']+', 'data/hcm-rater-content-v2.js?v=20260911-ai-hcm-v1', i)
i=re.sub(r'data/travel-companion-v1-shell\.js\?v=[^"\']+', 'data/travel-companion-v1-shell.js?v=20260911-ai-hcm-v1', i)
i=re.sub(r'data/travel-companion-v1-shell\.css\?v=[^"\']+', 'data/travel-companion-v1-shell.css?v=20260911-ai-hcm-v1', i)
p.write_text(i)
