import { AiOutlineLoading } from "react-icons/ai"
import { animated, useSpring } from "react-spring"

interface SpinnerProps {
    color?: 'limeyfy' | 'dark' | 'light'
}

export const Spinner = (props: SpinnerProps) => {
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

    switch (props.color) {
        case "dark": {
            return (
                <div className={``}>
                    <animated.div className="w-fit text-xl" style={springProps}><AiOutlineLoading className="text-black" /></animated.div>
                </div>
            )
        }
        case "light": {
            return (
                <div className={``}>
                    <animated.div className="w-fit text-xl" style={springProps}><AiOutlineLoading className="text-white" /></animated.div>
                </div>
            )
        }
        default: return (
            <div className={``}>
                <animated.div className="w-fit text-xl" style={springProps}><AiOutlineLoading className="text-limeyfy-600" /></animated.div>
            </div>
        )
    }
}