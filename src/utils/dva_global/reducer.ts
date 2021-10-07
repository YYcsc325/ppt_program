import { Slide, PPTElement } from '@/types/slides';
import { utils } from 'react-dtcomponents';
import { set, omit } from 'lodash';

import { DvaGlobalState } from './index';

interface RemoveElementPropData {
  id: string;
  propName: string | string[];
}

interface UpdateElementData {
  id: string | string[];
  props: Partial<PPTElement>;
}

export const reducers = {
  /** editor */

  setActiveElementIdList(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'activeElementIdList'>>,
  ) {
    if (payload?.activeElementIdList.length === 1) {
      return { ...state, handleElementId: payload?.activeElementIdList?.[0] };
    } else {
      return { ...state, handleElementId: '' };
    }
  },

  setHandleElementId(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'handleElementId'>>,
  ) {
    return { ...state, handleElementId: payload?.handleElementId };
  },

  setActiveGroupElementId(
    state: DvaGlobalState,
    {
      payload,
    }: ActionWithPayload<Pick<DvaGlobalState, 'activeGroupElementId'>>,
  ) {
    return { ...state, activeGroupElementId: payload?.activeGroupElementId };
  },

  setCanvasPercentage(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'canvasPercentage'>>,
  ) {
    return { ...state, canvasPercentage: payload?.canvasPercentage };
  },

  setCanvasScale(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'canvasScale'>>,
  ) {
    return { ...state, canvasScale: payload?.canvasScale };
  },

  setThumbnailsFocus(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'thumbnailsFocus'>>,
  ) {
    return { ...state, thumbnailsFocus: payload?.thumbnailsFocus };
  },

  setEditorAreaFocus(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'editorAreaFocus'>>,
  ) {
    return { ...state, editorAreaFocus: payload?.editorAreaFocus };
  },

  setDisableHotkeys(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'disableHotkeys'>>,
  ) {
    return { ...state, disableHotkeys: payload?.disableHotkeys };
  },

  setShowGridLines(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'showGridLines'>>,
  ) {
    return { ...state, showGridLines: payload?.showGridLines };
  },

  setCreatingElement(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'creatingElement'>>,
  ) {
    return { ...state, creatingElement: payload?.creatingElement };
  },

  setAvailableFonts(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'availableFonts'>>,
  ) {
    return { ...state, availableFonts: payload?.availableFonts };
  },

  setToolbarState(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'toolbarState'>>,
  ) {
    return { ...state, toolbarState: payload?.toolbarState };
  },

  setClipingImageElementId(
    state: DvaGlobalState,
    {
      payload,
    }: ActionWithPayload<Pick<DvaGlobalState, 'clipingImageElementId'>>,
  ) {
    return { ...state, clipingImageElementId: payload?.clipingImageElementId };
  },

  setRichTextAttrs(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'richTextAttrs'>>,
  ) {
    return { ...state, richTextAttrs: payload?.richTextAttrs };
  },

  setSelectedTableCells(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'selectedTableCells'>>,
  ) {
    return { ...state, selectedTableCells: payload?.selectedTableCells };
  },

  setIsScaling(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'isScaling'>>,
  ) {
    return { ...state, isScaling: payload?.isScaling };
  },

  setEditingShapeElementId(
    state: DvaGlobalState,
    {
      payload,
    }: ActionWithPayload<Pick<DvaGlobalState, 'editingShapeElementId'>>,
  ) {
    return { ...state, editingShapeElementId: payload?.editingShapeElementId };
  },

  /** slides */

  setTheme(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'theme'>>,
  ) {
    return { ...state, theme: payload?.theme };
  },

  setViewportRatio(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'viewportRatio'>>,
  ) {
    return { ...state, viewportRatio: payload?.viewportRatio };
  },

  setSlides(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'slides'>>,
  ) {
    return { ...state, slides: payload?.slides };
  },

  AddSlide(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<{ slide: Slide }>,
  ) {
    const slidesProps = utils.isArray(payload?.slide)
      ? payload?.slide
      : [payload?.slide];

    const addIndex = state.slideIndex + 1;
    const newSlides = [...state.slides];

    newSlides.splice(addIndex, 0, ...slidesProps);

    return { ...state, slideIndex: addIndex, slides: newSlides };
  },

  UpdateSlide(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<{ slide: Slide }>,
  ) {
    const slideIndex = state.slideIndex;
    const newSlides = [...state.slides];

    newSlides[slideIndex] = { ...newSlides[slideIndex], ...payload?.slide };

    return { ...state, slides: newSlides };
  },

  DeleteSlide(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<{ slideId: string }>,
  ) {
    const slidesId = utils.isArray(payload?.slideId)
      ? payload?.slideId
      : [payload?.slideId];
    const newSlides = [...state.slides];

    const deleteSlidesIndex = [];
    for (let i = 0; i < slidesId.length; i++) {
      const index = newSlides.findIndex((item) => item.id === slidesId[i]);
      deleteSlidesIndex.push(index);
    }

    let newIndex = Math.min(...deleteSlidesIndex);

    const maxIndex = newSlides.length - slidesId.length - 1;
    if (newIndex > maxIndex) newIndex = maxIndex;

    return {
      ...state,
      slideIndex: newIndex,
      slides: newSlides.filter((item) => !slidesId.includes(item.id)),
    };
  },

  setSlideIndex(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'slideIndex'>>,
  ) {
    return { ...state, slideIndex: payload?.slideIndex };
  },

  setSelectedSlidesIndex(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'selectedSlidesIndex'>>,
  ) {
    return { ...state, selectedSlidesIndex: payload?.selectedSlidesIndex };
  },

  AddElement(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<{ element: PPTElement | PPTElement[] }>,
  ) {
    const elements = utils.isArray(payload?.element)
      ? payload?.element
      : [payload?.element];

    const newSlides = [...state.slides];
    const slideIndex = state.slideIndex;

    const currentSlideEls = newSlides[slideIndex].elements;

    const newEls = [...currentSlideEls, ...elements];

    return {
      ...state,
      slides: [...set(newSlides, [slideIndex, 'elements'], newEls)],
    };
  },

  UpdateElement(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<UpdateElementData>,
  ) {
    const { id, props } = payload;

    const elIdList = typeof id === 'string' ? [id] : id;

    const newSlides = [...state.slides];
    const slideIndex = state.slideIndex;
    const slide = state.slides[slideIndex];

    const elements = slide.elements.map((el) => {
      return elIdList.includes(el.id) ? { ...el, ...props } : el;
    });

    return {
      ...state,
      slides: [...set(newSlides, [slideIndex, 'elements'], elements)],
    };
  },

  RemoveElement(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<RemoveElementPropData>,
  ) {
    const { id, propName } = payload;
    const propsNames = typeof propName === 'string' ? [propName] : propName;

    const newSlides = [...state.slides];
    const slideIndex = state.slideIndex;
    const slide = state.slides[slideIndex];

    const elements = slide.elements.map((el) => {
      return el.id === id ? omit(el, propsNames) : el;
    });

    return {
      ...state,
      slides: [...set(newSlides, [slideIndex, 'elements'], elements)],
    };
  },

  /** snapshot快照 */

  setSnapshotCursor(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'snapshotCursor'>>,
  ) {
    return { ...state, snapshotCursor: payload?.snapshotCursor };
  },

  setSnapshotLength(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'snapshotLength'>>,
  ) {
    return { ...state, snapshotLength: payload?.snapshotLength };
  },

  /** keyboard快捷键 */

  setCtrlKeyState(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'ctrlKeyState'>>,
  ) {
    return { ...state, ctrlKeyState: payload?.ctrlKeyState };
  },

  setShiftKeyState(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'shiftKeyState'>>,
  ) {
    return { ...state, shiftKeyState: payload?.shiftKeyState };
  },

  /** screen是否全屏演示 */

  setScreening(
    state: DvaGlobalState,
    { payload }: ActionWithPayload<Pick<DvaGlobalState, 'screening'>>,
  ) {
    return { ...state, screening: payload?.screening };
  },
};
