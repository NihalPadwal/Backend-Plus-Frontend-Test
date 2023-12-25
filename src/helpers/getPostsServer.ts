import { cookies } from "next/headers";

export async function getPostsServer() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    throw Error("No token found");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/posts`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  const data = await res.json();

  return data;
}
