import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import Loading from "../components/loading";
import { useUserStore } from "../utils/userStore";

// this maps with firebase returned by firebase and
// return custom error messages
import { FIREBASE_ERRORS } from "../utils/firebaseErrors";
const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);

  const setupUserInfo = useUserStore((state) => state.setUserInfo);
  const userInfo = useUserStore((state) => state.userInfo);
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      setUserLoggedIn(userInfo !== null);
      setLoading(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [userInfo]);
  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    setError(false);
    setErrorMsg("");

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    console.log(email, password);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const signIn = await res.json();
      console.log("signin data", signIn);

      if (signIn.status === 500) {
        setError(true);
        setErrorMsg(signIn.error);
      }
      setupUserInfo(signIn.userId);
      router.push("/");
    } catch (err: any) {
      console.log("error", err);
    }

    passwordRef.current!.value = "";
  };

  if (loading) {
    return (
      <div className="mt-10 md:mt-40">
        <Head>
          <title>Login</title>
        </Head>
        <Loading />
      </div>
    );
  } else {
    if (userLoggedIn === true) {
      router.push("/");
    } else {
      return (
        <div className="mx-5 mt-10 flex justify-center h-[500px]">
          <Head>
            <title>Login</title>
          </Head>
          <div className="  md:max-w-[800px]  form p-6 md:p-8 md:px-16 rounded-[6px] flex justify-center  flex-col bg-primary text-white  m-auto ">
            <h2 className="font-bold text-3xl text-center md:text-left">
              Login{" "}
            </h2>
            <form onSubmit={handleLogin} className="w-[90%]">
              <div className="mb-6 mt-10">
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
                Login
              </button>
            </form>

            {error ? (
              <p className="error mt-6 rounded-lg bg-red-600 px-5 py-2 font-bold">
                {FIREBASE_ERRORS[errorMsg as keyof typeof FIREBASE_ERRORS]}
              </p>
            ) : null}

            <p className="mt-7">
              Don&#39;t have have an account?{" "}
              <Link href="/signup" className="font-bold">
                Signup
              </Link>
            </p>
          </div>
        </div>
      );
    }
  }
};

export default Login;
