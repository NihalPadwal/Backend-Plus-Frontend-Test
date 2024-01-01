import { cookies } from "next/headers";

export async function getPostsServer({ username }: { username: string }) {
  // username params
  const usernameparams = username ? `?username=${username}` : "";

  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    throw Error("No token found");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/posts${usernameparams}`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  const data = await res.json();

  return data;
}
