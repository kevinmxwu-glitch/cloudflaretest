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


//響應載入影片切換
var load = document.getElementById('loadVideo');
var source = document.createElement('source');
if (window.innerWidth > 768) {
  source.setAttribute('src', 'video/loading/loading2.mp4');
}
else {
  source.setAttribute('src', 'video/loading/loading.mp4');
  load.style.maxWidth = "100%";
}
source.setAttribute('type', 'video/mp4');
load.appendChild(source);
load.play();

//響應背景影片切換
var bg = document.getElementById('bgVideo');
var source = document.createElement('source');
if (window.innerWidth > 768) {
  source.setAttribute('src', 'video/start/start_desktop.mp4');
}
else {
  source.setAttribute('src', 'video/start/start_mobile.mp4');
  bg.style.maxWidth = "100%";
}
source.setAttribute('type', 'video/mp4');
bg.appendChild(source);
bg.play();


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