(()=>{
'use strict';
/* V0.27 P0 stabilisation: legacy HCMC V15/V16 screens remain in historical
 * source for now, but no live route may render them. All Vietnam destinations,
 * including Ho Chi Minh City, use the shared Vietnam hub/experience/map/list
 * architecture. This file is intentionally limited to retiring legacy entry
 * points; it does not replace the shared implementations themselves. */
function sharedHub(){return typeof window.vnHub==='function'?window.vnHub():null}
function sharedExperiences(filter='All'){return typeof window.vnExperiences==='function'?window.vnExperiences(filter):null}
function sharedMap(){return typeof window.vietnamMapPage==='function'?window.vietnamMapPage():null}
function sharedSaved(){return sharedExperiences('Saved')}

window.hcmOverviewV15=sharedHub;
window.hcmOverview=sharedHub;
window.hcmExperiencesV15=sharedExperiences;
window.hcmExperiences=sharedExperiences;
window.hcmMyListV16=sharedSaved;
window.hcmMapPageV15=sharedMap;

/* Old HCMC bottom-nav buttons may still exist inside historical passport markup.
 * If such a page renders, force those controls back into the shared architecture. */
window.wireV15=function(){
 document.querySelectorAll('[data-v15]').forEach(b=>b.onclick=()=>{
  const a=b.dataset.v15;
  if(a==='overview')return sharedHub();
  if(a==='do'||a==='experiences')return sharedExperiences('All');
  if(a==='map')return sharedMap();
  if(a==='list')return sharedSaved();
  return sharedHub();
 });
};
})();