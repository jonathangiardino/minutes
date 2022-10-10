import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '@/components/Header'
import TipTap from '@/components/TipTap'
import { useUser } from '@/lib/contexts/authContext'
import { useSyncState } from '@/lib/contexts/syncContext'
import { addLog, deleteLog, getAllLogs } from '@/lib/localdb'

const Home: NextPage = () => {
  const { user } = useUser()
  const { selectedDate, setSelectedDate, setAllDocs, allDocs } = useSyncState()

  // deleteLog("9f1fd647-cacd-4e40-9d6c-4864b918b266", "1-2304698e24ac45f9d1072d9acb17eff3")
  console.log(allDocs)
  useEffect(() => {
    const getLogs = async () => {
      const logs = await getAllLogs()
      return logs
    }

    getLogs().then((localData) => {
      if (localData) {
        const sortedData = [
          ...localData.sort((a: any, b: any) => {
            const firsDate: any = new Date(a.doc.date)
            const secondDate: any = new Date(b.doc.date)
            return secondDate - firsDate
          }),
        ]

        setAllDocs([...sortedData])
      }
    })

    const updateToDate = async () => {
      if (allDocs) {
        let updated = allDocs?.find(
          ({ doc }: { doc: any }) => doc.date === new Date().toDateString(),
        )

        if (!updated) {
          setSelectedDate(new Date().toDateString())
        }
      }
    }

    window.addEventListener('focus', updateToDate)
    return () => {
      window.removeEventListener('focus', updateToDate)
    }
  }, [user, selectedDate])

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
