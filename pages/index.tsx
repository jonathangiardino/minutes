import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '@/components/Header'
import TipTap from '@/components/TipTap'
import { useUser } from '@/lib/contexts/authContext'
import { useSyncState } from '@/lib/contexts/syncContext'
import { getLogs } from '@/lib/supabase/handlers'

const Home: NextPage = () => {
  const { user } = useUser()
  const { setSelectedDate, setSyncedData } = useSyncState()

  useEffect(() => {
    const syncLogsFromDb = async () => {
      const { data, error } = await getLogs(user?.id)
      if (error) {
        console.log(error)
        return
      }

      setSyncedData([
        ...data.sort((a, b) => {
          const firsDate: any = new Date(a.date)
          const secondDate: any = new Date(b.date)
          return secondDate - firsDate
        }),
      ])
    }

    const updateToTodayView = () => {
      const data = JSON.parse(localStorage.getItem('minutes-data') || '')
      let updated = data.find(
        ({ date }: { date: string }) => date === new Date().toDateString(),
      )

      if (!updated) {
        setSelectedDate(new Date().toDateString())
      }
    }

    if (user) {
      syncLogsFromDb()
    }

    window.addEventListener('focus', updateToTodayView)
    return () => {
      window.removeEventListener('focus', updateToTodayView)
    }
  }, [user])

  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <Head>
        <title>:minutes</title>
      </Head>

      <Header />
      <main className="flex w-full max-w-[768px] flex-1 mb-24 lg:mb-20">
        <TipTap />
      </main>
    </div>
  )
}

export default Home
