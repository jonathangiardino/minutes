import React, { FC } from "react";
import Dropdown from "./Dropdown";

const Header: FC = () => {
  return (
    <nav className="w-full py-3 px-4 flex justify-between items-center">
      <div>
        <span className="font-semibold text-sm">
          {new Date().toDateString()}
        </span>
      </div>
      <Dropdown />
    </nav>
  );
};

export default Header;
