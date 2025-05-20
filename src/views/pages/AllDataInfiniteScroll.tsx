import { useEffect, useState, useRef } from 'react';
import { useAllDataInfiniteScroll } from '@/hooks/useAllDataInfiniteScroll';

type AllDataInfiniteScrollProps = {};

const AllDataInfiniteScroll: React.FC<AllDataInfiniteScrollProps> = () => {
  const initData = [
    {
      id: 0,
      name: 'item0',
    },
    {
      id: 1,
      name: 'item1',
    },
    {
      id: 2,
      name: 'item2',
    },
    {
      id: 3,
      name: 'item3',
    },
    {
      id: 4,
      name: 'item4',
    },
    {
      id: 5,
      name: 'item5',
    },
    {
      id: 6,
      name: 'item6',
    },
    {
      id: 7,
      name: 'item7',
    },
    {
      id: 8,
      name: 'item8',
    },
    {
      id: 9,
      name: 'item9',
    },
    {
      id: 10,
      name: 'item10',
    },
  ];
  const [data, setData] = useState<{ id: number; name: string }[]>([]);
  const instancesRef = useRef<any>(null);

  // 使用 useRef 获取 DOM 元素
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const renderTargetRef = useRef<HTMLUListElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const loadTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    instancesRef.current = useAllDataInfiniteScroll({
      scrollTarget: scrollTargetRef.current,
      loadTarget: loadTargetRef.current,
      renderTarget: renderTargetRef.current,
      spinner: spinnerRef.current,
      page: 0,
      amount: 2,
      delayTime: 0,
      totalData: initData,
      init: (data: []) => {
        console.log('init', data);
        setData(data);
      },
      load: (data: []) => {
        setData(data);
        console.log('load', data);
      },
      complete: () => {
        console.log('complete');
      },
    });

    instancesRef.current.initial();

    return () => {
      if (instancesRef.current) {
        instancesRef.current.unmount();
        instancesRef.current = null;
      }
    };
  }, []);

  const reloadData = () => {
    instancesRef.current.reload(3);
  }

  return (
    <>
      <div className="w-50% h-50vh relative overflow-hidden">
        {/* 使用 ref 绑定 DOM 元素 */}
        <div ref={scrollTargetRef} className="overflow-y-auto h-100% js-scroll-target">
          <ul ref={renderTargetRef} className="flex flex-col js-render-target">
            {data.map((item) => (
              <li
                key={item.id}
                className="w-100% h-[300px] u-flex-center flex-col bg-blue-300 border border-(1 solid white)"
              >
                {item.name}
              </li>
            ))}
          </ul>

          <div ref={spinnerRef} className="text-center opacity-0 js-spinner">
            loading...
          </div>

          <div ref={loadTargetRef} className="w-100% h-300 bg-main u-flex-center js-load-target">
            觸發載入的目標
          </div>
        </div>
      </div>
      <div className="flex gap-[10px] mt-[10px]">
        <button type="button" className="rounded-[4px] bg-main text-white p-[8px]" onClick={reloadData}>reload</button>
      </div>
    </>
  );
};

export default AllDataInfiniteScroll;
