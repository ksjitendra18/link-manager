import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

const auth = getAuth();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      res.status(200).json({ userAuth: true, userId: user.uid });
      console.log(user);
    } else {
      res.status(200).json({ userAuth: false });
    }
  });
}
