import { useEffect, useRef } from 'react';

type DragState = {
  isMouseDown: boolean;
  startPosX: number;
  targetScrollLeft: number;
};

export const useDrag = (
  target: React.RefObject<HTMLDivElement> | null,
  btns: React.RefObject<HTMLButtonElement[]> | null
) => {
  const dragState = useRef<DragState>({
    isMouseDown: false,
    startPosX: 0,
    targetScrollLeft: 0,
  });

  const updateBtnPointerEvents = (value: 'auto' | 'none'): void => {
    if (!btns?.current) return;

    btns.current.forEach((btn) => {
      if (!btn) return;
      btn.style.pointerEvents = value;
    });
  };

  const startDrag = (e: MouseEvent): void => {
    if (!target?.current) return;

    dragState.current = {
      isMouseDown: true,
      startPosX: e.pageX - target.current.offsetLeft,
      targetScrollLeft: target.current.scrollLeft,
    };
  };

  const stopDrag = (): void => {
    dragState.current.isMouseDown = false;
  };

  const move = (e: MouseEvent): void => {
    e.preventDefault();

    if (!dragState.current.isMouseDown) {
      updateBtnPointerEvents('auto');
      return;
    }

    if (!target?.current) return;

    const x = e.pageX - target.current.offsetLeft;
    const scroll = x - dragState.current.startPosX;
    target.current.scrollLeft = dragState.current.targetScrollLeft - scroll;
    updateBtnPointerEvents('none');
  };

  useEffect(() => {
    const currentTarget = target?.current;
    if (!currentTarget) return;

    // 添加事件監聽器
    currentTarget.addEventListener('mousemove', move);
    currentTarget.addEventListener('mousedown', startDrag);
    currentTarget.addEventListener('mouseup', stopDrag);
    currentTarget.addEventListener('mouseleave', stopDrag);

    // 清理函數
    return () => {
      currentTarget.removeEventListener('mousemove', move);
      currentTarget.removeEventListener('mousedown', startDrag);
      currentTarget.removeEventListener('mouseup', stopDrag);
      currentTarget.removeEventListener('mouseleave', stopDrag);
    };
  }, [target]);
};
