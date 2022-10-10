import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { VscEye } from 'react-icons/vsc'
import { useSyncState } from '@/lib/contexts/syncContext'

const DateMenu = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const [query, setQuery] = useState('')
  const { selectedDate, setSelectedDate, allDocs } = useSyncState()

  const filteredItems =
    allDocs && query === ''
      ? [...allDocs]
      : allDocs.filter((item: any) => {
          const words = item.doc.date.split(' ')
          return words.some((word: string) =>
            word.toLowerCase().startsWith(query.toLowerCase()),
          )
        })

  return (
    <div className="fixed top-4 left-4 max-w-[320px]">
      <Transition.Root
        show={open}
        as={Fragment}
        appear
        afterLeave={() => setQuery('')}
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
              <Dialog.Panel className="bg-gray-200 dark:bg-[#333338] text-[#28282c] dark:text-[#f8fafc] shadow-sm fixed top-3 w-[320px] md:w-[280px] transform overflow-hidden rounded-xl transition-all">
                <Combobox
                  onChange={(item: any) => {
                    setOpen(false)
                    setSelectedDate(item.doc.date)
                  }}
                >
                  <div className="relative">
                    <Combobox.Input
                      className="h-12 w-full border-0 bg-transparent pl-6 pr-4 text-[#28282c] dark:text-[#f8fafc] placeholder-gray-600 dark:placeholder-gray-400 focus:ring-0 focus:outline-none text-base"
                      placeholder="Go to date..."
                      onChange={(event) => setQuery(event.target.value)}
                      onFocus={() =>
                        window?.innerWidth < 768 && window?.scrollTo(0, 100)
                      }
                      autoFocus
                    />
                  </div>
                  <Combobox.Options
                    static
                    className="max-h-96 md:max-h-64 scroll-py-3 overflow-y-auto p-1"
                  >
                    {filteredItems?.length &&
                    !filteredItems?.find(
                      (item: any) =>
                        item.doc.date === new Date().toDateString(),
                    ) ? (
                      <Combobox.Option
                        key={new Date().toDateString()}
                        value={{ doc: { date: new Date().toDateString() } }}
                        className={({ active }) =>
                          clsx(
                            'flex cursor-default select-none rounded-lg p-2',
                            active && 'bg-gray-300 dark:bg-[#45454d]',
                          )
                        }
                      >
                        <>
                          <div className="ml-4 flex gap-2 items-center flex-auto">
                            <p
                              className={clsx(
                                'text-lg md:text-base font-medium text-[#28282c] dark:text-[#f8fafc]',

                                'font-bold opacity-100',
                              )}
                            >
                              Today
                            </p>
                            <VscEye className="stroke-[1px]" />
                          </div>
                        </>
                      </Combobox.Option>
                    ) : null}
                    {filteredItems?.length
                      ? filteredItems.map((item: any) => (
                          <Combobox.Option
                            key={item.doc.date}
                            value={item}
                            className={({ active }) =>
                              clsx(
                                'flex cursor-default select-none rounded-lg p-2',
                                active && 'bg-gray-300 dark:bg-[#45454d]',
                              )
                            }
                          >
                            <>
                              <div className="ml-4 flex gap-2 items-center flex-auto">
                                <p
                                  className={clsx(
                                    'text-lg md:text-base font-medium text-[#28282c] dark:text-[#f8fafc]',
                                    item.doc.date === selectedDate
                                      ? 'font-bold opacity-100'
                                      : 'opacity-75',
                                  )}
                                >
                                  {item.doc.date === new Date().toDateString()
                                    ? 'Today'
                                    : item.doc.date}
                                </p>
                                {item.doc.date === selectedDate && (
                                  <VscEye className="stroke-[1px]" />
                                )}
                              </div>
                            </>
                          </Combobox.Option>
                        ))
                      : null}
                    {filteredItems.length === 0 && query== '' ? (
                      <Combobox.Option
                        key={new Date().toDateString()}
                        value={{ doc: { date: new Date().toDateString() } }}
                        className={({ active }) =>
                          clsx(
                            'flex cursor-default select-none rounded-lg p-2',
                            active && 'bg-gray-300 dark:bg-[#45454d]',
                          )
                        }
                      >
                        <>
                          <div className="ml-4 flex gap-2 items-center flex-auto">
                            <p
                              className={clsx(
                                'text-lg md:text-base font-medium text-[#28282c] dark:text-[#f8fafc]',

                                'font-bold opacity-100',
                              )}
                            >
                              Today
                            </p>
                            <VscEye className="stroke-[1px]" />
                          </div>
                        </>
                      </Combobox.Option>
                    ) : null}
                  </Combobox.Options>
                  {query !== '' && filteredItems.length === 0 && (
                    <div className="pt-1 px-6 text-center text-sm flex flex-col items-center justify-center">
                      <p className=" text-gray-600 dark:text-[#f8fafc] pb-6">
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
  )
}

export default DateMenu
