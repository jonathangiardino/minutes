import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '@/components/Header'
import TipTap from '@/components/TipTap'
import { useUser } from '@/lib/contexts/authContext'

const Home: NextPage = () => {
  // const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toDateString(),
  );

  useEffect(() => {
    const updateToTodayView = () => {
      const data = JSON.parse(localStorage.getItem('minutes-data') || '')
      let updated = data.find(
        ({ date }: { date: string }) => date === new Date().toDateString(),
      )

      if (!updated) {
        setSelectedDate(new Date().toDateString())
      }
    }

    window.addEventListener('focus', updateToTodayView)
    return () => window.removeEventListener('focus', updateToTodayView)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <Head>
        <title>:minutes</title>
      </Head>

      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <main className="flex w-full max-w-[768px] flex-1 mb-24 lg:mb-20">
        <TipTap selectedDate={selectedDate} />
      </main>
    </div>
  )
}

export default Home
