const menuIcon = document.querySelector(".menu-icon");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");
const gpInd = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12"];
const gpTem = ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"];
var fetchsuccess = 0;
fetch("https://script.google.com/macros/s/AKfycby1E_A5sVq0UCVlnjtLyyklGE1lSr-V1OHcgpDfQfuLVBCnzDTs6oL1Re4d5GUJlANiiw/exec")
.then(res => res.json())
.then(data => {
  var num = 0;
  data.forEach(item => {
    const Ind = document.getElementsByClassName("individual")[0];
    const Tem = document.getElementsByClassName("team")[0];
    if(item.group){
      const aLink = document.createElement("a");
      const wrkContain = document.createElement("div");
      const ulInside = document.createElement("ul");
      checkTitle(item, ulInside);
      checkCover(item, ulInside);
      checkArtist(item, ulInside);
      wrkContain.setAttribute('class', 'work-container');
      wrkContain.appendChild(ulInside);
      const linkContent = "https://beforezero-nma.com/" + item.group;
      aLink.setAttribute('href', linkContent);
      aLink.appendChild(wrkContain);
      for(let i = 0; i < gpInd.length; i++) {
        if(item.group == gpInd[i]){
          Ind.appendChild(aLink);
        }
        if(i < gpTem.length && item.group == gpTem[i]){
          Tem.appendChild(aLink);
        }
      }
    }
  });
});

/* ======================
   選單
====================== */


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

document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", () => {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
});
function checkTitle(item, ul) {
  const tt = document.createElement("li");
  tt.setAttribute('class', 'work-title');
  if(item.title) {
    tt.innerHTML = item.title;
  }
  ul.appendChild(tt);
}

function checkCover(item, ul) {
  const cov = document.createElement("div");
  cov.setAttribute('class', 'work-cover');
  if(item.cover) {
    const imgInside = document.createElement("img");
    imgInside.style.inlineSize = "100%";
    imgInside.setAttribute('src', item.cover);
    cov.appendChild(imgInside);
  }
  ul.appendChild(cov);
}

function checkArtist(item, ul) {
  const atst = document.createElement("li");
  atst.setAttribute('class', 'work-artist');
  if(item.artist1) {
    atst.innerHTML = item.artist1;
  }
  if(item.artist2) {
    atst.innerHTML = atst.innerHTML + "　" + item.artist2;
  }
  if(item.artist3) {
    atst.innerHTML = atst.innerHTML + "　" + item.artist3;
  }
  if(item.artist4) {
    atst.innerHTML = atst.innerHTML + "　" + item.artist4;
  }
  ul.appendChild(atst);
}


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
      ? 'video/works/bg_desktop.mp4'
      : 'video/works/bg_mobile.mp4';

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