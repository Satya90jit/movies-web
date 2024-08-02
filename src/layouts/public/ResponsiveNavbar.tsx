import { Collapse } from "@mui/material";
import { memo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { NavMenuItems } from "./Navbar";

const ResponsiveNavbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="lg:hidden py-4 cursor-pointer fixed top-0 bg-[#0A1121] shadow-md shadow-slate-800 w-full">
      <div className="h-full flex justify-between items-center w-full main-container">
        <div className="flex items-center gap-3">
          <img src="/favicon.ico" className="w-10 h-10" />
          <p className="text-slate-200 font-semibold">MOVIES WEB</p>
        </div>
        <div className="">
          <span onClick={() => setOpen(!open)} className="inline-block w-6">
            {open ? (
              <AiOutlineClose className="text-2xl text-white" />
            ) : (
              <BiMenuAltLeft className="text-3xl text-white" />
            )}
          </span>
        </div>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <article className="bg-[#0f1422] w-full shadow-sm max-h-[90vh] overflow-y-scroll">
          <section className="main-container w-full flex flex-col font-medium pt-6">
            <hr />
            <div className="w-full py-6 text-white text-lg">
              {NavMenuItems?.map((item) => (
                <div
                  key={item?.title}
                  onClick={() => setOpen(false)}
                  className="hover:bg-gray-900/50 rounded-lg px-3 py-2 common-transition"
                >
                  {item?.title}
                </div>
              ))}
            </div>
          </section>
        </article>
      </Collapse>
    </section>
  );
};

const MemorizeResponsiveNavbar = memo(ResponsiveNavbar);
export default MemorizeResponsiveNavbar;
