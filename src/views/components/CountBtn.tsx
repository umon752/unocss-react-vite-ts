import { useState, ChangeEvent } from 'react';

type CountProps = {
  defaultQty: number;
  minQty: number;
  maxQty: number;
};
const CountBtn: React.FC<CountProps>  = ({ defaultQty = 0, minQty = 0, maxQty = 0 }) => {
  const [qty, setQty] = useState(defaultQty);

  const minusQty = () => {
    if(qty > minQty) {
      setQty((prev) => prev - 1);
    } 
  }

  const plusQty = () => {
    if(qty < maxQty) {
      setQty((prev) => prev + 1);
    } 
  }

  const changeQty = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);

    if (!isNaN(value) && value >= minQty && value <= maxQty) {
      setQty(value);
    } else {
      console.error(`Invalid input: ${e.currentTarget.value} is not a valid number`);
    }
  }

  return (
    <div className="flex flex-(items-center)">
      <button type="button" className={`rounded-4 bg-blue-300 text-white p-8 ${qty <= minQty ? 'pointer-events-none opacity-50' : ''}`} onClick={minusQty}>-</button>
      <input type="text" value={qty} className="text-center" onChange={changeQty} />
      <button type="button" className={`rounded-4 bg-blue-300 text-white p-8 ${qty >= maxQty ? 'pointer-events-none opacity-50' : ''}`} onClick={plusQty}>+</button>
    </div>
  )
};

export default CountBtn;