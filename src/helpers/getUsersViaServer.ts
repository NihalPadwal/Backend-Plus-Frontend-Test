import { cookies } from "next/headers";

export default async function getUser() {
  const token = cookies().get("token");

  const userDataRes = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });

  const userDataResult = await userDataRes.json();

  return userDataResult;
}
