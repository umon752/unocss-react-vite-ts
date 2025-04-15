//----------------------------
// 複製連結
//----------------------------
import { useDispatch } from 'react-redux';
import { showToast } from '../../../redux/slice/toastSlice';

// 複製功能(新)
function securedCopyToClipboard(text: string, dispatch: any) {
  navigator.clipboard.writeText(text)
  .then(() => {
    // 顯示 toast
    dispatch(
      showToast({
        text: '已複製',
        icon: 'i-material-symbols:content-copy'
      })
    )
    console.log('複製1');
  })
  .catch((error) => {
    console.error('Unable to copy to clipboard', error);
  })
}
  
// 複製功能(舊)
function unsecuredCopyToClipboard(text: string, dispatch: any) {
  const textArea = document.createElement('input');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    // 顯示 toast
    dispatch(
      showToast({
        text: '已複製',
        icon: 'i-material-symbols:content-copy'
      })
    )
    console.log('複製2');
  } catch (error) {
    console.error('Unable to copy to clipboard', error);
  }
  document.body.removeChild(textArea);
}

// 導出一個 React Hook
export function useCopyUrl() {
  const dispatch = useDispatch();
  return () => {
    const copyUrl = window.location.href;
    if (window.isSecureContext && navigator.clipboard) {
      securedCopyToClipboard(copyUrl, dispatch);
    } else {
      unsecuredCopyToClipboard(copyUrl, dispatch);
    }
  };
}