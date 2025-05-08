import { useEffect, useRef } from 'react';

type MarqueeOptions = {
  speed?: number;
  pauseOnHover?: boolean;
  enableDrag?: boolean;
  activeClass?: string;
  reverseDirection?: boolean;
  init?: () => void;
  update?: () => void;
};

// type CounterTextItem = {
//   timerId: number | null;
//   durationTimestamp: number | null;
//   orgText: string;
//   randomText: string | null;
// };

type MarqueeMethods = {
  stop: () => () => void;
  start: () => void;
  refresh: () => void;
  prev: () => void;
  next: () => () => void;
};

type marqueeState = {
  gap: number;
  marqueeAnimationFrameId: number | null;
  childPercentW: number;
  childTotalW: number;
  cloneChildTotalW: number;
  childHtml: string;
  childsArray: string[];
  direction: string;
  lastFrameTime: number;
  frameInterval: number;
  isMouseDown: boolean;
  startDragX: number;
  isClick: boolean;
  isReverseDirection: boolean;
  activeIndex: number;
};

export const useMarquee = (options: MarqueeOptions = {}): MarqueeMethods => {
  // 預設值
  const defaultOptions: Required<MarqueeOptions> = {
    speed: 1,
    pauseOnHover: false,
    enableDrag: false,
    activeClass: '',
    reverseDirection: false,
    init: () => {},
    update: () => {},
  }

  const parentRef = useRef<HTMLElement | null>(null);
  const childsRef = useRef<NodeList<HTMLElement> | null>(null);
  const cloneChildsRef = useRef<NodeList<HTMLElement> | null>(null);
  const marqueeStatesRef = useRef<Map<HTMLElement, marqueeState>>(new Map());

  const getMarqueeState = (el: HTMLElement): marqueeState => {
    if (!marqueeStatesRef.current.has(el)) {
      marqueeStatesRef.current.set(el, {
        gap: 0,
        marqueeAnimationFrameId: null,
        childPercentW: 100,
        childTotalW: 0,
        cloneChildTotalW: 0,
        childHtml: '',
        childsArray: [],
        direction: 'left',
        lastFrameTime: 0,
        frameInterval: 1000 / 60,
        isMouseDown: false,
        startDragX: 0,
        isClick: false,
        isReverseDirection: false,
        activeIndex: 0,
      });
    }
    return marqueeStatesRef.current.get(el)!;
  };

  useEffect(() => {
    if (options.selector) {
      countersRef.current = document.querySelectorAll<HTMLElement>(options.selector);
      if (countersRef.current) {
        countersRef.current.forEach((el) => {
          const state = getMarqueeState(el);
          el.textContent = state.startNum.toString();
        });
      }
    }
  }, [options.selector]);

  return {
    stop,
    start,
    refresh,
    prev,
    next,
  };
};