if (!('IntersectionObserver' in window)) {
  document.querySelectorAll(
    '.fade-card,.scroll-animate,.need-card,.product-card,.timeline-item,.team-card-apple,.team-heading-apple,.team-subheading-apple'
  ).forEach(function(el){ el.classList.add('show'); el.classList.add('visible'); });
}

(function(){
  function normalizeLegacyPath(pathname) {
    return pathname
      .replace(/^\/business\/c(\/|$)/, '/business/services/c$1')
      .replace(/^\/business\/p(\/|$)/, '/business/services/p$1')
      .replace(/^\/public\/index\.html$/, '/business/services/g/')
      .replace(/^\/public\/uuid\.html$/, '/business/services/g/uuid.html')
      .replace(/^\/public\/gemini\/gemini\.html$/, '/business/services/g/gemini/');
  }

  function normalizeAnchor(anchor) {
    var raw = anchor.getAttribute('href');
    if (!raw || raw.charAt(0) === '#' || /^(mailto:|tel:|javascript:|data:)/i.test(raw)) return;
    try {
      var url = new URL(raw, window.location.origin);
      if (url.origin !== window.location.origin) return;
      var nextPath = normalizeLegacyPath(url.pathname);
      if (nextPath === url.pathname) return;
      anchor.setAttribute('href', nextPath + url.search + url.hash);
    } catch(e) {}
  }

  function normalizeLinks(root) {
    (root || document).querySelectorAll('a[href]').forEach(normalizeAnchor);
  }

  function setVH(){
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }
  setVH();
  window.addEventListener('resize', setVH, { passive: true });
  normalizeLinks(document);
  if ('MutationObserver' in window) {
    new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType !== 1) return;
          if (node.matches && node.matches('a[href]')) normalizeAnchor(node);
          if (node.querySelectorAll) normalizeLinks(node);
        });
      });
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
  try {
    var bsVar = getComputedStyle(document.documentElement).getPropertyValue('--bs-body-font-family');
    if (!bsVar) { document.documentElement.classList.add('no-bootstrap'); }
  } catch(e) {}
})();
