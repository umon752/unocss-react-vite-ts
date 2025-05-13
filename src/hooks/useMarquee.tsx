type MarqueeOptions = {
  element: HTMLElement | null;
  speed?: number;
  enableHovePause?: boolean;
  enableDrag?: boolean;
  activeClass?: string[];
  reverseDirection?: boolean;
};

type MarqueeMethods = {
  initial: () => void;
  unmount: () => void;
  stop: () => void;
  start: () => void;
  refresh: () => void;
  prev: () => void;
  next: () => void;
};

type ChildObject = {
  position: number;
  maxLeftPosition: number;
  maxRightPosition: number;
  activePosition: number;
  isRightOut: boolean;
};

type MarqueeState = {
  cloneChild: HTMLCollection | null;
  gap: number;
  marqueeAnimationFrameId: number | null;
  childPercentW: number;
  childTotalW: number;
  cloneChildTotalW: number;
  childHtml: string;
  childArray: ChildObject[];
  direction: string;
  lastFrameTime: number;
  frameInterval: number;
  isMouseDown: boolean;
  startDragX: number;
  isClick: boolean;
  isReverseDirection: boolean;
  activeIndex: number;
};

export const useMarquee = (options: MarqueeOptions): MarqueeMethods => {
  // 預設值
  const defaultOptions: Required<MarqueeOptions> = {
    element: null,
    speed: 1,
    enableHovePause: false,
    enableDrag: false,
    activeClass: [],
    reverseDirection: false,
  }

  const parent = options.element ?? defaultOptions.element;
  const speed = options.speed ?? defaultOptions.speed;
  const enableHovePause = options.enableHovePause ?? defaultOptions.enableHovePause;
  const enableDrag = options.enableDrag ?? defaultOptions.enableDrag;
  const activeClass = options.activeClass ?? defaultOptions.activeClass;
  const reverseDirection = options.reverseDirection ?? defaultOptions.reverseDirection;

  const marqueeStates: MarqueeState = {
    cloneChild: null,
    gap: 0,
    marqueeAnimationFrameId: null,
    childPercentW: 100,
    childTotalW: 0,
    cloneChildTotalW: 0,
    childHtml: '',
    childArray: [],
    direction: 'left',
    lastFrameTime: 0,
    frameInterval: 1000 / 60,
    isMouseDown: false,
    startDragX: 0,
    isClick: false,
    isReverseDirection: false,
    activeIndex: 0,
  }

  const setDirection = (): void => {
    if(reverseDirection) {
      marqueeStates.direction = 'right';
      marqueeStates.isReverseDirection = true;
    } else {
      marqueeStates.direction = 'left';
    }
  }

  const addCloneChild = (): void => {
    const child = parent?.children;
    if(parent && child) {
      const gapStyle = parseInt(window.getComputedStyle(parent).getPropertyValue('gap'));
      marqueeStates.gap = gapStyle ? gapStyle : 0;
      const childLength = child.length;
  
      [...child].forEach((child) => {
        marqueeStates.childTotalW += (child as HTMLElement).offsetWidth;
      });
      marqueeStates.childTotalW += marqueeStates.gap * childLength;
    
      const winW = window.innerWidth;
      // 計算填滿螢幕寬度所需的複製次數
      const cloneTimes = Math.ceil(winW / marqueeStates.childTotalW);
      marqueeStates.childHtml = parent.innerHTML;
      const afterContent = marqueeStates.childHtml.repeat(cloneTimes);
      // 複製到元素內的子元素後面
      parent.insertAdjacentHTML('beforeend', afterContent);
      marqueeStates.cloneChild = parent.children;
      [...marqueeStates.cloneChild].forEach((child, i) => {
        // 預設第一個子元素 active
        if(activeClass.length !== 0) {
          if(i === 0) {
            const childItem = child.children[0];
            childItem.classList.add(...activeClass);
          };
        }
        marqueeStates.cloneChildTotalW += (child as HTMLElement).offsetWidth;
      });
      marqueeStates.cloneChildTotalW += marqueeStates.gap * childLength;
  
      marqueeStates.childArray = [...marqueeStates.cloneChild].map(() => {
        return {
          position: 0,
          maxLeftPosition: 0,
          maxRightPosition: 0,
          activePosition: 0,
          isRightOut: false,
        }
      })
    }
  }

  const clearCloneChild = (): void => {
    if(!parent) return;
    parent.innerHTML = marqueeStates.childHtml;
  }

  const start = (): void => {
    setDirection();
    const startMarquee = () => {
      handlePosition(speed);
      marqueeStates.marqueeAnimationFrameId = requestAnimationFrame(startMarquee);
    }

    // 計算幀間隔
    if (!marqueeStates.lastFrameTime) marqueeStates.lastFrameTime = performance.now();
    const deltaTime = performance.now() - marqueeStates.lastFrameTime;

    // 如果距離上一幀的時間小於目標幀間隔，則跳過這一幀
    if (deltaTime < marqueeStates.frameInterval) {
      marqueeStates.marqueeAnimationFrameId = requestAnimationFrame(startMarquee);
      return;
    }

    // 更新上一幀時間
    marqueeStates.lastFrameTime = performance.now();
    startMarquee();
  }

  const stop = (): void => {
    if(marqueeStates.marqueeAnimationFrameId === null) return;
    console.log('stop');
    
    cancelAnimationFrame(marqueeStates.marqueeAnimationFrameId);
    marqueeStates.marqueeAnimationFrameId = null;
  }

  const handleDirectionChange = (direction: string): void => {
    stop();
    marqueeStates.isClick = true;
    marqueeStates.direction = direction;
    handleTransition();
  }

  const prev = (): void => {
    if(marqueeStates.isClick) return;
    handleDirectionChange(reverseDirection ? 'left' : 'right');
  }

  const next = (): void => {
    if(marqueeStates.isClick) return;
    handleDirectionChange(reverseDirection ? 'right' : 'left');
  }

  const refresh = (): void => {
    stop();
    clearCloneChild();
    addCloneChild();
    start();
  }

  const changeActive = (index: number): void => {
    if(!activeClass || !marqueeStates.cloneChild) return;
    [...marqueeStates.cloneChild].forEach((child) => {
      const childItem = child.children[0];
      childItem.classList.remove(...activeClass);
    })
    if(index === (marqueeStates.cloneChild.length - 1)) index = -1;
    const childItem = marqueeStates.cloneChild[index + 1].children[0];
    childItem.classList.add(...activeClass);
    marqueeStates.activeIndex = index + 1;
  }

  const handlePosition = (moveValue: number): void => {
    if(!marqueeStates.cloneChild || marqueeStates.childArray.length === 0) return;
    
    [...marqueeStates.cloneChild].forEach((child, i) => {
      if (i >= marqueeStates.childArray.length) return;
      // 往左
      if(marqueeStates.direction === 'left') {
        marqueeStates.childArray[i].maxLeftPosition = (marqueeStates.childPercentW * (i + 1)) * - 1;
        if(marqueeStates.isClick) {
          marqueeStates.childArray[i].position += -moveValue;
        } else {
          marqueeStates.childArray[i].position += (marqueeStates.isMouseDown || marqueeStates.isReverseDirection ? moveValue : -moveValue);
        }
        if(marqueeStates.childArray[i].position <= marqueeStates.childArray[i].maxLeftPosition) {
          if(!marqueeStates.cloneChild) return;
          marqueeStates.childArray[i].position += (marqueeStates.cloneChild.length * marqueeStates.childPercentW);
          changeActive(i);
        }
      }
      // 往右 
      if(marqueeStates.direction === 'right') {
        if(!marqueeStates.cloneChild) return;
        marqueeStates.childArray[i].maxRightPosition = (marqueeStates.cloneChild.length - (i + 1)) * marqueeStates.childPercentW;
        if(marqueeStates.isClick) {
          marqueeStates.childArray[i].position += moveValue;
        } else {
          marqueeStates.childArray[i].position += (marqueeStates.isMouseDown || marqueeStates.isReverseDirection ? moveValue : -moveValue);
        }
        
        if(marqueeStates.childArray[i].position >= marqueeStates.childArray[i].maxRightPosition) {
          marqueeStates.childArray[i].position -= (marqueeStates.cloneChild.length * marqueeStates.childPercentW);
          changeActive(i);
        }
      }
      Object.assign((child as HTMLElement).style, {
        transform: `translate3d(${marqueeStates.childArray[i].position}%, 0, 0)`
      });
    });
  }

  const handleTransition = (): void => {
    const currentSpeed = speed * 2;
    let transitionId: number | null = null;
    let moveValue = 0;

    if(marqueeStates.direction === 'left') {
      // active 的上一個
      if(marqueeStates.isReverseDirection) {
        const diffDistance = Math.abs(marqueeStates.childArray[marqueeStates.activeIndex].maxLeftPosition - marqueeStates.childArray[marqueeStates.activeIndex].position);
        moveValue = diffDistance + marqueeStates.childPercentW + marqueeStates.gap + 2;
      }
      // active 的下一個 
      else {
        const diffDistance = Math.abs(marqueeStates.childArray[marqueeStates.activeIndex].maxLeftPosition - marqueeStates.childArray[marqueeStates.activeIndex].position);
        moveValue = diffDistance;
      }
    }
    if(marqueeStates.direction === 'right') {
      // active 的下一個 
      if(marqueeStates.isReverseDirection) {
        const diffDistance = Math.abs(marqueeStates.childArray[marqueeStates.activeIndex].maxLeftPosition - marqueeStates.childArray[marqueeStates.activeIndex].position);
        moveValue = marqueeStates.childPercentW + (marqueeStates.childPercentW - diffDistance) + marqueeStates.gap + 2;
      }
      // active 的上一個 
      else {
        const diffDistance = Math.abs(marqueeStates.childArray[marqueeStates.activeIndex].maxLeftPosition - marqueeStates.childArray[marqueeStates.activeIndex].position);
        moveValue = marqueeStates.childPercentW + (marqueeStates.childPercentW - diffDistance) + marqueeStates.gap + 2;
      }
    }

    const startMarquee = () => {
      moveValue -= currentSpeed;
      if(moveValue > 0) {
        handlePosition(currentSpeed);
        transitionId = requestAnimationFrame(startMarquee);
      } else {
        stop();
        // 停頓一下
        setTimeout(() => {
          start();
          marqueeStates.isClick = false;
        }, currentSpeed * 100);
        if (!transitionId) return;
        cancelAnimationFrame(transitionId);
        transitionId = null;
      }
    }

    // 計算幀間隔
    if (!marqueeStates.lastFrameTime) marqueeStates.lastFrameTime = performance.now();
    const deltaTime = performance.now() - marqueeStates.lastFrameTime;

    // 如果距離上一幀的時間小於目標幀間隔，則跳過這一幀
    if (deltaTime < marqueeStates.frameInterval) {
      transitionId = requestAnimationFrame(startMarquee);
      return;
    }

    // 更新上一幀時間
    marqueeStates.lastFrameTime = performance.now();
    startMarquee();
  }

  const startDrag = (e: MouseEvent) => {
    marqueeStates.isMouseDown = true;
    marqueeStates.startDragX = e.pageX;
    stop();
  }

  const moveDrag = (e: MouseEvent) => {
    e.preventDefault();
    if (!marqueeStates.isMouseDown || marqueeStates.isClick) return;

    const moveValue = (e.pageX - marqueeStates.startDragX) / 100;

    if(marqueeStates.startDragX < e.pageX) marqueeStates.direction = 'right';
    if(marqueeStates.startDragX > e.pageX) marqueeStates.direction = 'left';
    
    handlePosition(moveValue);
  }

  const stopDrag = () => {
    marqueeStates.isMouseDown = false;
    stop();
  }

  const parentMouseenter = () => {
    const isTouchDevice = 'ontouchstart' in document.documentElement;
    if(isTouchDevice) return;
    console.log('parentMouseenter');
    stop();
  }
  const setupEventListeners = (): void => {
    // 啟用 hover 暫停
    if(enableHovePause && parent) {
      // parent.removeEventListener('mouseenter', parentMouseenter);
      parent.addEventListener('mouseenter', parentMouseenter);
    }
    // 啟用拖曳功能
    if(enableDrag && parent) {
      // parent.removeEventListener('mousedown', startDrag);
      // parent.removeEventListener('mousemove', moveDrag);
      // parent.removeEventListener('mouseup', stopDrag);
      parent.addEventListener('mousedown', startDrag);
      parent.addEventListener('mousemove', moveDrag);
      parent.addEventListener('mouseup', stopDrag);
    }
    // 啟用 hover 暫停或拖曳功能
    if(enableHovePause || enableDrag) {
      if(!parent) return;
      // parent.removeEventListener('mouseleave', start);
      parent.addEventListener('mouseleave', start);
    }
  }

  const clearEventListeners = (): void => {
    if(!parent) return;
    parent.removeEventListener('mouseenter', parentMouseenter);
    parent.removeEventListener('mousedown', startDrag);
    parent.removeEventListener('mousemove', moveDrag);
    parent.removeEventListener('mouseup', stopDrag);
    parent.removeEventListener('mouseleave', start);
  }

  const initial = () => {
    addCloneChild();
    start();
    setupEventListeners();
  }
  
  const unmount = () => {
    clearEventListeners();
    stop();
  }

  return {
    initial,
    unmount,
    stop,
    start,
    refresh,
    prev,
    next,
  };
};