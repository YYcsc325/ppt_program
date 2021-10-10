import { useModel } from 'umi';
import tinycolor from 'tinycolor2';
import { layouts } from '@/mocks/layout';

export default function useGetterModel() {
  const state = useModel('usePagesModel.index', (model) => model.storeData);

  return {
    currentSlide: () => {
      return state.slides[state.slideIndex] || null;
    },

    currentSlideAnimations: () => {
      const currentSlide = state.slides[state.slideIndex];
      if (!currentSlide) return null;
      const animations = currentSlide.animations;
      if (!animations) return null;

      const els = currentSlide.elements;
      const elIds = els.map((el) => el.id);
      return animations.filter((animation) => elIds.includes(animation.elId));
    },

    layouts: () => {
      const { themeColor, fontColor, fontName, backgroundColor } = state.theme;

      const subColor = tinycolor(fontColor).isDark()
        ? 'rgba(230, 230, 230, 0.5)'
        : 'rgba(180, 180, 180, 0.5)';

      const layoutsString = JSON.stringify(layouts)
        .replaceAll('{{themeColor}}', themeColor)
        .replaceAll('{{fontColor}}', fontColor)
        .replaceAll('{{fontName}}', fontName)
        .replaceAll('{{backgroundColor}}', backgroundColor)
        .replaceAll('{{subColor}}', subColor);

      return JSON.parse(layoutsString);
    },

    activeElementList: () => {
      const currentSlide = state.slides[state.slideIndex];
      if (!currentSlide || !currentSlide.elements) return [];
      return currentSlide.elements.filter((element) =>
        state.activeElementIdList.includes(element.id),
      );
    },

    handleElement: () => {
      const currentSlide = state.slides[state.slideIndex];
      if (!currentSlide || !currentSlide.elements) return null;
      return (
        currentSlide.elements.find(
          (element) => state.handleElementId === element.id,
        ) || null
      );
    },

    canUndo: () => {
      return state.snapshotCursor > 0;
    },

    canRedo: () => {
      return state.snapshotCursor < state.snapshotLength - 1;
    },

    ctrlOrShiftKeyActive: () => {
      return state.ctrlKeyState || state.shiftKeyState;
    },
  };
}
