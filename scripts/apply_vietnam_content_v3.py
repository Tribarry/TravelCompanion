from pathlib import Path
import re

# Wire the Vietnam-specific content layer before the generic normaliser.
idx = Path('index.html')
s = idx.read_text()
old_exp = '<script src="data/experience-copy-v2.js?v=20260911-content-finish"></script>'
new_vn = '<script src="data/vietnam-experience-content-v3.js?v=20260911-v3"></script>'
if new_vn not in s:
    assert old_exp in s, 'experience-copy script tag not found'
    s = s.replace(old_exp, new_vn + '\n' + old_exp, 1)
s = s.replace('data/experience-copy-v2.js?v=20260911-content-finish', 'data/experience-copy-v2.js?v=20260911-vietnam-v3')
s = s.replace('data/travel-companion-v1-shell.js?v=20260911-food-passports', 'data/travel-companion-v1-shell.js?v=20260911-vietnam-v3')
idx.write_text(s)

# Export coverage metadata from the new content layer for the audit gate.
vp = Path('data/vietnam-experience-content-v3.js')
v = vp.read_text()
v = v.replace("window.TC1VietnamExperienceContent={enrich,destKey,lens,category:cat,ruleFor,version:'2026-09-11-v3'};",
              "window.TC1VietnamExperienceContent={enrich,destKey,lens,category:cat,ruleFor,profileCount:Object.keys(DEST).length,exactRuleCount:RULES.length,version:'2026-09-11-v3'};")
vp.write_text(v)

# Make the generic normaliser defer to the Vietnam V3 content layer for every
# Vietnam experience, while preserving the richer HCMC exact catalogue where it matches.
p = Path('data/experience-copy-v2.js')
s = p.read_text()
new_enrich = r'''function enrich(countryId,destination,item){
  const raw=item?.raw||{};
  const tags=item?.tags||[];
  const hcm=countryId==='vietnam'&&destination?.name==='Ho Chi Minh City'?findHcm(item?.title):null;
  let vn=null;
  if(countryId==='vietnam'&&window.TC1VietnamExperienceContent?.enrich){
    try{vn=window.TC1VietnamExperienceContent.enrich(destination,item)}catch(e){vn=null}
  }
  const title=vn?.title||item?.title;
  const summary=hcm?.summary||vn?.summary||(!weak(item?.summary,item?.title)?sentence(item.summary):generatedSummary(item?.title,destination,tags,raw));
  return {
    ...item,
    title,
    summary:sentence(summary),
    why:sentence(hcm?.summary||vn?.why||summary),
    action:sentence(hcm?.action||vn?.action||actionLine(title,destination,tags,raw)),
    area:hcm?.area||vn?.area||raw.area||'',
    time:hcm?.time||vn?.time||estimateTime(title,tags,raw),
    cost:hcm?.cost||vn?.cost||estimateCost(title,tags,raw),
    booking:hcm?.booking||vn?.booking||bookingText(raw,item?.flags),
    best:hcm?.best||vn?.best||raw.best||'',
    contentSource:hcm?'hcm-curated':(vn?.source||'normalised'),
    photoReady:!!window.TC1_EXPERIENCE_PHOTO_COMPLETE?.[countryId]
  };
}
'''
s, n = re.subn(r'function enrich\(countryId,destination,item\)\{.*?\n\}\n\nwindow\.TC1ExperienceCopy=', new_enrich + '\nwindow.TC1ExperienceCopy=', s, flags=re.S)
assert n == 1, f'enrich replacement count {n}'
p.write_text(s)

# Surface the V3 best-time field in experience details.
sp = Path('data/travel-companion-v1-shell.js')
s = sp.read_text()
old = "['Best time',extra?.best||raw.best||'Depends on conditions']"
new = "['Best time',it.best||extra?.best||raw.best||'Depends on conditions']"
assert old in s or new in s, 'best-time fact marker missing'
s = s.replace(old, new, 1)
sp.write_text(s)
