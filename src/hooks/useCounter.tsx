import { useEffect, useRef, useCallback } from 'react';

type CounterOptions = {
  counter?: string;
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

type CounterMethods = {
  run: () => () => void;
  stop: () => void;
  start: () => void;
  reset: () => void;
  restart: () => () => void;
};

type CounterState = {
  currentNum: number;
  startNum: number;
  timerId: number | null;
  singleTextArray: CounterTextItem[];
  isStop: boolean;
};

export const useCounter = (options: CounterOptions = {}): CounterMethods => {
  // 預設值
  const defaultOptions: Required<CounterOptions> = {
    duration: 1000,
    startTime: 0,
    delay: 0,
    startNum: 0,
    randomMode: {
      enable: true,
      thousandComma: false,
    },
    done: () => {},
    counter: '',
  }

  const countersRef = useRef<NodeListOf<Element> | null>(null);
  const counterStatesRef = useRef<Map<Element, CounterState>>(new Map());

  const getRandomNum = useCallback((maxNum: number): number => {
    return Math.floor(Math.random() * maxNum);
  }, []);

  const setThousandComma = useCallback((num: number): string => {
    const comma = /(\d)(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(comma, '$1,');
  }, []);

  const getCounterState = useCallback((el: Element): CounterState => {
    if (!counterStatesRef.current.has(el)) {
      counterStatesRef.current.set(el, {
        currentNum: 0,
        startNum: options.startNum ?? defaultOptions.startNum,
        timerId: null,
        singleTextArray: [],
        isStop: false,
      });
    }
    return counterStatesRef.current.get(el)!;
  }, [options.startNum]);

  const render = useCallback((el: Element, isDone = false): void => {
    const counterText = el.dataset.counter || '';
    const isPureNum = !isNaN(Number(counterText));
    const randomMode = {
      enable: options.randomMode?.enable ?? defaultOptions.randomMode.enable,
      thousandComma: options.randomMode?.thousandComma ?? defaultOptions.randomMode.thousandComma,
    };
    const state = getCounterState(el);

    if (!randomMode.enable && isPureNum) {
      if(isDone) {
        el.textContent = randomMode.thousandComma ? setThousandComma(parseInt(counterText)) : parseInt(counterText).toString();
      } else {
        el.textContent = randomMode.thousandComma ? setThousandComma(Math.floor(state.currentNum)) : Math.floor(state.currentNum).toString();
      }
    } else {
      const str = state.singleTextArray.map((item) => {
        return isDone ? item.orgText : (item.randomText || '');
      }).join('');
      el.textContent = str;
    }
  }, [options.randomMode?.enable, options.randomMode?.thousandComma, setThousandComma, getCounterState]);

  const runSequential = useCallback((el: Element): void => {
    const counterText = el.dataset.counter || '';
    const domNum = parseInt(counterText);
    const duration = options.duration ?? defaultOptions.duration;
    const delay = options.delay ?? defaultOptions.delay;
    const state = getCounterState(el);
    let delayTimestamp = 0;

    const runCount = (timestamp: number): void => {
      const increasmentPerFrame = (domNum - state.startNum) / (duration / 16.67);
      state.currentNum = state.currentNum + increasmentPerFrame;
      
      if (state.currentNum < domNum) {
        if (!state.isStop) {
          if (timestamp - delayTimestamp >= delay) {
            render(el);
            delayTimestamp = timestamp;
          }
          requestAnimationFrame(runCount);
        }
      } else {
        render(el, true);
        const done = options.done ?? defaultOptions.done;
        done();
      }
    }

    if (!state.timerId) {
      state.timerId = requestAnimationFrame(runCount);
    } else {
      requestAnimationFrame(runCount);
    }
  }, [options.duration, options.delay, options.done, render, getCounterState]);

  const runRandom = useCallback((el: Element): void => {
    const counterText = el.dataset.counter || '';
    const domTextArray = counterText.split('');
    const duration = options.duration ?? defaultOptions.duration;
    const delay = options.delay ?? defaultOptions.delay;
    const maxNum = 9;
    const state = getCounterState(el);
    let isDone = false;
    let delayTimestamp = 0;

    domTextArray.forEach((text, i) => {
      state.singleTextArray[i] = {
        timerId: null,
        durationTimestamp: null,
        orgText: text,
        randomText: null,
      };

      if (!isNaN(Number(text))) {
        const runCount = (timestamp: number): void => {
          if (!state.singleTextArray[i].durationTimestamp) {
            state.singleTextArray[i].durationTimestamp = timestamp;
          }

          const elapsedTime = timestamp - (state.singleTextArray[i].durationTimestamp || 0);

          if (elapsedTime < duration) {
            if (!state.isStop) {
              state.singleTextArray[i].randomText = getRandomNum(maxNum).toString();

              if (timestamp - delayTimestamp >= delay) {
                setTimeout(() => {
                  render(el);
                }, 0);
                delayTimestamp = timestamp;
              }
              requestAnimationFrame(runCount);
            }
          } else {
            if (!isDone) {
              render(el, true);
              const done = options.done ?? defaultOptions.done;
              done();
              isDone = true;
            }
          }
        }
        state.singleTextArray[i].timerId = requestAnimationFrame(runCount);
      } else {
        state.singleTextArray[i].randomText = text;
      }
    });
  }, [options.duration, options.delay, options.done, getRandomNum, render, getCounterState]);

  const runStart = useCallback((el: Element): void => {
    const counterText = el.dataset.counter || '';
    const isPureNum = !isNaN(Number(counterText));
    const randomMode = {
      enable: options.randomMode?.enable ?? defaultOptions.randomMode.enable,
    };
    const state = getCounterState(el);

    if (!randomMode.enable && !isPureNum) {
      console.warn('randomMode enable cannot be used false');
    }
    
    if (!randomMode.enable && isPureNum) {
      runSequential(el);
    } else {
      runRandom(el);
    }
  }, [options.randomMode?.enable, runSequential, runRandom, getCounterState]);

  const cancelAnimation = useCallback((el: Element, stopMethod = false): void => {
    const counterText = el.dataset.counter || '';
    const isPureNum = !isNaN(Number(counterText));
    const randomMode = {
      enable: options.randomMode?.enable ?? defaultOptions.randomMode.enable,
    };
    const state = getCounterState(el);

    if (!randomMode.enable && isPureNum) {
      if (state.timerId) {
        cancelAnimationFrame(state.timerId);
      }
    } else {
      state.singleTextArray.forEach((item) => {
        if (item.timerId) {
          cancelAnimationFrame(item.timerId);
        }
      });
    }
  }, [options.randomMode?.enable, getCounterState]);

  const run = useCallback((): (() => void) => {
    const startTime = options.startTime ?? defaultOptions.startTime;
    let timerId: number | null = null;

    if (countersRef.current) {
      countersRef.current.forEach((el) => {
        const state = getCounterState(el);
        state.isStop = false;
      });

      timerId = window.setTimeout(() => {
        if (countersRef.current) {
          countersRef.current.forEach((el) => {
            runStart(el);
          });
        }
      }, startTime);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [options.startTime, runStart, getCounterState]);

  const stop = useCallback((): void => {
    if (countersRef.current) {
      countersRef.current.forEach((el) => {
        const state = getCounterState(el);
        cancelAnimation(el, true);
        state.isStop = true;
      });
    }
  }, [cancelAnimation, getCounterState]);

  const start = useCallback((): void => {
    if (countersRef.current) {
      countersRef.current.forEach((el) => {
        const state = getCounterState(el);
        runStart(el);
        state.isStop = false;
      });
    }
  }, [runStart, getCounterState]);

  const reset = useCallback((): void => {
    if (countersRef.current) {
      countersRef.current.forEach((el) => {
        const state = getCounterState(el);
        cancelAnimation(el);
        state.isStop = true;
        state.timerId = null;
        state.currentNum = state.startNum;
        el.textContent = state.startNum.toString();
      });
    }
  }, [cancelAnimation, getCounterState]);

  const restart = useCallback((): (() => void) => {
    const fps = 60;
    let timerId: number | null = null;
    reset();
    timerId = window.setTimeout(() => {
      run();
    }, fps);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [reset, run]);

  useEffect(() => {
    if (options.counter) {
      countersRef.current = document.querySelectorAll(options.counter);
      if (countersRef.current) {
        countersRef.current.forEach((el) => {
          const state = getCounterState(el);
          el.textContent = state.startNum.toString();
        });
      }
    }
  }, [options.counter, getCounterState]);

  return {
    run,
    stop,
    start,
    reset,
    restart,
  };
}