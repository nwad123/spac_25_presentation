import { Code, is, Latex, lines, makeScene2D, Rect, Txt, View2D } from '@motion-canvas/2d';
import { all, beginSlide, delay, createRef, range, makeRef, waitFor } from '@motion-canvas/core';
import { CppCode } from '../nodes/CppCode';

const elem_width = 100
const elem_height = elem_width
const elem_padding = 25

const blue = "#78C0D0"
const dimmed_blue = "#034"
const green = "#2aad5a"
const yellow = "#ecc182"
const red = "#f33140"

function get_sizing(count: number) {
    const total_width = count * elem_width + (count - 1) * elem_padding
    const left_x = -((total_width / 2) - (elem_width / 2))

    return range(count).map(i => left_x + (i * (elem_width + elem_padding)))
}

class RectArr {
    rects: Rect[];
    txts: Txt[];
    xs: number[];

    constructor(size: number) {
        this.rects = Array<Rect>(size)
        this.txts = Array<Txt>(size)
        this.xs = get_sizing(size)
    }

    *opacity(level: number, time: number) {
        yield* all(
            ...this.rects.map(rect => rect.opacity(level, time))
        )
    };

    *y(val: number, time: number) {
        yield* all(
            ...this.rects.map(rect => rect.y(val, time))
        )
    }

    *reduce(time: number, init: number, op: (l: number, r: number) => number) {
        const t = time / this.rects.length;
        const t_half = t / 2;
        var size = this.rects.length;
        var count = 1;
        var acc = 0;

        while (size > 1) {
            yield* all(
                this.rects[0].scale(1.4, t_half),
                this.rects[1].scale(1.4, t_half),
            );

            const lx = this.rects[0].x().valueOf();
            const rx = this.rects[1].x().valueOf();
            const center = lx + ((rx - lx) / 2);

            acc = acc + count;
            count += 1;

            yield* all(
                this.rects[0].x(center, t_half),
                this.rects[1].x(center, t_half),
                this.rects[1].fill(green, t_half),
                this.txts[1].text(`${acc + count}`, t_half),
            );

            this.rects[0].opacity(0.0);
            this.rects[0].remove();
            this.txts[0].remove();
            this.rects.shift();
            this.txts.shift();

            size = this.rects.length;

            this.xs = get_sizing(size)

            yield* all(
                ...range(size).map(i => (
                    this.rects[i].x(this.xs[i], t_half)
                )),
            )
        }

        yield* all(
            this.rects[0].fill(blue, t),
            this.rects[0].scale(1.0, t)
        )
    }
};

export default makeScene2D(function*(view) {
    const title = createRef<Txt>();
    view.add(<Txt ref={title} alignSelf={'center'} fontSize={96} fill={"white"} />)
    yield* all(
        title().text("Algorithms - reduce", 1.0),
        beginSlide("intro"),
    )

    const desc = createRef<Txt>()
    view.add(<Txt ref={desc} alignSelf={'center'} width={"70%"} textWrap fill={"white"} textAlign={'center'} />)
    yield* all(
        beginSlide("reduce_desc"),
        title().y(-400, 1.0),
        title().fontSize(72, 1.0),
        desc().text("Given a starting value and a binary operation, apply the binary operation to each pair of values in the sequence with the initial value (also called the accumulator).", 1.0),
    )

    const psuedo_code = createRef<Code>();
    view.add(<CppCode ref={psuedo_code} y={180} scale={0.9} />)
    yield* all(
        beginSlide("reduce_impl"),
        desc().y(-220, 1.0),
        psuedo_code().code(`\
auto reduce
    (Sequence s, Value init, BinaryOperation op)
    -> Value
{
    auto accumulator = init;
    for (auto& element : s)
        accumulator = op(accumulator, element);

    return accumulator;
}`, 1.0),
    )

    // -- filter example -- 
    const size = 11
    var arr = new RectArr(size)
    view.add(
        range(size).map(i => (
            <Rect
                ref={makeRef(arr.rects, i)}
                width={elem_width}
                height={elem_height}
                x={arr.xs[i]}
                radius={10}
                fill={blue}
                opacity={0}
                y={100}
            >
                <Txt ref={makeRef(arr.txts, i)} text={i.toString()} fill={'white'} />
            </Rect>
        )),
    )

    yield* all(
        beginSlide("reduce_arr_2"),
        psuedo_code().opacity(0.0, 1.0),
        psuedo_code().y(-200, 1.0),
        desc().opacity(0.0, 1.0),
        desc().y(-350, 1.0),
        arr.opacity(1.0, 1.0),
        arr.y(0, 1.0),
    )

    const code = createRef<Code>()
    view.add(<CppCode ref={code} y={-100} />)

    yield* all(
        beginSlide("reduce_ex"),
        code().code(`\
reduce(s, 0, plus)`, 1.0),
        arr.y(100, 1.0),
    )

    const plus = (l: number, r: number) => (l + r);

    yield* all(
        beginSlide("reduce_ex_1"),
        arr.reduce(5.0, 0, plus),
    )

    yield* all(
        code().code.append(` == 66`, 1.0),
    )
    
    yield* all(
        beginSlide("reduce_ex_2"),
    )
});
