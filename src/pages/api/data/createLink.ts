import { doc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../utils/firebase";

interface UrlDataType {
  originalUrl: string;
  shortUrl: string;
  urlCreator?: string;
  createdAt: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const urlData: UrlDataType = req.body;

  // if link is being created by the user then no need to store the userId as the document is already stored by its id
  if (urlData.urlCreator !== "guest") {
    console.log("link is from auth user", urlData);
    const { originalUrl, shortUrl, createdAt } = urlData;
    await setDoc(doc(db, urlData.urlCreator!, urlData.shortUrl), {
      originalUrl,
      shortUrl,
      createdAt,
    });
  }
  await setDoc(doc(db, "links", urlData.shortUrl), urlData);

  res.status(200).json({ data: urlData, success: "true" });
}
