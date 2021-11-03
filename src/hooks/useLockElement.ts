import { useModel } from 'umi';
import { PPTElement } from '@/types/slides';
import useHistorySnapshot from '@/hooks/useHistorySnapshot';

export default () => {
  const store = useModel('usePagesModel.index');

  const activeElementIdList = store.storeData.activeElementIdList;
  const currentSlide = store.getterData.currentSlide;

  const { addHistorySnapshot } = useHistorySnapshot();

  // 锁定选中的元素,并清空选中元素状态
  const lockElement = () => {
    const newElementList: PPTElement[] = JSON.parse(
      JSON.stringify(currentSlide.elements),
    );

    for (const element of newElementList) {
      if (activeElementIdList.includes(element.id)) element.lock = true;
    }
    store.updateSlide({ elements: newElementList });
    store.setActiveElementIdList([]);
    addHistorySnapshot();
  };

  /**
   * 解除元素的锁定状态,并将其设置为当前选择元素
   * @param handleElement 需要解锁的元素
   */
  const unlockElement = (handleElement: PPTElement) => {
    const newElementList: PPTElement[] = JSON.parse(
      JSON.stringify(currentSlide.elements),
    );

    if (handleElement.groupId) {
      for (const element of newElementList) {
        if (element.groupId === handleElement.groupId) element.lock = false;
      }
      return newElementList;
    }

    for (const element of newElementList) {
      if (element.id === handleElement.id) {
        element.lock = false;
        break;
      }
    }
    store.updateSlide({ elements: newElementList });
    store.setActiveElementIdList([handleElement.id]);
    addHistorySnapshot();
  };

  return {
    lockElement,
    unlockElement,
  };
};
