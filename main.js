const menuIcon = document.querySelector(".menu-icon");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");
history.scrollRestoration = 'manual';//重整回到最上面
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

window.addEventListener("scroll", () => {

  // 當滑到第3屏（visit區）
  if (window.scrollY > window.innerHeight * 2) {
    bgA.classList.add("hide"); // 顯示B
  } else {
    bgA.classList.remove("hide"); // 顯示A
  }
});/*window.addEventListener("load", () => {
  if (window.location.hash) {
    const id = window.location.hash.replace("#", "");
    const target = document.getElementById(id);

    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }
});*/