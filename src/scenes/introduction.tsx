import { Rect, makeScene2D, Txt, Layout } from '@motion-canvas/2d';
import { all, beginSlide, createRef, delay } from '@motion-canvas/core';

export default makeScene2D(function*(view) {
    const title_backdrop = createRef<Rect>();
    const title = createRef<Txt>();

    view.add(
        <Rect
            ref={title_backdrop}
            fill={'#f3303f'}
            padding={[60, 50]}
            gap={20}
            radius={40}
            width={'70%'}
            height={'50%'}
            alignItems={'center'}
            smoothCorners>
            <Txt
                ref={title}
                fontFamily={'monospace'}
                fontSize={96}
                fill={'white'}
            />
        </Rect>
    );

    title().text('BEYOND THE FOR LOOP')
    yield* beginSlide('title_slide')

    const goals = `\
- Three key abstractions: sequences, iterators, ranges
- "Core" algorithms
- Algorithm composition 
- Short example 
- Real-world example`

    const goal_text = createRef<Txt>()
    view.add(<Txt ref={goal_text} fill={"white"} fontSize={48} lineHeight={72} />)
    yield* all(
        delay(0.5, goal_text().text(goals, 1.0)),
        title().fontSize(72, 1.0),
        title_backdrop().width('90%', 1.0),
        title_backdrop().height('10%', 1.0),
        title_backdrop().y(-450, 1.0),
    )
    yield* beginSlide('introduction')

});

