"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

//shadcn ui
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  searchValue: string;
};

const SearchContainer = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<{ username: string; profile: string }[]>();
  const router = useRouter();

  async function search(e: any) {
    if (e.preventDefault) {
      e?.preventDefault();
    }

    const value = e.target.search.value?.toLowerCase();
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/searchUsers?username=${value}`
    );

    if (!res.ok) {
      router.replace(`/search`);
      setLoading(false);
      setUsers([]);
      return;
    }

    const data = await res.json();

    setUsers(data);

    setLoading(false);
  }

  useEffect(() => {
    if (props.searchValue === "") {
      return;
    }

    search({ target: { search: { value: props.searchValue } } });
  }, []);

  return (
    <div className="">
      <form
        onSubmit={(e) => search(e)}
        className="mt-5 flex w-full  items-center space-x-2"
      >
        <Input
          disabled={loading}
          type="text"
          name="search"
          placeholder="Search..."
          defaultValue={props.searchValue || ""}
        />
        <Button disabled={loading} type="submit">
          Search
        </Button>
      </form>
      <div className="posts">
        {users &&
          users?.map((user) => {
            return (
              <Card key={user.username} className="mt-6">
                <CardContent className="p-3">
                  <Link
                    href={`/${user.username}`}
                    className="user flex items-center gap-7 cursor-pointer"
                  >
                    <div className="image relative h-[100px] w-[100px] object-cover cursor-pointer rounded-full overflow-hidden">
                      <Image
                        src={
                          user.profile === ""
                            ? "/default_icons/profileImg.png"
                            : user.profile
                        }
                        alt="asd"
                        fill={true}
                        objectFit="cover"
                        priority
                      />
                    </div>
                    <div className="username">
                      <h6>{user.username}</h6>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        {!loading && users?.length === 0 && (
          <h6 className="mt-7">No Users Found...</h6>
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
