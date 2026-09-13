/* Grok missing place-hero patch. Do not edit index.html.
 * Adds destination hero URLs into VN_PHOTO_MANIFEST.
 * Licence: Wikimedia Commons, TO CHECK.
 */
(() => {
  'use strict';
  if (window.__GROK_MISSING_HEROES_V1__) return;
  window.__GROK_MISSING_HEROES_V1__ = true;

  const fp = (file) =>
    'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(file);

  const HEROES = {
    'Sa Đéc': { url: fp('Một vườn hoa lan ở Sa Đéc.jpg'), subject: 'Sa Dec flower nursery' },
    'Châu Đốc': { url: 'assets/images/destinations/chau-doc.jpg', subject: 'Hang Pagoda, Chau Doc' },
    'Phú Yên': { url: fp('Gành Đá Đĩa - Phú Yên.jpg'), subject: 'Ganh Da Dia, Phu Yen' },
    'Hải Vân Pass': { url: fp('Hải Vân Gate, Hải Vân Pass, Vietnam (6944533488).jpg'), subject: 'Hai Van Gate' },
    'Cao Bằng': { url: fp('Ban Gioc Waterfalls I.jpg'), subject: 'Ban Gioc falls' },
    'Mù Cang Chải': { url: fp('Terraces in Che Cu Nha commune, Mu Cang Chai (Unsplash).jpg'), subject: 'Mu Cang Chai terraces' },
    'Bắc Hà': { url: fp('Bắc Hà Sunday market, Vietnam - 20131027-15.JPG'), subject: 'Bac Ha Sunday market' }
  };

  function mergeManifest() {
    /* Never create the manifest here.  The standard resolver owns that load;
       creating a partial object first suppresses all of its existing photos. */
    const m = window.VN_PHOTO_MANIFEST;
    if (!m) return false;
    Object.entries(HEROES).forEach(([name, spec]) => {
      if (!spec.url || (m[name] && m[name].local)) return;
      m[name] = {
        source: spec.url,
        local: spec.url,
        licenseStatus: 'TO CHECK',
        attributionStatus: 'TO CHECK',
        subject: spec.subject,
        grokPatch: true
      };
    });
    return true;
  }

  function waitForManifest(tries = 0) {
    if (mergeManifest() || tries >= 80) return;
    setTimeout(() => waitForManifest(tries + 1), 50);
  }

  waitForManifest();
})();
