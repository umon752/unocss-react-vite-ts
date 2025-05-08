import { useCallback } from 'react';

type ScrollOptions = {
  top?: number;
  behavior?: ScrollBehavior;
};

/**
 * 滑動至頁面頂部的 Hook
 * @param defaultTop - 默認滾動位置，默認為 0
 * @returns 返回一個可以滾動到指定位置的函數
 */
export const useScrollToTop = (defaultTop = 0) => {
  const scrollToTop = useCallback((options: ScrollOptions = {}) => {
    try {
      window.scroll({
        top: options.top ?? defaultTop,
        behavior: options.behavior ?? 'smooth',
      });
    } catch (error) {
      console.error('滾動失敗:', error);
      // 如果平滑滾動失敗，嘗試使用傳統方式
      window.scrollTo(0, options.top ?? defaultTop);
    }
  }, [defaultTop]);

  return scrollToTop;
};