from pathlib import Path

# 1) Use a stable Wikimedia image for Jade Emperor Pagoda and reset scroll when a rating card renders.
p=Path('data/hcm-rater-content-v2.js')
s=p.read_text()
s=s.replace("https://peacetour.com.vn/Upload/Article/fe9cc6b4-69c2-4af6-b29c-b6213b0031ad/du-lich-tphcm-chua-ngoc-hoang-1.jpeg","https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Jade_Emperor_Pagoda_Saigon.jpg/960px-Jade_Emperor_Pagoda_Saigon.jpg")
marker="window.TC1_HCM_RATER_POLISH={count:P.length,match};\n})();"
insert="""window.TC1_HCM_RATER_POLISH={count:P.length,match};

// Mobile Safari can retain the previous scroll position when the rater re-renders.
// Reset only when a rating screen is inserted so the orange RATE kicker and heading are visible.
const root=document.getElementById('app')||document.body;
if(root&&typeof MutationObserver!=='undefined'){
  let queued=false;
  new MutationObserver(()=>{
    if(!document.querySelector('.tc1RaterScreen')||queued)return;
    queued=true;
    requestAnimationFrame(()=>{window.scrollTo(0,0);queued=false;});
  }).observe(root,{childList:true,subtree:true});
}
})();"""
assert marker in s
s=s.replace(marker,insert,1)
p.write_text(s)

# 2) Bring the rendered mobile scale back to the approved compact proposal.
p=Path('data/rater-cinematic-v2.css')
s=p.read_text()
repls={
"padding:calc(18px + env(safe-area-inset-top)) 18px 0!important":"padding:calc(12px + env(safe-area-inset-top)) 18px 0!important",
"width:44px!important;height:44px!important":"width:40px!important;height:40px!important",
"padding:25px 18px 0!important":"padding:15px 18px 0!important",
"font:700 clamp(46px,12.6vw,58px)/.91":"font:700 clamp(38px,10.2vw,46px)/.92",
"margin:13px 18px 16px!important":"margin:10px 18px 12px!important",
"height:225px!important":"height:150px!important",
"padding:15px 17px 18px!important":"padding:13px 17px 15px!important",
"font:700 clamp(36px,10vw,48px)/.94":"font:700 clamp(30px,8.2vw,38px)/.95",
"font-size:14px!important;line-height:1.48!important":"font-size:13px!important;line-height:1.44!important",
"padding:14px 15px 14px 17px!important;margin:0 0 15px!important":"padding:12px 14px 12px 16px!important;margin:0 0 12px!important",
"font-size:13px!important;line-height:1.45!important":"font-size:12px!important;line-height:1.42!important",
"min-height:83px!important":"min-height:72px!important",
"min-height:98px!important":"min-height:84px!important",
"height:58px!important":"height:52px!important",
"font-size:16px!important":"font-size:15px!important"
}
for a,b in repls.items():
    assert a in s, a
    s=s.replace(a,b,1)
# Ensure kicker cannot be hidden by inherited legacy styling.
s += "\n/* V4 mobile fit: preserve the approved orange rater kicker. */\n.tc1RaterHead .tc1Scope{display:block!important;visibility:visible!important;opacity:1!important;color:#e0734b!important;position:relative!important;z-index:2!important}\n"
p.write_text(s)

# 3) Bust Safari cache for both rater assets.
p=Path('index.html')
s=p.read_text()
s=s.replace('data/rater-cinematic-v2.css?v=20260911-cinematic-v2','data/rater-cinematic-v2.css?v=20260911-rater-v4')
s=s.replace('data/hcm-rater-content-v2.js?v=20260911-cinematic-v2','data/hcm-rater-content-v2.js?v=20260911-rater-v4')
p.write_text(s)
