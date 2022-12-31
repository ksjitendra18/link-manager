import { doc, setDoc, Timestamp } from "firebase/firestore";
import { customAlphabet } from "nanoid";
import { useRouter } from "next/router";
import React, { FormEvent, useRef, useState } from "react";
import { db } from "../utils/firebase";
import { useUserStore } from "../utils/userStore";

const LinkShortener: React.FC = () => {
  const [generateUrl, setGenerateUrl] = useState<boolean>(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [longUrl, setLongUrl] = useState<string | null>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const userInfo = useUserStore((state) => state.userInfo);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGenerateUrl(false);
    const urlValue = urlRef.current?.value;
    console.log(urlValue);

    const nanoid = customAlphabet("1234567890abcdef", 10);
    const shortUrlId = nanoid(7);

    console.log("path", window.location.href);

    console.log(shortUrlId);
    // const shortUrlValue = `${window.location.href}/shortUrlId`;
    setLongUrl(`${urlValue}`);
    setShortUrl(`${window.location.href}link/${shortUrlId}`);
    setGenerateUrl(true);

    const data = {
      originalUrl: urlValue,
      shortUrl: shortUrlId,
      createdAt: Timestamp.now(),
    };

    try {
      await setDoc(doc(db, userInfo!, shortUrlId), data);
      await setDoc(doc(db, "links", shortUrlId), { ...data, userId: userInfo });
    } catch (err: any) {
      console.log("error from create new link", err, err.message);
    }

    urlRef.current!.value = "";
  };

  const onInputClick = () => {
    console.log("clicked");

    setGenerateUrl(false);
  };
  return (
    <div className="flex h-[calc(100vh-80px)] w-full p-5 bg-primary text-text items-center justify-center flex-col">
      <h2 className="text-3xl md:text-5xl  text-secondary text-center font-bold mb-5 md:mb-10">
        The best URL Shortener
      </h2>

      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center mt-5 gap-5"
        >
          {/* <label htmlFor="url">Enter</label> */}
          <input
            type="url"
            required
            name="url"
            ref={urlRef}
            id="url"
            onClick={onInputClick}
            placeholder="Enter your URL here"
            className="px-3 py-2 rounded-md text-primary bg-text outline-none md:w-[390px]"
          />
          <button
            type="submit"
            className="bg-secondary text-text font-bold py-2 px-6 rounded-md  "
          >
            Shorten
          </button>
        </form>
      </div>

      {generateUrl ? (
        <div className="flex flex-col">
          <div className="mt-10 flex items-center gap-5">
            <h3 className="font-bold text-2xl ">Long URL: </h3>
            <span className="text-2xl border-solid border-b-2 cursor-pointer border-secondary">
              {longUrl}
            </span>
          </div>
          <div className="mt-10 flex items-center gap-5">
            <h3 className="font-bold text-2xl ">Short URL: </h3>
            <span className="text-2xl border-solid border-b-2 cursor-pointer border-secondary">
              {shortUrl}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default LinkShortener;
