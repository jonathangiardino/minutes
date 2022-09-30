import type { NextPage } from "next";
import Head from "next/head";
import Header from "@/components/Header";
import TipTap from "@/components/TipTap";
import FloatingMenu from "@/components/FloatingMenu";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <Head>
        <title>minutes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex w-full max-w-[768px] flex-1 flex-col items-center justify-start">
        <TipTap />
      </main>

      <FloatingMenu />
    </div>
  );
};

export default Home;
