import React, { FC } from "react";
import Dropdown from "./Dropdown";

const Header: FC = () => {
  return (
    <nav className="w-full py-3 px-4 flex justify-between items-center fixed z-50 backdrop-blur-md">
      <div className="flex gap-1 items-center">
        <span className="font-bold text-xl tracking-tighter opacity-30 hover:opacity-40 transition cursor-pointer duration-300 ease-out">
          {new Date().toDateString()}
        </span>
      </div>
      <Dropdown />
    </nav>
  );
};

export default Header;
