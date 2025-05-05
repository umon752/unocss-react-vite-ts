import { useEffect, useRef } from 'react';

/**
 * useObserverFade Hook (進入元素可視範圍淡入淡出)
 * @param {String} selector - 要監控的元素選擇器
 * @param {Object} options - 動態設定
 */
export const useObserverFade = (selector = '[data-fade]', options = {}) => {
  const elementSet = useRef(new Set<HTMLDivElement>());
  const fadeElementsRef = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    const fadeInKeyframes = [{ opacity: 0 }, { opacity: 1 }];
    const fadeUpKeyframes = [{ opacity: 0, transform: 'translateY(20%)' }, { opacity: 1, transform: 'translateY(0)' }];
    const fadeTiming = { duration: 500, easing: 'ease', fill: 'both' };
    type FadeType = 'in' | 'up';
    const fadeType: Record<FadeType, Keyframe[]> = {
      in: fadeInKeyframes,
      up: fadeUpKeyframes,
    };

    const setFadeOptions = () => {
      fadeElementsRef.current = document.querySelectorAll(selector);

      fadeElementsRef.current.forEach((el) => {
        if (!elementSet.current.has(el)) {
          elementSet.current.add(el);
          const fade = (el as HTMLElement).dataset.fade || 'in';
          const once = (el as HTMLElement).dataset.fadeOnce 
            ? JSON.parse((el as HTMLElement).dataset.fadeOnce) 
            : true;
          const timing = { ...fadeTiming, ...options };

          observerFade(el, fade, once, timing);
        }
      });
    };

    const observerFade = (target: Element, fade: string, once: boolean, timing: object) => {
      const intersection = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const animation = entry.target.animate(fadeType[fade as FadeType], timing);
          
          entry.intersectionRatio > 0 
            ? animation 
            : animation.currentTime = 0;

          if (entry.intersectionRatio > 0 && once) {
            intersection.unobserve(entry.target);
          }
        });
      });

      intersection.observe(target);
    };

    setFadeOptions();

    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && (node as Element).matches(selector)) {
              setFadeOptions();
            }
          });
        }
      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(document.body, config);

    return () => {
      observer.disconnect();
    };
  }, [selector, options]);
};