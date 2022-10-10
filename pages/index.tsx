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
        console.log("Update on focus");
        
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
