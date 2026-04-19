const menuIcon = document.querySelector(".menu-icon");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");

// 🖥️ 電腦版：滑入 icon 開啟
menuIcon.addEventListener("mouseenter", () => {
  if (window.innerWidth > 768) {
    sideMenu.classList.add("active");
    overlay.classList.add("active");
  }
});

// 🖥️ 滑出 menu → 關閉
sideMenu.addEventListener("mouseleave", () => {
  if (window.innerWidth > 768) {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  }
});

// 🖥️ 滑出 icon 也關閉（避免卡住）
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


// 📱 手機版：點擊開關
menuIcon.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    sideMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  }
});

// 點遮罩 → 關閉
overlay.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
});

// 點選單 → 關閉
document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", () => {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
});

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
    load.style.maxWidth = "100%";
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
      : 'video/start/start_mobile2.mp4';

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