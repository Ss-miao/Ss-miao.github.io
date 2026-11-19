/* ===================================================================
   黄淼 OS · 桌面上的程序
   -------------------------------------------------------------------
   rooms   我的房间  → 两间房子的点云，点开推门进去
   works   我的作品  → 21 件片子
   about   关于我
   contact 联系
   readme  说明.txt
   =================================================================== */
(function () {
  var D = window.OS_DATA, WM = window.OS_WM;
  var ico = function (id, cls) { return '<svg class="' + (cls || '') + '"><use href="#' + id + '"/></svg>'; };
  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };

  /* ---------------- 我的房间 ---------------- */
  function roomsHtml() {
    var cards = D.rooms.map(function (r, i) {
      return '<article class="rm-card" data-room="' + r.p + '">' +
        '<div class="rm-cover"><img src="' + r.cover + '" alt="' + esc(r.name) + '">' +
        '<span class="rm-no">SCAN / 00' + (i + 1) + '</span>' +
        '<span class="rm-span">' + r.span + '</span></div>' +
        '<div class="rm-txt">' +
        '<b>' + esc(r.name) + '</b>' +
        '<span class="rm-en">' + r.en + '</span>' +
        '<p>' + esc(r.blurb) + '</p>' +
        '<span class="rm-meta">' + r.meta + '</span>' +
        '</div>' +
        '<button class="rm-go" type="button">推门进去' + ico('ic-arrow') + '</button>' +
        '</article>';
    }).join('');

    return '<div class="rm-wrap">' +
      '<div class="rm-head">' +
      '<div><h2>我的房间</h2><p>两间住过的房子，用手机绕着走一圈扫成点云，原样存在这里。</p></div>' +
      '<span class="rm-tip">' + ico('ic-move') + ' 走进去以后：摇杆 / WASD 走 · 拖画面转头 · E 交互</span>' +
      '</div>' +
      '<div class="rm-grid">' + cards + '</div>' +
      '<p class="rm-foot">眼高固定 1.60 m，不能跳、不能飞——因为人就是这么高。柜子里面是黑的，拍的时候门关着。</p>' +
      '</div>';
  }

  function openRoom(p) {
    var room = D.rooms.filter(function (r) { return r.p === p; })[0] || D.rooms[0];
    var id = 'room-' + room.p;
    var html = '<iframe class="room-frame" src="' + room.url + '&embed=1" title="' + esc(room.name) +
      '" allow="fullscreen; pointer-lock; gyroscope; accelerometer; xr-spatial-tracking"></iframe>';
    var el = WM.open(id, {
      title: '房间 · ' + room.name,
      klass: 'app-room',
      width: 1180, height: 760,
      barHtml: '<span class="win-title">' + esc(room.name) + '</span>' +
        '<span class="bar-acts">' +
        '<button class="bar-btn" data-full type="button">' + ico('ic-full') + '全屏</button>' +
        '<a class="bar-btn" href="' + room.url + '" target="_blank" rel="noopener">' + ico('ic-out') + '新窗口</a>' +
        '</span>',
      html: html
    });
    if (!WM.mobile) setTimeout(function () { WM.toggleMax(id); }, 60);
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-full]');
      if (!b) return;
      var f = el.querySelector('.room-frame');
      if (f && f.requestFullscreen) f.requestFullscreen();
      else if (f && f.contentDocument) f.contentDocument.documentElement.requestFullscreen();
    });
  }

  /* ---------------- 我的作品 ---------------- */
  function worksHtml() {
    var chips = D.workCats.map(function (c, i) {
      return '<button class="wk-chip' + (i === 0 ? ' on' : '') + '" data-cat="' + c.k + '" type="button">' + c.t +
        '<i>' + (c.k === 'all' ? D.works.length : D.works.filter(function (w) { return w.cat === c.k; }).length) + '</i></button>';
    }).join('');
    var cards = D.works.map(function (w, i) {
      return '<button class="wk-card" data-i="' + i + '" data-cat="' + w.cat + '" type="button">' +
        '<span class="wk-thumb"><img src="' + w.img + '" alt="" loading="lazy">' +
        (w.video ? '<i class="wk-play"></i>' : '') +
        (w.dur ? '<i class="wk-dur">' + w.dur + '</i>' : '') + '</span>' +
        '<span class="wk-nm">' + esc(w.t) + '</span>' +
        '<span class="wk-d">' + esc(w.d) + '</span>' +
        '</button>';
    }).join('');
    return '<div class="wk-wrap">' +
      '<div class="wk-head"><h2>我的作品</h2><b>' + D.works.length + '</b><span>件</span>' +
      '<p>实拍与生成，都来自真实项目。</p></div>' +
      '<div class="wk-chips">' + chips + '</div>' +
      '<div class="wk-grid">' + cards + '</div></div>';
  }

  function openWork(i) {
    var w = D.works[i]; if (!w) return;
    var media = w.video
      ? '<video class="wv-video" src="' + w.video + '" controls playsinline autoplay preload="auto" poster="' + w.img + '"></video>'
      : '<div class="wv-poster"><img src="' + w.img + '" alt=""><span>成片没放在这台机器上</span></div>';
    var el = WM.open('work-' + i, {
      title: w.t,
      klass: 'app-view',
      width: 880, height: 660,
      html: '<div class="wv">' + media +
        '<div class="wv-txt"><span class="wv-k">' + (D.workCats.filter(function (c) { return c.k === w.cat; })[0] || {}).t +
        (w.dur ? ' · ' + w.dur : '') + '</span>' +
        '<h2>' + esc(w.t) + '</h2><p>' + esc(w.d) + '</p>' +
        '<a class="wv-link" href="portfolio/" target="_blank" rel="noopener">在作品集里看全部' + ico('ic-out') + '</a></div></div>'
    });
    var v = el.querySelector('.wv-video');
    if (v) {
      var nat = function () {
        if (v.videoWidth && v.videoHeight) el.classList.toggle('tall', v.videoHeight > v.videoWidth * 1.1);
      };
      v.addEventListener('loadedmetadata', nat);
      if (v.readyState >= 1) nat();
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    }
  }

  /* ---------------- 关于 ---------------- */
  function aboutHtml() {
    var m = D.me;
    var facts = m.facts.map(function (f) {
      return '<div class="ab-row"><span>' + f[0] + '</span><b>' + f[1] + '</b></div>';
    }).join('');
    return '<div class="ab-wrap">' +
      '<div class="ab-left">' +
      '<div class="ab-photo"><img src="' + m.avatar + '" alt="' + esc(m.name) + '"></div>' +
      '<h2>' + esc(m.name) + '</h2><span class="ab-tag">' + esc(m.tagline) + '</span>' +
      '<p class="ab-line">' + esc(m.line) + '</p>' +
      '</div>' +
      '<div class="ab-right">' +
      m.bio.map(function (p) { return '<p class="ab-p">' + esc(p) + '</p>'; }).join('') +
      '<div class="ab-facts">' + facts + '</div>' +
      '</div></div>';
  }

  /* ---------------- 联系 ---------------- */
  function contactHtml() {
    var c = D.contact;
    var rows = [
      ['电话', c.phone, 'tel:' + c.phone],
      ['邮箱', c.mail, 'mailto:' + c.mail]
    ].map(function (r) {
      return '<div class="ct-row"><span>' + r[0] + '</span><b>' + r[1] + '</b>' +
        '<button class="ct-copy" data-copy="' + r[1] + '" type="button">复制</button></div>';
    }).join('');
    var links = c.links.map(function (l) {
      return '<a class="ct-link" href="' + l.url + '"' + (l.url.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<b>' + esc(l.name) + '</b><span>' + esc(l.sub) + '</span>' + ico('ic-out') + '</a>';
    }).join('');
    return '<div class="ct-wrap">' +
      '<div class="ct-card">' +
      '<div class="ct-top"><img src="' + D.me.avatar + '" alt=""><div><b>' + esc(D.me.name) + '</b><span>' + esc(D.me.tagline) + '</span></div></div>' +
      rows +
      '<div class="ct-note">' + esc(c.note) + '</div>' +
      '</div>' +
      '<div class="ct-links">' + links + '</div></div>';
  }

  /* ---------------- 说明 ---------------- */
  function readmeHtml() {
    return '<div class="rd-wrap"><pre class="rd">' + D.readme.map(esc).join('\n') + '</pre></div>';
  }

  /* ---------------- 注册 ---------------- */
  var APPS = {
    rooms: { title: '我的房间', klass: 'app-rooms', width: 900, height: 640, html: roomsHtml, mount: wireRooms },
    works: { title: '我的作品', klass: 'app-works', width: 980, height: 680, html: worksHtml, mount: wireWorks },
    about: { title: '关于我', klass: 'app-about', width: 760, height: 620, html: aboutHtml },
    contact: { title: '联系', klass: 'app-contact', width: 420, height: 520, html: contactHtml, mount: wireContact },
    readme: { title: '说明.txt', klass: 'app-readme', width: 620, height: 520, html: readmeHtml }
  };

  function wireRooms(body) {
    body.addEventListener('click', function (e) {
      var card = e.target.closest('.rm-card');
      if (!card) return;
      openRoom(card.dataset.room);
    });
  }

  function wireWorks(body) {
    body.addEventListener('click', function (e) {
      var chip = e.target.closest('.wk-chip');
      if (chip) {
        var cat = chip.dataset.cat;
        body.querySelectorAll('.wk-chip').forEach(function (c) { c.classList.toggle('on', c === chip); });
        body.querySelectorAll('.wk-card').forEach(function (c) {
          c.classList.toggle('off', cat !== 'all' && c.dataset.cat !== cat);
        });
        return;
      }
      var card = e.target.closest('.wk-card');
      if (card) openWork(+card.dataset.i);
    });
  }

  function wireContact(body) {
    body.addEventListener('click', function (e) {
      var b = e.target.closest('[data-copy]');
      if (!b) return;
      var txt = b.dataset.copy;
      var done = function () {
        b.textContent = '已复制'; b.classList.add('ok');
        setTimeout(function () { b.textContent = '复制'; b.classList.remove('ok'); }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done, function () { fallback(txt, done); });
      } else fallback(txt, done);
    });
    function fallback(txt, done) {
      var ta = document.createElement('textarea');
      ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (_) {}
      document.body.removeChild(ta);
    }
  }

  window.OS_APPS = {
    open: function (id) {
      var a = APPS[id]; if (!a) return;
      return WM.open(id, {
        title: a.title, klass: a.klass, width: a.width, height: a.height,
        html: typeof a.html === 'function' ? a.html() : a.html,
        onMount: a.mount
      });
    },
    openRoom: openRoom,
    openWork: openWork,
    has: function (id) { return !!APPS[id]; }
  };
})();
