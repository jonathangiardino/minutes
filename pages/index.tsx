import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "@/components/Header";
import TipTap from "@/components/TipTap";

const Home: NextPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <Head>
        <title>minutes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <main className="flex w-full max-w-[768px] flex-1 mb-20">
        <TipTap selectedDate={selectedDate} />
      </main>
    </div>
  );
};

export default Home;
