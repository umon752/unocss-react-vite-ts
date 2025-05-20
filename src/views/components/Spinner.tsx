type SpinnerProps = {
  active: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ active }) => {
  return (
    <>
      <div className={`w-[24px] h-[24px] text-main i-svg-spinners-gooey-balls-2 pointer-events-none u-transition-ease ${active ? 'opacity-100' : 'opacity-0'}`}></div>
    </>
  )
}

export default Spinner
