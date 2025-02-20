import { Code, Line, lines, makeScene2D, Rect, Txt, word, } from '@motion-canvas/2d';
import { all, beginSlide, createRef, DEFAULT } from '@motion-canvas/core';
import { CppCode } from '../nodes/CppCode';

export default makeScene2D(function*(view) {
    const title = createRef<Txt>();

    view.add(<Txt ref={title} fill={'white'} fontSize={96} />);

    // --- Introduction ---
    title().text('ITERATORS')
    yield* beginSlide("intro")

    // --- Introduction Joke --- 
    yield* title().text('ITERATORS (again...)', 1.0)
    yield* beginSlide("intro_joke")

    // --- Definition ---
    const my_def = '"Iterators are an abstraction over an element and a location in a sequence"'

    const cpp_def =
        '"Iterators are a generalization of pointers that allow a C++ program \
to work with different data structures in a uniform manner"'

    const def = createRef<Txt>()
    view.add(<Txt ref={def} fill={'white'} textWrap maxWidth={"75%"} />)
    yield* all(
        title().y(-450, 0.3),
        title().fontSize(72, 0.3),
        def().text(cpp_def, 1.0),
    )
    yield* beginSlide("definition_cpp")

    // --- Example of Pointers as Iterators ---
    const c_ptr_for_loop_str = `\
int x[100] = {};
for (int* iterator = x; iterator < x + 100; iterator++) {
    // do something with iterator by dereferencing it
    *iterator = /* ... */;
}`
    const c_ptr_for_loop_code = createRef<Code>()
    view.add(<CppCode ref={c_ptr_for_loop_code} />)
    yield* all(
        def().y(-325, 0.5),
        def().scale(0.85, 0.5),
        c_ptr_for_loop_code().code(c_ptr_for_loop_str, 1.0),
        title().text('ITERATORS - C', 0.5)
    )
    yield* beginSlide("pointer_cpp")

    // --- Explaining for-loop ---
    const squares = [];
    const num_squares = 10

    // Create 5 squares
    for (let i = 0; i < num_squares; i++) {
        squares.push(
            createRef<Rect>()
        );
    }

    // Add squares to view with initial properties
    squares.forEach((square, i) => {
        view.add(
            <Rect
                ref={square}
                width={100}
                height={100}
                x={-675 + (i * 150)}
                y={350}
                fill="#2d82b7"
                radius={4}
            />
        );
    });

    const arrowGroup = createRef<Rect>();
    const arrowLine = createRef<Line>();
    const arrowLabel = createRef<Txt>();

    view.add(
        <Rect ref={arrowGroup} x={-725} y={250}>
            <Line
                ref={arrowLine}
                points={[
                    [50, 0],
                    [50, 75]
                ]}
                stroke="white"
                lineWidth={20}
                endArrow
                arrowSize={30}
            />
            <Txt
                ref={arrowLabel}
                text="iterator"
                y={-40}
                x={50}
                fill="white"
                fontSize={56}
            />
        </Rect>
    );

    yield* all(
        c_ptr_for_loop_code().selection(
            word(1, 5, 18),
            0.6
        ),
    )
    yield* beginSlide("pointer_c_explain_init")

    yield* all(
        c_ptr_for_loop_code().selection(
            word(1, 43, 11),
            0.6
        ),
        arrowLabel().text("iterator++", 0.6),
        arrowGroup().x(-575, 0.6),
    )
    yield* beginSlide("pointer_c_explain_increment")

    yield* all(
        c_ptr_for_loop_code().selection(
            word(1, 24, 18),
            0.6
        ),
        arrowLabel().text("iterator", 0.6),
        arrowGroup().x(750, 0.5),
    )
    yield* beginSlide("pointer_c_explain_condition")

    squares.forEach((square) => {
        square().remove()
    })
    arrowGroup().removeChildren()
    arrowGroup().remove()

    yield* all(
        c_ptr_for_loop_code().selection(DEFAULT, 0.6),
        title().text('ITERATORS - C++', 0.5)
    )
    yield* beginSlide("pointer_c_finish_explain")

    // --- Transform to C++ Iterators ---
    yield* all(
        c_ptr_for_loop_code().code.replace(
            lines(0),
            'std::/* data structure */ x = /* ... */;\n',
            1.0
        ),
    )
    yield* beginSlide("iter_cpp_ds")

    yield* all(
        c_ptr_for_loop_code().code.replace(
            lines(1),
            'for (std::iterator i = x.begin(); i != x.end(); i++) {\n',
            1.0
        ),
        c_ptr_for_loop_code().code.replace(
            c_ptr_for_loop_code().findLastRange('iterator'),
            'i',
            1.0
        ),
        c_ptr_for_loop_code().code.replace(
            c_ptr_for_loop_code().findAllRanges('iterator').slice(-2)[0],
            'i',
            1.0
        ),
    )
    yield* beginSlide("iter_cpp_loop_begin_end")

    yield* all(
        c_ptr_for_loop_code().code.replace(
            lines(1),
            'for (auto i = x.begin(); i != x.end(); i++) {\n',
            1.0
        )
    )
    yield* beginSlide("iter_cpp_loop_auto")

    yield* all(
        c_ptr_for_loop_code().code.replace(
            lines(1),
            'for (auto& i : x) {\n',
            1.0
        ),
        c_ptr_for_loop_code().code.replace(
            lines(2, 3),
            `\
    // do something with i directly
    i = /* ... */;
`,
            0.6)
    )
    yield* beginSlide("iter_cpp_loop_range")
});
