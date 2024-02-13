"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import SidebarOne from "./Sidebar/SidebarOne";
// import AuthProviders from "./AuthProviders";
// import { getCurrentUser } from "@/lib/session";

const Navbar = () => {
  //   const session = await getCurrentUser();

  const router = useRouter();

  const bearer = sessionStorage.getItem("token");
  const [message, setMessage] = useState("");

  const logout = () => {
    sessionStorage.removeItem("token");
    // setBearer("");
    router.push("/login");
  };

  useEffect(() => {
    if (bearer) {
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      };
      console.log(requestOptions);
      axios
        .get(
          "http://localhost:8088/kanban_board/auth/returnusername",
          requestOptions
        )
        .then((response) => {
          const username = response.data;
          setMessage(username);
          sessionStorage.setItem("username", username);
          console.log(username);
        });
    }
  }, [bearer]);

  // useEffect(() => {
  //   const requestOptions = {
  //     headers: {
  //       Authorization: bearer,
  //     },
  //   };
  //   axios
  //     .get(
  //       "http://localhost:8088/kanban_board/auth/returnusername",
  //       requestOptions
  //     )
  //     .then((response) => setMessage(response.data));
  // }, []);

  return (
    <nav className="flexBetween navbar">
      <SidebarOne />
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo_blue.png" width={185} height={73} alt="Portfolio" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        <h1 className="font-bold text-xl">
          {message ? (
            <>
              <span>Welcome {message}!</span>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            "No user logged in, really bad"
          )}
        </h1>
        <Link href="/create-task">Share Work!</Link>

        {/* {session?.user ? (
          <>
            {session?.user?.image && (
              <Image
                src={session.user.image}
                width={40}
                height={40}
                className="rounded-full"
                alt={session.user.name}
              />
            )}
            UserPhoto
            <Link href="/create-project">Share Work!</Link>
          </>
        ) : (
          <AuthProviders />
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
