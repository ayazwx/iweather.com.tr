"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Button from "./Button";

const navItems = [
  {
    name: "Home",
    icon: "/icons/apps-icon.svg",
    path: "/",
  },
  {
    name: "Stars",
    icon: "/icons/star.svg",
    path: "/stars",
  },
  {
    name: "Calendar",
    icon: "/icons/calendar.svg",
    path: "/calendar",
  },
  {
    name: "Settings",
    icon: "/icons/settings.svg",
    path: "/settings",
  },
];

const Navbar = () => {
  const [active, setActive] = useState<string>();
  const [showSignOut, setShowSignOut] = useState(false);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    console.log("logout");
    // firebase.auth().signOut().then(() => {
    //   // Sign-out successful.
    // }).catch((error) => {
    //   // An error happened.
    // });

    //     deleteCookie(KEYS.TOKEN);
    //     router.push("/auth/login");
    //     router.refresh();
    //   }}
  };

  const openMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
  };

  useEffect(() => {
    if (!active) {
      setActive(pathname);
    }
  }, [pathname, active]);
  return (
    <nav className="sm:w-full desk:h-full sm:mb-4 z-20">
      <div className="sm:flex justify-between items-center hidden w-full mt-2 pr-2">
        <Link href={"/"} className="">
          <Image
            src="/logo.svg"
            width={150}
            height={150}
            alt="logo"
            className=""
          />
        </Link>
        <Image
          src="/icons/menu.svg"
          width={60}
          height={60}
          alt="menu"
          className="z-20"
          onClick={() => openMobileMenu()}
        />
      </div>
      <div
        className={`
      flex ${isOpenMobileMenu ? "sm:right-0" : "sm:-right-96"} sm:fixed sm:top-0 transition-all  flex-col w-24 h-full pb-4 mx-4 justify-between rounded-xl overflow-hidden text-white sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-003
      `}
      >
        <div className="w-full items-center">
          <Link
            href={"/"}
            className="flex flex-col justify-center items-center py-6 border-b-2 w-full"
          >
            <Image
              src="/logo-icon.svg"
              width={30}
              height={30}
              alt="logo"
              className="mb-2 sm:opacity-0"
            />
            <h1 className="text-md sm:opacity-0">iWeather</h1>
          </Link>
          {navItems.map((item) => (
            <Link
              href={item.path}
              key={item.name}
              className={`w-full my-4 h-14 flex items-center justify-center cursor-pointer relative`}
              onClick={() => setActive(item.path)}
            >
              <div
                className={`${
                  active === item.path && "bg-white"
                } w-full h-full absolute top-0 left-0 hover:bg-white opacity-10`}
              ></div>
              <div
                className={`${
                  active === item.path ? "h-full bg-white" : ""
                } w-1 rounded-md absolute top-0 desk:left-0 sm:right-0`}
              ></div>
              <Image
                src={item.icon}
                width={30}
                height={30}
                alt={item.name}
                className=""
              />
            </Link>
          ))}
        </div>
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <Link href={"/settings"} onClick={() => setActive("/settings")}>
            <Image
              src="/icons/user.svg"
              width={50}
              height={50}
              alt="user"
              className="rounded-full w-12 h-12"
            />
          </Link>

          <Button name={"Sign Out"} onClick={logout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
