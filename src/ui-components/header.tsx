"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type Props = {};

const Header = (props: Props) => {
  const [token, setToken] = useState("");
  const [position, setPosition] = useState<string>("");
  const usePathNameObj = usePathname();
  const pathname =
    usePathNameObj.split("/").length > 2
      ? usePathNameObj.split("/")[2]
      : usePathNameObj.split("/")[1];
  const router = useRouter();

  useEffect(() => {
    setPosition(pathname);
  }, [pathname]);

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch("/api/getcookie");

        if (!res.ok) {
          throw Error("No token found");
        }

        setToken("isLoggedIn");
      } catch (err) {
        console.log(err);
      }

      // setToken(data.token.value);
    }

    fetchToken();
  }, []);

  function handlePageChange(e: string) {
    setPosition(e);
    // router.push(`/${e}`, { scroll: false });
  }

  async function logOut() {
    await fetch("/api/deletecookie");
    router.push("/auth/login");
    setToken("");
  }

  return (
    <div className="w-full flex justify-between items-center px-20 py-8">
      {!token && (
        <a href={"/"}>
          <Image
            height={40}
            width={40}
            className=""
            src="https://www.svgrepo.com/show/354113/nextjs-icon.svg"
            alt={`header-logo`}
          />
        </a>
      )}
      {token === "isLoggedIn" && (
        <Link href={"/"}>
          <Image
            height={40}
            width={40}
            className=""
            src="https://www.svgrepo.com/show/354113/nextjs-icon.svg"
            alt={`header-logo`}
          />
        </Link>
      )}

      <HoverCard>
        <HoverCardTrigger>
          <Button
            onClick={() => {
              // window.location.href = `${process.env.NEXT_PUBLIC_API}`;
              window.open(`${process.env.NEXT_PUBLIC_API}`, "_blank");
            }}
          >
            Run Api
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          The api and database is in testing stage and shuts down whenever it is
          not in use for a long time to run the API please click on above button
          and wait for API to give Response
        </HoverCardContent>
      </HoverCard>

      <DropdownMenu onOpenChange={(e) => {}}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Change Page</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Page Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={handlePageChange}
          >
            {!token && (
              <>
                <Link href={"/auth/login"}>
                  <DropdownMenuRadioItem value="login">
                    Sign In
                  </DropdownMenuRadioItem>
                </Link>
                <Link href={"/auth/register"}>
                  <DropdownMenuRadioItem value="register">
                    Sign Up
                  </DropdownMenuRadioItem>
                </Link>
              </>
            )}

            {token === "isLoggedIn" && (
              <div onClick={logOut}>
                <DropdownMenuRadioItem value="logout">
                  Sign Out
                </DropdownMenuRadioItem>
              </div>
            )}

            {token === "isLoggedIn" && (
              <>
                <Link href={"/profile"}>
                  <DropdownMenuRadioItem value="profile">
                    Profile
                  </DropdownMenuRadioItem>
                </Link>
              </>
            )}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
