import { ArrowDropDownOutlined } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import MemorizeResponsiveNavbar from "./ResponsiveNavbar";

export const NavMenuItems = [
  { title: "Home", path: "/" },
  {
    title: "Browse Movies",
    subMenu: [
      { title: "Top Rated", path: "/" },
      { title: "New Releases", path: "/" },
      { title: "Genres", path: "/" },
      { title: "By Year", path: "/" },
    ],
  },
  { title: "Favorites", path: "/" },
  { title: "Trending", path: "/" },
  { title: "Watchlist", path: "/" },
  {
    title: "Community",
    subMenu: [
      { title: "Forums", path: "/" },
      { title: "Events", path: "/" },
    ],
  },
  { title: "Blog", path: "/" },
  { title: "About Us", path: "/" },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);
  const router = useRouter();

  const handleClick = (event: any, menu: any) => {
    setAnchorEl(event.currentTarget);
    setCurrentMenu(menu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentMenu(null);
  };

  const handleMenuClick = (path: string) => {
    router.push(path);
    handleClose();
  };

  const open = Boolean(anchorEl);
  return (
    <nav
      className={`bg-[#080c14] shadow-md shadow-slate-800 lg:h-20 items-center fixed top-0 justify-center flex lg:w-[99.2vw] w-full z-[999999]`}
    >
      <div className="main-container hidden lg:flex flex-row justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <img src="/favicon.ico" className="w-10 h-10" />
          <p className="text-slate-200 font-semibold">MOVIES WEB</p>
        </div>
        <ul className="flex flex-col sm:flex-row gap-4">
          {NavMenuItems?.map((item, index) => (
            <li key={index}>
              {item?.subMenu ? (
                <>
                  <Button
                    className="text-white hover:bg-[#111829] flex items-center capitalize"
                    onClick={(e) => handleClick(e, item?.title)}
                  >
                    {item.title}
                    <ArrowDropDownOutlined
                      className={`transition-transform duration-200 ${
                        currentMenu === item.title ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </Button>
                  <Menu
                    className="mt-5 shadow-none"
                    anchorEl={anchorEl}
                    open={open && currentMenu === item?.title}
                    onClose={handleClose}
                  >
                    {item.subMenu.map((subItem, subIndex) => (
                      <MenuItem
                        className="hover:bg-[#0A1121]  hover:text-white font-medium common-transition mx-2 rounded-md"
                        key={subIndex}
                        onClick={() => handleMenuClick(subItem?.path)}
                      >
                        {subItem.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button
                  className="text-white capitalize hover:bg-[#0A1121]  common-transition"
                  onClick={() => handleMenuClick(item?.path)}
                >
                  {item?.title}
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <MemorizeResponsiveNavbar />
    </nav>
  );
};

export default Navbar;
