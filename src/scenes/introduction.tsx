import { Rect, makeScene2D, Txt, Layout } from '@motion-canvas/2d';
import { all, beginSlide, createRef } from '@motion-canvas/core';

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
    view.add(<Txt ref={goal_text} fill={"white"} fontSize={48} lineHeight={72}/>)
    yield* all( 
        goal_text().text(goals, 0.3),
        title().fontSize(72, 0.3),
        title_backdrop().width('90%', 0.3),
        title_backdrop().height('10%', 0.3),
        title_backdrop().y(-450, 0.3),
    )
    yield* beginSlide('introduction')

});

