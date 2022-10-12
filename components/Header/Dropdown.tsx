import React, { FC, Fragment } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import toast, { Toaster } from 'react-hot-toast'
import Avvvatars from 'avvvatars-react'
import { Menu, Transition } from '@headlessui/react'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { useUser } from '@/lib/contexts/authContext'
import { supabase } from '@/utils/supabaseClient'

const Dropdown: FC = () => {
  const router = useRouter()
  const { user } = useUser()

  const notifyLogOut = () =>
    toast('Successfully logged out.', {
      duration: 1500,
      // Styling
      style: {
        fontFamily: 'Helvetica Neue',
        fontSize: '14px',
        backgroundColor: '#3f67e0',
        color: '#f8fafc',
      },

      // Custom Icon
      icon: '👋',
    })

  const signOut = async (e: any) => {
    e.preventDefault()
    const { error } = await supabase.auth.signOut()

    if (!error) notifyLogOut()
  }

  return (
    <>
      <Menu as="div" className="relative flex">
        {user ? (
          <Menu.Button className="rounded-full cursor-pointer hover:shadow-2xl hover:opacity-90 transition ease-out duration-300 focus:outline-brand">
            <Avvvatars
              value={user?.email || 'Unauthenticated'}
              style="shape"
              size={34}
            />
          </Menu.Button>
        ) : (
          <Menu.Button className="h-8 w-8 rounded-full bg-gradient-to-t from-red-400 to-brand cursor-pointer hover:shadow-2xl hover:opacity-90 transition ease-out duration-300 focus:outline-brand" />
        )}
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
                  <p className="text-sm">Signed in as</p>
                  <p className="truncate text-sm  font-semibold">
                    {user?.email}
                  </p>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => router.push('/account')}
                        role="button"
                        className={clsx(
                          active
                            ? 'bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white'
                            : '',
                          'flex items-center gap-2 px-3 py-2 text-md md:text-sm rounded-md mx-1',
                        )}
                      >
                        Account
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="mailto:hello@jonathangiardino.com?subject=Minutes%20-%20%5BSupport%5D&body=Name%3A%0D%0ATimezone%3A%0D%0ALogged%20in%3F%3A%0D%0ADescribe%20your%20issue%3A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A*%20PS%20attach%20screenshots%20if%20possible!%20Thanks%2C%20Jonathan."
                        target="_blank"
                        className={clsx(
                          active
                            ? 'bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white'
                            : '',
                          'block px-3 py-2 text-md md:text-sm  rounded-md mx-1',
                        )}
                      >
                        Support
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="https://hello184477.typeform.com/to/H5WDSswS"
                        target="_blank"
                        className={clsx(
                          active
                            ? 'bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white'
                            : '',
                          'block px-3 py-2 text-md md:text-sm  rounded-md mx-1',
                        )}
                      >
                        Feedback
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1 px-1">
                  <form onSubmit={signOut}>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="submit"
                          className={clsx(
                            active
                              ? 'bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white'
                              : '',
                            'flex items-center gap-2  w-full px-3 py-2 text-left text-md md:text-sm rounded-md font-bold',
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
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => router.push('/login')}
                        role="button"
                        className={clsx(
                          active
                            ? 'bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white'
                            : '',
                          'flex items-center gap-2 px-3 py-2 text-md md:text-sm rounded-md mx-1 font-bold',
                        )}
                      >
                        <span>Sign in</span>
                        <FiLogIn />
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="mailto:hello@jonathangiardino.com?subject=Minutes%20-%20%5BSupport%5D&body=Name%3A%0D%0ATimezone%3A%0D%0ALogged%20in%3F%3A%0D%0ADescribe%20your%20issue%3A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A*%20PS%20attach%20screenshots%20if%20possible!%20Thanks%2C%20Jonathan."
                        target="_blank"
                        className={clsx(
                          active
                            ? 'bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white'
                            : '',
                          'block px-3 py-2 text-md md:text-sm  rounded-md mx-1',
                        )}
                      >
                        Support
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="https://hello184477.typeform.com/to/H5WDSswS"
                        target="_blank"
                        className={clsx(
                          active
                            ? 'bg-gray-300 text-gray-900 dark:bg-[#45454d] dark:text-white'
                            : '',
                          'block px-3 py-2 text-md md:text-sm  rounded-md mx-1',
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
  )
}

export default Dropdown
