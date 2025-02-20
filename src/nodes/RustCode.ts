import {Code, LezerHighlighter, withDefaults} from '@motion-canvas/2d';
import {parser} from '@lezer/rust';

const RustHighlighter = new LezerHighlighter(parser);

export const RustCode = withDefaults(Code, {
  highlighter: RustHighlighter,
});
