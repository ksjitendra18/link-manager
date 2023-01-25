import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import useSWR from "swr";
import Loading from "../components/loading";
import copyToClipboard from "../utils/copyToClipboard";
import { db } from "../utils/firebase";
import { useUserStore } from "../utils/userStore";

interface linkArray {
  shortUrl: string;
  originalUrl: string;
  id?: string;
}
const AllLinks = () => {
  // const [links, setLinks] = useState<linkArray[] | DocumentData>([]);
  const userInfo = useUserStore((state) => state.userInfo);
  const router = useRouter();

  const fetchAllLinks = async () => {
    let linksArray: linkArray[] | DocumentData = [];

    const linkQuery = query(
      collection(db, userInfo!),
      orderBy("createdAt", "desc")
    );

    const docsSnap = await getDocs(linkQuery);
    docsSnap.forEach((doc) => {
      linksArray.push({ ...doc.data(), id: doc.id });
    });

    return linksArray;
  };

  const {
    data: links,
    mutate,
    error,
  } = useSWR(userInfo ? "links" : null, fetchAllLinks, {
    revalidateOnFocus: false,
  });

  const handleDelete = async (linkShortUrl: string) => {
    await deleteDoc(doc(db, userInfo!, linkShortUrl));
    await deleteDoc(doc(db, "links", linkShortUrl));
    mutate();
  };

  return (
    <div className="p-5">
      <Head>
        <title>All Links</title>
      </Head>
      <h2 className="text-3xl font-bold">All Links</h2>

      {links !== undefined ? (
        <div className="flex overflow-x-auto rounded-md mt-10 bg-gray-800  text-white">
          <div className=" flex  w-full">
            <div className="flex-1 ">
              <div className="h-[50px] flex items-center bg-[#374151] p-5">
                <h2 className="text-[#9CA3AF] text-sm font-semibold uppercase select-none">
                  Short Link
                </h2>
              </div>

              {links &&
                links.map((link: linkArray) => (
                  <div
                    key={link.shortUrl}
                    className="flex-1 min-w-max  link-item  border-b-2 border-gray-700 mt-3 pb-3 px-5"
                  >
                    <p className="mr-7">
                      {`${window.location.origin}/link/${link.shortUrl}`}
                    </p>
                  </div>
                ))}
            </div>
            <div className="flex-1">
              <div className="h-[50px] flex  items-center bg-[#374151] ">
                <h2 className="text-[#9CA3AF] text-sm font-semibold uppercase select-none">
                  Long Link
                </h2>
              </div>

              {links &&
                links.map((link: linkArray) => (
                  <div
                    key={link.shortUrl}
                    className="flex-1 min-w-max link-item border-b-2  border-gray-700 my-3 pb-3"
                  >
                    <p className="mr-5">{link.originalUrl}</p>
                  </div>
                ))}
            </div>
            <div className="flex-1 w-[30px]">
              <div className="h-[50px] flex  items-center bg-[#374151] ">
                <h2 className="text-[#9CA3AF] text-sm font-semibold uppercase">
                  Actions
                </h2>
              </div>

              {links &&
                links.map((link: linkArray) => (
                  <div
                    key={link.shortUrl}
                    className=" min-w-max  mr-2 link-item border-b-2  border-gray-700 my-3 pb-3"
                  >
                    <div className="flex gap-5 mr-5 cursor-pointer">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `${window.location.origin}/link/${link.shortUrl}`
                          )
                        }
                      >
                        Copy
                      </button>
                      <button>Edit</button>
                      <button
                        onClick={() => {
                          handleDelete(link.shortUrl);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default AllLinks;
