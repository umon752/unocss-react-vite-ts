type AllDataInfiniteScrollOptions = {
  scrollTarget: HTMLElement | null,
  loadTarget: HTMLElement | null,
  renderTarget: HTMLElement | null,
  spinner: HTMLElement | null,
  page?: number,
  amount?: number,
  delayTime?: number,
  totalData: any[],
  init?: (data: []) => void;
  load?: (data: []) => void;
  complete?: () => void;
};

export const useAllDataInfiniteScroll = (options: AllDataInfiniteScrollOptions) => {
  // 預設值
  const defaultOptions: Required<AllDataInfiniteScrollOptions> = {
    scrollTarget: null,
    loadTarget: null,
    renderTarget: null,
    spinner: null,
    page: 0,
    amount: 1,
    delayTime: 0,
    totalData: [],
    init: () => {},
    load: () => {},
    complete: () => {},
  }

  let isLoading = false;
  let isReload = false;
  let isFinish = false;
  const activeClass = 'is-active';

  const scrollTarget = options.scrollTarget ?? defaultOptions.scrollTarget;
  const loadTarget = options.loadTarget ?? defaultOptions.loadTarget;
  const renderTarget = options.renderTarget ?? defaultOptions.renderTarget;
  const spinner = options.spinner ?? defaultOptions.spinner;
  const lockTarget: HTMLElement | null = options.scrollTarget ?? document.querySelector('body');
  let page = options.page ?? defaultOptions.page;
  const amount = options.amount ?? defaultOptions.amount;
  const delayTime = options.delayTime ?? defaultOptions.delayTime;
  const init = options.init ?? defaultOptions.init;
  const load = options.load ?? defaultOptions.load;
  const complete = options.complete ?? defaultOptions.complete;

  const totalData: any = options.totalData ?? defaultOptions.totalData; // 全部資料
  const splitData: any = []; // 分割分頁資料
  let data: any = []; // 當前頁資料

  // 設定捲軸位置
  const setScrollTop = (): void => {
    if(!scrollTarget || !renderTarget) return;
    const scrollTargetH = scrollTarget.offsetHeight;
    const renderTargetH = renderTarget.offsetHeight;
    scrollTarget.scrollTop = renderTargetH - scrollTargetH; 
  }

  const getCurrentData = (): void => {
    data = [];

    for (let i = 0; i <= page; i++) {
      data = [...data, ...splitData[i]];
    }
  }

  const loadStart = (setPage: number = 0): void => {
    if(!spinner || !loadTarget || !lockTarget) return;
    if(isReload) {
      page = setPage;
    } else {
      page++;
    }
    
    if(page >= splitData.length) {
      if(complete && !isFinish) {
        complete();
        isFinish = true;
      }
      return;
    };

    isLoading = true;
    spinner.classList.add(activeClass);
    lockTarget.style.overflow = 'hidden';
    
    if(load) {
      getCurrentData();
      load(data);
      renderData();
    }
  }

  const loadEnd = (): void => {
    if(!spinner || !lockTarget) return;
    isLoading = false;
    spinner.classList.remove(activeClass);
    lockTarget.style.overflow = 'scroll';
  }

  const scrollEvent = (): void => {
    if (isLoading || isFinish || !loadTarget || !scrollTarget) return;

    const loadTargetTop = loadTarget.offsetTop;
    let scrollH = 0;
    let scrollTop = 0;

    if(scrollTarget instanceof Window) {
      scrollH = window.innerHeight
      scrollTop = window.scrollY
    } else {
      scrollH = scrollTarget.offsetHeight;
      scrollTop = scrollTarget.scrollTop;
    }
    if (scrollH + scrollTop >= loadTargetTop) {
      loadStart(page);
    }
  }

  const reload = (page = 0) => {
    isReload = true;
    isFinish = false;
    loadEnd();
    loadStart(page);
  }

  const renderData = (): void => {
    setTimeout(() => {
      if(isReload) {
        setScrollTop();
      }
      isReload = false;
      loadEnd();
    }, delayTime);
  }

  // 處理當前頁的資料
  const filterData = (): void => {
    if(!init) {
      throw new Error('init is not defined');
    } else {
      if(totalData.length < amount) {
        throw new Error('data length is less than amount');
      }

      let splitIndex = 0;
      totalData.forEach((_: any, i: number) => {
        if(i === splitIndex) {
          const lastIndex = i + amount;
          const array = totalData.slice(i, lastIndex);
          splitIndex = lastIndex;
          splitData.push(array);
        }
      })
    }
    getCurrentData();
  }

  const setupEventListeners = (): void => {
    if (!scrollTarget) return;
    scrollTarget.addEventListener('scroll', scrollEvent);
  };

  const cleanupEventListeners = (): void => {
    if (!scrollTarget) return;
    scrollTarget.removeEventListener('scroll', scrollEvent);
  };

  const initial = (): void => {
    setupEventListeners();
    filterData();
    init(data);
  }

  const unmount = (): void => {
    cleanupEventListeners();
  }

  return {
    initial,
    renderData,
    reload,
    filterData,
    unmount,
  };
};