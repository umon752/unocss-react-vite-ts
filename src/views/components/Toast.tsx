import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '@/redux/slice/toastSlice';

type ToastProps = {
  text?: string;
  active?: boolean;
  icon?: string;
};

const Toast: React.FC<ToastProps> = () => {
  const toast = useSelector((state: { toast: ToastProps }) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if(toast.active) {
      setTimeout(() => {
        dispatch(
          hideToast()
        )
      }, 3000)
    }
  }, [toast]);

  return (
    <>
      <div className={`min-w-214 fixed top-50% left-50% translate-x--50% translate-y--40% bg-white rounded-8 flex flex-col items-center shadow-md py-27 px-42 opacity-0 pointer-events-none z--99 u-transition-ease ${toast.active && 'opacity-100 pointer-events-auto translate-x--50% translate-y--50% z-9999 u-transition-ease'}`}>
        <div className={`${!toast.icon && 'none'} `}>
          <div className={`${toast.icon} text-blue-300`}></div>
        </div>
        <div className="text-center">{toast.text}</div>
      </div>
    </>
  );
};

export default Toast;
