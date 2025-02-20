import { makeScene2D, Txt, } from '@motion-canvas/2d';
import { all, beginSlide, chain, createRef } from '@motion-canvas/core';

export default makeScene2D(function*(view) {
    view.fill('#222222')

    const title = createRef<Txt>();

    view.add(<Txt ref={title} fill={'white'} fontSize={96} />);

    // --- Introduction Slide to Abstraction ---
    title().text('ABSTRACTION')
    yield* beginSlide("intro")

    // --- Definition of Abstraction ---
    const definition = createRef<Txt>();
    view.add(<Txt ref={definition} fill={"white"} maxWidth={"75%"} textWrap fontSize={84} />)

    // Wikipedia "Abstraction - Computer Science"
    const def_text = '"The process of generalizing concrete details to focus on details of greater importance"';

    yield* all(
        title().y(-450, 0.3),
        title().fontSize(72, 0.3),
        definition().text(def_text, 1.0),
    )
    yield* beginSlide("definition")

    // --- Example of Abstraction --- 
    definition().remove()
    yield* beginSlide("example")
});
