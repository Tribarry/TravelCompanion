from pathlib import Path

js_path=Path('data/travel-companion-v1-shell.js')
js=js_path.read_text()
start_marker=" if(tab==='overview'){\n  const o=d.orientation||{};body=`"
end_marker=" }else if(tab==='experiences')"
start=js.find(start_marker)
if start < 0:
    raise SystemExit('Destination overview start marker not found')
end=js.find(end_marker,start)
if end < 0:
    raise SystemExit('Destination overview end marker not found')

replacement=r''' if(tab==='overview'){
  const o=d.orientation||{},available=its.filter((it,j)=>!hasState('done',id,i,it,it.index??j)&&!hasState('skip',id,i,it,it.index??j)),priority=available.filter(x=>(x.tags||[]).includes('Must Do')||x.tier==='S+'||x.tier==='S'),spotlight=[...priority,...available.filter(x=>!priority.includes(x))].slice(0,3);
  const spot=(it,large=false)=>{if(!it)return'';const j=it.index??its.indexOf(it),tag=esc((it.tags||[]).slice(0,2).join(' · ')||it.tier||'Experience'),summary=esc(it.summary||'Open for the details, timing and what makes this worth doing.');return large?`<button class="tc1Feature tc1SpotlightHero ${id==='vietnam'?'vnFallback':''}" data-open-exp="${j}" ${id==='vietnam'?`data-vnimg="${esc(it.title)}" data-label="${esc(it.title)}"`:`data-label="${esc(it.title)}"`}><span><small>${tag}</small><b>${esc(it.title)}</b><em>${summary}</em></span></button>`:`<button class="tc1SpotlightCard ${id==='vietnam'?'vnFallback':'tc1NoPhoto'}" data-open-exp="${j}" data-label="${esc(it.title)}" ${id==='vietnam'?`data-vnimg="${esc(it.title)}"`:''}><span><small>${tag}</small><b>${esc(it.title)}</b></span></button>`};
  body=`<div class="tc1DestOverview tc1ExperienceFirst"><div class="tc1Head tc1ExperienceHead"><div><div class="tc1Scope">THE EXPERIENCES</div><h2>Do these first</h2></div><small>${p.done}/${p.total} complete</small></div>${spotlight.length?`${spot(spotlight[0],true)}${spotlight.length>1?`<div class="tc1SpotlightGrid">${spotlight.slice(1).map(x=>spot(x)).join('')}</div>`:''}`:'<div class="tc1Empty" style="margin:0">Everything in your current priority set is complete or skipped.</div>'}<button class="tc1ExploreAll" data-dest-tab="experiences"><span><b>Explore all ${its.length} experiences</b><small>Must do · local life · history · unique</small></span><span>→</span></button><div class="tc1Progress tc1OverviewProgress"><div class="tc1ProgressTop"><span>Trip progress</span><span>${p.pct}%</span></div><div class="tc1Bar"><i style="width:${p.pct}%"></i></div></div><div class="tc1OverviewContext"><div class="tc1Head"><h2>Why this stop matters</h2></div><p class="tc1Context">${esc(d.context||d.summary||o.comeFor||c.subtitle||'')}</p>${Object.keys(o).length?`<div class="tc1Orient tc1OrientExperience"><div><b>COME FOR</b>${esc(o.comeFor||'The strongest local experiences')}</div><div><b>DO DIFFERENTLY</b>${esc(o.doDifferently||'Slow down and go local')}</div><div><b>WTF / UNIQUE</b>${esc(o.wtf||'Look for the one-off local experience')}</div></div>`:''}</div><div class="tc1PassportSection"><div class="tc1Head"><h2>Food & drink passport</h2><small>Keep tasting</small></div><div class="tc1ModuleGrid tc1PassportModules"><button class="tc1Module" data-dest-tab="food" data-pass="food"><strong>${foods.length}</strong><small>Food</small></button><button class="tc1Module" data-dest-tab="food" data-pass="drink"><strong>${drinks.length}</strong><small>Drinks</small></button></div></div>${next?`<button class="tc1Next" data-next-dest><span><small>Next destination</small><b>${esc(next.name)}</b></span><span style="font-size:26px">→</span></button>`:''}</div>`;
'''
js=js[:start]+replacement+js[end:]
js_path.write_text(js)

css_path=Path('data/travel-companion-v1-shell.css')
css=css_path.read_text()
marker='/* Experience-first destination overview */'
if marker not in css:
    css += r'''

/* Experience-first destination overview */
.tc1ExperienceFirst{padding-top:24px}.tc1ExperienceHead{align-items:flex-end;margin-bottom:14px}.tc1ExperienceHead>div{min-width:0}.tc1ExperienceHead .tc1Scope{margin-bottom:5px}.tc1ExperienceHead h2{font-size:34px!important;line-height:.96!important}.tc1SpotlightHero{height:285px!important;border-radius:22px!important}.tc1SpotlightHero>span{bottom:17px!important}.tc1SpotlightHero b{font-size:32px!important;line-height:.98!important;max-width:90%}.tc1SpotlightHero em{display:block;font-style:normal;font-size:10px;line-height:1.4;margin-top:7px;max-width:92%;opacity:.86}.tc1SpotlightGrid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:9px}.tc1SpotlightCard{height:170px;border:0;border-radius:17px;overflow:hidden;position:relative;text-align:left;color:#fff;background:#1a1a1d center/cover no-repeat;padding:0}.tc1SpotlightCard:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.9),rgba(0,0,0,.08) 68%)}.tc1SpotlightCard>span{position:absolute;z-index:2;left:12px;right:12px;bottom:12px}.tc1SpotlightCard small{display:block;font-size:7px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;opacity:.8;margin-bottom:4px}.tc1SpotlightCard b{display:block;font:700 18px/1.02 Georgia,serif}.tc1SpotlightCard.tc1NoPhoto:before{content:attr(data-label);position:absolute;inset:0;display:grid;place-items:center;padding:12px;text-align:center;font-size:10px;font-weight:900;background:linear-gradient(135deg,#17171a,#33343a)}.tc1ExploreAll{width:100%;border:1px solid #36363c;background:#17171a;color:#fff;border-radius:16px;padding:14px 15px;margin-top:10px;display:flex;align-items:center;justify-content:space-between;text-align:left}.tc1ExploreAll b{display:block;font:700 18px Georgia,serif}.tc1ExploreAll small{display:block;margin-top:3px;font-size:8px;letter-spacing:.04em;color:#a9a9b0}.tc1OverviewProgress{margin-top:12px!important}.tc1OverviewContext{margin-top:30px}.tc1OverviewContext .tc1Context{color:#c8c8cc!important}.tc1OrientExperience{grid-template-columns:1fr 1fr 1fr!important}.tc1OrientExperience div{background:#151518!important;border-color:#2d2d32!important;color:#e7e7e9}.tc1PassportSection{margin-top:31px;padding-top:24px;border-top:1px solid #2b2b30}.tc1PassportModules{grid-template-columns:1fr 1fr!important}.tc1PassportModules .tc1Module{background:#151518!important;border-color:#2d2d32!important;color:#f3f3f4!important}.tc1ExperienceFirst .tc1Progress{background:#151518!important;border-color:#2d2d32!important;color:#f3f3f4}.tc1ExperienceFirst .tc1Bar{background:#313137!important}.tc1ExperienceFirst .tc1Bar i{background:var(--tc-orange)!important}@media(max-width:360px){.tc1OrientExperience{grid-template-columns:1fr!important}.tc1SpotlightHero{height:255px!important}.tc1SpotlightHero b{font-size:28px!important}}
'''
css_path.write_text(css)

# Safety checks
js=js_path.read_text(); css=css_path.read_text()
assert '<h2>Do these first</h2>' in js
assert 'tc1SpotlightGrid' in js
assert 'Explore all ${its.length} experiences' in js
assert '<h2>Food & drink passport</h2>' in js
assert '<h2>Don\'t leave without</h2>' not in js
assert '/* Experience-first destination overview */' in css
assert '.tc1SpotlightHero{height:285px' in css
assert '.tc1PassportModules{grid-template-columns:1fr 1fr' in css
assert "state.here=id+':'+i" in js
print('Destination overview redesigned around experience spotlights; content/state hooks preserved.')
