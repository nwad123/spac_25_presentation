import { makeScene2D, Txt, } from '@motion-canvas/2d';
import { beginSlide, createRef } from '@motion-canvas/core';

export default makeScene2D(function*(view) {
    const title = createRef<Txt>();

    view.add(<Txt ref={title} fill={'white'} fontSize={96} />);

    // --- Introduction Slide ---
    title().text('ITERATORS')
    yield* beginSlide("intro")

});
