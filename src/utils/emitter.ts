import mitt, { Emitter } from 'mitt';

export const EmitterEvents = {
  RICH_TEXT_COMMAND: 'RICH_TEXT_COMMAND',
  OPEN_CHART_DATA_EDITOR: 'OPEN_CHART_DATA_EDITOR',
} as const;

export interface RichTextCommand {
  command: string;
  value?: string;
}

type Events = {
  [EmitterEvents.RICH_TEXT_COMMAND]: RichTextCommand | RichTextCommand[];
  [EmitterEvents.OPEN_CHART_DATA_EDITOR]: void;
};

const emitter: Emitter<Events> = mitt<Events>();

export default emitter;
