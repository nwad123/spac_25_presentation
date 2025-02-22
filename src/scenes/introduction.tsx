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
            width={'80%'}
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

    title().text('ALGORITHMIC PROGRAMMING')
    yield* beginSlide('title_slide')

    const personal_intro = createRef<Txt>()
    view.add(<Txt ref={personal_intro} fill={"white"} fontSize={48} lineHeight={72} alignSelf={'center'} />)
   
    const personal =`\
Nick Waddoups 
Grad Student at USU
Interested in programming 
`

    yield* all(
        delay(0.5, personal_intro().text(personal, 1.0)),
        title().fontSize(72, 1.0),
        title_backdrop().width('90%', 1.0),
        title_backdrop().height('10%', 1.0),
        title_backdrop().y(-450, 1.0),
    )

    yield* beginSlide('introduction')
    const goals = `\
- Three key abstractions: sequences, iterators, ranges
- "Core" algorithms
- Algorithm composition 
- Short example 
- Real-world example`

    const goal_text = createRef<Txt>()
    view.add(<Txt ref={goal_text} fill={"white"} fontSize={48} lineHeight={72} />)
    yield* all(
        personal_intro().opacity(0.0, 1.0),
        delay(0.5, goal_text().text(goals, 1.0)),
    )
    yield* beginSlide('introduction')
    
    yield* all(
        title().opacity(0.0, 0.7),
        title_backdrop().y(-600, 0.7),
        goal_text().opacity(0.0, 0.7),
    )
});

