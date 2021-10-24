import { useModel } from 'umi';
import { PPTElement } from '@/types/slides';
import useHistorySnapshot from '@/hooks/useHistorySnapshot';
import { message } from 'antd';

export default () => {
  const store = useModel('usePagesModel.index');

  const { addHistorySnapshot } = useHistorySnapshot();

  const setLink = (handleElement: PPTElement, link: string) => {
    const linkRegExp =
      /^(https?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;
    if (!link || !linkRegExp.test(link)) {
      message.error('不是正确的网页链接地址');
      return false;
    }
    const props = { link };
    store.updateElement({ id: handleElement.id, props });
    addHistorySnapshot();

    return true;
  };

  const removeLink = (handleElement: PPTElement) => {
    store.removeElement({ id: handleElement.id, propName: 'link' });
    addHistorySnapshot();
  };

  return {
    setLink,
    removeLink,
  };
};
