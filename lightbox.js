document.addEventListener('click', function (e) {
  var img = e.target.closest('.project-thumb');
  if (!img) return;

  var overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;' +
    'background:rgba(0,0,0,0.9);display:flex;align-items:center;' +
    'justify-content:center;padding:20px;box-sizing:border-box;' +
    'z-index:2147483647;cursor:zoom-out;';

  var big = document.createElement('img');
  big.src = img.currentSrc || img.src;
  big.alt = img.alt;
  big.style.cssText =
    'max-width:100%;max-height:100%;width:auto;height:auto;' +
    'object-fit:contain;border-radius:8px;';

  overlay.appendChild(big);
  document.body.appendChild(overlay);

  function close() {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  }
  function onKey(ev) {
    if (ev.key === 'Escape') close();
  }
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', onKey);
});
