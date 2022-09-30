import React, { FC } from "react";
import Dropdown from "./Dropdown";

const Header: FC = () => {
  return (
    <nav className="w-full py-4 px-4 flex justify-between items-center fixed">
      <div className="flex gap-1 items-center">
        <span className="font-semibold text-2xl tracking-tighter opacity-30">
          {new Date().toDateString()}
        </span>
      </div>
      <Dropdown />
    </nav>
  );
};

export default Header;
