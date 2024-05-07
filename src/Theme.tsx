import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import useThemeStore from "./lib/theme";

const Theme = () => {
  let [isOpen, setIsOpen] = useState(false);
  const setTheme = useThemeStore((state) => state.setTheme);
  const theme = useThemeStore((state) => state.theme);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <div className="w-8 h-8 lg:w-12 lg:h-12 border border-[#868686] rounded-full flex items-center justify-center">
          <div
            className={`w-6 h-6 lg:w-8 lg:h-8 bg-${theme} rounded-full`}
          ></div>
        </div>
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border  md:w-[427px] h-[263px] rounded-[32px] bg-[#EBEBEB]">
            <DialogTitle className="font-semibold text-center font-description text-lg md:text-2xl pt-2 bg-white rounded-t-[32px] py-2">
              Choose Theme
            </DialogTitle>
            <Description className="p-12 flex items-center justify-between space-x-4">
              {/* first color */}
              <div
                className="w-[88px] h-[88px] border border-[#868686] rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => changeTheme("[#E85382]")}
              >
                <div className="w-[74px] h-[74px] bg-[#E85382] rounded-full"></div>
              </div>
              {/* 2nd color */}
              <div
                className="w-[88px] h-[88px] border border-[#868686] rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => changeTheme("[#39BADF]")}
              >
                <div className="w-[74px] h-[74px] bg-[#39BADF] rounded-full"></div>
              </div>
              {/* third color */}
              <div
                className="w-[88px] h-[88px] border border-[#868686] rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => changeTheme("[#E1A725]")}
              >
                <div className="w-[74px] h-[74px] bg-[#E1A725] rounded-full"></div>
              </div>
            </Description>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Theme;
