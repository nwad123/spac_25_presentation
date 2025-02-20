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
        definition().text(def_text, 1.0),
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
        box().scale(0, 0).to(1, 1),
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
    view.add(
        <Txt
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
});
