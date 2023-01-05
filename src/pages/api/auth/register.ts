import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth, db } from "../../../utils/firebase";

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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: formData.userName,
      email: formData.email,
      createdAt: serverTimestamp(),
    });
    res.status(200).json({ userId: userCredential.user.uid });
  } catch (error: any) {
    res.status(200).json({ status: 500, error: error.code });
  }
}
