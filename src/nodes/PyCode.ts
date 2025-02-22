import {Code, LezerHighlighter, withDefaults} from '@motion-canvas/2d';
import {parser} from '@lezer/python';

const PyHighlighter = new LezerHighlighter(parser);

export const PyCode = withDefaults(Code, {
  highlighter: PyHighlighter,
});
