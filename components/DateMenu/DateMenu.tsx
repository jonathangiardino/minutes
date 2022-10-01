import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import useLocalStorageState from "use-local-storage-state";

const DateMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [minutes, setMinutes] = useLocalStorageState("minutes");
  const [query, setQuery] = useState("");

  const filteredItems =
    Array.isArray(minutes) && query === ""
      ? [...minutes]
      : Array.isArray(minutes) &&
        minutes.filter((item: any) => {
          return item.date.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="fixed bottom-4 left-4 max-w-[320px]">
      <Transition.Root
        show={open}
        as={Fragment}
        appear
        afterLeave={() => setQuery("")}
      >
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <div className="fixed inset-0 z-50 overflow-y-auto p-3">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-gray-200 text-[#28282c] shadow-sm fixed top-3 w-[320px] md:w-[280px] transform overflow-hidden rounded-xl transition-all">
                <Combobox
                  onChange={(date: string) => {
                    setOpen(false);
                  }}
                >
                  <div className="relative">
                    <Combobox.Input
                      className="h-12 w-full border-0 bg-transparent pl-6 pr-4 text-[#28282c] placeholder-gray-600 focus:ring-0 focus:outline-none text-base"
                      placeholder="Go to date..."
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                  <Combobox.Options
                    static
                    className="max-h-96 md:max-h-64 scroll-py-3 overflow-y-auto p-1"
                  >
                    {Array.isArray(minutes) &&
                      filteredItems.map((item: any) => (
                        <Combobox.Option
                          key={item.date}
                          value={item}
                          className={({ active }) =>
                            clsx(
                              "flex cursor-default select-none rounded-lg p-2",
                              active && "bg-gray-300"
                            )
                          }
                        >
                          <>
                            <div className="ml-4 flex-auto">
                              <p
                                className={clsx(
                                  "text-base font-medium text-[#28282c]"
                                )}
                              >
                                {item.date}
                              </p>
                            </div>
                          </>
                        </Combobox.Option>
                      ))}
                  </Combobox.Options>
                  {query !== "" && filteredItems.length === 0 && (
                    <div className="pt-1 px-6 text-center text-sm flex flex-col items-center justify-center">
                      <p className=" text-gray-600 pb-6">
                        No previous dates found
                      </p>
                    </div>
                  )}
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default DateMenu;
