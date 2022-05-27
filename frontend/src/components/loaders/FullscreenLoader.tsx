import { animated, config, useSpring } from "react-spring";
import { AiOutlineLoading } from "react-icons/ai";

interface LoadingProps {
    text?: string;
}

function Text(props: LoadingProps) {
    const springProps = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0.2 },
        reset: true,
        loop: true,
        delay: 0,
        config: config.molasses
    })

    return <animated.p style={springProps}>{props.text ?? "Loading..."}</animated.p>
}

const FullscreenLoader = (loadingProps?: LoadingProps) => {
    const props = useSpring({
        to: {
            transform: 'rotate(0deg)'
        },
        from: {
            transform: 'rotate(360deg)'
        },
        loop: true,
        config: {
            duration: 850
        }
    })

    return (
        <div className="flex justify-center items-center h-screen flex-col gap-y-5">
            <animated.div className="w-fit text-6xl" style={props}><AiOutlineLoading className="text-limeyfy-600" /></animated.div>
            <Text text={loadingProps?.text} />
        </div>
    );
}

export default FullscreenLoader;