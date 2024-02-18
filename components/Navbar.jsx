"use client";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import { useState, Fragment } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import SidebarOne from "./Sidebar/SidebarOne";

const Navbar = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const username =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem("username") // Stops program from throwing session errors everywhere
      : null;

  const logout = () => {
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <nav className="flexBetween navbar">
        <SidebarOne />
        <div className="flex-1 flexStart gap-10 ml-[-10px]">
          <Link href="/">
            <Image
              src="/logo_blue.png"
              width={185}
              height={73}
              alt="Portfolio"
            />
          </Link>
          <ul className="xl:flex hidden text-small gap-7">
            {NavLinks.map((link) => (
              <Link href={link.href} key={link.key}>
                {link.text}
              </Link>
            ))}
          </ul>
        </div>

        <div className="flexCenter gap-1">
          Welcome
          <span className="blue-gradient_text font-semibold drop-shadow px-1">
            {username}!
          </span>
        </div>

        <div className="flexCenter z-10 flex-col relative ml-[-10px]">
          <Menu as="div">
            <Menu.Button
              className="flexCenter"
              onMouseEnter={() => setOpenModal(true)}
            >
              <Image
                src="/profile.png"
                width={60}
                height={60}
                className="rounded-full"
                alt="user profile image"
              />
            </Menu.Button>

            <Transition
              show={openModal}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="flexStart profile_menu-items "
                onMouseLeave={() => setOpenModal(false)}
              >
                <div className="flex flex-col items-center gap-y-4">
                  <Image
                    src="/profile.png"
                    className="rounded-full"
                    width={80}
                    height={80}
                    alt="profile Image"
                  />

                  <p className="font-semibold">{username}</p>
                </div>

                <div className="flex flex-col gap-3 pt-10 items-start pl-0">
                  <Menu.Item>
                    <Link href={"/"} className="text-sm">
                      Coming Soon...
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href={"/"} className="text-sm">
                      Also Coming Soon...
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href={"/"} className="text-sm">
                      Yep, this is Coming Soon too...
                    </Link>
                  </Menu.Item>
                </div>
                <div className="w-full flexStart border-t border-nav-border mt-5 pt-5">
                  <Menu.Item>
                    <button
                      type="button"
                      className="text-sm"
                      onClick={() => logout()}
                    >
                      Sign out
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
