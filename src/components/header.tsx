import { signOut } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { useUserStore } from "../utils/userStore";
const Header = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  const performLogout = useUserStore((state) => state.performLogout);
  const [openNav, setOpenNav] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);

    performLogout();
  };

  // just a custom ListItem component which return <li></li>
  // this component is used only for mobile nav list items
  interface ListItemProps {
    children: React.ReactNode;
    className?: string | undefined;
    onClick?: () => void;
  }
  const ListItem = ({ className, onClick, children }: ListItemProps) => {
    function listOnClick() {
      setOpenNav(false);
      if (onClick) {
        onClick();
      }
    }
    return (
      <li className={className ? className : undefined} onClick={listOnClick}>
        {children}
      </li>
    );
  };

  return (
    <header className="flex justify-between bg-primary h-[80px] text-white w-full p-5">
      <div className="logo">
        <Link href="/">
          <h1 className="text-2xl font-bold">Link Manager</h1>
        </Link>
      </div>

      <nav className="hidden md:block">
        <ul className="flex text-xl gap-5">
          <li>
            <Link href="/">Home</Link>{" "}
          </li>
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

      <div
        className={`${
          openNav ? "active" : ""
        } hamburger  block md:hidden mt-1 cursor-pointer`}
        onClick={() => {
          setOpenNav((prev) => !prev);
        }}
      >
        <span className="bar block w-[30px] h-[4px] bg-white "></span>
        <span className="bar block w-[30px] mt-1 h-[4px] bg-white "></span>
        <span className="bar block w-[30px] mt-1 h-[4px] bg-white "></span>
      </div>

      {openNav && (
        <nav className="top-16 right-0 w-[100%] text-white absolute flex flex-col justify-center h-[300px] bg-secondary items-center md:hidden">
          <ul className="flex flex-col items-center gap-5 ">
            <li>
              <Link href="/">Home</Link>
            </li>
            {/* <li>About</li> */}
            {userInfo !== null ? (
              <>
                <ListItem>
                  <Link href="/links">Links</Link>
                </ListItem>
                <ListItem className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </ListItem>
              </>
            ) : (
              <ListItem>
                <Link href="/login">Login</Link>
              </ListItem>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};
export default Header;
