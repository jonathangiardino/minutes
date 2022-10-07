import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useHotkeys } from 'react-hotkeys-hook'
import Dropdown from '@/components/Header/Dropdown'
import { useUser } from '@/lib/contexts/authContext'
import { NextLink } from '@/components/shared/NextLink'

const Account = () => {
  const { user } = useUser()
  const router = useRouter()

  useHotkeys(
    'escape',
    () => {
      router.push('/')
    },
    {
      enableOnContentEditable: true,
      enableOnTags: ['INPUT', 'TEXTAREA', 'SELECT'],
    },
    [],
  )

  useEffect(() => {
    !user && router.push('/')
  }, [user])

  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <Head>
        <title>My account</title>
      </Head>
      <header className="w-full py-3 px-4 flex justify-between items-center lg:fixed z-50">
        <div className="flex gap-2 items-center">
          <NextLink href="/">
            <span className="font-bold text-xs tracking-tighter text-[#28282c] dark:text-[#f8fafc] hover:text-brand transition cursor-pointer duration-200 ease-out">
              &#8592; Go back
            </span>
          </NextLink>
          <div className="hidden md:flex bg-gray-100 dark:bg-[#7d8082] text-gray-500 dark:text-[#f8fafc] text-[10px] rounded-md py-1 px-2 font-bold">
            ESC
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Dropdown />
        </div>
      </header>
      <main className="flex flex-col gap-4 w-full max-w-[768px] flex-1 mt-8 lg:mt-24 px-4 mb-8">
        <div className="flex items-center gap-1">
          <span className="font-normal text-sm md:text-lg tracking-tighter text-[#28282c] dark:text-[#f8fafc] transition cursor-pointer duration-300 ease-out">
            Signed in as{''}
          </span>
          <span className="font-bold text-sm md:text-lg tracking-tighter text-[#28282c] dark:text-[#f8fafc] transition cursor-pointer duration-300 ease-out">
            {user?.email}
          </span>
        </div>
        <div className="rounded-md border-2 border-gray-200 dark:border-[#333338]">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-medium leading-6 text-[#28282c] dark:text-[#f8fafc]">
                  Manage plan
                </h3>
                <div className="mt-2 max-w-xl text-sm text-[#28282c] dark:text-[#f8fafc]">
                  <p>You are currently on the free plan.</p>
                </div>
              </div>
              <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-brand px-4 py-2 font-medium text-[#f8fafc] shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 sm:text-sm"
                >
                  Upgrade now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border-2 border-gray-200 dark:border-[#333338]">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-[#28282c] dark:text-[#f8fafc]">
              Payment method
            </h3>
            <div className="mt-5">
              <div className="rounded-md bg-gray-200 dark:bg-[#333338] px-6 py-5 sm:flex sm:items-start sm:justify-between">
                <h4 className="sr-only">Visa</h4>
                <div className="sm:flex sm:items-start">
                  <svg
                    className="h-8 w-auto sm:h-6 sm:flex-shrink-0"
                    viewBox="0 0 36 24"
                    aria-hidden="true"
                  >
                    <rect width={36} height={24} fill="#224DBA" rx={4} />
                    <path
                      fill="#fff"
                      d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                    />
                  </svg>
                  <div className="mt-3 sm:mt-0 sm:ml-4">
                    <div className="text-sm font-medium text-[#28282c] dark:text-[#f8fafc]">
                      Ending with 4242
                    </div>
                    <div className="mt-1 text-sm sm:flex sm:items-center">
                      <div>Expires 12/20</div>
                      <span
                        className="hidden sm:mx-2 sm:inline"
                        aria-hidden="true"
                      >
                        &middot;
                      </span>
                      <div className="mt-1 sm:mt-0">
                        Last updated on 22 Aug 2017
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-[#f8fafc] hover:bg-gray-300 text-[#28282c] dark:bg-[#28282c] dark:text-[#f8fafc] dark:hover:bg-[#1d1d20] bg-opacity-90 dark:bg-opacity-90 shadow-sm px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 sm:text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Account
