import { doc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../utils/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   * Todo: Take long url and return it with short url
   * If auth user made the link then store in links and user link collection
   */

  const urlData = req.body;

  if (urlData.urlCreator !== "guest") {
    console.log("link is from auth user", urlData);
    await setDoc(doc(db, urlData.urlCreator, urlData.shortUrl), urlData);
  }
  await setDoc(doc(db, "links", urlData.shortUrl), {
    urlData,
  });

  res.status(200).json({ name: "hello world" });
}
