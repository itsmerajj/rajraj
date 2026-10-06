document.addEventListener('click', function (e) {
  var thumb = e.target.closest('.project-thumb');
  if (!thumb) return;

  var overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;' +
    'background:rgba(0,0,0,0.92);display:flex;overflow:auto;' +
    'z-index:2147483647;cursor:zoom-out;';

  var big = document.createElement('img');
  big.src = thumb.currentSrc || thumb.src;
  big.alt = thumb.alt;

  var actualSize = false;
  function fitScreen() {
    big.style.cssText =
      'margin:auto;width:96vw;height:96vh;object-fit:contain;cursor:zoom-in;';
  }
  function realSize() {
    big.style.cssText =
      'margin:auto;width:auto;height:auto;max-width:none;max-height:none;cursor:zoom-out;';
  }
  fitScreen();

  big.addEventListener('click', function (ev) {
    ev.stopPropagation();
    actualSize = !actualSize;
    if (actualSize) { realSize(); } else { fitScreen(); }
  });

  var closeBtn = document.createElement('button');
  closeBtn.textContent = '\u2715';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.style.cssText =
    'position:fixed;top:12px;right:16px;font-size:24px;line-height:1;' +
    'background:rgba(255,255,255,0.9);border:none;border-radius:50%;' +
    'width:40px;height:40px;cursor:pointer;z-index:2147483647;';

  overlay.appendChild(big);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  function close() {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  }
  function onKey(ev) {
    if (ev.key === 'Escape') close();
  }
  overlay.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', onKey);
});
