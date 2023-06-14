import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import LOGO_WHITE from "@/assets/logo_white.png";
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import ButtonStorke from "../button/ButtonStroke";
import CV from "../../assets/Resume_26_MAR_2023.pdf";
import { useLocation } from "react-router-dom";

type Props = {
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const navbarBackground = isTopOfPage ? "bg-black" : "bg-black drop-shadow";

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  return (
    <nav
      className={`${currentPage.includes("/work") && isTopOfPage ? "bg-transparent" : "flex"}`}
    >
      <div
        className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* LEFT SIDE */}
            <a href="/">
              <img alt="logo" width={"40px"} src={LOGO_WHITE} />
            </a>

            {/* RIGHT SIDE */}
            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <div className={`${flexBetween} gap-8 text-sm`}></div>
                <div className={`${flexBetween} gap-8`}>
                  <a href="/work">Work</a>
                  <a href="/about">About</a>
                  <ButtonStorke text="Resume" link={CV} />
                </div>
              </div>
            ) : (
              <button
                className="bg-secondary-500 rounded-full p-2"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <Bars3Icon className="h-6 w-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[280px] bg-secondary-100 drop-shadow-xl">
          {/* CLOSE ICON */}
          <div className="flex justify-end p-9">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="ml-[18%] flex flex-col gap-10 text-2xl">
            <a href="/work">Work</a>
            <a href="/about">About</a>
            <a href={CV} className={"text-primary-100"}>
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
