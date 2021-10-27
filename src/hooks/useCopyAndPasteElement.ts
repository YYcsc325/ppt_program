import { useModel } from 'umi';
import useGetter from '@/hooks/useGetter';
import { copyText, readClipboard } from '@/utils/clipboard';
import { encrypt } from '@/utils/crypto';
import { message } from 'antd';
import usePasteTextClipboardData from '@/hooks/usePasteTextClipboardData';
import useDeleteElement from './useDeleteElement';

export default () => {
  const store = useModel('usePagesModel.index');
  const getter = useGetter();

  const activeElementIdList = store.storeData.activeElementIdList;
  const activeElementList = getter.activeElementList;

  const { pasteTextClipboardData } = usePasteTextClipboardData();
  const { deleteElement } = useDeleteElement();

  // 将选中元素数据加密后复制到剪贴板
  const copyElement = () => {
    if (!activeElementIdList.length) return;

    const text = encrypt(
      JSON.stringify({
        type: 'elements',
        data: activeElementList,
      }),
    );

    copyText(text).then(() => {
      store.setEditorAreaFocus(true);
    });
  };

  // 将选中元素复制后删除（剪切）
  const cutElement = () => {
    copyElement();
    deleteElement();
  };

  // 尝试将剪贴板元素数据解密后进行粘贴
  const pasteElement = () => {
    readClipboard()
      .then((text) => {
        pasteTextClipboardData(text);
      })
      .catch((err) => message.warning(err));
  };

  // 将选中元素复制后立刻粘贴
  const quickCopyElement = () => {
    copyElement();
    pasteElement();
  };

  return {
    copyElement,
    cutElement,
    pasteElement,
    quickCopyElement,
  };
};
