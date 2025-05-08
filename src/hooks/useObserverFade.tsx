import { useEffect, useRef } from 'react';

type FadeType = 'in' | 'up';

type FadeOptions = {
  duration?: number;
  easing?: string;
  fill?: 'none' | 'forwards' | 'backwards' | 'both' | 'auto';
};

type FadeElement = HTMLElement & {
  dataset: {
    fade?: FadeType;
    fadeOnce?: string;
  };
};

/**
 * useObserverFade Hook (進入元素可視範圍淡入淡出)
 * @param selector - 要監控的元素選擇器
 * @param options - 動態設定
 */
export const useObserverFade = (
  selector = '[data-fade]',
  options: FadeOptions = {}
) => {
  const elementSet = useRef<Set<FadeElement>>(new Set());
  const fadeElementsRef = useRef<NodeListOf<FadeElement> | null>(null);

  useEffect(() => {
    const fadeInKeyframes: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];
    const fadeUpKeyframes: Keyframe[] = [
      { opacity: 0, transform: 'translateY(20%)' },
      { opacity: 1, transform: 'translateY(0)' }
    ];

    const fadeTiming: KeyframeAnimationOptions = {
      duration: 500,
      easing: 'ease',
      fill: 'both'
    };

    const fadeType: Record<FadeType, Keyframe[]> = {
      in: fadeInKeyframes,
      up: fadeUpKeyframes,
    };

    const setFadeOptions = () => {
      fadeElementsRef.current = document.querySelectorAll<FadeElement>(selector);

      fadeElementsRef.current.forEach((el) => {
        if (!elementSet.current.has(el)) {
          elementSet.current.add(el);
          const fade = el.dataset.fade || 'in';
          const once = el.dataset.fadeOnce 
            ? JSON.parse(el.dataset.fadeOnce) 
            : true;
          const timing = { ...fadeTiming, ...options };

          observerFade(el, fade, once, timing);
        }
      });
    };

    const observerFade = (
      target: FadeElement,
      fade: FadeType,
      once: boolean,
      timing: KeyframeAnimationOptions
    ) => {
      const intersection = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const animation = entry.target.animate(fadeType[fade], timing);
          
          if (entry.intersectionRatio > 0) {
            animation.play();
          } else {
            animation.currentTime = 0;
          }

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
            if (
              node.nodeType === Node.ELEMENT_NODE &&
              (node as Element).matches(selector)
            ) {
              setFadeOptions();
            }
          });
        }
      });
    });

    const config: MutationObserverInit = {
      childList: true,
      subtree: true,
    };

    observer.observe(document.body, config);

    return () => {
      observer.disconnect();
    };
  }, [selector, options]);
};