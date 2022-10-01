import React, { FC, Fragment } from "react";
import clsx from "clsx";
import { Menu, Transition } from "@headlessui/react";

const Dropdown: FC = () => {
  return (
    <Menu as="div" className="relative flex">
      <Menu.Button className="h-9 w-9 rounded-full bg-gradient-to-r from-red-400 to-brand cursor-pointer hover:shadow-2xl hover:opacity-90 transition ease-out duration-300" />
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 w-64 mt-12 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y">
          <div className="px-4 py-3">
            <p className="text-base ">Signed in as</p>
            <p className="truncate text-base  font-semibold">
              hello@jonathangiardino.com
            </p>
          </div>
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={clsx(
                    active ? "bg-gray-100 text-gray-900" : "",
                    "block px-4 py-2 text-base  rounded-md mx-1"
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={clsx(
                    active ? "bg-gray-100 text-gray-900" : "",
                    "block px-4 py-2 text-base  rounded-md mx-1"
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={clsx(
                    active ? "bg-gray-100 text-gray-900" : "",
                    "block px-4 py-2 text-base  rounded-md mx-1"
                  )}
                >
                  Feedback
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-2 px-1">
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={clsx(
                      active ? "bg-gray-100 text-gray-900" : "",
                      "block w-full px-4 py-2 text-left text-base  rounded-md"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown