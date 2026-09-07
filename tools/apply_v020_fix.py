from pathlib import Path
p=Path('index.html')
s=p.read_text(encoding='utf-8')
if '/* V0.20 VIETNAM OPEN FIX + LANDING CLEANUP */' in s:
    raise SystemExit('already applied')
# The V0.19 hub used fields from an earlier data model. Current destination records use stay/priority.
s=s.replace('${x.d.days} DAYS','${x.d.stay||x.d.days||"Flexible"} DAYS')
s=s.replace('${x.d.tier} PRIORITY','${x.d.priority||x.d.tier||"Explore"} PRIORITY')
# V0.19 next destination lookup used the obsolete countries[].destinations shape.
s=s.replace("let hero=x.d.name;app.innerHTML=", "let hero=x.d.name;app.innerHTML=")
s=s.replace("next=DATA.countries.find(c=>c.id==='vietnam').destinations[x.di+1]", "next=(DATA.destinations?.vietnam||[])[x.di+1]")
# V0.19 Go Next wrote a legacy human-readable location. Keep the selector's canonical country:index state format.
s=s.replace("state.here='Vietnam · '+next.name;save();vnHub()", "state.here='vietnam:'+(x.di+1);save();vnHub()")
# Landing: remove country/flag tiles and swipe instruction while preserving the photo carousel.
css='''\n/* V0.20 VIETNAM OPEN FIX + LANDING CLEANUP */\n.coverCountries{display:none!important}\n.swipeHint{display:none!important}\n.coverCopy{padding-bottom:8px}\n'''
s=s.replace('</style>',css+'\n</style>',1)
s=s.replace('DATA.version="0.19";','DATA.version="0.20";',1)
p.write_text(s,encoding='utf-8')
print('V0.20 applied')
