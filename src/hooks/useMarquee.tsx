type MarqueeOptions = {
  element: HTMLElement | null;
  speed?: number;
  enableHovePause?: boolean;
  enableDrag?: boolean;
  activeClass?: string[];
  reverseDirection?: boolean;
  init?: () => void;
  update?: () => void;
};

type MarqueeMethods = {
  stop: () => () => void;
  start: () => void;
  refresh: () => void;
  prev: () => void;
  next: () => () => void;
};

type ChildObject = {
  position: number;
  maxLeftPosition: number;
  maxRightPosition: number;
  activePosition: number;
  isRightOut: boolean;
};

type MarqueeState = {
  cloneChilds: HTMLCollection | null;
  gap: number;
  marqueeAnimationFrameId: number | null;
  childPercentW: number;
  childTotalW: number;
  cloneChildTotalW: number;
  childHtml: string;
  childsArray: ChildObject[];
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
    element: null,
    speed: 1,
    enableHovePause: false,
    enableDrag: false,
    activeClass: [],
    reverseDirection: false,
    init: () => {},
    update: () => {},
  }

  const parent = options.element ?? defaultOptions.element;
  const childs = parent?.children;
  const speed = options.speed ?? defaultOptions.speed;
  const enableHovePause = options.enableHovePause ?? defaultOptions.enableHovePause;
  const enableDrag = options.enableDrag ?? defaultOptions.enableDrag;
  const activeClass = options.activeClass ?? defaultOptions.activeClass;
  const reverseDirection = options.reverseDirection ?? defaultOptions.reverseDirection;
  const init = options.init ?? defaultOptions.init;
  const update = options.update ?? defaultOptions.update;

  const marqueeStates: MarqueeState = {
    cloneChilds: null,
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
  }

  const setDirection = (): void => {
    const reverseDirection = options.reverseDirection ?? defaultOptions.reverseDirection;
    if(reverseDirection) {
      marqueeStates.direction = 'right';
      marqueeStates.isReverseDirection = true;
    } else {
      marqueeStates.direction = 'left';
    }
  }

  const addCloneChilds = (): void => {
    if(parent && childs) {
      const gapStyle = parseInt(window.getComputedStyle(parent).getPropertyValue('gap'));
      marqueeStates.gap = gapStyle ? gapStyle : 0;
      const childsLength = childs.length;
  
      [...childs].forEach((child) => {
        marqueeStates.childTotalW += (child as HTMLElement).offsetWidth;
      });
      marqueeStates.childTotalW += marqueeStates.gap * childsLength;
    
      const winW = window.innerWidth;
      // 計算填滿螢幕寬度所需的複製次數
      const cloneTimes = Math.ceil(winW / marqueeStates.childTotalW);
      marqueeStates.childHtml = parent.innerHTML;
      const afterContent = marqueeStates.childHtml.repeat(cloneTimes);
      // 複製到元素內的子元素後面
      parent.insertAdjacentHTML('beforeend', afterContent);
      marqueeStates.cloneChilds = parent.children;
  
      [...marqueeStates.cloneChilds].forEach((child, i) => {
        // 預設第一個子元素 active
        if(activeClass.length !== 0) {
          if(i === 0) child.classList.add(...activeClass);
        }
        marqueeStates.cloneChildTotalW += (child as HTMLElement).offsetWidth;
      });
      marqueeStates.cloneChildTotalW += marqueeStates.gap * childsLength;
  
      marqueeStates.childsArray = [...marqueeStates.cloneChilds].map(() => {
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

  const clearCloneChilds = (): void => {
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

  const changeActive = (index): void => {
    if(!activeClass) return;
    [...marqueeStates.cloneChilds].forEach((child, i) => {
      child.classList.remove(activeClass);
    })
    if(index === (marqueeStates.cloneChilds.length - 1)) index = -1;
    marqueeStates.cloneChilds[index + 1].classList.add(activeClass);
    marqueeStates.activeIndex = index + 1;
  }

  const handlePosition = (moveValue: number): void => {
    [...marqueeStates.cloneChilds].forEach((child, i) => {
      // 往左
      if(marqueeStates.direction === 'left') {
        marqueeStates.childsArray[i].maxLeftPosition = (marqueeStates.childPercentW * (i + 1)) * - 1;
        if(marqueeStates.isClick) {
          marqueeStates.childsArray[i].position += -moveValue;
        } else {
          marqueeStates.childsArray[i].position += (marqueeStates.isMouseDown || marqueeStates.isReverseDirection ? moveValue : -moveValue);
        }
        if(marqueeStates.childsArray[i].position <= marqueeStates.childsArray[i].maxLeftPosition) {
          marqueeStates.childsArray[i].position += (marqueeStates.cloneChilds.length * marqueeStates.childPercentW);
          changeActive(i);
        }
      }
      // 往右 
      if(marqueeStates.direction === 'right') {
        marqueeStates.childsArray[i].maxRightPosition = (marqueeStates.cloneChilds.length - (i + 1)) * marqueeStates.childPercentW;
        if(marqueeStates.isClick) {
          marqueeStates.childsArray[i].position += moveValue;
        } else {
          marqueeStates.childsArray[i].position += (marqueeStates.isMouseDown || marqueeStates.isReverseDirection ? moveValue : -moveValue);
        }
        
        if(marqueeStates.childsArray[i].position >= marqueeStates.childsArray[i].maxRightPosition) {
          marqueeStates.childsArray[i].position -= (marqueeStates.cloneChilds.length * marqueeStates.childPercentW);
          changeActive(i);
        }
      }
      Object.assign(child.style, {
        transform: `translate3d(${marqueeStates.childsArray[i].position}%, 0, 0)`
      });
    });
  }

  const handleTransition = (): void => {
    const speed = speed * 2;
    let transitionId = null;
    let moveValue = 0;

    if(marqueeStates.direction === 'left') {
      // active 的上一個
      if(marqueeStates.isReverseDirection) {
        const diffDistance = Math.abs(marqueeStates.childsArray[marqueeStates.activeIndex].maxLeftPosition - marqueeStates.childsArray[marqueeStates.activeIndex].position);
        moveValue = diffDistance + marqueeStates.childPercentW + marqueeStates.gap + 2;
      }
      // active 的下一個 
      else {
        const diffDistance = Math.abs(marqueeStates.childsArray[marqueeStates.activeIndex].maxLeftPosition - marqueeStates.childsArray[marqueeStates.activeIndex].position);
        moveValue = diffDistance;
      }
    }
    if(marqueeStates.direction === 'right') {
      // active 的下一個 
      if(marqueeStates.isReverseDirection) {
        const diffDistance = Math.abs(marqueeStates.childsArray[marqueeStates.activeIndex].maxLeftPosition - marqueeStates.childsArray[marqueeStates.activeIndex].position);
        moveValue = marqueeStates.childPercentW + (marqueeStates.childPercentW - diffDistance) + marqueeStates.gap + 2;
      }
      // active 的上一個 
      else {
        const diffDistance = Math.abs(marqueeStates.childsArray[marqueeStates.activeIndex].maxLeftPosition - marqueeStates.childsArray[marqueeStates.activeIndex].position);
        moveValue = marqueeStates.childPercentW + (marqueeStates.childPercentW - diffDistance) + marqueeStates.gap + 2;
      }
    }

    const startMarquee = () => {
      moveValue -= speed;
      if(moveValue > 0) {
        handlePosition(speed);
        transitionId = requestAnimationFrame(startMarquee);
      } else {
        stop();
        // 停頓一下
        setTimeout(() => {
          start();
          marqueeStates.isClick = false;
        }, speed * 100);
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

  const addEvents = (): void => {
    // 啟用 hover 暫停
    if(enableHovePause) {
      if(!parent) return;
      parent.addEventListener('mouseenter', () => {
        const isTouchDevice = 'ontouchstart' in document.documentElement;
        if(isTouchDevice) return;
        stop();
      });
    }
    // 啟用拖曳功能
    if(enableDrag) {
      if(!parent) return;
      parent.addEventListener('mousedown', startDrag);
      parent.addEventListener('mousemove', moveDrag);
      parent.addEventListener('mouseup', stopDrag);
    }
    // 啟用 hover 暫停或拖曳功能
    if(enableHovePause || enableDrag) {
      if(!parent) return;
      parent.addEventListener('mouseleave', start);
    }
  }

  return {
    stop,
    start,
    refresh,
    prev,
    next,
  };
};