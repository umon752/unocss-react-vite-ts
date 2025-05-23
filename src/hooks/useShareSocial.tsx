import { useCallback } from 'react';

type SocialType = 'fb' | 'line' | 'x';

type ShareOptions = {
  url?: string;
  title?: string;
  text?: string;
};

const SOCIAL_SHARE_URLS: Record<SocialType, string> = {
  fb: 'https://www.facebook.com/sharer/sharer.php?u=',
  line: 'https://social-plugins.line.me/lineit/share?url=',
  x: 'https://twitter.com/intent/tweet?url=',
};

/**
 * 社群分享 Hook
 * @returns 返回一個可以分享到社交媒體的函數
 */
export const useShareSocial = () => {
  const shareSocial = useCallback(
    (type: SocialType, options: ShareOptions = {}) => {
      try {
        const shareUrl = options.url || window.location.href;
        const socialUrl = SOCIAL_SHARE_URLS[type];

        if (!socialUrl) {
          console.warn('不支持的社交媒體類型:', type);
          return;
        }

        // 構建分享 URL
        let finalUrl = `${socialUrl}${encodeURIComponent(shareUrl)}`;

        // 添加標題和文本（如果有的話）
        if (options.title) {
          finalUrl += `&title=${encodeURIComponent(options.title)}`;
        }
        if (options.text) {
          finalUrl += `&text=${encodeURIComponent(options.text)}`;
        }

        window.open(finalUrl, '_blank');
      } catch (error) {
        console.error('分享失敗:', error);
      }
    },
    []
  );

  return shareSocial;
};
