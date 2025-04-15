import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../redux/slice/modalSlice';

type ModalProps = {
  type?: string;
  title?: string;
  text?: string;
  btn?: {
    text?: string;
    url?: string; 
  }
  active?: boolean;
};

const Modal: React.FC<ModalProps> = () => {
  const modal = useSelector((state: { modal: ModalProps }) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if(modal.active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modal.active])

  const handleBtn = () => {
    if(modal.btn.url) {
      window.location.href = modal.btn.url;
    } else {
      dispatch(
        hideModal()
      )
    }
  }

  return (
    <>
      {/* 外捲軸 */}
      {modal.type === 'msg' && 
        <div className={`w-100vw h-100vh fixed top-0 left-0 right-0 flex flex-(justify-center) before:content-[''] before:w-100vw before:h-100vh before:bg-black/70 before:u-absolute-center before:z--1 u-transition-ease ${modal.active ? 'opacity-100 pointer-events-auto z-1000' : 'opacity-0 pointer-events-none z--99'}`}>
        <div className="w-100% h-100% overscroll-contain overflow-y-auto u-scrollbar-hidden flex flex-(justify-center) py-20">
          <div className="w-100% h-fit max-w-gutter rounded-20 bg-white p-40px overflow-hidden m-auto sm:max-w-400">
            <div className="u-flex-center flex-col gap-20">
              <div className="u-h3">{modal.title}</div>
              <div className="u-text">{modal.text}</div>
              <button type="button" className="rounded-4 bg-blue text-white p-8" onClick={handleBtn}>{modal.btn.text}</button>
            </div>
          </div>
        </div>
      </div>}

      {/* 內捲軸 */}
      {modal.type === 'inner' && 
        <div className={`w-100vw h-100vh fixed top-0 left-0 right-0 flex flex-(justify-center) before:content-[''] before:w-100vw before:h-100vh before:bg-black/70 before:u-absolute-center before:z--1 u-transition-ease ${modal.active ? 'opacity-100 pointer-events-auto z-1000' : 'opacity-0 pointer-events-none z--99'}`}>
        <div className="w-100% h-100% flex flex-(justify-center) py-20">
          <div className="w-100% h-100% max-w-gutter rounded-20 bg-white p-40px overflow-hidden sm:max-w-400">
            <div className="u-flex-center flex-col h-100% gap-20 overscroll-contain overflow-y-auto u-scrollbar-hidden">
              <div className="u-h3">{modal.title}</div>
              <div className="u-text h-100%">{modal.text}</div>
              <button type="button" className="rounded-4 bg-blue text-white p-8" onClick={handleBtn}>{modal.btn.text}</button>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};

export default Modal;
