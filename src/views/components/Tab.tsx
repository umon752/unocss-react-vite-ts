import { useEffect, useState, useRef } from 'react';
// hooks
import { useDrag } from '@/hooks/useDrag';

type TabProps = {
  title: string;
  text: string;
};

type TabListProps = {
  array: TabProps[];
};

const Tab: React.FC<TabListProps> = ({ array = [] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [showIndex, setShowIndex] = useState<number | null>(0);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const btnsRef = useRef<HTMLButtonElement[]>([]);

  useDrag(targetRef, btnsRef);

  const toggleTab = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    setTimeout(() => {
      setShowIndex(showIndex === index ? null : index);
    }, 10);
  };

  return (
    <div className="flex flex-(col) gap-10">
      <div>
        <div className="flex flex-(items-center) gap-6 pb-10 overflow-x-auto u-scrollbar-hidden" ref={targetRef}>
          {array.map((item, index) => (
            <button
              type="button"
              className={`relative text-center text-nowrap flex-shrink-0 p-10 ${activeIndex === index ? 'bg-blue text-white' : 'bg-blue-200'}`}
              key={index}
              onClick={() => toggleTab(index)}
              ref={(el) => {
                if (el) {
                  btnsRef.current[index] = el;
                }
              }}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="relative grid place-items-start">            
          {array.map((item, index) => (
            <div className={`grid-area-[1/1/2/2] overflow-x-auto u-transition-ease ${activeIndex === index ? 'block' : 'hidden'} ${showIndex === index ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} key={index}>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tab;
