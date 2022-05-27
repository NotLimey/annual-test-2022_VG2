import { AiOutlineLoading } from "react-icons/ai";
import { animated, config, useSpring } from "react-spring";

interface SmallLoaderProps {
    className?: string;
}

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

export const Loader: React.FC<SmallLoaderProps> = (props: SmallLoaderProps) => {
    const springProps = useSpring({
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
        <div className={`flex justify-center items-center flex-col gap-y-5 ${props.className}`}>
            <animated.div className="w-fit text-6xl" style={springProps}><AiOutlineLoading className="text-limeyfy-600" /></animated.div>
            <Text />
        </div>
    );
}

export default Loader;