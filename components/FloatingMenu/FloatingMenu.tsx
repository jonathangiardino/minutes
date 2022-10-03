import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
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
  BiParagraph,
} from "react-icons/bi";
import { GrBlockQuote } from "react-icons/gr";
import { MdHorizontalRule } from "react-icons/md";
import { FormattingBlock } from "../TipTap/TipTap";

// TEMP
const items = [
  {
    id: 0,
    name: "Paragraph",
    description: "New paragraph",
    url: "#",
    color: "bg-brand",
    icon: BiParagraph,
  },
  {
    id: 1,
    name: "Heading 1",
    description: "Section heading",
    url: "#",
    color: "bg-brand",
    icon: BiHeading,
  },
  {
    id: 2,
    name: "Heading 2",
    description: "Small heading",
    url: "#",
    color: "bg-brand",
    icon: null,
    iconText: "H2",
  },
  {
    id: 3,
    name: "Bullet List",
    description: "Add a Bullet List",
    url: "#",
    color: "bg-brand",
    icon: BiListUl,
  },
  {
    id: 4,
    name: "Numbered List",
    description: "Add a Numbered List",
    url: "#",
    color: "bg-brand",
    icon: BiListOl,
  },
  {
    id: 5,
    name: "Blockquote",
    description: "Add a Blockquote",
    url: "#",
    color: "bg-brand",
    icon: GrBlockQuote,
  },
  {
    id: 6,
    name: "Task",
    description: "Add a Todo list",
    url: "#",
    color: "bg-brand",
    icon: BiTask,
  },
  {
    id: 7,
    name: "Code Block",
    description: "Add a Code Block",
    url: "#",
    color: "bg-brand",
    icon: BiCode,
  },
  {
    id: 8,
    name: "Horizontal Rule",
    description: "Add Divider",
    url: "#",
    color: "bg-brand",
    icon: MdHorizontalRule,
  },
  // More items...
];

const FloatingMenu = ({
  open,
  setOpen,
  InsertNode,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  InsertNode: (block: FormattingBlock) => void;
}) => {
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? [...items]
      : items.filter((item) => {
          const words = item.name.split(" ");
          return words.some((word: string) =>
            word.toLowerCase().startsWith(query.toLowerCase())
          );
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
              <Dialog.Panel className="bg-gray-200 text-[#28282c] dark:bg-[#333338] dark:text-[#f8fafc] shadow-sm fixed bottom-20 w-[320px] md:w-[280px] transform overflow-hidden rounded-xl transition-all">
                <Combobox
                  onChange={(item: FormattingBlock) => {
                    setOpen(false);
                    InsertNode(item);
                  }}
                >
                  <div className="relative">
                    <Combobox.Input
                      className="h-12 w-full border-0 bg-transparent pl-6 pr-4 text-[#28282c] placeholder-gray-600 focus:ring-0 focus:outline-none text-base dark:text-[#f8fafc] dark:placeholder-gray-400"
                      placeholder="Search blocks..."
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                  <Combobox.Options
                    static
                    className="max-h-96 md:max-h-64 scroll-py-3 overflow-y-auto p-3"
                  >
                    {filteredItems.map((item) => (
                      <Combobox.Option
                        key={item.id}
                        value={item}
                        className={({ active }) =>
                          clsx(
                            "flex cursor-default select-none rounded-lg p-2",
                            active && "bg-gray-300 dark:bg-[#45454d]"
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
                            {item.icon ? (
                              <item.icon
                                className="h-6 w-6 text-gray-100"
                                aria-hidden="true"
                              />
                            ) : (
                              <div className="text-lg font-bold text-gray-100">
                                {item.iconText}
                              </div>
                            )}
                          </div>
                          <div className="ml-4 flex-auto">
                            <p
                              className={clsx(
                                "text-base font-medium text-[#28282c] dark:text-[#f8fafc]"
                              )}
                            >
                              {item.name}
                            </p>
                            <p
                              className={clsx(
                                "text-sm text-[#28282c] dark:text-[#f8fafc] opacity-75"
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
        className="bg-gray-200 hover:bg-gray-300 text-[#28282c] dark:bg-[#333338]
dark:text-[#f8fafc] dark:hover:bg-[#1d1d20] shadow-sm px-7 py-3 rounded-xl font-bold flex gap-12 items-center cursor-pointer hover:opacity-90 transition ease-out duration-300 focus:outline-brand text-base"
        onClick={() => setOpen(true)}
      >
        <div>Add blocks</div>{" "}
        <div className="bg-gray-100 text-gray-500 dark:bg-[#7d8082] dark:text-[#f8fafc] text-xs rounded-md py-1 px-2 font-bold">
          ⌘/
        </div>
      </button>
    </div>
  );
};

export default FloatingMenu;
