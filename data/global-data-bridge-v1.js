/* Expose the app's lexical DATA binding to extension/audit runtimes.
 * Classic-script top-level const bindings are visible to later scripts but are
 * not properties of window. This bridge gives runtime modules a stable handle.
 */
(()=>{
'use strict';
try{
 if(!window.DATA && typeof DATA!=='undefined')window.DATA=DATA;
 if(!window.TC1_DATA && typeof DATA!=='undefined')window.TC1_DATA=DATA;
}catch(e){console.warn('DATA bridge unavailable',e)}
})();
