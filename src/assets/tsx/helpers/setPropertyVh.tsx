//----------------------------
// 計算手機版瀏覽器視窗高 100vh (不含下方工具列)
//----------------------------
let winW = window.innerWidth;

const setPropertyVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// init
(function () {
  setPropertyVh();
})();

// resize
window.addEventListener('resize', function () {
  if (window.innerWidth !== winW) {
    winW = window.innerWidth;
  }
  setPropertyVh();
});