import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../utils/firebase";

interface FormData {
  userName: string;
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const formData: FormData = JSON.parse(req.body);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    res.status(200).json({ userId: userCredential.user.uid });
  } catch (error: any) {
    res.status(200).json({ status: 500, error: error.code });
  }
}
