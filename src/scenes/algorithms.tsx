import { Code, Latex, lines, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { all, beginSlide, delay, createRef, range, makeRef, waitFor } from '@motion-canvas/core';
import { CppCode } from '../nodes/CppCode';

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
    const outline_rect = createRef<Rect>()
    const rects: Rect[] = []
    const num_rects = 10
    const total_width = num_rects * 100 + (num_rects - 1) * 25
    const blue = "#78C0D0"
    const green = "#2aad5a"
    const yellow = "#ecc182"
    view.add(
        <Rect
            ref={outline_rect}
            width={125 * num_rects + 50}
            height={175}
            fill={"#606060"}
            radius={20}
            opacity={0}
            smoothCorners
            y={100}
        />)
    view.add(
        range(num_rects).map(i => (
            <Rect
                ref={makeRef(rects, i)}
                width={100}
                height={100}
                x={-(total_width / 2) + 50 + 125 * i}
                y={100}
                opacity={0}
                fill={(() => { if (i == 3) { return green; } else { return blue; } })}
                radius={10}
            >
            </Rect>
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

    const code = createRef<Code>()
    view.add(<CppCode ref={code} y={50} alignSelf={'center'} />)
    yield* all(
        beginSlide("map_code"),
        code().code(`\
auto map(Sequence s, Function f) {
    for (auto& element : s)
        element = f(element);
}
`, 1.0),
        desc().opacity(0.0, 1.0),
    )
    desc().remove()

    yield* all(
        beginSlide("map_ex_func_0"),
        code().y(50, 1.0),
    )

    const code2 = createRef<Code>()
    view.add(<CppCode ref={code2} scale={0.8} y={50} x={450} alignSelf={'center'} />)
    yield* all(
        beginSlide("map_ex_func_1"),
        code2().code.append(`\
enum Square { Blue, Yellow, Green };

auto f(Square s) -> Square {
    if (s.is_blue())
        return Yellow;
    else 
        return s;
}

Sequence s = { Blue, Blue, Blue, 
               Green, /*...*/ };
`, 1.0),
        code().scale(0.8, 1.0),
        code().x(-450, 1.0),
    )

    const code3 = createRef<Code>()
    view.add(<CppCode ref={code3} y={-100} alignSelf={'center'} />)
    yield* all(
        code().opacity(0, 1.0),
        code2().opacity(0, 1.0),
        code3().code(`Sequence s = { Blue, Blue, Blue, Green, Blue, /*...*/ }`, 1.0),
        outline_rect().opacity(1, 1),
        beginSlide("map_ex_seq"),
        ...rects.map(rect => rect.opacity(1, 1)),
    )
    code().remove()
    code2().remove()

    yield* all(
        code3().code(`map(s, f)`, 1.0),
        beginSlide("map_ex_call"),
    )

    yield* all(
        beginSlide("map_ex_anim"),
        ...rects.map(rect => rect.opacity(0.8, 0.25)),
        ...range(num_rects).filter((i) => i != 3).map(i =>
            delay(i * 0.4, all(
                delay(0.2, rects[i].fill("#ecc182", 0.25)),
            ),
            )
        ),
        ...range(num_rects).map(i =>
            delay(i * 0.4, all(
                rects[i].scale(1.4, 0.2).wait(0.25).to(1, 0.2),
                rects[i].opacity(1, 0.2).wait(0.25).to(0.8, 0.2),
            ),
            ),
        ),
        delay((num_rects) * 0.4,
            all(
                ...range(num_rects).map(i =>
                    delay(i * (.4 / num_rects), all(
                        rects[i].opacity(1, (0.4 / num_rects)),
                    ),
                    )
                ),
            )
        )
    )

    yield* all(
        beginSlide("map_ex_code"),
    )

    yield* all(
        title().opacity(0.0, 1.0),
        ...rects.map(rect => rect.opacity(0, 1.0)),
        outline_rect().opacity(0, 1.0),
        code3().opacity(0, 1.0),
    )

});
