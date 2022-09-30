import React, { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { BsExclamationSquareFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import {
//   BiStrikethrough,
//   BiBold,
//   BiItalic,
  BiHeading,
//   BiListUl,
//   BiListOl,
  BiTask,
//   BiHighlight,
//   BiUnderline,
} from "react-icons/bi";

// TEMP
const items = [
  {
    id: 1,
    name: "Header",
    description: "Section heading",
    url: "#",
    color: "bg-brand",
    icon: BiHeading,
  },
  {
    id: 2,
    name: "Task",
    description: "Add a Todo list",
    url: "#",
    color: "bg-brand",
    icon: BiTask,
  },
  // More items...
];

const FloatingMenu = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="fixed bottom-4 left-4">
      <Transition.Root
        show={open}
        as={Fragment}
        appear
      >
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          {/* <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
          </Transition.Child> */}

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
              <Dialog.Panel className="bg-[#28282c] text-white shadow-lg fixed bottom-20 w-[280px] transform divide-y divide-gray-100 overflow-hidden rounded-xl transition-all">
                <Combobox onChange={(item) => console.log(item)}>
                    <Combobox.Options
                      static
                      className="max-h-96 scroll-py-3 overflow-y-auto p-3"
                    >
                      {items.map((item) => (
                        <Combobox.Option
                          key={item.id}
                          value={item}
                          className={({ active }) =>
                            clsx(
                              "flex cursor-default select-none rounded-lg p-2",
                              active && "bg-[#44444b]"
                            )
                          }
                        >
                          {({ active }) => (
                            <>
                              <div
                                className={clsx(
                                  "flex h-10 w-10 flex-none items-center justify-center rounded-lg",
                                  item.color
                                )}
                              >
                                <item.icon
                                  className="h-6 w-6 text-white"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-4 flex-auto">
                                <p
                                  className={clsx(
                                    "text-sm font-medium text-white"
                                
                                  )}
                                >
                                  {item.name}
                                </p>
                                <p
                                  className={clsx(
                                    "text-sm text-white opacity-75",
                                  
                                  )}
                                >
                                  {item.description}
                                </p>
                              </div>
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <button className="bg-[#28282c] text-white shadow-lg px-7 py-3 rounded-xl font-bold flex gap-12 items-center cursor-pointer hover:opacity-90 transition ease-out duration-300" onClick={() => setOpen(true)}>
        <div>Add blocks</div>{" "}
        <div className="bg-[#44444b] text-white opacity-50 text-sm rounded-lg py-1 px-2">
          ⌘+/
        </div>
      </button>
    </div>
  );
};

export default FloatingMenu;
