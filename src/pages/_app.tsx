import { Inter } from "@next/font/google";
import { onAuthStateChanged } from "firebase/auth";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../../styles/globals.css";
import Layout from "../components/layout";
import { auth } from "../utils/firebase";
import { useUserStore } from "../utils/userStore";
import NextNProgress from "nextjs-progressbar";
const inter = Inter({
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  const setUserId = useUserStore((state) => state.setUserInfo);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      setUserId(uid);
    } else {
      console.log("not logged in ");
    }
  });

  return (
    <div className={inter.className}>
      <NextNProgress />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
