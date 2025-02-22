import { Code, Latex, lines, makeScene2D, Rect, Txt, View2D } from '@motion-canvas/2d';
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

    *filter(time: number, pred: (i: number) => boolean) {
        const t = time / this.rects.length;
        const t_half = t / 2;
        const size = this.rects.length;

        yield* all(
            ...range(size).map(i =>
                delay(i * t, all(
                    this.rects[i].scale(1.4, t_half).wait(t_half).to(1.0, t_half),
                    delay(t_half, all(
                        this.rects[i].fill(() => { if (pred(i)) { return green; } else { return blue; } }, t_half),
                    )),
                ))),
        )

        yield* all(
            ...range(size).filter(i => !pred(i)).map(i =>
                this.rects[i].scale(1.1, t_half),
            )
        )

        yield* all(
            ...range(size).filter(i => !pred(i)).map(i =>
                this.rects[i].scale(0.0, t),
            )
        )

        range(size).filter(i => !pred(i)).map(i => {
            this.rects[i].remove();
            this.txts[i].remove();
        })

        function deleteNotPred<T>(arr: T[], pred: (i: number) => boolean): T[] {
            const newArr: T[] = [];
            for (let i = 0; i < arr.length; i += 1) {
                if (pred(i)) {
                    newArr.push(arr[i]);
                }
            }
            return newArr;
        }

        this.rects = deleteNotPred(this.rects, pred)
        this.txts = deleteNotPred(this.txts, pred)

        const new_size = this.rects.length
        this.xs = get_sizing(new_size)

        yield* all(
            ...this.rects.map(rect => rect.x(rect.x().valueOf() * 1.05, t_half))
        )

        yield* waitFor(t_half)

        yield* all(
            ...range(new_size).map(i => (
                this.rects[i].x(this.xs[i], t_half)
            )),
        )

        yield* all(
            ...this.rects.map(rect => rect.fill(blue, t))
        )
    }
};

export default makeScene2D(function*(view) {
    const title = createRef<Txt>();
    view.add(<Txt ref={title} alignSelf={'center'} fontSize={96} fill={"white"} />)
    yield* all(
        title().text("Algorithms - filter", 1.0),
        beginSlide("intro"),
    )

    const desc = createRef<Txt>()
    view.add(<Txt ref={desc} alignSelf={'center'} width={"70%"} textWrap fill={"white"} textAlign={'center'} />)
    yield* all(
        beginSlide("filter_desc"),
        title().y(-400, 1.0),
        title().fontSize(72, 1.0),
        desc().text("Remove all elements that do not satisfy the predicate", 1.0),
    )

    const psuedo_code = createRef<Code>();
    view.add(<CppCode ref={psuedo_code} y={100} />)
    yield* all(
        beginSlide("filter_impl"),
        desc().y(-200, 1.0),
        psuedo_code().code(`\
auto filter(Sequence s, Predicate p)
{
    for (auto& element : s)
        if (not p(element))
            s.remove(element)
}`, 1.0),
    )

    // -- filter example -- 
    const size = 30
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
        beginSlide("filter_arr_2"),
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
        beginSlide("filter_ex"),
        code().code(`\
filter(s, is_even)
`, 1.0),
        arr.y(100, 1.0),
    )

    const is_even = (i: number) => ((i % 2) == 0);

    yield* all(
        beginSlide("filter_ex_1"),
        arr.filter(3.5, is_even),
    )

    yield* all(
        beginSlide("filter_ex_2"),
    )
    yield* all(
        title().opacity(0.0, 1.0),
        code().opacity(0.0, 1.0),
        arr.opacity(0.0, 1.0),
    )

});
