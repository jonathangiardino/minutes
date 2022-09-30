import type { NextPage } from "next";
import Head from "next/head";
import Header from "@/components/Header";
import TipTap from "@/components/TipTap";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>minutes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex w-full max-w-[867px] flex-1 flex-col items-center justify-start">
        <TipTap />
      </main>
    </div>
  );
};

export default Home;
