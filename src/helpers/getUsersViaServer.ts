import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getUser({ username }: { username: string }) {
  // username params
  const usernameparams = username ? `?username=${username}` : "";

  const token = cookies().get("token");

  const userDataRes = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/user${usernameparams}`,
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
