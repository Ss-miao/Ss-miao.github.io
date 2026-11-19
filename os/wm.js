/* ===================================================================
   黄淼 OS · 窗口管理器
   -------------------------------------------------------------------
   一个很小的窗口系统：拖动 / 改大小 / 最大化 / 最小化到 Dock / 关闭。
   手机上（窗口宽度 < 760）不收拖动，所有窗口直接铺满——手机上拖窗口
   没有意义，铺满才是对的。
   =================================================================== */
(function () {
  var desk = null, zTop = 10, openN = 0;
  var wins = {};
  var MOBILE = window.matchMedia('(max-width: 760px)').matches;
  var MIN_W = 360, MIN_H = 260;

  function D() { desk = desk || document.getElementById('desktop'); return desk; }

  function focus(el) { zTop += 1; el.style.zIndex = zTop; }

  function dockOf(id) { return document.querySelector('.dock-item[data-app="' + id + '"]'); }

  function setRunning(id, on) {
    var d = dockOf(id);
    if (d) d.classList.toggle('running', !!on);
  }

  function close(id) {
    var el = wins[id]; if (!el) return;
    el.classList.add('closing');
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 190);
    delete wins[id];
    setRunning(id, false);
    hint();
    document.dispatchEvent(new CustomEvent('os:close', { detail: { id: id } }));
  }

  function minimize(id) {
    var el = wins[id]; if (!el || el.__min) return;
    el.__min = true;
    var d = document.querySelector('.dock').getBoundingClientRect();
    var r = el.getBoundingClientRect();
    el.style.transformOrigin = 'center';
    el.style.transition = 'transform .34s cubic-bezier(.4,0,.2,1), opacity .28s ease';
    el.style.transform = 'translate(' + (d.left + d.width / 2 - (r.left + r.width / 2)) + 'px,' +
      (d.top + 26 - (r.top + r.height / 2)) + 'px) scale(.05)';
    el.style.opacity = '0';
    setTimeout(function () { if (el.__min) el.style.visibility = 'hidden'; }, 340);
  }

  function restore(id) {
    var el = wins[id]; if (!el) return;
    if (el.__min) {
      el.__min = false;
      el.style.visibility = '';
      void el.offsetWidth;
      el.style.transform = '';
      el.style.opacity = '';
      setTimeout(function () { el.style.transition = ''; }, 360);
    }
    focus(el);
  }

  function maxHeight() {
    var d = D(), dock = document.querySelector('.dock');
    if (!dock) return d.clientHeight;
    return Math.max(260, dock.getBoundingClientRect().top - d.getBoundingClientRect().top - 12);
  }

  function toggleMax(id) {
    var el = wins[id]; if (!el || MOBILE) return;
    var r = el.getBoundingClientRect();
    el.style.width = r.width + 'px';
    el.style.height = r.height + 'px';
    el.style.transition = 'left .32s cubic-bezier(.4,0,.2,1), top .32s cubic-bezier(.4,0,.2,1), width .32s cubic-bezier(.4,0,.2,1), height .32s cubic-bezier(.4,0,.2,1), border-radius .32s';
    if (!el.classList.contains('max')) {
      el.__rect = { l: el.offsetLeft, t: el.offsetTop, w: r.width, h: r.height };
      el.classList.add('max');
      el.style.left = '0px';
      el.style.top = '12px';
      el.style.width = D().clientWidth + 'px';
      el.style.height = maxHeight() + 'px';
    } else {
      var p = el.__rect || { l: 40, t: 60, w: 720, h: 520 };
      el.classList.remove('max');
      el.style.left = p.l + 'px'; el.style.top = p.t + 'px';
      el.style.width = p.w + 'px'; el.style.height = p.h + 'px';
    }
    setTimeout(function () { el.style.transition = ''; }, 340);
    focus(el);
  }

  function hint() {
    var h = document.querySelector('.desk-hint');
    if (h) h.classList.toggle('hide', Object.keys(wins).length > 0);
  }

  function drag(el, bar) {
    if (MOBILE) return;
    var sx, sy, ox, oy, on = false;
    bar.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.traffic') || e.target.closest('button') && !e.target.closest('.win-title')) return;
      if (e.target.closest('input,textarea,[contenteditable]')) return;
      if (el.classList.contains('max')) return;
      on = true; sx = e.clientX; sy = e.clientY; ox = el.offsetLeft; oy = el.offsetTop;
      try { bar.setPointerCapture(e.pointerId); } catch (_) {}
    });
    bar.addEventListener('pointermove', function (e) {
      if (!on) return;
      var x = ox + (e.clientX - sx), y = oy + (e.clientY - sy);
      el.style.left = Math.min(Math.max(x, 90 - el.offsetWidth), D().clientWidth - 90) + 'px';
      el.style.top = Math.min(Math.max(y, 4), D().clientHeight - 52) + 'px';
    });
    bar.addEventListener('pointerup', function () { on = false; });
    bar.addEventListener('pointercancel', function () { on = false; });
  }

  function resizers(el) {
    if (MOBILE) return;
    ['r', 'b', 'br'].forEach(function (k) {
      var h = document.createElement('div');
      h.className = 'rz rz-' + k;
      el.appendChild(h);
      h.addEventListener('pointerdown', function (e) {
        if (el.classList.contains('max') || e.button !== 0) return;
        e.preventDefault(); e.stopPropagation(); focus(el);
        var sx = e.clientX, sy = e.clientY;
        var r = el.getBoundingClientRect(), sl = el.offsetLeft, st = el.offsetTop;
        try { h.setPointerCapture(e.pointerId); } catch (_) {}
        function mv(ev) {
          var dx = ev.clientX - sx, dy = ev.clientY - sy;
          if (k.indexOf('r') >= 0) el.style.width = Math.min(Math.max(MIN_W, r.width + dx), D().clientWidth - sl) + 'px';
          if (k.indexOf('b') >= 0) el.style.height = Math.min(Math.max(MIN_H, r.height + dy), maxHeight() - st + 12) + 'px';
        }
        function up() { h.removeEventListener('pointermove', mv); h.removeEventListener('pointerup', up); }
        h.addEventListener('pointermove', mv); h.addEventListener('pointerup', up);
      });
    });
  }

  function open(id, o) {
    o = o || {};
    var dl = D();
    if (wins[id]) { restore(id); return wins[id]; }

    var el = document.createElement('section');
    el.className = 'window' + (o.klass ? ' ' + o.klass : '') + (MOBILE ? ' sheet' : '');
    el.dataset.app = id;
    if (!MOBILE) {
      if (o.width) el.style.width = 'min(' + o.width + 'px, calc(100vw - 96px))';
      if (o.height) el.style.height = 'min(' + o.height + 'px, calc(100% - 92px))';
    }

    /* 标题栏 */
    var bar = document.createElement('header');
    bar.className = 'win-bar';
    var tl = document.createElement('div');
    tl.className = 'traffic';
    [['t-close', '关闭'], ['t-min', '最小化'], ['t-max', '最大化']].forEach(function (b) {
      var x = document.createElement('button');
      x.className = b[0]; x.title = b[1]; x.setAttribute('aria-label', b[1]);
      x.innerHTML = '<i></i>';
      tl.appendChild(x);
    });
    bar.appendChild(tl);
    if (o.barHtml) {
      var wrap = document.createElement('div');
      wrap.className = 'bar-slot';
      wrap.innerHTML = o.barHtml;
      bar.appendChild(wrap);
    } else {
      var tt = document.createElement('span');
      tt.className = 'win-title';
      tt.textContent = o.title || '';
      bar.appendChild(tt);
    }
    if (MOBILE) {
      var back = document.createElement('button');
      back.className = 'win-back'; back.textContent = '返回';
      bar.appendChild(back);
      back.addEventListener('click', function () { close(id); });
    }

    var body = document.createElement('div');
    body.className = 'win-body' + (o.bodyClass ? ' ' + o.bodyClass : '');
    body.innerHTML = o.html || '';

    el.appendChild(bar); el.appendChild(body);
    dl.appendChild(el);

    /* 位置：级联，略往右下错开 */
    if (!MOBILE) {
      var w = Math.min(o.width || 760, dl.clientWidth - 96);
      var n = openN % 6;
      el.style.left = Math.max(24, (dl.clientWidth - w) / 2 + (n - 2) * 42) + 'px';
      el.style.top = Math.max(18, 46 + n * 34) + 'px';
    }
    openN++;

    tl.querySelector('.t-close').addEventListener('click', function (e) { e.stopPropagation(); close(id); });
    tl.querySelector('.t-min').addEventListener('click', function (e) { e.stopPropagation(); MOBILE ? close(id) : minimize(id); });
    tl.querySelector('.t-max').addEventListener('click', function (e) { e.stopPropagation(); toggleMax(id); });
    el.addEventListener('pointerdown', function () { focus(el); });
    drag(el, bar);
    resizers(el);

    wins[id] = el;
    focus(el);
    void el.offsetWidth;
    requestAnimationFrame(function () { el.classList.add('open'); });
    setRunning(id, true);
    hint();

    if (typeof o.onMount === 'function') o.onMount(el, body);
    document.dispatchEvent(new CustomEvent('os:open', { detail: { id: id, el: el, body: body } }));
    return el;
  }

  window.OS_WM = {
    open: open, close: close, minimize: minimize, restore: restore, toggleMax: toggleMax,
    get mobile() { return MOBILE; },
    isOpen: function (id) { return !!wins[id]; },
    body: function (id) { return wins[id] ? wins[id].querySelector('.win-body') : null; }
  };
})();
