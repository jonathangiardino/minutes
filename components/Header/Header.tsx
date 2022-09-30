import React, { FC } from "react";
import Dropdown from "./Dropdown";

const Header: FC = () => {
  return (
    <nav className="w-full py-4 px-4 flex justify-between items-center">
      <div>
        <span className="font-extrabold text-xl opacity-10 tracking-tighter">
          {new Date().toDateString()}
        </span>
      </div>
      <Dropdown />
    </nav>
  );
};

export default Header;
