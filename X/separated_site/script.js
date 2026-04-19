var RAW = 'https://raw.githubusercontent.com/Koogeocimo/beforezerosource/main/01_image/';
    var S3  = RAW + 'scrolling3/';
    var RB  = RAW + 'rebuild_01/';
    var IMGS = {
      bg_gray:  S3 + 'bg_gray.webp',
      bg_red:   S3 + '00_redlight.webp',
      logo:     S3 + 'standW_horizon_W.webp',
      favicon:  S3 + 'faviconW.webp',
      bg0104:   RB + '0104_02.webp',
      bg0510:   RB + '0510_02.webp',
      bg1115:   RB + '1115_02.webp',
      bg1619:   RB + '1619_02.webp',
      openshow: RB + 'openshow.webp',
      workshop: RB + 'workshop.webp',
      speaking: RB + 'speaking.webp',
    };
    var ARTWORK = "https://raw.githubusercontent.com/Koogeocimo/beforezerosource/main/01_image/cards/cardback01.webp";
    var NULL_IMG = "https://raw.githubusercontent.com/Koogeocimo/beforezerosource/main/01_image/cards/nullfront.jpg";
    var LOGO_URL = "https://raw.githubusercontent.com/Koogeocimo/beforezerosource/main/01_image/standW_horizon_B.png";

    var ART_CARDS = [
      { code: "A1",  name: "守望塔 DAKA - Watchtower",          url: "https://i.pinimg.com/736x/15/10/51/151051efc7df1eb665a233d3bbc16235.jpg" },
      { code: "A2",  name: "臨界",                               url: "https://i.pinimg.com/736x/87/2a/e4/872ae454707f8e00ecb8c2a54d6c6158.jpg" },
      { code: "A3",  name: "",                                    url: NULL_IMG },
      { code: "A4",  name: "CYBERF**K 2.0",                     url: NULL_IMG },
      { code: "A5",  name: "北方不再場",                          url: "https://i.pinimg.com/736x/48/15/03/48150390eac405a9f14cb2a71c1fbc34.jpg" },
      { code: "A6",  name: "",                                    url: NULL_IMG },
      { code: "A7",  name: "讓我看看",                            url: NULL_IMG },
      { code: "A8",  name: "",                                    url: NULL_IMG },
      { code: "A9",  name: "A long, long cloud on the horizon",  url: "https://i.pinimg.com/736x/18/70/3c/18703ce6c8e214da311613079c2f2842.jpg" },
      { code: "A10", name: "",                                    url: NULL_IMG },
      { code: "A11", name: "不知道要放哪裡就放這裡吧",             url: "https://i.pinimg.com/736x/e4/bb/93/e4bb93d8649b2579b055f3c09c847571.jpg" },
      { code: "A12", name: "月薪108000",                          url: "https://i.pinimg.com/736x/ba/c1/50/bac1504f90199b8d9fc32cb74f779c9d.jpg" },
      { code: "B1",  name: "菌絲覆生計畫",                        url: NULL_IMG },
      { code: "B2",  name: "Is There Anyone Home?",              url: "https://i.pinimg.com/736x/71/52/65/715265d105743dba14e7066fc300388a.jpg" },
      { code: "B3",  name: "眼冒金星Seeing star",                 url: NULL_IMG },
      { code: "B4",  name: "lasso",                              url: "https://raw.githubusercontent.com/Koogeocimo/beforezerosource/main/01_image/cards/B4front.jpg" },
      { code: "B5",  name: "跟你說一個故事",                      url: "https://i.pinimg.com/736x/a0/36/a2/a036a2dfbc6b1e7e6d777cc633a25040.jpg" },
      { code: "B6",  name: "click clack crack",                  url: "https://i.pinimg.com/736x/6d/72/b5/6d72b5df13a142d3188928fce67b3162.jpg" },
      { code: "B7",  name: "P. E. G.",                           url: "https://i.pinimg.com/736x/29/dc/d4/29dcd43f38a49985dcbfddbfc42ca676.jpg" },
      { code: "B8",  name: "鏡界 Re-reflection",                  url: "https://i.pinimg.com/736x/c5/8a/bb/c58abbc23249c7ad4b5c9efd4aea2f11.jpg" },
      { code: "B9",  name: "éthéré",                             url: NULL_IMG },
    ];

    var _pickedIdx = Math.floor(Math.random() * ART_CARDS.length);
    var _picked = ART_CARDS[_pickedIdx];

    function buildStrip(zone) {
      var strip = zone.querySelector('.card-strip');
      strip.innerHTML = '';
      var padStart = document.createElement('div');
      padStart.style.flexShrink = '0';
      padStart.style.width = '50vw';
      strip.appendChild(padStart);
      ART_CARDS.forEach(function(card, idx) {
        var el = document.createElement('div');
        el.className = 'strip-card' + (idx === _pickedIdx ? ' active' : '');
        el.dataset.idx = idx;
        el.innerHTML =
          '<img class="s-logo" src="' + LOGO_URL + '" alt="Logo">' +
          '<div class="s-frame"><img src="' + card.url + '" alt="' + card.code + '"></div>' +
          '<div class="s-title">' + (card.name || card.code) + '</div>';
        strip.appendChild(el);
      });
      var padEnd = document.createElement('div');
      padEnd.style.flexShrink = '0';
      padEnd.style.width = '50vw';
      strip.appendChild(padEnd);
    }

    function centerStrip(zone) {
      var strip = zone.querySelector('.card-strip');
      var cards = strip.querySelectorAll('.strip-card');
      if (!cards[_pickedIdx]) return;
      var card = cards[_pickedIdx];
      var stripRect = strip.getBoundingClientRect();
      var cardRect  = card.getBoundingClientRect();
      var offset = cardRect.left - stripRect.left - (strip.clientWidth / 2) + (card.offsetWidth / 2);
      strip.scrollLeft += offset;
    }

    function initArtCards() {
      document.querySelectorAll('.back-art-img').forEach(function(img) { img.src = _picked.url; });
      document.querySelectorAll('.back-art-title').forEach(function(el) { el.textContent = _picked.name || _picked.code; });
    }

    window.addEventListener('load', function() {
      document.querySelectorAll('.artwork-card-img').forEach(function(el) { el.src = ARTWORK; });
      initArtCards();
      document.querySelectorAll('.card-zone').forEach(function(zone) {
        buildStrip(zone);
        enableStripDrag(zone.querySelector('.card-strip'));
      });
    });

    Object.keys(IMGS).forEach(function(key) {
      document.querySelectorAll('[data-img="' + key + '"]').forEach(function(el) { el.src = IMGS[key]; });
    });

    // ── Mouse/touch drag on card strip ──
    function enableStripDrag(strip) {
      var isDragging = false;
      var startX = 0;
      var startScroll = 0;
      var dragMoved = false;

      strip.addEventListener('mousedown', function(e) {
        isDragging = true;
        dragMoved = false;
        startX = e.pageX;
        startScroll = strip.scrollLeft;
        strip.classList.add('dragging');
        e.preventDefault();
      });
      document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        var dx = e.pageX - startX;
        if (Math.abs(dx) > 3) dragMoved = true;
        strip.scrollLeft = startScroll - dx;
      });
      document.addEventListener('mouseup', function(e) {
        if (!isDragging) return;
        isDragging = false;
        strip.classList.remove('dragging');
      });
      strip.addEventListener('click', function(e) {
        if (dragMoved) { e.stopPropagation(); e.preventDefault(); dragMoved = false; }
      }, true);
    }

    // ── Drag-to-scroll on promo strips ──
    function getLayoutScale(el) {
      var layout = el.closest('#layout-web, #layout-handy');
      if (!layout) return 1;
      var matrix = new DOMMatrix(window.getComputedStyle(layout).transform);
      return matrix.a || 1;
    }

    function initDragPromoStrip(stripEl, oneSetWidth, animDuration) {
      var isDragging    = false;
      var startX        = 0;
      var dragOffset    = 0;
      var currentOffset = 0;

      function captureAnimOffset() {
        var style   = window.getComputedStyle(stripEl);
        var delay   = parseFloat(style.animationDelay) || 0;
        var elapsed = -delay;
        var progress = (elapsed % animDuration) / animDuration;
        return -(progress * oneSetWidth);
      }

      function startDrag(clientX) {
        isDragging    = true;
        dragOffset    = captureAnimOffset();
        currentOffset = dragOffset;
        startX        = clientX;
        stripEl.style.animationPlayState = 'paused';
        stripEl.style.transform = 'translateX(' + dragOffset + 'px)';
        stripEl.style.cursor    = 'grabbing';
      }

      function moveDrag(clientX) {
        if (!isDragging) return;
        var scale = getLayoutScale(stripEl);
        var delta = (clientX - startX) / scale;
        var newOffset = dragOffset + delta;
        newOffset = ((newOffset % oneSetWidth) - oneSetWidth) % oneSetWidth;
        currentOffset = newOffset;
        stripEl.style.transform = 'translateX(' + newOffset + 'px)';
      }

      function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        stripEl.style.cursor = 'grab';
        var progress = Math.abs(currentOffset) / oneSetWidth;
        var elapsed  = progress * animDuration;
        stripEl.style.transform        = '';
        stripEl.style.animationDelay   = '-' + elapsed + 's';
        stripEl.style.animationPlayState = 'running';
      }

      stripEl.addEventListener('mousedown', function(e) { e.preventDefault(); startDrag(e.clientX); });
      document.addEventListener('mousemove', function(e) { if (isDragging) moveDrag(e.clientX); });
      document.addEventListener('mouseup',   function() { endDrag(); });

      stripEl.addEventListener('touchstart', function(e) { startDrag(e.touches[0].clientX); }, { passive: true });
      document.addEventListener('touchmove',  function(e) { if (isDragging) moveDrag(e.touches[0].clientX); }, { passive: true });
      document.addEventListener('touchend',   function() { endDrag(); });

      stripEl.style.cursor = 'grab';
    }

    window.addEventListener('load', function() {
      document.querySelectorAll('#layout-web .promo-strip').forEach(function(el) {
        initDragPromoStrip(el, 1892.24, 90);
      });
      document.querySelectorAll('#layout-handy .promo-strip').forEach(function(el) {
        initDragPromoStrip(el, 1252.24, 80);
      });

      // Mobile body-text wheel scroll
      var mobileTextWrap = document.querySelector('#layout-handy .body-text-wrap');
      if (mobileTextWrap) {
        document.getElementById('layout-handy').addEventListener('wheel', function(e) {
          var matrix = new DOMMatrix(window.getComputedStyle(document.getElementById('layout-handy')).transform);
          var scale  = matrix.a || 1;
          var rect = mobileTextWrap.getBoundingClientRect();
          if (e.clientX >= rect.left && e.clientX <= rect.right &&
              e.clientY >= rect.top  && e.clientY <= rect.bottom) {
            e.preventDefault();
            mobileTextWrap.scrollTop += e.deltaY / scale;
          }
        }, { passive: false });

        var touchStartY = 0;
        mobileTextWrap.addEventListener('touchstart', function(e) {
          touchStartY = e.touches[0].clientY;
        }, { passive: true });
        mobileTextWrap.addEventListener('touchmove', function(e) {
          var dy = touchStartY - e.touches[0].clientY;
          touchStartY = e.touches[0].clientY;
          mobileTextWrap.scrollTop += dy;
        }, { passive: true });
      }
    });

    // ══════════════════════════════════════════════════════════
    // BG WIGGLE — mouse parallax matching baseframe scroll v3
    // Each .bg-layer with data-parallax gets smooth lerp wiggle
    // on mouse move, scale-aware to work inside the CSS-scaled
    // layout containers.
    // ══════════════════════════════════════════════════════════
    (function() {
      var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Raw target mouse position, normalised -1 … +1
      var mouseX = 0;
      var mouseY = 0;
      // Smoothed (lerped) mouse position
      var smoothX = 0;
      var smoothY = 0;

      // Parallax strength: how many layout-px per unit of normalised mouse movement
      // Matches baseframe: depth * 46
      var STRENGTH = 46;
      // Lerp factor (same as baseframe: 0.08)
      var LERP = 0.08;

      // Store per-layer baseline transforms extracted from CSS
      // so we can add the wiggle on top without overwriting existing translate/rotate
      var layerData = [];

      function collectLayers() {
        layerData = [];
        var bgLayers = document.querySelectorAll('.bg-layer[data-parallax]');
        bgLayers.forEach(function(el) {
          var depth = parseFloat(el.dataset.parallax) || 0;
          // Read the layout-space base position from inline CSS left/top
          // (the parallax offset is additive on top of these)
          // We store the element and its depth; the base CSS position stays
          // via left/top, and we only manipulate translateX/Y via transform.
          // We must preserve any existing rotation (bg-red has rotate(-10.02deg))
          var existingRotate = '';
          var computedStyle = window.getComputedStyle(el);
          // Extract rotation from inline style if present
          var inlineStyle = el.getAttribute('style') || '';
          var rotMatch = inlineStyle.match(/rotate\([^)]+\)/);
          if (rotMatch) existingRotate = rotMatch[0];

          layerData.push({ el: el, depth: depth, rotate: existingRotate });
        });
      }

      window.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      // On touch devices use touch position
      window.addEventListener('touchmove', function(e) {
        if (e.touches.length > 0) {
          mouseX = (e.touches[0].clientX / window.innerWidth  - 0.5) * 2;
          mouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
        }
      }, { passive: true });

      function wiggleLoop() {
        if (!reducedMotion) {
          smoothX += (mouseX - smoothX) * LERP;
          smoothY += (mouseY - smoothY) * LERP;
        }

        layerData.forEach(function(item) {
          var depth = item.depth;
          var dx = smoothX * depth * STRENGTH;
          var dy = smoothY * depth * STRENGTH;

          // Compose transform: keep existing rotation, add translate
          if (item.rotate) {
            item.el.style.transform = 'translateX(' + dx + 'px) translateY(' + dy + 'px) ' + item.rotate;
          } else {
            item.el.style.transform = 'translateX(' + dx + 'px) translateY(' + dy + 'px)';
          }
        });

        requestAnimationFrame(wiggleLoop);
      }

      // Collect layers after DOM is ready, then start loop
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          collectLayers();
          wiggleLoop();
        });
      } else {
        collectLayers();
        wiggleLoop();
      }
    })();

    // ── Card flip + press + strip reveal logic ──
    document.querySelectorAll('.card-zone').forEach(function(zone) {
      var wrap       = zone.querySelector('.card-flip-wrap');
      var inner      = wrap.querySelector('.card-flip-inner');
      var stripOuter = zone.querySelector('.card-strip-outer');
      var seeMore    = zone.querySelector('.see-more-btn');
      var isFlipped  = false;
      var isAnimating = false;
      var seeMoreTimer = null;

      function showStrip() {
        wrap.classList.add('hide-wrap');
        stripOuter.classList.add('visible');
        centerStrip(zone);
        seeMoreTimer = setTimeout(function() {
          seeMore.classList.add('visible');
        }, 1000);
      }

      function hideStrip() {
        stripOuter.classList.remove('visible');
        seeMore.classList.remove('visible');
        clearTimeout(seeMoreTimer);
        wrap.classList.remove('hide-wrap');
      }

      function onPress(e) {
        e.preventDefault();
        if (isAnimating) return;
        if (isFlipped) {
          hideStrip();
          inner.classList.remove('shaking', 'flipped');
          inner.classList.add('flip-back');
          isAnimating = true;
          inner.addEventListener('transitionend', function handler() {
            inner.removeEventListener('transitionend', handler);
            inner.classList.remove('flip-back');
            setTimeout(function() {
              inner.classList.add('shaking');
              isFlipped = false;
              isAnimating = false;
            }, 50);
          });
          return;
        }
        inner.classList.remove('spring-back', 'shaking', 'flip-back', 'flipped');
        inner.classList.add('pressed');
      }

      function onRelease(e) {
        if (!inner.classList.contains('pressed')) return;
        inner.classList.remove('pressed');
        isAnimating = true;
        inner.classList.add('spring-back');
        inner.addEventListener('animationend', function handler() {
          inner.removeEventListener('animationend', handler);
          inner.classList.remove('spring-back');
          isFlipped = true;
          isAnimating = false;
          showStrip();
        });
      }

      wrap.addEventListener('mousedown', onPress);
      document.addEventListener('mouseup', onRelease);
      wrap.addEventListener('touchstart', onPress, { passive: false });
      document.addEventListener('touchend', onRelease);

      stripOuter.addEventListener('click', function(e) {
        if (!e.target.closest('.strip-card')) {
          hideStrip();
          isFlipped = false;
          inner.classList.remove('flipped');
          setTimeout(function() { inner.classList.add('shaking'); }, 50);
        }
      });
    });

    // ── Layout & hover ──
    var handy = document.getElementById('layout-handy');
    var web   = document.getElementById('layout-web');

    function applyLayout() {
      var vw = window.innerWidth;
      var isDesktop = vw >= 1024;

      // Section snap points in design-space pixels
      // Desktop (1440×3200): hero, promo strip, event cards, body/trailer, card zone
      var desktopSnaps = [0, 519, 1190, 1980, 2600];
      // Mobile (390×2800): hero, event cards, body text, card zone
      var mobileSnaps  = [0, 352, 670, 1480, 1980];

      if (isDesktop) {
        handy.style.display = 'none';
        web.style.display   = 'block';
        var scale = vw / 1440;
        web.style.transform = 'scale(' + scale + ')';
        document.body.style.height = Math.round(3200 * scale) + 'px';
        positionSnaps(desktopSnaps, scale);
      } else {
        web.style.display   = 'none';
        handy.style.display = 'block';
        var scale = vw / 390;
        handy.style.transform = 'scale(' + scale + ')';
        document.body.style.height = Math.round(2600 * scale) + 'px';
        positionSnaps(mobileSnaps, scale);
      }
      setupHover();
    }

    function positionSnaps(positions, scale) {
      for (var i = 0; i < 5; i++) {
        var anchor = document.getElementById('snap-' + i);
        if (!anchor) continue;
        var pos = positions[i] !== undefined ? Math.round(positions[i] * scale) : -9999;
        anchor.style.top = pos + 'px';
      }
    }

    function setupHover() {
      var lockedCard = null;
      [handy, web].forEach(function(layout) {
        if (!layout) return;
        layout.addEventListener('mousemove', function(e) {
          var layoutRect = layout.getBoundingClientRect();
          var isDesktop = window.innerWidth >= 1024;
          var scale = isDesktop ? window.innerWidth / 1440 : window.innerWidth / 390;
          var mx = (e.clientX - layoutRect.left) / scale;
          var my = (e.clientY - layoutRect.top)  / scale;
          var cards = layout.querySelectorAll('.event-card');
          if (lockedCard && lockedCard.closest('#' + layout.id)) {
            var cl = parseFloat(getComputedStyle(lockedCard).left);
            var ct = parseFloat(getComputedStyle(lockedCard).top);
            var cw = lockedCard.offsetWidth;
            var ch = lockedCard.offsetHeight;
            if (mx >= cl && mx <= cl + cw && my >= ct && my <= ct + ch) return;
            lockedCard.classList.remove('hovered');
            lockedCard = null;
          }
          var found = false;
          cards.forEach(function(card) {
            if (found) return;
            var cl = parseFloat(getComputedStyle(card).left);
            var ct = parseFloat(getComputedStyle(card).top);
            var cw = card.offsetWidth;
            var ch = card.offsetHeight;
            if (mx >= cl && mx <= cl + cw && my >= ct && my <= ct + ch) {
              card.classList.add('hovered');
              lockedCard = card;
              found = true;
            }
          });
        });
        layout.addEventListener('mouseleave', function() {
          layout.querySelectorAll('.event-card').forEach(function(c) { c.classList.remove('hovered'); });
          lockedCard = null;
        });
      });
    }

    applyLayout();
    window.addEventListener('resize', applyLayout);
