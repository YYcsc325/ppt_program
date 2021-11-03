declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

// 全局Window模块定义
declare interface Window {}

declare var $: () => {};

declare function show(params: string): void;

/** 重新定义 HTMLElement */
interface HTMLElement {
  webkitRequestFullScreen(options?: FullscreenOptions): Promise<void>;
  mozRequestFullScreen(options?: FullscreenOptions): Promise<void>;
}

/** 重新定义 Document*/
interface Document {
  mozFullScreen: boolean;
  webkitIsFullScreen: boolean;
  webkitFullScreen: boolean;

  mozCancelFullScreen(): Promise<void>;
  webkitCancelFullScreen(): Promise<void>;
}
