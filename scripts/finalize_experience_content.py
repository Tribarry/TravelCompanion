from pathlib import Path
import re

p = Path("index.html")
s = p.read_text()
shell_old = '<script src="data/travel-companion-v1-shell.js?v=20260910-v1"></script>'
shell_new = '<script src="data/travel-companion-v1-shell.js?v=20260911-content-finish"></script>'
if shell_old in s:
    s = s.replace(shell_old, shell_new, 1)
marker = shell_new if shell_new in s else shell_old
if marker not in s:
    raise SystemExit("V1 shell marker missing")
for tag in [
    '<script src="data/hcm-v21-experiences.js?v=20260911-content-finish"></script>',
    '<script src="data/experience-copy-v2.js?v=20260911-content-finish"></script>',
]:
    if tag not in s:
        s = s.replace(marker, tag + "\n" + marker, 1)
s = s.replace(
    "data/travel-companion-v1-shell.css?v=20260910-v1",
    "data/travel-companion-v1-shell.css?v=20260911-content-finish",
)
p.write_text(s)

p = Path("data/travel-companion-v1-shell.js")
s = p.read_text()

item_marker = "function itemFlags(raw,it){const out=[...(it?.flags||[])];const b=raw?.booking;if(b&&b!=='No'&&b!=='Check locally'&&!out.includes(b))out.push(b);return out}\n"
enrich = "function enrichItem(id,d,it){try{return window.TC1ExperienceCopy?.enrich?window.TC1ExperienceCopy.enrich(id,d,it):it}catch(e){return it}}\n"
if "function enrichItem(" not in s:
    if item_marker not in s:
        raise SystemExit("itemFlags marker missing")
    s = s.replace(item_marker, item_marker + enrich, 1)

old_get = """function getItems(id,i){
 const d=destinations(id)[i];if(!d)return[];
 if(id==='vietnam'&&typeof window.vnBaseItems==='function'){
   try{return window.vnBaseItems({c:country(id),d,i,id:id+'-'+i}).map((it,j)=>({id:it.id||'e'+j,title:it.title||it.name||d.experiences?.[j]?.name||'Experience',summary:it.summary||d.experiences?.[j]?.summary||'',tags:it.tags||rawTags(d.experiences?.[j]),flags:itemFlags(d.experiences?.[j],it),tier:it.tier||d.experiences?.[j]?.tier||'',raw:d.experiences?.[j]||{},index:j}))}catch(e){}
 }
 return (d.experiences||[]).map((e,j)=>({id:e.id||'e'+j,title:e.name||e.title||'Experience',summary:e.summary||'',tags:e.tags||rawTags(e),flags:itemFlags(e,e),tier:e.tier||'',raw:e,index:j}));
}
"""
new_get = """function getItems(id,i){
 const d=destinations(id)[i];if(!d)return[];
 if(id==='vietnam'&&typeof window.vnBaseItems==='function'){
   try{return window.vnBaseItems({c:country(id),d,i,id:id+'-'+i}).map((it,j)=>enrichItem(id,d,{id:it.id||'e'+j,title:it.title||it.name||d.experiences?.[j]?.name||'Experience',summary:it.summary||d.experiences?.[j]?.summary||'',tags:it.tags||rawTags(d.experiences?.[j]),flags:itemFlags(d.experiences?.[j],it),tier:it.tier||d.experiences?.[j]?.tier||'',raw:d.experiences?.[j]||{},index:j}))}catch(e){}
 }
 return (d.experiences||[]).map((e,j)=>enrichItem(id,d,{id:e.id||'e'+j,title:e.name||e.title||'Experience',summary:e.summary||'',tags:e.tags||rawTags(e),flags:itemFlags(e,e),tier:e.tier||'',raw:e,index:j}));
}
"""
if old_get in s:
    s = s.replace(old_get, new_get, 1)
elif "enrichItem(id,d,{id:" not in s:
    raise SystemExit("getItems marker missing")

old_facts = """function ratingFacts(it){const r=it?.raw||{};const facts=[['TIME',r.time||r.duration||'Flexible'],['COST',r.cost||'Check locally'],['BOOKING',r.booking||'No advance booking noted']];return `<div class=\"tc1RateFacts\">${facts.map(([a,b])=>`<div><small>${a}</small><b>${esc(b)}</b></div>`).join('')}</div>`}"""
new_facts = """function ratingFacts(it){const r=it?.raw||{};const facts=[['TIME',it?.time||r.time||r.duration||'Flexible'],['INDICATIVE COST',it?.cost||r.cost||'Check locally'],['BOOKING',it?.booking||r.booking||'Usually flexible']];return `<div class=\"tc1RateFacts\">${facts.map(([a,b])=>`<div><small>${a}</small><b>${esc(b)}</b></div>`).join('')}</div>`}"""
if old_facts in s:
    s = s.replace(old_facts, new_facts, 1)
elif "['INDICATIVE COST'" not in s:
    raise SystemExit("ratingFacts marker missing")

old_rate = """<h2>${esc(it.title)}</h2><p>${esc(it.summary||'Open the full experience later for practical details.')}</p>${ratingFacts(it)}${r?"""
new_rate = """<h2>${esc(it.title)}</h2><p>${esc(it.summary||'Open the full experience later for practical details.')}</p>${it.action?`<div class=\"tc1RateAction\"><small>WHAT YOU'LL ACTUALLY DO</small><p>${esc(it.action)}</p></div>`:''}${ratingFacts(it)}${r?"""
if old_rate in s:
    s = s.replace(old_rate, new_rate, 1)
elif "tc1RateAction" not in s:
    raise SystemExit("rating copy marker missing")

old_detail_head = """async function renderDetail(id,i,j){await readyCountry(id);const d=destinations(id)[i],it=getItems(id,i).find(x=>x.index===j);if(!it)return renderDestination(id,i,'experiences');V.last='detail';const extra=id==='vietnam'&&i===0?hcmExtra(it.title):null,raw=it.raw||{},facts=[['Priority',it.tier||'Saved'],['Booking',raw.booking||it.flags?.join(' · ')||'Check locally'],['Time',extra?.time||raw.time||raw.duration||'Flexible'],['Cost',extra?.cost||raw.cost||'Estimate locally'],['Best time',extra?.best||raw.best||'Depends on conditions'],['Content',raw.content||'Optional']];const attrs=id==='vietnam'?heroAttrs(id,it.title,'tc1DetailHero'):'class=\"tc1DetailHero\"';"""
new_detail_head = """async function renderDetail(id,i,j){await readyCountry(id);const d=destinations(id)[i],it=getItems(id,i).find(x=>x.index===j);if(!it)return renderDestination(id,i,'experiences');V.last='detail';const extra=id==='vietnam'&&i===0?hcmExtra(it.title):null,raw=it.raw||{},facts=[['Priority',it.tier||'Saved'],['Booking',it.booking||raw.booking||it.flags?.join(' · ')||'Usually flexible'],['Time',it.time||extra?.time||raw.time||raw.duration||'Flexible'],['Indicative cost',it.cost||extra?.cost||raw.cost||'Check locally'],['Best time',extra?.best||raw.best||'Depends on conditions'],['Content value',raw.content||'Optional']];const attrs='class=\"tc1DetailHero tc1DetailTextHero\"';"""
if old_detail_head in s:
    s = s.replace(old_detail_head, new_detail_head, 1)
elif "tc1DetailTextHero" not in s:
    raise SystemExit("detail header marker missing")

old_why = """<div class=\"tc1DetailBlock\"><h2>Why go</h2><p>${esc(it.summary||d.context||d.summary||'This experience is part of the saved destination bank.')}</p></div>${extra?.do?.length?"""
new_why = """<div class=\"tc1DetailBlock\"><h2>Why go</h2><p>${esc(it.why||it.summary||d.context||d.summary||'This experience is part of the saved destination bank.')}</p></div>${it.action?`<div class=\"tc1DetailBlock\"><h2>What you'll actually do</h2><p>${esc(it.action)}</p></div>`:''}${extra?.do?.length?"""
if old_why in s:
    s = s.replace(old_why, new_why, 1)
elif "What you'll actually do" not in s:
    raise SystemExit("detail body marker missing")

p.write_text(s)

p = Path("data/travel-companion-v1-shell.css")
css = p.read_text()
marker = "/* Final content pass — all-or-nothing experience imagery */"
if marker not in css:
    css += r"""

/* Final content pass — all-or-nothing experience imagery */
.tc1ExpPhoto,.tc1RatePhoto{display:none!important}
.tc1SpotlightHero,.tc1SpotlightCard{background-image:none!important;background:#171719!important;border:1px solid #303036!important}
.tc1SpotlightHero{min-height:0!important;padding:28px 20px!important}
.tc1SpotlightHero span,.tc1SpotlightCard span{position:relative!important;min-height:0!important;padding:0!important;background:none!important}
.tc1SpotlightGrid{align-items:stretch}
.tc1SpotlightCard{min-height:118px!important;padding:18px!important;text-align:left}
.tc1DetailHero.tc1DetailTextHero{background-image:none!important;background:linear-gradient(145deg,#161619,#242429)!important;min-height:42vh}
.tc1RateCard:not(:has(.tc1RatePhoto)){background:#121214;border:1px solid #2d2d32}
.tc1RateAction{margin-top:15px;padding:13px 14px;border-left:3px solid var(--tc-accent,#c96742);background:#18181b;border-radius:0 12px 12px 0}
.tc1RateAction small{display:block;font-size:8px;font-weight:900;letter-spacing:.1em;color:#aaaab1;margin-bottom:6px}
.tc1RateAction p{margin:0!important;font-size:12px!important;line-height:1.5!important;color:#ededf0!important}
.tc1Exp:not(:has(.tc1ExpPhoto)) .tc1ExpCopy{padding-top:18px}
"""
p.write_text(css)

rc = Path("data/remaining-countries-v1-content.js").read_text()
order = ["laos","cambodia","thailand","kazakhstan","kyrgyzstan"]
lines = ["# Experience Content Audit", "", "Generated by the final content pass.", ""]
total_d = total_e = 0
for n,c in enumerate(order):
    start = rc.index(f"DATA.destinations.{c}=")
    end = rc.index(f"DATA.destinations.{order[n+1]}=", start) if n+1 < len(order) else rc.index("window.TC1_EXPERIENCE_PHOTO_COMPLETE", start)
    sec = rc[start:end]
    d = len(re.findall(r"\{name:'", sec))
    e = len(re.findall(r"\bE\('", sec))
    total_d += d
    total_e += e
    lines.append(f"- **{c.title()}**: {d} destinations / {e} written experiences")
lines += [
    "",
    f"**Non-Vietnam total:** {total_d} destinations / {total_e} written experiences.",
    "",
    "**Vietnam:** the canonical locked bank remains the source of truth. Weak one-line or fallback summaries are normalised at render time into complete rating copy. The curated HCMC catalogue supplies richer exact copy where titles match.",
    "",
    "**Images:** experience photography is OFF for all countries until a full exact-photo manifest is approved. Country and destination hero imagery is separate.",
    "",
    "**State:** Saved, Done, Skip and personal ratings are unchanged. Browsing still cannot change current location; only the explicit I'M HERE NOW action can."
]
Path("docs/EXPERIENCE_CONTENT_AUDIT.md").write_text("\n".join(lines)+"\n")

idx = Path("index.html").read_text()
sh = Path("data/travel-companion-v1-shell.js").read_text()
cp = Path("data/experience-copy-v2.js").read_text()
for f in [
    "hcm-v21-experiences.js?v=20260911-content-finish",
    "experience-copy-v2.js?v=20260911-content-finish",
    "travel-companion-v1-shell.js?v=20260911-content-finish",
]:
    assert f in idx, f
assert idx.index("hcm-v21-experiences.js?v=20260911-content-finish") < idx.index("experience-copy-v2.js?v=20260911-content-finish") < idx.index("travel-companion-v1-shell.js?v=20260911-content-finish")
assert sh.count("state.here=id+':'+i") == 1
for token in ["toggleDone","toggleSkip","toggleSaved","setPersonalRating","tc1RateAction","What you'll actually do","['INDICATIVE COST'"]:
    assert token in sh, token
for c in ["vietnam","laos","cambodia","thailand","kazakhstan","kyrgyzstan"]:
    assert re.search(rf"\b{c}:false\b", cp), c
assert ".tc1ExpPhoto,.tc1RatePhoto{display:none!important}" in css
for token in ["Gibbon Experience Classic","Kuang Si Waterfall","Nam Nern Night Safari","Vientiane","Savannakhet","Sekong","Attapeu","Koh Rong","Kep Crab Market","Southern Islands","Kolsai Lake 1","Kaindy Lake","Multi-day horse expedition","Song-Köl"]:
    assert token in rc, token
hc = Path("data/hcm-v21-experiences.js").read_text()
for token in ["War Remnants Museum","Chợ Lớn deep dive","Vietnamese coffee culture + phin workshop","Cần Giờ mangrove adventure"]:
    assert token in hc, token
print("FINAL CONTENT CONTRACT PASS")
