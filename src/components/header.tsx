import Link from "next/link";
import React from "react";
import { useUserStore } from "../utils/userStore";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
const Header = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  const performLogout = useUserStore((state) => state.performLogout);

  const handleLogout = async () => {
    await signOut(auth);
    performLogout();
  };

  return (
    <header className="flex justify-between bg-primary h-[80px] text-white w-full p-5">
      <div className="logo">
        <Link href="/">
          <h1 className="text-2xl font-bold">Link Shortener</h1>
        </Link>
      </div>

      <nav>
        <ul className="flex text-xl gap-5">
          <li>
            <Link href="/">Home</Link>{" "}
          </li>
          {/* <li>
            <Link href="/links">Links</Link>
          </li> */}
          {userInfo !== null ? (
            <>
              <li>
                <Link href="/links">Links</Link>
              </li>
              <li className="cursor-pointer" onClick={handleLogout}>
                Logout
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
