//----------------------------
// 判斷裝置
//----------------------------
const checkDevice = () => {
  const usrAgent = navigator.userAgent;
  const isTouchDevice = 'ontouchstart' in document.documentElement;
  
  if (isTouchDevice) {
    // 是觸控裝置
    document.body.classList.add('is-touch');

    // 判斷手機系統是 Android 還是 IOS
    if (usrAgent.match(/(iphone|ipad|ipod);?/i)) {
      // 是 IOS
    } else if (usrAgent.match(/android/i)) {
      // 是 Android
    } else {
      // 其他、電腦的瀏覽器
    }
  } else {
    // 不是觸控裝置
    document.body.classList.add('not-touch');
  }

  // 使用 matchMedia 方法檢測是否支援 hover 狀態
  // if (window.matchMedia('(hover: none)').matches) {
  //   // 不支援 hover 狀態
  // } else {
  //   // 支援 hover 狀態
  // }
}

// init
(function () {
  checkDevice();
})();