const menuIcon = document.querySelector(".menu-icon");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");
history.scrollRestoration = 'manual';

menuIcon.addEventListener("mouseenter", () => {
  if (window.innerWidth > 768) {
    sideMenu.classList.add("active");
    overlay.classList.add("active");
  }
});


sideMenu.addEventListener("mouseleave", () => {
  if (window.innerWidth > 768) {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  }
});


menuIcon.addEventListener("mouseleave", () => {
  if (window.innerWidth > 768) {
    setTimeout(() => {
      if (!sideMenu.matches(":hover")) {
        sideMenu.classList.remove("active");
        overlay.classList.remove("active");
      }
    }, 100);
  }
});



menuIcon.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    sideMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  }
});


overlay.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
});
/*
const visitLink = document.querySelector('a[href="#visit2"]');
const group = document.querySelector('.upDownGroup');
visitLink.addEventListener('click', (e) => {
  
  e.preventDefault();

  window.scrollTo({
    top: group.offsetTop + window.innerHeight*3,
    behavior: "smooth"
  });
  
});*/
document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", () => {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
});
const bgA = document.querySelector(".bg.A");
const visitTrigger = document.querySelector("#visit2");

function updateBgSwitch() {
  if (!bgA || !visitTrigger) return;

  const triggerTop = visitTrigger.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight ; // 進入畫面中線時切換

  if (triggerTop <= triggerPoint) {
    bgA.classList.add("hide");
  } else {
    bgA.classList.remove("hide");
  }
}

window.addEventListener("scroll", updateBgSwitch);
window.addEventListener("resize", updateBgSwitch);
window.addEventListener("load", updateBgSwitch);
/*const bgA = document.querySelector(".bg.A");

window.addEventListener("scroll", () => {

  // 當滑到第3屏（visit區）
  if (window.scrollY > window.innerHeight * 5) {
    bgA.classList.add("hide"); // 顯示B
  } else {
    bgA.classList.remove("hide"); // 顯示A
  }
});*//*window.addEventListener("load", () => {
  if (window.location.hash) {
    const id = window.location.hash.replace("#", "");
    const target = document.getElementById(id);

    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }
});*//* ======================
   主頁商品圖 偽3D滑鼠效果
====================== */
const visualImages = [
  "image/shop/hook1.png",
  "image/shop/sock1.png",
  "image/shop/cup1.png",
  "image/shop/card1.png",
  "image/shop/poster1.png"
];

let currentIndex = 0;
let isAnimating = false;
let hoverTimer = null;
let queuedDir = 0;
const shopSection = document.querySelector("#shop");
const shopVisualImg = document.querySelector(".shop-visual img");

if (shopSection && shopVisualImg) {
  let rafId = null;

  shopSection.addEventListener("mousemove", (e) => {
    if (isAnimating) return;

    const rect = shopSection.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;
    const threshold = 0.85;

    const rotateY = percentX * 18;
    const rotateX = percentY * -18;
    const moveX = percentX * 1.2;
    const moveY = percentY * 1.2;

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      shopVisualImg.style.transform = `
        translate3d(${moveX}px, ${moveY}px, 40px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.2)
      `;
    });


    if (Math.abs(percentX) > threshold && !hoverTimer && !isAnimating) {
      queuedDir = percentX > 0 ? 1 : -1;

      hoverTimer = setTimeout(() => {
        switchVisual(queuedDir, 1);
        hoverTimer = null;
      }, 180);
    }


    if (Math.abs(percentX) < 0.6) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
      queuedDir = 0;
    }
  });

  shopSection.addEventListener("mouseleave", () => {
    cancelAnimationFrame(rafId);
    clearTimeout(hoverTimer);
    hoverTimer = null;
    queuedDir = 0;

    shopVisualImg.style.transform = `
    translate3d(0, 0, 0)
    rotateX(0deg)
    rotateY(0deg)
    scale(1.2)
  `;
  });
}
function switchVisual(slideDir, step) {
  isAnimating = true;


  const rect = shopSection.getBoundingClientRect();
  const travelX = rect.width * 1.4;


  shopVisualImg.style.transition = "transform 0.45s ease, opacity 0.3s";
  shopVisualImg.style.transform = `
    translate3d(${travelX * slideDir}px, 0, 40px)
    rotateY(${28 * slideDir}deg)
    scale(1.2)
  `;
  shopVisualImg.style.opacity = "0";

  setTimeout(() => {
    currentIndex = (currentIndex + step + visualImages.length) % visualImages.length;
    shopVisualImg.src = visualImages[currentIndex];


    shopVisualImg.style.transition = "none";
    shopVisualImg.style.transform = `
      translate3d(${-travelX * slideDir}px, 0, 40px)
      rotateY(${-28 * slideDir}deg)
      scale(1.2)
    `;
    shopVisualImg.style.opacity = "0";

    requestAnimationFrame(() => {
      shopVisualImg.style.transition = "transform 0.45s ease, opacity 0.35s";
      shopVisualImg.style.transform = `
        translate3d(0, 0, 40px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1.2)
      `;
      shopVisualImg.style.opacity = "1";
    });

    setTimeout(() => {
      isAnimating = false;

    }, 450);
  }, 220);
}
/* ======================
   主頁草地
====================== */
const aboutMain = document.querySelector("#about .main");
const WW = 7872, WH = 3169;
const GRASS_RAW = 'https://raw.githubusercontent.com/Koogeocimo/beforezerosource/main/01_image/grass_pack/';
const STU_RAW   = 'https://raw.githubusercontent.com/Koogeocimo/beforezerosource/main/01_image/student_04/';

const GRASS_IMGS = ['g1','g2','g3','g4','g5','g6','g7','g8','g9','g10','g11','g12'];
const GRASS_WIDTHS = {
  g1:310, g2:430, g3:390, g4:450, g5:465, g6:355,
  g7:410, g8:440, g9:395, g10:420, g11:460, g12:380
};

const studentData = [
  { id:'02', x: 560,  y: 340,  size: 280, name:'梅恩寧', group:'副召',       work:'#',   instagram:'#', youtube:'#' },
  { id:'03', x: 1730, y: 2200, size: 280, name:'謝秉勳', group:'事務組',     work:'#',   instagram:'https://www.instagram.com/mei___arttttt?igsh=Yzd4aTlqY3Y3enhx', youtube:'#' },
  { id:'04', x: 1900, y: 380,  size: 280, name:'李書皓', group:'活動組',     work:'A4.html',  instagram:'https://www.instagram.com/shuhaolee_?igsh=MzZnb3E4bDFmMTRo&utm_source=qr', youtube:'https://youtube.com/@shuhao0?si=q6YFkqVWKaFEUI2Q' },
  { id:'05', x: 2570, y: 200,  size: 280, name:'楊妮鈞', group:'視覺組',     work:'B2.html',  instagram:'https://www.instagram.com/yni_1216/', youtube:'https://www.youtube.com/@%E6%A5%8A%E5%A6%AE%E9%88%9E' },
  { id:'06', x: 3240, y: 350,  size: 280, name:'羅芷葳', group:'周邊組',     work:'#',   instagram:'https://www.instagram.com/wei.fadachai?igsh=MTd1Zmx1dHhsaDNqNQ%3D%3D&utm_source=qr', youtube:'#' },
  { id:'07', x: 3900, y: 190,  size: 280, name:'白若潔', group:'事務組',     work:'B2.html',  instagram:'https://www.instagram.com/jennypai1210?igsh=MWthNTdoMGUxZzI1eA%3D%3D&utm_source=qr', youtube:'https://youtube.com/channel/UCZwq6OVj-VhtEXBkWI0q3Xw?si=iQtOMyQsMS4BjNQK' },
  { id:'08', x: 4580, y: 370,  size: 280, name:'楊昀臻', group:'活動組',     work:'B1.html',  instagram:'https://www.instagram.com/uc.artlab?igsh=MXA5OTgwcGJia2prZg%3D%3D&utm_source=qr', youtube:'#' },
  { id:'09', x: 5250, y: 215,  size: 280, name:'蔡佳蓁', group:'公關組',     work:'B1.html',  instagram:'https://www.instagram.com/jia.z047?igsh=cmhhNjN5a3F5cWNh&utm_source=qr', youtube:'#' },
  { id:'10', x: 5920, y: 360,  size: 280, name:'周玟妤', group:'周邊組',     work:'B3.html',  instagram:'https://www.instagram.com/__cwy.__?igsh=MXZuNzVtMGxsODByZQ%3D%3D&utm_source=qr', youtube:'#' },
  { id:'11', x: 6600, y: 200,  size: 280, name:'江敏豐', group:'視覺組',     work:'B8.html',  instagram:'https://www.instagram.com/j.minfeng/', youtube:'www.youtube.com/@electric_feng' },
  { id:'12', x: 7270, y: 340,  size: 280, name:'徐蕎安', group:'紀錄組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'13', x: 390,  y: 720,  size: 280, name:'趙育旋', group:'周邊組',     work:'A12.html', instagram:'https://www.instagram.com/nao_ii0?igsh=eDZ1MW8ya3hjeDg%3D&utm_source=qr', youtube:'#' },
  { id:'14', x: 1060, y: 870,  size: 280, name:'林當宏', group:'視覺組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'15', x: 560,  y: 2200, size: 280, name:'洪瀅媗', group:'公關組',     work:'A11.html', instagram:'https://www.instagram.com/h52ung?igsh=MWRlZ2ZvazVoa25jdQ%3D%3D&utm_source=qr', youtube:'https://youtube.com/@stringrayaa?si=A4JX0ECS7e-L0LCz' },
  { id:'16', x: 2400, y: 850,  size: 280, name:'陳采宜', group:'視覺組',     work:'#',   instagram:'https://www.instagram.com/yeeeeee.27?igsh=N2plOWg3Ym1kaWlp&utm_source=qr', youtube:'#' },
  { id:'17', x: 7090, y: 2200, size: 280, name:'危俊華', group:'技術統籌組', work:'#',   instagram:'#', youtube:'#' },
  { id:'18', x: 3740, y: 860,  size: 280, name:'楊怡珊', group:'公關組',     work:'B2.html',  instagram:'https://www.instagram.com/yillshan?igsh=bDNpaTk1emlteGhv&utm_source=qr', youtube:'#' },
  { id:'19', x: 4410, y: 720,  size: 280, name:'陳愛莉', group:'事務組',     work:'A5.html',  instagram:'https://www.instagram.com/im94xu4/?hl=zh-tw', youtube:'#' },
  { id:'20', x: 5080, y: 850,  size: 280, name:'林芯羽', group:'紀錄組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'21', x: 5750, y: 710,  size: 280, name:'楊凡力', group:'總召',       work:'B7.html',  instagram:'https://www.instagram.com/fanli.art/', youtube:'https://www.youtube.com/@fl.o24' },
  { id:'22', x: 6420, y: 860,  size: 280, name:'陳玟卉', group:'紀錄組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'23', x: 7090, y: 720,  size: 280, name:'賴昱安', group:'紀錄組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'24', x: 560,  y: 1300, size: 280, name:'陳郁晴', group:'紀錄組',     work:'B6.html',  instagram:'https://www.instagram.com/456_minnie_?igsh=bmhjb3puOWVucDdn', youtube:'#' },
  { id:'25', x: 1390, y: 1450, size: 280, name:'朱家慧', group:'紀錄組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'26', x: 2220, y: 1300, size: 280, name:'郭展良', group:'技術統籌組', work:'A2.html',  instagram:'https://www.instagram.com/o_0.3771?igsh=MWg5cnV6emllaHlyeQ%3D%3D&utm_source=qr', youtube:'https://www.youtube.com/@Leonkou' },
  { id:'27', x: 3050, y: 1440, size: 280, name:'盧紫歆', group:'周邊組',     work:'B3.html',  instagram:'#', youtube:'#' },
  { id:'28', x: 3880, y: 1290, size: 280, name:'李芷萱', group:'副召',       work:'B7.html',  instagram:'https://www.instagram.com/lzjrsyuan_0120?igsh=MXBxZ2k0a203eDVnZQ%3D%3D&utm_source=qr', youtube:'https://youtube.com/@jrsyuanlee3120?si=hWVnf7DNLjx-w3_3' },
  { id:'29', x: 4700, y: 1840, size: 350, name:'吳孟學', group:'網頁組',     work:'B4.html',  instagram:'#', youtube:'#' },
  { id:'30', x: 4730, y: 2300, size: 280, name:'胡詩敏', group:'網頁組',     work:'B4.html',  instagram:'#', youtube:'#' },
  { id:'31', x: 6360, y: 1440, size: 280, name:'許芷芸', group:'公關組',     work:'#',   instagram:'https://www.instagram.com/vrooci?igsh=YndpYW5pNG42ODdh&utm_source=qr', youtube:'#' },
  { id:'32', x: 7580, y: 1690, size: 400, name:'姜如暄', group:'網頁組',     work:'B4.html',  instagram:'https://www.instagram.com/koogeocimo/', youtube:'https://www.youtube.com/@Koogeocimo' },
  { id:'33', x: 980,  y: 1900, size: 280, name:'闕以恩', group:'活動組',     work:'B6.html',  instagram:'https://www.instagram.com/janet_d.j?igsh=NHphamJucWNnZzQz&utm_source=qr', youtube:'http://www.youtube.com/@kareru.3sai' },
  { id:'34', x: 2450, y: 2050, size: 280, name:'朱柏豪', group:'技術統籌組', work:'A1.html',  instagram:'https://www.instagram.com/marc_c__c?igsh=eHEyd3ZodTYyazl5&utm_source=qr', youtube:'https://vimeo.com/user192254939' },
  { id:'35', x: 3920, y: 1900, size: 280, name:'王詩瀅', group:'活動組',     work:'A9.html',  instagram:'https://www.instagram.com/see.eeeing?igsh=ZDd0Mjd4amE5aDky', youtube:'#' },
  { id:'36', x: 5790, y: 2440, size: 450, name:'黃懿文', group:'活動組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'37', x: 6600, y: 1890, size: 280, name:'魏惇儀', group:'紀錄組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'38', x: 3600, y: 2600, size: 450, name:'廖恩鑫', group:'紀錄組',     work:'A7.html',  instagram:'https://www.instagram.com/mokatabako?igsh=dmFhYnhqNWV1Zm1y&utm_source=qr', youtube:'#' },
];

function rng(seed) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ s>>>15, 1|s);
    t = t + Math.imul(t ^ t>>>7, 61|t) ^ t;
    return ((t ^ t>>>14) >>> 0) / 4294967296;
  };
}

const byY = [...studentData].sort((a,b)=>a.y-b.y);
byY.forEach((s,rank) => { s.zBand = rank; });

const world = document.getElementById('world');
const foundSet = new Set();

studentData.forEach((s, idx) => {
  const w = s.size || 280;
  const wrap = document.createElement('div');
  wrap.className = 'student';
  wrap.style.cssText = `
    left: ${s.x - w/2}px;
    top:  ${s.y - 40}px;
    width: ${w}px;
    z-index: ${s.zBand * 10 + 1};
  `;

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

  wrap.addEventListener('mouseenter', () => { wrap.style.zIndex = 7000; });
  wrap.addEventListener('mouseleave', () => { wrap.style.zIndex = s.zBand * 10 + 1; });

  wrap.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!foundSet.has(idx)) {
      foundSet.add(idx);
      document.getElementById('found-n').textContent = foundSet.size;
      wrap.classList.add('just-found');
      wrap.addEventListener('animationend', () => wrap.classList.remove('just-found'), {once:true});
    }
    const targetCamX = clamp(s.x - innerWidth/2,  0, WW - innerWidth);
    const targetCamY = clamp(s.y - innerHeight/2, 0, WH - innerHeight);
    smoothPanTo(targetCamX, targetCamY, 420, () => {
      const sl      = document.getElementById('spotlight');
      const slImg   = document.getElementById('spotlight-img');
      const slLabel = document.getElementById('spotlight-label');
      slImg.src = `${STU_RAW}${s.id}.webp`;
      slImg.onerror = () => { slImg.src = `${STU_RAW}${s.id}.png`; };
      slLabel.textContent = s.name || `#${s.id}`;
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
      workBtn.onclick = (s.work && s.work !== '#') ? null : (e => e.preventDefault());
      workBtn.classList.toggle('hidden', !s.work || s.work === '#');
      sl.classList.add('active');
    });
  });

  world.appendChild(wrap);
});

GRASS_IMGS.forEach(name => { const img = new Image(); img.src = `${GRASS_RAW}${name}.webp`; });
new Image().src = 'https://raw.githubusercontent.com/Koogeocimo/beforezerosource/main/01_image/grass_pack/grass_bg01.webp';

const r2 = rng(9999);
const RANDOM_CLUMPS = 40;
for (let i = 0; i < RANDOM_CLUMPS; i++) {
  const gName = GRASS_IMGS[Math.floor(r2() * GRASS_IMGS.length)];
  const cx    = r2() * WW;
  const cy    = r2() * WH;
  const scale = 0.9 + r2() * 1.3;
  const flip  = r2() > 0.5 ? -1 : 1;
  const bri   = (0.82 + r2() * 0.3).toFixed(2);
  const bw    = GRASS_WIDTHS[gName] * scale;
  const band  = byY.filter(s => s.y < cy).length;
  placeGrass(cx - bw/2, cy - 25, bw|0, band * 10 + 2, gName, flip, bri);
}
studentData.forEach(s => {
  const w     = s.size || 280;
  const gName = GRASS_IMGS[Math.floor(r2() * GRASS_IMGS.length)];
  const scale = 0.9 + r2() * 0.55;
  const bw    = GRASS_WIDTHS[gName] * scale;
  const flip  = r2() > 0.5 ? -1 : 1;
  const bri   = (0.88 + r2() * 0.18).toFixed(2);
  const grassTopY = (s.y - 40) + (w * 1.8) * 0.42;
  placeGrass(s.x - bw/2 + (r2()-0.5)*30, grassTopY, bw|0, s.zBand * 10 + 2, gName, flip, bri);
});

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
  world.appendChild(div);
}

let camX = WW/2 - innerWidth/2;
let camY = WH/2 - innerHeight/2;
let drag=false, lmx=0, lmy=0, vx=0, vy=0, raf=0;
const clamp = (v,mn,mx) => Math.max(mn,Math.min(mx,v));

function applyCamera() {
  camX = clamp(camX, 0, WW - innerWidth);
  camY = clamp(camY, 0, WH - innerHeight);
  world.style.transform = `translate3d(${-camX}px,${-camY}px,0)`;
  updateMinimap();
}

function smoothPanTo(targetX, targetY, duration, onDone) {
  const startX = camX, startY = camY;
  const startTime = performance.now();
  const ease = t => t<0.5 ? 2*t*t : -1+(4-2*t)*t;
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
  e.stopPropagation(); spotlight.classList.remove('active');
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
  (function coast(){
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

function updateMinimap(){
  const mm=document.getElementById('minimap');
  const mw=mm.clientWidth, mh=mm.clientHeight;
  const vp=document.getElementById('mm-vp');
  vp.style.left  =(camX/WW*mw)+'px';
  vp.style.top   =(camY/WH*mh)+'px';
  vp.style.width =(innerWidth/WW*mw)+'px';
  vp.style.height=(innerHeight/WH*mh)+'px';
}
(function buildDots(){
  const mm=document.getElementById('minimap');
  const mw=mm.clientWidth, mh=mm.clientHeight;
  const c=document.getElementById('mm-dots');
  studentData.forEach(s=>{
    const d=document.createElement('div');
    d.className='mm-dot';
    d.style.left=(s.x/WW*mw)+'px';
    d.style.top =(s.y/WH*mh)+'px';
    c.appendChild(d);
  });
})();

applyCamera();

//響應載入影片切換
const load = document.getElementById('loadVideo');
let currentLoadSrc = '';

function updateLoadVideoSource() {
  if (!load) return;

  const newSrc =
    window.innerWidth > 768
      ? 'video/loading/loading2.mp4'
      : 'video/loading/loading.mp4';

  if (currentLoadSrc === newSrc) return;

  currentLoadSrc = newSrc;

  load.pause();
  load.innerHTML = '';

  const newSource = document.createElement('source');
  newSource.src = newSrc;
  newSource.type = 'video/mp4';
  load.appendChild(newSource);

  if (window.innerWidth <= 768) {
    load.style.minWidth = "100%";
  } else {
    load.style.maxWidth = "";
  }

  load.load();
  load.play();
}

const bg = document.getElementById('bgVideo');
let currentBgSrc = '';

function updateBgVideoSource() {
  if (!bg) return;

  const newSrc =
    window.innerWidth > 768
      ? 'video/start/start_desktop.mp4'
      : 'video/start/start_mobile.mp4';

  // 如果來源沒變，就不要重設
  if (currentBgSrc === newSrc) return;

  currentBgSrc = newSrc;

  bg.pause();
  bg.innerHTML = '';

  const newSource = document.createElement('source');
  newSource.src = newSrc;
  newSource.type = 'video/mp4';
  bg.appendChild(newSource);

  if (window.innerWidth <= 768) {
    bg.style.maxWidth = "100vw";
  } else {
    bg.style.maxWidth = "";
  }

  bg.load();
  bg.play();
}

// ✅ 加在這裡
updateLoadVideoSource();
updateBgVideoSource();

window.addEventListener('resize', () => {
  updateLoadVideoSource();
  updateBgVideoSource();
});



//載入
var loader = document.getElementsByClassName("loader");

function fadeOut() {
  if (load.style.opacity > 0) {
    setTimeout(function() {
      load.style.opacity = load.style.opacity - 0.1;
      fadeOut()
    }, 23)
  }
};
window.addEventListener("load", fadeOut);

//主頁阿軒
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

    var groupWork = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"];
    var titleWork = new Array(21);
    var imgWork = new Array(21);
    fetch("https://script.google.com/macros/s/AKfycby1E_A5sVq0UCVlnjtLyyklGE1lSr-V1OHcgpDfQfuLVBCnzDTs6oL1Re4d5GUJlANiiw/exec")
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        for(let i = 0; i < groupWork.length; i++){
            if(item.group == groupWork[i]){
                titleWork[i] = toString(item.title);
                imgWork[i] = toString(item.cover);
            }
        }
      });
    });

    var ART_CARDS = [
      { code: "A1",  name: titleWork[0],          url: "https://i.pinimg.com/736x/15/10/51/151051efc7df1eb665a233d3bbc16235.jpg" },
      { code: "A2",  name: titleWork[1],                               url: "https://i.pinimg.com/736x/87/2a/e4/872ae454707f8e00ecb8c2a54d6c6158.jpg" },
      { code: "A3",  name: titleWork[2],                                    url: NULL_IMG },
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

  var handy = document.getElementById('layout-handy');
  var web   = document.getElementById('layout-web');
  var upDownPanel2 = document.querySelector('.upDownPanel2');
  var upDownGroup  = document.querySelector('.upDownGroup');

  var desktopSnaps = [0, 519, 1190, 1980, 2600];
  var mobileSnaps  = [0, 352, 670, 1480, 1980];

  var scale, panelHeight;

  if (isDesktop) {
    handy.style.display = 'none';
    web.style.display   = 'block';

    scale = vw / 1440;
    panelHeight = Math.round(3200 * scale);

    web.style.transform = 'scale(' + scale + ')';

    positionSnaps(desktopSnaps, scale);

  } else {
    web.style.display   = 'none';
    handy.style.display = 'block';

    scale = vw / 390;
    panelHeight = Math.round(2600 * scale);

    handy.style.transform = 'scale(' + scale + ')';

    positionSnaps(mobileSnaps, scale);
  }

  if (upDownPanel2) {
    upDownPanel2.style.height = panelHeight + 'px';
  }

  if (upDownGroup) {
    var extraHeight = window.innerHeight * 3;
    var totalHeight = panelHeight + extraHeight;
    upDownGroup.style.height = totalHeight + 'px';
  }

  setupHover();   // ← 補這行
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

   function bindCustomSectionLink(linkSelector, getTarget) {
  const link = document.querySelector(linkSelector);
  if (!link) return;

  link.addEventListener('click', function (e) {
    e.preventDefault();

    const target = getTarget();
    if (!target) return;

    const offset = window.innerWidth >= 1024 ? 120 : 80;
    const y = window.scrollY + target.getBoundingClientRect().top - offset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  });
}

// 作品介紹（你原本 works2 可沿用）
bindCustomSectionLink('a[href="#works2"]', function () {
  return window.innerWidth >= 1024
    ? document.getElementById('works-cardzone-desktop')
    : document.getElementById('works-cardzone-mobile');
});

// 活動資訊：跳到第一張活動卡
bindCustomSectionLink('a[href="#event2"]', function () {
  return window.innerWidth >= 1024
    ? document.getElementById('wcard-02')
    : document.getElementById('hcard-02');
});

// 展覽介紹：跳到展覽資訊區
bindCustomSectionLink('a[href="#exhibit2"]', function () {
  return window.innerWidth >= 1024
    ? document.querySelector('#layout-web .body-text')
    : document.querySelector('#layout-handy .body-text-wrap');
});function jumpToMainSectionByHash(hash, smooth = true) {
  const behavior = smooth ? 'smooth' : 'auto';

  if (hash === '#works2') {
    const target = window.innerWidth >= 1024
      ? document.getElementById('works-cardzone-desktop')
      : document.getElementById('works-cardzone-mobile');

    if (!target) return;

    const offset = window.innerWidth >= 1024 ? 120 : 80;
    const y = window.scrollY + target.getBoundingClientRect().top - offset;

    window.scrollTo({ top: y, behavior });
    return;
  }

  if (hash === '#event2') {
    const target = window.innerWidth >= 1024
      ? document.getElementById('wcard-02')
      : document.getElementById('hcard-02');

    if (!target) return;

    const offset = window.innerWidth >= 1024 ? 120 : 80;
    const y = window.scrollY + target.getBoundingClientRect().top - offset;

    window.scrollTo({ top: y, behavior });
    return;
  }

  if (hash === '#exhibit2') {
    const target = window.innerWidth >= 1024
      ? document.querySelector('#layout-web .date-group')
      : document.querySelector('#layout-handy .date-group');

    if (!target) return;

    const offset = window.innerWidth >= 1024 ? 120 : 80;
    const y = window.scrollY + target.getBoundingClientRect().top - offset;

    window.scrollTo({ top: y, behavior });
    return;
  }

  if (hash === '#about2' || hash === '#shop' || hash === '#visit2') {
    const target = document.querySelector(hash);
    if (!target) return;

    const y = window.scrollY + target.getBoundingClientRect().top;
    window.scrollTo({ top: y, behavior });
  }
}window.addEventListener('load', () => {
  if (!window.location.hash) return;

  setTimeout(() => {
    jumpToMainSectionByHash(window.location.hash, false);
  }, 200);
});
