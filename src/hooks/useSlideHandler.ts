import { message } from 'antd';
import { useModel } from 'umi';
import { Slide } from '@/types/slides';
import useGetter from '@/hooks/useGetter';
import { createRandomCode } from '@/utils/common';
import { copyText, readClipboard } from '@/utils/clipboard';
import { encrypt } from '@/utils/crypto';
import { createElementIdMap } from '@/utils/element';
import { ACTION_KEYS } from '@/config/actionHotKey';

import useHistorySnapshot from '@/hooks/useHistorySnapshot';
import usePasteTextClipboardData from '@/hooks/usePasteTextClipboardData';

export default () => {
  const store = useModel('usePagesModel.index');
  const getters = useGetter();

  const slideIndex = store.storeData.slideIndex;
  const theme = store.storeData.theme;
  const slides = store.storeData.slides;
  const currentSlide = getters.currentSlide;

  const selectedSlidesIndex = [
    ...store.storeData.selectedSlidesIndex,
    slideIndex,
  ];
  const selectedSlides = slides.filter((item, index) =>
    selectedSlidesIndex.includes(index),
  );
  const selectedSlidesId = selectedSlides.map((item) => item.id);

  const { pasteTextClipboardData, addSlidesFromClipboard } =
    usePasteTextClipboardData();
  const { addHistorySnapshot } = useHistorySnapshot();

  // 重置幻灯片
  const resetSlides = () => {
    const emptySlide = {
      id: createRandomCode(8),
      elements: [],
      background: {
        type: 'solid',
        color: theme.backgroundColor,
      },
    };
    store.setSlideIndex(0);
    store.setActiveElementIdList([]);
    store.setSlides([emptySlide as any]);
  };

  /**
   * 移动页面焦点
   * @param command 移动页面焦点命令：上移、下移
   */
  const updateSlideIndex = (command: string) => {
    if (command === ACTION_KEYS.UP && slideIndex > 0) {
      store.setSlideIndex(slideIndex - 1);
    } else if (command === ACTION_KEYS.DOWN && slideIndex < slides.length - 1) {
      store.setSlideIndex(slideIndex + 1);
    }
  };

  // 将当前页面数据加密后复制到剪贴板
  const copySlide = () => {
    const text = encrypt(
      JSON.stringify({
        type: 'slides',
        data: selectedSlides,
      }),
    );

    copyText(text).then(() => {
      store.setThumbnailsFocus(true);
    });
  };

  // 尝试将剪贴板页面数据解密后添加到下一页（粘贴）
  const pasteSlide = () => {
    readClipboard()
      .then((text) => {
        pasteTextClipboardData(text, { onlySlide: true });
      })
      .catch((err) => message.warning(err));
  };

  // 创建一页空白页并添加到下一页
  const createSlide = () => {
    const emptySlide = {
      id: createRandomCode(8),
      elements: [],
      background: {
        type: 'solid',
        color: theme.backgroundColor,
      },
    };
    store.setActiveElementIdList([]);
    store.addSlide(emptySlide as any);
    addHistorySnapshot();
  };

  // 根据模板创建新页面
  const createSlideByTemplate = (slide: Slide) => {
    const { groupIdMap, elIdMap } = createElementIdMap(slide.elements);

    for (const element of slide.elements) {
      element.id = elIdMap[element.id];
      if (element.groupId) element.groupId = groupIdMap[element.groupId];
    }
    const newSlide = {
      ...slide,
      id: createRandomCode(8),
    };
    store.setActiveElementIdList([]);
    store.addSlide(newSlide as any);
    addHistorySnapshot();
  };

  // 将当前页复制一份到下一页
  const copyAndPasteSlide = () => {
    const slide = JSON.parse(JSON.stringify(currentSlide));
    addSlidesFromClipboard([slide]);
  };

  // 删除当前页，若将删除全部页面，则执行重置幻灯片操作
  const deleteSlide = (targetSlidesId = selectedSlidesId) => {
    if (slides.length === targetSlidesId.length) resetSlides();
    else store.deleteSlide(targetSlidesId);

    store.setSelectedSlidesIndex([]);

    addHistorySnapshot();
  };

  // 将当前页复制后删除（剪切）
  // 由于复制操作会导致多选状态消失，所以需要提前将需要删除的页面ID进行缓存
  const cutSlide = () => {
    const targetSlidesId = [...selectedSlidesId];
    copySlide();
    deleteSlide(targetSlidesId);
  };

  // 选中全部幻灯片
  const selectAllSlide = () => {
    const newSelectedSlidesIndex = Array.from(
      Array(slides.length),
      (item, index) => index,
    );
    store.setActiveElementIdList([]);
    store.setSelectedSlidesIndex(newSelectedSlidesIndex);
  };

  return {
    resetSlides,
    updateSlideIndex,
    copySlide,
    pasteSlide,
    createSlide,
    createSlideByTemplate,
    copyAndPasteSlide,
    deleteSlide,
    cutSlide,
    selectAllSlide,
  };
};
