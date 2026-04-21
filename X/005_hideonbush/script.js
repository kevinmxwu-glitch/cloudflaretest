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
  { id:'04', x: 1900, y: 380,  size: 280, name:'李書皓', group:'活動組',     work:'A4',  instagram:'https://www.instagram.com/shuhaolee_?igsh=MzZnb3E4bDFmMTRo&utm_source=qr', youtube:'https://youtube.com/@shuhao0?si=q6YFkqVWKaFEUI2Q' },
  { id:'05', x: 2570, y: 200,  size: 280, name:'楊妮鈞', group:'視覺組',     work:'B2',  instagram:'https://www.instagram.com/yni_1216/', youtube:'https://www.youtube.com/@%E6%A5%8A%E5%A6%AE%E9%88%9E' },
  { id:'06', x: 3240, y: 350,  size: 280, name:'羅芷葳', group:'周邊組',     work:'#',   instagram:'https://www.instagram.com/wei.fadachai?igsh=MTd1Zmx1dHhsaDNqNQ%3D%3D&utm_source=qr', youtube:'#' },
  { id:'07', x: 3900, y: 190,  size: 280, name:'白若潔', group:'事務組',     work:'B2',  instagram:'https://www.instagram.com/jennypai1210?igsh=MWthNTdoMGUxZzI1eA%3D%3D&utm_source=qr', youtube:'https://youtube.com/channel/UCZwq6OVj-VhtEXBkWI0q3Xw?si=iQtOMyQsMS4BjNQK' },
  { id:'08', x: 4580, y: 370,  size: 280, name:'楊昀臻', group:'活動組',     work:'B1',  instagram:'https://www.instagram.com/uc.artlab?igsh=MXA5OTgwcGJia2prZg%3D%3D&utm_source=qr', youtube:'#' },
  { id:'09', x: 5250, y: 215,  size: 280, name:'蔡佳蓁', group:'公關組',     work:'B1',  instagram:'https://www.instagram.com/jia.z047?igsh=cmhhNjN5a3F5cWNh&utm_source=qr', youtube:'#' },
  { id:'10', x: 5920, y: 360,  size: 280, name:'周玟妤', group:'周邊組',     work:'B3',  instagram:'https://www.instagram.com/__cwy.__?igsh=MXZuNzVtMGxsODByZQ%3D%3D&utm_source=qr', youtube:'#' },
  { id:'11', x: 6600, y: 200,  size: 280, name:'江敏豐', group:'視覺組',     work:'B8',  instagram:'https://www.instagram.com/j.minfeng/', youtube:'www.youtube.com/@electric_feng' },
  { id:'12', x: 7270, y: 340,  size: 280, name:'徐蕎安', group:'紀錄組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'13', x: 390,  y: 720,  size: 280, name:'趙育旋', group:'周邊組',     work:'A12', instagram:'https://www.instagram.com/nao_ii0?igsh=eDZ1MW8ya3hjeDg%3D&utm_source=qr', youtube:'#' },
  { id:'14', x: 1060, y: 870,  size: 280, name:'林當宏', group:'視覺組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'15', x: 560,  y: 2200, size: 280, name:'洪瀅媗', group:'公關組',     work:'A11', instagram:'https://www.instagram.com/h52ung?igsh=MWRlZ2ZvazVoa25jdQ%3D%3D&utm_source=qr', youtube:'https://youtube.com/@stringrayaa?si=A4JX0ECS7e-L0LCz' },
  { id:'16', x: 2400, y: 850,  size: 280, name:'陳采宜', group:'視覺組',     work:'#',   instagram:'https://www.instagram.com/yeeeeee.27?igsh=N2plOWg3Ym1kaWlp&utm_source=qr', youtube:'#' },
  { id:'17', x: 7090, y: 2200, size: 280, name:'危俊華', group:'技術統籌組', work:'#',   instagram:'#', youtube:'#' },
  { id:'18', x: 3740, y: 860,  size: 280, name:'楊怡珊', group:'公關組',     work:'B2',  instagram:'https://www.instagram.com/yillshan?igsh=bDNpaTk1emlteGhv&utm_source=qr', youtube:'#' },
  { id:'19', x: 4410, y: 720,  size: 280, name:'陳愛莉', group:'事務組',     work:'A5',  instagram:'https://www.instagram.com/im94xu4/?hl=zh-tw', youtube:'#' },
  { id:'20', x: 5080, y: 850,  size: 280, name:'林芯羽', group:'紀錄組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'21', x: 5750, y: 710,  size: 280, name:'楊凡力', group:'總召',       work:'B7',  instagram:'https://www.instagram.com/fanli.art/', youtube:'https://www.youtube.com/@fl.o24' },
  { id:'22', x: 6420, y: 860,  size: 280, name:'陳玟卉', group:'紀錄組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'23', x: 7090, y: 720,  size: 280, name:'賴昱安', group:'紀錄組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'24', x: 560,  y: 1300, size: 280, name:'陳郁晴', group:'紀錄組',     work:'B6',  instagram:'https://www.instagram.com/456_minnie_?igsh=bmhjb3puOWVucDdn', youtube:'#' },
  { id:'25', x: 1390, y: 1450, size: 280, name:'朱家慧', group:'紀錄組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'26', x: 2220, y: 1300, size: 280, name:'郭展良', group:'技術統籌組', work:'A2',  instagram:'https://www.instagram.com/o_0.3771?igsh=MWg5cnV6emllaHlyeQ%3D%3D&utm_source=qr', youtube:'https://www.youtube.com/@Leonkou' },
  { id:'27', x: 3050, y: 1440, size: 280, name:'盧紫歆', group:'周邊組',     work:'B3',  instagram:'#', youtube:'#' },
  { id:'28', x: 3880, y: 1290, size: 280, name:'李芷萱', group:'副召',       work:'B7',  instagram:'https://www.instagram.com/lzjrsyuan_0120?igsh=MXBxZ2k0a203eDVnZQ%3D%3D&utm_source=qr', youtube:'https://youtube.com/@jrsyuanlee3120?si=hWVnf7DNLjx-w3_3' },
  { id:'29', x: 4700, y: 1840, size: 350, name:'吳孟學', group:'網頁組',     work:'B4',  instagram:'#', youtube:'#' },
  { id:'30', x: 4730, y: 2300, size: 280, name:'胡詩敏', group:'網頁組',     work:'B4',  instagram:'#', youtube:'#' },
  { id:'31', x: 6360, y: 1440, size: 280, name:'許芷芸', group:'公關組',     work:'#',   instagram:'https://www.instagram.com/vrooci?igsh=YndpYW5pNG42ODdh&utm_source=qr', youtube:'#' },
  { id:'32', x: 7580, y: 1690, size: 400, name:'姜如暄', group:'網頁組',     work:'B4',  instagram:'https://www.instagram.com/koogeocimo/', youtube:'https://www.youtube.com/@Koogeocimo' },
  { id:'33', x: 980,  y: 1900, size: 280, name:'闕以恩', group:'活動組',     work:'B6',  instagram:'https://www.instagram.com/janet_d.j?igsh=NHphamJucWNnZzQz&utm_source=qr', youtube:'http://www.youtube.com/@kareru.3sai' },
  { id:'34', x: 2450, y: 2050, size: 280, name:'朱柏豪', group:'技術統籌組', work:'A1',  instagram:'https://www.instagram.com/marc_c__c?igsh=eHEyd3ZodTYyazl5&utm_source=qr', youtube:'https://vimeo.com/user192254939' },
  { id:'35', x: 3920, y: 1900, size: 280, name:'王詩瀅', group:'活動組',     work:'A9',  instagram:'https://www.instagram.com/see.eeeing?igsh=ZDd0Mjd4amE5aDky', youtube:'#' },
  { id:'36', x: 5790, y: 2440, size: 450, name:'黃懿文', group:'活動組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'37', x: 6600, y: 1890, size: 280, name:'魏惇儀', group:'紀錄組',     work:'#',   instagram:'#', youtube:'#' },
  { id:'38', x: 3600, y: 2600, size: 450, name:'廖恩鑫', group:'紀錄組',     work:'A7',  instagram:'https://www.instagram.com/mokatabako?igsh=dmFhYnhqNWV1Zm1y&utm_source=qr', youtube:'#' },
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

document.addEventListener('mousedown', e=>{
  drag=true; lmx=e.clientX; lmy=e.clientY; vx=vy=0;
  document.body.classList.add('dragging');
  cancelAnimationFrame(raf);
  document.getElementById('drag-hint').classList.add('hidden');
});
document.addEventListener('mousemove', e=>{
  if(!drag)return;
  vx=e.clientX-lmx; vy=e.clientY-lmy;
  camX-=vx; camY-=vy; lmx=e.clientX; lmy=e.clientY;
  applyCamera();
});
document.addEventListener('mouseup', ()=>{
  drag=false; document.body.classList.remove('dragging');
  (function coast(){
    vx*=0.89; vy*=0.89;
    if(Math.abs(vx)<0.35&&Math.abs(vy)<0.35)return;
    camX-=vx; camY-=vy; applyCamera();
    raf=requestAnimationFrame(coast);
  })();
});
document.addEventListener('touchstart',e=>{
  const t=e.touches[0]; drag=true; lmx=t.clientX; lmy=t.clientY; vx=vy=0;
  cancelAnimationFrame(raf);
  document.getElementById('drag-hint').classList.add('hidden');
},{passive:true});
document.addEventListener('touchmove',e=>{
  if(!drag)return;
  const t=e.touches[0]; vx=t.clientX-lmx; vy=t.clientY-lmy;
  camX-=vx; camY-=vy; lmx=t.clientX; lmy=t.clientY; applyCamera();
},{passive:true});
document.addEventListener('touchend',()=>{ drag=false; });
window.addEventListener('resize', applyCamera);

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