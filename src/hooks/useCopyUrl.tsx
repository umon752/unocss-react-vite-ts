//----------------------------
// 複製連結
//----------------------------
import { useDispatch } from 'react-redux';
import { showToast } from '../redux/slice/toastSlice';
import { AppDispatch } from '../redux/store';

export const useCopyUrl = () => {
  const dispatch = useDispatch<AppDispatch>();

  const showCopyToast = (dispatch: AppDispatch) => {
    dispatch(
      showToast({
        text: '已複製',
        icon: 'i-material-symbols:content-copy',
      })
    );
  };

  const securedCopyToClipboard = async (
    text: string,
    dispatch: AppDispatch
  ): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      showCopyToast(dispatch);
    } catch (error) {
      console.error('無法複製到剪貼板:', error);
      // 如果安全複製失敗，嘗試使用不安全的方式
      unsecuredCopyToClipboard(text, dispatch);
    }
  };

  const unsecuredCopyToClipboard = (
    text: string,
    dispatch: AppDispatch
  ): void => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // 設置樣式使其不可見
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showCopyToast(dispatch);
      } else {
        throw new Error('複製命令執行失敗');
      }
    } catch (error) {
      console.error('無法複製到剪貼板:', error);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const copyUrl = (): void => {
    const copyUrl = window.location.href;

    if (window.isSecureContext && navigator.clipboard) {
      securedCopyToClipboard(copyUrl, dispatch);
    } else {
      unsecuredCopyToClipboard(copyUrl, dispatch);
    }
  };

  return copyUrl;
};
