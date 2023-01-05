import { signOut } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../utils/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await signOut(auth);

  res.status(200).json({ success: true });
}
