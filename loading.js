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

//載入
var loader = document.getElementsByClassName("loaderPC");

function fadeOut() {
  if (load.style.opacity  > 0) {
    setTimeout(function() {
      load.style.opacity  = load.style.opacity - 0.1;
      fadeOut()
    }, 23)
  }
};
window.addEventListener("load", fadeOut);