import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../../styles/globals.css";
import Layout from "../components/layout";
import { useUserStore } from "../utils/userStore";
const inter = Inter({
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  const setUserId = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    async function fetchAuthStatus() {
      const res = await fetch("/api/auth/status");
      const data = await res.json();
      if (data.userAuth === true) {
        setUserId(data.userId);
      }
    }
    fetchAuthStatus();
  }, []);

  return (
    <div className={inter.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
