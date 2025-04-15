//----------------------------
// 判斷瀏覽器
//----------------------------
const checkBrowser = () => {
  const usrAgent = navigator.userAgent.toLowerCase();
  let usrBrowser = '';

  if (usrAgent.includes('firefox')) {
    usrBrowser = 'firefox';
  } else if (usrAgent.includes('opera')) {
    usrBrowser = 'opera';
  } else if (usrAgent.includes('trident')) {
    if (usrAgent.includes('msie')) {
      usrBrowser = 'ie';
    } else {
      usrBrowser = 'ie11';
    }
  } else if (usrAgent.includes('edge')) {
    usrBrowser = 'edge';
  } else if (usrAgent.includes('chrome')) {
    usrBrowser = 'chrome';
  } else if (usrAgent.includes('safari')) {
    usrBrowser = 'safari';
  } else {
    usrBrowser = 'unknown';
  }

  document.body.classList.add(usrBrowser);
}

// init
(function () {
  checkBrowser();
})();