import { LOADER } from "@/assets/animation";
import Lottie from "react-lottie";
interface Props {
  image?: any;
  animeHight?: number;
  animeWidth?: number;
  speed?: number;
}
const Loader = ({
  image,
  animeHight = 250,
  animeWidth = 200,
  speed = 1,
}: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: image ? image : LOADER,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-[45vh] w-full flex flex-col justify-center items-center">
      <Lottie
        options={defaultOptions}
        isPaused={false}
        isClickToPauseDisabled={true}
        height={animeHight}
        width={animeWidth}
        speed={speed}
      />
    </div>
  );
};

export default Loader;
