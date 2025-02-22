import { Layout, makeScene2D, Rect, Txt, Img } from '@motion-canvas/2d';
import { all, beginSlide, chain, createRef } from '@motion-canvas/core';
import microwave from '../../images/microwave.jpg';

export default makeScene2D(function*(view) {
    const title = createRef<Txt>();

    view.add(<Txt ref={title} fill={'white'} fontSize={96} />);

    // --- Introduction Slide to Abstraction ---
    title().text('ABSTRACTION')
    yield* beginSlide("intro")

    // --- Definition of Abstraction ---
    const definition = createRef<Txt>();
    view.add(<Txt ref={definition} fill={"white"} maxWidth={"75%"} textWrap fontSize={84} />)

    // Wikipedia "Abstraction - Computer Science"
    const def_text = '"The process of generalizing concrete details to focus on details of greater importance"';

    yield* all(
        title().y(-450, 0.3),
        title().fontSize(72, 0.3),
        definition().text(def_text, 1.5),
    )
    yield* beginSlide("definition")

    // --- Example of Abstraction --- 
    definition().remove()
    const microwaveGroup = createRef<Layout>()
    const text = createRef<Txt>();
    const box = createRef<Rect>();

    view.add(
        <Layout ref={microwaveGroup}>
            <Rect
                ref={box}
                fill="#333333"
                radius={40}
                minWidth={"50%"}
                minHeight={"30%"}
                scale={0}
            />
            <Txt
                ref={text}
                fill="white"
                fontSize={56}
                fontFamily="sans-serif"
                text="Is a microwave an abstraction?"
                maxWidth={600}
                textAlign="center"
                opacity={0}
                textWrap
            />
        </Layout>
    );

    yield* all(
        box().scale(1, 1),
        text().opacity(1, 1)
    );
    yield* beginSlide("microwave_example")

    const image = createRef<Img>()
    view.add(<Img
        ref={image}
        src={microwave}
        scale={0}
        y={180}
    />)
    yield* all(
        microwaveGroup().y(-250, 1),
        box().scale(0.5, 1),
        text().fontSize(48, 1),
        image().scale(0.175, 1),
    )

    const ref = createRef<Txt>()
    view.add(
        <Txt
            ref={ref}
            text={`\
By Mrbeastmodeallday - Own work, CC BY-SA 4.0,
https://commons.wikimedia.org/w/index.php?curid=117071454`}
            textWrap
            y={500}
            fontSize={24}
            fill={"white"}
        />
    )
    yield* beginSlide("microwave_ex_1")

    yield* all(
        title().text("", 1.0),
        microwaveGroup().opacity(0.0, 1.0),
        box().opacity(0.0, 1.0),
        text().opacity(0.0, 1.0),
        text().text("", 1.0),
        image().opacity(0.0, 1.0),
    )

    yield* all(
        title().text("Rule of Seven", 1.0),
        ref().text("Bartosz Milewski, Category Theory for Progammers, Chapter 1", 1.0)
    )
    view.add(<Txt
        text={"One of the most cited papers in psychology, The Magical Number Seven, Plus or Minus Two, postulated that we can only keep 7 ± 2 “chunks” of information in our minds."}
        textWrap
        fontSize={48}
        fill={"white"}
        width={'70%'}
    />)

    yield* all(
        beginSlide("rule of two"),
    )
});
