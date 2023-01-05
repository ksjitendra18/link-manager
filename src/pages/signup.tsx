import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import Loading from "../components/loading";
import { FIREBASE_ERRORS } from "../utils/firebaseErrors";
import { useUserStore } from "../utils/userStore";
const Signup = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const setupUserInfo = useUserStore((state) => state.setUserInfo);
  const userInfo = useUserStore((state) => state.userInfo);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    if (userInfo) {
      setUserLoggedIn(userInfo !== null);
      setLoading(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [userInfo]);

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();
    setError(false);
    setErrorMsg("");

    const userName = nameRef.current!.value;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          userName: userName,
          email,
          password,
        }),
      });
      const signUpData = await res.json();
      if (signUpData.status === 500) {
        setError(true);
        setErrorMsg(signUpData.error);
        return;
      }
      setupUserInfo(signUpData.userId);
      router.push("/");
    } catch (e) {
      console.log("error from signup");
      setError(true);
      setErrorMsg("Their is some error. Please try again later");
    }

    nameRef.current!.value = "";
    emailRef.current!.value = "";
    passwordRef.current!.value = "";
  };

  if (loading) {
    return (
      <div className="mt-10 md:mt-40">
        <Head>
          <title>Signup</title>
        </Head>
        <Loading />
      </div>
    );
  } else {
    if (userLoggedIn === true) {
      router.push("/");
    } else {
      return (
        <div className="w-full mt-10 flex justify-center h-[500px]">
          <Head>
            <title>Signup</title>
          </Head>
          <div className="  md:max-w-[800px]  form p-6 md:p-8 md:px-16 rounded-[6px] flex justify-center  flex-col bg-primary text-white  m-auto ">
            <h2 className="font-bold text-3xl text-center md:text-left">
              Signup{" "}
            </h2>
            <form onSubmit={handleSignup} className="w-[90%]">
              <div className="mb-6 mt-10 ">
                <label htmlFor="nameinput" className="block text-sm mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John"
                  required
                  id="nameinput"
                  className=" text-black px-2 py-1 h-[35px] rounded-[6px]"
                  ref={nameRef}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="emailinput" className="block text-sm mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@gmail.com"
                  required
                  id="emailinput"
                  className=" text-black px-2 py-1  h-[35px] rounded-[6px]"
                  ref={emailRef}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="passwordinput" className="block text-sm mb-1">
                  {" "}
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  id="passwordinput"
                  placeholder="6+ characters"
                  className=" text-black px-2 py-1 h-[35px] rounded-[6px]"
                  ref={passwordRef}
                />
              </div>
              <button className="bg-secondary px-5 py-2 font-bold rounded-lg">
                Signup
              </button>
            </form>

            {error ? (
              <p className="error mt-6 rounded-lg bg-red-600 px-5 py-2 font-bold">
                {FIREBASE_ERRORS[errorMsg as keyof typeof FIREBASE_ERRORS] ||
                  errorMsg}
              </p>
            ) : null}

            <p className="mt-7">
              Already have an account?{" "}
              <Link href="/login" className="font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      );
    }
  }
};

export default Signup;
