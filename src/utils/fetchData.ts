import { collection, DocumentData, getDocs } from "firebase/firestore";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

interface linkArray {
  shortUrl: string;
  originalUrl: string;
}

import { db } from "../utils/firebase";

export const useFetchAllLinks = () => {
  const fetchAllLinks = async () => {
    // i = i+1
    // console.log("fetch call", i);
    let linksArray: linkArray[] | DocumentData = [];
    const linkRef = collection(db, "links");

    const docsSnap = await getDocs(linkRef);
    docsSnap.forEach((doc) => {
      linksArray.push(doc.data());
      // console.log(doc.data());
    });

    return linksArray;
  };

//   const { data, error } = useSWRImmutable("links", fetchAllLinks);
    const { data, error } = useSWR("links", fetchAllLinks, {
      revalidateOnFocus: false,
    //   revalidateIfStale: false,
 
//   revalidateOnReconnect: false
    });

  return data;
};



