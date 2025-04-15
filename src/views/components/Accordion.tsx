import { useState } from 'react';

type AccordionProps = {
  title: string;
  text: string;
};

type AccordionListProps = {
  array: AccordionProps[];
};

const Accordion: React.FC<AccordionListProps> = ({ array = [] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-(col) gap-10">
      {array.map((item, index) => (
        <div key={index}>
          <button 
            type="button" 
            className={`w-100% flex flex-(items-center justify-between) gap-10 border-(b-solid b-blue-200) py-8 px-12 u-transition-ease ${activeIndex === index ? 'text-blue' : ''}`} 
            onClick={() => toggleAccordion(index)}
          >
            {item.title}
            <div className={`i-material-symbols:keyboard-arrow-down-rounded text-blue-300 flex-shrink-0 ${activeIndex === index ? 'rotate-180' : ''} u-transition-ease`}></div>
          </button>
          <div className={`grid grid-rows-[0fr] u-transition-ease ${activeIndex === index ? 'grid-rows-[1fr]' : ''}`}>
            <div className={`overflow-hidden ${activeIndex === index ? 'animate-overflow-modify' : ''}`}>
              <div className="bg-blue-100 py-8 px-12 mt-8">{item.text}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
