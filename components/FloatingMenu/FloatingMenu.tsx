import React, { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import {
  //   BiStrikethrough,
  //   BiBold,
  //   BiItalic,
  //   BiHighlight,
  //   BiUnderline,
  BiHeading,
  BiListUl,
  BiListOl,
  BiTask,
  BiCode,
} from "react-icons/bi";
import { GrBlockQuote } from "react-icons/gr";

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
    name: "Bullet List",
    description: "Add a Bullet List",
    url: "#",
    color: "bg-brand",
    icon: BiListUl,
  },
  {
    id: 3,
    name: "Numbered List",
    description: "Add a Numbered List",
    url: "#",
    color: "bg-brand",
    icon: BiListOl,
  },
  {
    id: 4,
    name: "Blockquote",
    description: "Add a Blockquote",
    url: "#",
    color: "bg-brand",
    icon: GrBlockQuote,
  },
  {
    id: 5,
    name: "Task",
    description: "Add a Todo list",
    url: "#",
    color: "bg-brand",
    icon: BiTask,
  },
  {
    id: 6,
    name: "Code Block",
    description: "Add a Code Block",
    url: "#",
    color: "bg-brand",
    icon: BiCode,
  },
  // More items...
];

const FloatingMenu = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const [query, setQuery] = useState("");
  const [selectedBlock, setSelectedBlock] = useState(items[0]);

  const filteredItems =
    query === ""
      ? [...items]
      : items.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="fixed bottom-4 left-4 max-w-[280px]">
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
              <Dialog.Panel className="bg-gray-200 text-[#28282c] shadow-sm fixed bottom-20 w-[280px] transform overflow-hidden rounded-xl transition-all">
                <Combobox
                  onChange={(item) => {
                    setSelectedBlock(item);
                    setOpen(false);
                  }}
                  defaultValue={selectedBlock}
                >
                  <div className="relative">
                    <Combobox.Input
                      className="h-12 w-full border-0 bg-transparent pl-6 pr-4 text-[#28282c] placeholder-gray-600 focus:ring-0 focus:outline-none text-sm"
                      placeholder="Search blocks..."
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                  <Combobox.Options
                    static
                    className="max-h-96 scroll-py-3 overflow-y-auto p-3"
                  >
                    {filteredItems.map((item) => (
                      <Combobox.Option
                        key={item.id}
                        value={item}
                        className={({ active }) =>
                          clsx(
                            "flex cursor-default select-none rounded-lg p-2",
                            active && "bg-gray-300"
                          )
                        }
                      >
                        <>
                          <div
                            className={clsx(
                              "flex h-10 w-10 flex-none items-center justify-center rounded-lg",
                              item.color
                            )}
                          >
                            <item.icon
                              className="h-6 w-6 text-gray-100"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-4 flex-auto">
                            <p
                              className={clsx(
                                "text-sm font-medium text-[#28282c]"
                              )}
                            >
                              {item.name}
                            </p>
                            <p
                              className={clsx(
                                "text-sm text-[#28282c] opacity-75"
                              )}
                            >
                              {item.description}
                            </p>
                          </div>
                        </>
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                  {query !== "" && filteredItems.length === 0 && (
                    <div className="py-4 px-6 text-center text-sm flkex flex-col items-center justify-center">
                      <p className=" text-gray-600 pb-10">No blocks found</p>
                    </div>
                  )}
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <button
        className="bg-gray-200 hover:bg-gray-300 text-[#28282c] shadow-sm px-7 py-3 rounded-xl font-bold flex gap-12 items-center cursor-pointer hover:opacity-90 transition ease-out duration-300 active:outline-none focus:outline-none"
        onClick={() => setOpen(true)}
      >
        <div>Add blocks</div>{" "}
        <div className="bg-gray-300 text-[#28282c] text-xs rounded-md py-1 px-2">
          ⌘/
        </div>
      </button>
    </div>
  );
};

export default FloatingMenu;
