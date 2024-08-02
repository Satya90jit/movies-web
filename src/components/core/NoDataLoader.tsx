import { NODATA } from "@/assets/animation";
import Lottie from "react-lottie";
interface Props {
  image?: any;
  animeHight?: number;
  animeWidth?: number;
  text?: string;
}
const NoDataLoader = ({ image, animeHight, animeWidth, text }: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: image ? image : NODATA,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full flex flex-col justify-center items-center main-container">
      <div className="">
        <Lottie
          isPaused={false}
          isClickToPauseDisabled={true}
          options={defaultOptions}
          height={animeHight ? animeHight : 250}
          width={animeWidth ? animeWidth : 250}
        />
      </div>
      <span className="text-xl py-4 capitalize text-white tracking-wide">
        {text ? text : "No result found!"}
      </span>
    </div>
  );
};

export default NoDataLoader;
