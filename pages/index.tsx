import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "@/components/Header";
import TipTap from "@/components/TipTap";

const Home: NextPage = () => {
  useEffect(() => {
    window && startScrolling();
  }, []);

  function startScrolling() {
    let bottomScroll = setInterval(() => {
      window.scrollBy(0, 2);
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        clearInterval(bottomScroll);
      }
    }, 1);
    return bottomScroll;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <Head>
        <title>minutes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex w-full max-w-[768px] flex-1 flex-col-reverse">
        <TipTap />
      </main>
    </div>
  );
};

export default Home;
