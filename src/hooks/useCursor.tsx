import { QueryStatus } from '@reduxjs/toolkit/query';
import { useEffect, useRef } from 'react';

type CursorOptions = {
  enableLinkHover?: boolean,
  enableHideCursor?: boolean,
  enableTouch?: boolean,
  activeClass?: string[],
  linkClass?: string[],
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
  }

  const cursorsRef = useRef<NodeListOf<Element> | null>(null);
  const cursorAreasRef = useRef<NodeListOf<Element> | null>(null);
  const currentCursor = useRef<Element | null>(null);
  const isTouchDevice = 'ontouchstart' in document.documentElement;
  const linkTags = 'a, button';

  const enableLinkHover = options.enableLinkHover ?? defaultOptions.enableLinkHover;
  const activeClass = options.activeClass ?? defaultOptions.activeClass;
  const linkClass = options.linkClass ?? defaultOptions.linkClass;
  const enableHideCursor = options.enableHideCursor ?? defaultOptions.enableHideCursor;
  const enableTouch = options.enableTouch ?? defaultOptions.enableTouch;
  const enter = options.enter ?? defaultOptions.enter;
  const move = options.move ?? defaultOptions.move;
  const leave = options.leave ?? defaultOptions.leave;

  useEffect(() => {
    cursorsRef.current = document.querySelectorAll('[data-cursor]');

    const addEffect = (e: Event) => {
      const key = (e.currentTarget as HTMLElement).closest('[data-cursor-area]')?.dataset.cursorArea;
      cursorsRef.current.forEach((el) => {
        if(el.dataset.cursor === key) {
          el.classList.add(...linkClass);
        }
      })
    }

    const removeEffect = (e: Event) => {
      const key = (e.currentTarget as HTMLElement).closest('[data-cursor-area]')?.dataset.cursorArea;
      cursorsRef.current.forEach((el) => {
        if(el.dataset.cursor === key) {
          el.classList.remove(...linkClass);
        }
      })
    }

    const addenableLinkHoverEvent = (area: Element) => {
      const links = area.querySelectorAll(linkTags);

      links.forEach((link) => {
        link.addEventListener('mouseenter', addEffect);
        link.addEventListener('mouseleave', removeEffect);
      })
    }

    const removeenableLinkHoverEvent = (area: Element) => {
      const links = area.querySelectorAll(linkTags);

      links.forEach((link) => {
        link.removeEventListener('mouseenter', addEffect);
        link.removeEventListener('mouseleave', removeEffect);
      })
    }

    const enterArea = (e: Event) => {
      enter(e as MouseEvent);
    }

    const moveArea = (e: Event) => {
      e.stopPropagation();
      const key = (e.currentTarget as HTMLElement).dataset.cursorArea;
      
      cursorsRef.current?.forEach((el) => {
        if((el as HTMLElement).dataset.cursor === key) {
          let cursorW = 0;
          let cursorH = 0;

          // 如果有設定 data-cursor-img
          const img = (e.currentTarget as HTMLElement).querySelector('[data-cursor-img]');
          if(img) {
            const cursorImg = el.querySelector('img');
            if(!cursorImg) {
              const src = (img as HTMLElement).dataset.cursorImg;
              const className = img.classList;
              el.innerHTML = `<img class="${className}" src="${src}" />`;
            } else {
              cursorW = cursorImg.offsetWidth;
              cursorH = cursorImg.offsetHeight;
            }
          } else {
            cursorW = (el as HTMLElement).offsetWidth;
            cursorH = (el as HTMLElement).offsetHeight;
          }
          Object.assign(el.style, {
            transform: `translate3d(${(e as MouseEvent).x - (cursorW / 2)}px, ${(e as MouseEvent).y - (cursorH / 2)}px, 0)`
          })
          el.classList.add(...activeClass);
          currentCursor.current = el;
        }
      })

      if(enableHideCursor) {
        (e.currentTarget as HTMLElement).style.cursor = "none";
      }
      
      move(e as MouseEvent, currentCursor.current as Element);
    }

    const leaveArea = (e: Event) => {
      const key = (e.currentTarget as HTMLElement).dataset.cursorArea;
      cursorsRef.current?.forEach((el) => {
        if((el as HTMLElement).dataset.cursor === key) {
          el.classList.remove(...activeClass);
          currentCursor.current = el;
        }
      })
      leave(e as MouseEvent, currentCursor.current as Element);
    }

    cursorsRef.current?.forEach((el) => {
      // 在觸碰裝置不啟用效果
      if(isTouchDevice && !enableTouch) return;
      const key = (el as HTMLElement).dataset.cursor;
      cursorAreasRef.current = document.querySelectorAll(`[data-cursor-area="${key}"]`);

      cursorAreasRef.current?.forEach((area) => {
        area.addEventListener('mouseenter', enterArea as EventListener);
        area.addEventListener('mousemove', moveArea as EventListener);
        area.addEventListener('mouseleave', leaveArea as EventListener);

        // 如果有啟用 enableLinkHover
        if(enableLinkHover) {
          addenableLinkHoverEvent(area);
        }
      })
    })

    return () => {
      cursorsRef.current?.forEach((el) => {
        const key = (el as HTMLElement).dataset.cursor;
        cursorAreasRef.current = document.querySelectorAll(`[data-cursor-area="${key}"]`);
  
        cursorAreasRef.current?.forEach((area) => {
          area.removeEventListener('mouseenter', enterArea as EventListener);
          area.removeEventListener('mousemove', moveArea as EventListener);
          area.removeEventListener('mouseleave', leaveArea as EventListener);
          // 如果有啟用 enableLinkHover
          if(enableLinkHover) {
            removeenableLinkHoverEvent(area);
          }
        })
      })
    }
  }, [enter, move, leave, enableLinkHover, activeClass, linkClass, enableHideCursor]);
}