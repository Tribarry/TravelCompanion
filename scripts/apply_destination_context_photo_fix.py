from pathlib import Path
import re

p=Path('data/travel-companion-v1-shell.js')
s=p.read_text()

# Remove the destination-level editorial block from destination overview only.
start=s.find('<div class="tc1OverviewContext">')
if start < 0: raise SystemExit('overview context not found')
end=s.find('<div class="tc1PassportSection">', start)
if end < 0: raise SystemExit('passport boundary not found')
s=s[:start]+s[end:]

# Remove Destination context from experience-detail pages. Country overview remains untouched.
patterns=[
 r'<div class="tc1DetailSection"><h2>Destination context</h2>.*?</div>',
 r'<section class="tc1DetailSection"><h2>Destination context</h2>.*?</section>',
 r'<div class="tc1DetailBlock"><h2>Destination context</h2>.*?</div>',
 r'<section[^>]*><h2>Destination context</h2>.*?</section>'
]
removed=False
for pat in patterns:
    ns,n=re.subn(pat,'',s,count=1,flags=re.S)
    if n:
        s=ns; removed=True; break
if not removed:
    # Last-resort exact template fragment: remove the smallest containing block around the heading.
    pos=s.find('Destination context')
    if pos>=0:
        left=max(s.rfind('<div',0,pos),s.rfind('<section',0,pos))
        tag='section' if s.startswith('<section',left) else 'div'
        right=s.find(f'</{tag}>',pos)
        if left>=0 and right>=0:
            s=s[:left]+s[right+len(tag)+3:]; removed=True
if not removed: raise SystemExit('detail Destination context not found')

# Reuse the already-curated rater photo for each spotlight experience.
needle="const spot=(it,large=false)=>{if(!it)return'';const j=it.index??its.indexOf(it),tag="
if needle not in s: raise SystemExit('spot helper not found')
s=s.replace(needle,"const spot=(it,large=false)=>{if(!it)return'';const j=it.index??its.indexOf(it),photo=(window.TC1RaterPhoto?.(id,d,it)||''),tag=",1)
# Apply direct photo to both hero and small spotlight buttons.
s=s.replace('data-label="${esc(it.title)}"`}><span>', 'data-label="${esc(it.title)}"`} style="${photo?`background-image:url(\'${esc(photo)}\')`:``}"><span>',1)
s=s.replace('data-vnimg="${esc(it.title)}"`:``}><span>', 'data-vnimg="${esc(it.title)}"`:``} style="${photo?`background-image:url(\'${esc(photo)}\')`:``}"><span>',1)

p.write_text(s)

# Cache-bust shell and add a small direct-photo guard so legacy hydration cannot paint over curated spotlights.
idx=Path('index.html'); x=idx.read_text()
x=re.sub(r'data/travel-companion-v1-shell\.js\?v=[^"\']+', 'data/travel-companion-v1-shell.js?v=20260911-context-photo-v6', x)
idx.write_text(x)

css=Path('data/rater-cinematic-v2.css'); c=css.read_text()
marker='/* V6 spotlight direct-photo protection */'
if marker not in c:
    c += '\n\n'+marker+'\n.tc1SpotlightHero[style*="background-image"],.tc1SpotlightCard[style*="background-image"]{background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important}\n'
css.write_text(c)

# Contracts
assert 'tc1OverviewContext' not in s
assert 'Destination context' not in s
assert 'TC1RaterPhoto?.(id,d,it)' in s
assert 'background-image:url' in s
assert "state.here=id+':'+i" in s
print('DESTINATION CONTEXT + SPOTLIGHT PHOTO FIX APPLIED')
