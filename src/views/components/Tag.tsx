import React from 'react';

type TagProps = {
  text: string;
};

const Tag: React.FC<TagProps> = ({ text = '' }) => {
  return (
    <div className="inline-flex items-center flex-shrink-0 bg-main text-white rounded-full py-[6px] px-[12px]">{text}</div>
  );
};

export default Tag;
