import Head from "next/head";
import LinkShortener from "../components/linkShortener";

export default function Home() {
 
  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="The best and fast URL Shortener." />
      </Head>
      {/* <div className="text-3xl text-red-900 font-bold">Hello World</div> */}
      <LinkShortener />
    </>
  );
}
