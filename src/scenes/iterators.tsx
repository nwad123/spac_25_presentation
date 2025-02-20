import { Code, Line, lines, makeScene2D, Rect, Txt, word, } from '@motion-canvas/2d';
import { all, beginSlide, createRef, DEFAULT } from '@motion-canvas/core';
import { CppCode } from '../nodes/CppCode';
import { RustCode } from '../nodes/RustCode';

export default makeScene2D(function*(view) {
    const title = createRef<Txt>();

    view.add(<Txt ref={title} fill={'white'} fontSize={96} />);

    // --- Introduction ---
    title().text('ITERATORS')
    yield* beginSlide("intro")

    // --- Definition ---
    const my_def = '"Iterators are an abstraction over an element and a location in a sequence"'
    const c_def = 'Iterators don\'t really exist, instead we use pointers'
    const cpp_def =
        '"Iterators are a generalization of pointers that allow a C++ program \
to work with different data structures in a uniform manner"'
    const rust_def =
        '"In Rust an iterator is essentially just a function which produces elements in a sequence"'

    const def = createRef<Txt>()
    view.add(<Txt ref={def} fill={'white'} textWrap maxWidth={"75%"} fontSize={84}/>)
    yield* all(
        title().y(-450, 0.3),
        title().fontSize(72, 0.3),
        def().text(my_def, 1.0),
    )
    yield* beginSlide("definition_cpp")

    // --- Example of Pointers as Iterators ---
    const c_ptr_for_loop_str = `\
int x[100] = {};
for (int* iterator = x; iterator < x + 100; iterator++) {
    // do something with iterator by dereferencing it
    *iterator = /* ... */;
}`
    const code = createRef<Code>()
    view.add(<CppCode ref={code} />)
    yield* all(
        def().y(-325, 0.5),
        def().scale(0.85, 0.5),
        code().code(c_ptr_for_loop_str, 1.0),
        title().text('Iterators - C', 0.5),
        def().text(c_def, 0),
        def().fontSize(48, 0.5)
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
        code().selection(
            word(1, 5, 18),
            0.6
        ),
    )
    yield* beginSlide("pointer_c_explain_init")

    yield* all(
        code().selection(
            word(1, 43, 11),
            0.6
        ),
        arrowLabel().text("iterator++", 0.6),
        arrowGroup().x(-575, 0.6),
    )
    yield* beginSlide("pointer_c_explain_increment")

    yield* all(
        code().selection(
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
        code().selection(DEFAULT, 0.6),
        title().text('Iterators - C++', 0.5),
        def().text(cpp_def, 0),
    )
    yield* beginSlide("pointer_c_finish_explain")

    // --- Transform to C++ Iterators ---
    yield* all(
        code().code.replace(
            lines(0),
            'std::/* data structure */ x = /* ... */;\n',
            1.0
        ),
    )
    yield* beginSlide("iter_cpp_ds")

    yield* all(
        code().code.replace(
            lines(1),
            'for (std::iterator i = x.begin(); i != x.end(); i++) {\n',
            1.0
        ),
        code().code.replace(
            code().findLastRange('iterator'),
            'i',
            1.0
        ),
        code().code.replace(
            code().findAllRanges('iterator').slice(-2)[0],
            'i',
            1.0
        ),
    )
    yield* beginSlide("iter_cpp_loop_begin_end")

    yield* all(
        code().code.replace(
            lines(1),
            'for (auto i = x.begin(); i != x.end(); i++) {\n',
            1.0
        )
    )
    yield* beginSlide("iter_cpp_loop_auto")

    yield* all(
        code().code.replace(
            lines(1),
            'for (auto& i : x) {\n',
            1.0
        ),
        code().code.replace(
            lines(2, 3),
            `\
    // do something with i directly
    i = /* ... */;
`,
            0.6)
    )
    yield* beginSlide("iter_cpp_loop_range")

    code().remove()

    // Link: https://doc.rust-lang.org/reference/expressions/loop-expr.html
    view.add(<RustCode ref={code} />)
    yield* all(
        code().code(`\
let x = /* some data structure */;

for iterator in x {
    // use iterator directly
}`, 1),
        title().text('Iterators - Rust', 0.5),
        def().text(rust_def, 0),
    )
    yield* beginSlide("iter_rust")

    code().remove()
    view.add(<CppCode ref={code} />)
    const ranges_def = '"A range is a data structure that can give you a iterator"'
    yield* all(
        title().text('Ranges', 0.5),
        def().text(ranges_def, 0),
        code().code(`\
std::vector v;
std::array a;
std::list l;
std::map m;
// ...`, 1.0
        ),
    )
    yield* beginSlide("ranges")
});
