import {makeProject} from '@motion-canvas/core';

import introduction from './scenes/introduction?scene';
import abstraction from './scenes/abstraction?scene';
import iterators from './scenes/iterators?scene';

import {Code, LezerHighlighter} from '@motion-canvas/2d';
import {parser} from '@lezer/cpp';

Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeProject({
  scenes: [introduction, abstraction, iterators],
});
