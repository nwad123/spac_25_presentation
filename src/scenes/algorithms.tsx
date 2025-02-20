import { Latex, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { all, beginSlide, delay, createRef, range, makeRef } from '@motion-canvas/core';

export default makeScene2D(function*(view) {
    // --- Intro slide ---
    const title = createRef<Txt>();
    const desc = createRef<Txt>();

    view.add(
        <>
            <Txt
                ref={title}
                text="Algorithms"
                fontSize={120}
                fontFamily="Arial"
                fill="white"
                opacity={0}
            />
            <Txt
                ref={desc}
                text={'"[A] set of step-by-step procedures or a list of rules to follow for completing a specific task or solving a particular problem"'}
                maxWidth={"80%"}
                fontSize={84}
                fontFamily="Arial"
                fill="white"
                opacity={0}
                textWrap
            />
        </>
    );
    // Algorithm Description
    // https://junilearning.com/blog/guide/what-are-algorithms/

    yield* all(
        title().opacity(0, 0).to(1, 1.0),
        beginSlide("intro")
    )

    // --- What is an algorithm --- 
    yield* all(
        delay(0.5, desc().opacity(0, 0).to(1, 1.0)),
        title().fontSize(72, 1.0),
        title().y(-400, 1.0),
        beginSlide("description")
    )

    // --- Map ---
    const rects: Rect[] = []
    const num_rects = 6 
    view.add(
        range(num_rects).map(i => (
            <Rect
                ref={makeRef(rects, i)}
                width={100}
                height={100}
                x={-(num_rects * 100 / 2) + 125 * i}
                opacity={0}
                fill="#88C0D0"
                radius={10}
            />
        )),
    );

    yield* all(
        beginSlide("map_intro"),
        title().text("Algorithms - map", 1.0),
        desc().text(`\
"Given a function and a sequence of elements, iterator over the sequence of \
elements and apply the function to each element, replacing the original value \
the element with the new value"`, 1.0),
    )

    const math = createRef<Latex>()
    view.add(<Latex ref={math} fill={'white'} y={250} scale={2.0}/>)
    yield* all(
        beginSlide("map_math"),
        desc().fontSize(60, 1.0),
        desc().y(-100, 1.0),
        math().tex('{{\\forall x \\in X, x^\\prime = f(x)}}', 1.0),
    )

    yield* all(
        beginSlide("map"),
        ...rects.map(rect => rect.opacity(1, 1)),
        desc().opacity(0, 1.0),
    )

    yield* all(
        beginSlide("map_anim"),
        ...rects.map(rect => rect.opacity(0.5, 0.25)),
        ...range(num_rects).map(i =>
            delay(i * 0.5, all(
                rects[i].scale(1.5, 0.25).wait(0.25).to(1, 0.25),
                rects[i].opacity(1, 0.25).wait(0.25).to(0.5, 0.25),
                delay(0.25, rects[i].fill("#ecc182", 0.25)),
                ),
            )
        ),
    )
});
