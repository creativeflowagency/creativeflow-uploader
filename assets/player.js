// CreativeFlow Uploader: shared helpers and the review player (custom controls with the
// comments drawn on the timeline as avatars). Used by the editor app and the client page.
(function () {
  'use strict';
  var ICONS = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.8v14.4a1 1 0 0 0 1.5.86l12-7.2a1 1 0 0 0 0-1.72l-12-7.2A1 1 0 0 0 7 4.8z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1"/><rect x="14" y="4.5" width="4" height="15" rx="1"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    fwd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>',
    vol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>',
    mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="m22 9-6 6M16 9l6 6"/></svg>',
    full: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 7.5h4M3 12h18M3 16.5h4M17 7.5h4M17 16.5h4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/></svg>',
    badge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };
  var COLORS = ['#7c5cff', '#e5487d', '#f0883e', '#2fb8a6', '#3b82f6', '#c056e0', '#e0a92b', '#52a447'];

  var CF = window.CF = {
    icons: ICONS,
    fmt: function (t) { t = Math.max(0, Math.floor(t || 0)); var h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), s = t % 60; return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(s).padStart(2, '0'); },
    ago: function (ms) {
      if (!ms || !isFinite(ms)) return '';
      var s = Math.max(0, (Date.now() - ms) / 1000);
      if (s < 60) return 'just now';
      if (s < 3600) return Math.floor(s / 60) + 'm ago';
      if (s < 86400) return Math.floor(s / 3600) + 'h ago';
      if (s < 86400 * 7) return Math.floor(s / 86400) + 'd ago';
      return new Date(ms).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
    },
    color: function (name) { var h = 0; String(name || '?').split('').forEach(function (c) { h = (h * 31 + c.charCodeAt(0)) >>> 0; }); return COLORS[h % COLORS.length]; },
    initials: function (name) { var p = String(name || '?').trim().split(/\s+/); return ((p[0] || '?')[0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase(); },
    el: function (tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; },
    avatar: function (name, size) {
      var a = CF.el('span', 'avatar', CF.initials(name)); a.style.background = CF.color(name);
      if (size) { a.style.width = a.style.height = size + 'px'; a.style.fontSize = Math.round(size * 0.42) + 'px'; }
      a.setAttribute('aria-hidden', 'true'); return a;
    },
    toast: (function () {
      var timer;
      return function (text) {
        var t = document.getElementById('toast');
        if (!t) { t = CF.el('div', 'toast'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
        t.textContent = text; t.hidden = false; clearTimeout(timer); timer = setTimeout(function () { t.hidden = true; }, 3600);
      };
    })(),
    STATUS: { waiting: 'Waiting for video', in_review: 'In review', changes: 'Changes requested', approved: 'Approved' }
  };

  // ---------------------------------------------------------------- the player
  // CF.player(container) -> { video, load(url), seek(t), setMarks(comments, onPick), time() }
  CF.player = function (root) {
    root.classList.add('cfp');
    root.innerHTML =
      '<div class="cfp-screen"><video playsinline preload="metadata"></video><button class="cfp-big" type="button" aria-label="Play">' + ICONS.play + '</button></div>' +
      '<div class="cfp-bar">' +
        '<div class="cfp-scrub" role="slider" aria-label="Seek" tabindex="0"><div class="cfp-marks"></div><div class="cfp-rail"><div class="cfp-buf"></div><div class="cfp-fill"></div></div><div class="cfp-head"></div><div class="cfp-hover" hidden></div></div>' +
        '<div class="cfp-row">' +
          '<button class="icon-btn" type="button" data-a="play" aria-label="Play">' + ICONS.play + '</button>' +
          '<button class="icon-btn hide-sm" type="button" data-a="back" aria-label="Back 5 seconds" title="Back 5s (←)">' + ICONS.back + '</button>' +
          '<button class="icon-btn hide-sm" type="button" data-a="fwd" aria-label="Forward 5 seconds" title="Forward 5s (→)">' + ICONS.fwd + '</button>' +
          '<span class="cfp-time"><b>0:00</b> / 0:00</span><span class="grow"></span>' +
          '<button class="cfp-speed" type="button" data-a="speed" aria-label="Playback speed">1x</button>' +
          '<button class="icon-btn" type="button" data-a="mute" aria-label="Mute">' + ICONS.vol + '</button>' +
          '<button class="icon-btn" type="button" data-a="full" aria-label="Full screen" title="Full screen (F)">' + ICONS.full + '</button>' +
        '</div>' +
      '</div>';
    var q = function (s) { return root.querySelector(s); };
    var video = q('video'), scrub = q('.cfp-scrub'), fill = q('.cfp-fill'), buf = q('.cfp-buf'), head = q('.cfp-head'), hover = q('.cfp-hover'), marks = q('.cfp-marks');
    var playBtn = q('[data-a=play]'), timeEl = q('.cfp-time'), speedBtn = q('[data-a=speed]'), muteBtn = q('[data-a=mute]');
    var SPEEDS = [1, 1.5, 2, 0.5], markData = [], onPick = null;

    function dur() { return isFinite(video.duration) && video.duration > 0 ? video.duration : 0; }
    function toggle() { if (video.paused) { var p = video.play(); if (p && p.catch) p.catch(function () {}); } else video.pause(); }
    function seek(t) { if (!dur()) { video.addEventListener('loadedmetadata', function once() { video.removeEventListener('loadedmetadata', once); video.currentTime = t; }); return; } video.currentTime = Math.max(0, Math.min(dur(), t)); }
    function paint() {
      var d = dur(), t = video.currentTime || 0, pct = d ? t / d * 100 : 0;
      fill.style.width = pct + '%'; head.style.left = pct + '%';
      timeEl.innerHTML = '<b>' + CF.fmt(t) + '</b> / ' + CF.fmt(d);
      if (d && video.buffered.length) buf.style.width = (video.buffered.end(video.buffered.length - 1) / d * 100) + '%';
    }
    function state() {
      root.classList.toggle('playing', !video.paused);
      playBtn.innerHTML = video.paused ? ICONS.play : ICONS.pause;
      playBtn.setAttribute('aria-label', video.paused ? 'Play' : 'Pause');
    }
    function drawMarks() {
      marks.innerHTML = '';
      var d = dur(); if (!d) return;
      markData.forEach(function (c) {
        var b = CF.el('button', 'cfp-mark' + (c.done ? ' done' : '')); b.type = 'button';
        b.style.left = Math.min(100, c.t / d * 100) + '%'; b.style.background = CF.color(c.name);
        b.textContent = CF.initials(c.name)[0];
        b.setAttribute('aria-label', 'Comment at ' + CF.fmt(c.t) + ' from ' + c.name);
        var tip = CF.el('span', 'tip'); var bb = CF.el('b', '', c.name + ' · ' + CF.fmt(c.t)); tip.append(bb, document.createElement('br'), c.text.length > 120 ? c.text.slice(0, 120) + '…' : c.text);
        b.appendChild(tip);
        b.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
        b.addEventListener('click', function (e) { e.stopPropagation(); seek(c.t); video.pause(); if (onPick) onPick(c); });
        marks.appendChild(b);
      });
    }
    // dragging along the timeline
    function at(e) { var r = scrub.getBoundingClientRect(); return Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * dur(); }
    var dragging = false;
    scrub.addEventListener('pointerdown', function (e) { if (!dur()) return; dragging = true; scrub.setPointerCapture(e.pointerId); seek(at(e)); paint(); });
    scrub.addEventListener('pointermove', function (e) {
      if (!dur()) return;
      var t = at(e), r = scrub.getBoundingClientRect();
      hover.hidden = false; hover.textContent = CF.fmt(t); hover.style.left = (t / dur() * r.width) + 'px';
      if (dragging) { seek(t); paint(); }
    });
    scrub.addEventListener('pointerup', function () { dragging = false; });
    scrub.addEventListener('pointerleave', function () { if (!dragging) hover.hidden = true; });
    scrub.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') { seek(video.currentTime - 5); e.preventDefault(); } if (e.key === 'ArrowRight') { seek(video.currentTime + 5); e.preventDefault(); } });

    q('.cfp-big').addEventListener('click', toggle);
    video.addEventListener('click', toggle);
    playBtn.addEventListener('click', toggle);
    q('[data-a=back]').addEventListener('click', function () { seek(video.currentTime - 5); });
    q('[data-a=fwd]').addEventListener('click', function () { seek(video.currentTime + 5); });
    speedBtn.addEventListener('click', function () {
      var i = (SPEEDS.indexOf(video.playbackRate) + 1) % SPEEDS.length; video.playbackRate = SPEEDS[i]; speedBtn.textContent = SPEEDS[i] + 'x';
    });
    muteBtn.addEventListener('click', function () { video.muted = !video.muted; muteBtn.innerHTML = video.muted ? ICONS.mute : ICONS.vol; });
    q('[data-a=full]').addEventListener('click', function () {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (root.requestFullscreen) root.requestFullscreen().catch(function () {});
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();   // iPhone
    });
    ['timeupdate', 'progress', 'durationchange', 'seeked'].forEach(function (ev) { video.addEventListener(ev, paint); });
    ['play', 'pause', 'ended'].forEach(function (ev) { video.addEventListener(ev, state); });
    video.addEventListener('loadedmetadata', function () { paint(); drawMarks(); });

    // keyboard shortcuts, except while typing
    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (/INPUT|TEXTAREA|SELECT/.test(tag) || e.target.isContentEditable || e.metaKey || e.ctrlKey || e.altKey || !root.isConnected || root.offsetParent === null) return;
      if (document.querySelector('dialog[open]')) return;
      var k = e.key;
      if (k === ' ' || k === 'k' || k === 'K') { if (e.target.tagName === 'BUTTON' && k === ' ') return; toggle(); e.preventDefault(); }
      else if (k === 'ArrowLeft' || k === 'j' || k === 'J') { seek(video.currentTime - 5); e.preventDefault(); }
      else if (k === 'ArrowRight' || k === 'l' || k === 'L') { seek(video.currentTime + 5); e.preventDefault(); }
      else if (k === ',') { video.pause(); seek(video.currentTime - 1 / 30); }
      else if (k === '.') { video.pause(); seek(video.currentTime + 1 / 30); }
      else if (k === 'f' || k === 'F') q('[data-a=full]').click();
      else if (k === 'm' || k === 'M') muteBtn.click();
    });

    return {
      video: video,
      load: function (url) { video.pause(); video.src = url; video.load(); paint(); state(); },
      unload: function () { video.pause(); video.removeAttribute('src'); video.load(); },
      seek: function (t) { seek(t); video.pause(); },
      time: function () { return video.currentTime || 0; },
      setMarks: function (list, pick) { markData = list || []; onPick = pick || null; drawMarks(); }
    };
  };
})();
