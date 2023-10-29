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

type Props = {};

const Header = (props: Props) => {
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

  function handlePageChange(e: string) {
    setPosition(e);
    // router.push(`/${e}`, { scroll: false });
  }

  return (
    <div className="w-full flex justify-between items-center px-20 py-8">
      <Link href={"/"}>
        <Image
          height={40}
          width={40}
          className=""
          src="https://www.svgrepo.com/show/354113/nextjs-icon.svg"
          alt={`header-logo`}
        />
      </Link>

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
            <Link href={"/client"}>
              <DropdownMenuRadioItem value="client">
                Client
              </DropdownMenuRadioItem>
            </Link>
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
            <Link href={"/server"}>
              <DropdownMenuRadioItem value="server">
                Server
              </DropdownMenuRadioItem>
            </Link>
            <Link href={"/protected"}>
              <DropdownMenuRadioItem value="protected">
                Protected
              </DropdownMenuRadioItem>
            </Link>
            <Link href={"/role-based"}>
              <DropdownMenuRadioItem value="role-based">
                Role Based
              </DropdownMenuRadioItem>
            </Link>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
