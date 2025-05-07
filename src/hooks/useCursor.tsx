import { QueryStatus } from '@reduxjs/toolkit/query';
import { useEffect, useRef } from 'react';

type CursorOptions = {
  linkHover?: boolean,
  hideCursor?: boolean,
  touchDevice?: boolean,
  enter?: (e: MouseEvent) => void;
  move?: (e: MouseEvent) => void;
  leave?: (e: MouseEvent) => void;
};

export const useCursor = (options: CursorOptions = {}) => {
  // 預設值
  const defaultOptions: Required<CursorOptions> = {
    linkHover: false,
    hideCursor: false,
    touchDevice: false,
    enter: () => {},
    move: () => {},
    leave: () => {},
  }

  const cursorsRef = useRef<NodeListOf<Element> | null>(null);
  const cursorAreasRef = useRef<NodeListOf<Element> | null>(null);
  const isTouchDevice = 'ontouchstart' in document.documentElement;
  const linkTags = 'a, button';
  const activeClass = 'is-active';
  const linkClass = 'is-link';

  const linkHover = options.linkHover ?? defaultOptions.linkHover;
  const hideCursor = options.hideCursor ?? defaultOptions.hideCursor;
  const touchDevice = options.touchDevice ?? defaultOptions.touchDevice;
  const enter = options.enter ?? defaultOptions.enter;
  const move = options.move ?? defaultOptions.move;
  const leave = options.leave ?? defaultOptions.leave;

  useEffect(() => {
    cursorsRef.current = document.querySelectorAll('[data-cursor]');

    const addEffect = (e: Event) => {
      const key = (e.currentTarget as HTMLElement).closest('[data-cursor-area]')?.dataset.cursorArea;
      cursorsRef.current.forEach((el) => {
        if(el.dataset.cursor === key) {
          el.classList.add(linkClass);
        }
      })
    }

    const removeEffect = (e: Evente) => {
      const key = (e.currentTarget as HTMLElement).closest('[data-cursor-area]')?.dataset.cursorArea;
      cursorsRef.current.forEach((el) => {
        if(el.dataset.cursor === key) {
          el.classList.add(linkClass);
        }
      })
    }

    const addLinkHoverEvent = (area) => {
      const links = area.querySelectorAll(linkTags);

      links.forEach((link) => {
        link.addEventListener('mouseenter', addEffect);
        link.addEventListener('mouseleave', removeEffect);
      })
    }

    const removeLinkHoverEvent = (area) => {
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
          const img = e.currentTarget.querySelector('[data-cursor-img]');
          if(img) {
            const src = img.dataset.cursorImg;
            const className = img.classList;
            el.innerHTML = `<img className="${className}" src="${src}" />`;

            const cursorImg = el.querySelector('img');
            cursorW = cursorImg.offsetWidth;
            cursorH = cursorImg.offsetHeight;
          } else {
            cursorW = (el as HTMLElement).offsetWidth;
            cursorH = (el as HTMLElement).offsetHeight;
          }
          Object.assign(el.style, {
            transform: `translate3d(${(e as MouseEvent).x - (cursorW / 2)}px, ${(e as MouseEvent).y - (cursorH / 2)}px, 0)`
          })
          el.classList.add(activeClass);
        }
      })

      if(hideCursor) {
        (e.currentTarget as HTMLElement).style.cursor = "none";
      }
      
      move(e as MouseEvent);
    }

    const leaveArea = (e: Event) => {
      const key = (e.currentTarget as HTMLElement).dataset.cursorArea;
      cursorsRef.current?.forEach((el) => {
        if((el as HTMLElement).dataset.cursor === key) {
          el.classList.remove(activeClass);
        }
      })
      leave(e as MouseEvent);
    }

    cursorsRef.current?.forEach((el) => {
      const key = (el as HTMLElement).dataset.cursor;
      cursorAreasRef.current = document.querySelectorAll(`[data-cursor-area="${key}"]`);

      cursorAreasRef.current?.forEach((area) => {
        area.addEventListener('mouseenter', enterArea as EventListener);
        area.addEventListener('mousemove', moveArea as EventListener);
        area.addEventListener('mouseleave', leaveArea as EventListener);

        // 如果有啟用 linkHover
        if(linkHover) {
          addLinkHoverEvent(area);
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
          // 如果有啟用 linkHover
          if(linkHover) {
            removeLinkHoverEvent(area);
          }
        })
      })
    }
  }, [enter, move, leave]);
}