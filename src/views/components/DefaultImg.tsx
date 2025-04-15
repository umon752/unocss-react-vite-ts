import { useRef, useEffect } from 'react'

type DefaultImgProps = {
  src: string;
  defaultSrc: string;
  alt: string;
  className?: string;
}

const DefaultImg: React.FC<DefaultImgProps> = ({ src = '', defaultSrc = '', alt = '', className }) => {
  const defaultImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (src === '' || src === null || src === undefined) {
      defaultImgRef.current!.src = defaultSrc;
    }
  }, [src, defaultSrc]);

  return (
    <>
      {src ? (
        <img src={src} ref={defaultImgRef} alt={alt} className={className} />
      ) : (
        <img src={defaultSrc} ref={defaultImgRef} alt={alt} className={className} />
      )}
    </>
  )
}

export default DefaultImg
