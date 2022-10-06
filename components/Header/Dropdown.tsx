import React, { FC, Fragment, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";
import { Menu, Transition } from "@headlessui/react";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useUser } from "@/lib/contexts/authContext";
import { supabase } from "@/utils/supabaseClient";

const Dropdown: FC = () => {
  const { user } = useUser();

  const notifyLogOut = () =>
    toast("Successfully logged out.", {
      // Styling
      style: {
        fontFamily: "Helvetica Neue",
        fontSize: "14px",
        backgroundColor: "#3f67e0",
        color: "#f8fafc",
      },

      // Custom Icon
      icon: "👋",

      // Change colors of success/error/loading icon
    });

  const signOut = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();

    if (!error) notifyLogOut();
  };

  return (
    <>
      <Menu as="div" className="relative flex">
        <Menu.Button className="h-[39px] w-[39px] rounded-full bg-gradient-to-r from-red-400 to-brand cursor-pointer hover:shadow-2xl hover:opacity-90 transition ease-out duration-300" />
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 w-64 mt-12 origin-top-right bg-gray-200 dark:bg-[#333338] dark:text-[#f8fafc] rounded-lg shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-brand">
            {user ? (
              <>
                <div className="px-4 py-3">
                  <p className="text-sm ">Signed in as</p>
                  <p className="truncate text-sm  font-semibold">
                    {user?.email}
                  </p>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={clsx(
                          active
                            ? "bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white"
                            : "",
                          "block px-3 py-2 text-sm rounded-md mx-1"
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
                          active
                            ? "bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white"
                            : "",
                          "block px-3 py-2 text-sm  rounded-md mx-1"
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
                          active
                            ? "bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white"
                            : "",
                          "block px-3 py-2 text-sm  rounded-md mx-1"
                        )}
                      >
                        Feedback
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-2 px-1">
                  <form onSubmit={signOut}>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="submit"
                          className={clsx(
                            active
                              ? "bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white"
                              : "",
                            "flex items-center gap-2  w-full px-3 py-2 text-left text-sm rounded-md font-bold"
                          )}
                        >
                          <span>Sign out</span>
                          <FiLogOut />
                        </button>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </>
            ) : (
              <>
                <div className="py-1">
                  <Menu.Item as="div">
                    {({ active }) => (
                      <Link
                        href="/login"
                        passHref
                        className={clsx(
                          active
                            ? "bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white"
                            : "",
                          "flex items-center gap-2 px-3 py-2 text-sm rounded-md mx-1 font-bold"
                        )}
                      >
                        <a
                          className={clsx(
                            active
                              ? "bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white"
                              : "",
                            "flex items-center gap-2 px-3 py-2 text-sm rounded-md mx-1 font-bold"
                          )}
                        >
                          <span>Sign in</span>
                          <FiLogIn />
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={clsx(
                          active
                            ? "bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white"
                            : "",
                          "block px-3 py-2 text-sm  rounded-md mx-1"
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
                          active
                            ? "bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white"
                            : "",
                          "block px-3 py-2 text-sm  rounded-md mx-1"
                        )}
                      >
                        Feedback
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
      <Toaster position="bottom-right" />
    </>
  );
};

export default Dropdown;
