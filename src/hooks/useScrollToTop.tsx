import { useCallback } from 'react';

//----------------------------
// 滑動至頁面頂部的 Hook
//----------------------------
export const useScrollToTop = () => {
  const scrollToTop = useCallback(( top = 0 ) => {
    window.scroll({
      top, // 將 top 設為 0 以確保滑動至頁面頂部
      behavior: 'smooth',
    });
  }, []);

  return scrollToTop;
};