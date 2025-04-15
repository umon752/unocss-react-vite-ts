// components
import DefaultImg from './DefaultImg';

type HeaderProps = {
  img: {
    url: string;
    defaultUrl: string;
    alt: string;
    className?: string;
    ratio?: string; // 比例
  };
  content: {
    title: string;
  };
};

const Header: React.FC<HeaderProps> = ({ img, content }) => {
  const defaultRatio = '1920x500';
  const headerClass = `relative overflow-hidden u-ratio-[${img.ratio ? img.ratio : defaultRatio}]`;
  const imgClass = `${img.className ? img.className : ''}`;

  return (
    <>
      <header className={headerClass}>
        <DefaultImg src={img.url} defaultSrc={img.defaultUrl} alt={img.alt} className={`u-img-ratio z--1 ${imgClass}`} />
        <div className="g-container">
          <h2 className="u-h2">{content.title}</h2>
        </div>
      </header>
    </>
  );
};

export default Header;
