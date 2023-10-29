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
            <DropdownMenuRadioItem value="client">
              <Link href={"/client"}>Client</Link>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="login">
              <Link href={"/auth/login"}>Sign In</Link>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="register">
              <Link href={"/auth/register"}>Sign Up</Link>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="server">
              <Link href={"/server"}>Server</Link>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="protected">
              <Link href={"/protected"}>Protected</Link>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="role-based">
              <Link href={"/role-based"}>Role Based</Link>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
