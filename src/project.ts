import {makeProject} from '@motion-canvas/core';

import introduction from './scenes/introduction?scene';
import abstraction from './scenes/abstraction?scene';
import iterators from './scenes/iterators?scene';
import algorithm from './scenes/algorithms?scene';
import filter from './scenes/filter?scene';
import reduce from './scenes/reduce?scene';

import {Code, LezerHighlighter} from '@motion-canvas/2d';
import {parser} from '@lezer/cpp';

Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeProject({
  scenes: [introduction, abstraction, iterators, algorithm, filter, reduce],
});
