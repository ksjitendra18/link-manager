import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { Inter } from "@next/font/google";
import { useUserStore } from "../utils/userStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
const inter = Inter({
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  const setUserId = useUserStore((state) => state.setUserInfo);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("inside auth", uid);
      setUserId(uid);
    } else {
      console.log("not logged in ");
    }
  });

  // const auth = getAuth();
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       console.log("inside auth", uid);
  //       setUserId(uid);
  //     } else {
  //       console.log("not logged in ");
  //     }
  //   });
  // }, []);

  // const auth = getAuth();
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setUserId(user.uid);
  //       console.log("inside auth", user.uid);
  //     } else {
  //       console.log("not logged in ");
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <div className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
