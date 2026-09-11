from pathlib import Path

# 1) Replace the poor fish-sauce bottle image with an actual bowl of nước mắm.
p=Path('data/hcm-rater-content-v2.js')
s=p.read_text()
old='https://commons.wikimedia.org/wiki/Special:Redirect/file/N%C6%B0%E1%BB%9Bc%20m%E1%BA%AFm%20bottle.JPG?width=1400'
new='https://commons.wikimedia.org/wiki/Special:Redirect/file/Nuocmam1.jpg?width=1400'
assert old in s, 'old fish-sauce photo mapping not found'
s=s.replace(old,new,1)
p.write_text(s)

# 2) Add a final presentation override. This intentionally does not touch state/data logic.
p=Path('data/rater-cinematic-v2.css')
c=p.read_text()
marker='/* V5 destination cleanup: cinematic rater + passport-style experience library */'
if marker not in c:
    c += r'''

/* V5 destination cleanup: cinematic rater + passport-style experience library */
/* Remove the generic editorial block from destination overview. */
.tc1OverviewContext{display:none!important}

/* Rating card: make the photograph the emotional hero and let it dissolve into the card. */
.tc1RateCard{background:#0e0f12!important;border-color:#2b2d32!important}
.tc1RatePhoto{height:330px!important;margin:0!important;position:relative!important;z-index:0!important}
.tc1RatePhoto:after{content:""!important;display:block!important;position:absolute!important;inset:38% 0 -2px!important;background:linear-gradient(180deg,rgba(14,15,18,0) 0%,rgba(14,15,18,.20) 38%,#0e0f12 100%)!important;pointer-events:none!important}
.tc1RateCopy{position:relative!important;z-index:2!important;margin-top:-58px!important;padding:20px 17px 16px!important;background:linear-gradient(180deg,rgba(14,15,18,0) 0,#0e0f12 58px)!important}
.tc1RateMeta{margin-top:3px!important}

/* Experiences library: use the same compact two-column card rhythm as Food & Drink Passport. */
.tc1ExpList{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;padding:12px 18px 28px!important}
.tc1Exp{display:flex!important;flex-direction:column!important;min-width:0!important;margin:0!important;padding:0!important;gap:0!important;overflow:hidden!important;background:var(--tc-paper2)!important;border:1px solid var(--tc-line)!important;border-radius:16px!important}
.tc1ExpPhoto{display:block!important;width:100%!important;height:126px!important;min-height:126px!important;border-radius:0!important;background-position:center!important;background-size:cover!important}
.tc1ExpCopy{display:block!important;width:auto!important;min-width:0!important;padding:12px!important}
.tc1Exp .tc1Tags{margin-bottom:7px!important}
.tc1Exp h3{font:700 20px/1.02 Georgia,serif!important;margin:4px 0 8px!important;overflow-wrap:anywhere!important}
.tc1Exp p{font-size:10px!important;line-height:1.42!important;margin:0 0 9px!important;display:-webkit-box!important;-webkit-line-clamp:4!important;-webkit-box-orient:vertical!important;overflow:hidden!important}
.tc1Exp .tc1Flags{margin:7px 0!important}
.tc1Exp .tc1Actions{display:grid!important;grid-template-columns:1fr 1fr!important;gap:6px!important;margin-top:9px!important}
.tc1Exp .tc1Actions button{min-width:0!important;padding:8px 5px!important}
.tc1Exp .tc1Actions button.detail{grid-column:1/-1!important;color:#f1f1f1!important;border-color:#444!important}

@media(max-width:370px){
 .tc1RatePhoto{height:300px!important}
 .tc1ExpList{grid-template-columns:1fr!important}
 .tc1ExpPhoto{height:180px!important}
}
'''
p.write_text(c)

# 3) Cache bust assets already loaded by index.
p=Path('index.html')
i=p.read_text()
i=i.replace('data/rater-cinematic-v2.css?v=20260911-real-hcm-v1','data/rater-cinematic-v2.css?v=20260911-ui-v5')
i=i.replace('data/hcm-rater-content-v2.js?v=20260911-real-hcm-v1','data/hcm-rater-content-v2.js?v=20260911-ui-v5')
p.write_text(i)

print('SAIGON UI CLEANUP APPLIED')
