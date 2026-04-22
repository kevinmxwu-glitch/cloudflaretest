/* setAppHeight() removed — layout uses dvh natively in CSS, no JS recalculation needed */
/* ======================
   Menu / Side Menu
====================== */
const menuIcon = document.querySelector(".menu-icon");
const sideMenu = document.querySelector(".side-menu");
const overlay  = document.querySelector(".overlay");

history.scrollRestoration = 'manual';

function closeSideMenu() {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
}

menuIcon.addEventListener("mouseenter", () => {
  if (window.innerWidth > 768) {
    sideMenu.classList.add("active");
    overlay.classList.add("active");
  }
});

sideMenu.addEventListener("mouseleave", () => {
  if (window.innerWidth > 768) closeSideMenu();
});

menuIcon.addEventListener("mouseleave", () => {
  if (window.innerWidth > 768) {
    setTimeout(() => {
      if (!sideMenu.matches(":hover")) closeSideMenu();
    }, 100);
  }
});

menuIcon.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    sideMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  }
});

overlay.addEventListener("click", closeSideMenu);

document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", closeSideMenu);
});

/* ======================
   Background switch on scroll
====================== */
const bgA         = document.querySelector(".bg.A");
const visitTrigger = document.querySelector("#visit2");

let bgSwitchTicking = false;
function updateBgSwitch() {
  if (!bgA || !visitTrigger) return;
  const triggerTop = visitTrigger.getBoundingClientRect().top;
  bgA.classList.toggle("hide", triggerTop <= window.innerHeight);
}

function onBgSwitchEvent() {
  if (bgSwitchTicking) return;
  bgSwitchTicking = true;
  requestAnimationFrame(() => {
    updateBgSwitch();
    bgSwitchTicking = false;
  });
}

window.addEventListener("scroll", onBgSwitchEvent, { passive: true });
window.addEventListener("resize", onBgSwitchEvent, { passive: true });
window.addEventListener("load",   updateBgSwitch);

/* ======================
   Shop section — pseudo-3D mouse effect
====================== */
const visualImages   = [
  "image/shop/hook1.webp",
  "image/shop/sock1.webp",
  "image/shop/cup1.webp",
  "image/shop/card1.webp",
  "image/shop/poster1.webp"
];

let currentIndex = 0;
let isAnimating  = false;
let hoverTimer   = null;
let queuedDir    = 0;

const shopSection   = document.querySelector("#shop");
const shopVisualImg = document.querySelector(".shop-visual img");

if (shopSection && shopVisualImg) {
  let shopRafId = null;

  shopSection.addEventListener("mousemove", (e) => {
    if (isAnimating) return;

    const rect    = shopSection.getBoundingClientRect();
    const percentX = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
    const percentY = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);

    cancelAnimationFrame(shopRafId);
    shopRafId = requestAnimationFrame(() => {
      shopVisualImg.style.transform = `
        translate3d(${percentX * 1.2}px, ${percentY * 1.2}px, 40px)
        rotateX(${percentY * -18}deg)
        rotateY(${percentX *  18}deg)
        scale(1.2)
      `;
    });

    if (Math.abs(percentX) > 0.85 && !hoverTimer) {
      queuedDir  = percentX > 0 ? 1 : -1;
      hoverTimer = setTimeout(() => {
        switchVisual(queuedDir, 1);
        hoverTimer = null;
      }, 180);
    }

    if (Math.abs(percentX) < 0.6) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
      queuedDir  = 0;
    }
  });

  shopSection.addEventListener("mouseleave", () => {
    cancelAnimationFrame(shopRafId);
    clearTimeout(hoverTimer);
    hoverTimer = null;
    queuedDir  = 0;
    shopVisualImg.style.transform = `translate3d(0,0,0) rotateX(0deg) rotateY(0deg) scale(1.2)`;
  });
}

function switchVisual(slideDir, step) {
  isAnimating = true;
  const travelX = shopSection.getBoundingClientRect().width * 1.4;

  shopVisualImg.style.transition = "transform 0.45s ease, opacity 0.3s";
  shopVisualImg.style.transform  = `translate3d(${travelX * slideDir}px, 0, 40px) rotateY(${28 * slideDir}deg) scale(1.2)`;
  shopVisualImg.style.opacity    = "0";

  setTimeout(() => {
    currentIndex = (currentIndex + step + visualImages.length) % visualImages.length;
    shopVisualImg.src = visualImages[currentIndex];

    shopVisualImg.style.transition = "none";
    shopVisualImg.style.transform  = `translate3d(${-travelX * slideDir}px, 0, 40px) rotateY(${-28 * slideDir}deg) scale(1.2)`;
    shopVisualImg.style.opacity    = "0";

    requestAnimationFrame(() => {
      shopVisualImg.style.transition = "transform 0.45s ease, opacity 0.35s";
      shopVisualImg.style.transform  = `translate3d(0, 0, 40px) rotateX(0deg) rotateY(0deg) scale(1.2)`;
      shopVisualImg.style.opacity    = "1";
    });

    setTimeout(() => { isAnimating = false; }, 450);
  }, 220);
}

/* ======================
   About section — Grass World
====================== */
const aboutMain = document.querySelector("#about .main");

/* 新世界尺寸 */
const WW = 3756, WH = 1743;

/* 舊世界尺寸（人物原本擺放的座標基準） */
const OLD_WW = 7872, OLD_WH = 3196;

/* 座標縮放比例 */
const SCALE_X = WW / OLD_WW;
const SCALE_Y = WH / OLD_WH;

/* 把舊座標映射到新世界 */
function mapX(x) {
  return Math.round(x * SCALE_X);
}
function mapY(y) {
  return Math.round(y * SCALE_Y);
}

/* 尺寸也一起縮，才不會人物看起來過大 */
function mapSize(size) {
  return Math.round(size * SCALE_X);
}

const GRASS_RAW = 'image/grass/';
const STU_RAW   = 'image/student/';

const GRASS_IMGS   = ['g1','g2','g3','g4','g5','g6','g7','g8','g9','g10','g11','g12'];
const GRASS_WIDTHS = {
  g1:310, g2:430, g3:390, g4:450, g5:465, g6:355,
  g7:410, g8:440, g9:395, g10:420, g11:460, g12:380
};

const studentData = [
  { id:'02', x: 560,  y: 340,  size: 280, name:'梅恩寧', group:'副召',       work:'#',        instagram:'#', youtube:'#' },
  { id:'03', x: 1730, y: 2200, size: 280, name:'謝秉勳', group:'事務組',     work:'#',        instagram:'https://www.instagram.com/mei___arttttt?igsh=Yzd4aTlqY3Y3enhx', youtube:'#' },
  { id:'04', x: 1900, y: 380,  size: 280, name:'李書皓', group:'活動組',     work:'A4.html',  instagram:'https://youtube.com/@shuhao0?si=q6YFkqVWKaFEUI2Q', youtube:'https://youtube.com/@shuhao0?si=q6YFkqVWKaFEUI2Q' },
  { id:'05', x: 2570, y: 200,  size: 280, name:'楊妮鈞', group:'視覺組',     work:'B2.html',  instagram:'https://www.instagram.com/yni_1216/', youtube:'https://www.youtube.com/@%E6%A5%8A%E5%A6%AE%E9%88%9E' },
  { id:'06', x: 3240, y: 350,  size: 280, name:'羅芷葳', group:'周邊組',     work:'#',        instagram:'https://www.instagram.com/wei.fadachai?igsh=MTd1Zmx1dHhsaDNqNQ%3D%3D&utm_source=qr', youtube:'#' },
  { id:'07', x: 3900, y: 190,  size: 280, name:'白若潔', group:'事務組',     work:'B2.html',  instagram:'https://www.instagram.com/jennypai1210?igsh=MWthNTdoMGUxZzI1eA%3D%3D&utm_source=qr', youtube:'https://youtube.com/channel/UCZwq6OVj-VhtEXBkWI0q3Xw?si=iQtOMyQsMS4BjNQK' },
  { id:'08', x: 4580, y: 370,  size: 280, name:'楊昀臻', group:'活動組',     work:'B1.html',  instagram:'https://www.instagram.com/uc.artlab?igsh=MXA5OTgwcGJia2prZg%3D%3D&utm_source=qr', youtube:'#' },
  { id:'09', x: 5250, y: 215,  size: 280, name:'蔡佳蓁', group:'公關組',     work:'B1.html',  instagram:'https://www.instagram.com/jia.z047?igsh=cmhhNjN5a3F5cWNh&utm_source=qr', youtube:'#' },
  { id:'10', x: 5920, y: 360,  size: 280, name:'周玟妤', group:'周邊組',     work:'B3.html',  instagram:'https://www.instagram.com/__cwy.__?igsh=MXZuNzVtMGxsODByZQ%3D%3D&utm_source=qr', youtube:'#' },
  { id:'11', x: 6600, y: 200,  size: 280, name:'江敏豐', group:'視覺組',     work:'B8.html',  instagram:'https://www.instagram.com/j.minfeng/', youtube:'www.youtube.com/@electric_feng' },
  { id:'12', x: 7270, y: 340,  size: 280, name:'徐蕎安', group:'紀錄組',     work:'#',        instagram:'#', youtube:'#' },
  { id:'13', x: 390,  y: 720,  size: 280, name:'趙育旋', group:'周邊組',     work:'A12.html', instagram:'https://www.instagram.com/nao_ii0?igsh=eDZ1MW8ya3hjeDg%3D&utm_source=qr', youtube:'#' },
  { id:'14', x: 1060, y: 870,  size: 280, name:'林當宏', group:'視覺組',     work:'#',        instagram:'#', youtube:'#' },
  { id:'15', x: 560,  y: 2200, size: 280, name:'洪瀅媗', group:'公關組',     work:'A11.html', instagram:'https://www.instagram.com/h52ung?igsh=MWRlZ2ZvazVoa25jdQ%3D%3D&utm_source=qr', youtube:'https://youtube.com/@stringrayaa?si=A4JX0ECS7e-L0LCz' },
  { id:'16', x: 2400, y: 850,  size: 280, name:'陳采宜', group:'視覺組',     work:'#',        instagram:'https://www.instagram.com/yeeeeee.27?igsh=N2plOWg3Ym1kaWlp&utm_source=qr', youtube:'#' },
  { id:'17', x: 7090, y: 2200, size: 280, name:'危俊華', group:'技術統籌組', work:'#',        instagram:'#', youtube:'#' },
  { id:'18', x: 3740, y: 860,  size: 280, name:'楊怡珊', group:'公關組',     work:'B2.html',  instagram:'https://www.instagram.com/yillshan?igsh=bDNpaTk1emlteGhv&utm_source=qr', youtube:'#' },
  { id:'19', x: 4410, y: 720,  size: 280, name:'陳愛莉', group:'事務組',     work:'A5.html',  instagram:'https://www.instagram.com/im94xu4/?hl=zh-tw', youtube:'#' },
  { id:'20', x: 5080, y: 850,  size: 280, name:'林芯羽', group:'紀錄組',     work:'#',        instagram:'#', youtube:'#' },
  { id:'21', x: 5750, y: 710,  size: 280, name:'楊凡力', group:'總召',       work:'B7.html',  instagram:'https://www.instagram.com/fanli.art/', youtube:'https://www.youtube.com/@fl.o24' },
  { id:'22', x: 6420, y: 860,  size: 280, name:'陳玟卉', group:'紀錄組',     work:'#',        instagram:'#', youtube:'#' },
  { id:'23', x: 7090, y: 720,  size: 280, name:'賴昱安', group:'紀錄組',     work:'#',        instagram:'#', youtube:'#' },
  { id:'24', x: 560,  y: 1300, size: 280, name:'陳郁晴', group:'紀錄組',     work:'B6.html',  instagram:'https://www.instagram.com/456_minnie_?igsh=bmhjb3puOWVucDdn', youtube:'#' },
  { id:'25', x: 1390, y: 1450, size: 280, name:'朱家慧', group:'紀錄組',     work:'#',        instagram:'#', youtube:'#' },
  { id:'26', x: 2220, y: 1300, size: 280, name:'郭展良', group:'技術統籌組', work:'A2.html',  instagram:'https://www.instagram.com/o_0.3771?igsh=MWg5cnV6emllaHlyeQ%3D%3D&utm_source=qr', youtube:'https://www.youtube.com/@Leonkou' },
  { id:'27', x: 3050, y: 1440, size: 280, name:'盧紫歆', group:'周邊組',     work:'B3.html',  instagram:'#', youtube:'#' },
  { id:'28', x: 3880, y: 1290, size: 280, name:'李芷萱', group:'副召',       work:'B7.html',  instagram:'https://www.instagram.com/lzjrsyuan_0120?igsh=MXBxZ2k0a203eDVnZQ%3D%3D&utm_source=qr', youtube:'https://youtube.com/@jrsyuanlee3120?si=hWVnf7DNLjx-w3_3' },
  { id:'29', x: 4700, y: 1840, size: 350, name:'吳孟學', group:'網頁組',     work:'B4.html',  instagram:'#', youtube:'#' },
  { id:'30', x: 4730, y: 2300, size: 280, name:'胡詩敏', group:'網頁組',     work:'B4.html',  instagram:'#', youtube:'#' },
  { id:'31', x: 6360, y: 1440, size: 280, name:'許芷芸', group:'公關組',     work:'#',        instagram:'https://www.instagram.com/vrooci?igsh=YndpYW5pNG42ODdh&utm_source=qr', youtube:'#' },
  { id:'32', x: 7580, y: 1690, size: 400, name:'姜如暄', group:'網頁組',     work:'B4.html',  instagram:'https://www.instagram.com/koogeocimo/', youtube:'https://www.youtube.com/@Koogeocimo' },
  { id:'33', x: 980,  y: 1900, size: 280, name:'闕以恩', group:'活動組',     work:'B6.html',  instagram:'https://www.instagram.com/janet_d.j?igsh=NHphamJucWNnZzQz&utm_source=qr', youtube:'http://www.youtube.com/@kareru.3sai' },
  { id:'34', x: 2450, y: 2050, size: 280, name:'朱柏豪', group:'技術統籌組', work:'A1.html',  instagram:'https://www.instagram.com/marc_c__c?igsh=eHEyd3ZodTYyazl5&utm_source=qr', youtube:'https://vimeo.com/user192254939' },
  { id:'35', x: 3920, y: 1900, size: 280, name:'王詩瀅', group:'活動組',     work:'A9.html',  instagram:'https://www.instagram.com/see.eeeing?igsh=ZDd0Mjd4amE5aDky', youtube:'#' },
  { id:'36', x: 5790, y: 2440, size: 450, name:'黃懿文', group:'活動組',     work:'#',        instagram:'#', youtube:'#' },
  { id:'37', x: 6600, y: 1890, size: 280, name:'魏惇儀', group:'紀錄組',     work:'#',        instagram:'#', youtube:'#' },
  { id:'38', x: 3600, y: 2600, size: 450, name:'廖恩鑫', group:'紀錄組',     work:'A7.html',  instagram:'https://www.instagram.com/mokatabako?igsh=dmFhYnhqNWV1Zm1y&utm_source=qr', youtube:'#' },
];

// Seeded RNG (fast, deterministic)
function rng(seed) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const byY = [...studentData].sort((a, b) => a.y - b.y);
byY.forEach((s, rank) => { s.zBand = rank; });

const world    = document.getElementById('world');
const foundSet = new Set();

// Build all students using a DocumentFragment — one DOM insertion total
const worldFrag = document.createDocumentFragment();

studentData.forEach((s, idx) => {
  const w    = mapSize(s.size || 280);
  const sx   = mapX(s.x);
  const sy   = mapY(s.y);

  const wrap = document.createElement('div');
  wrap.className = 'student';
  wrap.style.cssText = `left:${sx - w / 2}px;top:${sy - 40}px;width:${w}px;z-index:${s.zBand * 10 + 1};`;

  const bodyDiv = document.createElement('div');
  bodyDiv.className = 's-body';
  bodyDiv.style.zIndex = s.zBand * 10 + 1;
  const bodyImg = document.createElement('img');
  bodyImg.src = `${STU_RAW}${s.id}.webp`;
  bodyImg.loading = 'lazy';
  bodyImg.draggable = false;
  bodyImg.onerror = () => { bodyImg.src = `${STU_RAW}${s.id}.png`; };
  bodyDiv.appendChild(bodyImg);

  const headDiv = document.createElement('div');
  headDiv.className = 's-head';
  headDiv.style.zIndex = s.zBand * 10 + 3;
  const headImg = document.createElement('img');
  headImg.src = `${STU_RAW}${s.id}.webp`;
  headImg.loading = 'lazy';
  headImg.draggable = false;
  headImg.onerror = () => { headImg.src = `${STU_RAW}${s.id}.png`; };
  headDiv.appendChild(headImg);

  const nameTag = document.createElement('div');
  nameTag.className = 's-name';
  nameTag.id = `nametag-${s.id}`;
  nameTag.style.zIndex = s.zBand * 10 + 4;
  nameTag.textContent = s.name;

  wrap.appendChild(bodyDiv);
  wrap.appendChild(headDiv);
  wrap.appendChild(nameTag);

  const baseZ = s.zBand * 10 + 1;
  wrap.addEventListener('mouseenter', () => { wrap.style.zIndex = 7000; });
  wrap.addEventListener('mouseleave', () => { wrap.style.zIndex = baseZ; });

  wrap.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!foundSet.has(idx)) {
      foundSet.add(idx);
      document.getElementById('found-n').textContent = foundSet.size;
      wrap.classList.add('just-found');
      wrap.addEventListener('animationend', () => wrap.classList.remove('just-found'), { once: true });
    }
    const targetCamX = clamp(sx - getViewW() / 2, 0, WW - getViewW());
    const targetCamY = clamp(sy - getViewH() / 2, 0, WH - getViewH());
    smoothPanTo(targetCamX, targetCamY, 420, () => {
      const sl      = document.getElementById('spotlight');
      const slImg   = document.getElementById('spotlight-img');
      slImg.src = `${STU_RAW}${s.id}.webp`;
      slImg.onerror = () => { slImg.src = `${STU_RAW}${s.id}.png`; };
      document.getElementById('spotlight-label').textContent = s.name || `#${s.id}`;
      document.getElementById('spotlight-group').textContent = s.group || '';

      const igBtn   = document.getElementById('sl-instagram');
      const ytBtn   = document.getElementById('sl-youtube');
      const workBtn = document.getElementById('spotlight-work');
      const hasIG = s.instagram && s.instagram !== '#';
      const hasYT = s.youtube   && s.youtube   !== '#';
      igBtn.href = hasIG ? s.instagram : '#';
      ytBtn.href = hasYT ? s.youtube   : '#';
      igBtn.classList.toggle('hidden', !hasIG);
      ytBtn.classList.toggle('hidden', !hasYT);
      workBtn.href = s.work || '#';
      workBtn.onclick = (s.work && s.work !== '#') ? null : (ev => ev.preventDefault());
      workBtn.classList.toggle('hidden', !s.work || s.work === '#');
      sl.classList.add('active');
    });
  });

  worldFrag.appendChild(wrap);
});

// Preload grass images
GRASS_IMGS.forEach(name => { new Image().src = `${GRASS_RAW}${name}.webp`; });
new Image().src = 'image/grass/grass_bg03_11zon_11zon.webp';

// Build grass into fragment too
const r2            = rng(9999);
const RANDOM_CLUMPS = 10;

function placeGrass(x, y, w, z, gName, flip, bri) {
  const div = document.createElement('div');
  div.className = 'gc';
  div.style.cssText = `left:${x}px;top:${y}px;width:${w}px;z-index:${z};`;
  const img = document.createElement('img');
  img.src = `${GRASS_RAW}${gName}.webp`;
  img.loading = 'lazy';
  img.draggable = false;
  img.style.cssText = `transform:scaleX(${flip});filter:brightness(${bri});`;
  div.appendChild(img);
  worldFrag.appendChild(div);
}

for (let i = 0; i < RANDOM_CLUMPS; i++) {
  const gName = GRASS_IMGS[Math.floor(r2() * GRASS_IMGS.length)];
  const cx    = r2() * WW;
  const cy    = r2() * WH;
  const scale = 0.9 + r2() * 1.3;
  const flip  = r2() > 0.5 ? -1 : 1;
  const bri   = (0.82 + r2() * 0.3).toFixed(2);
  const bw    = Math.round(GRASS_WIDTHS[gName] * scale * SCALE_X);
  const band  = byY.filter(s => mapY(s.y) < cy).length;
  placeGrass(cx - bw / 2, cy - 25, bw, band * 10 + 2, gName, flip, bri);
}

studentData.forEach(s => {
  const w      = mapSize(s.size || 280);
  const sx     = mapX(s.x);
  const sy     = mapY(s.y);
  const gName  = GRASS_IMGS[Math.floor(r2() * GRASS_IMGS.length)];
  const scale  = 0.9 + r2() * 0.55;
  const bw     = Math.round(GRASS_WIDTHS[gName] * scale * SCALE_X);
  const flip   = r2() > 0.5 ? -1 : 1;
  const bri    = (0.88 + r2() * 0.18).toFixed(2);
  const grassY = (sy - 40) + (w * 1.8) * 0.42;

  placeGrass(sx - bw / 2 + (r2() - 0.5) * 30, grassY, bw, s.zBand * 10 + 2, gName, flip, bri);
});

// Single DOM insertion for all students + grass
world.appendChild(worldFrag);

/* ======================
   Camera / Pan / Drag
====================== */
const clamp = (v, mn, mx) => Math.max(mn, Math.min(mx, v));

// Read the canvas container's own size — avoids triggering continuous layout recalculation
function getViewW() { return aboutMain ? aboutMain.clientWidth  : window.innerWidth;  }
function getViewH() { return aboutMain ? aboutMain.clientHeight : window.innerHeight; }

let camX = WW / 2 - getViewW() / 2;
let camY = WH / 2 - getViewH() / 2;
let drag = false, lmx = 0, lmy = 0, vx = 0, vy = 0, raf = 0;

function applyCamera() {
  const vw = getViewW(), vh = getViewH();
  camX = clamp(camX, 0, WW - vw);
  camY = clamp(camY, 0, WH - vh);
  world.style.transform = `translate3d(${-camX}px,${-camY}px,0)`;
  updateMinimap();
}

function smoothPanTo(targetX, targetY, duration, onDone) {
  const startX = camX, startY = camY;
  const startTime = performance.now();
  const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  cancelAnimationFrame(raf);
  (function step(now) {
    const t = Math.min((now - startTime) / duration, 1);
    camX = startX + (targetX - startX) * ease(t);
    camY = startY + (targetY - startY) * ease(t);
    applyCamera();
    if (t < 1) raf = requestAnimationFrame(step);
    else if (onDone) onDone();
  })(performance.now());
}

const spotlight = document.getElementById('spotlight');
document.getElementById('spotlight-close').addEventListener('click', e => {
  e.stopPropagation();
  spotlight.classList.remove('active');
});
spotlight.addEventListener('click', () => spotlight.classList.remove('active'));
document.getElementById('spotlight-card').addEventListener('click', e => e.stopPropagation());

aboutMain.addEventListener('mousedown', e => {
  drag = true;
  lmx = e.clientX;
  lmy = e.clientY;
  vx = vy = 0;
  aboutMain.classList.add('dragging');
  cancelAnimationFrame(raf);
  document.getElementById('drag-hint').classList.add('hidden');
});

window.addEventListener('mousemove', e => {
  if (!drag) return;
  vx = e.clientX - lmx;
  vy = e.clientY - lmy;
  camX -= vx;
  camY -= vy;
  lmx = e.clientX;
  lmy = e.clientY;
  applyCamera();
});

window.addEventListener('mouseup', () => {
  drag = false;
  aboutMain.classList.remove('dragging');
  (function coast() {
    vx *= 0.89;
    vy *= 0.89;
    if (Math.abs(vx) < 0.35 && Math.abs(vy) < 0.35) return;
    camX -= vx;
    camY -= vy;
    applyCamera();
    raf = requestAnimationFrame(coast);
  })();
});

aboutMain.addEventListener('touchstart', e => {
  const t = e.touches[0];
  drag = true;
  lmx = t.clientX;
  lmy = t.clientY;
  vx = vy = 0;
  cancelAnimationFrame(raf);
  document.getElementById('drag-hint').classList.add('hidden');
}, { passive: true });

aboutMain.addEventListener('touchmove', e => {
  if (!drag) return;
  const t = e.touches[0];
  vx = t.clientX - lmx;
  vy = t.clientY - lmy;
  camX -= vx;
  camY -= vy;
  lmx = t.clientX;
  lmy = t.clientY;
  applyCamera();
}, { passive: true });

window.addEventListener('touchend', () => {
  drag = false;
  aboutMain.classList.remove('dragging');
});

window.addEventListener('resize', applyCamera);

/* ======================
   Minimap
====================== */
function updateMinimap() {
  const mm = document.getElementById('minimap');
  if (!mm) return;

  const mw = mm.clientWidth;
  const mh = mm.clientHeight;
  const vp = document.getElementById('mm-vp');

  vp.style.left   = (camX / WW * mw) + 'px';
  vp.style.top    = (camY / WH * mh) + 'px';
  vp.style.width  = (getViewW() / WW * mw) + 'px';
  vp.style.height = (getViewH() / WH * mh) + 'px';
}

(function buildDots() {
  const mm = document.getElementById('minimap');
  if (!mm) return;

  const mw = mm.clientWidth;
  const mh = mm.clientHeight;
  const c  = document.getElementById('mm-dots');
  c.innerHTML = '';

  const frag = document.createDocumentFragment();

  studentData.forEach(s => {
    const d = document.createElement('div');
    d.className = 'mm-dot';
    d.style.left = (mapX(s.x) / WW * mw) + 'px';
    d.style.top  = (mapY(s.y) / WH * mh) + 'px';
    frag.appendChild(d);
  });

  c.appendChild(frag);
})();

applyCamera();

/* ======================
   Video sources (responsive)
====================== */
const loadVideo = document.getElementById('loadVideo');
const bgVideo   = document.getElementById('bgVideo');
let currentLoadSrc = '';
let currentBgSrc   = '';

function updateLoadVideoSource() {
  if (!loadVideo) return;
  const newSrc = window.innerWidth > 768 ? 'video/loading/loading2.mp4' : 'video/loading/loading.mp4';
  if (currentLoadSrc === newSrc) return;
  currentLoadSrc = newSrc;
  loadVideo.pause();
  loadVideo.innerHTML = `<source src="${newSrc}" type="video/mp4">`;
  loadVideo.style.minWidth = window.innerWidth <= 768 ? '100%' : '';
  loadVideo.load();
  loadVideo.play();
}

function updateBgVideoSource() {
  if (!bgVideo) return;
  const newSrc = window.innerWidth > 768 ? 'video/start/start_desktop.mp4' : 'video/start/start_mobile.mp4';
  if (currentBgSrc === newSrc) return;
  currentBgSrc = newSrc;
  bgVideo.pause();
  bgVideo.innerHTML = `<source src="${newSrc}" type="video/mp4">`;
  bgVideo.style.maxWidth = window.innerWidth <= 768 ? '100vw' : '';
  bgVideo.load();
  bgVideo.play();
}

updateLoadVideoSource();
updateBgVideoSource();

// Debounce resize for video source switching
let videoResizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(videoResizeTimer);
  videoResizeTimer = setTimeout(() => {
    updateLoadVideoSource();
    updateBgVideoSource();
  }, 200);
});

/* ======================
   Loader fade-out (CSS transition instead of JS loop)
====================== */
window.addEventListener('load', () => {
  if (loadVideo) {
    loadVideo.style.transition = 'opacity 0.5s ease';
    loadVideo.style.opacity = '0';
  }
});

/* ======================
   Main section images (data-img)
====================== */
const RAW  = 'https://raw.githubusercontent.com/Koogeocimo/beforezerosource/main/01_image/';
const S3   = RAW + 'scrolling3/';
const RB   = RAW + 'rebuild_01/';
const isMobileImg = window.innerWidth <= 768;

const IMGS = {
  bg_gray: isMobileImg
    ? 'image/scrolling1/bg_gray_s.webp'
    : 'image/scrolling1/bg_gray.webp',

  bg_red: isMobileImg
    ? 'image/scrolling1/00_redlight_s.webp'
    : 'image/scrolling1/00_redlight.webp',

logo:     S3 + 'standW_horizon_W.webp',
  favicon:  S3 + 'faviconW.webp',
  bg0104:   'image/scrolling1/0104_02.webp',
  bg0510:   'image/scrolling1/0510_02.webp',
  bg1115:   'image/scrolling1/1115_02.webp',
  bg1619:   'image/scrolling1/1619_02.webp',
  openshow: 'image/main/openshow.webp',
  workshop: 'image/main/workshop.webp',
  speaking: 'image/main/speaking.webp',
};

const ARTWORK  = "https://raw.githubusercontent.com/Koogeocimo/beforezerosource/main/01_image/cards/cardback01.webp";
const NULL_IMG = "image/main/nullfront.webp";
const LOGO_URL = "image/main/standW_horizon_B.png";

const ART_CARDS = [
  { code:"A1",  name:"",                                   url:"https://i.pinimg.com/736x/15/10/51/151051efc7df1eb665a233d3bbc16235.jpg" },
  { code:"A2",  name:"",                                   url:"https://i.pinimg.com/736x/87/2a/e4/872ae454707f8e00ecb8c2a54d6c6158.jpg" },
  { code:"A3",  name:"",                                   url:NULL_IMG },
  { code:"A4",  name:"CYBERF**K 2.0",                     url:NULL_IMG },
  { code:"A5",  name:"北方不再場",                          url:"https://i.pinimg.com/736x/48/15/03/48150390eac405a9f14cb2a71c1fbc34.jpg" },
  { code:"A6",  name:"",                                   url:NULL_IMG },
  { code:"A7",  name:"讓我看看",                            url:NULL_IMG },
  { code:"A8",  name:"",                                   url:NULL_IMG },
  { code:"A9",  name:"A long, long cloud on the horizon",  url:"https://i.pinimg.com/736x/18/70/3c/18703ce6c8e214da311613079c2f2842.jpg" },
  { code:"A10", name:"",                                   url:NULL_IMG },
  { code:"A11", name:"不知道要放哪裡就放這裡吧",             url:"https://i.pinimg.com/736x/e4/bb/93/e4bb93d8649b2579b055f3c09c847571.jpg" },
  { code:"A12", name:"月薪108000",                          url:"https://i.pinimg.com/736x/ba/c1/50/bac1504f90199b8d9fc32cb74f779c9d.jpg" },
  { code:"B1",  name:"菌絲覆生計畫",                        url:NULL_IMG },
  { code:"B2",  name:"Is There Anyone Home?",              url:"https://i.pinimg.com/736x/71/52/65/715265d105743dba14e7066fc300388a.jpg" },
  { code:"B3",  name:"眼冒金星Seeing star",                 url:NULL_IMG },
  { code:"B4",  name:"lasso",                              url:NULL_IMG },
  { code:"B5",  name:"跟你說一個故事",                      url:"https://i.pinimg.com/736x/a0/36/a2/a036a2dfbc6b1e7e6d777cc633a25040.jpg" },
  { code:"B6",  name:"click clack crack",                  url:"https://i.pinimg.com/736x/6d/72/b5/6d72b5df13a142d3188928fce67b3162.jpg" },
  { code:"B7",  name:"P. E. G.",                           url:"https://i.pinimg.com/736x/29/dc/d4/29dcd43f38a49985dcbfddbfc42ca676.jpg" },
  { code:"B8",  name:"鏡界 Re-reflection",                  url:"https://i.pinimg.com/736x/c5/8a/bb/c58abbc23249c7ad4b5c9efd4aea2f11.jpg" },
  { code:"B9",  name:"éthéré",                             url:NULL_IMG },
];

const _pickedIdx = Math.floor(Math.random() * ART_CARDS.length);
const _picked    = ART_CARDS[_pickedIdx];

Object.keys(IMGS).forEach(key => {
  document.querySelectorAll(`[data-img="${key}"]`).forEach(el => { el.src = IMGS[key]; });
});

/* ======================
   Art card strip
====================== */
function buildStrip(zone) {
  const strip = zone.querySelector('.card-strip');
  const frag  = document.createDocumentFragment();

  const padStart = document.createElement('div');
  padStart.style.cssText = 'flex-shrink:0;width:50vw;';
  frag.appendChild(padStart);

  ART_CARDS.forEach((card, idx) => {
    const el = document.createElement('div');
    el.className = 'strip-card' + (idx === _pickedIdx ? ' active' : '');
    el.dataset.idx = idx;
    el.innerHTML =
      `<img class="s-logo" src="${LOGO_URL}" alt="Logo">` +
      `<div class="s-frame"><img src="${card.url}" alt="${card.code}"></div>` +
      `<div class="s-title">${card.name || card.code}</div>`;
    frag.appendChild(el);
  });

  const padEnd = document.createElement('div');
  padEnd.style.cssText = 'flex-shrink:0;width:50vw;';
  frag.appendChild(padEnd);

  strip.innerHTML = '';
  strip.appendChild(frag);
}

function centerStrip(zone) {
  const strip = zone.querySelector('.card-strip');
  const card  = strip.querySelectorAll('.strip-card')[_pickedIdx];
  if (!card) return;
  const stripRect = strip.getBoundingClientRect();
  const cardRect  = card.getBoundingClientRect();
  strip.scrollLeft += cardRect.left - stripRect.left - strip.clientWidth / 2 + card.offsetWidth / 2;
}

function initArtCards() {
  document.querySelectorAll('.back-art-img').forEach(img => { img.src = _picked.url; });
  document.querySelectorAll('.back-art-title').forEach(el  => { el.textContent = _picked.name || _picked.code; });
}

window.addEventListener('load', () => {
  document.querySelectorAll('.artwork-card-img').forEach(el => { el.src = ARTWORK; });
  initArtCards();
  document.querySelectorAll('.card-zone').forEach(zone => {
    buildStrip(zone);
    enableStripDrag(zone.querySelector('.card-strip'));
  });
});

// Mouse/touch drag on card strip
function enableStripDrag(strip) {
  let isDragging = false;
  let startX = 0;
  let startScroll = 0;
  let dragMoved = false;

  function startDrag(clientX) {
    isDragging = true;
    dragMoved = false;
    startX = clientX;
    startScroll = strip.scrollLeft;
    strip.classList.add('dragging');
  }

  function moveDrag(clientX) {
    if (!isDragging) return;
    const dx = clientX - startX;
    if (Math.abs(dx) > 6) dragMoved = true;
    strip.scrollLeft = startScroll - dx;
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    strip.classList.remove('dragging');
  }

  // mouse
  strip.addEventListener('mousedown', function (e) {
    startDrag(e.pageX);
    e.preventDefault();
  });

  document.addEventListener('mousemove', function (e) {
    moveDrag(e.pageX);
  });

  document.addEventListener('mouseup', function () {
    endDrag();
  });

  // touch
  strip.addEventListener('touchstart', function (e) {
    if (!e.touches.length) return;
    startDrag(e.touches[0].pageX);
  }, { passive: true });

  strip.addEventListener('touchmove', function (e) {
    if (!isDragging || !e.touches.length) return;
    moveDrag(e.touches[0].pageX);

    // 有明顯水平拖曳時，避免整頁跟著上下滑
    if (dragMoved) {
      e.preventDefault();
    }
  }, { passive: false });

  strip.addEventListener('touchend', function () {
    endDrag();
  });

  strip.addEventListener('touchcancel', function () {
    endDrag();
  });

  // 拖曳後不要觸發點擊
  strip.addEventListener('click', function (e) {
    if (dragMoved) {
      e.stopPropagation();
      e.preventDefault();
      dragMoved = false;
    }
  }, true);
}

/* ======================
   Promo strip drag-to-scroll
====================== */
function getLayoutScale(el) {
  const layout = el.closest('#layout-web, #layout-handy');
  if (!layout) return 1;
  return new DOMMatrix(window.getComputedStyle(layout).transform).a || 1;
}

function initDragPromoStrip(stripEl, oneSetWidth, animDuration) {
  let isDragging = false, startX = 0, dragOffset = 0, currentOffset = 0;

  function captureAnimOffset() {
    const delay    = parseFloat(window.getComputedStyle(stripEl).animationDelay) || 0;
    const progress = ((-delay) % animDuration) / animDuration;
    return -(progress * oneSetWidth);
  }

  function startDrag(clientX) {
    isDragging = true;
    dragOffset = captureAnimOffset();
    currentOffset = dragOffset;
    startX = clientX;
    stripEl.style.animationPlayState = 'paused';
    stripEl.style.transform = `translateX(${dragOffset}px)`;
    stripEl.style.cursor    = 'grabbing';
  }

  function moveDrag(clientX) {
    if (!isDragging) return;
    const delta     = (clientX - startX) / getLayoutScale(stripEl);
    const newOffset = ((( dragOffset + delta) % oneSetWidth) - oneSetWidth) % oneSetWidth;
    currentOffset   = newOffset;
    stripEl.style.transform = `translateX(${newOffset}px)`;
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    stripEl.style.cursor = 'grab';
    const elapsed = Math.abs(currentOffset) / oneSetWidth * animDuration;
    stripEl.style.transform          = '';
    stripEl.style.animationDelay     = `-${elapsed}s`;
    stripEl.style.animationPlayState = 'running';
  }

  stripEl.addEventListener('mousedown', e => { e.preventDefault(); startDrag(e.clientX); });
  document.addEventListener('mousemove', e => { if (isDragging) moveDrag(e.clientX); });
  document.addEventListener('mouseup',  endDrag);

  stripEl.addEventListener('touchstart', e => { startDrag(e.touches[0].clientX); }, { passive: true });
  document.addEventListener('touchmove',  e => { if (isDragging) moveDrag(e.touches[0].clientX); }, { passive: true });
  document.addEventListener('touchend',  endDrag);

  stripEl.style.cursor = 'grab';
}

window.addEventListener('load', () => {
  document.querySelectorAll('#layout-web .promo-strip').forEach(el => initDragPromoStrip(el, 1892.24, 90));
  document.querySelectorAll('#layout-handy .promo-strip').forEach(el => initDragPromoStrip(el, 1252.24, 80));

  // Mobile body-text wheel scroll
  const mobileTextWrap = document.querySelector('#layout-handy .body-text-wrap');
  if (mobileTextWrap) {
    document.getElementById('layout-handy').addEventListener('wheel', e => {
      const scale = new DOMMatrix(window.getComputedStyle(document.getElementById('layout-handy')).transform).a || 1;
      const rect  = mobileTextWrap.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top  && e.clientY <= rect.bottom) {
        e.preventDefault();
        mobileTextWrap.scrollTop += e.deltaY / scale;
      }
    }, { passive: false });

    let touchStartY = 0;
    mobileTextWrap.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
    mobileTextWrap.addEventListener('touchmove',  e => {
      const dy = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      mobileTextWrap.scrollTop += dy;
    }, { passive: true });
  }
});

/* ======================
   BG Wiggle — mouse parallax
   Only runs rAF when mouse actually moved (dirty flag)
====================== */
(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mouseX = 0, mouseY = 0, smoothX = 0, smoothY = 0;
  let dirty  = true; // start dirty so first frame initialises positions
  const STRENGTH = 46, LERP = 0.08, THRESHOLD = 0.001;

  let layerData = [];
  function collectLayers() {
    layerData = [];
    document.querySelectorAll('.bg-layer[data-parallax]').forEach(el => {
      const depth      = parseFloat(el.dataset.parallax) || 0;
      const rotMatch   = (el.getAttribute('style') || '').match(/rotate\([^)]+\)/);
      const rotate     = rotMatch ? rotMatch[0] : '';
      layerData.push({ el, depth, rotate });
    });
  }

  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    dirty  = true;
  });
  window.addEventListener('touchmove', e => {
    if (!e.touches.length) return;
    mouseX = (e.touches[0].clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
    dirty  = true;
  }, { passive: true });

  function wiggleLoop() {
    if (!reducedMotion && dirty) {
      const prevX = smoothX, prevY = smoothY;
      smoothX += (mouseX - smoothX) * LERP;
      smoothY += (mouseY - smoothY) * LERP;
      // Stop running rAF once settled
      if (Math.abs(smoothX - prevX) < THRESHOLD && Math.abs(smoothY - prevY) < THRESHOLD) {
        dirty = false;
      }
      layerData.forEach(item => {
        const dx = smoothX * item.depth * STRENGTH;
        const dy = smoothY * item.depth * STRENGTH;
        item.el.style.transform = item.rotate
          ? `translateX(${dx}px) translateY(${dy}px) ${item.rotate}`
          : `translateX(${dx}px) translateY(${dy}px)`;
      });
    }
    requestAnimationFrame(wiggleLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { collectLayers(); wiggleLoop(); });
  } else {
    collectLayers();
    wiggleLoop();
  }
})();

/* ======================
   Card flip + press + strip reveal
====================== */
document.querySelectorAll('.card-zone').forEach(zone => {
  const wrap       = zone.querySelector('.card-flip-wrap');
  const inner      = wrap.querySelector('.card-flip-inner');
  const stripOuter = zone.querySelector('.card-strip-outer');
  const seeMore    = zone.querySelector('.see-more-btn');
  let isFlipped    = false;
  let isAnimating  = false;
  let seeMoreTimer = null;

  function showStrip() {
    wrap.classList.add('hide-wrap');
    stripOuter.classList.add('visible');
    centerStrip(zone);
    seeMoreTimer = setTimeout(() => { seeMore.classList.add('visible'); }, 1000);
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
        setTimeout(() => {
          inner.classList.add('shaking');
          isFlipped   = false;
          isAnimating = false;
        }, 50);
      });
      return;
    }
    inner.classList.remove('spring-back', 'shaking', 'flip-back', 'flipped');
    inner.classList.add('pressed');
  }

  function onRelease() {
    if (!inner.classList.contains('pressed')) return;
    inner.classList.remove('pressed');
    isAnimating = true;
    inner.classList.add('spring-back');
    inner.addEventListener('animationend', function handler() {
      inner.removeEventListener('animationend', handler);
      inner.classList.remove('spring-back');
      isFlipped   = true;
      isAnimating = false;
      showStrip();
    });
  }

  wrap.addEventListener('mousedown',  onPress);
  document.addEventListener('mouseup', onRelease);
  wrap.addEventListener('touchstart',  onPress,    { passive: false });
  document.addEventListener('touchend', onRelease);

  stripOuter.addEventListener('click', e => {
    if (!e.target.closest('.strip-card')) {
      hideStrip();
      isFlipped = false;
      inner.classList.remove('flipped');
      setTimeout(() => { inner.classList.add('shaking'); }, 50);
    }
  });
});

/* ======================
   Layout (desktop / mobile) + event-card hover
====================== */
const desktopSnaps = [0, 519, 1190, 1980, 2600];
const mobileSnaps  = [0, 352, 670,  1480, 1980];

function positionSnaps(positions, scale) {
  for (let i = 0; i < 5; i++) {
    const anchor = document.getElementById('snap-' + i);
    if (!anchor) continue;
    anchor.style.top = (positions[i] !== undefined ? Math.round(positions[i] * scale) : -9999) + 'px';
  }
}

// Cache card geometry once per applyLayout call — not on every mousemove
let hoverBound = false;
let cachedCardRects = null;

function invalidateCardCache() {
  cachedCardRects = null;
}

function setupHover() {
  if (hoverBound) return;
  hoverBound = true;

  let lockedCard = null;

  ['layout-handy', 'layout-web'].forEach(id => {
    const layout = document.getElementById(id);
    if (!layout) return;

    layout.addEventListener('mousemove', e => {
      const isDesktop = window.innerWidth >= 1024;
      const scale = isDesktop ? window.innerWidth / 1440 : window.innerWidth / 390;
      const layoutRect = layout.getBoundingClientRect();
      const mx = (e.clientX - layoutRect.left) / scale;
      const my = (e.clientY - layoutRect.top) / scale;

      if (!cachedCardRects) {
        cachedCardRects = [];
        layout.querySelectorAll('.event-card').forEach(card => {
          cachedCardRects.push({
            card,
            l: parseFloat(getComputedStyle(card).left),
            t: parseFloat(getComputedStyle(card).top),
            w: card.offsetWidth,
            h: card.offsetHeight,
          });
        });
      }

      if (lockedCard && lockedCard.closest('#' + id)) {
        const r = cachedCardRects.find(r => r.card === lockedCard);
        if (r && mx >= r.l && mx <= r.l + r.w && my >= r.t && my <= r.t + r.h) return;
        lockedCard.classList.remove('hovered');
        lockedCard = null;
      }

      for (const r of cachedCardRects) {
        if (mx >= r.l && mx <= r.l + r.w && my >= r.t && my <= r.t + r.h) {
          r.card.classList.add('hovered');
          lockedCard = r.card;
          break;
        }
      }
    });

    layout.addEventListener('mouseleave', () => {
      layout.querySelectorAll('.event-card').forEach(c => c.classList.remove('hovered'));
      lockedCard = null;
    });
  });
}
/* getViewportHeight() removed — use getViewH() instead */
/**/
function applyLayout() {
  const vw        = window.innerWidth;
  const vh        = getViewH();
  const isDesktop = vw >= 1024;
  const handy     = document.getElementById('layout-handy');
  const web       = document.getElementById('layout-web');
  //const upDownPanel2 = document.querySelector('.upDownPanel2');
  //const upDownGroup  = document.querySelector('.upDownGroup');

  let scale, panelHeight;

  if (isDesktop) {
    handy.style.display = 'none';
    web.style.display   = 'block';
    scale       = vw / 1440;
    panelHeight = Math.round(3200 * scale);
    web.style.transform = `scale(${scale})`;
    positionSnaps(desktopSnaps, scale);
  } else {
    web.style.display   = 'none';
    handy.style.display = 'block';
    scale       = vw / 390;
    panelHeight = Math.round(2600 * scale);
    handy.style.transform = `scale(${scale})`;
    positionSnaps(mobileSnaps, scale);
  }

  /*if (upDownPanel2) {
    upDownPanel2.style.height = panelHeight + 'px';
  }*/

  /*if (upDownGroup) {
    upDownGroup.style.height = (panelHeight + vh * 3) + 'px';
  }*/

  invalidateCardCache();
  setupHover();
}

applyLayout();

let layoutResizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(layoutResizeTimer);
  layoutResizeTimer = setTimeout(() => {
    applyLayout();
  }, 150);
});
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    clearTimeout(layoutResizeTimer);
    layoutResizeTimer = setTimeout(applyLayout, 150);
  });
}
/* ======================
   Section scroll links
====================== */
function scrollToTarget(target, isDesktop) {
  if (!target) return;
  const offset = isDesktop ? 120 : 80;
  window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - offset, behavior: 'smooth' });
}

function bindCustomSectionLink(linkSelector, getTarget) {
  const link = document.querySelector(linkSelector);
  if (!link) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    scrollToTarget(getTarget(), window.innerWidth >= 1024);
  });
}

bindCustomSectionLink('a[href="#works2"]', () =>
  window.innerWidth >= 1024
    ? document.getElementById('works-cardzone-desktop')
    : document.getElementById('works-cardzone-mobile')
);
bindCustomSectionLink('a[href="#event2"]', () =>
  window.innerWidth >= 1024
    ? document.getElementById('wcard-02')
    : document.getElementById('hcard-02')
);
bindCustomSectionLink('a[href="#exhibit2"]', () =>
  window.innerWidth >= 1024
    ? document.querySelector('#layout-web .body-text')
    : document.querySelector('#layout-handy .body-text-wrap')
);

function jumpToMainSectionByHash(hash, smooth = true) {
  const behavior  = smooth ? 'smooth' : 'auto';
  const isDesktop = window.innerWidth >= 1024;
  const offset    = isDesktop ? 120 : 80;

  const targetMap = {
    '#works2':   () => isDesktop ? document.getElementById('works-cardzone-desktop') : document.getElementById('works-cardzone-mobile'),
    '#event2':   () => isDesktop ? document.getElementById('wcard-02')               : document.getElementById('hcard-02'),
    '#exhibit2': () => isDesktop ? document.querySelector('#layout-web .date-group') : document.querySelector('#layout-handy .date-group'),
  };

  if (targetMap[hash]) {
    const target = targetMap[hash]();
    if (!target) return;
    window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - offset, behavior });
    return;
  }

  if (['#about2', '#shop', '#visit2'].includes(hash)) {
    const target = document.querySelector(hash);
    if (!target) return;
    window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top, behavior });
  }
}

window.addEventListener('load', () => {
  if (!window.location.hash) return;
  setTimeout(() => jumpToMainSectionByHash(window.location.hash, false), 200);
});

/* ======================
   Works cards fetch
====================== */
fetch("https://script.google.com/macros/s/AKfycby1E_A5sVq0UCVlnjtLyyklGE1lSr-V1OHcgpDfQfuLVBCnzDTs6oL1Re4d5GUJlANiiw/exec")
  .then(res => res.json())
  .then(data => {
    const itemMap = Object.fromEntries(data.map(item => [item.group, item]));

    ART_CARDS.forEach(card => {
      const item = itemMap[card.code];
      if (item) {
        card.name = item.title || card.name;
        card.url  = item.cover || card.url;
      }
    });

    // fetch 完後重畫 strip
    document.querySelectorAll('.card-zone').forEach(zone => {
      buildStrip(zone);
      centerStrip(zone);
    });

    // 更新背面那張隨機卡
    const picked = ART_CARDS[_pickedIdx];
    document.querySelectorAll('.back-art-img').forEach(img => {
      img.src = picked.url;
    });
    document.querySelectorAll('.back-art-title').forEach(el => {
      el.textContent = picked.name || picked.code;
    });
  })
  .catch(err => {
    console.error('作品資料載入失敗', err);
  });

  /*YT*/
  function initLazyYouTubeCards() {
  document.querySelectorAll('.yt-card').forEach(card => {
    card.addEventListener('click', function handleClick() {
      const videoId = card.dataset.videoId;
      if (!videoId) return;

      card.innerHTML = `
        <iframe
          loading="lazy"
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&muted=1&controls=1&rel=0"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          title="YouTube video">
        </iframe>
      `;
    }, { once: true });
  });
}

window.addEventListener('load', initLazyYouTubeCards);
