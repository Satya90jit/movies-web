import { Movie, Send } from "@mui/icons-material";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdKeyboardArrowRight, MdOutlineMail } from "react-icons/md";

const QUICK_LINKS_ARR = [
  "Home",
  "About Us",
  "Browse Movies",
  "Top Rated",
  "New Releases",
  "Favorites",
];

const Footer = () => {
  return (
    <section className="bg-[#0A1121] overflow-hidden bg-[url('/Hero-BG.png')] bg-no-repeat bg-cover bg-center ">
      <aside className="pb-12 main-container">
        <div className="px-8 rounded-lg py-10 flex lg:flex-row flex-col justify-between lg:gap-60 gap-12 w-full bg-[#164e63] bg-opacity-40 my-16">
          <div className="flex lg:flex-row flex-col gap-5">
            <div className="lg:flex justify-start hidden">
              <span className="flex items-center justify-center lg:p-8 p-8 rounded-full text-white bg-gray-800/40">
                <Movie className="h-14 w-14" />
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-white text-xl">
                Subscribe to our Newsletter
              </h3>
              <p className="text-slate-400 text-base">
                Stay up-to-date with the latest news and updates from Noxe by
                subscribing to our newsletter. Be the first to know about our
                upcoming films, behind-the-scenes content, and exclusive
                promotions. Don't miss out on the magic of storytelling.
              </p>
            </div>
          </div>
          <div className="md:p-6 p-3 bg-cyan-950/90 shadow-md rounded-lg lg:w-[45rem] w-full border border-slate-700">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="focus:outline-none bg-gray-900/30 p-2 h-full text-sm text-white w-full flex-grow rounded-l-lg"
                />
                <span className="bg-cyan-800 common-transition hover:bg-cyan-700 h-full inline-block text-white text-sm py-1 px-2 rounded-r-lg">
                  <Send />
                </span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agree"
                  className="focus:outline-none bg-gray-900/30 p-2 text-sm text-white rounded"
                />
                <label htmlFor="agree" className="ml-2 text-slate-300 text-sm">
                  I agree to the Terms and Conditions
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* footer grid part  */}
        <aside className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-3">
              <img src="/favicon.ico" className="w-10 h-10" />
              <p className="text-slate-200 font-semibold">MOVIES WEB</p>
            </div>
            <p className=" text-slate-400  text-md tracking-wide">
              Movie-Web is your go-to platform for exploring and discovering
              your favorite movies. Browse our extensive collection and find
              your next favorite film.
            </p>
            <div className="flex items-center gap-4 text-gray-200">
              <a href="/" target="_blank" rel="noreferrer noopener">
                <FaFacebookF className="text-3xl hover:text-facebook hover:scale-110 common-transition" />
              </a>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <FaTwitter className="text-3xl  hover:text-twitter hover:scale-110 common-transition" />
              </a>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <FaInstagram className="text-3xl  hover:text-instagram hover:scale-110 common-transition" />
              </a>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <FaLinkedinIn className="text-3xl  hover:text-linkedin hover:scale-110 common-transition" />
              </a>
              <a href="" target="_blank" rel="noreferrer noopener">
                <FaYoutube className="text-3xl  hover:text-youtube hover:scale-110 common-transition" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-xl tracking-wide capitalize text-white pb-6">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {QUICK_LINKS_ARR?.map((item: any, index: number) => {
                return (
                  <a key={index}>
                    <div className="flex flex-row items-center gap-1 hover:text-[#5eead4] cursor-pointer transition-all ease-in-out duration-75 text-slate-400 capitalize">
                      <MdKeyboardArrowRight />
                      <p className="common-transition">{item}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold text-xl tracking-wide capitalize text-white pb-6">
              Contact Information
            </h4>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                <FiPhoneCall />
              </div>
              <a
                href="tel:+1-123-456-7890"
                className="flex flex-col gap-1 text-white"
              >
                <p>Phone Number</p>
                <span className=" text-slate-400 ">+1-123-456-7890</span>
              </a>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                <MdOutlineMail />
              </div>
              <a
                href="info@movie-web.com"
                className="flex flex-col gap-1 text-white"
              >
                <p>Email Us</p>
                <span className=" text-slate-400 ">info@movie-web.com</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-xl tracking-wide capitalize text-white pb-6">
              Location
            </h4>
            <p className=" text-slate-400 ">
              123 Movie Street, Film City, Hollywood, CA 90210
            </p>
            <div className="text-slate-400 ">
              <Link
                href="/"
                className="hover:text-slate-200 text-sm tracking-wider common-transition hover:underline cursor-pointer w-fit"
              >
                Privacy Policy
              </Link>
              <span className="px-2">|</span>
              <Link
                href="/"
                className="hover:text-slate-200 text-sm tracking-wider common-transition hover:underline cursor-pointer w-fit"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </aside>
      </aside>
      {/* Copy Right Reserve part */}
      <section className="bg-gray-950 w-full">
        <div className="main-container flex md:flex-row flex-col gap-3 py-4 items-center justify-between">
          <p className="text-center text-white">
            © {new Date().getFullYear()} Movie-Web. All rights reserved.
          </p>
          <div className="flex flex-row items-center text-white">
            <span className="text-center text-white capitalize">
              designed & developed by
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="hover:text-theme pl-2 text-white hover:underline"
              >
                Satyajit sahu.
              </a>
            </span>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Footer;
