type LinkRangeProps = {
  href: string;
  blank?: boolean;
};

const LinkRange: React.FC<LinkRangeProps> = ({
  href = '#!',
  blank = false,
}) => {
  return (
    <>
      <a
        href={href}
        className="w-100% h-100% absolute top-0 left-0 z-10"
        target={blank ? '_blank' : undefined}
        rel={blank ? 'noopener noreferrer' : undefined}
      ></a>
    </>
  );
};

export default LinkRange;
