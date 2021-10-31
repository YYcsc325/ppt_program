import { theme } from '@/mocks/theme';
import { slides } from '@/mocks/slides';
import { CreatingElement } from '@/types/edit';
import { ToolbarState } from '@/types/toolbar';
import { SYS_FONTS_TYPE } from '@/config/font';
import { defaultRichTextAttrs } from '@/utils/prosemirror/utils';

export const initStoreState = {
  /** 被选中的元素ID集合，包含 handleElementId */
  activeElementIdList: <string[]>[],

  /** 正在操作的元素ID */
  handleElementId: <string>'',

  /** 组合元素成员中，被选中可独立操作的元素ID */
  activeGroupElementId: <string>'',

  /** 画布可视区域百分比 */
  canvasPercentage: <number>90,

  /** 画布缩放比例（基于宽度1000px）*/
  canvasScale: <number>1,

  /** 左侧导航缩略图区域聚焦 */
  thumbnailsFocus: <boolean>false,

  /** 编辑区域聚焦 */
  editorAreaFocus: <boolean>false,

  /** 禁用快捷键 */
  disableHotkeys: <boolean>false,

  /** 显示网格线 */
  showGridLines: <boolean>false,

  /** 正在插入的元素信息，需要绘制插入的元素需要（文字、形状、线条） */
  creatingElement: <CreatingElement | null>null,

  /** 当前环境可用字体 */
  availableFonts: <SYS_FONTS_TYPE>[],

  /** 右侧工具栏状态 */
  toolbarState: <ToolbarState>'slideDesign',

  /** 可视区域比例，默认16 */
  viewportRatio: <number>0.5625,

  /** 主题样式 */
  theme: theme,

  /** 幻灯片页面数据 */
  slides: slides,

  /** 当前页面索引 */
  slideIndex: <number>0,

  /** 当前被选中的页面索引集合 */
  selectedSlidesIndex: <number[]>[],

  /** 历史快照指针 */
  snapshotCursor: <number>-1,

  /** 历史快照长度 */
  snapshotLength: <number>0,

  /** ctrl键按下状态 */
  ctrlKeyState: <boolean>false,

  /** shift键按下状态 */
  shiftKeyState: <boolean>false,

  /** 是否进入放映状态 */
  screening: <boolean>true,

  /** 当前正在裁剪的图片ID */
  clipingImageElementId: <string>'',

  /** 富文本状态 */
  richTextAttrs: defaultRichTextAttrs,

  /** 选中的表格单元格 */
  selectedTableCells: <string[]>[],

  /** 正在进行元素缩放 */
  isScaling: <boolean>false,

  /** 当前正处在编辑文字状态的形状ID */
  editingShapeElementId: <string>'',
};

export type InitStoreStateType = typeof initStoreState;
