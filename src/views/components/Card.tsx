// components
import DefaultImg from '@/views/components/DefaultImg';
import LinkRange from '@/views/components/LinkRange';

type CardProps = {
  img: {
    url: string;
    defaultUrl: string;
    alt: string;
    className?: string;
  };
  content: {
    title: string;
    text: string;
  };
  link?: {
    href?: string;
    blank?: boolean;
  }
};

const Card: React.FC<CardProps> = ({ img, content, link }) => {
  return (
    <div className="group relative u-transition-ease">
      <div className="relative overflow-hidden mb-14 md:(mb-16)">
        <div className="u-ratio-[370x208]">
          <DefaultImg src={img.url} defaultSrc={img.defaultUrl} alt={img.alt} className={`u-img-ratio u-transition-ease group-hover:(translate-x--50% translate-y--50% scale-110 u-transition-ease)  ${img.className}`} />
        </div>
      </div>
      <div className="flex flex-wrap flex-justify-between mb-1">
        <h3 className="font-bold line-clamp-2">{content.title}</h3>
      </div>
      <div className="flex flex-wrap flex-justify-between">
        <p className="line-clamp-2">{content.text}</p>
      </div>
      {link && link.href && (<LinkRange href={link.href} blank={link.blank} />)}
    </div>
  );
};

export default Card;
