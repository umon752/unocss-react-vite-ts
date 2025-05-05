import { useCallback } from 'react';

//----------------------------
// 社群分享
//----------------------------
export const useShareSocial = () => {
  const shareSocial = useCallback((type = '') => {
    const shareUrl = window.location.href;
    let socialUrl = '';
    
    switch (type) {
      case 'fb':
        socialUrl = 'https://www.facebook.com/sharer/sharer.php?u=';
        break;
      case 'line':
        socialUrl = 'https://social-plugins.line.me/lineit/share?url=';
        break;
      case 'x':
        socialUrl = 'https://twitter.com/intent/tweet?url=';
        break;
      default:
        break;
    }
    window.open(`${socialUrl}${shareUrl}`);
  }, []);

  return shareSocial;
};