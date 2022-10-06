import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Provider } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabaseClient";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import { FaMagic } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsTwitter } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";
import Icon from "@/components/shared/Icon";
import { useUser } from "@/lib/contexts/authContext";
import { FiZap } from "react-icons/fi";
import { BiError } from "react-icons/bi";

const Login = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const notifySubmit = () =>
    toast("Great job, email sent!", {
      // Styling
      style: {
        fontFamily: "Helvetica Neue",
        fontSize: "14px",
        backgroundColor: "#3f67e0",
        color: "#f8fafc",
      },

      // Custom Icon
      icon: <FiZap />,
    });

  const notifyError = () =>
    toast.error("Oops, something went wrong", {
      style: {
        fontFamily: "Helvetica Neue",
        fontSize: "14px",
        backgroundColor: "#d15b6f",
        color: "#f8fafc",
      },

      icon: <BiError />,
    });

  const signInWithEmail = async (e: any) => {
    e.preventDefault();
    let { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
        //TODO: add prod url
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/login"
            : "https://minutes-six.vercel.app/login",
      },
    });

    if (error) {
      notifyError();
      return;
    }

    setIsSubmitted(true);
    notifySubmit();
  };

  const signInWithProvider = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo:
        //TODO: add prod url
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/login"
            : "https://minutes-six.vercel.app/login",
      },
    });

    if (error) {
      notifyError();
      return;
    }
  };

  useEffect(() => {
    user && router.push("/");
  }, [user]);

  console.log(user);

  return (
    <div className="absolute inset-0">
      <Head>
        <title>Sign in</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="theme-color"
          content="#f8fafc"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#28282b"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <Toaster />
      <div className="w-screen max-w-full h-full flex justify-center items-center relative">
        <div className="absolute left-3 top-3 flex gap-4 items-center">
          <Icon type="logo" className="h-8 w-8" />
          <h2 className="text-md font-semibold tracking-tight text-[#28282b] dark:text-[#f8fafc]">
            Sign in to your account
          </h2>
        </div>
        <div className="absolute right-3 top-4">
          <Link href="/">
            <IoMdClose size={28} />
          </Link>
        </div>
        <div className="flex-1 max-w-sm px-6">
          <div className="flex min-h-full flex-col justify-center">
            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="py-2 sm:rounded-lg">
                {isSubmitted ? (
                  <div className="rounded-md bg-brand p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AiFillCheckCircle
                          className="h-5 w-5 text-[#f8fafc]"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-normal text-[#f8fafc]">
                          Check your email, you'll get a{" "}
                          <strong>magic link</strong> to sign in!
                        </h3>
                      </div>
                    </div>
                  </div>
                ) : null}

                {!isSubmitted ? (
                  <>
                    <form
                      className="space-y-4"
                      onSubmit={(e) => signInWithEmail(e)}
                    >
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-normal"
                        >
                          Email
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                            className="text-[#28282b] dark:text-[#f8fafc] bg-[#f8fafc] dark:bg-[#28282b] block w-full appearance-none rounded-md px-3 py-2 shadow-sm focus:border-brand focus:outline-none focus:ring-brand sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center items-center gap-2 rounded-md border border-transparent bg-brand py-2 px-4 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                        >
                          <span>Send magic link</span>
                          <FaMagic />
                        </button>
                      </div>
                    </form>

                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2">Or continue with</span>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-3">
                        <div>
                          <button
                            onClick={() => signInWithProvider("google")}
                            className="bg-gray-200 hover:bg-gray-300 text-[#28282c] dark:bg-[#333338] dark:text-[#f8fafc] dark:hover:bg-[#1d1d20] bg-opacity-90 dark:bg-opacity-90 shadow-sm inline-flex w-full justify-center rounded-md py-2 px-4 text-sm font-medium"
                          >
                            <span className="sr-only">Sign in with Google</span>
                            <FcGoogle className="h-5 w-5" />
                          </button>
                        </div>

                        <div>
                          <button
                            onClick={() => signInWithProvider("twitter")}
                            className="bg-gray-200 hover:bg-gray-300 text-[#28282c] dark:bg-[#333338] dark:text-[#f8fafc] dark:hover:bg-[#1d1d20] bg-opacity-90 dark:bg-opacity-90 shadow-sm inline-flex w-full justify-center rounded-md py-2 px-4 text-sm font-medium"
                          >
                            <span className="sr-only">
                              Sign in with Twitter
                            </span>
                            <BsTwitter color="#1DA1F2" className="h-5 w-5" />
                          </button>
                        </div>

                        <div>
                          <button
                            onClick={() => signInWithProvider("github")}
                            className="bg-gray-200 hover:bg-gray-300 text-[#28282c] dark:bg-[#333338] dark:text-[#f8fafc] dark:hover:bg-[#1d1d20] bg-opacity-90 dark:bg-opacity-90 shadow-sm inline-flex w-full justify-center rounded-md py-2 px-4 text-sm font-medium"
                          >
                            <span className="sr-only">Sign in with GitHub</span>
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="absolute bottom-6 max-w-xs">
                        <h2 className="text-sm font-normal tracking-tight text-[#28282c] dark:text-[#f8fafc]">
                          {/* <span className="text-brand">
                            &#9432; Why do I need to sign in?
                          </span> */}
                          <br />
                          &#9432; Once signed in, your notes will be synced with
                          all the devices you log into with the same account.
                        </h2>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
