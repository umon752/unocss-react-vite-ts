import { useEffect, useState } from 'react';

type LoadingProps = {};

const Loading: React.FC<LoadingProps> = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    if (document.readyState === 'complete') {
      // 如果頁面已經載入完畢，直接執行
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      <noscript>
        您的瀏覽器不支援 JavaScript 功能，若網頁功能無法正常使用時，請開啟瀏覽器
        JavaScript 狀態 (Your browser does not support Javascript. For full
        functionality of this site, please enable JavaScript in your browser.)
        <br />
      </noscript>

      <div
        className={`w-100vw h-100vh fixed top-0 left-0 right-0 bottom-0 bg-white u-transition-ease ${isLoaded ? 'opacity-0 z--99' : 'z-9999'}`}
      ></div>
    </>
  );
};

export default Loading;
