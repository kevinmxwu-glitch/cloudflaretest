const menuIcon = document.querySelector(".menu-icon");
const sideMenu = document.querySelector(".side-menu");
const overlay = document.querySelector(".overlay");
const demobox = document.getElementsByClassName("demo-box")[0];
var path = window.location.pathname;
var filename = path.substring(path.lastIndexOf('/') + 1);
var modifiedFile = filename.replace(".html", "");
document.getElementsByClassName("group")[0].innerHTML = modifiedFile;
var fetchsuccess = 0;
fetch("https://script.google.com/macros/s/AKfycby1E_A5sVq0UCVlnjtLyyklGE1lSr-V1OHcgpDfQfuLVBCnzDTs6oL1Re4d5GUJlANiiw/exec")
.then(res => res.json())
.then(data => {
  const wrk = document.getElementsByClassName("workImg")[0];
  const dotsbtn = document.getElementsByClassName("dots")[0];
  const gp = document.getElementsByClassName("group")[0].innerHTML;
  var num = 0;
  data.forEach(item => {
    if(item.group == gp)
    {
      checkTitle(item);
      checkType(item);
      num = checkPic(item.pic1, num);
      num = checkPic(item.pic2, num);
      num = checkPic(item.pic3, num);
      num = checkPic(item.pic4, num);
      num = checkVid(item.video, num);
      checkArtist(item);
      checkDesc(item);
      demobox.style.opacity = 1;
    }
  });
  if(num > 0) {
    const arwL = document.getElementsByClassName("arrowL")[0];
    const arwR = document.getElementsByClassName("arrowR")[0];
    arwL.setAttribute('class', 'prev');
    arwL.setAttribute('onclick', 'plusSlides(-1)');
    arwL.textContent = "<";
    arwR.setAttribute('class', 'next');
    arwR.setAttribute('onclick', 'plusSlides(1)');
    arwR.textContent = ">";
    if(fetchsuccess == 0) {
        fetchsuccess = 1;
        showSlides();
    }
  }
});

let slideIndex = 0;
let timer;
const prev = document.getElementsByClassName("arrowL")[0];
const next = document.getElementsByClassName("arrowR")[0];

function showSlides() {
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");
for (let i = 0; i < slides.length; i++) {
  slides[i].style.display = "none";
}
slideIndex++;
if (slideIndex >= slides.length) {
  slideIndex = slides.length;
  next.style.display = "none";
  prev.style.display = "block";

}
else if (slideIndex <= 1) {
  slideIndex = 1;
  next.style.display = "block";
  prev.style.display = "none";
}
else {
  next.style.display = "block";
  prev.style.display = "block";
}
if(slides.length <= 1) {
  next.style.display = "none";
  prev.style.display = "none";
}
for (let i = 0; i < dots.length; i++) {
  dots[i].classList.remove("active");
}
try{
slides[slideIndex-1].style.display = "block";
dots[slideIndex-1].classList.add("active");
}
catch{}
clearTimeout(timer);
timer = setTimeout(showSlides, 5000); // Change image every 3 seconds
}


function plusSlides(n) {
clearTimeout(timer);
slideIndex += n - 1;
showSlides();
}

function currentSlide(n) {
clearTimeout(timer);
slideIndex = n - 1;
showSlides();
}

showSlides(); // Initialize

function checkPic(itempic, num) {
  if(itempic){
    num++;
    const wrk = document.getElementsByClassName("workImg")[0];
    const divInside = document.createElement("div");
    const dotsbtn = document.getElementsByClassName("dots")[0];
    divInside.setAttribute('class', 'slide fade');
    const imgInside = document.createElement("img");
    imgInside.setAttribute('src', itempic);
    divInside.appendChild(imgInside);
    wrk.appendChild(divInside);
    const spanDot = document.createElement("span");
    spanDot.setAttribute('class', 'dot');
    spanDot.setAttribute('onclick', 'currentSlide(' + num + ')');
    dotsbtn.appendChild(spanDot);
    return num;
  }
  else{
    return num;
  }
}

function checkVid(itemvid, num) {
  if(itemvid){
    num++;
    const wrk = document.getElementsByClassName("workImg")[0];
    const divInside = document.createElement("div");
    const dotsbtn = document.getElementsByClassName("dots")[0];
    divInside.setAttribute('class', 'slide fade');
    const vidInside = document.createElement("iframe");
    vidInside.style.inlineSize = "100%";
    vidInside.setAttribute('src', itemvid);
    vidInside.setAttribute('title', "Youtube video player");
    vidInside.setAttribute('frameborder', "0");
    vidInside.setAttribute('allow', "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    vidInside.setAttribute('referrerpolicy', "strict-origin-when-cross-origin");
    vidInside.allowFullscreen = true;
    divInside.appendChild(vidInside);
    wrk.appendChild(divInside);
    const spanDot = document.createElement("span");
    spanDot.setAttribute('class', 'dot');
    spanDot.setAttribute('onclick', 'currentSlide(' + num + ')');
    dotsbtn.appendChild(spanDot);
    return num;
  }
  else{
    return num;
  }
}

function checkArtist(item) {
  const atst = document.getElementsByClassName("artist")[0];
  if(item.artist1) {
    atst.innerHTML = item.artist1;
  }
  if(item.artist2) {
    atst.innerHTML = atst.innerHTML + " " + item.artist2;
  }
  if(item.artist3) {
    atst.innerHTML = atst.innerHTML + " " + item.artist3;
  }
  if(item.artist4) {
    atst.innerHTML = atst.innerHTML + " " + item.artist4;
  }
}

function checkTitle(item) {
  const tt = document.getElementsByClassName("title")[0];
  const tpc = document.getElementsByClassName("topic")[0];
  if(item.title) {
    tt.innerHTML = item.title;
    tpc.innerHTML = item.title + " - 在那出現之前";
  }
}

function checkType(item) {
  const tp = document.getElementsByClassName("type")[0];
  if(item.type) {
    tp.innerHTML = item.type;
  }
}

function checkDesc(item) {
  const dsct = document.getElementsByClassName("content")[0];
  if(item.description) {
    dsct.innerHTML = item.description;
  }
}



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
  source.setAttribute('src', 'video/works/bg_desktop.mp4');
}
else {
  source.setAttribute('src', 'video/works/bg_mobile.mp4');
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