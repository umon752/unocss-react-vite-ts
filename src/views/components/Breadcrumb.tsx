import React from 'react';

type BreadcrumbItem = {
  text: string;
  href?: string;
};

type BreadcrumbProps = {
  items?: BreadcrumbItem[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items = [] }) => {
  return (
    <nav className="relative z-1030">
      <ol className="flex flex-wrap">
        {items.map((item, index) => (
          <li key={index} className={`relative flex text-dark ${index !== 0 && 'ps-20'} ${index === items.length - 1 && 'before:(text-main)'}`}>
            {index < items.length - 1 ? (
              <a className="block text-dark hover:(text-dark)" href={item.href}>
                {item.text}
              </a>
            ) : (
              <div className="block text-main font-bold hover:(text-main)">{item.text}</div>
            )}
            {index !== 0 && (
              <span className={`u-bg-contain w-16 h-16 i-iconamoon:arrow-right-2-light v-middle absolute left-0 top-50% translate-y--50% ${index === items.length - 1 && 'text-main'}`}></span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
