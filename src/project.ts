import {makeProject} from '@motion-canvas/core';

import introduction from './scenes/introduction?scene';
import iterators from './scenes/iterators?scene';
import abstraction from './scenes/abstraction?scene';
import iterators_2 from './scenes/iterators_2?scene';

import {Code, LezerHighlighter} from '@motion-canvas/2d';
import {parser} from '@lezer/cpp';

Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeProject({
  scenes: [introduction, iterators, abstraction, iterators_2],
});
