import { useEffect, useRef } from 'react';

type CursorOptions = {
  enableLinkHover?: boolean;
  enableHideCursor?: boolean;
  enableTouch?: boolean;
  activeClass?: string[];
  linkClass?: string[];
  enter?: (e: MouseEvent) => void;
  move?: (e: MouseEvent, cursor: Element) => void;
  leave?: (e: MouseEvent, cursor: Element) => void;
};

export const useCursor = (options: CursorOptions = {}) => {
  // 預設值
  const defaultOptions: Required<CursorOptions> = {
    enableLinkHover: false,
    activeClass: [],
    linkClass: [],
    enableHideCursor: false,
    enableTouch: false,
    enter: () => {},
    move: () => {},
    leave: () => {},
  };

  const cursorsRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const cursorAreasRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const currentCursor = useRef<HTMLElement | null>(null);
  const isTouchDevice = useRef('ontouchstart' in document.documentElement);
  const linkTags = 'a, button';

  const enableLinkHover =
    options.enableLinkHover ?? defaultOptions.enableLinkHover;
  const activeClass = options.activeClass ?? defaultOptions.activeClass;
  const linkClass = options.linkClass ?? defaultOptions.linkClass;
  const enableHideCursor =
    options.enableHideCursor ?? defaultOptions.enableHideCursor;
  const enableTouch = options.enableTouch ?? defaultOptions.enableTouch;
  const enter = options.enter ?? defaultOptions.enter;
  const move = options.move ?? defaultOptions.move;
  const leave = options.leave ?? defaultOptions.leave;

  useEffect(() => {
    cursorsRef.current =
      document.querySelectorAll<HTMLElement>('[data-cursor]');
    const addEffect = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const area = target.closest<HTMLElement>('[data-cursor-area]');
      const key = area?.dataset.cursorArea;

      if (!cursorsRef.current || !key) return;

      cursorsRef.current.forEach((el) => {
        if (el.dataset.cursor === key) {
          el.classList.add(...linkClass);
        }
      });
    };

    const removeEffect = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const area = target.closest<HTMLElement>('[data-cursor-area]');
      const key = area?.dataset.cursorArea;

      if (!cursorsRef.current || !key) return;

      cursorsRef.current.forEach((el) => {
        if (el.dataset.cursor === key) {
          el.classList.remove(...linkClass);
        }
      });
    };

    const addLinkHoverEvent = (area: HTMLElement) => {
      const links = area.querySelectorAll<HTMLElement>(linkTags);
      links.forEach((link) => {
        link.addEventListener('mouseenter', addEffect);
        link.addEventListener('mouseleave', removeEffect);
      });
    };

    const removeLinkHoverEvent = (area: HTMLElement) => {
      const links = area.querySelectorAll<HTMLElement>(linkTags);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', addEffect);
        link.removeEventListener('mouseleave', removeEffect);
      });
    };

    const enterArea = (e: Event) => {
      enter(e as MouseEvent);
    };

    const moveArea = (e: Event) => {
      e.stopPropagation();
      const target = e.currentTarget as HTMLElement;
      const key = target.dataset.cursorArea;

      if (!cursorsRef.current || !key) return;

      cursorsRef.current.forEach((el) => {
        if (el.dataset.cursor === key) {
          let cursorW = 0;
          let cursorH = 0;

          // 如果有設定 data-cursor-img
          const img = target.querySelector<HTMLElement>('[data-cursor-img]');
          if (img) {
            const cursorImg = el.querySelector('img');
            if (cursorImg) {
              cursorW = cursorImg.offsetWidth;
              cursorH = cursorImg.offsetHeight;
            } else {
              const src = img.dataset.cursorImg;
              const className = img.classList;
              el.innerHTML = `<img class="${className}" src="${src}" />`;
            }
          } else {
            cursorW = el.offsetWidth;
            cursorH = el.offsetHeight;
          }
          Object.assign(el.style, {
            transform: `translate3d(${(e as MouseEvent).x - cursorW / 2}px, ${(e as MouseEvent).y - cursorH / 2}px, 0)`,
          });
          el.classList.add(...activeClass);
          currentCursor.current = el;
        }
      });

      if (enableHideCursor) {
        target.style.cursor = 'none';
      }

      move(e as MouseEvent, currentCursor.current as Element);
    };

    const leaveArea = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const key = target.dataset.cursorArea;

      if (!cursorsRef.current || !key) return;

      cursorsRef.current.forEach((el) => {
        if (el.dataset.cursor === key) {
          el.classList.remove(...activeClass);
          currentCursor.current = el;
        }
      });

      leave(e as MouseEvent, currentCursor.current as Element);
    };

    const setupEventListeners = () => {
      if (!cursorsRef.current) return;

      cursorsRef.current.forEach((el) => {
        // 在觸碰裝置不啟用效果
        if (isTouchDevice.current && !enableTouch) return;

        const key = el.dataset.cursor;
        if (!key) return;

        cursorAreasRef.current = document.querySelectorAll<HTMLElement>(
          `[data-cursor-area="${key}"]`
        );

        cursorAreasRef.current?.forEach((area) => {
          area.addEventListener('mouseenter', enterArea);
          area.addEventListener('mousemove', moveArea);
          area.addEventListener('mouseleave', leaveArea);

          // 如果有啟用 enableLinkHover
          if (enableLinkHover) {
            addLinkHoverEvent(area);
          }
        });
      });
    };

    const cleanupEventListeners = () => {
      if (!cursorsRef.current) return;

      cursorsRef.current.forEach((el) => {
        const key = el.dataset.cursor;
        if (!key) return;
        cursorAreasRef.current = document.querySelectorAll<HTMLElement>(
          `[data-cursor-area="${key}"]`
        );
        cursorAreasRef.current?.forEach((area) => {
          area.removeEventListener('mouseenter', enterArea);
          area.removeEventListener('mousemove', moveArea);
          area.removeEventListener('mouseleave', leaveArea);
          // 如果有啟用 enableLinkHover
          if (enableLinkHover) {
            removeLinkHoverEvent(area);
          }
        });
      });
    };

    setupEventListeners();
    return cleanupEventListeners;
  }, []);
};
