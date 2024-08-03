import { KeyboardDoubleArrowUpOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed md:bottom-10 lg:right-10 bottom-6 right-4 h-12 w-12 flex justify-center items-center rounded-full bg-blue-800/90 text-white shadow-lg cursor-pointer transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <KeyboardDoubleArrowUpOutlined />
    </div>
  );
};

export default ScrollUp;
