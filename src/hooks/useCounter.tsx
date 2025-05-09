type CounterOptions = {
  element: HTMLElement | null;
  duration?: number;
  startTime?: number;
  delay?: number;
  startNum?: number;
  randomMode?: {
    enable?: boolean;
    thousandComma?: boolean;
  };
  done?: () => void;
};

type CounterTextItem = {
  timerId: number | null;
  durationTimestamp: number | null;
  orgText: string;
  randomText: string | null;
};

type CounterState = {
  currentNum: number;
  startNum: number;
  timerId: number | null;
  singleTextArray: CounterTextItem[];
  isStop: boolean;
};

type CounterMethods = {
  run: () => () => void;
  stop: () => void;
  start: () => void;
  reset: () => void;
  restart: () => () => void;
};

export const useCounter = (options: CounterOptions = {}): CounterMethods => {
  // 預設值
  const defaultOptions: Required<CounterOptions> = {
    element: null,
    duration: 1000,
    startTime: 0,
    delay: 0,
    startNum: 0,
    randomMode: {
      enable: true,
      thousandComma: false,
    },
    done: () => {},
  }

  const counter = options.element ?? defaultOptions.element;
  const duration = options.duration ?? defaultOptions.duration;
  const startTime = options.startTime ?? defaultOptions.startTime;
  const delay = options.delay ?? defaultOptions.delay;
  // const startNum = options.startNum ?? defaultOptions.startNum;
  const randomMode = {
    enable: options.randomMode?.enable ?? defaultOptions.randomMode.enable,
    thousandComma: options.randomMode?.thousandComma ?? defaultOptions.randomMode.thousandComma,
  };
  const done = options.done ?? defaultOptions.done;

  const counterStates: CounterState = {
    currentNum: 0,
    startNum: options.startNum ?? defaultOptions.startNum,
    timerId: null,
    singleTextArray: [],
    isStop: false,
  }

  if(counter) {
    counter.textContent = counterStates.startNum.toString();
  }

  const getRandomNum = (maxNum: number): number => {
    return Math.floor(Math.random() * maxNum);
  };

  const setThousandComma = (num: number): string => {
    const comma = /(\d)(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(comma, '$1,');
  };

  const render = (isDone = false): void => {
    const counterText = counter?.dataset.counter || '';
    const isPureNum = !isNaN(Number(counterText));
    if (!randomMode.enable && isPureNum) {
      if(isDone) {
        if(!counter) return;
        counter.textContent = randomMode.thousandComma ? setThousandComma(parseInt(counterText)) : parseInt(counterText).toString();
      } else {
        if(!counter) return;
        counter.textContent = randomMode.thousandComma ? setThousandComma(Math.floor(counterStates.currentNum)) : Math.floor(counterStates.currentNum).toString();
      }
    } else {
      const str = counterStates.singleTextArray.map((item) => {
        return isDone ? item.orgText : (item.randomText || '');
      }).join('');
      if(!counter) return;
      counter.textContent = str;
    }
  };

  const runSequential = (): void => {
    const counterText = counter?.dataset.counter || '';
    const domNum = parseInt(counterText);
    let delayTimestamp = 0;

    const runCount = (timestamp: number): void => {
      const increasmentPerFrame = (domNum - counterStates.startNum) / (duration / 16.67);
      counterStates.currentNum = counterStates.currentNum + increasmentPerFrame;
      
      if (counterStates.currentNum < domNum) {
        if (counterStates.isStop) return;
        if (timestamp - delayTimestamp >= delay) {
          render();
          delayTimestamp = timestamp;
        }
        requestAnimationFrame(runCount);
      } else {
        render(true);
        done();
      }
    };

    if (!counterStates.timerId) {
      counterStates.timerId = requestAnimationFrame(runCount);
    } else {
      requestAnimationFrame(runCount);
    }
  };

  const runRandom = (): void => {
    const counterText = counter?.dataset.counter || '';
    const domTextArray = counterText.split('');
    const maxNum = 9;
    let isDone = false;
    let delayTimestamp = 0;

    domTextArray.forEach((text: string, i: number) => {
      counterStates.singleTextArray[i] = {
        timerId: null,
        durationTimestamp: null,
        orgText: text,
        randomText: null,
      };

      if (isNaN(Number(text))) {
        counterStates.singleTextArray[i].randomText = text;
      } else {
        const runCount = (timestamp: number): void => {
          let elapsedTime = 0;
          if (counterStates.singleTextArray[i].durationTimestamp) {
            elapsedTime = timestamp - (counterStates.singleTextArray[i].durationTimestamp || 0);
          } else {
            counterStates.singleTextArray[i].durationTimestamp = timestamp;
          }

          if (elapsedTime < duration) {
            if(counterStates.isStop) return;
            counterStates.singleTextArray[i].randomText = getRandomNum(maxNum).toString();
            if (timestamp - delayTimestamp >= delay) {
              setTimeout(() => {
                render();
              }, 0);
              delayTimestamp = timestamp;
            }
            requestAnimationFrame(runCount);
          } else {
            if (isDone) return;
            render(true);
            done();
            isDone = true;
          }
        };
        counterStates.singleTextArray[i].timerId = requestAnimationFrame(runCount);
      }
    });
  };

  const runStart = (): void => {
    const counterText = counter?.dataset.counter || '';
    const isPureNum = !isNaN(Number(counterText));
    if (!randomMode.enable && !isPureNum) {
      console.warn('randomMode enable cannot be used false');
    }
    
    if (!randomMode.enable && isPureNum) {
      runSequential();
    } else {
      runRandom();
    }
  };

  const cancelAnimation = (): void => {
    const counterText = counter?.dataset.counter || '';
    const isPureNum = !isNaN(Number(counterText));
    if (!randomMode.enable && isPureNum) {
      if(!counterStates.timerId) return;
      cancelAnimationFrame(counterStates.timerId);
    } else {
      counterStates.singleTextArray.forEach((item) => {
        if(!item.timerId) return;
        cancelAnimationFrame(item.timerId);
      });
    }
  };

  const run = (): (() => void) => {
    let timerId: number | null = null;
    if(!counter) return;
    counterStates.isStop = false;

    timerId = window.setTimeout(() => {
      if(!counter) return;
      runStart();
    }, startTime);
    return () => {
      if(!timerId) return;
      clearTimeout(timerId);
    };
  };

  const stop = (): void => {
    if(!counter) return;
    cancelAnimation();
    counterStates.isStop = true;
  };

  const start = (): void => {
    if(!counter) return;
    runStart();
    counterStates.isStop = false;
  };

  const reset = (): void => {
    if(!counter) return;
    cancelAnimation();
    counterStates.isStop = true;
    counterStates.timerId = null;
    counterStates.currentNum = counterStates.startNum;
    counter.textContent = counterStates.startNum.toString();
  };

  const restart = (): (() => void) => {
    const fps = 60;
    let timerId: number | null = null;
    reset();
    timerId = window.setTimeout(() => {
      run();
    }, fps);

    return () => {
      if(!timerId) return;
      clearTimeout(timerId);
    };
  };

  return {
    run,
    stop,
    start,
    reset,
    restart,
  };
};