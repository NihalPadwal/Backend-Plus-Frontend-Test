"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  username?: string;
  limit?: number;
  skip?: number;
};

export default async function getFeed(props: Props) {
  const token = cookies().get("token");

  if (!token) {
    redirect("/auth/login");
  }

  const userDataRes = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/feed?limit=${
      props.limit || "10"
    }&skip=${props.skip || "0"}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  const userDataResult = await userDataRes.json();

  if (userDataResult.error) {
    redirect("/404");
  }

  return userDataResult;
}
