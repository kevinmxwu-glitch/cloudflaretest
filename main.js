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
  "image/shop/card1.png"
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