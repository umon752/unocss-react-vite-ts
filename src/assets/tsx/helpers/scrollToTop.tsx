//----------------------------
// 滑動至頁面頂部
//----------------------------
const scrollToTop = () => {
  window.scroll({
    top: 1,
    behavior: 'smooth',
  });
}

export default scrollToTop;