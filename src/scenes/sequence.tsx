import { Code, Latex, lines, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { all, beginSlide, delay, createRef, range, makeRef, waitFor } from '@motion-canvas/core';
import { CppCode } from '../nodes/CppCode';

export default makeScene2D(function*(view) {
    const title = createRef<Txt>();
    const desc = createRef<Txt>();

    view.add(
        <>
            <Txt
                ref={title}
                text="Sequence"
                fontSize={96}
                fontFamily="Arial"
                fill="white"
                opacity={0}
                y={-450}
            />
            <Txt
                ref={desc}
                text={'An abstraction over a data structure that can be accessed linearly.'}
                maxWidth={"80%"}
                fontSize={84}
                fontFamily="Arial"
                fill="white"
                opacity={0}
                textWrap
            />
        </>
    );
    yield* all(
        title().opacity(1.0, 1.0),
        desc().opacity(1.0, 1.0),
    )
    yield* beginSlide("sequence")
    yield* all(
        title().opacity(0, 1.0),
        desc().opacity(0, 1.0),
    )

    const code = createRef<Code>()
    view.add(<CppCode ref={code} scale={0.9}/>)
    yield* code().code(`\
// array {1, 2, 3}
int x[3] = {1, 2, 3};

// linked list {10, 5}
Node* head = { .data = 10, .tail = Node{ .data = 5, .tail = NULL}};

// binary tree {3, 5, 8}
Node* root = { .data = 5, 
                .l = Node{ .data = 3, .l = NULL, .r = NULL },
                .r = Node{ .data = 8, .l = NULL, .r = NULL }};
`, 1.0)
    yield* beginSlide("examples")
    
    yield* code().code(`\
// array {1, 2, 3}
std::array x = {1, 2, 3};

// linked list {10, 5}
std::list l = {10, 5};

// binary tree {3, 5, 8}
std::set s = {3, 5, 8};
`, 1.0)
    yield* beginSlide("cpp")
});
