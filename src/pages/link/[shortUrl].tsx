import { doc, getDoc } from "firebase/firestore";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { GetServerSideProps } from "next";
import { useUserStore } from "../../utils/userStore";

const ShortUrlPage = () => {
  const [loading, setLoading] = useState(true);
  const [urlNotExist, setUrlNotExist] = useState(false);
  const [urlSlug, setUrlSlug] = useState<string | string[] | undefined>(
    undefined
  );

  return (
    <>
      {
        urlNotExist ? (
          <>
            <p className="p-3 ">
              No such link exist. Please recheck the link.{" "}
            </p>

            <button className="my-5 m-3 border-2 border-solid border-black rounded-lg py-3 px-5 ">
              <Link href="/">Back to home</Link>
            </button>
          </>
        ) : null
        // <p className="p-3 ">redirecting to the destination...</p>
      }
      {!urlNotExist && !loading ? (
        <p className="p-3 ">redirecting to the destination...</p>
      ) : null}
      {loading ? <p className="p-3 ">Loading...</p> : null}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("server");
  console.log(context.query);

  const linkQuery: string | string[] = context.query.shortUrl!;

  console.log("links is", linkQuery);
  const docRef = doc(db, "links", linkQuery as string);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return {
      redirect: {
        destination: `${docSnap.data().originalUrl}`,
        statusCode: 301,
      },
    };
  } else {
    console.log("No such document!");
    return {
      notFound: true,
    };
  }
};

export default ShortUrlPage;
