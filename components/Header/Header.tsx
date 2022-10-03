import React, { FC, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import DateMenu from "../DateMenu";
import Dropdown from "./Dropdown";

const Header: FC<{ selectedDate: string; setSelectedDate: any }> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const [open, setOpen] = useState(false);

  // HOTKEYS
  useHotkeys(
    "command+g, ctrl+g",
    () => {
      setOpen(!open);
    },
    {
      enableOnContentEditable: true,
      enableOnTags: ["INPUT", "TEXTAREA", "SELECT"],
    },
    [open]
  );
  return (
    <nav className="w-full py-3 px-4 flex justify-between items-center lg:fixed z-50">
      <DateMenu
        open={open}
        setOpen={setOpen}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <button
        aria-label="Date button"
        className="flex gap-4 items-center focus:outline-brand"
        onClick={() => setOpen(!open)}
      >
        <span className="font-bold text-xl tracking-tighter text-gray-400 hover:text-gray-600 transition cursor-pointer duration-300 ease-out">
          {selectedDate}
        </span>
        <div className="bg-gray-100 text-gray-500 text-xs rounded-md py-1 px-2 font-bold">
          ⌘G
        </div>
      </button>
      <Dropdown />
    </nav>
  );
};

export default Header;
