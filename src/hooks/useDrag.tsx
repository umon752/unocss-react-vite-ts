export const useDrag = (target: React.RefObject<HTMLDivElement> | null, btns: React.RefObject<HTMLButtonElement[]> | null) => {
    let isMouseDown = false;
    let startPosX = 0;
    let targetScrollLeft = 0;
  
    const startDrag = (e: MouseEvent) => {
      isMouseDown = true;
      if (target?.current) {
        startPosX = e.pageX - target.current.offsetLeft;
        targetScrollLeft = target.current.scrollLeft;
      }
    }
  
    const stopDrag = () => {
      isMouseDown = false;
    }
  
    const updateBtnPointerEvents = (value: string) => {
      if (btns?.current) {
        btns.current.forEach((btn) => {
          btn.style.pointerEvents = value;
        });
      }
    }
    const move = (e: MouseEvent) => {
      e.preventDefault();
      if (!isMouseDown) {
        updateBtnPointerEvents('auto');
        return;
      }
      if (target?.current) {
        const x = e.pageX - target.current.offsetLeft;
        const scroll = x - startPosX;
        target.current.scrollLeft = targetScrollLeft - scroll;
      }
      updateBtnPointerEvents('none');
    }

    if (target?.current) {
      target.current.addEventListener('mousemove', move);
      target.current.addEventListener('mousedown', startDrag);
      target.current.addEventListener('mouseup', stopDrag);
      target.current.addEventListener('mouseleave', stopDrag);
    }

    return () => {
      if (target?.current) {
        target.current.removeEventListener('mousemove', move);
        target.current.removeEventListener('mousedown', startDrag);
        target.current.removeEventListener('mouseup', stopDrag);
        target.current.removeEventListener('mouseleave', stopDrag);
      }
    }
}