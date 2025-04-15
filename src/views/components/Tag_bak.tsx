import React from 'react';

// 定义 Tag 组件的 props 类型
type TagProps = {
  text: string;
  size?: 'sm' | 'md' | 'lg'; // 可选的尺寸
  fill?: 'main' | 'minor'; // 可选的填充颜色
  stroke?: 'main' | 'minor'; // 可选的边框颜色
  state?: 'active' | 'disabled'; // 可选的状态
  useHover?: boolean; // 可选的 hover 使用
};

const Tag: React.FC<TagProps> = ({ text, size = 'md', fill, stroke, state, useHover = true }) => {
  const baseStyle = 'inline-flex items-center flex-shrink-0 rounded-full border-solid border-1 u-transition-ease @hover:u-transition-ease';
  const sizeDefault = 'font-size-16 py-6 ps-12 pe-12';

  const sizeStyle = size ? ({
    sm: 'font-size-14 py-4 ps-10 pe-10',
    md: sizeDefault,
    lg: 'font-size-18 py-8 ps-14 pe-14',
  }[size] || 'md') : sizeDefault;

  let fillStyle = fill ? ({
    main: {
      default: 'bg-main text-white',
      hover: '@hover:(border-main text-main bg-opacity-0)',
    },
    minor: {
      default: 'bg-minor text-white',
      hover: '@hover:(border-minor text-main bg-opacity-0)',
    },
  }[fill] || { default: '', hover: '' }) : { default: '', hover: '' };

  let strokeStyle = stroke ? ({
    main: {
      default: 'border-main text-main',
      hover: '@hover:(bg-main text-white)',
    },
    minor: {
      default: 'border-minor text-minor',
      hover: '@hover:(bg-minor text-white)',
    },
  }[stroke] || { default: '', hover: '' }) : { default: '', hover: '' };

  let stateStyle = state ? ({
    active: '',
    disabled: 'opacity-70 pointer-events-none',
  }[state] || '') : '';

  if (fill === 'main' && strokeStyle.default === '' && state === 'active') {
    fillStyle.hover = '';
    stateStyle = 'bg-main text-white shadow-md @hover:(bg-main text-white bg-opacity-100)';
  } else if (fill === 'minor' && strokeStyle.default === '' && state === 'active') {
    fillStyle.hover = '';
    stateStyle = 'bg-minor text-white shadow-md @hover:(bg-minor text-white bg-opacity-100)';
  } else if (stroke === 'main' && fillStyle.default === '' && state === 'active') {
    strokeStyle.hover = '';
    stateStyle = 'bg-main text-white shadow-md @hover:(bg-main text-white)';
  } else if (stroke === 'minor' && fillStyle.default === '' && state === 'active') {
    strokeStyle.hover = '';
    stateStyle = 'bg-minor text-white shadow-md @hover:(bg-minor text-white)';
  }

  fillStyle = `${fillStyle.default} ${fillStyle.hover}`;
  strokeStyle = `${strokeStyle.default} ${strokeStyle.hover}`;

  if (!useHover) {
    fillStyle.hover = '';
    strokeStyle.hover = '';
    stateStyle.hover = '';
  }

  const className = `${baseStyle} ${sizeStyle} ${fillStyle} ${strokeStyle} ${stateStyle}`;

  return (
    <div className={className}>{text}</div>
  );
};

export default Tag;
